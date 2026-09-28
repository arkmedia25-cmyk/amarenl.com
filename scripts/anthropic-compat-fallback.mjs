/**
 * Anthropic-SDK-compatible client with automatic provider fallback.
 *
 * Drop-in replacement for `@anthropic-ai/sdk`, same interface as the shims
 * it wraps:
 *
 *     import Anthropic from "./anthropic-compat-fallback.mjs";
 *     const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 *     const res = await client.messages.create({ model, max_tokens, system, messages });
 *
 * Tries each provider below in order and returns the first one that
 * succeeds. A provider "fails" on ANY thrown error (insufficient balance,
 * spend cap, rate limit, network) — no special-casing per error type.
 *
 *   1. DeepSeek       — primary, cheapest per output token when it has balance
 *   2. Gemini         — paid tier already configured (may itself be capped)
 *   3. OpenRouter :free, nvidia/nemotron-3-super-120b-a12b  — free, 120B, 262k ctx
 *   4. OpenRouter :free, google/gemma-4-31b-it               — free, 31B,  262k ctx
 *   5. OpenRouter :free, qwen/qwen3.8-27b                    — free, 27B,  262k ctx
 *
 * The 3 OpenRouter models are deliberately different underlying providers
 * (NVIDIA, Google, Alibaba) — OpenRouter's free-tier rate limits are
 * per-model, so if one vendor's free pool is exhausted the next still has
 * its own separate pool. All three were confirmed live on
 * https://openrouter.ai/api/v1/models on 2026-09-28, not guessed ids.
 *
 * Why: three paid providers in a row (Anthropic credit, then Gemini's spend
 * cap, then DeepSeek's prepay balance) have each run dry within days of each
 * other, silently stopping the article pipeline until a human noticed and
 * swapped the shim import by hand. This wrapper removes the "swap the
 * import" step for a single outage; keeping paid providers funded is still
 * a human's job, but a genuinely free tier now sits at the end of the chain
 * as a last resort that (short of OpenRouter itself being down) shouldn't
 * run out of "balance" the same way.
 *
 * Required env: DEEPSEEK_API_KEY, GEMINI_API_KEY, OPENROUTER_API_KEY
 * (a provider whose key is missing just throws immediately and the chain
 * moves on to the next one).
 */

import DeepSeekClient from "./anthropic-compat-deepseek.mjs";
import GeminiClient from "./anthropic-compat-gemini.mjs";
import OpenRouterClient from "./anthropic-compat-openrouter.mjs";

function buildProviders(options) {
  return [
    { name: "DeepSeek", client: new DeepSeekClient(options) },
    { name: "Gemini", client: new GeminiClient(options) },
    {
      name: "OpenRouter/nemotron",
      client: new OpenRouterClient({ ...options, model: "nvidia/nemotron-3-super-120b-a12b:free" }),
    },
    {
      name: "OpenRouter/gemma",
      client: new OpenRouterClient({ ...options, model: "google/gemma-4-31b-it:free" }),
    },
    {
      name: "OpenRouter/qwen",
      client: new OpenRouterClient({ ...options, model: "qwen/qwen3.8-27b:free" }),
    },
  ];
}

export default class Anthropic {
  constructor(options = {}) {
    this._providers = buildProviders(options);
    this.messages = { create: (params) => this._create(params) };
  }

  async _create(params = {}) {
    const errors = [];
    for (const { name, client } of this._providers) {
      try {
        const res = await client.messages.create(params);
        if (errors.length) {
          console.error(`[fallback] ${name} is gelukt na ${errors.length} mislukte provider(s).`);
        }
        return res;
      } catch (err) {
        console.error(`[fallback] ${name} mislukt: ${err.message}`);
        errors.push(`${name}: ${err.message}`);
      }
    }
    throw new Error(`Alle providers mislukten.\n${errors.join("\n")}`);
  }
}

export { Anthropic };
