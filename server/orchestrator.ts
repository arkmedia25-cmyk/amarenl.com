/**
 * AmareNL Content Orchestrator v2
 *
 * Claude API tool-use ile gerçek dosya işlemleri yapar.
 * Telegram /publish → sıradaki makaleyi yazar, MDX+blog.ts+queue günceller.
 */

import { Anthropic } from "@anthropic-ai/sdk";
import type { Tool, MessageParam, ToolUseBlock } from "@anthropic-ai/sdk/resources/messages";
import { readFileSync, writeFileSync, appendFileSync, existsSync, readdirSync } from "fs";
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

const PROJECT_ROOT = process.env.PROJECT_ROOT || "/opt/AmareNL.com";

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

// --- Claude API with tool use ---
function createClaudeClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");
  return new Anthropic({ apiKey });
}

// --- Tool definitions for Claude ---
const TOOLS: Tool[] = [
  {
    name: "read_file",
    description: "Read the contents of a file. Path is relative to project root.",
    input_schema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "File path relative to project root, e.g. 'content/article-queue.md' or 'lib/blog.ts'",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "write_file",
    description: "Write content to a file. Creates the file if it doesn't exist. Path is relative to project root.",
    input_schema: {
      type: "object" as const,
      properties: {
        path: {
          type: "string",
          description: "File path relative to project root, e.g. 'content/blog/my-article.mdx'",
        },
        content: {
          type: "string",
          description: "Full content to write to the file",
        },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "run_command",
    description: "Execute a shell command and return stdout/stderr. Use for build checks, git operations, etc.",
    input_schema: {
      type: "object" as const,
      properties: {
        command: {
          type: "string",
          description: "Shell command to execute",
        },
        working_dir: {
          type: "string",
          description: "Working directory for the command, relative to project root. Default: project root.",
        },
      },
      required: ["command"],
    },
  },
  {
    name: "list_files",
    description: "List files in a directory. Useful for checking what blog articles already exist.",
    input_schema: {
      type: "object" as const,
      properties: {
        directory: {
          type: "string",
          description: "Directory path relative to project root, e.g. 'content/blog'",
        },
      },
      required: ["directory"],
    },
  },
  {
    name: "send_telegram",
    description: "Send a status message to Telegram subscribers.",
    input_schema: {
      type: "object" as const,
      properties: {
        message: {
          type: "string",
          description: "Markdown-formatted message to send",
        },
      },
      required: ["message"],
    },
  },
];

// --- Tool executor ---
async function executeTool(
  toolName: string,
  input: Record<string, unknown>,
  bot: Telegraf | null,
  subscribers: string[]
): Promise<string> {
  switch (toolName) {
    case "read_file": {
      const path = input.path as string;
      if (!existsSync(rel(path))) return `ERROR: File not found: ${path}`;
      const content = readText(path);
      return content.length > 15000
        ? content.slice(0, 15000) + `\n\n[... truncated, ${content.length} total chars]`
        : content;
    }

    case "write_file": {
      const path = input.path as string;
      const content = input.content as string;
      writeText(path, content);
      return `OK: Written ${content.length} chars to ${path}`;
    }

    case "run_command": {
      const command = input.command as string;
      const cwd = (input.working_dir as string) || ".";
      try {
        const { stdout, stderr } = await execAsync(command, {
          cwd: rel(cwd),
          timeout: 60000,
          maxBuffer: 1024 * 1024,
        });
        return stdout || stderr || "(no output)";
      } catch (err: any) {
        return `EXIT ${err.code}: ${err.stderr || err.stdout || err.message}`;
      }
    }

    case "list_files": {
      const dir = input.directory as string;
      if (!existsSync(rel(dir))) return `ERROR: Directory not found: ${dir}`;
      const files = readdirSync(rel(dir));
      return files.join("\n");
    }

    case "send_telegram": {
      const message = input.message as string;
      if (bot) {
        await notifySubscribers(bot, subscribers, message);
      }
      return "OK: Telegram message sent";
    }

    default:
      return `Unknown tool: ${toolName}`;
  }
}

// --- Tool use loop ---
async function runClaudeWithTools(
  systemPrompt: string,
  userMessage: string,
  bot: Telegraf | null,
  subscribers: string[],
  maxTurns: number = 20
): Promise<string> {
  const claude = createClaudeClient();
  const messages: MessageParam[] = [{ role: "user", content: userMessage }];

  let finalText = "";

  for (let turn = 0; turn < maxTurns; turn++) {
    const response = await claude.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 8000,
      system: systemPrompt,
      tools: TOOLS,
      messages,
    });

    // Collect text and tool calls
    const toolUses: ToolUseBlock[] = [];
    let text = "";

    for (const block of response.content) {
      if (block.type === "text") {
        text += block.text;
      } else if (block.type === "tool_use") {
        toolUses.push(block as ToolUseBlock);
      }
    }

    if (toolUses.length === 0) {
      finalText = text;
      break;
    }

    // Execute tools
    const toolResults: MessageParam["content"] = [];
    if (text) {
      toolResults.push({ type: "text", text });
    }

    for (const tool of toolUses) {
      log("INFO", "orchestrator", "tool_exec", { tool: tool.name, input: tool.input });
      const result = await executeTool(tool.name, tool.input as Record<string, unknown>, bot, subscribers);
      log("INFO", "orchestrator", "tool_result", { tool: tool.name, result: result.slice(0, 200) });
      toolResults.push({
        type: "tool_result",
        tool_use_id: tool.id,
        content: result,
      });
    }

    messages.push({ role: "assistant", content: response.content });
    messages.push({ role: "user", content: toolResults });
  }

  if (!finalText) {
    finalText = "Claude completed tool operations.";
  }

  return finalText;
}

