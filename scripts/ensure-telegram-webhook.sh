#!/usr/bin/env bash
# Telegram webhook'unun doğru URL'e kayıtlı olduğunu doğrular, değilse düzeltir.
#
# NEDEN VAR (10-08-2026): Telegram'ın webhook kaydı hiçbir uyarı vermeden
# sessizce boşalabiliyor. Bu boşken onay/red butonlarına tıklamak HİÇBİR ŞEY
# YAPMIYOR — Telegram, güncellemeyi kendi sunucusunda sessizce kuyruğa
# düşürüyor, hiçbir hata/log üretmiyor. Bu yüzden bu script, webhook'a
# bağımlı her workflow'un başında çağrılır — insan fark etmeden haftalarca
# sürmesin diye.
#
# Gerekli env: TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET

set -euo pipefail

# 2026-09-23: stond op https://amarenl.com/... — dat domein 308-redirect naar
# vitaalroute.nl, en Telegram weigert een webhook die een redirect teruggeeft
# ("Wrong response from the webhook: 308 Permanent Redirect"). Gevolg: elke
# ✅/❌-tik werd stil in Telegram's wachtrij gezet en NOOIT verwerkt.
# Registreer daarom direct op het eindpunt zonder redirect.
EXPECTED_URL="https://vitaalroute.nl/api/telegram/webhook"
CURRENT_URL=$(curl -sS "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo" | jq -r '.result.url // ""')

if [ "$CURRENT_URL" != "$EXPECTED_URL" ]; then
  echo "::warning::Telegram webhook kayıtlı değildi veya yanlıştı (mevcut: '$CURRENT_URL') — yeniden kaydediliyor."
  RESULT=$(curl -sS -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg url "$EXPECTED_URL" --arg secret "$TELEGRAM_WEBHOOK_SECRET" \
      '{url: $url, secret_token: $secret, allowed_updates: ["callback_query"]}')")
  echo "$RESULT"
  OK=$(echo "$RESULT" | jq -r '.ok // false')
  if [ "$OK" != "true" ]; then
    echo "::error::Telegram webhook yeniden kaydı başarısız oldu."
    exit 1
  fi
else
  echo "Telegram webhook doğru kayıtlı: $CURRENT_URL"
fi
