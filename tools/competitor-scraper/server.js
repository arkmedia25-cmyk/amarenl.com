// ─────────────────────────────────────────────────────────────────────────────
// Data Autopilot — local backend for the Claude Design dashboard.
//
// Serves the dashboard (dashboard/*.dc.html + support.js + api.js) and exposes
// /api/* endpoints that read the REAL scraper artifacts in this repo
// (data.csv, changes.log, errors.txt, run.log, digest.md, urls.txt, crontab)
// and shape them exactly the way dashboard/api.js documents. Mutations really
// edit urls.txt and really run `node scrape.js` against the live site.
//
// Zero dependencies — Node 18+ built-ins only.  Start:  node server.js
// ─────────────────────────────────────────────────────────────────────────────
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, appendFileSync, statSync } from 'node:fs';
import { spawn, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DASH = join(ROOT, 'dashboard');
const PORT = process.env.PORT || 8787;

const F = {
  urls: join(ROOT, 'urls.txt'),
  data: join(ROOT, 'data.csv'),
  changes: join(ROOT, 'changes.log'),
  errors: join(ROOT, 'errors.txt'),
  runlog: join(ROOT, 'run.log'),
  digest: join(ROOT, 'digest.md'),
  cron: join(ROOT, 'crontab.example'),
  ledger: join(ROOT, '.dashboard-runs.jsonl'), // real run history the dashboard writes
};

const CSV_HEADER = 'timestamp,url,name,price,in_stock';
const DAY = 86400000;

// ── small helpers ─────────────────────────────────────────────────────────────
const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '');
const mtimeISO = (p) => (existsSync(p) ? statSync(p).mtime.toISOString() : new Date().toISOString());

function cleanPrice(raw) {
  if (raw == null || raw === '') return null;
  const n = parseFloat(String(raw).replace(/,/g, '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function shortUrl(url) {
  try {
    const u = new URL(url);
    return (u.host + u.pathname).replace(/\/$/, '');
  } catch {
    return String(url).replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
}

function slugToName(url) {
  try {
    const seg = new URL(url).pathname.split('/').filter(Boolean).pop() || 'Untitled';
    return decodeURIComponent(seg).replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).slice(0, 60);
  } catch {
    return 'Untitled';
  }
}

// "[2026-07-19]" (date only) -> ISO at noon UTC so ordering is stable
const dateToISO = (d) => new Date(`${d}T12:00:00Z`).toISOString();

// RFC-4180-ish single line split (honours quoted commas)
function parseCsvLine(line) {
  const out = [];
  let cur = '';
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (q) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; } else q = false;
      } else cur += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { out.push(cur); cur = ''; } else cur += ch;
  }
  out.push(cur);
  return out;
}

function readUrls() {
  return read(F.urls)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));
}

// ── data.csv -> products with full history ────────────────────────────────────
function readProducts() {
  const byUrl = new Map(); // url -> { name, history:[{t,price,in_stock}] }
  const order = []; // url discovery order from CSV
  for (const line of read(F.data).split(/\r?\n/)) {
    if (!line.trim() || line === CSV_HEADER) continue;
    const cols = parseCsvLine(line);
    if (cols.length < 5) continue;
    const [t, url, name, priceStr, stockStr] = cols;
    const point = {
      t,
      price: cleanPrice(priceStr),
      in_stock: stockStr === 'true' ? true : stockStr === 'false' ? false : null,
    };
    if (!byUrl.has(url)) { byUrl.set(url, { name, history: [] }); order.push(url); }
    const rec = byUrl.get(url);
    rec.name = name || rec.name;
    rec.history.push(point);
  }

  // Monitored URLs first (urls.txt order), then any CSV-only extras.
  const monitored = readUrls();
  const seen = new Set();
  const urls = [];
  for (const u of [...monitored, ...order]) {
    if (!seen.has(u)) { seen.add(u); urls.push(u); }
  }

  return urls.map((url) => {
    const rec = byUrl.get(url);
    const history = rec ? rec.history : [];
    const last = history[history.length - 1] || null;
    return {
      url,
      name: rec?.name || slugToName(url),
      price: last ? last.price : null,
      in_stock: last ? last.in_stock : null,
      lastChecked: last ? last.t : null,
      history: history.map((h) => ({ t: h.t, price: h.price, in_stock: h.in_stock })),
      _new: history.length === 0 || undefined,
    };
  });
}

