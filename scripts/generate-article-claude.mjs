#!/usr/bin/env node
/**
 * AmareNL Article Generator — Claude API (Faz 2)
 *
 * Reads content/article-queue.md directly (no brittle checkbox parser —
 * Claude picks the best next topic itself, the same way a human editor
 * would read that document) and writes ONE validated blog article.
 * Appends it to data/extra-articles.json, same as the legacy pipeline.
 *
 * Usage: node scripts/generate-article-claude.mjs
 *
 * Required env: ANTHROPIC_API_KEY
 * Optional env: ANTHROPIC_MODEL (default: claude-sonnet-5)
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("ERROR: ANTHROPIC_API_KEY not set");
  process.exit(1);
}

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
const MAX_ATTEMPTS = 3;
const CATEGORIES = ["darmen", "mentaal", "schoonheid", "essentials", "energie", "gewichtsbeheer"];
const FORBIDDEN_CLAIMS = ["geneest", "behandelt", "klinisch bewezen", "voorkomt", "garantie op", "wondermiddel"];
// Common non-Dutch words that have slipped into past output (Turkish especially,
// since sessions writing this content have been bilingual TR/NL).
const FOREIGN_WORD_MARKERS = [
  "sıvı", "kelime", "ürün", "makale", "değil", "için", "olan", "sadece", "gerçek",
];

function readText(relPath) {
  return readFileSync(join(ROOT, relPath), "utf-8");
}

function collectExistingArticles() {
  const blogTs = readText("lib/blog.ts");
  const slugRe = /slug:\s*"([^"]+)"/g;
  const slugs = [...blogTs.matchAll(slugRe)].map((m) => m[1]).filter((s) => !s.startsWith("http"));

  const extraJson = JSON.parse(readText("data/extra-articles.json"));
  const bySlug = new Map();
  for (const s of slugs) bySlug.set(s, s);
  for (const a of extraJson) bySlug.set(a.slug, a.title || a.slug);
  return bySlug;
}

/** Trimmed product summary — full products.json is too large for the prompt
 *  and most fields (pricing, images, seo, tags) aren't needed for fact-checking. */
function buildProductSummary() {
  const products = JSON.parse(readText("data/products.json"));
  return products
    .map((p) => {
      const lines = [`### ${p.nameNL} (slug: ${p.slug})`, p.description?.long || p.taglineNL || ""];
      if (p.ingredients?.length) {
        lines.push("Ingrediënten: " + p.ingredients.map((i) => `${i.name}${i.amount ? ` (${i.amount})` : ""}`).join(", "));
      }
      if (p.benefits?.length) lines.push("Voordelen: " + p.benefits.join(", "));
      if (p.usage?.dosage) lines.push(`Gebruik: ${p.usage.dosage} ${p.usage.timing || ""}`.trim());
      return lines.join("\n");
    })
    .join("\n\n");
}

// ── PubMed (real, public E-utilities API — no key required, no scraping) ──────
const PUBMED_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

async function fetchPubMedAbstracts(searchTerms) {
  const blocks = [];
  for (const term of (searchTerms || []).slice(0, 3)) {
    try {
      const searchUrl = `${PUBMED_BASE}/esearch.fcgi?db=pubmed&retmode=json&retmax=3&sort=relevance&term=${encodeURIComponent(term)}`;
      const searchRes = await fetch(searchUrl, { signal: AbortSignal.timeout(15000) });
      const searchJson = await searchRes.json();
      const ids = searchJson?.esearchresult?.idlist || [];
      if (!ids.length) {
        console.log(`  PubMed: geen resultaten voor "${term}"`);
        continue;
      }

      const fetchUrl = `${PUBMED_BASE}/efetch.fcgi?db=pubmed&rettype=abstract&retmode=text&id=${ids.join(",")}`;
      const abstractRes = await fetch(fetchUrl, { signal: AbortSignal.timeout(15000) });
      const text = (await abstractRes.text()).trim();
      if (text) {
        console.log(`  PubMed: ${ids.length} resultaat/resultaten voor "${term}"`);
        blocks.push(`--- PubMed resultaten voor zoekterm "${term}" ---\n${text.slice(0, 4000)}`);
      }
      await new Promise((r) => setTimeout(r, 400)); // NCBI: max 3 req/sec zonder API key
    } catch (err) {
      console.warn(`  PubMed fetch mislukt voor "${term}": ${err.message}`);
    }
  }
  return blocks.join("\n\n");
}

