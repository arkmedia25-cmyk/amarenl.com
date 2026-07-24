#!/usr/bin/env node
/**
 * AmareNL Article Generator — GitHub Actions pipeline
 *
 * Generates ONE validated blog article via DeepSeek (non-streaming) and appends
 * it to data/extra-articles.json. Replaces the old Hermes cron pipeline —
 * runs entirely inside GitHub Actions, no dependency on Hermes or a local Mac.
 *
 * Usage: node scripts/generate-article.mjs <general|product>
 *
 * Required env: DEEPSEEK_API_KEY
 * Optional env: DEEPSEEK_MODEL (default: deepseek-chat), DEEPSEEK_BASE_URL
 */

import OpenAI from "openai";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const MODE = process.argv[2];
if (!["general", "product"].includes(MODE)) {
  console.error("Usage: node scripts/generate-article.mjs <general|product>");
  process.exit(1);
}

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
if (!DEEPSEEK_API_KEY) {
  console.error("ERROR: DEEPSEEK_API_KEY not set");
  process.exit(1);
}

const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";
const BASE_URL = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1";
const MAX_ATTEMPTS = 3;

const TOPIC_POOLS = {
  general: [
    "darmflora", "stress", "energie", "collageen", "probiotica",
    "vitamines", "magnesium", "omega-3", "slaap", "focus",
    "immuunsysteem", "gewichtsbeheer",
  ],
  product: [
    "Happy Juice Pack", "HL5", "MentaBiotics", "Energy+", "Sunrise",
    "Restore", "EDGE+", "Origin", "FIT20", "Sunset",
  ],
};

const CATEGORIES = ["darmen", "mentaal", "schoonheid", "essentials", "energie", "gewichtsbeheer"];
const FORBIDDEN_CLAIMS = ["geneest", "behandelt", "klinisch bewezen", "voorkomt", "garantie op", "wondermiddel"];

function readText(relPath) {
  return readFileSync(join(ROOT, relPath), "utf-8");
}

/** Collect every existing slug (+ title where available) from blog.ts and extra-articles.json. */
function collectExistingArticles() {
  const blogTs = readText("lib/blog.ts");
  const slugRe = /slug:\s*"([^"]+)"/g;
  const titleRe = /title:\s*"([^"]+)"/g;
  const slugs = [...blogTs.matchAll(slugRe)].map((m) => m[1]);

  const extraJson = JSON.parse(readText("data/extra-articles.json"));
  const extraArticles = extraJson.map((a) => ({ slug: a.slug, title: a.title }));

  const blogTsArticles = slugs
    .filter((s) => !s.startsWith("http")) // guard against accidental URL matches elsewhere in file
    .map((s) => ({ slug: s, title: null }));

  const bySlug = new Map();
  for (const a of [...blogTsArticles, ...extraArticles]) {
    if (!bySlug.has(a.slug)) bySlug.set(a.slug, a.title || a.slug);
  }
  return bySlug; // Map<slug, title>
}

function buildSystemPrompt(articleQualitySkill, claudeMdExcerpt) {
  return [
    "Jij bent een ervaren Nederlandse gezondheidsjournalist die blogartikelen schrijft voor amarenl.com.",
    "Je output is ALTIJD strict JSON — geen markdown codeblokken, geen uitleg erbuiten, alleen het JSON object.",
    "",
    "=== ARTIKEL KWALITEITSREGELS ===",
    articleQualitySkill,
    "",
    "=== PROJECT SEO/GEO CONTEXT (CLAUDE.md uittreksel) ===",
    claudeMdExcerpt,
  ].join("\n");
}

function buildUserPrompt({ topic, existingArticles, previousErrors }) {
  const linkCandidates = [...existingArticles.entries()]
    .slice(0, 60)
    .map(([slug, title]) => `- ${slug} — ${title}`)
    .join("\n");
  const existingSlugSet = [...existingArticles.keys()].join(", ");

  const parts = [
    `Schrijf 1 blog artikel voor amarenl.com over het onderwerp: "${topic}".`,
    "",
    "BESTAANDE ARTIKELEN (gebruik minimaal 2 hiervan als interne link — kopieer de slug EXACT, verzin nooit een slug):",
    linkCandidates,
    "",
    `VERBODEN SLUGS (al in gebruik, kies een nieuwe unieke slug): ${existingSlugSet}`,
    "",
    "Output ALLEEN dit JSON object (geen backticks, geen markdown):",
    '{"slug":"...","title":"...","category":"darmen|mentaal|schoonheid|essentials|energie|gewichtsbeheer","excerpt":"...","content":"<h2>...</h2><p>...</p>..."}',
  ];

  if (previousErrors?.length) {
    parts.push(
      "",
      "=== VORIGE POGING MISLUKTE — CORRIGEER DIT ===",
      previousErrors.map((e) => `- ${e}`).join("\n")
    );
  }

  return parts.join("\n");
}

function validate(article, existingArticles) {
  const errors = [];

  if (!article || typeof article !== "object") {
    return ["Output is geen geldig JSON object"];
  }

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

  if (!/NVWA/i.test(article.content)) {
    errors.push("NVWA disclaimer ontbreekt in de content");
  }

  const linkMatches = [...article.content.matchAll(/\/blogs\/nieuws\/([a-z0-9-]+)/g)].map((m) => m[1]);
  const validLinks = linkMatches.filter((slug) => existingArticles.has(slug));
  if (validLinks.length < 2) {
    errors.push(
      `Slechts ${validLinks.length} geldige interne link(s) gevonden (minimaal 2 nodig, moeten verwijzen naar bestaande slugs uit de lijst)`
    );
  }

  const lowerContent = article.content.toLowerCase();
  for (const claim of FORBIDDEN_CLAIMS) {
    if (lowerContent.includes(claim)) {
      errors.push(`Verboden medische claim gevonden: "${claim}"`);
    }
  }

  return errors;
}

async function generateArticle(client, topic, existingArticles, systemPrompt) {
  let previousErrors = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`[attempt ${attempt}/${MAX_ATTEMPTS}] Generating article for topic: ${topic}`);

    let raw;
    try {
      const response = await client.chat.completions.create({
        model: MODEL,
        stream: false, // non-streaming — avoids the stream-stale/connection-drop failure mode
        temperature: 0.8,
        max_tokens: 8000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: buildUserPrompt({ topic, existingArticles, previousErrors }) },
        ],
      });
      raw = response.choices[0]?.message?.content || "";
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

    const errors = validate(parsed, existingArticles);
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
  const client = new OpenAI({ apiKey: DEEPSEEK_API_KEY, baseURL: BASE_URL });

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

  const pool = TOPIC_POOLS[MODE];
  const topic = pool[Math.floor(Math.random() * pool.length)];

  const article = await generateArticle(client, topic, existingArticles, systemPrompt);

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
    writeFileSync(process.env.GITHUB_OUTPUT, `slug=${article.slug}\ntitle=${article.title}\n`, { flag: "a" });
  }
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
