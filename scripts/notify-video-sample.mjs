#!/usr/bin/env node
// Tek seferlik/manuel video-örnek bildirimi — Higgsfield deneme klipleri gibi
// yerel makinede üretilen ama Telegram'a Bot API ile GÖNDERİLMESİ gereken
// (token'ı yerel sandbox'tan kullanamadığımız) içerikler için.
// Kullanım: VIDEO_URL=... CAPTION=... node scripts/notify-video-sample.mjs

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TELEGRAM_THREAD_ID, VIDEO_URL, CAPTION } = process.env;

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || !VIDEO_URL) {
  console.error("HATA: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, VIDEO_URL gerekli.");
  process.exit(1);
}

const body = {
  chat_id: TELEGRAM_CHAT_ID,
  video: VIDEO_URL,
  caption: CAPTION || "",
  ...(TELEGRAM_THREAD_ID ? { message_thread_id: Number(TELEGRAM_THREAD_ID) } : {}),
};

const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendVideo`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
const json = await res.json();
console.log(JSON.stringify(json));
if (!json.ok) process.exit(1);