// map a short url from a log line back to a full monitored URL when possible
function makeUrlResolver(products) {
  const byShort = new Map(products.map((p) => [shortUrl(p.url), p.url]));
  return (short) => byShort.get(short) || `https://${short}/`;
}

// ── changes: real transitions in the CSV + explicit changes.log lines ─────────
function readChanges() {
  const products = readProducts();
  const resolve = makeUrlResolver(products);
  const out = [];

  // 1) Real observed transitions between consecutive scrapes (real timestamps).
  for (const p of products) {
    for (let i = 1; i < p.history.length; i++) {
      const a = p.history[i - 1];
      const b = p.history[i];
      if (a.price != null && b.price != null && b.price !== a.price) {
        out.push({ t: b.t, type: b.price < a.price ? 'PRICE_DROP' : 'PRICE_RISE', url: p.url, from: a.price, to: b.price });
      }
      if (a.in_stock === false && b.in_stock === true) {
        out.push({ t: b.t, type: 'BACK_IN_STOCK', url: p.url, from: null, to: null });
      }
    }
  }

  // 2) Explicit lines the scraper wrote to changes.log (esp. SELF-HEALED,
  //    which never appears in the CSV).
  const logTime = mtimeISO(F.changes);
  for (const raw of read(F.changes).split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    let m;
    if ((m = line.match(/^SELF-HEALED\s+(.+)$/))) {
      out.push({ t: logTime, type: 'SELF_HEALED', url: resolve(m[1].trim()), from: null, to: null });
    } else if ((m = line.match(/^\[(.+?)\]\s+PRICE (DROP|RISE)\s+(\S+)\s+£?([\d.,]+)\s*->\s*£?([\d.,]+)/))) {
      out.push({ t: dateToISO(m[1]), type: `PRICE_${m[2]}`, url: resolve(m[3]), from: cleanPrice(m[4]), to: cleanPrice(m[5]) });
    } else if ((m = line.match(/^\[(.+?)\]\s+BACK IN STOCK\s+(\S+)/))) {
      out.push({ t: dateToISO(m[1]), type: 'BACK_IN_STOCK', url: resolve(m[2]), from: null, to: null });
    }
  }

  // De-dupe (a CSV-derived event may also be in the log) and sort newest-first.
  const key = (c) => `${c.type}|${c.url}|${c.from}|${c.to}`;
  const bestByKey = new Map();
  for (const c of out) {
    const k = key(c);
    const prev = bestByKey.get(k);
    if (!prev || new Date(c.t) > new Date(prev.t)) bestByKey.set(k, c);
  }
  return [...bestByKey.values()].sort((a, b) => new Date(b.t) - new Date(a.t)).slice(0, 80);
}

// ── errors.txt -> [{ t, url, reason, loud }] ──────────────────────────────────
function readErrors() {
  const products = readProducts();
  const resolve = makeUrlResolver(products);
  const out = [];
  for (const raw of read(F.errors).split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const loud = line.startsWith('!!!');
    const body = loud ? line.replace(/^!!!\s*/, '').replace(/\s*!!!.*$/, '') : line;
    const m = body.match(/^\[(.+?)\]\s+(\S+)\s+—\s+(.+)$/);
    if (m) {
      out.push({ t: dateToISO(m[1]), url: resolve(m[2]), reason: (loud ? '!!! ' : '') + m[3].trim(), loud });
    } else {
      out.push({ t: mtimeISO(F.errors), url: '', reason: line, loud });
    }
  }
  return out.sort((a, b) => new Date(b.t) - new Date(a.t));
}

// ── runs: a real ledger the dashboard appends to; seeded from run.log once ─────
function parseDoneLine(text) {
  const m = text.match(/Done\.\s+(\d+)\s+ok,\s+(\d+)\s+failed,\s+(\d+)\s+change/);
  return m ? { ok: +m[1], failed: +m[2], changes: +m[3] } : null;
}

