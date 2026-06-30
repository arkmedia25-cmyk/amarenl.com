/**
 * LeadGen OS Orchestrator v0.2
 * Fixed: tool logging, web search fallback, aggressive prompts
 */

import OpenAI from "openai";
import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { notify } from "./telegram.js";

const execAsync = promisify(exec);

export interface OrchestratorState {
  manualDiscoveryRequested: boolean;
  manualScoringRequested: boolean;
  manualOutreachTier: number | null;
  manualPipelineRequested: boolean;
  manualReportRequested: boolean;
  subscribers: string[];
  pipelineActive: boolean;
}

const ROOT = process.env.PROJECT_ROOT || import.meta.dirname || "";

function rel(p: string): string { return join(ROOT, p); }
function readText(p: string): string { try { return readFileSync(rel(p), "utf-8"); } catch { return ""; } }
function writeText(p: string, c: string): void {
  const d = rel(p).substring(0, rel(p).lastIndexOf("/"));
  try { mkdirSync(d, { recursive: true }); } catch {}
  writeFileSync(rel(p), c, "utf-8");
}
function readJson(p: string): any { try { return JSON.parse(readText(p)); } catch { return []; } }
function log(level: string, agent: string, event: string, data: Record<string, unknown> = {}) {
  const entry = JSON.stringify({ ts: new Date().toISOString(), level, agent, event, ...data });
  try { appendFileSync(rel("logs/orchestrator-log.jsonl"), entry + "\n"); } catch {}
  console.log(`[${level}] ${agent}: ${event}`, JSON.stringify(data).slice(0,200));
}

function createLLMClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY || "",
    baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1",
  });
}

const TOOLS: OpenAI.Chat.ChatCompletionTool[] = [
  { type: "function" as const, function: { name: "read_file", description: "Lees bestand", parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] } } },
  { type: "function" as const, function: { name: "write_file", description: "Schrijf JSON naar data/leads-raw.json of data/leads-scored.json of data/outreach-log.json of data/pipeline.json", parameters: { type: "object", properties: { path: { type: "string", description: "ALLEEN: data/leads-raw.json data/leads-scored.json data/outreach-log.json data/pipeline.json data/analytics.json" }, content: { type: "string", description: "JSON string" } }, required: ["path", "content"] } } },
  { type: "function" as const, function: { name: "web_search", description: "Zoek op internet", parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } } },
  { type: "function" as const, function: { name: "send_telegram", description: "Stuur Telegram bericht", parameters: { type: "object", properties: { message: { type: "string" } }, required: ["message"] } } },
];

async function executeTool(name: string, input: Record<string, unknown>): Promise<string> {
  switch (name) {
    case "read_file": {
      const p = input.path as string;
      if (!existsSync(rel(p))) return `ERROR: ${p} niet gevonden`;
      const c = readText(p);
      log("INFO", "tool", "read", { path: p, len: c.length });
      return c.length > 20000 ? c.slice(0, 20000) + "\n[TRUNCATED]" : c;
    }
    case "write_file": {
      const p = input.path as string; const c = (input.content as string) || "";
      if (!p || !c) return "ERROR: path+content vereist";
      // Blokkeer verzonnen paden
      if (!p.startsWith("data/") && !p.startsWith("logs/")) {
        return `ERROR: Ongeldig pad '${p}'. Toegestaan: data/leads-raw.json, data/leads-scored.json, data/outreach-log.json, data/pipeline.json, data/analytics.json, data/weekly-report-*.json, data/weekly-report-*.md`;
      }
      try { JSON.parse(c); } catch { return "ERROR: Alleen valide JSON!"; }
      writeText(p, c);
      log("INFO", "tool", "write", { path: p, len: c.length });
      return `OK: ${c.length} chars naar ${p}`;
    }
    case "web_search": {
      const q = input.query as string;
      log("INFO", "tool", "search", { query: q });
      try {
        const { stdout } = await execAsync(
          `curl -s -L --max-time 10 "https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(q)}" 2>/dev/null | grep -oP '(?<=<a rel="nofollow" href=")[^"]*|(?<=class="result-snippet">)[^<]*' | head -15`,
          { timeout: 15000 }
        );
        if (stdout.trim().length > 50) {
          log("INFO", "tool", "search_ok", { len: stdout.length });
          return stdout.trim().slice(0, 5000);
        }
      } catch (e: any) { log("WARN", "tool", "search_err", { err: e.message?.slice(0,100) }); }
      return `NO_RESULTS: "${q}". GEBRUIK JE EIGEN KENNIS van Nederlandse bedrijven!`;
    }
    case "send_telegram": {
      await notify((input.message as string) || "");
      return "OK";
    }
    default: return "Onbekend: " + name;
  }
}

