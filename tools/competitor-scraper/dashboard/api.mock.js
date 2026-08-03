// ─────────────────────────────────────────────────────────────────────────
// Data Autopilot — data layer.
// This is the ONLY module that touches data. Swap the mock bodies for real
// `fetch()` calls later; the UI never changes. Every function is async and
// returns plain JSON matching the documented shapes.
// ─────────────────────────────────────────────────────────────────────────

const LATENCY = 260; // simulated network latency (ms)
const wait = (ms = LATENCY) => new Promise(r => setTimeout(r, ms));

// Deterministic PRNG so the seed data is stable across reloads.
function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const rng = makeRng(20260719);
const pick = arr => arr[Math.floor(rng() * arr.length)];
const between = (a, b) => a + rng() * (b - a);
const round2 = n => Math.round(n * 100) / 100;

const DAY = 86400000;
const NOW = Date.now();
const iso = ms => new Date(ms).toISOString();

// ── Product catalogue ──────────────────────────────────────────────────────
const CATALOG = [
  ["Sony WH-1000XM5 Wireless Headphones", "sony.example.com", 379, 259, 399],
  ["Apple AirPods Pro (2nd gen, USB-C)", "apple.example.com", 229, 189, 249],
  ["Dyson V15 Detect Absolute Vacuum", "dyson.example.com", 599, 449, 649],
  ["LEGO Icons Bonsai Tree 10281", "lego.example.com", 44.99, 34.99, 49.99],
  ["Ninja Foodi 11-in-1 SmartLid", "ninja.example.com", 249.99, 179.99, 269.99],
  ["Kindle Paperwhite 16GB Signature", "amazon.example.com", 179.99, 139.99, 189.99],
  ["Samsung 990 Pro 2TB NVMe SSD", "samsung.example.com", 189.99, 129.99, 219.99],
  ["Logitech MX Master 3S Mouse", "logitech.example.com", 99.99, 74.99, 109.99],
  ["Nintendo Switch OLED — White", "nintendo.example.com", 309.99, 289.99, 319.99],
  ["Bose QuietComfort Ultra Earbuds", "bose.example.com", 299.95, 229.95, 319.95],
  ["Nespresso Vertuo Next Coffee Machine", "nespresso.example.com", 129.99, 89.99, 149.99],
  ["Anker 737 Power Bank (24000mAh)", "anker.example.com", 129.99, 99.99, 139.99],
  ["Fitbit Charge 6 Fitness Tracker", "fitbit.example.com", 139.99, 99.99, 149.99],
  ["Instant Pot Duo Crisp 8L", "instantpot.example.com", 149.99, 119.99, 169.99],
  ["GoPro HERO12 Black", "gopro.example.com", 399.99, 329.99, 429.99],
  ["Philips Hue White & Colour Starter Kit", "philips.example.com", 179.99, 134.99, 199.99],
  ["Elgato Stream Deck MK.2", "elgato.example.com", 149.99, 119.99, 159.99],
  ["JBL Flip 6 Portable Speaker", "jbl.example.com", 129.99, 89.99, 139.99],
  ["Razer BlackWidow V4 Pro Keyboard", "razer.example.com", 229.99, 189.99, 249.99],
  ["Garmin Forerunner 265 Watch", "garmin.example.com", 429.99, 379.99, 449.99],
  ["Breville Barista Express Espresso", "breville.example.com", 599, 519, 649],
  ["Roomba Combo j7+ Robot Vacuum", "irobot.example.com", 799, 599, 899],
  ["Sonos Era 100 Smart Speaker", "sonos.example.com", 249, 219, 259],
  ["DJI Mini 4 Pro Drone", "dji.example.com", 689, 649, 739],
  ["Oral-B iO Series 9 Toothbrush", "oralb.example.com", 279.99, 149.99, 299.99],
  ["Meta Quest 3 128GB Headset", "meta.example.com", 479.99, 429.99, 499.99],
  ["Theragun Prime Massage Device", "therabody.example.com", 249, 199, 279],
  ["Shark Stratos Cordless Vacuum", "shark.example.com", 399.99, 279.99, 449.99],
  ["Canon EOS R50 Mirrorless Camera", "canon.example.com", 789, 699, 849],
  ["Le Creuset Signature Casserole 24cm", "lecreuset.example.com", 285, 229, 305],
];

