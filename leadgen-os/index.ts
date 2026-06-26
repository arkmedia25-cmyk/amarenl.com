/**
 * LeadGen OS — Ana Giriş
 * Cron + dosya-tabanlı manuel tetikleyiciler.
 * Telegram komutları YOK — kontrol Claude Code / JARVIS üzerinden.
 */

import cron from "node-cron";
import dotenv from "dotenv";
import { resolve } from "path";
import { existsSync, unlinkSync } from "fs";

dotenv.config({ path: resolve(process.cwd(), "../.env.local") });
dotenv.config({ path: resolve(process.cwd(), ".env") });

import { notify } from "./telegram.js";
import { runDiscovery, runScoring, runOutreach, runPipeline, runReport } from "./orchestrator.js";
import type { OrchestratorState } from "./orchestrator.js";

const state: OrchestratorState = {
  manualDiscoveryRequested: false,
  manualScoringRequested: false,
  manualOutreachTier: null,
  manualPipelineRequested: false,
  manualReportRequested: false,
  subscribers: [],
  pipelineActive: false,
};

// Dagelijks 09:00 A'dam = 07:00 UTC
cron.schedule("0 7 * * *", async () => {
  console.log("Pipeline check");
  await runPipeline(state);
});

// Di+Do 10:00 A'dam = 08:00 UTC
cron.schedule("0 8 * * 2,4", async () => {
  console.log("Outreach batch");
  await runOutreach(2, state);
});

// Zo 20:00 A'dam = 18:00 UTC
cron.schedule("0 18 * * 0", async () => {
  console.log("Weekrapport");
  await runReport(state);
});

// Dosya sinyalleriyle manuel tetikleme (JARVIS / Claude Code)
const SIGNALS: Record<string, () => Promise<void>> = {
  "/tmp/leadgen-discover": () => runDiscovery(state),
  "/tmp/leadgen-score":    () => runScoring(state),
  "/tmp/leadgen-outreach": () => runOutreach(2, state),
  "/tmp/leadgen-pipeline": () => runPipeline(state),
  "/tmp/leadgen-report":   () => runReport(state),
};

setInterval(async () => {
  for (const [path, action] of Object.entries(SIGNALS)) {
    if (existsSync(path)) {
      try { unlinkSync(path); } catch {}
      console.log("Signal: " + path);
      await action();
    }
  }
}, 10000);

process.once("SIGINT", () => process.exit(0));
process.once("SIGTERM", () => process.exit(0));

console.log("LeadGen OS v0.1.0 ready");
console.log("Tetik: touch /tmp/leadgen-{discover,score,outreach,pipeline,report}");