async function runLLM(systemPrompt: string, userMessage: string, maxTurns = 15): Promise<string> {
  const client = createLLMClient();
  const model = process.env.DEEPSEEK_MODEL || "deepseek-chat";
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [{ role: "user", content: userMessage }];
  let finalText = "";
  let totalToolCalls = 0;

  for (let turn = 0; turn < maxTurns; turn++) {
    log("INFO", "llm", "turn", { turn, model });
    let resp: OpenAI.Chat.ChatCompletion;
    try {
      resp = await client.chat.completions.create({
        model, max_tokens: 4096,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        tools: TOOLS, tool_choice: "auto",
      });
    } catch (err: any) {
      log("ERROR", "llm", "api_error", { err: err.message?.slice(0,300) });
      if (turn === 0) throw err;
      break;
    }

    const msg = resp.choices[0].message;
    log("INFO", "llm", "response", {
      turn, contentLen: msg.content?.length || 0,
      toolCalls: msg.tool_calls?.length || 0,
      finish: resp.choices[0].finish_reason,
    });

    if (!msg.tool_calls || msg.tool_calls.length === 0) {
      finalText = msg.content || "";
      log("INFO", "llm", "done", { text: finalText.slice(0,300) });
      break;
    }

    totalToolCalls += msg.tool_calls.length;
    messages.push({
      role: "assistant", content: msg.content || null,
      tool_calls: msg.tool_calls.map(tc => ({
        id: tc.id, type: "function" as const,
        function: { name: tc.function.name, arguments: tc.function.arguments },
      })),
    });

    for (const tc of msg.tool_calls) {
      let args: Record<string, unknown> = {};
      try { args = JSON.parse(tc.function.arguments); } catch {}
      log("INFO", "tool", "call", { tool: tc.function.name, args: JSON.stringify(args).slice(0,300) });
      const result = await executeTool(tc.function.name, args);
      log("INFO", "tool", "result", { tool: tc.function.name, result: result.slice(0,300) });
      messages.push({ role: "tool", tool_call_id: tc.id, content: result });
    }
  }

  log("INFO", "llm", "complete", { totalTurns: Math.min(maxTurns, Math.floor(messages.length/2)), totalToolCalls, finalTextLen: finalText.length });
  return finalText || `Klaar. ${totalToolCalls} tools gebruikt.`;
}

function loadSkill(n: string): string {
  const p = rel(`skills/${n}.md`);
  return existsSync(p) ? readText(p).slice(0, 3000) : `[${n} niet gevonden]`;
}

// ── Discovery ──

async function stepDiscoverLeads(): Promise<{ success: boolean; leadsFound: number; error?: string }> {
  log("INFO", "discovery", "start");
  try {
    const sp = [
      "JE ENIGE TAAK: Vind Nederlandse bedrijven en schrijf naar data/leads-raw.json.",
      "TOEGESTANE PADEN voor write_file: data/leads-raw.json, data/leads-scored.json, data/outreach-log.json, data/pipeline.json, data/analytics.json",
      "GEBRUIK PRECIES DEZE PADEN. NIET /workspace, NIET /tmp, NIET zelf bedenken!",
      loadSkill("lead-discovery"),
      "CRUCIAAL: 1) read_file data/leads-raw.json 2) web_search naar NL bedrijven 3) ALS search faalt, gebruik je kennis van ECHTE NL bedrijven 4) write_file data/leads-raw.json met merged JSON 5) send_telegram resultaat.",
    ].join("\n\n");

    const um = "VIND NEDERLANDSE LEADS. read_file data/leads-raw.json. web_search voor fysiotherapeut, diëtist, personal trainer, gezondheidsblogger, supplementen winkel in Nederlandse steden. Verzamel 10+ leads. write_file data/leads-raw.json (merge!). send_telegram.";

    await runLLM(sp, um, 12);
    const leads = readJson("data/leads-raw.json");
    const count = Array.isArray(leads) ? leads.length : 0;
    log("INFO", "discovery", "done", { leadsFound: count });
    return { success: true, leadsFound: count };
  } catch (err: any) { return { success: false, leadsFound: 0, error: err.message }; }
}

// ── Scoring ──

async function stepScoreLeads(): Promise<{ success: boolean; scoredCount: number; tier1Count: number; error?: string }> {
  log("INFO", "scoring", "start");
  try {
    const sp = ["SCOOR ALLE LEADS 1-5. Lees raw, schrijf scored JSON.", loadSkill("lead-scoring")].join("\n\n");
    const um = "read_file data/leads-raw.json en data/leads-scored.json. Scoor ongescoorde leads. web_search voor enrichment. write_file data/leads-scored.json. send_telegram.";
    await runLLM(sp, um, 12);
    const s = readJson("data/leads-scored.json");
    const total = Array.isArray(s) ? s.length : 0;
    const t1 = Array.isArray(s) ? s.filter((l: any) => (l.tier || 5) <= 2).length : 0;
    return { success: true, scoredCount: total, tier1Count: t1 };
  } catch (err: any) { return { success: false, scoredCount: 0, tier1Count: 0, error: err.message }; }
}

