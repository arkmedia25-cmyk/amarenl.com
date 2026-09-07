#!/usr/bin/env node
// Manuel üretilen video örneklerini (Higgsfield + yerel ffmpeg son işleme)
// Telegram'a Onayla/Reddet butonlarıyla gönderir — content/video-queue.json'a
// bir kayıt ekler, app/api/telegram/webhook/route.ts'teki video_approve
// callback'i onaylanınca gerçek Instagram Reels yayınlar (video_reject sadece
// durumu işaretler). Görsellerin social-queue.json + ig_approve akışıyla aynı
// desen.
// Kullanım: TOPIC=... VIDEO_URL=... CAPTION=... [LINK=...] node scripts/notify-video-sample.mjs

import { readFileSync, writeFileSync } from "node:fs";

const QUEUE_PATH = new URL("../content/video-queue.json", import.meta.url);
const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TELEGRAM_THREAD_ID, TOPIC, VIDEO_URL, CAPTION, LINK } = process.env;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || !TOPIC || !VIDEO_URL) {
  console.error("HATA: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TOPIC, VIDEO_URL gerekli.");
  process.exit(1);
}

async function telegramApi(method, body) {
  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`Telegram ${method} failed: ${JSON.stringify(data)}`);
  return data;
}

async function main() {
  const queue = JSON.parse(readFileSync(QUEUE_PATH, "utf-8"));
  const id = `${TOPIC}-${Date.now()}`;
  const link = LINK || "https://amarenl.com/gratis-gut-brain-gids";

  await telegramApi("sendVideo", {
    chat_id: TELEGRAM_CHAT_ID,
    ...(TELEGRAM_THREAD_ID ? { message_thread_id: Number(TELEGRAM_THREAD_ID) } : {}),
    video: VIDEO_URL,
    caption: (CAPTION || "").slice(0, 1024),
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Onayla ve Yayınla", callback_data: `video_approve:${id}` },
          { text: "❌ Reddet", callback_data: `video_reject:${id}` },
        ],
      ],
    },
  });

  queue.push({ id, topic: TOPIC, caption: CAPTION || "", video: VIDEO_URL, link, status: "pending" });
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n");
  console.log(`✅ Video örneği gönderildi: ${id}`);
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
