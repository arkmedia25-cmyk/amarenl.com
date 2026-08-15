#!/usr/bin/env node
// Google Search Console API — kimlik doğrulama + arama performansı raporu.
// Servis hesabı JSON'ı repo DIŞINDA tutulur (~/.config/amarenl-gsc/service-account.json) —
// asla commit edilmez. Sadece Node yerleşik crypto+fetch kullanır, ekstra bağımlılık yok.
//
// Kullanım:
//   node scripts/gsc-report.mjs sites                     — yetkili siteleri listele
//   node scripts/gsc-report.mjs query [gün_sayisi=28]      — arama performansı özeti

import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";
import { homedir } from "node:os";
import { join } from "node:path";

const KEY_PATH = process.env.GSC_KEY_PATH || join(homedir(), ".config/amarenl-gsc/service-account.json");
const SITE_URL = process.env.GSC_SITE_URL || "https://amarenl.com/";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

function base64url(input) {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getAccessToken() {
  const keyFile = JSON.parse(readFileSync(KEY_PATH, "utf-8"));
  const now = Math.floor(Date.now() / 1000);

  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: keyFile.client_email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );
  const unsigned = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = base64url(signer.sign(keyFile.private_key));
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Token alma başarısız: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function listSites(token) {
  const res = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Site listesi alınamadı: ${JSON.stringify(data)}`);
  return data.siteEntry || [];
}

async function queryAnalytics(token, days) {
  const end = new Date();
  end.setDate(end.getDate() - 3); // GSC verisi ~2-3 gün gecikmeli gelir
  const start = new Date(end);
  start.setDate(start.getDate() - days);
  const fmt = (d) => d.toISOString().slice(0, 10);

  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        startDate: fmt(start),
        endDate: fmt(end),
        dimensions: ["query"],
        rowLimit: 25,
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(`Analytics sorgusu başarısız: ${JSON.stringify(data)}`);
  return { start: fmt(start), end: fmt(end), rows: data.rows || [] };
}

async function main() {
  const cmd = process.argv[2] || "query";
  const token = await getAccessToken();

  if (cmd === "sites") {
    const sites = await listSites(token);
    console.log("Yetkili siteler:");
    for (const s of sites) console.log(`  - ${s.siteUrl} (${s.permissionLevel})`);
    return;
  }

  if (cmd === "summary") {
    // Telegram'a gömülecek kompakt özet — haftalık rapor için.
    const days = Number(process.argv[3]) || 7;
    const { start, end, rows } = await queryAnalytics(token, days);
    const totalClicks = rows.reduce((s, r) => s + r.clicks, 0);
    const totalImpr = rows.reduce((s, r) => s + r.impressions, 0);
    const top = [...rows].sort((a, b) => b.clicks - a.clicks).slice(0, 3);
    console.log(`${start} → ${end}`);
    console.log(`clicks=${totalClicks} impressions=${totalImpr}`);
    for (const r of top) {
      console.log(`top: ${r.keys[0]} (${r.clicks} clicks, pos ${r.position.toFixed(1)})`);
    }
    return;
  }

  const days = Number(process.argv[3]) || 28;
  const { start, end, rows } = await queryAnalytics(token, days);
  console.log(`GSC Arama Performansı — ${SITE_URL} — ${start} → ${end} (son ${days} gün)\n`);
  console.log("query".padEnd(50), "clicks".padStart(8), "impr".padStart(8), "ctr".padStart(8), "pos".padStart(8));
  for (const r of rows) {
    const [q] = r.keys;
    console.log(
      q.slice(0, 49).padEnd(50),
      String(r.clicks).padStart(8),
      String(r.impressions).padStart(8),
      `${(r.ctr * 100).toFixed(1)}%`.padStart(8),
      r.position.toFixed(1).padStart(8)
    );
  }
}

main().catch((err) => {
  console.error("HATA:", err.message);
  process.exit(1);
});