// Build 14 days of price/stock history for each product.
function buildProducts() {
  return CATALOG.map((row, i) => {
    const [name, host, base, lo, hi] = row;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const url = `https://${host}/p/${slug}`;
    const history = [];
    let price = round2(between(lo, hi));
    let inStock = rng() > 0.22;
    for (let d = 13; d >= 0; d--) {
      const t = NOW - d * DAY - Math.floor(between(0, 6)) * 3600000;
      // random walk, clamped to [lo, hi]
      if (rng() > 0.55) {
        const drift = between(-0.06, 0.06);
        price = round2(Math.min(hi, Math.max(lo, price * (1 + drift))));
      }
      if (rng() > 0.9) inStock = !inStock; // occasional stock flip
      history.push({ t: iso(t), price, in_stock: inStock });
    }
    const last = history[history.length - 1];
    // A few products are currently out of stock or failed (null).
    const broken = i === 6; // one product currently unreadable
    return {
      url,
      name,
      price: broken ? null : last.price,
      in_stock: broken ? null : last.in_stock,
      lastChecked: iso(NOW - Math.floor(between(2, 55)) * 60000),
      history,
    };
  });
}

const _products = buildProducts();

// Derive change events from history deltas + scripted highlights.
function buildChanges() {
  const out = [];
  _products.forEach(p => {
    for (let k = 1; k < p.history.length; k++) {
      const a = p.history[k - 1], b = p.history[k];
      if (a.price != null && b.price != null) {
        const delta = (b.price - a.price) / a.price;
        if (delta <= -0.04) out.push({ t: b.t, type: "PRICE_DROP", url: p.url, from: a.price, to: b.price });
        else if (delta >= 0.04) out.push({ t: b.t, type: "PRICE_RISE", url: p.url, from: a.price, to: b.price });
      }
      if (!a.in_stock && b.in_stock) out.push({ t: b.t, type: "BACK_IN_STOCK", url: p.url, from: null, to: null });
    }
  });
  // Scripted self-heal events.
  out.push({ t: iso(NOW - 3 * 3600000), type: "SELF_HEALED", url: _products[2].url, from: null, to: null });
  out.push({ t: iso(NOW - 26 * 3600000), type: "SELF_HEALED", url: _products[17].url, from: null, to: null });
  return out.sort((a, b) => new Date(b.t) - new Date(a.t)).slice(0, 80);
}

function buildErrors() {
  return [
    { t: iso(NOW - 40 * 60000), url: _products[6].url, reason: "!!! ALL SELECTORS FAILED — page layout changed, price/stock/name all unreadable", loud: true },
    { t: iso(NOW - 5 * 3600000), url: _products[11].url, reason: "HTTP 404 — product page not found", loud: false },
    { t: iso(NOW - 9 * 3600000), url: _products[19].url, reason: "HTTP 503 — service temporarily unavailable", loud: false },
    { t: iso(NOW - 28 * 3600000), url: _products[24].url, reason: "Timeout after 15000ms — no response", loud: false },
    { t: iso(NOW - 50 * 3600000), url: _products[11].url, reason: "HTTP 404 — product page not found", loud: false },
  ];
}

function buildRuns() {
  const runs = [];
  for (let d = 13; d >= 0; d--) {
    const failed = Math.floor(between(0, 4));
    runs.push({
      t: iso(NOW - d * DAY + 7 * 3600000 - NOW % DAY + NOW % DAY), // ~07:00 each day
      ok: CATALOG.length - failed,
      failed,
      changes: Math.floor(between(1, 9)),
      durationMs: Math.floor(between(38000, 92000)),
    });
  }
  // fix timestamps to be clean 07:00 marks
  return runs.map((r, i) => {
    const day = new Date(NOW - (13 - i) * DAY);
    day.setHours(7, 0, 0, 0);
    return { ...r, t: day.toISOString() };
  }).reverse();
}