// ── Concurrentie-context (uit tools/competitor-scraper/snapshot/, wekelijks bijgewerkt) ──
function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = false;
      } else cur += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

function buildCompetitorContext() {
  const dataPath = join(ROOT, "tools/competitor-scraper/snapshot/data.csv");
  const reviewsPath = join(ROOT, "tools/competitor-scraper/snapshot/reviews.csv");
  if (!existsSync(dataPath) && !existsSync(reviewsPath)) return "";

  const parts = [];
  if (existsSync(dataPath)) {
    const rows = readFileSync(dataPath, "utf-8").split(/\r?\n/).filter(Boolean).slice(1);
    const prices = rows.map((l) => parseFloat(parseCsvLine(l)[3])).filter((n) => Number.isFinite(n));
    if (prices.length) {
      parts.push(
        `Concurrent prijsrange (vitaminstore.nl): €${Math.min(...prices).toFixed(2)} - €${Math.max(...prices).toFixed(2)} (${prices.length} producten).`
      );
    }
  }
  if (existsSync(reviewsPath)) {
    const rows = readFileSync(reviewsPath, "utf-8").split(/\r?\n/).filter(Boolean).slice(1);
    const sample = rows
      .slice(0, 12)
      .map((l) => parseCsvLine(l))
      .filter((c) => c[6])
      .map((c) => `- "${c[5] || ""}": ${c[6]}`);
    if (sample.length) {
      parts.push(
        "Voorbeelden van echte klantvragen/opmerkingen bij concurrent-producten (alleen als thema-inspiratie,\n" +
          "NOOIT letterlijk overnemen):\n" +
          sample.join("\n")
      );
    }
  }
  return parts.join("\n\n");
}

function buildSystemPrompt(articleQualitySkill, claudeMdExcerpt) {
  return [
    "Jij bent een ervaren Nederlandse gezondheidsjournalist die blogartikelen schrijft voor amarenl.com.",
    "Je output is ALTIJD strict JSON — geen markdown codeblokken, geen uitleg erbuiten, alleen het JSON object.",
    "",
    "=== ARTIKEL KWALITEITSREGELS (sectie 0 is hard, niet onderhandelbaar) ===",
    articleQualitySkill,
    "",
    "=== PROJECT SEO/GEO CONTEXT (CLAUDE.md uittreksel) ===",
    claudeMdExcerpt,
  ].join("\n");
}

function buildTopicPrompt({ queueDoc, existingArticles }) {
  const existingSlugSet = [...existingArticles.keys()].join(", ");
  return [
    "Hieronder staat de volledige content/article-queue.md van amarenl.com — een redactieplan met",
    "meerdere tabellen (30-dagen planning, keyword-clusters, TIER-lijsten). Sommige onderwerpen zijn",
    "al gemarkeerd als voltooid (✅ / doorgestreept / 'live'), andere staan nog open (⏳).",
    "",
    "Kies het beste nog-niet-geschreven onderwerp — hoogste zoekvolume × commerciële intentie die nog",
    "geen ⏳→✅ transitie heeft gehad. Kies er precies één.",
    "Geef ook 2-3 Engelstalige PubMed-zoektermen die relevant wetenschappelijk onderzoek voor dit",
    "onderwerp zouden opleveren (PubMed indexeert vrijwel uitsluitend Engelstalige literatuur).",
    "",
    "=== content/article-queue.md ===",
    queueDoc,
    "",
    `VERBODEN SLUGS (al in gebruik): ${existingSlugSet}`,
    "",
    "Output ALLEEN dit JSON object (geen backticks, geen markdown):",
    '{"topic":"korte omschrijving van het gekozen onderwerp uit de queue","category":"darmen|mentaal|schoonheid|essentials|energie|gewichtsbeheer","pubmed_search_terms":["term1","term2"]}',
  ].join("\n");
}

