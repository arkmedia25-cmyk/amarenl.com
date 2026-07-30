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

/**
 * QA gate — catches the exact failure modes we hit in practice (broken image
 * files, missing fields, links pointing off-site) before a pin ever reaches
 * Telegram for approval.
 */
async function validatePin(pin) {
  const problems = [];

  for (const field of ["title", "description", "link", "image", "boardCategory"]) {
    if (!pin[field] || typeof pin[field] !== "string" || !pin[field].trim()) {
      problems.push(`alan boş: ${field}`);
    }
  }

  if (pin.link && !pin.link.startsWith("https://amarenl.com")) {
    problems.push(`link amarenl.com dışına gidiyor: ${pin.link}`);
  }

  if (pin.image) {
    try {
      const res = await fetch(pin.image, { method: "HEAD" });
      const contentType = res.headers.get("content-type") || "";
      const contentLength = Number(res.headers.get("content-length") || "0");
      if (!res.ok) {
        problems.push(`görsel erişilemiyor (HTTP ${res.status}): ${pin.image}`);
      } else if (!contentType.startsWith("image/")) {
        problems.push(`görsel URL'i bir resim döndürmüyor (${contentType || "bilinmiyor"})`);
      } else if (contentLength > 0 && contentLength < 1000) {
        problems.push(`görsel dosyası şüpheli derecede küçük (${contentLength} byte)`);
      }
    } catch (err) {
      problems.push(`görsel kontrolü başarısız: ${err.message}`);
    }
  }

  return problems;
}

async function alertBrokenPin(pin, problems) {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;
  const text = `⚠️ Pin kuyrukta sorunlu bulundu ve ATLANDI: ${pin.id}\n\n"${pin.title}"\n\nSorunlar:\n${problems.map((p) => `• ${p}`).join("\n")}\n\nBu pin Telegram'a gönderilmedi. content/pinterest-queue.json içinde "flagged" olarak işaretlendi — manuel düzeltme gerekiyor.`;
  await telegramApi("sendMessage", {
    chat_id: chatId,
    ...(threadId ? { message_thread_id: Number(threadId) } : {}),
    text,
  });
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

  const problems = await validatePin(next);
  if (problems.length > 0) {
    console.error(`❌ Pin QA başarısız: ${next.id}\n${problems.join("\n")}`);
    next.status = "flagged";
    writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n");
    await alertBrokenPin(next, problems);
    if (process.env.GITHUB_OUTPUT) {
      writeFileSync(process.env.GITHUB_OUTPUT, "changed=true\n", { flag: "a" });
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
