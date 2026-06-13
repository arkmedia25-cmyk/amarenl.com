/**
 * AmareNL Content Orchestrator
 *
 * Haftalık içerik pipeline'ı:
 *   Pazartesi 08:00 → market-research
 *   Pazartesi 09:57 → article-scheduler → blog-writer (1. makale)
 *   Çarşamba  09:57 → article-scheduler → blog-writer (2. makale)
 *   Cuma      09:57 → article-scheduler → blog-writer (3. makale)
 *   Pazartesi 11:00 → traffic-monitor
 */

import { Anthropic } from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, appendFileSync, existsSync } from "fs";
import { join } from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { notifySubscribers } from "./telegram-bot.js";
import type { Telegraf } from "telegraf";

const execAsync = promisify(exec);

export interface OrchestratorState {
  manualPublishRequested: boolean;
  manualResearchRequested: boolean;
  subscribers: string[];
  pipelineActive: boolean;
}

const PROJECT_ROOT =
  process.env.PROJECT_ROOT || "/Users/ark/Documents/AmareNL.com";

function rel(p: string): string {
  return join(PROJECT_ROOT, p);
}

function readText(p: string): string {
  return readFileSync(rel(p), "utf-8");
}

function writeText(p: string, content: string): void {
  writeFileSync(rel(p), content, "utf-8");
}

// --- Logger ---
function log(level: string, agent: string, event: string, data: Record<string, unknown> = {}) {
  const entry = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    agent,
    event,
    ...data,
  });
  appendFileSync(rel("content/orchestrator-log.jsonl"), entry + "\n");
  console.log(`[${level}] ${agent}: ${event}`, data);
}

// --- Skill prompt loader ---
function loadSkillPrompt(skillName: string): string {
  const path = rel(`.claude/skills/${skillName}.md`);
  if (!existsSync(path)) return "";
  return readText(path);
}

// --- Claude API client ---
function createClaudeClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY eksik");
  return new Anthropic({ apiKey });
}

interface TaskResult {
  success: boolean;
  output: string;
  error?: string;
}

// --- Pipeline steps ---

/**
 * Step 1: Market Research
 * Yeni konu fırsatlarını tara, article-queue.md'i güncelle
 */
async function stepMarketResearch(): Promise<TaskResult> {
  log("INFO", "market-research", "start");
  try {
    const claude = createClaudeClient();
    const skillPrompt = loadSkillPrompt("market-research");
    const queueContent = readText("content/article-queue.md");
    const blogContent = readText("lib/blog.ts");

    const msg = await claude.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: skillPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: [
                "Haftalık pazar araştırması yap.",
                "",
                "MEVCUT KUYRUK:",
                "```",
                queueContent.slice(0, 5000),
                "```",
                "",
                "MEVCUT BLOG MAKALELERİ (lib/blog.ts):",
                "```",
                blogContent.slice(0, 5000),
                "```",
                "",
                "Eksik konuları tespit et. Yeni fırsatları bul.",
                "Önerdiğin konuları content/article-queue.md'de uygun tier'a ekle.",
                "Sadece article-queue.md'i güncelle, başka dosyayı değiştirme.",
              ].join("\n"),
            },
          ],
        },
      ],
    });

    const text = msg.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");
    log("INFO", "market-research", "complete", { length: text.length });
    return { success: true, output: text };
  } catch (err: any) {
    log("ERROR", "market-research", "failed", { error: err.message });
    return { success: false, output: "", error: err.message };
  }
}

/**
 * Step 2: Write next article from queue
 * Sıradaki makaleyi yaz, lib/blog.ts'e ekle, MDX kaydet, kuyruğu güncelle
 */
async function stepPublishArticle(): Promise<TaskResult> {
  log("INFO", "article-scheduler", "start");
  try {
    const claude = createClaudeClient();
    const schedulerPrompt = loadSkillPrompt("article-scheduler");
    const writerPrompt = loadSkillPrompt("blog-writer");
    const queueContent = readText("content/article-queue.md");
    const blogTs = readText("lib/blog.ts");
    const productsTs = readText("lib/products.ts");
    const claudeMd = readText("CLAUDE.md");

    const msg = await claude.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8000,
      system: [
        schedulerPrompt,
        "",
        "---",
        "",
        writerPrompt,
        "",
        "---",
        "",
        "ÖNEMLİ KURALLAR:",
        claudeMd.split("## 17. NIET DOEN")[0].split("## 16. CODEERREGELS")[0].slice(-3000),
      ].join("\n"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: [
                "Sıradaki makaleyi yaz ve yayınla.",
                "",
                "ARTICLE QUEUE (ilk yazılmamış makaleyi bul):",
                "```",
                queueContent.slice(0, 5000),
                "```",
                "",
                "MEVCUT BLOG MAKALELERİ (slug çakışması kontrolü için):",
                "```ts",
                blogTs.slice(0, 5000),
                "```",
                "",
                "ÜRÜN VERİTABANI:",
                "```ts",
                productsTs.slice(0, 5000),
                "```",
                "",
                "Adımlar:",
                "1. Article queue'dan ilk - [ ] makaleyi bul",
                "2. Hedef ürünün bilgilerini products.ts'ten oku",
                "3. SEO-GEO-AEO uyumlu, 1200-1800 kelime makale yaz",
                "4. Makaleyi lib/blog.ts dizisinin başına ekle",
                "5. Makaleyi content/blog/[slug].mdx olarak kaydet",
                "6. Article queue'da makaleyi - [x] olarak işaretle",
                "7. Sonucu bildir (başlık, kelime sayısı, slug)",
              ].join("\n"),
            },
          ],
        },
      ],
    });

    const text = msg.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");
    log("INFO", "article-scheduler", "complete", { length: text.length });
    return { success: true, output: text };
  } catch (err: any) {
    log("ERROR", "article-scheduler", "failed", { error: err.message });
    return { success: false, output: "", error: err.message };
  }
}

