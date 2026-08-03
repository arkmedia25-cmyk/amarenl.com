#!/usr/bin/env node
// YouTube content-research snapshot voor amarenl.com.
//
// Doel: signaal verzamelen over wat er al leeft op YouTube rond onze
// supplement/gezondheid-categorieën — video's + een handvol topcomments per
// video (echte kijkersvragen/opmerkingen). Dit is GEEN bron voor claims en
// wordt NOOIT letterlijk overgenomen — puur thema-inspiratie voor de Faz 2
// content-motor (generate-article-claude.mjs), zelfde aanpak als de
// concurrentie-scraper.
//
// Gebruikt de officiële, publieke YouTube Data API v3 (geen scraping).
// Vereist env: YOUTUBE_API_KEY
//
// Output: snapshot/videos.csv, snapshot/comments.csv

import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.YOUTUBE_API_KEY;
if (!API_KEY) {
  console.error("ERROR: YOUTUBE_API_KEY not set");
  process.exit(1);
}

const BASE = "https://www.googleapis.com/youtube/v3";
const COMMENTS_PER_VIDEO = 3;
const VIDEOS_PER_QUERY = 5;

// Twee zoektermen per productcategorie (zelfde taxonomie als CATEGORIES in
// generate-article-claude.mjs), gebaseerd op echte onderwerpen uit
// content/article-queue.md. Handmatig te breiden. Elke entry heeft ook een
// Engelstalige variant — de NL-markt is klein op YouTube, dus als een
// Nederlandse zoekterm te weinig resultaten oplevert vallen we terug op de
// Engelstalige versie (het is toch alleen thema-signaal, geen tekstbron —
// Claude schrijft het artikel altijd zelf in het Nederlands, zelfde principe
// als de Engelstalige PubMed-abstracts hierboven).
const MIN_RESULTS_BEFORE_FALLBACK = 3;
const QUERIES = [
  { category: "darmen", query: "darmflora herstellen", queryEn: "how to heal your gut microbiome" },
  { category: "darmen", query: "probiotica voordelen", queryEn: "probiotics benefits explained" },
  { category: "mentaal", query: "stress verminderen supplementen", queryEn: "natural supplements for stress relief" },
  { category: "mentaal", query: "beter slapen zonder melatonine", queryEn: "how to sleep better without melatonin" },
  { category: "schoonheid", query: "collageen supplementen werkt het", queryEn: "do collagen supplements actually work" },
  { category: "schoonheid", query: "huid van binnenuit voeding", queryEn: "nutrition for skin health from within" },
  { category: "essentials", query: "magnesium voordelen slaap", queryEn: "magnesium benefits for sleep" },
  { category: "essentials", query: "vitamine d tekort symptomen", queryEn: "vitamin d deficiency symptoms" },
  { category: "energie", query: "energie supplementen natuurlijk", queryEn: "natural energy supplements without crash" },
  { category: "energie", query: "vermoeidheid oorzaken voeding", queryEn: "chronic fatigue causes nutrition" },
  { category: "gewichtsbeheer", query: "afvallen supplementen natuurlijk", queryEn: "natural weight loss supplements that work" },
  { category: "gewichtsbeheer", query: "stofwisseling versnellen natuurlijk", queryEn: "how to boost metabolism naturally" },
];

function csvEscape(field) {
  const s = field == null ? "" : String(field);
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

async function getJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const json = await res.json();
  if (json.error) throw new Error(`YouTube API error: ${json.error.message}`);
  return json;
}

async function searchVideos(query, { regionCode, relevanceLanguage }) {
  const url =
    `${BASE}/search?part=snippet&type=video&order=relevance&regionCode=${regionCode}&relevanceLanguage=${relevanceLanguage}` +
    `&maxResults=${VIDEOS_PER_QUERY}&q=${encodeURIComponent(query)}&key=${API_KEY}`;
  const json = await getJson(url);
  return (json.items || []).map((it) => ({
    videoId: it.id.videoId,
    title: it.snippet.title,
    description: (it.snippet.description || "").slice(0, 300),
    channelTitle: it.snippet.channelTitle,
    publishedAt: it.snippet.publishedAt,
  }));
}

async function fetchViewCounts(videoIds) {
  if (!videoIds.length) return {};
  const url = `${BASE}/videos?part=statistics&id=${videoIds.join(",")}&key=${API_KEY}`;
  const json = await getJson(url);
  const out = {};
  for (const item of json.items || []) {
    out[item.id] = item.statistics?.viewCount || "";
  }
  return out;
}

async function fetchTopComments(videoId) {
  try {
    const url =
      `${BASE}/commentThreads?part=snippet&order=relevance&textFormat=plainText` +
      `&maxResults=${COMMENTS_PER_VIDEO}&videoId=${videoId}&key=${API_KEY}`;
    const json = await getJson(url);
    return (json.items || []).map((it) => {
      const c = it.snippet.topLevelComment.snippet;
      return { author: c.authorDisplayName, text: c.textDisplay.replace(/\s+/g, " ").trim() };
    });
  } catch (err) {
    // Comments uitgeschakeld op sommige video's -> gewoon overslaan.
    console.warn(`  (comments overgeslagen voor ${videoId}: ${err.message})`);
    return [];
  }
}

async function main() {
  const videoRows = [["query", "videoId", "title", "description", "channelTitle", "viewCount", "publishedAt"]];
  const commentRows = [["query", "videoId", "author", "comment"]];

  for (const { category, query, queryEn } of QUERIES) {
    console.log(`Zoeken: "${query}" (${category})`);
    let videos = [];
    let usedQuery = query;
    try {
      videos = await searchVideos(query, { regionCode: "NL", relevanceLanguage: "nl" });
    } catch (err) {
      console.warn(`  mislukt: ${err.message}`);
    }

    if (videos.length < MIN_RESULTS_BEFORE_FALLBACK && queryEn) {
      console.log(`  slechts ${videos.length} NL-resultaten, val terug op EN: "${queryEn}"`);
      try {
        const enVideos = await searchVideos(queryEn, { regionCode: "US", relevanceLanguage: "en" });
        // Nooit dubbele video's tussen NL- en EN-resultaten.
        const seen = new Set(videos.map((v) => v.videoId));
        videos = videos.concat(enVideos.filter((v) => !seen.has(v.videoId)));
        usedQuery = `${query} (+EN fallback: ${queryEn})`;
      } catch (err) {
        console.warn(`  EN-fallback mislukt: ${err.message}`);
      }
    }

    if (!videos.length) continue;
    const queryLabel = usedQuery;

    const viewCounts = await fetchViewCounts(videos.map((v) => v.videoId));

    for (const v of videos) {
      videoRows.push([
        queryLabel,
        v.videoId,
        v.title,
        v.description,
        v.channelTitle,
        viewCounts[v.videoId] || "",
        v.publishedAt,
      ]);

      const comments = await fetchTopComments(v.videoId);
      for (const c of comments) {
        commentRows.push([queryLabel, v.videoId, c.author, c.text]);
      }
    }
  }

  const outDir = join(__dirname, "snapshot");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(
    join(outDir, "videos.csv"),
    videoRows.map((r) => r.map(csvEscape).join(",")).join("\n") + "\n",
    "utf-8"
  );
  writeFileSync(
    join(outDir, "comments.csv"),
    commentRows.map((r) => r.map(csvEscape).join(",")).join("\n") + "\n",
    "utf-8"
  );

  console.log(`\nKlaar: ${videoRows.length - 1} video's, ${commentRows.length - 1} comments -> tools/youtube-research/snapshot/`);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
