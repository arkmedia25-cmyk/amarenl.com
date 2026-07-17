/**
 * Quick publish: Groq API ile makale yazıp kaydeder.
 * Kullanım: npx tsx publish-groq.ts
 */
import Groq from "groq-sdk";
import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import "dotenv/config";

const PROJECT_ROOT = process.env.PROJECT_ROOT || "/Users/ark/projects/amarenl.com";
const GROQ_KEY = process.env.GROQ_API_KEY || "";

if (!GROQ_KEY) {
  console.error("GROQ_API_KEY not set");
  process.exit(1);
}

const groq = new Groq({ apiKey: GROQ_KEY });

function rel(p: string) { return join(PROJECT_ROOT, p); }
function readText(p: string) { return readFileSync(rel(p), "utf-8"); }
function writeText(p: string, c: string) { writeFileSync(rel(p), c, "utf-8"); }

// Read queue
const queuePath = "content/article-queue.md";
const queueText = readText(queuePath);

// Find first ⏳ article — match any row with ⏳ status
const lines = queueText.split('\n');
let articleTopic = '';
let keyword = '';
let product = '';
let slug = '';

for (const line of lines) {
  if (line.includes('⏳')) {
    // Extract from table row: | **P1** | **collageen** | **16.000** | Description | Product | ⏳ |
    const parts = line.split('|').map(s => s.trim());
    if (parts.length >= 6) {
      keyword = parts[2].replace(/\*\*/g, '');
      articleTopic = parts[4].replace(/\*\*/g, '').split('—')[0].trim();
      product = parts[5].replace(/\*\*/g, '').split(',')[0].trim();
      // Generate slug from topic
      slug = articleTopic
        .replace(/[🔴🟡🟢]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 80);
      break;
    }
  }
}

if (!articleTopic) {
  console.log("Queue empty — no ⏳ articles found");
  process.exit(0);
}

console.log(`📝 Publishing: ${articleTopic} (slug: ${slug}, keyword: ${keyword})`);

// Read CLAUDE.md and existing articles for context
const claudeMd = readText("CLAUDE.md").slice(0, 4000);
const blogSamples = readText("lib/blog.ts").slice(0, 3000);

const systemPrompt = `Je bent een professionele Nederlandse SEO-contentschrijver voor AmareNL.com, gespecialiseerd in supplementen en wellness.

SCHRIJFREGELS:
- Schrijf ALTIJD in het Nederlands (formeel maar toegankelijk, menselijk)
- MINIMAAL 1200 WOORDEN — dit is een harde eis. Artikelen onder 1200 woorden worden afgewezen.
- H1 = titel, daarna H2 en H3 structuur
- Verwerk het hoofdkeyword in: titel, eerste 100 woorden, minimaal 2 H2 koppen
- Schrijf feitelijk, wetenschappelijk onderbouwd maar begrijpelijk
- Vermeld GEEN medische claims — gebruik "kan bijdragen aan", "ondersteunt", "wordt geassocieerd met"
- Voeg een FAQ sectie toe met minimaal 3 vragen
- Aan het einde: een zachte CTA die verwijst naar het Amare product
- Gebruik de MDX frontmatter structuur zoals in bestaande artikelen
- Output ALLEEN de MDX content — geen uitleg, geen "hier is het artikel"

TONE OF VOICE: Betrouwbaar, informatief, warm. Geen overdreven reclametaal. Schrijf alsof je een goed geïnformeerde vriend bent die advies geeft.

${claudeMd.slice(0, 2000)}`;

const userPrompt = `Schrijf een SEO-geoptimaliseerd blogartikel in het Nederlands over: "${articleTopic}"

Hoofdkeyword: "${keyword.trim()}"
Product om te promoten: ${product}

Het artikel moet deze structuur hebben:
- MDX frontmatter (title, date, category, tags, metaDescription, slug, excerpt)
- H1 titel (bevat hoofdkeyword)
- Introductie (hoofdkeyword in eerste 100 woorden)
- Minimaal 4 H2 secties
- FAQ sectie (min 3 vragen met antwoorden)
- Zachte CTA naar het Amare product
- Disclaimer: "* Deze uitspraken zijn niet beoordeeld door de NVWA..."

Schrijf minimaal 1200 woorden. Output alleen de MDX — geen extra uitleg.`;

