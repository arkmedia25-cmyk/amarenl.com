#!/usr/bin/env node
// Pulls competitor ad creatives from the Meta Ad Library (public transparency
// API — not scraping, this is Meta's own documented endpoint for ad transparency)
// and writes them into ClickHouse's competitor_ads table.
//
// CONFIRMED (2026-08-01): the Ad Library API rejects System User tokens for
// EU-reached ads (ad_reached_countries includes an EU country) with
// OAuthException code 10 / subcode 2332002, "Application does not have
// permission for this action" — even with a valid app + ads_read + completed
// identity verification. It requires a personal User Access Token belonging
// to an individual who has completed ID confirmation at facebook.com/id.
// This is why this script uses META_USER_ACCESS_TOKEN, a *different*
// credential than ingest-meta-ads.mjs's META_ACCESS_TOKEN (which is a System
// User token — fine for the Marketing API Insights this script doesn't use).
//
// User Access Tokens max out at 60 days (long-lived), unlike System User
// tokens which can be set to never expire. See analytics/README.md for the
// token-exchange command to refresh it before it expires.
//
// Required env vars:
//   META_USER_ACCESS_TOKEN - long-lived personal User Access Token, from an
//                            ID-verified Meta account, with ads_read
//   CLICKHOUSE_USER, CLICKHOUSE_PASSWORD, CLICKHOUSE_DB - same as analytics/.env
//
// Usage:
//   node scripts/track-competitor-ads.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const META_ACCESS_TOKEN = process.env.META_USER_ACCESS_TOKEN;
const CLICKHOUSE_URL = process.env.CLICKHOUSE_URL || "http://localhost:8123";
const CLICKHOUSE_USER = process.env.CLICKHOUSE_USER || "amarenl";
const CLICKHOUSE_PASSWORD = process.env.CLICKHOUSE_PASSWORD;
const CLICKHOUSE_DB = process.env.CLICKHOUSE_DB || "amarenl_analytics";

if (!META_ACCESS_TOKEN) {
  console.error("Missing META_USER_ACCESS_TOKEN env var.");
  process.exit(1);
}
if (!CLICKHOUSE_PASSWORD) {
  console.error("Missing CLICKHOUSE_PASSWORD env var.");
  process.exit(1);
}

const competitors = JSON.parse(
  readFileSync(path.join(__dirname, "competitors.json"), "utf-8")
);

const FIELDS = [
  "id",
  "page_id",
  "page_name",
  "ad_creative_bodies",
  "ad_creative_link_titles",
  "ad_creative_link_captions",
  "ad_delivery_start_time",
  "ad_delivery_stop_time",
  "ad_snapshot_url",
  "publisher_platforms",
].join(",");

async function fetchAdsFor(competitor) {
  const params = new URLSearchParams({
    access_token: META_ACCESS_TOKEN,
    search_terms: competitor.search_terms,
    ad_reached_countries: JSON.stringify(["NL"]),
    ad_active_status: "ALL",
    ad_type: "ALL",
    fields: FIELDS,
    limit: "200",
  });

  let next = `https://graph.facebook.com/v21.0/ads_archive?${params}`;
  const rows = [];

  while (next) {
    const res = await fetch(next);
    const json = await res.json();
    if (json.error) {
      throw new Error(
        `Meta Ad Library API error for "${competitor.name}": ${json.error.message} (code ${json.error.code}, subcode ${json.error.error_subcode || "-"})`
      );
    }
    rows.push(...(json.data || []));
    next = json.paging?.next || null;
  }
  return rows;
}

function toClickHouseRows(competitorName, adRows) {
  return adRows.map((ad) => ({
    competitor: competitorName,
    page_id: ad.page_id || "",
    page_name: ad.page_name || "",
    ad_archive_id: ad.id,
    ad_creative_body: (ad.ad_creative_bodies || [])[0] || "",
    ad_creative_link_title: (ad.ad_creative_link_titles || [])[0] || "",
    ad_creative_link_caption: (ad.ad_creative_link_captions || [])[0] || "",
    ad_delivery_start_time: ad.ad_delivery_start_time
      ? ad.ad_delivery_start_time.slice(0, 10)
      : null,
    ad_delivery_stop_time: ad.ad_delivery_stop_time
      ? ad.ad_delivery_stop_time.slice(0, 10)
      : null,
    is_active: ad.ad_delivery_stop_time ? 0 : 1,
    publisher_platforms: (ad.publisher_platforms || []).join(","),
    snapshot_url: ad.ad_snapshot_url || "",
  }));
}

async function insertIntoClickHouse(rows) {
  if (rows.length === 0) {
    console.log("No rows to insert.");
    return;
  }
  const body = rows.map((r) => JSON.stringify(r)).join("\n");
  const columns = Object.keys(rows[0]).join(", ");
  const query = `INSERT INTO ${CLICKHOUSE_DB}.competitor_ads (${columns}) FORMAT JSONEachRow`;
  const url = `${CLICKHOUSE_URL}/?query=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${CLICKHOUSE_USER}:${CLICKHOUSE_PASSWORD}`).toString("base64"),
      "Content-Type": "text/plain",
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ClickHouse insert failed (${res.status}): ${text}`);
  }
  console.log(`Inserted ${rows.length} rows into ${CLICKHOUSE_DB}.competitor_ads.`);
}

async function main() {
  for (const competitor of competitors) {
    console.log(`Fetching ads for ${competitor.name}...`);
    try {
      const adRows = await fetchAdsFor(competitor);
      console.log(`  ${adRows.length} ads found.`);
      const chRows = toClickHouseRows(competitor.name, adRows);
      await insertIntoClickHouse(chRows);
    } catch (err) {
      console.error(`  Failed for ${competitor.name}: ${err.message}`);
    }
  }
}

main();
