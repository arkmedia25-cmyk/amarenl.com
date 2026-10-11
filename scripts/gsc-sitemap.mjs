// GSC sitemap listeleme + gondenerme (Search Console API v3).
// Kullanim:
//   GSC_KEY_PATH=/path/key.json node scripts/gsc-sitemap.mjs list  "https://www.wearkmedia.com/"
//   GSC_KEY_PATH=/path/key.json node scripts/gsc-sitemap.mjs submit "https://www.wearkmedia.com/" https://www.wearkmedia.com/sitemap.xml
import { createSign } from "node:crypto";
import { readFileSync } from "node:fs";

const KEY_PATH = process.env.GSC_KEY_PATH;
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API = "https://www.googleapis.com/webmasters/v3";

function base64url(input) {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function getAccessToken() {
  if (!KEY_PATH) throw new Error("GSC_KEY_PATH is niet ingesteld");
  const keyFile = JSON.parse(readFileSync(KEY_PATH, "utf-8"));
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({
    iss: keyFile.client_email,
    scope: "https://www.googleapis.com/auth/webmasters", // sitemap gonderimi icin readonly YETMEZ
    aud: TOKEN_URL, iat: now, exp: now + 3600,
  }));
  const unsigned = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const jwt = `${unsigned}.${base64url(signer.sign(keyFile.private_key))}`;
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Token ophalen mislukt: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function listSitemaps(token, site) {
  const res = await fetch(`${API}/sites/${encodeURIComponent(site)}/sitemaps`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Sitemaps ophalen mislukt: ${JSON.stringify(data)}`);
  return data.sitemap || [];
}

async function submitSitemap(token, site, feed) {
  const res = await fetch(`${API}/sites/${encodeURIComponent(site)}/sitemaps/${encodeURIComponent(feed)}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 204 && !res.ok) {
    throw new Error(`Sitemap gonderilemedi (HTTP ${res.status}): ${await res.text()}`);
  }
  return res.status;
}

const [, , cmd, site, feed] = process.argv;
if (!cmd || !site) {
  console.error("Gebruik: node scripts/gsc-sitemap.mjs <list|submit> <siteUrl> [feedUrl]");
  process.exit(2);
}

const token = await getAccessToken();
if (cmd === "list") {
  const items = await listSitemaps(token, site);
  console.log(`Sitemaps voor ${site}: ${items.length}`);
  for (const s of items) {
    console.log(`  - ${s.path}  [${s.type || "?"}]  laatst gedownload: ${s.lastDownloaded || "-"}  waarschuwingen: ${s.warnings ?? 0}  fouten: ${s.errors ?? 0}`);
  }
} else if (cmd === "submit") {
  if (!feed) throw new Error("feedUrl ontbreekt");
  const status = await submitSitemap(token, site, feed);
  console.log(`Verzonden (HTTP ${status}): ${feed} -> ${site}`);
  const items = await listSitemaps(token, site);
  console.log(`Controle na verzenden — ${items.length} sitemap(s):`);
  for (const s of items) console.log(`  - ${s.path}  laatste download: ${s.lastDownloaded || "-"}`);
} else {
  throw new Error(`Onbekend commando: ${cmd}`);
}