function buildUserPrompt({ queueDoc, productSummary, existingArticles, previousErrors, topic, pubmedContext, competitorContext }) {
  const linkCandidates = [...existingArticles.entries()]
    .slice(0, 80)
    .map(([slug, title]) => `- ${slug} — ${title}`)
    .join("\n");
  const existingSlugSet = [...existingArticles.keys()].join(", ");

  const parts = topic
    ? [`Het onderwerp is al gekozen: "${topic}". Schrijf hier een compleet artikel over volgens de kwaliteitsregels.`]
    : [
        "Hieronder staat de volledige content/article-queue.md van amarenl.com — een redactieplan met",
        "meerdere tabellen (30-dagen planning, keyword-clusters, TIER-lijsten). Sommige onderwerpen zijn",
        "al gemarkeerd als voltooid (✅ / doorgestreept / 'live'), andere staan nog open (⏳).",
        "",
        "STAP 1: Kies zelf het beste nog-niet-geschreven onderwerp uit dit document — hoogste",
        "zoekvolume × commerciële intentie die nog geen ⏳→✅ transitie heeft gehad. Kies er precies één.",
        "STAP 2: Schrijf daar een compleet artikel over volgens de kwaliteitsregels.",
      ];

  parts.push("", "=== content/article-queue.md (voor context/toon/doelgroep) ===", queueDoc, "");

  if (pubmedContext) {
    parts.push(
      "=== ECHTE PUBMED-ONDERZOEKSRESULTATEN (gebruik dit als primaire bron voor wetenschappelijke claims —",
      "parafraseer in natuurlijk Nederlands, verzin GEEN extra details die hier niet in staan) ===",
      pubmedContext,
      ""
    );
  }

  if (competitorContext) {
    parts.push(
      "=== CONCURRENTIE-CONTEXT (alleen thema-inspiratie — NOOIT letterlijke tekst overnemen,",
      "puur signaal over wat klanten daadwerkelijk vragen/belangrijk vinden) ===",
      competitorContext,
      ""
    );
  }

  parts.push(
    "=== PRODUCTGEGEVENS (enige toegestane bron voor product-/ingrediëntclaims — verzin NOOIT",
    "een ingrediënt, werkingsmechanisme of claim die hier niet in staat) ===",
    productSummary,
    "",
    "BESTAANDE ARTIKELEN (gebruik minimaal 2 hiervan als interne link — kopieer de slug EXACT):",
    linkCandidates,
    "",
    `VERBODEN SLUGS (al in gebruik, kies een nieuwe unieke slug voor je nieuwe artikel): ${existingSlugSet}`,
    "",
    "Output ALLEEN dit JSON object (geen backticks, geen markdown):",
    '{"slug":"...","title":"...","category":"darmen|mentaal|schoonheid|essentials|energie|gewichtsbeheer","excerpt":"...","content":"<h2>...</h2><p>...</p>...","queue_topic_matched":"korte omschrijving van het gekozen onderwerp uit de queue, voor logging"}'
  );

  if (previousErrors?.length) {
    parts.push("", "=== VORIGE POGING MISLUKTE — CORRIGEER DIT ===", previousErrors.map((e) => `- ${e}`).join("\n"));
  }

  return parts.join("\n");
}

