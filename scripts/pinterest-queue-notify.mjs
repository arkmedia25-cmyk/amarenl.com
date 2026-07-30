#!/usr/bin/env node
/**
 * Pinterest Queue Notifier — Faz 4
 * Picks the next "queued" pin from content/pinterest-queue.json, sends it to
 * Telegram for approval (sendPhoto + inline Approve/Reject buttons), and marks
 * it "pending". Actual pin creation happens in app/api/telegram/webhook on approval.
 */

import { readFileSync, writeFileSync } from "node:fs";

const QUEUE_PATH = new URL("../content/pinterest-queue.json", import.meta.url);

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
    console.log("📌 Pinterest kuyruğu boş — gönderilecek yeni pin yok.");
    if (process.env.GITHUB_OUTPUT) {
      writeFileSync(process.env.GITHUB_OUTPUT, "changed=false\n", { flag: "a" });
    }
    return;
  }

  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;
  const caption = `📌 Yeni Pinterest pin taslağı\n\n${next.title}\n\n${next.description}\n\n🔗 ${next.link}\n📋 Board: ${next.boardCategory}`;

  await telegramApi("sendPhoto", {
    chat_id: chatId,
    ...(threadId ? { message_thread_id: Number(threadId) } : {}),
    photo: next.image,
    caption: caption.slice(0, 1024),
    reply_markup: {
      inline_keyboard: [
        [
          { text: "✅ Onayla ve Pinle", callback_data: `pin_approve:${next.id}` },
          { text: "❌ Reddet", callback_data: `pin_reject:${next.id}` },
        ],
      ],
    },
  });

  next.status = "pending";
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n");

  console.log(`✅ Pin gönderildi: ${next.id} — "${next.title}"`);
  if (process.env.GITHUB_OUTPUT) {
    writeFileSync(process.env.GITHUB_OUTPUT, "changed=true\n", { flag: "a" });
  }
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
