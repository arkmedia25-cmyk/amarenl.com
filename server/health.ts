/**
 * Tek seferlik sağlık kontrolü — cron olmadan çalışır.
 * npm run health
 */

import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), "../.env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

import { readFileSync, existsSync } from "fs";
import { join } from "path";

const PROJECT_ROOT = process.env.PROJECT_ROOT || resolve(process.cwd(), "..");

function rel(p: string): string {
  return join(PROJECT_ROOT, p);
}

function ok(label: string, condition: boolean): string {
  return `${condition ? "✅" : "❌"} ${label}`;
}

function warn(label: string, condition: boolean): string {
  return `${condition ? "⚠️" : "✅"} ${label}`;
}

console.log("🔍 AmareNL Health Check\n");

// Ortam değişkenleri
console.log("📦 Ortam:");
console.log(ok("ANTHROPIC_API_KEY", !!process.env.ANTHROPIC_API_KEY));
console.log(ok("TELEGRAM_BOT_TOKEN", !!process.env.TELEGRAM_BOT_TOKEN));
console.log(ok("TELEGRAM_ADMIN_CHAT_IDS", !!process.env.TELEGRAM_ADMIN_CHAT_IDS));
console.log(ok("PROJECT_ROOT", !!process.env.PROJECT_ROOT));

// Dosya kontrolleri
console.log("\n📁 Dosyalar:");
const criticalFiles = [
  "CLAUDE.md",
  "lib/blog.ts",
  "lib/products.ts",
  "content/article-queue.md",
  ".claude/skills/content-orchestrator.md",
  ".claude/skills/article-scheduler.md",
  ".claude/skills/blog-writer.md",
  ".claude/skills/market-research.md",
  ".claude/skills/keyword-analyzer.md",
  ".claude/skills/traffic-monitor.md",
];
for (const f of criticalFiles) {
  console.log(ok(f, existsSync(rel(f))));
}

// Kuyruk durumu
console.log("\n📝 İçerik Kuyruğu:");
try {
  const queue = readFileSync(rel("content/article-queue.md"), "utf-8");
  const lines = queue.split("\n");
  let written = 0,
    pending = 0;
  for (const line of lines) {
    if (line.includes("[x]")) written++;
    else if (line.includes("[ ]")) pending++;
  }
  console.log(`  Yazılan: ${written}`);
  console.log(`  Bekleyen: ${pending}`);
  console.log(warn("  Kuyruk boş!", pending === 0));
} catch {
  console.log("  ❌ article-queue.md okunamadı");
}

// Blog sayısı
console.log("\n📰 Blog:");
try {
  const blogTs = readFileSync(rel("lib/blog.ts"), "utf-8");
  const slugMatches = blogTs.match(/slug:\s*"/g);
  console.log(`  Makale sayısı: ${slugMatches?.length || 0}`);
} catch {
  console.log("  ❌ lib/blog.ts okunamadı");
}

// Node sürümü
console.log(`\n⚙️ Node.js: ${process.version}`);

console.log("\n✅ Health check tamamlandı.");