/**
 * Step 3: Weekly Traffic Report
 */
async function stepTrafficReport(): Promise<TaskResult> {
  log("INFO", "traffic-monitor", "start");
  try {
    const claude = createClaudeClient();
    const monitorPrompt = loadSkillPrompt("traffic-monitor");
    const blogTs = readText("lib/blog.ts");

    const msg = await claude.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      system: monitorPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: [
                "Haftalık trafik raporu çıkar.",
                "",
                "Not: GA4 verilerine erişim yoksa Google Search Console verilerini kullan.",
                "Veri yoksa, mevcut makale sayıları ve sistem durumuyla bir özet çıkar.",
                "",
                "MEVCUT MAKALELER:",
                "```ts",
                blogTs.slice(0, 3000),
                "```",
                "",
                "Raporu content/weekly-report-[BUGÜN].md olarak kaydet.",
              ].join("\n"),
            },
          ],
        },
      ],
    });

    const text = msg.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");
    log("INFO", "traffic-monitor", "complete", { length: text.length });
    return { success: true, output: text };
  } catch (err: any) {
    log("ERROR", "traffic-monitor", "failed", { error: err.message });
    return { success: false, output: "", error: err.message };
  }
}

/**
 * Run full Monday pipeline
 */
export async function runMondayPipeline(
  bot: Telegraf | null,
  state: OrchestratorState
): Promise<void> {
  if (state.pipelineActive) {
    log("WARN", "orchestrator", "pipeline_busy", {});
    return;
  }
  state.pipelineActive = true;
  log("INFO", "orchestrator", "monday_pipeline_start");

  // Step 1: Market Research
  const research = await stepMarketResearch();
  if (bot) {
    await notifySubscribers(
      bot,
      state.subscribers,
      research.success
        ? `🔍 *Pazar Araştırması* ✅\nYeni konular tarandı. /queue ile görebilirsin.`
        : `🔍 *Pazar Araştırması* ❌\nHata: ${research.error}`
    );
  }

  // Step 2: Publish article
  const publish = await stepPublishArticle();
  if (bot) {
    await notifySubscribers(
      bot,
      state.subscribers,
      publish.success
        ? `📝 *Makale Yayınlandı* ✅\nYeni makale yayında!`
        : `📝 *Makale Yayınlama* ❌\nHata: ${publish.error}`
    );
  }

  // Step 3: Traffic Report
  const report = await stepTrafficReport();
  if (bot) {
    await notifySubscribers(
      bot,
      state.subscribers,
      report.success
        ? `📊 *Haftalık Rapor* ✅\nRapor hazır. /report ile görebilirsin.`
        : `📊 *Haftalık Rapor* ❌\nHata: ${report.error}`
    );
  }

  state.pipelineActive = false;
  log("INFO", "orchestrator", "monday_pipeline_complete");
}

/**
 * Run publish-only (Wed/Fri or manual trigger)
 */
export async function runPublishOnly(
  bot: Telegraf | null,
  state: OrchestratorState
): Promise<void> {
  if (state.pipelineActive) {
    log("WARN", "orchestrator", "pipeline_busy");
    return;
  }
  state.pipelineActive = true;
  log("INFO", "orchestrator", "publish_start");

  const publish = await stepPublishArticle();
  if (bot) {
    await notifySubscribers(
      bot,
      state.subscribers,
      publish.success
        ? `📝 *Makale Yayınlandı* ✅\n${publish.output.slice(0, 200)}`
        : `📝 *Makale Yayınlama* ❌\nHata: ${publish.error}`
    );
  }

  state.pipelineActive = false;
  log("INFO", "orchestrator", "publish_complete");

  // Build check after publish
  try {
    const { stdout } = await execAsync("cd " + PROJECT_ROOT + " && npx next build 2>&1 | tail -10");
    const buildOk = !stdout.includes("Error") && !stdout.includes("Failed");
    log("INFO", "orchestrator", "build_check", { ok: buildOk });
    if (!buildOk && bot) {
      await notifySubscribers(
        bot,
        state.subscribers,
        `🚨 *Build Hatası!*\n\`\`\`\n${stdout.slice(-500)}\n\`\`\``
      );
    }
  } catch (err: any) {
    log("ERROR", "orchestrator", "build_check_failed", { error: err.message });
  }
}

/**
 * Run build check
 */
export async function runBuildCheck(): Promise<{ ok: boolean; output: string }> {
  try {
    const { stdout } = await execAsync("cd " + PROJECT_ROOT + " && npx next build 2>&1 | tail -15");
    return { ok: !stdout.includes("Error") && !stdout.includes("Failed"), output: stdout };
  } catch (err: any) {
    return { ok: false, output: err.message };
  }
}
