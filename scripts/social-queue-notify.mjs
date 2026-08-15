#!/usr/bin/env node
/**
 * Sosyal medya (Instagram) kuyruğu bildirici — Faz 6.
 * content/social-queue.json'daki bir sonraki "queued" öğeyi Telegram'a
 * gönderir (sendPhoto + Onayla/Reddet butonları), "pending" olarak işaretler.
 * Gerçek Instagram paylaşımı app/api/telegram/webhook'ta onay üzerine olur
 * (pinterest-queue-notify.mjs ile aynı desen).
 */

import { readFileSync, writeFileSync } from "node:fs";

const QUEUE_PATH = new URL("../content/social-queue.json", import.meta.url);

async function telegramApi(method, body) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN not configured");
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
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
  const next = queue.find((p) => p.status === "queued");

  if (!next) {
    console.log("📱 Sosyal medya kuyruğu boş — gönderilecek yeni içerik yok.");
    return;
  }

  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;
  const caption = `📱 Yeni Instagram gönderi taslağı\n\n${next.caption}\n\n🔗 CTA linki: ${next.link}`;

  await telegramApi("sendPhoto", {
    chat_id: chatId,
    ...(threadId ? { message_thread_id: Number(threadId) } : {}),
    photo: next.image,
    caption: caption.slice(0, 1024),
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Onayla ve Yayınla", callback_data: `ig_approve:${next.id}` },
          { text: "❌ Reddet", callback_data: `ig_reject:${next.id}` },
        ],
      ],
    },
  });

  next.status = "pending";
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n");
  console.log(`✅ Instagram taslağı gönderildi: ${next.id}`);
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
