/**
 * Telegram mesaj gönderici (polling YOK, sadece sendMessage HTTP API).
 * Çakışma olmaz — diğer bot'larla birlikte çalışır.
 */

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const ADMIN_IDS = (process.env.TELEGRAM_ADMIN_CHAT_IDS || "").split(",").filter(Boolean);

export async function notify(message: string): Promise<void> {
  if (!TOKEN || ADMIN_IDS.length === 0) return;
  for (const chatId of ADMIN_IDS) {
    try {
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
      });
    } catch {}
  }
}
