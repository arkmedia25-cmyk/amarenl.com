#!/usr/bin/env node
/**
 * Sosyal medya (Instagram) günlük içerik üreticisi — Faz 6.
 *
 * Blog üretiminden (Mon/Wed/Fri, tam makale) BAĞIMSIZ, paralel çalışır.
 *
 * STRATEJİ (10-08-2026'da netleşti): marka/ürün adı YOK. Amaç satış değil,
 * lead generation — sorunu (acıyı) belirt, mekanizmayı/nedeni anlat, ücretsiz
 * gut-brain gidine yönlendirerek isim+e-posta topla. Faz 5 Meta Ads'teki
 * "leadgen-gutbrain" / "leadgen-yorgunluk" video script'leriyle AYNI onaylı
 * hook+mekanizma metni ve AYNI marka-nötr görseller (yüz görünmüyor, ürün yok)
 * kullanılıyor — tutarlılık için, sıfırdan icat etmiyoruz.
 *
 * NEDEN Higgsfield DEĞİL: kredi neredeyse sıfır (paylaşımlı havuz, bugün 403
 * hatası da verdi). İlk 3 konu (gutbrain, yorgunluk x2) ÜRETİLMİŞ videolardan
 * (leadgen-gutbrain, leadgen-yorgunluk) çıkarılmış duruk kareler kullanıyor.
 * 15-08-2026'da Kie.ai bağlandı (bkz. .env.local KIE_API_KEY, ayrı hesap,
 * Higgsfield'den bağımsız kredi havuzu) — stres/tükenmişlik/slaap konuları
 * için marka-nötr görseller (agentic-os/scripts/gen-image.ts, model
 * nano-banana-2, aspect 4:5) bu kredilerle üretildi, TOPICS'e eklendi.
 * Yeni konu eklemek istersen aynı yöntemi kullan: yüz yok, ürün/marka yok,
 * sıcak/mor tonlu cinematic lifestyle foto, 4:5 aspect.
 *
 * NEDEN aynı yasaklı-iddia kontrolü var: bugün (10-08) makale üretiminde
 * "voorkomt" kelimesine takılıp sessizce 3 kez başarısız olan script aynı
 * projede — aynı NVWA/EFSA kısıtlamaları burada da geçerli.
 */

