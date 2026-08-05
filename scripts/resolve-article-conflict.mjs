#!/usr/bin/env node
/**
 * Auto-resolves the one recurring, known-safe merge-conflict pattern hit by
 * stale draft/* branches: both HEAD (the draft branch) and MERGE_HEAD (main)
 * append new article objects to the same data/extra-articles.json array.
 * Keeps every article from `theirs` (main) untouched and appends any article
 * from `ours` (the draft branch) whose slug isn't already present.
 *
 * public/sitemap.xml is NOT resolved here — always take main's version and
 * let it regenerate on the next `next-sitemap` run (see CLAUDE.md: never
 * hand-edit sitemap.xml).
 *
 * Exits non-zero if data/extra-articles.json isn't actually conflicted, so
 * callers can tell "resolved" apart from "nothing to resolve".
 */
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

function show(ref) {
  const out = execSync(`git show ${ref}:data/extra-articles.json`, {
    encoding: "utf-8",
    maxBuffer: 50 * 1024 * 1024,
  });
  return JSON.parse(out);
}

const ours = show("HEAD");
const theirs = show("MERGE_HEAD");
const theirsSlugs = new Set(theirs.map((a) => a.slug));
const merged = [...theirs];
const added = [];
for (const a of ours) {
  if (!theirsSlugs.has(a.slug)) {
    merged.push(a);
    added.push(a.slug);
  }
}

writeFileSync("data/extra-articles.json", JSON.stringify(merged, null, 2) + "\n");
console.log(`Resolved data/extra-articles.json: added [${added.join(", ")}], total ${merged.length}`);
