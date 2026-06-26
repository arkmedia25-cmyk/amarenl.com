import { readFileSync } from "fs";
import { join } from "path";

const ROOT = process.env.PROJECT_ROOT || import.meta.dirname || "";
function rel(p: string) { return join(ROOT, p); }
function readJson(p: string): any {
  try { return JSON.parse(readFileSync(rel(p), "utf-8")); } catch { return []; }
}

export function getHealth(): object {
  return {
    status: "ok", name: "LeadGen OS", version: "0.1.0",
    uptime: process.uptime(),
    data: {
      rawLeads: (Array.isArray(readJson("data/leads-raw.json")) ? readJson("data/leads-raw.json").length : 0),
      scoredLeads: (Array.isArray(readJson("data/leads-scored.json")) ? readJson("data/leads-scored.json").length : 0),
      outreachSent: (Array.isArray(readJson("data/outreach-log.json")) ? readJson("data/outreach-log.json").length : 0),
    },
    agent: process.env.LLM_PROVIDER || "deepseek",
  };
}