function buildSchedule() {
  const next = new Date(NOW);
  next.setHours(7, 0, 0, 0);
  if (next.getTime() < NOW) next.setTime(next.getTime() + DAY);
  const last = new Date(NOW);
  last.setHours(7, 0, 0, 0);
  if (last.getTime() > NOW) last.setTime(last.getTime() - DAY);
  return {
    cron: "0 7 * * *",
    human: "Every day at 07:00",
    mode: "ai_digest",
    nextRun: next.toISOString(),
    lastRun: last.toISOString(),
  };
}

function buildDigests() {
  return [
    { date: new Date(NOW).toISOString().slice(0, 10), lines: [
      "3 price drops worth watching — Dyson V15 fell 8% and Roomba j7+ dropped £120 overnight.",
      "Sony WH-1000XM5 came back in stock after 2 days out; historically it sells through fast.",
      "One selector broke on Samsung 990 Pro — self-heal is retrying; no clean read yet today.",
    ]},
    { date: new Date(NOW - DAY).toISOString().slice(0, 10), lines: [
      "Quiet day: 2 changes total, both minor price rises under 5%.",
      "Meta Quest 3 held at its 30-day low for a third day — the promo looks stable.",
      "All 30 URLs read cleanly; average scrape time down to 41s.",
    ]},
    { date: new Date(NOW - 2 * DAY).toISOString().slice(0, 10), lines: [
      "GoPro HERO12 and Canon EOS R50 both crept up ~4% — supplier list-price refresh.",
      "Shark Stratos hit a new tracked low of £279.99, a 30% cut from list.",
      "A 404 on Anker 737 resolved itself on the next run; treat as transient.",
    ]},
  ];
}

// ── Mutable in-memory store (so add/remove feel real in the prototype) ──────
const store = {
  products: _products,
  changes: buildChanges(),
  errors: buildErrors(),
  runs: buildRuns(),
  schedule: buildSchedule(),
  digests: buildDigests(),
};

// ── Public data-layer API ───────────────────────────────────────────────────
export async function getProducts() { await wait(); return structuredClone(store.products); }
export async function getChanges()  { await wait(); return structuredClone(store.changes); }
export async function getErrors()   { await wait(); return structuredClone(store.errors); }
export async function getRuns()     { await wait(); return structuredClone(store.runs); }
export async function getSchedule() { await wait(120); return structuredClone(store.schedule); }
export async function getDigests()  { await wait(); return structuredClone(store.digests); }

export async function addUrls(urls) {
  await wait(420);
  const existing = new Set(store.products.map(p => p.url));
  const added = [];
  urls.forEach(url => {
    if (existing.has(url)) return;
    existing.add(url);
    let host = "site.example.com";
    try { host = new URL(url).hostname; } catch (e) {}
    const p = {
      url,
      name: decodeURIComponent((url.split("/").filter(Boolean).pop() || "New product").replace(/[-_]+/g, " "))
        .replace(/\b\w/g, c => c.toUpperCase()).slice(0, 60),
      price: null,
      in_stock: null,
      lastChecked: null,
      history: [],
      _new: true,
    };
    store.products.unshift(p);
    added.push(p);
  });
  return { added: added.length, products: structuredClone(store.products) };
}

export async function removeUrls(urls) {
  await wait(320);
  const set = new Set(urls);
  store.products = store.products.filter(p => !set.has(p.url));
  return { removed: urls.length, products: structuredClone(store.products) };
}

export async function rescan(urls) {
  await wait(650);
  const set = new Set(urls);
  const stamp = new Date().toISOString();
  store.products = store.products.map(p => set.has(p.url) ? { ...p, lastChecked: stamp } : p);
  return { rescanned: urls.length, at: stamp };
}

export async function runScrapeNow() {
  await wait(900);
  const failed = Math.floor(rng() * 3);
  const run = {
    t: new Date().toISOString(),
    ok: store.products.length - failed,
    failed,
    changes: Math.floor(rng() * 6),
    durationMs: Math.floor(between(35000, 70000)),
  };
  store.runs = [...store.runs, run];
  const stamp = run.t;
  store.products = store.products.map(p => ({ ...p, lastChecked: stamp }));
  store.schedule = { ...store.schedule, lastRun: stamp };
  return { run, at: stamp };
}
