/**
 * Anthropic-SDK-compatible client with automatic provider fallback.
 *
 * Drop-in replacement for `@anthropic-ai/sdk`, same interface as the two
 * shims it wraps:
 *
 *     import Anthropic from "./anthropic-compat-fallback.mjs";
 *     const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 *     const res = await client.messages.create({ model, max_tokens, system, messages });
 *
 * Tries DeepSeek first (cheaper per output token — see anthropic-compat-deepseek.mjs).
 * If that call throws for ANY reason (insufficient balance, rate limit, network
 * error, ...), the same request is retried once against Gemini before giving up.
 *
 * Why: three providers in a row (Anthropic credit, then Gemini's spend cap, then
 * DeepSeek's prepay balance) have each run dry within days of each other, silently
 * stopping the article pipeline until a human noticed and swapped the import by
 * hand. This wrapper removes the "swap the import" step — topping up whichever
 * provider is actually empty is still a human's job, but the pipeline itself
 * self-heals for a single outage instead of going fully dark.
 *
 * Required env: DEEPSEEK_API_KEY (primary), GEMINI_API_KEY (fallback)
 */

import DeepSeekClient from "./anthropic-compat-deepseek.mjs";
import GeminiClient from "./anthropic-compat-gemini.mjs";

export default class Anthropic {
  constructor(options = {}) {
    this._deepseek = new DeepSeekClient(options);
    this._gemini = new GeminiClient(options);
    this.messages = { create: (params) => this._create(params) };
  }

  async _create(params = {}) {
    try {
      const res = await this._deepseek.messages.create(params);
      return res;
    } catch (primaryErr) {
      console.error(
        `[fallback] DeepSeek mislukt (${primaryErr.message}) — Gemini wordt geprobeerd...`
      );
      try {
        const res = await this._gemini.messages.create(params);
        console.error("[fallback] Gemini is gelukt.");
        return res;
      } catch (fallbackErr) {
        throw new Error(
          `Beide providers mislukten. DeepSeek: ${primaryErr.message} | Gemini: ${fallbackErr.message}`
        );
      }
    }
  }
}

export { Anthropic };
