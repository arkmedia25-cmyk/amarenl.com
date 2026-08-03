import { load } from 'cheerio';
import { existsSync, readFileSync, appendFileSync, writeFileSync } from 'node:fs';

// A realistic browser User-Agent so we look like a normal visitor.
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const REQUEST_DELAY_MS = 2000; // polite gap between requests
const CURRENCY = '£'; // used only when formatting changes.log lines
const FILES = {
  urls: 'urls.txt',
  data: 'data.csv',
  errors: 'errors.txt',
  changes: 'changes.log',
};
const CSV_HEADER = 'timestamp,url,name,price,in_stock';

// Ranked selector candidates. Index 0 is the PRIMARY (used on the normal path);
// the rest are FALLBACKS that self-heal tries when the primary returns null.
const SELECTORS = {
  name: ['h1.product_title', 'h1.entry-title', 'h1'],
  price: ['p.price .woocommerce-Price-amount', '.summary .price .amount', '.woocommerce-Price-amount'],
  stock: ['p.stock', '.stock'],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// host + path, no trailing slash -> "scrapeme.live/shop/Bulbasaur"
function shortUrl(url) {
  try {
    const u = new URL(url);
    return (u.host + u.pathname).replace(/\/$/, '');
  } catch {
    return url;
  }
}

// "£63.00" -> 63 ; "£1,299.00" -> 1299 ; junk -> null
function cleanPrice(raw) {
  if (raw == null || raw === '') return null;
  const n = parseFloat(String(raw).replace(/,/g, '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : null;
}

// ── network ──────────────────────────────────────────────────────────────────
async function fetchPage(url) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

// ── extraction: try candidate selectors in order ──────────────────────────────
function readText($, sel) {
  const node = $(sel).first();
  if (node.length === 0) return null;
  const t = node.text().trim();
  return t.length ? t : null;
}

function extractName($, sels) {
  for (const sel of sels) {
    const v = readText($, sel);
    if (v) return v;
  }
  return null;
}

function extractPrice($, sels) {
  for (const sel of sels) {
    const n = cleanPrice(readText($, sel));
    if (n != null) return n;
  }
  return null;
}

// Prefer the class flag (in-stock / out-of-stock); fall back to the text.
function extractStock($, sels) {
  for (const sel of sels) {
    const node = $(sel).first();
    if (node.length === 0) continue;
    const cls = (node.attr('class') || '').toLowerCase();
    if (cls.includes('out-of-stock')) return false;
    if (cls.includes('in-stock')) return true;
    const t = node.text().trim();
    if (t) return /in stock/i.test(t);
  }
  return null;
}

// Normal parse uses ONLY the primary selector (index 0). If the primary has
// rotted, the field comes back null -> self-heal becomes a visible event
// instead of silently masking the breakage.
function parseProduct(html) {
  const $ = load(html);
  return {
    $, // keep the parsed doc so self-heal can re-inspect without re-fetching
    name: extractName($, [SELECTORS.name[0]]),
    price: extractPrice($, [SELECTORS.price[0]]),
    in_stock: extractStock($, [SELECTORS.stock[0]]),
  };
}

// ── csv ───────────────────────────────────────────────────────────────────────
function csvEscape(field) {
  const s = field == null ? '' : String(field);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

function parseCsvLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = false;
      } else cur += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ',') { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

function appendRow(record) {
  if (!existsSync(FILES.data)) writeFileSync(FILES.data, CSV_HEADER + '\n');
  const row = [
    new Date().toISOString(),
    csvEscape(record.url),
    csvEscape(record.name),
    record.price == null ? '' : record.price,
    record.in_stock,
  ].join(',');
  appendFileSync(FILES.data, row + '\n');
}

// data.csv -> Map<url, { price, in_stock, hadGoodRow }>. Last row per URL wins.
// hadGoodRow is sticky: once a URL produced good data, it stays flagged — that
// is what tells self-heal "this URL used to work, so a null now means breakage".
function loadLastState() {
  const state = new Map();
  if (!existsSync(FILES.data)) return state;
  const lines = readFileSync(FILES.data, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    if (!line.trim() || line === CSV_HEADER) continue;
    const cols = parseCsvLine(line);
    if (cols.length < 5) continue;
    const [, url, name, priceStr, stockStr] = cols;
    const price = cleanPrice(priceStr);
    const good = Boolean(name && name.length) && price != null;
    const prev = state.get(url);
    state.set(url, {
      price,
      in_stock: stockStr === 'true',
      hadGoodRow: Boolean(prev?.hadGoodRow) || good,
    });
  }
  return state;
}

// ── change detection ──────────────────────────────────────────────────────────
function detectChange(url, prev, next) {
  if (!prev) return 0;
  const day = new Date().toISOString().slice(0, 10);
  const u = shortUrl(url);
  const havePrices = prev.price != null && next.price != null;
  const lines = [];

  if (havePrices && next.price < prev.price)
    lines.push(`[${day}] PRICE DROP ${u} ${CURRENCY}${prev.price} -> ${CURRENCY}${next.price}`);
  if (havePrices && next.price > prev.price)
    lines.push(`[${day}] PRICE RISE ${u} ${CURRENCY}${prev.price} -> ${CURRENCY}${next.price}`);
  if (prev.in_stock === false && next.in_stock === true)
    lines.push(`[${day}] BACK IN STOCK ${u}`);

  if (lines.length) appendFileSync(FILES.changes, lines.join('\n') + '\n');
  return lines.length;
}

// ── errors ─────────────────────────────────────────────────────────────────────
function logError(url, reason, { loud = false } = {}) {
  const day = new Date().toISOString().slice(0, 10);
  let line = `[${day}] ${shortUrl(url)} — ${reason}`;
  if (loud) line = `!!! ${line} !!!  (a selector broke — look here)`;
  appendFileSync(FILES.errors, line + '\n');
}

// ── self-heal ───────────────────────────────────────────────────────────────
// Triggered when name/price came back null AND this URL produced good data before.
// Re-inspect the live HTML with the fallback selectors and retry once:
//   recovered -> "SELF-HEALED <url>" to changes.log
//   still dead -> loud flag in errors.txt
function selfHeal(url, parsed, prev) {
  const needName = parsed.name == null;
  const needPrice = parsed.price == null;
  if (!needName && !needPrice) return; // nothing to heal
  if (!prev?.hadGoodRow) return; // never worked before -> ordinary miss, no alarm

  const $ = parsed.$;
  let healed = false;
  if (needName) {
    const v = extractName($, SELECTORS.name); // try ALL candidates, not just primary
    if (v) { parsed.name = v; healed = true; }
  }
  if (needPrice) {
    const v = extractPrice($, SELECTORS.price);
    if (v != null) { parsed.price = v; healed = true; }
  }

  const stillBroken = parsed.name == null || parsed.price == null;
  if (stillBroken) {
    logError(url, 'ALL SELECTORS FAILED on a previously-working URL', { loud: true });
  } else if (healed) {
    appendFileSync(FILES.changes, `SELF-HEALED ${shortUrl(url)}\n`);
    console.log(`  ~~ self-healed ${shortUrl(url)} via a fallback selector`);
  }
}

// ── flow ────────────────────────────────────────────────────────────────────
async function scrapeOne(url, prev) {
  const html = await fetchPage(url);
  const parsed = parseProduct(html);
  selfHeal(url, parsed, prev);
  return { url, name: parsed.name, price: parsed.price, in_stock: parsed.in_stock };
}

async function runList() {
  if (!existsSync(FILES.urls)) {
    console.log(`No ${FILES.urls} found — add one URL per line.`);
    return;
  }
  const urls = readFileSync(FILES.urls, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));

  if (urls.length === 0) {
    console.log(`No URLs in ${FILES.urls}.`);
    return;
  }

  const state = loadLastState(); // snapshot BEFORE we scrape
  let ok = 0;
  let failed = 0;
  let changes = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const rec = await scrapeOne(url, state.get(url));
      changes += detectChange(url, state.get(url), rec);
      appendRow(rec);
      ok++;
      console.log(`  ok    ${rec.name}  £${rec.price}  ${rec.in_stock ? 'in stock' : 'out of stock'}`);
    } catch (err) {
      logError(url, err.message);
      failed++;
      console.log(`  fail  ${url} -> errors.txt (${err.message})`);
    }
    if (i < urls.length - 1) await sleep(REQUEST_DELAY_MS);
  }
  console.log(`\nDone. ${ok} ok, ${failed} failed, ${changes} change(s).`);
}

// With a URL argument -> print one JSON (Step 3). No argument -> run the list.
async function main() {
  const arg = process.argv[2];
  if (arg) {
    const state = loadLastState();
    const { url, ...clean } = await scrapeOne(arg, state.get(arg));
    console.log(JSON.stringify(clean, null, 2));
  } else {
    await runList();
  }
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exitCode = 1;
});
