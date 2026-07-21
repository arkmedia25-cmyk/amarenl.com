#!/usr/bin/env bun
/**
 * Pinterest OAuth — eenmalige token alımı.
 * Kullanım: bun run scripts/pinterest-auth.ts
 *
 * 1. Tarayıcıda Pinterest onay sayfası açar
 * 2. localhost:8888'de callback bekler
 * 3. Access token + refresh token'ı .env.local'e yazar
 */

import { readFileSync, writeFileSync } from "node:fs";
import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { execSync } from "node:child_process";

const CLIENT_ID = process.env.PINTEREST_CLIENT_ID || "1582959";
const CLIENT_SECRET = process.env.PINTEREST_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:8888/callback";
const SCOPES = "pins:read,pins:write,boards:read";
const AUTH_URL = `https://www.pinterest.com/oauth/?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPES)}`;

const ENV_PATH = new URL("../.env.local", import.meta.url).pathname;

if (!CLIENT_SECRET) {
  console.error("❌ PINTEREST_CLIENT_SECRET .env.local'de tanımlı değil.");
  process.exit(1);
}

console.log("🔐 Pinterest OAuth başlatılıyor...\n");
console.log("📋 Tarayıcı açılıyor → Pinterest'e izin ver\n");

execSync(`open "${AUTH_URL}"`);

// HTTP server for OAuth callback
const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url || "/", `http://localhost:8888`);

  if (url.pathname === "/callback") {
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
      res.end("❌ İzin reddedildi. Tarayıcıyı kapatabilirsin.");
      console.error("❌ Kullanıcı izin vermedi:", error);
      server.close();
      process.exit(1);
    }

    if (!code) {
      res.end("❌ Authorization code alınamadı.");
      server.close();
      process.exit(1);
    }

    try {
      const tokenRes = await fetch("https://api.pinterest.com/v5/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
        }),
      });

      const data = await tokenRes.json() as any;

      if (!tokenRes.ok || !data.access_token) {
        console.error("❌ Token alınamadı:", data);
        res.end("❌ Token exchange başarısız. Terminali kontrol et.");
        server.close();
        process.exit(1);
      }

      // Save tokens to .env.local
      let envContent = readFileSync(ENV_PATH, "utf-8");

      // Replace or add token lines
      const lines = envContent.split("\n");
      const newLines: string[] = [];
      let hasAccess = false;
      let hasRefresh = false;

      for (const line of lines) {
        if (line.startsWith("PINTEREST_ACCESS_TOKEN=")) {
          newLines.push(`PINTEREST_ACCESS_TOKEN=${data.access_token}`);
          hasAccess = true;
        } else if (line.startsWith("PINTEREST_REFRESH_TOKEN=")) {
          newLines.push(`PINTEREST_REFRESH_TOKEN=${data.refresh_token}`);
          hasRefresh = true;
        } else {
          newLines.push(line);
        }
      }

      if (!hasAccess) newLines.push(`PINTEREST_ACCESS_TOKEN=${data.access_token}`);
      if (!hasRefresh) newLines.push(`PINTEREST_REFRESH_TOKEN=${data.refresh_token}`);

      writeFileSync(ENV_PATH, newLines.join("\n"));
      console.log("✅ Token'lar .env.local'e kaydedildi!");
      console.log(`   Access: ${data.access_token.slice(0, 20)}...`);
      console.log(`   Refresh: ${data.refresh_token?.slice(0, 20) || "—"}...`);

      res.end("✅ Başarılı! Pinterest bağlandı. Terminali kapatabilirsin.");
      server.close();
      process.exit(0);
    } catch (err: any) {
      console.error("❌ Hata:", err.message);
      res.end("❌ Hata oluştu.");
      server.close();
      process.exit(1);
    }
  } else {
    res.end("Pinterest OAuth callback server. Bekleniyor...");
  }
});

server.listen(8888, () => {
  console.log("⏳ Pinterest'ten onay bekleniyor (localhost:8888)...\n");
});
