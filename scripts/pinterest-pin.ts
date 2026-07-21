#!/usr/bin/env bun
/**
 * Pinterest Pin Creator — API ile pin gönder.
 * Kullanım: bun run scripts/pinterest-pin.ts "Başlık" "Açıklama" "https://link" "https://resim.jpg" "board_id"
 *
 * Board ID olmazsa ilk board'a gönderir.
 */

const PINTEREST_API = "https://api.pinterest.com/v5";

async function getAccessToken(): Promise<string> {
  // Try env var first
  let token = process.env.PINTEREST_ACCESS_TOKEN;
  if (token) return token;

  // Load from .env.local
  const { readFileSync } = await import("node:fs");
  const envPath = new URL("../.env.local", import.meta.url).pathname;
  const env = readFileSync(envPath, "utf-8");
  for (const line of env.split("\n")) {
    if (line.startsWith("PINTEREST_ACCESS_TOKEN=")) {
      token = line.slice("PINTEREST_ACCESS_TOKEN=".length).trim();
      return token;
    }
  }
  throw new Error("PINTEREST_ACCESS_TOKEN bulunamadı. Önce pinterest-auth.ts çalıştır.");
}

async function getFirstBoard(token: string): Promise<string> {
  const res = await fetch(`${PINTEREST_API}/boards?page_size=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json() as any;
  if (!data.items?.length) throw new Error("Hiç board bulunamadı.");
  return data.items[0].id;
}

async function createPin(token: string, params: {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  boardId: string;
}) {
  const res = await fetch(`${PINTEREST_API}/pins`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: params.title,
      description: params.description,
      link: params.link,
      media_source: {
        source_type: "image_url",
        url: params.imageUrl,
      },
      board_id: params.boardId,
    }),
  });

  const data = await res.json() as any;
  if (!res.ok) throw new Error(`Pin oluşturulamadı: ${JSON.stringify(data)}`);
  return data;
}

// Main
async function main() {
  const [title, description, link, imageUrl, boardId] = process.argv.slice(2);

  if (!title || !link || !imageUrl) {
    console.log("Kullanım: bun run scripts/pinterest-pin.ts <başlık> <açıklama> <link> <resim_url> [board_id]");
    process.exit(1);
  }

  const token = await getAccessToken();
  const board = boardId || await getFirstBoard(token);

  console.log(`📌 Pin gönderiliyor: "${title}"`);
  const result = await createPin(token, {
    title,
    description: description || title,
    link,
    imageUrl,
    boardId: board,
  });

  console.log(`✅ Pin oluşturuldu: https://pinterest.com/pin/${(result as any).id}/`);
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
