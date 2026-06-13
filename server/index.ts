/**
 * AmareNL Content Orchestrator — Ana Giriş
 *
 * node-cron ile zamanlanmış içerik pipeline'ı + Telegram kontrol botu.
 *
 * Başlatma:
 *   npm start          → production
 *   npm run dev        → watch mode (auto-reload)
 *
 * Cron schedule (Amsterdam time):
 *   Pazartesi 07:57  → market-research + publish + report (tam pipeline)
 *   Çarşamba  09:57  → publish
 *   Cuma      09:57  → publish
 *   Her gün   10:00  → build check
 */

import cron from "node-cron";
import dotenv from "dotenv";
import { resolve } from "path";

// Load .env
dotenv.config({ path: resolve(process.cwd(), "../.env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

import { createBot, notifySubscribers } from "./telegram-bot.js";
import {
  runMondayPipeline,
  runPublishOnly,
  runBuildCheck,
} from "./orchestrator.js";
import type { OrchestratorState } from "./orchestrator.js";
import type { Telegraf } from "telegraf";

// --- State ---
const state: OrchestratorState = {
  manualPublishRequested: false,
  manualResearchRequested: false,
  subscribers: [],
  pipelineActive: false,
};

// --- Telegram Bot ---
let bot: Telegraf | null = null;
const botToken = process.env.TELEGRAM_BOT_TOKEN;

if (botToken) {
  bot = createBot(botToken, state);
  bot.launch();
  console.log("🤖 Telegram bot başlatıldı");
} else {
  console.warn("⚠️ TELEGRAM_BOT_TOKEN tanımlı değil. Bot devre dışı.");
}

// Graceful shutdown
process.once("SIGINT", () => {
  console.log("\n🛑 Kapatılıyor...");
  if (bot) bot.stop("SIGINT");
  process.exit(0);
});
process.once("SIGTERM", () => {
  if (bot) bot.stop("SIGTERM");
  process.exit(0);
});

// --- Cron Jobs (Amsterdam = UTC+2/CEST) ---
// node-cron UTC çalışır, Amsterdam = UTC+2 (yaz saati) → 2 saat çıkar

// Pazartesi 07:57 Amsterdam = 05:57 UTC — Tam pipeline
cron.schedule("57 5 * * 1", async () => {
  console.log("📅 Pazartesi pipeline başlıyor...");
  await runMondayPipeline(bot, state);
});

// Çarşamba 09:57 Amsterdam = 07:57 UTC — Makale yayını
cron.schedule("57 7 * * 3", async () => {
  console.log("📅 Çarşamba makale yayını başlıyor...");
  await runPublishOnly(bot, state);
});

// Cuma 09:57 Amsterdam = 07:57 UTC — Makale yayını
cron.schedule("57 7 * * 5", async () => {
  console.log("📅 Cuma makale yayını başlıyor...");
  await runPublishOnly(bot, state);
});

// Her gün 10:00 Amsterdam = 08:00 UTC — Build check
cron.schedule("0 8 * * *", async () => {
  const result = await runBuildCheck();
  if (!result.ok && bot) {
    await notifySubscribers(
      bot,
      state.subscribers,
      `⚠️ *Günlük Build Kontrolü*\nBuild başarısız:\n\`\`\`\n${result.output.slice(-400)}\n\`\`\``
    );
  }
});

// Her 30 saniyede bir manuel tetikleyicileri kontrol et
cron.schedule("*/30 * * * * *", async () => {
  if (state.manualPublishRequested) {
    state.manualPublishRequested = false;
    console.log("🔔 Manuel publish tetiklendi (Telegram)");
    await runPublishOnly(bot, state);
  }
  if (state.manualResearchRequested) {
    state.manualResearchRequested = false;
    console.log("🔔 Manuel research tetiklendi (Telegram)");
    if (bot) await notifySubscribers(bot, state.subscribers, "🔍 Pazar araştırması başlatıldı...");
    await runPublishOnly(bot, state);
  }
});

// --- Başlangıç mesajı ---
console.log(`
╔══════════════════════════════════════╗
║   AmareNL Content Orchestrator      ║
║   v1.0.0 — ${new Date().toLocaleDateString("nl-NL")}              ║
╠══════════════════════════════════════╣
║  📅 Pzt 07:57 → Tam pipeline       ║
║  ✍️  Çrş 09:57 → Makale yayını     ║
║  ✍️  Cum 09:57 → Makale yayını     ║
║  ⚙️  Her gün 10:00 → Build check  ║
╠══════════════════════════════════════╣
║  🤖 Telegram: ${botToken ? "✅ aktif" : "❌ devre dışı"}      ║
╚══════════════════════════════════════╝
`);

// İlk başlangıç build check
setTimeout(async () => {
  const result = await runBuildCheck();
  console.log(`⚙️  Build: ${result.ok ? "✅" : "❌"}`);
}, 3000);