function validate(article, existingArticles) {
  const errors = [];
  if (!article || typeof article !== "object") return ["Output is geen geldig JSON object"];

  for (const field of ["slug", "title", "category", "excerpt", "content"]) {
    if (!article[field] || typeof article[field] !== "string") {
      errors.push(`Veld "${field}" ontbreekt of is geen string`);
    }
  }
  if (errors.length) return errors;

  if (existingArticles.has(article.slug)) {
    errors.push(`Slug "${article.slug}" bestaat al — kies een unieke slug`);
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(article.slug)) {
    errors.push(`Slug "${article.slug}" is geen geldige kebab-case slug`);
  }
  if (!CATEGORIES.includes(article.category)) {
    errors.push(`Category "${article.category}" is ongeldig — moet een van zijn: ${CATEGORIES.join(", ")}`);
  }

  const wordCount = article.content.split(/\s+/).filter(Boolean).length;
  if (wordCount < 800) {
    errors.push(`Content heeft maar ${wordCount} woorden — minimum is 800`);
  }

  if (/<script|import\s+\w+\s+from|AffiliateCTA|<\/?[A-Z]\w*[^>]*\/?>/.test(article.content)) {
    errors.push("Content bevat JSX/React componenten, <script> tags, of import statements — alleen pure HTML toegestaan");
  }

  // Raw markdown artifacts leaking into HTML output (section 0, hard rule).
  if (/(^|[\s>])#{1,6}\s|\*\*[^*]+\*\*/.test(article.content)) {
    errors.push('Content bevat ruwe markdown-tekens (#, ##, **) — moet pure HTML zijn zonder markdown-restjes');
  }

  // Spot-check for foreign-language leakage (section 0, hard rule).
  const lowerContent = article.content.toLowerCase();
  const leaked = FOREIGN_WORD_MARKERS.filter((w) => new RegExp(`\\b${w}\\b`, "i").test(lowerContent));
  if (leaked.length) {
    errors.push(`Mogelijk niet-Nederlandse woorden gevonden: ${leaked.join(", ")} — controleer en herschrijf in correct Nederlands`);
  }

  if (!/NVWA/i.test(article.content)) {
    errors.push("NVWA disclaimer ontbreekt in de content");
  }

  const linkMatches = [...article.content.matchAll(/\/blogs\/nieuws\/([a-z0-9-]+)/g)].map((m) => m[1]);
  const validLinks = linkMatches.filter((slug) => existingArticles.has(slug));
  if (validLinks.length < 1) {
    console.warn("  (waarschuwing: geen interne link naar een bestaand artikel gevonden — publicatie gaat toch door)");
  }

  for (const claim of FORBIDDEN_CLAIMS) {
    if (lowerContent.includes(claim)) {
      errors.push(`Verboden medische claim gevonden: "${claim}"`);
    }
  }

  return errors;
}

async function pickTopic(client, ctx, systemPrompt) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await client.messages.create({
        model: MODEL,
        // Extended thinking shares this budget — a small cap here (like a plain
        // 2000-token guess) leaves zero room for the actual JSON text block once
        // thinking eats into it, same failure mode fixed for generateArticle().
        max_tokens: 6000,
        system: systemPrompt,
        messages: [{ role: "user", content: buildTopicPrompt(ctx) }],
      });
      const raw = response.content?.find((b) => b.type === "text")?.text || "";
      const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");
      const parsed = JSON.parse(cleaned);
      if (parsed?.topic) return parsed;
    } catch (err) {
      console.warn(`[topic-pick attempt ${attempt}] mislukt: ${err.message}`);
    }
  }
  return null;
}