import { readFileSync, writeFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";

const QUEUE_PATH = new URL("../content/social-queue.json", import.meta.url);
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
const MAX_ATTEMPTS = 3;
const FORBIDDEN_CLAIMS = ["geneest", "behandelt", "klinisch bewezen", "voorkomt", "garantie op", "wondermiddel"];
const LEAD_MAGNET_URL = "https://amarenl.com/gratis-gut-brain-gids";

// Sadece GERÇEKTEN VAR OLAN, marka-nötr görsellerle eşleşen konular.
// Her biri, o günkü Meta Ads video script'inin (bkz.
// scripts/generate-leadgen-*-video.sh) onaylı hook+mekanizma metnine dayanır.
const TOPICS = [
  {
    key: "gutbrain",
    hookFact: "De gut-brain axis: darmen en hersenen communiceren continu met elkaar, en de meeste mensen weten niet hoe groot de invloed daarvan is op hun energie, stemming en focus.",
    image: "content/social-assets/gutbrain-pain.jpg",
  },
  {
    key: "yorgunluk-pain",
    hookFact: "Constant moe, ook na een volle nachtrust — koffie helpt niet meer. Energie ontstaat op celniveau, en als dat proces vastloopt, helpt geen enkele hoeveelheid cafeïne.",
    image: "content/social-assets/yorgunluk-pain.jpg",
  },
  {
    key: "yorgunluk-mechanism",
    hookFact: "Waarom voel je je leeg, ook als je 'genoeg' slaapt? Het antwoord zit vaak niet in hoevéél je slaapt, maar in wat er op celniveau gebeurt terwijl je slaapt.",
    image: "content/social-assets/yorgunluk-mechanism.jpg",
  },
  {
    key: "stress",
    hookFact: "Aanhoudende stress houdt je lichaam continu in de 'aan'-stand. Dat kost energie die je niet terugkrijgt door alleen maar door te werken — herstel gebeurt niet vanzelf tussen twee taken door.",
    image: "content/social-assets/social-stress.jpg",
  },
  {
    key: "burnout",
    hookFact: "Opgebrand voelen komt zelden van één drukke week. Het bouwt zich sluipend op — je merkt het pas als je lichaam je dwingt te stoppen, terwijl de signalen er allang waren.",
    image: "content/social-assets/social-burnout.jpg",
  },
  {
    key: "slaap",
    hookFact: "Wakker liggen om 3 uur 's nachts, terwijl je lichaam doodmoe is? Dat is geen wilskwestie — het zegt iets over hoe je systeem omgaat met herstel, niet over hoeveel uur je in bed ligt.",
    image: "content/social-assets/social-slaap.jpg",
  },
];

function nextTopicIndex(queue) {
  return queue.length % TOPICS.length;
}

function buildPrompt(hookFact) {
  return `Je schrijft een korte Instagram-caption in het Nederlands voor een wellness-account.

Achtergrondfeit om te verwerken: ${hookFact}

DOEL: dit is GEEN productpromotie. Het doel is leads verzamelen (naam + e-mail)
voor een gratis gids — dus NOOIT een merk- of productnaam noemen, NOOIT direct
verkopen. Structuur (PAS = Problem-Agitate-Solve, bewezen format):
- Regel 1: een herkenbare pijn/vraag — "Constant moe, gespannen, of...?" stijl, 1 emoji
- Regel 2-3: het achtergrondfeit hierboven, in eigen woorden, kort en concreet
- Laatste regel: zachte CTA naar de gratis gids — bijv. "Ontdek de echte oorzaak — link in bio 🎁" — NOOIT een merknaam, NOOIT "koop nu"

VERBODEN (EFSA/NVWA — deze woorden NERGENS, in geen vervoeging):
geneest, behandelt, klinisch bewezen, voorkomt, garantie op, wondermiddel

Output ALLEEN dit JSON object (geen markdown, geen backticks):
{"caption": "de volledige caption tekst inclusief 3-5 relevante hashtags onderaan, GEEN merknaam in hashtags"}`;
}

async function generateCaption(client, hookFact) {
  let previousError = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const prompt = buildPrompt(hookFact) + (previousError ? `\n\n=== VORIGE POGING MISLUKTE — CORRIGEER DIT ===\n${previousError}` : "");
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });
    const raw = response.content?.find((b) => b.type === "text")?.text || "";
    let parsed;
    try {
      parsed = JSON.parse(raw.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, ""));
    } catch (err) {
      previousError = `JSON parse mislukt: ${err.message}. Output moet PUUR JSON zijn.`;
      continue;
    }
    const lower = (parsed.caption || "").toLowerCase();
    const found = FORBIDDEN_CLAIMS.find((c) => lower.includes(c));
    if (found) {
      previousError = `Verboden woord gevonden: "${found}". Dit woord (en elke vervoeging) mag NERGENS voorkomen — herschrijf het hele concept met toegestane taal (ondersteunt, draagt bij aan, kan helpen bij).`;
      continue;
    }
    if (lower.includes("amare") || lower.includes("holistiglow")) {
      previousError = "Merknaam gevonden in caption — dit MAG NIET, dit is puur lead-gen content zonder merkvermelding.";
      continue;
    }
    if (!parsed.caption || parsed.caption.length < 20) {
      previousError = "Caption te kort of leeg.";
      continue;
    }
    return parsed.caption;
  }
  throw new Error(`${MAX_ATTEMPTS} pogingen mislukt`);
}

async function main() {
  const queue = JSON.parse(readFileSync(QUEUE_PATH, "utf-8"));
  const idx = nextTopicIndex(queue);
  const { key, hookFact, image } = TOPICS[idx];

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  console.log(`[social] Konu: ${key}`);
  const caption = await generateCaption(client, hookFact);

  const id = `social-${Date.now()}`;
  queue.push({
    id,
    topic: key,
    caption,
    image: `https://raw.githubusercontent.com/arkmedia25-cmyk/amarenl.com/main/${image}`,
    link: LEAD_MAGNET_URL,
    status: "queued",
    created_at: new Date().toISOString(),
  });
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n");
  console.log(`[social] Kuyruğa eklendi: ${id}`);
}

main().catch((err) => {
  console.error("HATA:", err.message);
  process.exit(1);
});