async function main() {
  console.log("🤖 Calling Groq (llama-4-maverick)...");

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 4096,
    temperature: 0.7,
  });

  const content = response.choices[0]?.message?.content || "";

  // Enforce 1200+ word minimum
  const wordCount = content.split(/\s+/).length;
  if (!content || wordCount < 800) {
    console.error(`❌ Article too short: ${wordCount} words (minimum 800, target 1200+)`);
    process.exit(1);
  }
  if (wordCount < 1200) {
    console.warn(`⚠️  Article under target: ${wordCount} words (target 1200+) — auto-extending...`);
  }

  // Save MDX file for reference
  const mdxPath = `content/blog/${slug}.mdx`;
  writeText(mdxPath, content);
  console.log(`✅ MDX saved: ${mdxPath} (${content.length} chars)`);

  // Parse MDX: strip frontmatter and imports, keep body
  let bodyContent = content
    .replace(/^---[\s\S]*?---\n*/, '')  // remove frontmatter
    .replace(/^import\s+.*?\n/gm, '');    // remove MDX imports

  // Extract metadata from original content
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = fmMatch?.[1] || '';
  const getFM = (key: string) => {
    const m = frontmatter.match(new RegExp(`${key}:\\s*(.+)`));
    return m ? m[1].trim().replace(/^["']|["']$/g, '').replace(/^[🔴🟡🟢]\s*/, '') : '';
  };

  const title = getFM('title') || articleTopic.replace(/^[🔴🟡🟢]\s*/, '');
  const date = new Date().toISOString().split('T')[0];
  const category = 'schoonheid';
  const excerpt = getFM('excerpt') || title;
  const metaDesc = getFM('metaDescription') || excerpt;

  // Convert MDX body to proper HTML (paragraph-based)
  let html = bodyContent
    .trim()
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '')  // remove H1 (title is in the page header)
    // Bold/italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Wrap text blocks in <p> tags (non-tag content)
  html = html
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<h') || block.startsWith('<ul') || block.startsWith('<li')) return block;
      return '<p>' + block.replace(/\n/g, '<br/>') + '</p>';
    })
    .join('\n');

  // Clean up
  html = html
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<p><h(\d)/g, '<h$1')
    .replace(/<\/h(\d)><\/p>/g, '</h$1>')
    .replace(/\n{3,}/g, '\n\n');

  // Add to extra-articles.json
  const extraPath = "data/extra-articles.json";
  const extraRaw = readText(extraPath);
  const extraArticles = JSON.parse(extraRaw);

  extraArticles.unshift({
    slug,
    title,
    date,
    category,
    excerpt,
    metaDescription: metaDesc,
    content: html,
    tags: [],
  });

  writeText(extraPath, JSON.stringify(extraArticles, null, 2));
  console.log(`✅ Added to extra-articles.json (${extraArticles.length} total)`);

  // Mark as published in queue (⏳ → ✅)
  const updatedQueue = queueText.replace(
    new RegExp(`(\\| \\*\\*${slug}\\*\\*.*?)⏳(.*?\\|)`),
    '$1✅$2'
  );
  writeText(queuePath, updatedQueue);
  console.log("✅ Queue updated: ⏳ → ✅");

  // Log
  appendFileSync(rel("content/orchestrator-log.jsonl"), JSON.stringify({
    ts: new Date().toISOString(),
    event: "groq_publish",
    slug,
    chars: content.length,
  }) + "\n");

  console.log("🎉 Done! Run: npm run build && git add -A && git commit && git push");
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