async function generateArticle(client, ctx, systemPrompt) {
  let previousErrors = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`[attempt ${attempt}/${MAX_ATTEMPTS}] Generating article from article-queue.md`);

    let raw;
    try {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 16000,
        system: systemPrompt,
        messages: [{ role: "user", content: buildUserPrompt({ ...ctx, previousErrors }) }],
      });
      // With extended thinking enabled, content[0] is a "thinking" block —
      // the actual answer is the first block with type "text".
      raw = response.content?.find((b) => b.type === "text")?.text || "";
      if (process.env.DEBUG_DUMP) {
        console.error(`  DEBUG stop_reason=${response.stop_reason} usage=${JSON.stringify(response.usage)} raw_length=${raw.length}`);
        writeFileSync(join(ROOT, `debug-claude-attempt-${attempt}.txt`), raw);
      }
    } catch (err) {
      console.error(`[attempt ${attempt}] API call failed: ${err.message}`);
      previousErrors = [`API call failed: ${err.message}`];
      continue;
    }

    let parsed;
    try {
      const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error(`[attempt ${attempt}] JSON parse failed: ${err.message}`);
      previousErrors = [`JSON parse failed: ${err.message}. Output moet PUUR JSON zijn, geen markdown.`];
      continue;
    }

    if (parsed?.queue_topic_matched) {
      console.log(`  Gekozen onderwerp: ${parsed.queue_topic_matched}`);
      delete parsed.queue_topic_matched;
    }

    if (parsed?.slug && ctx.existingArticles.has(parsed.slug) && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(parsed.slug)) {
      let n = 2;
      let candidate = `${parsed.slug}-${n}`;
      while (ctx.existingArticles.has(candidate)) {
        n += 1;
        candidate = `${parsed.slug}-${n}`;
      }
      console.log(`[attempt ${attempt}] Slug "${parsed.slug}" already exists — auto-renamed to "${candidate}"`);
      parsed.slug = candidate;
    }

    const errors = validate(parsed, ctx.existingArticles);
    if (errors.length === 0) {
      parsed.date = new Date().toISOString().slice(0, 10);
      console.log(`[attempt ${attempt}] Article validated successfully: ${parsed.slug}`);
      return parsed;
    }

    console.error(`[attempt ${attempt}] Validation failed:\n${errors.map((e) => `  - ${e}`).join("\n")}`);
    previousErrors = errors;
  }

  return null;
}

async function main() {
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  const existingArticles = collectExistingArticles();
  const articleQualitySkill = readText(".claude/skills/article-quality.md");
  const claudeMd = readText("CLAUDE.md");
  const seoSection = claudeMd.includes("## 13. SEO")
    ? claudeMd.split("## 13. SEO")[1].split("## 14.")[0]
    : "";
  const verbodenSection = claudeMd.includes("## 17. NIET DOEN")
    ? claudeMd.split("## 17. NIET DOEN")[1].split("---")[0]
    : "";
  const systemPrompt = buildSystemPrompt(articleQualitySkill, `${seoSection}\n${verbodenSection}`);

  const queueDoc = readText("content/article-queue.md");
  const productSummary = buildProductSummary();
  const competitorContext = buildCompetitorContext();

  console.log("Onderwerp kiezen + PubMed-zoektermen bepalen...");
  const topicPick = await pickTopic(client, { queueDoc, existingArticles }, systemPrompt);

  let pubmedContext = "";
  if (topicPick?.topic) {
    console.log(`  Gekozen onderwerp: ${topicPick.topic}`);
    if (topicPick.pubmed_search_terms?.length) {
      console.log(`  PubMed-zoektermen: ${topicPick.pubmed_search_terms.join(", ")}`);
      pubmedContext = await fetchPubMedAbstracts(topicPick.pubmed_search_terms);
    }
  } else {
    console.warn("  Onderwerp-selectie mislukt — val terug op zelf-kiezende flow zonder PubMed-context.");
  }

  const article = await generateArticle(
    client,
    { queueDoc, productSummary, existingArticles, topic: topicPick?.topic, pubmedContext, competitorContext },
    systemPrompt
  );

  if (!article) {
    console.error(`FAILED: could not generate a valid article after ${MAX_ATTEMPTS} attempts.`);
    process.exit(1);
  }

  const extraArticlesPath = join(ROOT, "data/extra-articles.json");
  const current = JSON.parse(readFileSync(extraArticlesPath, "utf-8"));
  current.push(article);
  writeFileSync(extraArticlesPath, JSON.stringify(current, null, 2) + "\n", "utf-8");

  console.log(`\nSUCCESS: "${article.title}" (${article.slug}) added to data/extra-articles.json`);

  if (process.env.GITHUB_OUTPUT) {
    const delim = `ghadelim_${Math.random().toString(36).slice(2)}`;
    const out = [
      `slug=${article.slug}`,
      `title<<${delim}`,
      article.title,
      delim,
      `excerpt<<${delim}`,
      article.excerpt,
      delim,
      "",
    ].join("\n");
    writeFileSync(process.env.GITHUB_OUTPUT, out, { flag: "a" });
  }
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
