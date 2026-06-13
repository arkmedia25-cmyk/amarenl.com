/**
 * AmareNL Telegram Bot
 *
 * Kontrol komutları:
 *   /start    — Hoş geldin mesajı
 *   /status   — Sistem durumu
 *   /queue    — Makale kuyruğu
 *   /publish  — Sıradaki makaleyi yayınla
 *   /report   — Haftalık trafik raporu
 *   /research — Pazar araştırması başlat
 *   /build    — Build durumu
 *   /health   — Tam sistem sağlık kontrolü
 *   /help     — Komut listesi
 */

import { Telegraf, Markup } from "telegraf";
import type { Context } from "telegraf";
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import type { OrchestratorState } from "./orchestrator.js";

const PROJECT_ROOT =
  process.env.PROJECT_ROOT || "/Users/ark/Documents/AmareNL.com";

function rel(p: string): string {
  return join(PROJECT_ROOT, p);
}

function fileExists(p: string): boolean {
  return existsSync(rel(p));
}

function readText(p: string): string {
  try {
    return readFileSync(rel(p), "utf-8");
  } catch {
    return "";
  }
}

// --- Queue helpers ---
function getQueueStats(): { total: number; written: number; remaining: string[] } {
  const raw = readText("content/article-queue.md");
  const lines = raw.split("\n");
  const remaining: string[] = [];
  let written = 0;
  for (const line of lines) {
    if (line.match(/^\|\s*\d+\s*\|/)) {
      if (line.includes("[x]")) written++;
      else if (line.includes("[ ]")) {
        const match = line.match(/\|\s*\d+\s*\|\s*(.+?)\s*\|/);
        if (match) remaining.push(match[1].trim());
      }
    }
  }
  return { total: written + remaining.length, written, remaining };
}

function getLastLogs(n: number = 10): string[] {
  const logPath = rel("content/orchestrator-log.jsonl");
  if (!existsSync(logPath)) return [];
  const lines = readText("content/orchestrator-log.jsonl")
    .trim()
    .split("\n");
  return lines.slice(-n);
}

// --- Status formatter ---
function formatStatus(): string {
  const q = getQueueStats();
  const lastLog = getLastLogs(1)[0];
  let lastPublish = "—";
  if (lastLog) {
    try {
      const l = JSON.parse(lastLog);
      if (l.event === "publish_complete") lastPublish = l.ts;
    } catch {}
  }

  return [
    `📊 *AmareNL Durum* — ${new Date().toLocaleDateString("nl-NL")}`,
    "",
    `📝 *İçerik:*`,
    `  • Toplam makale: 17 + ${q.total} kuyrukta`,
    `  • Kuyrukta kalan: *${q.remaining.length}*`,
    `  • Son yayın: ${lastPublish}`,
    "",
    `⏭ *Sıradaki:* ${q.remaining[0] || "— (kuyruk boş!)"}`,
  ].join("\n");
}

function formatQueue(): string {
  const q = getQueueStats();
  const preview = q.remaining.slice(0, 8);
  return [
    `📋 *Makale Kuyruğu* — ${q.remaining.length} bekleyen`,
    "",
    ...preview.map((title, i) => `  ${i + 1}. ${title}`),
    q.remaining.length > 8
      ? `  ... ve ${q.remaining.length - 8} tane daha`
      : "",
  ].join("\n");
}

function formatHealth(): string {
  const q = getQueueStats();
  const logCount = getLastLogs(100).length;
  const buildOk = fileExists(".next/BUILD_ID");

  return [
    `🔍 *Sistem Sağlığı*`,
    "",
    `📝 Kuyruk: *${q.remaining.length}* makale bekliyor`,
    `⚙️ Build: ${buildOk ? "✅" : "❌"}`,
    `📋 Log: ${logCount} kayıt`,
    `🤖 Bot: 🟢 çalışıyor`,
    `⏱ Sunucu: ${new Date().toLocaleTimeString("nl-NL")}`,
  ].join("\n");
}

