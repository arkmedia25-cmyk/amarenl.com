#!/usr/bin/env node
// Pulls daily ad-level insights from the Meta Marketing API and writes them into
// ClickHouse's ad_performance table. Idempotent: re-running for the same
// date range just inserts newer rows, ReplacingMergeTree collapses duplicates
// (dedup happens on merge — query with FINAL, or run OPTIMIZE, if you need it now).
//
// Required env vars:
//   META_ACCESS_TOKEN   - system user or user token with ads_read on the ad account
//   META_AD_ACCOUNT_ID  - numeric ad account id, WITHOUT the "act_" prefix
//   CLICKHOUSE_USER, CLICKHOUSE_PASSWORD, CLICKHOUSE_DB - same as analytics/.env
//
// Usage:
//   node scripts/ingest-meta-ads.mjs --since 2026-07-24 --until 2026-07-30
//   node scripts/ingest-meta-ads.mjs --preset yesterday   (default)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
const CLICKHOUSE_URL = process.env.CLICKHOUSE_URL || "http://localhost:8123";
const CLICKHOUSE_USER = process.env.CLICKHOUSE_USER || "amarenl";
const CLICKHOUSE_PASSWORD = process.env.CLICKHOUSE_PASSWORD;
const CLICKHOUSE_DB = process.env.CLICKHOUSE_DB || "amarenl_analytics";

if (!META_ACCESS_TOKEN || !META_AD_ACCOUNT_ID) {
  console.error(
    "Missing META_ACCESS_TOKEN or META_AD_ACCOUNT_ID env vars. See header comment for what's needed."
  );
  process.exit(1);
}
if (!CLICKHOUSE_PASSWORD) {
  console.error("Missing CLICKHOUSE_PASSWORD env var.");
  process.exit(1);
}

const angleMap = JSON.parse(
  readFileSync(path.join(__dirname, "angle-map.json"), "utf-8")
);

function parseArgs(argv) {
  const args = { preset: "yesterday" };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--since") args.since = argv[++i];
    if (argv[i] === "--until") args.until = argv[++i];
    if (argv[i] === "--preset") args.preset = argv[++i];
  }
  return args;
}

function angleFor(adName) {
  if (angleMap[adName]) return angleMap[adName];
  const match = Object.keys(angleMap).find(
    (k) => k !== "_comment" && adName?.includes(k)
  );
  return match ? angleMap[match] : "unmapped";
}

function leadCount(actions) {
  if (!Array.isArray(actions)) return 0;
  const lead = actions.find(
    (a) => a.action_type === "lead" || a.action_type === "offsite_conversion.fb_pixel_lead"
  );
  return lead ? Number(lead.value) : 0;
}

async function fetchInsights({ since, until, preset }) {
  const fields = [
    "ad_name",
    "campaign_name",
    "impressions",
    "clicks",
    "spend",
    "actions",
    "date_start",
  ].join(",");

  const params = new URLSearchParams({
    access_token: META_ACCESS_TOKEN,
    level: "ad",
    fields,
    time_increment: "1",
    limit: "500",
  });

  if (since && until) {
    params.set("time_range", JSON.stringify({ since, until }));
  } else {
    params.set("date_preset", preset);
  }

  const url = `https://graph.facebook.com/v21.0/act_${META_AD_ACCOUNT_ID}/insights?${params}`;
  const rows = [];
  let next = url;

  while (next) {
    const res = await fetch(next);
    const json = await res.json();
    if (json.error) {
      throw new Error(`Meta API error: ${json.error.message} (code ${json.error.code})`);
    }
    rows.push(...(json.data || []));
    next = json.paging?.next || null;
  }
  return rows;
}

function toClickHouseRows(metaRows) {
  return metaRows.map((r) => ({
    date: r.date_start,
    campaign: r.campaign_name,
    creative: r.ad_name,
    angle: angleFor(r.ad_name),
    impressions: Number(r.impressions || 0),
    clicks: Number(r.clicks || 0),
    spend: Number(r.spend || 0),
    conversions: leadCount(r.actions),
  }));
}

async function insertIntoClickHouse(rows) {
  if (rows.length === 0) {
    console.log("No rows to insert.");
    return;
  }
  const body = rows.map((r) => JSON.stringify(r)).join("\n");
  const query = `INSERT INTO ${CLICKHOUSE_DB}.ad_performance (date, campaign, creative, angle, impressions, clicks, spend, conversions) FORMAT JSONEachRow`;
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
  console.log(`Inserted ${rows.length} rows into ${CLICKHOUSE_DB}.ad_performance.`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log(
    args.since ? `Pulling Meta insights ${args.since}..${args.until}` : `Pulling Meta insights (preset: ${args.preset})`
  );
  const metaRows = await fetchInsights(args);
  const chRows = toClickHouseRows(metaRows);
  await insertIntoClickHouse(chRows);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