// --- Skill prompt loader ---
function loadSkillPrompt(skillName: string): string {
  const path = rel(`.claude/skills/${skillName}.md`);
  if (!existsSync(path)) return "";
  return readText(path);
}

// --- Pipeline Steps ---

/**
 * Step: Publish next article from queue
 * Claude reads the queue, writes MDX, updates blog.ts, marks queue done.
 */
async function stepPublishArticle(
  bot: Telegraf | null,
  state: OrchestratorState
): Promise<{ success: boolean; title?: string; slug?: string; words?: number; error?: string }> {
  log("INFO", "article-scheduler", "start");

  try {
    // Build system prompt from skills + rules
    const schedulerPrompt = loadSkillPrompt("article-scheduler");
    const writerPrompt = loadSkillPrompt("blog-writer");
    const claudeMd = readText("CLAUDE.md");
    const seoRules = claudeMd.includes("## 13. SEO")
      ? claudeMd.split("## 13. SEO")[1].split("## 14.")[0]
      : "";
    const verboden = claudeMd.includes("## 17. NIET DOEN")
      ? claudeMd.split("## 17. NIET DOEN")[1].split("---")[0]
      : "";

    const systemPrompt = [
      "Jij bent de AmareNL Blog Writer. Je schrijft SEO-GEO-AEO geoptimaliseerde blog artikelen in het Nederlands.",
      "",
      "=== ARTICLE SCHEDULER REGELS ===",
      schedulerPrompt,
      "",
      "=== BLOG WRITER REGELS ===",
      writerPrompt,
      "",
      "=== SEO REGELS ===",
      seoRules.slice(0, 3000),
      "",
      "=== VERBODEN (NIET DOEN) ===",
      verboden.slice(0, 2000),
      "",
      "=== BELANGRIJK ===",
      "- Je hebt BESTANDSTOOLS tot je beschikking om bestanden te lezen en te schrijven.",
      "- Gebruik read_file om de article queue, products.ts, en blog.ts te lezen.",
      "- Gebruik write_file om het MDX bestand en de geüpdatete blog.ts op te slaan.",
      "- Markeer de geschreven artikel als [x] in article-queue.md.",
      "- Stuur aan het einde een Telegram bericht met wat je hebt gedaan (gebruik send_telegram).",
    ].join("\n");

    const userMessage = [
      "📝 **PUBLICEER HET VOLGENDE ARTIKEL**",
      "",
      "Voer deze stappen uit:",
      "",
      "1. Lees `content/article-queue.md` en vind de eerste `- [ ]` (ongeschreven) artikel.",
      "2. Lees `lib/products.ts` voor informatie over het doelproduct.",
      "3. Lees `lib/blog.ts` om bestaande slugs te controleren (geen duplicaten!).",
      "4. Schrijf een SEO-GEO-AEO blog artikel van 1200-1800 woorden in het Nederlands.",
      "   - Gebruik de exacte structuur uit de blog-writer skill (Wat is..., FAQ, Conclusie).",
      "   - Voeg de NVWA disclaimer toe.",
      "   - Gebruik het AffiliateCTA component voor het product.",
      "5. Schrijf het MDX bestand naar `content/blog/[slug].mdx` met volledige frontmatter.",
      "6. Voeg de blog entry toe aan `lib/blog.ts` — bovenaan de blogPosts array.",
      "7. Update `content/article-queue.md`: markeer het artikel als `- [x]`.",
      "8. Stuur een Telegram bericht met: titel, slug, woordenaantal, en wat de volgende is.",
      "",
      "Belangrijk: gebruik de TOOLS die je hebt! read_file, write_file, send_telegram.",
      "Werk direct — lees de bestanden, schrijf het artikel, update de queue.",
    ].join("\n");

    const result = await runClaudeWithTools(systemPrompt, userMessage, bot, state.subscribers);
    log("INFO", "article-scheduler", "complete", { resultLength: result.length });

    // Try to extract title/slug from result
    const titleMatch = result.match(/titel[:\s]+(.+)/i) || result.match(/gepubliceerd[:\s]+(.+)/i);
    const slugMatch = result.match(/slug[:\s]+(.+)/i);

    return {
      success: true,
      title: titleMatch?.[1]?.trim() || "Onbekend",
      slug: slugMatch?.[1]?.trim() || "onbekend",
      words: result.length,
    };
  } catch (err: any) {
    log("ERROR", "article-scheduler", "failed", { error: err.message });
    return { success: false, error: err.message };
  }
}

