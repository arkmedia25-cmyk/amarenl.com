/**
 * Anthropic-SDK-compatible shim backed by Google Gemini.
 *
 * Drop-in replacement for `@anthropic-ai/sdk` so the existing article
 * generators keep working unchanged: they still do
 *
 *     import Anthropic from "./anthropic-compat-gemini.mjs";
 *     const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 *     const res = await client.messages.create({ model, max_tokens, system, messages });
 *     const text = res.content.find((b) => b.type === "text").text;
 *
 * Required env: GEMINI_API_KEY (or GOOGLE_API_KEY)
 * Optional env: GEMINI_MODEL (default gemini-2.5-flash), GEMINI_BASE_URL
 *
 * Why: the Anthropic credit balance ran out (400 "credit balance is too low"),
 * which stopped every article workflow. Gemini's OpenAI-compatible endpoint is
 * used instead, no Anthropic billing needed.
 */

const API_KEY =
  process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
const BASE_URL = (
  process.env.GEMINI_BASE_URL ||
  "https://generativelanguage.googleapis.com/v1beta/openai"
).replace(/\/$/, "");
const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

// Gemini's OpenAI endpoint caps completion tokens well below what a
// Claude model accepts; clamp so a 16000/32000 max_tokens call still works.
const MAX_OUTPUT_TOKENS = 32768;

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
  // The generators default to claude-* model ids; Gemini does not know them.
  if (!requested || /^claude/i.test(requested)) return DEFAULT_MODEL;
  return requested;
}

export default class Anthropic {
  constructor(options = {}) {
    // Accepts { apiKey } like the real SDK, but Gemini auth comes from env.
    this.apiKey = options.apiKey || API_KEY;
    this.messages = { create: (params) => this._create(params) };
  }

  async _create(params = {}) {
    const key = this.apiKey || API_KEY;
    if (!key) {
      throw new Error(
        "GEMINI_API_KEY is not set — cannot reach the Gemini API"
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
      throw new Error(`Gemini API request failed: ${cause.message}`);
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
        json?.error?.message || raw.slice(0, 300) || `HTTP ${res.status}`;
      const err = new Error(`Gemini API ${res.status}: ${detail}`);
      err.status = res.status;
      throw err;
    }

    const choice = json?.choices?.[0] || {};
    // Reasoning models can return an empty content string with the text in
    // reasoning_content; fall back so callers never see a silent blank.
    const text = choice.message?.content || choice.message?.reasoning_content || "";

    return {
      id: json?.id,
      model: json?.model || body.model,
      type: "message",
      role: "assistant",
      content: [{ type: "text", text }],
      stop_reason: choice.finish_reason || "stop",
      usage: {
        input_tokens: json?.usage?.prompt_tokens,
        output_tokens: json?.usage?.completion_tokens,
      },
    };
  }
}

export { Anthropic };
