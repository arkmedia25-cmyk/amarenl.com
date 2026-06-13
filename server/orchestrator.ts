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
  manualAnalyzeRequested: boolean;
  manualOptimizeSlug: string | null;
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
  {
    name: "web_search",
    description:
      "Search the web for current trending topics, keywords, and news. Use for market research, finding viral content angles, and checking what's trending in the Netherlands. Returns top search result snippets.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Search query in Dutch, e.g. 'populaire supplementen 2026 trend' or 'collageen nieuws onderzoek'",
        },
      },
      required: ["query"],
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

    case "web_search": {
      const query = input.query as string;
      const encoded = encodeURIComponent(query);
      try {
        const { stdout } = await execAsync(
          `curl -s -L --max-time 15 "https://lite.duckduckgo.com/lite/?q=${encoded}" | sed 's/<[^>]*>//g' | sed '/^$/d' | head -60`,
          { timeout: 20000, maxBuffer: 512 * 1024 }
        );
        return stdout.slice(0, 4000) || "(no results)";
      } catch (err: any) {
        // Fallback: use an alternative approach
        try {
          const { stdout } = await execAsync(
            `curl -s --max-time 15 "https://html.duckduckgo.com/html/?q=${encoded}" | grep -oP '(?<=class="result__snippet">).*?(?=</a>)' | sed 's/<[^>]*>//g' | head -20`,
            { timeout: 20000, maxBuffer: 512 * 1024 }
          );
          return stdout.slice(0, 4000) || "(no results from fallback)";
        } catch {
          return `Web search failed. Based on your knowledge, suggest trending topics for: "${query}"`;
        }
      }
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

  // Auto-replenish queue if running low
  await autoReplenishIfNeeded(bot, state);
}

/**
 * Step: Market Research — scan trends, find viral keywords, replenish queue
 */
async function stepMarketResearch(
  bot: Telegraf | null,
  state: OrchestratorState
): Promise<{ success: boolean; topicsAdded: number; error?: string }> {
  log("INFO", "market-research", "start");

  try {
    const researchPrompt = loadSkillPrompt("market-research");
    const keywordPrompt = loadSkillPrompt("keyword-analyzer");
    const claudeMd = readText("CLAUDE.md");
    const categories = claudeMd.includes("## 6. PRODUCTEN")
      ? claudeMd.split("## 6. PRODUCTEN")[1].split("## 7.")[0].slice(0, 3000)
      : "";

    const systemPrompt = [
      "Jij bent de AmareNL Market Research Agent. Je doet marktonderzoek voor een Nederlandse wellness affiliate site.",
      "",
      "=== MARKET RESEARCH SKILL ===",
      researchPrompt,
      "",
      "=== KEYWORD ANALYZER SKILL ===",
      keywordPrompt,
      "",
      "=== AMARE PRODUCT CATEGORIES ===",
      categories,
      "",
      "=== BELANGRIJK ===",
      "- Gebruik web_search om trending onderwerpen in Nederland te vinden.",
      "- Focus op: supplementen, collageen, probiotica, afvallen, energie, slaap, stress, menopauze, huidverzorging, darmgezondheid.",
      "- Zoek naar 'people also ask' vragen en viral content angles.",
      "- Analyseer elke keyword met GEO-score (search volume × commercial intent × product match × competition gap × GEO potential).",
      "- Voeg minimaal 3 nieuwe artikelen toe aan de queue (article-queue.md).",
      "- Gebruik write_file om de geüpdatete queue op te slaan.",
      "- Gebruik send_telegram om een samenvatting te sturen.",
    ].join("\n");

    const userMessage = [
      "🔍 **MARKT ONDERZOEK — Vul de artikel wachtrij aan**",
      "",
      "Stappen:",
      "1. Lees `content/article-queue.md` — hoeveel artikelen staan er nog in de wachtrij?",
      "2. Lees `lib/blog.ts` — welke onderwerpen zijn al behandeld?",
      "3. Gebruik web_search om trending gezondheid/supplement onderwerpen in Nederland te vinden.",
      "   Zoek naar: 'supplementen trends 2026', 'populaire supplementen Nederland', 'gezondheidstrends', etc.",
      "4. Identificeer minimaal 3 nieuwe content kansen met GEO-potentieel.",
      "5. Voor elk nieuw onderwerp: bepaal keyword, GEO-score, target product, FAQ vragen.",
      "6. Voeg de nieuwe artikelen toe aan `content/article-queue.md` — in de juiste TIER (🔴 hoog → 🟢 laag).",
      "7. Zorg dat de queue minimaal 10 artikelen bevat.",
      "8. Stuur een Telegram samenvatting met de nieuwe topics en hun GEO-scores.",
      "",
      "Gebruik de tools: read_file, web_search, write_file, send_telegram.",
    ].join("\n");

    await runClaudeWithTools(systemPrompt, userMessage, bot, state.subscribers);
    log("INFO", "market-research", "complete");
    return { success: true, topicsAdded: 0 };
  } catch (err: any) {
    log("ERROR", "market-research", "failed", { error: err.message });
    return { success: false, topicsAdded: 0, error: err.message };
  }
}