function seedLedgerIfNeeded() {
  if (existsSync(F.ledger)) return;
  const t = mtimeISO(F.runlog);
  const lines = [];
  for (const l of read(F.runlog).split(/\r?\n/)) {
    const d = parseDoneLine(l);
    if (d) lines.push(JSON.stringify({ t, ok: d.ok, failed: d.failed, changes: d.changes, durationMs: null }));
  }
  if (lines.length) writeFileSync(F.ledger, lines.join('\n') + '\n');
}

function readRuns() {
  seedLedgerIfNeeded();
  const runs = [];
  for (const l of read(F.ledger).split(/\r?\n/)) {
    if (!l.trim()) continue;
    try { runs.push(JSON.parse(l)); } catch { /* skip bad line */ }
  }
  return runs.sort((a, b) => new Date(a.t) - new Date(b.t));
}

// ── schedule: from the installed crontab if present, else crontab.example ──────
function describeCron(cron) {
  const p = cron.split(/\s+/);
  if (p.length >= 5 && p[2] === '*' && p[3] === '*' && p[4] === '*' && /^\d+$/.test(p[0]) && /^\d+$/.test(p[1])) {
    return `Every day at ${String(p[1]).padStart(2, '0')}:${String(p[0]).padStart(2, '0')}`;
  }
  return `cron: ${cron}`;
}

function nextLastForCron(cron) {
  const p = cron.split(/\s+/);
  const min = /^\d+$/.test(p[0]) ? +p[0] : 0;
  const hr = /^\d+$/.test(p[1]) ? +p[1] : 7;
  const now = Date.now();
  const next = new Date(); next.setHours(hr, min, 0, 0);
  if (next.getTime() <= now) next.setTime(next.getTime() + DAY);
  const last = new Date(); last.setHours(hr, min, 0, 0);
  if (last.getTime() > now) last.setTime(last.getTime() - DAY);
  return { nextRun: next.toISOString(), lastRun: last.toISOString() };
}

