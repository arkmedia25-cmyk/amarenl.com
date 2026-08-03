// Discover all product URLs under a category listing page (paginated with
// ?page=N) and append the new ones to urls.txt. Read-only against the site;
// only urls.txt is written.
import { load } from 'cheerio';
import { existsSync, readFileSync, appendFileSync } from 'node:fs';

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const REQUEST_DELAY_MS = 2000;
const MAX_PAGES = 20;
const URLS_FILE = 'urls.txt';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(url) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extractProductLinks(html, baseUrl) {
  const $ = load(html);
  const links = new Set();
  $('a[href^="/product/"]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    const abs = new URL(href, baseUrl).toString().split('?')[0];
    links.add(abs);
  });
  return links;
}

function readExistingUrls() {
  if (!existsSync(URLS_FILE)) return new Set();
  return new Set(
    readFileSync(URLS_FILE, 'utf8')
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'))
  );
}

async function main() {
  const categoryUrl = process.argv[2];
  if (!categoryUrl) {
    console.error('Usage: node scripts/discover-category.js <category-url>');
    process.exitCode = 1;
    return;
  }

  const all = new Set();
  for (let page = 1; page <= MAX_PAGES; page++) {
    const sep = categoryUrl.includes('?') ? '&' : '?';
    const url = page === 1 ? categoryUrl : `${categoryUrl}${sep}page=${page}`;
    let html;
    try {
      html = await fetchPage(url);
    } catch (err) {
      console.log(`  page ${page}: stop (${err.message})`);
      break;
    }
    const links = extractProductLinks(html, categoryUrl);
    const before = all.size;
    for (const l of links) all.add(l);
    console.log(`  page ${page}: ${links.size} product links found (${all.size} unique so far)`);
    if (page > 1 && all.size === before) {
      console.log('  no new products on this page -> stopping pagination');
      break;
    }
    if (page < MAX_PAGES) await sleep(REQUEST_DELAY_MS);
  }

  const existing = readExistingUrls();
  const toAdd = [...all].filter((u) => !existing.has(u));

  if (toAdd.length === 0) {
    console.log(`\nDone. ${all.size} products found, 0 new (all already in ${URLS_FILE}).`);
    return;
  }

  const cur = existsSync(URLS_FILE) ? readFileSync(URLS_FILE, 'utf8') : '';
  const prefix = cur.length && !cur.endsWith('\n') ? '\n' : '';
  const header = cur.length ? '' : '# One product URL per line. Lines starting with # are ignored.\n';
  appendFileSync(
    URLS_FILE,
    header + prefix + `\n# Discovered from ${categoryUrl}\n` + toAdd.join('\n') + '\n'
  );

  console.log(`\nDone. ${all.size} products found, ${toAdd.length} new added to ${URLS_FILE}.`);
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exitCode = 1;
});