// --- Bot factory ---
export function createBot(token: string, state: OrchestratorState) {
  const bot = new Telegraf(token);

  // /start
  bot.start((ctx: Context) => {
    ctx.reply(
      [
        `👋 *AmareNL Orchestrator Bot*`,
        "",
        "Ben içerik pipeline'ını yönetiyorum.",
        "Komutları görmek için /help yaz.",
        "",
        `📊 /status — Sistem durumu`,
        `📋 /queue — Makale kuyruğu`,
        `✍️ /publish — Sıradaki makaleyi yayınla`,
        `🔍 /research — Pazar araştırması`,
        `📈 /report — Trafik raporu`,
        `⚙️ /build — Build kontrol`,
        `❤️ /health — Sağlık kontrolü`,
      ].join("\n"),
      { parse_mode: "Markdown" }
    );
  });

  // /help
  bot.help((ctx: Context) => {
    ctx.reply(
      [
        `🤖 *Komutlar*`,
        "",
        `📝 *İçerik:*`,
        `  /publish — Sıradaki makaleyi yayınla`,
        `  /queue — Kuyruktaki makaleler`,
        `  /status — Sistem durumu`,
        ``,
        `🔍 *Araştırma & Analiz:*`,
        `  /research — Pazar araştırması + trend tarama`,
        `  /analyze — GSC keyword analizi + ranking check`,
        `  /optimize [slug] — Bir makaleyi SEO için güncelle`,
        ``,
        `📊 *Raporlama:*`,
        `  /report — Haftalık trafik raporu`,
        `  /logs — Son 10 log kaydı`,
        `  /health — Sistem sağlığı`,
        `  /build — Build durumu`,
        ``,
        `⚙️ *Ayarlar:*`,
        `  /subscribe — Bildirimleri aç`,
        `  /unsubscribe — Bildirimleri kapat`,
      ].join("\n"),
      { parse_mode: "Markdown" }
    );
  });

  // /status
  bot.command("status", (ctx: Context) => {
    ctx.reply(formatStatus(), { parse_mode: "Markdown" });
  });

  // /queue
  bot.command("queue", (ctx: Context) => {
    ctx.reply(formatQueue(), { parse_mode: "Markdown" });
  });

  // /health
  bot.command("health", (ctx: Context) => {
    ctx.reply(formatHealth(), { parse_mode: "Markdown" });
  });

  // /publish — trigger manual publish
  bot.command("publish", async (ctx: Context) => {
    const chatId = ctx.chat.id.toString();
    const admins = (process.env.TELEGRAM_ADMIN_CHAT_IDS || "").split(",");
    if (!admins.includes(chatId)) {
      ctx.reply("⛔ Bu komut sadece admin içindir.");
      return;
    }
    ctx.reply("✍️ *Makale yazımı başlatılıyor...*", { parse_mode: "Markdown" });
    // The orchestrator will pick this up via the state flag
    state.manualPublishRequested = true;
  });

  // /research — trigger market research
  bot.command("research", async (ctx: Context) => {
    const chatId = ctx.chat.id.toString();
    const admins = (process.env.TELEGRAM_ADMIN_CHAT_IDS || "").split(",");
    if (!admins.includes(chatId)) {
      ctx.reply("⛔ Bu komut sadece admin içindir.");
      return;
    }
    ctx.reply("🔍 *Pazar araştırması başlatılıyor...*", {
      parse_mode: "Markdown",
    });
    state.manualResearchRequested = true;
  });

  // /analyze — GSC keyword analizi
  bot.command("analyze", async (ctx: Context) => {
    const chatId = ctx.chat.id.toString();
    const admins = (process.env.TELEGRAM_ADMIN_CHAT_IDS || "").split(",");
    if (!admins.includes(chatId)) {
      ctx.reply("⛔ Bu komut sadece admin içindir.");
      return;
    }
    ctx.reply("📊 *Keyword analizi başlatılıyor...* (GSC + ranking check)", {
      parse_mode: "Markdown",
    });
    state.manualAnalyzeRequested = true;
  });

  // /optimize [slug] — belirli bir makaleyi optimize et
  bot.command("optimize", async (ctx: Context) => {
    const chatId = ctx.chat.id.toString();
    const admins = (process.env.TELEGRAM_ADMIN_CHAT_IDS || "").split(",");
    if (!admins.includes(chatId)) {
      ctx.reply("⛔ Bu komut sadece admin içindir.");
      return;
    }
    // Extract slug from message: "/optimize my-article-slug"
    const msg = (ctx.message as any)?.text || "";
    const parts = msg.split(/\s+/);
    if (parts.length < 2) {
      ctx.reply(
        "Kullanım: `/optimize [slug]`\n\nÖrnek: `/optimize probiotica-stemming-darm-hersen-connectie`",
        { parse_mode: "Markdown" }
      );
      return;
    }
    const slug = parts[1].trim();
    ctx.reply(`🔧 *Optimize ediliyor:* \`${slug}\`...`, { parse_mode: "Markdown" });
    state.manualOptimizeSlug = slug;
  });

  // /report
  bot.command("report", async (ctx: Context) => {
    const reports = readdirSync(rel("content"))
      .filter((f) => f.startsWith("weekly-report-"))
      .sort()
      .reverse();
    if (reports.length === 0) {
      ctx.reply("Henüz haftalık rapor yok. /research ile başlatabilirsin.");
      return;
    }
    const latest = reports[0];
    ctx.replyWithDocument({ source: rel(`content/${latest}`) });
  });

  // /build
  bot.command("build", (ctx: Context) => {
    const buildId = fileExists(".next/BUILD_ID");
    const buildErr = fileExists(".next/build-error.log");
    ctx.reply(
      [
        `⚙️ *Build Durumu*`,
        "",
        `Build ID: ${buildId ? "✅ var" : "❌ yok"}`,
        `Hata logu: ${buildErr ? "⚠️ var" : "✅ yok"}`,
      ].join("\n"),
      { parse_mode: "Markdown" }
    );
  });

  // /logs
  bot.command("logs", (ctx: Context) => {
    const logs = getLastLogs(10);
    if (logs.length === 0) {
      ctx.reply("Henüz log kaydı yok.");
      return;
    }
    const formatted = logs
      .map((l) => {
        try {
          const j = JSON.parse(l);
          return `\`${j.ts}\` ${j.level} ${j.agent}: ${j.event}`;
        } catch {
          return l;
        }
      })
      .join("\n");
    ctx.reply(`📋 *Son 10 Log*\n\n${formatted}`, { parse_mode: "Markdown" });
  });

  // /subscribe — add to notification list
  bot.command("subscribe", (ctx: Context) => {
    const chatId = ctx.chat.id.toString();
    if (!state.subscribers.includes(chatId)) {
      state.subscribers.push(chatId);
    }
    ctx.reply("🔔 *Bildirimler açıldı!* Yeni makale ve önemli olayları buraya göndereceğim.", {
      parse_mode: "Markdown",
    });
  });

  // /unsubscribe
  bot.command("unsubscribe", (ctx: Context) => {
    const chatId = ctx.chat.id.toString();
    state.subscribers = state.subscribers.filter((s) => s !== chatId);
    ctx.reply("🔕 Bildirimler kapatıldı.");
  });

  return bot;
}

// --- Notification helper ---
export async function notifySubscribers(
  bot: Telegraf,
  subscribers: string[],
  message: string
) {
  for (const chatId of subscribers) {
    try {
      await bot.telegram.sendMessage(chatId, message, {
        parse_mode: "Markdown",
      });
    } catch {
      // subscriber may have blocked the bot
    }
  }
}