// ── Outreach ──

async function stepOutreach(tier: number): Promise<{ success: boolean; emailsSent: number; error?: string }> {
  log("INFO", "outreach", "start", { tier });
  try {
    const sp = ["SCHRIJF OUTREACH EMAILS. Max 5. Personaliseer.", loadSkill("outreach-writer")].join("\n\n");
    const um = "Lees leads-scored (tier <= " + tier + "). Skip reeds gecontacteerd. Personaliseer 5 emails. Verstuur via send-email.py. Log in outreach-log.json + pipeline.json. send_telegram.";
    await runLLM(sp, um, 15);
    const ol = readJson("data/outreach-log.json");
    return { success: true, emailsSent: Array.isArray(ol) ? ol.length : 0 };
  } catch (err: any) { return { success: false, emailsSent: 0, error: err.message }; }
}

// ── Pipeline ──

async function stepPipelineUpdate(): Promise<{ success: boolean; hotLeads: number; followUps: number; error?: string }> {
  log("INFO", "pipeline", "start");
  try {
    const sp = ["UPDATE PIPELINE stages.", loadSkill("pipeline-manager")].join("\n\n");
    const um = "Lees pipeline.json + outreach-log.json. Update stages. Identificeer REPLIED hot leads. write_file pipeline.json. send_telegram.";
    await runLLM(sp, um, 8);
    const pl = readJson("data/pipeline.json");
    const hot = Array.isArray(pl) ? pl.filter((l: any) => l.stage === "REPLIED").length : 0;
    const fu = Array.isArray(pl) ? pl.filter((l: any) => l.nextFollowUp && new Date(l.nextFollowUp) <= new Date()).length : 0;
    return { success: true, hotLeads: hot, followUps: fu };
  } catch (err: any) { return { success: false, hotLeads: 0, followUps: 0, error: err.message }; }
}

// ── Analytics ──

async function stepAnalyticsReport(): Promise<{ success: boolean; error?: string }> {
  log("INFO", "analytics", "start");
  try {
    const wn = Math.ceil((Date.now() - new Date("2026-01-01").getTime()) / (7 * 24 * 3600 * 1000));
    const sp = ["GENEREER WEEK RAPPORT.", loadSkill("analytics-reporter")].join("\n\n");
    await runLLM(sp, "Lees alle data. Bereken metrics. Schrijf weekly-report-" + wn + ".json + .md. send_telegram top 3 aanbevelingen.", 10);
    return { success: true };
  } catch (err: any) { return { success: false, error: err.message }; }
}

// ── Public API ──

export async function runDiscovery(state: OrchestratorState): Promise<void> {
  if (state.pipelineActive) return;
  state.pipelineActive = true;
  await notify("🔍 *Discovery gestart...*");
  const r = await stepDiscoverLeads();
  if (r.success) await notify(`✅ *Discovery!*\n${r.leadsFound} leads`);
  else await notify("🚨 Discovery: " + (r.error || "error"));
  state.pipelineActive = false;
}

export async function runScoring(state: OrchestratorState): Promise<void> {
  if (state.pipelineActive) return;
  state.pipelineActive = true;
  await notify("📊 *Scoring...*");
  const r = await stepScoreLeads();
  if (r.success) await notify(`✅ *Scoring!*\n⭐ Tier 1-2: ${r.tier1Count}/${r.scoredCount}`);
  state.pipelineActive = false;
}

export async function runOutreach(tier: number, state: OrchestratorState): Promise<void> {
  if (state.pipelineActive) return;
  state.pipelineActive = true;
  await notify(`✉️ *Outreach tier ${tier}...*`);
  const r = await stepOutreach(tier);
  if (r.success) await notify(`✅ *Outreach!*\n✉️ ${r.emailsSent} emails`);
  state.pipelineActive = false;
}

export async function runPipeline(state: OrchestratorState): Promise<void> {
  if (state.pipelineActive) return;
  state.pipelineActive = true;
  const r = await stepPipelineUpdate();
  if (r.success) await notify(`📋 *Pipeline*\n🔥 Hot: ${r.hotLeads}\n📅 FU: ${r.followUps}`);
  state.pipelineActive = false;
}

export async function runReport(state: OrchestratorState): Promise<void> {
  if (state.pipelineActive) return;
  state.pipelineActive = true;
  await notify("📊 *Rapport...*");
  await stepAnalyticsReport();
  await notify("✅ *Rapport klaar!*");
  state.pipelineActive = false;
}
