/**
 * LeadGen OS Telegram Bot
 *
 * Komutlar:
 *   /start      — Welkom
 *   /status     — Pipeline overzicht
 *   /leads      — Lead lijst (optioneel: tier)
 *   /lead [id]  — Lead detail
 *   /discover   — Discovery starten
 *   /score      — Scoring starten
 *   /outreach   — Outreach starten (optioneel: tier)
 *   /pipeline   — Pipeline update
 *   /report     — Weekrapport
 *   /health     — Systeem gezondheid
 *   /help       — Commando overzicht
 */

import { Telegraf } from "telegraf";
import type { Context } from "telegraf";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { OrchestratorState } from "./orchestrator.js";

const PROJECT_ROOT = process.env.PROJECT_ROOT || import.meta.dirname || "";

function rel(p: string): string {
  return join(PROJECT_ROOT, p);
}

function fileExists(p: string): boolean {
  return existsSync(rel(p));
}

function readText(p: string): string {
  try { return readFileSync(rel(p), "utf-8"); } catch { return ""; }
}

function readJson(p: string): any {
  try { return JSON.parse(readText(p)); } catch { return []; }
}

function formatStatus(): string {
  const leads = readJson("data/leads-scored.json");
  const pipeline = readJson("data/pipeline.json");
  const outreach = readJson("data/outreach-log.json");

  const totalLeads = Array.isArray(leads) ? leads.length : 0;
  const tier1 = Array.isArray(leads) ? leads.filter((l: any) => l.tier === 1).length : 0;
  const tier2 = Array.isArray(leads) ? leads.filter((l: any) => l.tier === 2).length : 0;

  const stages: Record<string, number> = {};
  if (Array.isArray(pipeline)) {
    for (const p of pipeline) {
      stages[p.stage] = (stages[p.stage] || 0) + 1;
    }
  }

  const emailsSent = Array.isArray(outreach) ? outreach.length : 0;

  const lines = [
    `📊 *LeadGen OS Status* — ${new Date().toLocaleDateString("nl-NL")}`,
    "",
    `👥 *Leads:* ${totalLeads} totaal`,
    `  ⭐ Tier 1: ${tier1}  |  Tier 2: ${tier2}`,
    "",
    `📋 *Pipeline:*`,
    `  🆕 NEW: ${stages["NEW"] || 0}`,
    `  ✉️ CONTACTED: ${stages["CONTACTED"] || 0}`,
    `  💬 REPLIED: ${stages["REPLIED"] || 0}`,
    `  📅 MEETING: ${stages["MEETING"] || 0}`,
    `  ✅ CONVERTED: ${stages["CONVERTED"] || 0}`,
    "",
    `📨 *Outreach:* ${emailsSent} emails verzonden`,
  ];
  return lines.join("\n");
}

function formatLeads(tierFilter?: number): string {
  const leads = readJson("data/leads-scored.json");
  if (!Array.isArray(leads) || leads.length === 0) return "📋 Geen leads gevonden. Gebruik /discover om te starten.";

  let filtered = leads;
  if (tierFilter) filtered = leads.filter((l: any) => l.tier <= tierFilter);

  const preview = filtered.slice(0, 10);
  const lines = [
    `📋 *Leads* (${filtered.length} totaal)`,
    "",
    ...preview.map((l: any, i: number) =>
      `  ${i + 1}. ${"⭐".repeat(l.tier || 0)} ${l.name} — ${l.category || ""} (${l.location || "NL"})`
    ),
    filtered.length > 10 ? `  ... en ${filtered.length - 10} meer` : "",
    "",
    `Gebruik /lead [id] voor details.`,
  ];
  return lines.join("\n");
}

