// ─────────────────────────────────────────────────────────────────────────
// Data Autopilot — data layer (REAL DATA).
// This is the ONLY module that touches data. Every function is async and
// returns plain JSON matching the documented shapes — now backed by the
// local server (server.js), which parses the actual scraper artifacts:
//   data.csv · changes.log · errors.txt · run.log · digest.md · urls.txt · crontab
// The UI never changed; only these bodies did (mock -> fetch).
// ─────────────────────────────────────────────────────────────────────────

async function j(path, opts) {
  const res = await fetch(path, opts);
  if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}`);
  return res.json();
}

const post = (path, body) =>
  j(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body || {}),
  });

// ── reads ───────────────────────────────────────────────────────────────────
// getProducts()  -> [{ url, name, price:number|null, in_stock:boolean|null,
//                      lastChecked:ISO|null, history:[{t,price,in_stock}] }]
export async function getProducts() { return j('/api/products'); }

// getChanges()   -> [{ t, type:"PRICE_DROP"|"PRICE_RISE"|"BACK_IN_STOCK"|"SELF_HEALED",
//                      url, from:number|null, to:number|null }]
export async function getChanges() { return j('/api/changes'); }

// getErrors()    -> [{ t, url, reason, loud:boolean }]   loud => "!!!" critical
export async function getErrors() { return j('/api/errors'); }

// getRuns()      -> [{ t, ok, failed, changes, durationMs }]
export async function getRuns() { return j('/api/runs'); }

// getSchedule()  -> { cron, human, mode:"free"|"ai_digest", nextRun, lastRun }
export async function getSchedule() { return j('/api/schedule'); }

// getDigests()   -> [{ date:"YYYY-MM-DD", lines:[string,...] }]
export async function getDigests() { return j('/api/digests'); }

// ── mutations ─────────────────────────────────────────────────────────────────
// Append new URLs to urls.txt.            -> { added, products }
export async function addUrls(urls) { return post('/api/add-urls', { urls }); }

// Remove URLs from urls.txt.              -> { removed, products }
export async function removeUrls(urls) { return post('/api/remove-urls', { urls }); }

// Re-run the scraper (covers the given URLs). -> { rescanned, at }
export async function rescan(urls) { return post('/api/rescan', { urls }); }

// Run `node scrape.js` now.               -> { run:{t,ok,failed,changes,durationMs}, at }
export async function runScrapeNow() { return post('/api/run-scrape', {}); }
