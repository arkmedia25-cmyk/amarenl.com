/**
 * Auto-publish: elke 2 günde bir staging'deki sıradaki makaleyi yayınlar.
 * Cron: 0 9 * * 1,3,5 (Pzt-Çrş-Cum 09:00)
 * Manuel: npx tsx auto-publish.ts
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import "dotenv/config";

const PROJECT_ROOT = process.env.PROJECT_ROOT || "/Users/ark/projects/amarenl.com";
const STAGING_DIR = join(PROJECT_ROOT, "data/staging");
const EXTRA_ARTICLES = join(PROJECT_ROOT, "data/extra-articles.json");
const PUBLISHED_DIR = join(PROJECT_ROOT, "data/staging/published");

function rel(p: string) { return join(PROJECT_ROOT, p); }

// Get today's date in YYYY-MM-DD
const today = new Date().toISOString().split("T")[0];
console.log(`📅 Auto-publish check — ${today}`);

// Find staging files matching today or earlier
if (!existsSync(STAGING_DIR)) {
  console.log("No staging directory");
  process.exit(0);
}

const files = readdirSync(STAGING_DIR)
  .filter(f => f.endsWith(".json"))
  .sort();

if (files.length === 0) {
  console.log("📭 Staging queue empty — nothing to publish");
  process.exit(0);
}

// Take the first file in queue
const nextFile = files[0];
const stagingPath = join(STAGING_DIR, nextFile);
const article = JSON.parse(readFileSync(stagingPath, "utf-8"));

console.log(`📝 Publishing: ${article.title}`);
console.log(`   Slug: ${article.slug}`);
console.log(`   Date: ${article.date}`);

// Read current extra-articles
const currentArticles = JSON.parse(readFileSync(EXTRA_ARTICLES, "utf-8"));

// Check if already published
if (currentArticles.find((a: any) => a.slug === article.slug)) {
  console.log(`⚠️  Already published, skipping`);
  // Move to published
  if (!existsSync(PUBLISHED_DIR)) mkdirSync(PUBLISHED_DIR, { recursive: true });
  writeFileSync(join(PUBLISHED_DIR, nextFile), JSON.stringify(article, null, 2));
  try { require("fs").unlinkSync(stagingPath); } catch {}
  process.exit(0);
}

// Add to extra-articles (at the beginning for newest first)
currentArticles.unshift({
  slug: article.slug,
  title: article.title,
  date: article.date,
  category: article.category,
  excerpt: article.excerpt,
  metaDescription: article.metaDescription,
  content: article.content,
  tags: article.tags || [],
});

writeFileSync(EXTRA_ARTICLES, JSON.stringify(currentArticles, null, 2));
console.log(`✅ Added to extra-articles.json (${currentArticles.length} total)`);

// Move staging file to published
if (!existsSync(PUBLISHED_DIR)) mkdirSync(PUBLISHED_DIR, { recursive: true });
writeFileSync(join(PUBLISHED_DIR, nextFile), JSON.stringify(article, null, 2));
try { require("fs").unlinkSync(stagingPath); } catch {}
console.log(`✅ Moved to published`);

// Build
console.log("🔨 Building...");
execSync("npm run build", { cwd: PROJECT_ROOT, stdio: "inherit" });

// Git commit
console.log("📦 Committing...");
execSync("git add -A", { cwd: PROJECT_ROOT });
execSync(`git commit -m "publish: ${article.slug} (auto)"`, { cwd: PROJECT_ROOT });
execSync("git push", { cwd: PROJECT_ROOT });

// Deploy
console.log("🚀 Deploying...");
execSync("vercel --yes --prod", { cwd: PROJECT_ROOT, stdio: "inherit" });

console.log("🎉 Published and deployed!");