/**
 * Auto-check: if queue < 5, auto-trigger research
 */
async function autoReplenishIfNeeded(
  bot: Telegraf | null,
  state: OrchestratorState
): Promise<void> {
  try {
    const queue = readText("content/article-queue.md");
    const pending = (queue.match(/- \[ \]/g) || []).length;
    if (pending < 5) {
      log("WARN", "orchestrator", "queue_low", { pending });
      if (bot) {
        await notifySubscribers(
          bot,
          state.subscribers,
          `⚠️ *Kuyruk azalıyor!* Sadece ${pending} makale kaldı. Otomatik araştırma başlatılıyor...`
        );
      }
      await stepMarketResearch(bot, state);
    }
  } catch {
    // silently fail — auto-replenish is best-effort
  }
}

/**
 * Run market research (manual /research trigger)
 */
export async function runResearchOnly(
  bot: Telegraf | null,
  state: OrchestratorState
): Promise<void> {
  if (state.pipelineActive) {
    log("WARN", "orchestrator", "pipeline_busy");
    return;
  }
  state.pipelineActive = true;
  log("INFO", "orchestrator", "research_start");

  if (bot && state.subscribers.length > 0) {
    await notifySubscribers(bot, state.subscribers, "🔍 *Pazar araştırması başlatıldı...*");
  }

  const result = await stepMarketResearch(bot, state);

  if (bot && state.subscribers.length > 0) {
    if (result.success) {
      await notifySubscribers(
        bot,
        state.subscribers,
        "✅ *Araştırma tamamlandı!* Yeni konular kuyruğa eklendi. /queue ile kontrol et."
      );
    } else {
      await notifySubscribers(
        bot,
        state.subscribers,
        `🚨 *Araştırma Hatası*\n\`\`\`\n${result.error}\n\`\`\``
      );
    }
  }

  state.pipelineActive = false;
  log("INFO", "orchestrator", "research_complete");
}

// --- GSC Data & Keyword Analysis ---

/**
 * Step: Analyze search performance from GSC CSV data
 * If no GSC CSV exists, uses web_search to find ranking insights.
 */
async function stepAnalyzeKeywords(
  bot: Telegraf | null,
  state: OrchestratorState
): Promise<{ success: boolean; opportunities: number; error?: string }> {
  log("INFO", "keyword-analyzer", "start");

  try {
    const hasGscData = existsSync(rel("content/gsc-data"));
    const gscFiles = hasGscData
      ? readdirSync(rel("content/gsc-data")).filter((f) => f.endsWith(".csv"))
      : [];

    const systemPrompt = [
      "Jij bent de AmareNL SEO Analyst. Je analyseert zoekwoorddata en optimaliseert bestaande content.",
      "",
      "Je hebt toegang tot:",
      "- Google Search Console export data (CSV in content/gsc-data/)",
      "- Alle blog artikelen (lib/blog.ts en content/blog/*.mdx)",
      "- Web search voor actuele ranking checks",
      "",
      "=== JOUW TAAK ===",
      "1. Lees eventuele GSC CSV data uit content/gsc-data/",
      "2. Lees alle blog artikelen (slugs, titles, target keywords)",
      "3. Gebruik web_search om te checken of onze artikelen ranken voor hun target keywords",
      "4. Identificeer kansen:",
      "   - Keywords met hoge impressies maar lage CTR → meta description verbeteren",
      "   - Keywords die bijna ranken (positie 4-15) → content uitbreiden",
      "   - Nieuwe long-tail varianten die we nog niet targeten",
      "5. Schrijf een analyse rapport naar content/keyword-analysis.md",
      "6. Stuur een Telegram samenvatting met top 3 actiepunten",
      "",
      "=== BELANGRIJK ===",
      "- Focus op HOLLANDSTALIGE keywords",
      "- Geef concrete aanbevelingen per artikel",
      "- Prioriteer op basis van verwacht traffic impact",
    ].join("\n");

    const userMessage = [
      "📊 **ANALYSE ZOEKPRESTATIES**",
      "",
      `GSC data beschikbaar: ${gscFiles.length > 0 ? gscFiles.join(", ") : "GEEN — gebruik web search"}`,
      "",
      "Stappen:",
      `1. ${gscFiles.length > 0 ? "Lees GSC CSV uit content/gsc-data/" + gscFiles[0] : "Gebruik web_search om ranking data te verzamelen"}`,
      "2. Lees lib/blog.ts — lijst alle artikelen met hun slugs en titels",
      "3. Voor de top 10 meest belangrijke artikelen: check via web_search of ze ranken",
      "4. Identificeer 3-5 concrete verbeterkansen",
      "5. Schrijf analyse naar content/keyword-analysis.md",
      "6. Stuur samenvatting via send_telegram",
      "",
      "Gebruik de tools! read_file, web_search, write_file, send_telegram.",
    ].join("\n");

    await runClaudeWithTools(systemPrompt, userMessage, bot, state.subscribers);
    log("INFO", "keyword-analyzer", "complete");
    return { success: true, opportunities: 0 };
  } catch (err: any) {
    log("ERROR", "keyword-analyzer", "failed", { error: err.message });
    return { success: false, opportunities: 0, error: err.message };
  }
}