/**
 * Run publish pipeline (Wed/Fri or manual /publish trigger)
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

  if (bot && state.subscribers.length > 0) {
    await notifySubscribers(bot, state.subscribers, "✍️ *Makale yazımı başladı...*");
  }

  const result = await stepPublishArticle(bot, state);

  if (bot && state.subscribers.length > 0) {
    if (result.success) {
      await notifySubscribers(
        bot,
        state.subscribers,
        [
          `📝 *Makale Yayınlandı!*`,
          `• Başlık: ${result.title}`,
          `• Slug: \`${result.slug}\``,
          `• Kelime: ~${result.words}`,
          ``,
          `📋 /queue ile kuyruğu kontrol et.`,
        ].join("\n")
      );
    } else {
      await notifySubscribers(
        bot,
        state.subscribers,
        `🚨 *Yayın Hatası*\n\`\`\`\n${result.error}\n\`\`\``
      );
    }
  }

  state.pipelineActive = false;
  log("INFO", "orchestrator", "publish_complete");
}

/**
 * Run build check
 */
export async function runBuildCheck(): Promise<{ ok: boolean; output: string }> {
  try {
    const cmd = existsSync(rel("node_modules/.bin/next"))
      ? "npx next build 2>&1 | tail -15"
      : "echo 'Next.js not installed on this server — skipping build check'";
    const { stdout } = await execAsync(`cd ${PROJECT_ROOT} && ${cmd}`);
    return { ok: !stdout.includes("Error") && !stdout.includes("Failed"), output: stdout };
  } catch (err: any) {
    return { ok: false, output: err.message };
  }
}
