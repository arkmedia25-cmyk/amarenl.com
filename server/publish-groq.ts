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
- Minimaal 1200 woorden
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

  if (!content || content.length < 500) {
    console.error("❌ Groq returned empty or too short content");
    process.exit(1);
  }

  // Save MDX file for reference
  const mdxPath = `content/blog/${slug}.mdx`;
  writeText(mdxPath, content);
  console.log(`✅ MDX saved: ${mdxPath} (${content.length} chars)`);

  // Parse MDX frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const frontmatter = fmMatch?.[1] || '';
  const bodyContent = fmMatch?.[2] || content;

  const getFM = (key: string) => {
    const m = frontmatter.match(new RegExp(`${key}:\\s*(.+)`));
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
  };

  const title = getFM('title') || articleTopic;
  const date = getFM('date') || new Date().toISOString().split('T')[0];
  const category = getFM('category') || 'schoonheid';
  const excerpt = getFM('excerpt') || title;
  const metaDesc = getFM('metaDescription') || excerpt;

  // Convert MDX body to HTML (basic)
  let html = bodyContent
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n- (.+)/g, '\n<li>$1</li>');

  html = '<p>' + html.replace(/\n/g, ' ') + '</p>';
  html = html.replace(/<p>\s*<\/p>/g, '').replace(/<p><h/g, '<h').replace(/<\/h><\/p>/g, '</h>');

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