/**
 * Step: Optimize a specific article based on keyword insights
 */
async function stepOptimizeArticle(
  slug: string,
  bot: Telegraf | null,
  state: OrchestratorState
): Promise<{ success: boolean; error?: string }> {
  log("INFO", "content-optimizer", "start", { slug });

  try {
    const systemPrompt = [
      "Jij bent de AmareNL Content Optimizer. Je verbetert bestaande blog artikelen voor betere SEO-GEO prestaties.",
      "",
      "=== REGELS ===",
      "- Behoud de originele structuur en toon",
      "- Verbeter meta description, H1, H2's waar nodig",
      "- Voeg ontbrekende FAQ vragen toe",
      "- Update interne links naar relevante productpagina's",
      "- Behoud de NVWA disclaimer",
      "- Verwijder GEEN bestaande content, alleen toevoegen/verbeteren",
      "- Schrijf in het Nederlands",
    ].join("\n");

    const userMessage = [
      `🔧 **OPTIMALISEER ARTIKEL: ${slug}**`,
      "",
      "Stappen:",
      `1. Lees het MDX bestand: content/blog/${slug}.mdx`,
      `2. Lees de blog entry in lib/blog.ts voor slug "${slug}"`,
      "3. Lees content/keyword-analysis.md voor de laatste keyword inzichten",
      `4. Check via web_search: "site:amarenl.com ${slug}" en relevante keywords`,
      "5. Identificeer verbeterpunten:",
      "   - Meta description (max 155 chars, hoofdkeyword vooraan)",
      "   - H1/H2 structuur (keyword in eerste H2)",
      "   - FAQ sectie (minstens 3 vragen met 40-60 woord antwoorden)",
      "   - Interne links (2+ naar andere Amare pagina's)",
      "   - Content lengte (target: 1200+ woorden)",
      "6. Update het MDX bestand MET verbeteringen",
      "7. Update de blog entry in lib/blog.ts (title, excerpt, metaDescription indien gewijzigd)",
      "8. Stuur een Telegram bericht met wat je hebt verbeterd",
      "",
      "Gebruik de tools! read_file, web_search, write_file, send_telegram.",
    ].join("\n");

    await runClaudeWithTools(systemPrompt, userMessage, bot, state.subscribers);
    log("INFO", "content-optimizer", "complete", { slug });
    return { success: true };
  } catch (err: any) {
    log("ERROR", "content-optimizer", "failed", { slug, error: err.message });
    return { success: false, error: err.message };
  }
}

/**
 * Run keyword analysis (manual /analyze trigger)
 */
export async function runAnalyzeOnly(
  bot: Telegraf | null,
  state: OrchestratorState
): Promise<void> {
  if (state.pipelineActive) {
    log("WARN", "orchestrator", "pipeline_busy");
    return;
  }
  state.pipelineActive = true;

  if (bot && state.subscribers.length > 0) {
    await notifySubscribers(bot, state.subscribers, "📊 *Keyword analizi başladı...* (GSC + ranking check)");
  }

  const result = await stepAnalyzeKeywords(bot, state);

  if (bot && state.subscribers.length > 0) {
    if (result.success) {
      await notifySubscribers(
        bot,
        state.subscribers,
        "✅ *Analiz tamamlandı!* Rapport: content/keyword-analysis.md\nKullanım: `/optimize [slug]` ile bir makaleyi güncelleyebilirsin."
      );
    } else {
      await notifySubscribers(bot, state.subscribers, `🚨 *Analiz hatası:* ${result.error}`);
    }
  }

  state.pipelineActive = false;
}

/**
 * Run article optimization (manual /optimize trigger)
 */
export async function runOptimizeArticle(
  slug: string,
  bot: Telegraf | null,
  state: OrchestratorState
): Promise<void> {
  if (state.pipelineActive) {
    log("WARN", "orchestrator", "pipeline_busy");
    return;
  }
  state.pipelineActive = true;

  if (bot && state.subscribers.length > 0) {
    await notifySubscribers(bot, state.subscribers, `🔧 *Optimiseer:* \`${slug}\`...`);
  }

  const result = await stepOptimizeArticle(slug, bot, state);

  if (bot && state.subscribers.length > 0) {
    if (result.success) {
      await notifySubscribers(bot, state.subscribers, `✅ *${slug}* geoptimaliseerd!`);
    } else {
      await notifySubscribers(bot, state.subscribers, `🚨 *Optimalisatie fout:* ${result.error}`);
    }
  }

  state.pipelineActive = false;
}

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
