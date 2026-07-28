import { NextRequest, NextResponse } from "next/server";

const REPO_OWNER = "arkmedia25-cmyk";
const REPO_NAME = "amarenl.com";

interface TelegramCallbackQuery {
  id: string;
  data?: string;
  message?: {
    message_id: number;
    chat: { id: number };
  };
}

interface TelegramUpdate {
  callback_query?: TelegramCallbackQuery;
}

async function telegramApi(method: string, body: Record<string, unknown>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("TELEGRAM_BOT_TOKEN not configured");
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function githubDispatch(prNumber: number) {
  const token = process.env.GH_DISPATCH_TOKEN;
  if (!token) throw new Error("GH_DISPATCH_TOKEN not configured");
  const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      event_type: "promote-draft",
      client_payload: { pr_number: prNumber },
    }),
  });
  if (!res.ok) {
    throw new Error(`GitHub dispatch failed: ${res.status} ${await res.text()}`);
  }
}

async function githubClosePr(prNumber: number) {
  const token = process.env.GH_DISPATCH_TOKEN;
  if (!token) throw new Error("GH_DISPATCH_TOKEN not configured");
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls/${prNumber}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ state: "closed" }),
    }
  );
  if (!res.ok) {
    throw new Error(`GitHub PR close failed: ${res.status} ${await res.text()}`);
  }
}

export async function POST(req: NextRequest) {
  // Optional extra verification layer: if TELEGRAM_WEBHOOK_SECRET is configured,
  // require the matching header (set via setWebhook's secret_token param).
  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (expectedSecret) {
    const got = req.headers.get("x-telegram-bot-api-secret-token");
    if (got !== expectedSecret) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  let update: TelegramUpdate;
  try {
    update = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const cq = update.callback_query;
  if (!cq || !cq.data || !cq.message) {
    // Not a callback we care about — acknowledge and ignore.
    return NextResponse.json({ ok: true });
  }

  const allowedChatId = process.env.TELEGRAM_CHAT_ID;
  if (allowedChatId && cq.message.chat.id.toString() !== allowedChatId) {
    await telegramApi("answerCallbackQuery", {
      callback_query_id: cq.id,
      text: "Yetkisiz sohbet.",
      show_alert: true,
    }).catch(() => {});
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const [action, prNumberStr] = cq.data.split(":");
  const prNumber = Number(prNumberStr);
  if (!["approve", "reject"].includes(action) || !Number.isFinite(prNumber)) {
    return NextResponse.json({ ok: false, error: "invalid callback_data" }, { status: 400 });
  }

  try {
    if (action === "approve") {
      await githubDispatch(prNumber);
      await telegramApi("answerCallbackQuery", {
        callback_query_id: cq.id,
        text: `✅ PR #${prNumber} onaylandı, yayınlanıyor...`,
      });
      await telegramApi("editMessageReplyMarkup", {
        chat_id: cq.message.chat.id,
        message_id: cq.message.message_id,
        reply_markup: { inline_keyboard: [[{ text: "✅ Onaylandı — yayınlanıyor", callback_data: "noop" }]] },
      });
    } else {
      await githubClosePr(prNumber);
      await telegramApi("answerCallbackQuery", {
        callback_query_id: cq.id,
        text: `❌ PR #${prNumber} reddedildi.`,
      });
      await telegramApi("editMessageReplyMarkup", {
        chat_id: cq.message.chat.id,
        message_id: cq.message.message_id,
        reply_markup: { inline_keyboard: [[{ text: "❌ Reddedildi", callback_data: "noop" }]] },
      });
    }
  } catch (err) {
    console.error("[telegram-webhook]", err);
    await telegramApi("answerCallbackQuery", {
      callback_query_id: cq.id,
      text: "⚠️ Bir hata oluştu, tekrar dene.",
      show_alert: true,
    }).catch(() => {});
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