function readSchedule() {
  let cron = '0 7 * * *';
  let mode = 'free';
  let source = 'crontab.example';

  // Prefer a real installed crontab line that runs this scraper.
  try {
    const live = execSync('crontab -l', { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
    const line = live.split(/\r?\n/).find((l) => /scrape\.js/.test(l) && !l.trim().startsWith('#'));
    if (line) {
      cron = line.trim().split(/\s+/).slice(0, 5).join(' ');
      mode = /claude\s+-p|claude -p|--allowedTools/.test(line) ? 'ai_digest' : 'free';
      source = 'crontab (installed)';
    }
  } catch { /* no crontab installed */ }

  if (source === 'crontab.example') {
    const line = read(F.cron).split(/\r?\n/).find((l) => /scrape\.js/.test(l) && !l.trim().startsWith('#'));
    if (line) cron = line.trim().split(/\s+/).slice(0, 5).join(' ');
  }

  return { cron, human: describeCron(cron), mode, source, ...nextLastForCron(cron) };
}

// ── digest.md -> [{ date, lines:[...] }] ──────────────────────────────────────
function readDigests() {
  const text = read(F.digest);
  if (!text.trim()) return [];
  const dateRe = /(\d{4}-\d{2}-\d{2})/;
  const blocks = [];
  let cur = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/^#+\s*/, '').replace(/^[-*]\s*/, '').trim();
    if (!line) continue;
    const isHeader = /^(#|\[|\d{4}-\d{2}-\d{2})/.test(raw.trim()) && dateRe.test(raw);
    if (isHeader) {
      const d = raw.match(dateRe)[1];
      cur = { date: d, lines: [] };
      blocks.push(cur);
      // a header may also carry text after the date
      const after = raw.replace(/^#+\s*/, '').replace(/\[?\d{4}-\d{2}-\d{2}\]?/, '').replace(/[—:-]/, '').trim();
      if (after) cur.lines.push(after);
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  return blocks.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ── running the real scraper (shared by run-scrape + rescan) ───────────────────
let inFlight = null;
function runScraper() {
  if (inFlight) return inFlight; // coalesce concurrent triggers
  inFlight = new Promise((resolve) => {
    const started = Date.now();
    const child = spawn('node', ['scrape.js'], { cwd: ROOT });
    let out = '';
    child.stdout.on('data', (d) => { out += d.toString(); });
    child.stderr.on('data', (d) => { out += d.toString(); });
    child.on('close', () => {
      const durationMs = Date.now() - started;
      const done = out.split(/\r?\n/).map(parseDoneLine).filter(Boolean).pop() || { ok: 0, failed: 0, changes: 0 };
      const run = { t: new Date().toISOString(), ok: done.ok, failed: done.failed, changes: done.changes, durationMs };
      appendFileSync(F.runlog, out.endsWith('\n') ? out : out + '\n'); // keep run.log real, like cron does
      seedLedgerIfNeeded();
      appendFileSync(F.ledger, JSON.stringify(run) + '\n');
      inFlight = null;
      resolve(run);
    });
    child.on('error', () => {
      inFlight = null;
      resolve({ t: new Date().toISOString(), ok: 0, failed: 0, changes: 0, durationMs: Date.now() - started });
    });
  });
  return inFlight;
}

// ── urls.txt mutations ─────────────────────────────────────────────────────────
function addUrls(urls) {
  const existing = new Set(readUrls());
  const toAdd = urls.filter((u) => u && !existing.has(u));
  if (toAdd.length) {
    const cur = read(F.urls);
    const prefix = cur.length && !cur.endsWith('\n') ? '\n' : '';
    appendFileSync(F.urls, prefix + toAdd.join('\n') + '\n');
  }
  return { added: toAdd.length, products: readProducts() };
}

function removeUrls(urls) {
  const set = new Set(urls);
  const kept = read(F.urls)
    .split(/\r?\n/)
    .filter((line) => !set.has(line.trim()));
  writeFileSync(F.urls, kept.join('\n').replace(/\n+$/, '\n'));
  return { removed: urls.length, products: readProducts() };
}

// ── HTTP layer ─────────────────────────────────────────────────────────────────
const json = (res, body, code = 200) => {
  const s = JSON.stringify(body);
  res.writeHead(code, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(s);
};

function serveStatic(res, file, type) {
  if (!existsSync(file)) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' });
  res.end(readFileSync(file));
}

function readBody(req) {
  return new Promise((resolve) => {
    let b = '';
    req.on('data', (c) => { b += c; });
    req.on('end', () => { try { resolve(b ? JSON.parse(b) : {}); } catch { resolve({}); } });
  });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;

  try {
    // static
    if (req.method === 'GET' && (path === '/' || path === '/index.html'))
      return serveStatic(res, join(DASH, 'Data Autopilot.dc.html'), 'text/html; charset=utf-8');
    if (req.method === 'GET' && path === '/support.js')
      return serveStatic(res, join(DASH, 'support.js'), 'text/javascript; charset=utf-8');
    if (req.method === 'GET' && path === '/api.js')
      return serveStatic(res, join(DASH, 'api.js'), 'text/javascript; charset=utf-8');

    // read endpoints
    if (req.method === 'GET' && path === '/api/products') return json(res, readProducts());
    if (req.method === 'GET' && path === '/api/changes') return json(res, readChanges());
    if (req.method === 'GET' && path === '/api/errors') return json(res, readErrors());
    if (req.method === 'GET' && path === '/api/runs') return json(res, readRuns());
    if (req.method === 'GET' && path === '/api/schedule') return json(res, readSchedule());
    if (req.method === 'GET' && path === '/api/digests') return json(res, readDigests());

    // mutations
    if (req.method === 'POST' && path === '/api/add-urls') {
      const { urls = [] } = await readBody(req);
      return json(res, addUrls(urls));
    }
    if (req.method === 'POST' && path === '/api/remove-urls') {
      const { urls = [] } = await readBody(req);
      return json(res, removeUrls(urls));
    }
    if (req.method === 'POST' && path === '/api/rescan') {
      const { urls = [] } = await readBody(req);
      const run = await runScraper();
      return json(res, { rescanned: urls.length, at: run.t });
    }
    if (req.method === 'POST' && path === '/api/run-scrape') {
      const run = await runScraper();
      return json(res, { run, at: run.t });
    }

    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
  } catch (err) {
    json(res, { error: err.message }, 500);
  }
});

server.listen(PORT, () => {
  console.log(`Data Autopilot dashboard  →  http://localhost:${PORT}`);
  console.log(`Serving real data from ${ROOT}`);
});
