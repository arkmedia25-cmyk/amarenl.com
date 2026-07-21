#!/usr/bin/env bun
/**
 * Pinterest OAuth — production flow via amarenl.com callback.
 * Kullanım: bun run scripts/pinterest-auth.ts
 *
 * 1. Tarayıcıda Pinterest onay sayfası açar
 * 2. Onay sonrası amarenl.com/api/pinterest/callback token'ı gösterir
 */

import { execSync } from "node:child_process";

const CLIENT_ID = "1582959";
const REDIRECT_URI = "https://amarenl.com/api/pinterest/callback";
const SCOPES = "pins:read,pins:write,boards:read";
const AUTH_URL = `https://www.pinterest.com/oauth/?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPES)}`;

console.log("🔐 Pinterest OAuth başlatılıyor...");
console.log(`📋 Tarayıcı açılıyor → Pinterest'e izin ver\n`);
console.log(`   URL: ${AUTH_URL}\n`);

execSync(`open "${AUTH_URL}"`);

console.log("⏳ Pinterest'te 'Allow' butonuna bas.");
console.log("   Onay sonrası amarenl.com seni callback sayfasına yönlendirecek.");
console.log("   Oradaki access_token'ı kopyala ve bana ver.\n");
