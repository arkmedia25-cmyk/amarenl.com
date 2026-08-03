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

  // Delete the draft branch too — otherwise a future run that picks the same
  // topic again (the generator has no memory of rejected-but-unmerged PRs)
  // fails at `git push` because the old branch name still exists on origin.
  const pr = (await res.json()) as { head?: { ref?: string } };
  const branch = pr.head?.ref;
  if (branch) {
    const delRes = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${encodeURIComponent(branch)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      }
    );
    // 422/404 just means it's already gone — not worth failing the whole callback over.
    if (!delRes.ok && delRes.status !== 422 && delRes.status !== 404) {
      console.error(`[telegram-webhook] branch delete failed for ${branch}: ${delRes.status} ${await delRes.text()}`);
    }
  }
}

interface PinQueueItem {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  boardCategory: string;
  status: string;
}

const PIN_QUEUE_PATH = "content/pinterest-queue.json";

async function getPinQueueFile(): Promise<{ items: PinQueueItem[]; sha: string }> {
  const token = process.env.GH_DISPATCH_TOKEN;
  if (!token) throw new Error("GH_DISPATCH_TOKEN not configured");
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${PIN_QUEUE_PATH}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`GitHub fetch pin queue failed: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { content: string; sha: string };
  const items = JSON.parse(Buffer.from(data.content, "base64").toString("utf-8")) as PinQueueItem[];
  return { items, sha: data.sha };
}

async function updatePinQueueFile(items: PinQueueItem[], sha: string, message: string) {
  const token = process.env.GH_DISPATCH_TOKEN;
  if (!token) throw new Error("GH_DISPATCH_TOKEN not configured");
  const content = Buffer.from(JSON.stringify(items, null, 2) + "\n", "utf-8").toString("base64");
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${PIN_QUEUE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        message,
        content,
        sha,
        committer: { name: "AmareNL Pinterest Bot", email: "actions@github.com" },
      }),
    }
  );
  if (!res.ok) throw new Error(`GitHub update pin queue failed: ${res.status} ${await res.text()}`);
}

async function resolvePinterestBoardId(accessToken: string, categoryName: string): Promise<string> {
  const res = await fetch("https://api.pinterest.com/v5/boards?page_size=100", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = (await res.json()) as { items?: { id: string; name: string }[] };
  if (!data.items?.length) throw new Error("Pinterest hesabında hiç board bulunamadı.");
  const match = data.items.find((b) => b.name.toLowerCase() === categoryName.toLowerCase());
  return (match ?? data.items[0]).id;
}

async function createPinterestPin(accessToken: string, boardId: string, pin: PinQueueItem) {
  const res = await fetch("https://api.pinterest.com/v5/pins", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: pin.title,
      description: pin.description,
      link: pin.link,
      media_source: { source_type: "image_url", url: pin.image },
      board_id: boardId,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Pinterest pin oluşturma başarısız: ${JSON.stringify(data)}`);
  return data as { id: string };
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

  const [action, id] = cq.data.split(":");

  if (action === "pin_approve" || action === "pin_reject") {
    try {
      const { items, sha } = await getPinQueueFile();
      const pin = items.find((p) => p.id === id);

      if (!pin) {
        await telegramApi("answerCallbackQuery", {
          callback_query_id: cq.id,
          text: "⚠️ Pin bulunamadı (kuyrukta yok).",
          show_alert: true,
        });
        return NextResponse.json({ ok: false }, { status: 404 });
      }

      if (action === "pin_reject") {
        pin.status = "rejected";
        await updatePinQueueFile(items, sha, `pin: reddedildi — ${pin.id}`);
        await telegramApi("answerCallbackQuery", {
          callback_query_id: cq.id,
          text: `❌ ${pin.id} reddedildi.`,
        });
        await telegramApi("editMessageReplyMarkup", {
          chat_id: cq.message.chat.id,
          message_id: cq.message.message_id,
          reply_markup: { inline_keyboard: [[{ text: "❌ Reddedildi", callback_data: "noop" }]] },
        });
        return NextResponse.json({ ok: true });
      }

      // pin_approve
      const accessToken = process.env.PINTEREST_ACCESS_TOKEN;
      if (!accessToken) {
        await telegramApi("answerCallbackQuery", {
          callback_query_id: cq.id,
          text: "⚠️ Pinterest henüz bağlı değil (Standard erişim onayı bekleniyor).",
          show_alert: true,
        });
        return NextResponse.json({ ok: false, error: "PINTEREST_ACCESS_TOKEN not configured" }, { status: 500 });
      }

      const boardId = await resolvePinterestBoardId(accessToken, pin.boardCategory);
      const created = await createPinterestPin(accessToken, boardId, pin);

      pin.status = "posted";
      await updatePinQueueFile(items, sha, `pin: yayınlandı — ${pin.id}`);

      await telegramApi("answerCallbackQuery", {
        callback_query_id: cq.id,
        text: `✅ ${pin.id} Pinterest'e gönderildi!`,
      });
      await telegramApi("editMessageReplyMarkup", {
        chat_id: cq.message.chat.id,
        message_id: cq.message.message_id,
        reply_markup: {
          inline_keyboard: [[{ text: "✅ Pinlendi", url: `https://pinterest.com/pin/${created.id}/` }]],
        },
      });
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[telegram-webhook][pinterest]", err);
      await telegramApi("answerCallbackQuery", {
        callback_query_id: cq.id,
        text: "⚠️ Bir hata oluştu, tekrar dene.",
        show_alert: true,
      }).catch(() => {});
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }

  const prNumber = Number(id);
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