function formatLeadDetail(leadId: string): string {
  const leads = readJson("data/leads-scored.json");
  const pipeline = readJson("data/pipeline.json");

  const lead = Array.isArray(leads) ? leads.find((l: any) => l.id === leadId) : null;
  if (!lead) return `❌ Lead '${leadId}' niet gevonden.`;

  const pipeEntry = Array.isArray(pipeline) ? pipeline.find((p: any) => p.leadId === leadId) : null;

  return [
    `👤 *${lead.name}*`,
    `📧 ${lead.email || "—"}`,
    `📱 ${lead.phone || "—"}`,
    `🌐 ${lead.website || "—"}`,
    `📍 ${lead.location || "—"}  |  ${lead.category || ""}`,
    `⭐ Tier: ${lead.tier}/5  |  Score: ${lead.score || "—"}`,
    ``,
    `📋 Stage: ${pipeEntry?.stage || "NEW"}`,
    `📅 Laatste contact: ${pipeEntry?.lastContact || "—"}`,
    `⏭ Volgende follow-up: ${pipeEntry?.nextFollowUp || "—"}`,
    ``,
    `📝 Notes: ${lead.notes || "—"}`,
    `🔗 Enrichment: ${lead.enrichment?.amareRelevance || "—"}`,
  ].join("\n");
}

function formatPipeline(): string {
  const pipeline = readJson("data/pipeline.json");
  if (!Array.isArray(pipeline) || pipeline.length === 0) return "📋 Pipeline is leeg.";

  const stages: Record<string, string[]> = {};
  for (const p of pipeline) {
    if (!stages[p.stage]) stages[p.stage] = [];
    stages[p.stage].push(p.leadId);
  }

  const lines = ["📋 *Pipeline Overzicht*", ""];
  const order = ["NEW", "CONTACTED", "REPLIED", "MEETING", "CONVERTED", "NO_REPLY", "BOUNCED"];
  for (const s of order) {
    if (stages[s]) lines.push(`${s}: ${stages[s].length} leads`);
  }

  // Hot leads
  const replied = pipeline.filter((p: any) => p.stage === "REPLIED");
  if (replied.length > 0) {
    lines.push("", "🔥 *HOT LEADS (gereageerd!)*:");
    for (const r of replied) lines.push(`  • ${r.leadId} — ${r.notes || "geen notes"}`);
  }

  return lines.join("\n");
}

