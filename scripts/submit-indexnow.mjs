// Meldt alle sitemap-URL's via het IndexNow-protocol aan bij Bing (→ Copilot),
// Yandex, Seznam en Naver — voor directe herindexering na een deploy of
// contentwijziging. Google doet niet mee aan IndexNow; daar loopt de
// sitemap-ping via de Search Console.
//
// Gebruik:  npm run submit-indexnow
//           npm run submit-indexnow -- --dry-run
//
// De key staat in public/<key>.txt (bestandsnaam = key, inhoud = key) en is
// bewust openbaar: IndexNow vereist die verificatie.

const SITE_URL = "https://vitaalroute.nl";
const INDEXNOW_KEY = "6f95fc53391b47c297ba48723f705939";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const dryRun = process.argv.includes("--dry-run");

const keyRes = await fetch(`${SITE_URL}/${INDEXNOW_KEY}.txt`);
if (!keyRes.ok) {
  console.error(`Key-bestand niet bereikbaar (${keyRes.status}) — eerst deployen, dan aanmelden.`);
  process.exit(1);
}
const keyBody = (await keyRes.text()).trim();
if (keyBody !== INDEXNOW_KEY) {
  console.error("Inhoud van het key-bestand komt niet overeen met de bestandsnaam.");
  process.exit(1);
}

const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`);
if (!sitemapRes.ok) {
  console.error(`Sitemap niet bereikbaar: ${sitemapRes.status}`);
  process.exit(1);
}
const xml = await sitemapRes.text();
const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error("Geen URL's in de sitemap gevonden.");
  process.exit(1);
}

if (dryRun) {
  console.log(`[dry-run] ${urlList.length} URL's zouden worden gemeld:`);
  console.log(urlList.slice(0, 5).join("\n"));
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  }),
});

// 200 = geaccepteerd, 202 = geaccepteerd (key nog in beoordeling), 403 = key-bestand niet live,
// 422 = URL/host klopt niet, 429 = te veel aanvragen (quota: 1 run per dag per URL-set).
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URL's gemeld.`);
process.exit(res.ok ? 0 : 1);
