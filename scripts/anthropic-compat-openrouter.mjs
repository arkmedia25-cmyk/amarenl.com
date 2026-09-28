/**
 * Anthropic-SDK-compatible shim backed by an OpenRouter ":free" model.
 *
 * Drop-in replacement for `@anthropic-ai/sdk`, same interface as the other
 * anthropic-compat-*.mjs shims:
 *
 *     import Anthropic from "./anthropic-compat-openrouter.mjs";
 *     const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, model: "..." });
 *     const res = await client.messages.create({ model, max_tokens, system, messages });
 *
 * Required env: OPENROUTER_API_KEY
 * Optional: pass `model` in the constructor options to pick which free model
 * this instance targets (defaults to OPENROUTER_MODEL env, then nemotron).
 * All three models below were confirmed live on https://openrouter.ai/api/v1/models
 * on 2026-09-28 — real ":free" entries, not guessed ids, each large enough
 * (27B-120B) and with enough context (262k tokens) to write a full article
 * with citations in one call:
 *   - nvidia/nemotron-3-super-120b-a12b:free  (already the default in
 *     generate-article.mjs, so proven to work in this repo)
 *   - google/gemma-4-31b-it:free
 *   - qwen/qwen3.8-27b:free
 * Three different underlying providers on purpose: OpenRouter's free-tier
 * rate limits are per-model/per-provider, so if NVIDIA's free capacity is
 * exhausted, Google's or Qwen's queue is a separate pool.
 */

const API_KEY = process.env.OPENROUTER_API_KEY || "";
const BASE_URL = (
  process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1"
).replace(/\/$/, "");
const DEFAULT_MODEL =
  process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-super-120b-a12b:free";
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

export default class Anthropic {
  constructor(options = {}) {
    this.apiKey = API_KEY || options.apiKey || "";
    // The generators pass claude-* model ids, which OpenRouter doesn't know —
    // always use this shim's own configured free model instead.
    this.model = options.model || DEFAULT_MODEL;
    this.messages = { create: (params) => this._create(params) };
  }

  async _create(params = {}) {
    const key = this.apiKey || API_KEY;
    if (!key) {
      throw new Error(
        "OPENROUTER_API_KEY is not set — cannot reach the OpenRouter API"
      );
    }

    const body = {
      model: this.model,
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
          // OpenRouter asks free-tier callers to identify the app.
          "HTTP-Referer": "https://vitaalroute.nl",
          "X-Title": "VitaalRoute Article Generator",
        },
        body: JSON.stringify(body),
      });
    } catch (cause) {
      throw new Error(
        `OpenRouter API request failed (${this.model}): ${cause.message}`
      );
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
      const err = new Error(`OpenRouter API ${res.status} (${this.model}): ${detail}`);
      err.status = res.status;
      throw err;
    }

    const choice = json?.choices?.[0] || {};
    const text = choice.message?.content || choice.message?.reasoning_content || "";

    if (!text.trim()) {
      throw new Error(
        `OpenRouter (${this.model}) gaf geen content terug (finish_reason=${choice.finish_reason || "?"})`
      );
    }

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