export function createBot(token: string, state: OrchestratorState) {
  const bot = new Telegraf(token);

  bot.start((ctx: Context) => {
    ctx.reply(
      [
        "👋 *LeadGen OS Bot*",
        "",
        "Lead generation & sales pipeline voor AmareNL.",
        "Gebruik /help voor alle commando's.",
        "",
        "📊 /status — Pipeline overzicht",
        "🔍 /discover — Nieuwe leads vinden",
        "⭐ /score — Leads kwalificeren",
        "✉️ /outreach — Emails versturen",
        "📋 /pipeline — Funnel beheren",
        "📈 /report — Weekrapport",
      ].join("\n"),
      { parse_mode: "Markdown" }
    );
  });

  bot.help((ctx: Context) => {
    ctx.reply(
      [
        "🤖 *LeadGen OS Commando's*",
        "",
        "📊 *Status & Views:*",
        "  /status — Pipeline overzicht",
        "  /leads [tier] — Lead lijst (bv. /leads 2)",
        "  /lead [id] — Lead detail",
        "  /pipeline — Funnel weergave",
        "",
        "🔍 *Acties:*",
        "  /discover — Nieuwe leads vinden",
        "  /score — Leads scoren",
        "  /outreach [tier] — Outreach (bv. /outreach 2)",
        "",
        "📈 *Rapportage:*",
        "  /report — Weekrapport",
        "  /health — Systeem check",
        "",
        "⚙️ *Settings:*",
        "  /subscribe — Notificaties aan",
        "  /unsubscribe — Notificaties uit",
      ].join("\n"),
      { parse_mode: "Markdown" }
    );
  });

  bot.command("status", (ctx: Context) => {
    ctx.reply(formatStatus(), { parse_mode: "Markdown" });
  });

  bot.command("leads", (ctx: Context) => {
    const msg = (ctx.message as any)?.text || "";
    const parts = msg.split(/\s+/);
    const tier = parts[1] ? parseInt(parts[1]) : undefined;
    ctx.reply(formatLeads(tier), { parse_mode: "Markdown" });
  });

  bot.command("lead", (ctx: Context) => {
    const msg = (ctx.message as any)?.text || "";
    const parts = msg.split(/\s+/);
    if (parts.length < 2) {
      ctx.reply("Gebruik: `/lead [id]`\nVind IDs met /leads", { parse_mode: "Markdown" });
      return;
    }
    ctx.reply(formatLeadDetail(parts[1].trim()), { parse_mode: "Markdown" });
  });

  bot.command("pipeline", (ctx: Context) => {
    ctx.reply(formatPipeline(), { parse_mode: "Markdown" });
  });

  bot.command("health", (ctx: Context) => {
    const leads = readJson("data/leads-raw.json");
    const scored = readJson("data/leads-scored.json");
    const outreach = readJson("data/outreach-log.json");
    ctx.reply(
      [
        "🔍 *Systeem Gezondheid*",
        "",
        `👥 Raw leads: ${Array.isArray(leads) ? leads.length : 0}`,
        `⭐ Gescoord: ${Array.isArray(scored) ? scored.length : 0}`,
        `✉️ Outreach: ${Array.isArray(outreach) ? outreach.length : 0}`,
        `🤖 Bot: 🟢 actief`,
        `⏱ ${new Date().toLocaleTimeString("nl-NL")}`,
      ].join("\n"),
      { parse_mode: "Markdown" }
    );
  });

  // Admin-only commands
  function isAdmin(chatId: string): boolean {
    const admins = (process.env.TELEGRAM_ADMIN_CHAT_IDS || "").split(",");
    return admins.includes(chatId);
  }

  bot.command("discover", async (ctx: Context) => {
    if (!isAdmin(String(ctx.chat?.id || ""))) {
      ctx.reply("⛔ Admin only.");
      return;
    }
    ctx.reply("🔍 *Discovery gestart...*", { parse_mode: "Markdown" });
    state.manualDiscoveryRequested = true;
  });

  bot.command("score", async (ctx: Context) => {
    if (!isAdmin(String(ctx.chat?.id || ""))) {
      ctx.reply("⛔ Admin only.");
      return;
    }
    ctx.reply("📊 *Scoring gestart...*", { parse_mode: "Markdown" });
    state.manualScoringRequested = true;
  });

  bot.command("outreach", async (ctx: Context) => {
    if (!isAdmin(String(ctx.chat?.id || ""))) {
      ctx.reply("⛔ Admin only.");
      return;
    }
    const msg = (ctx.message as any)?.text || "";
    const parts = msg.split(/\s+/);
    const tier = parts[1] ? parseInt(parts[1]) : 2;
    ctx.reply(`✉️ *Outreach tier ${tier} gestart...*`, { parse_mode: "Markdown" });
    state.manualOutreachTier = tier;
  });

  bot.command("report", async (ctx: Context) => {
    if (!isAdmin(String(ctx.chat?.id || ""))) {
      ctx.reply("⛔ Admin only.");
      return;
    }
    ctx.reply("📊 *Rapport genereren...*", { parse_mode: "Markdown" });
    state.manualReportRequested = true;
  });

  // Subscribe/unsubscribe
  bot.command("subscribe", (ctx: Context) => {
    const chatId = String(ctx.chat?.id || "");
    if (!state.subscribers.includes(chatId)) state.subscribers.push(chatId);
    ctx.reply("🔔 *Aangemeld!* Je krijgt notificaties van LeadGen OS.", { parse_mode: "Markdown" });
  });

  bot.command("unsubscribe", (ctx: Context) => {
    state.subscribers = state.subscribers.filter((s) => s !== String(ctx.chat?.id || ""));
    ctx.reply("🔕 *Afgemeld.*");
  });

  return bot;
}

export async function notifySubscribers(bot: Telegraf, subscribers: string[], message: string) {
  const adminIds = (process.env.TELEGRAM_ADMIN_CHAT_IDS || "").split(",").filter(Boolean);
  const allIds = [...new Set([...adminIds, ...subscribers])];
  for (const chatId of allIds) {
    try {
      await bot.telegram.sendMessage(chatId, message, { parse_mode: "Markdown" });
    } catch {}
  }
}
