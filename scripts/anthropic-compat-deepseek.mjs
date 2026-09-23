/**
 * Anthropic-SDK-compatible shim backed by DeepSeek.
 *
 * Drop-in replacement for `@anthropic-ai/sdk` so the existing article
 * generators keep working unchanged: they still do
 *
 *     import Anthropic from "./anthropic-compat-deepseek.mjs";
 *     const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 *     const res = await client.messages.create({ model, max_tokens, system, messages });
 *     const text = res.content.find((b) => b.type === "text").text;
 *
 * Required env: DEEPSEEK_API_KEY
 * Optional env: DEEPSEEK_MODEL (default deepseek-flash), DEEPSEEK_BASE_URL
 *
 * Why: Gemini's project hit its monthly spending cap (429 RESOURCE_EXHAUSTED)
 * and gemini-2.5-flash is being retired 2026-10-16. DeepSeek's OpenAI-compatible
 * endpoint is cheaper per output token (the dominant cost for long articles) and
 * has no separate "spend cap" concept on top of the prepay balance.
 */

const API_KEY = process.env.DEEPSEEK_API_KEY || "";
const BASE_URL = (
  process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com"
).replace(/\/$/, "");
const DEFAULT_MODEL = process.env.DEEPSEEK_MODEL || "deepseek-flash";

// DeepSeek V4.1 Flash allows ~384K output tokens; the clamp only guards against a runaway
// caller value. 2026-09-23: stond op 32768, maar de artikel-calls vroegen 16000 — en omdat
// reasoning-tokens hetzelfde budget delen, liep een lange prompt tegen de cap aan:
// finish_reason=length met lege content, waarna de oude fallback de afgekapte
// reasoning-tekst ("Let me ana…") als content teruggaf en de generator 3x op een
// JSON-parsefout stukliep. Vandaar: ruimere clamp + hard falen i.p.v. prose teruggeven.
const MAX_OUTPUT_TOKENS = 131072;

function blocksToText(content) {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((block) => {
      if (typeof block === "string") return block;
      if (block && block.type === "text") return block.text ?? "";
      return "";
    })
    .join("");
}

function toOpenAIMessages(system, messages) {
  const out = [];
  if (typeof system === "string" && system.trim()) {
    out.push({ role: "system", content: system });
  } else if (Array.isArray(system) && system.length) {
    const text = blocksToText(system);
    if (text.trim()) out.push({ role: "system", content: text });
  }
  for (const msg of messages || []) {
    if (!msg || !msg.role) continue;
    out.push({ role: msg.role, content: blocksToText(msg.content) });
  }
  return out;
}

function resolveModel(requested) {
  // The generators still default to claude-* model ids; DeepSeek does not know them.
  if (!requested || /^claude/i.test(requested)) return DEFAULT_MODEL;
  return requested;
}

export default class Anthropic {
  constructor(options = {}) {
    // The generators still pass the (dead) Anthropic key as options.apiKey,
    // so the DeepSeek key from the environment must win over it.
    this.apiKey = API_KEY || options.apiKey || "";
    this.messages = { create: (params) => this._create(params) };
  }

  async _create(params = {}) {
    const key = this.apiKey || API_KEY;
    if (!key) {
      throw new Error(
        "DEEPSEEK_API_KEY is not set — cannot reach the DeepSeek API"
      );
    }

    const body = {
      model: resolveModel(params.model),
      messages: toOpenAIMessages(params.system, params.messages),
      max_tokens: Math.min(
        Number(params.max_tokens) > 0 ? Number(params.max_tokens) : 8192,
        MAX_OUTPUT_TOKENS
      ),
    };
    if (typeof params.temperature === "number") {
      body.temperature = params.temperature;
    }

    let res;
    try {
      res = await fetch(`${BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify(body),
      });
    } catch (cause) {
      throw new Error(`DeepSeek API request failed: ${cause.message}`);
    }

    const raw = await res.text();
    let json = null;
    try {
      json = JSON.parse(raw);
    } catch {
      /* non-JSON error body */
    }

    if (!res.ok) {
      const detail =
        (json && !Array.isArray(json) && json.error?.message) ||
        (Array.isArray(json) && json[0]?.error?.message) ||
        raw.slice(0, 300) ||
        `HTTP ${res.status}`;
      const err = new Error(`DeepSeek API ${res.status}: ${detail}`);
      err.status = res.status;
      throw err;
    }

    const choice = json?.choices?.[0] || {};
    const content = choice.message?.content || "";
    const reasoning = choice.message?.reasoning_content || "";

    // Reasoning-modellen kunnen het hele output-budget aan redeneren besteden
    // (finish_reason=length) en dan een LEEG content-veld terugsturen. De vorige versie
    // viel dan terug op reasoning_content — dat is geen antwoord maar afgekapte
    // denktekst, en leverde 3x een onverklaarbare JSON-parsefout op. Beter hard falen:
    // de aanroeper heeft retry-logica en kan met meer tokens opnieuw proberen.
    if (!content.trim()) {
      throw new Error(
        `DeepSeek gaf geen content terug (finish_reason=${choice.finish_reason || "?"}, ` +
          `reasoning=${reasoning.length} tekens) — output-budget volledig aan redeneren besteed. ` +
          `Verhoog max_tokens of verklein de prompt.`
      );
    }

    return {
      id: json?.id,
      model: json?.model || body.model,
      type: "message",
      role: "assistant",
      content: [{ type: "text", text: content }],
      stop_reason: choice.finish_reason || "stop",
      usage: {
        input_tokens: json?.usage?.prompt_tokens,
        output_tokens: json?.usage?.completion_tokens,
      },
    };
  }
}

export { Anthropic };
