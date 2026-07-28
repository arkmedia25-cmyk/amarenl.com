#!/usr/bin/env bash
# Reads TELEGRAM_BOT_TOKEN from .env.telegram.local (never prints it) and
# lists recent chats that have messaged the bot, so you can find your chat_id.
# Usage: send the bot a message (e.g. /start) first, then run this script.
set -euo pipefail

cd "$(dirname "$0")/.."

ENV_FILE=".env.telegram.local"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: $ENV_FILE not found." >&2
  exit 1
fi

# shellcheck disable=SC1090
set -a
source "$ENV_FILE"
set +a

if [[ -z "${TELEGRAM_BOT_TOKEN:-}" ]]; then
  echo "ERROR: TELEGRAM_BOT_TOKEN is empty in $ENV_FILE." >&2
  exit 1
fi

RESPONSE=$(curl -sS "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates")

COUNT=$(echo "$RESPONSE" | jq '.result | length')
if [[ "$COUNT" -eq 0 ]]; then
  echo "Henüz bot'a hiç mesaj gelmemiş."
  echo "Telegram'da bot'una (@Amarenl_content_bot) git ve bir mesaj gönder (örn. /start), sonra bu script'i tekrar çalıştır."
  exit 0
fi

echo "Bulunan sohbetler:"
echo "$RESPONSE" | jq -r '
  .result[]
  | .message // .channel_post
  | select(. != null)
  | .chat
  | "  chat_id: \(.id)   tür: \(.type)   isim: \(.title // (.first_name + " " + (.last_name // "")) // .username // "?")"
' | sort -u
