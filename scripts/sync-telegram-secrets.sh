#!/usr/bin/env bash
# Syncs .env.telegram.local values into GitHub Actions secrets + Vercel env.
# Values are never printed to stdout/stderr.
set -euo pipefail

cd "$(dirname "$0")/.."

ENV_FILE=".env.telegram.local"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: $ENV_FILE not found. Copy it and fill in the values first." >&2
  exit 1
fi

# shellcheck disable=SC1090
set -a
source "$ENV_FILE"
set +a

missing=()
[[ -z "${TELEGRAM_BOT_TOKEN:-}" ]] && missing+=("TELEGRAM_BOT_TOKEN")
[[ -z "${TELEGRAM_CHAT_ID:-}" ]] && missing+=("TELEGRAM_CHAT_ID")
[[ -z "${GH_DISPATCH_TOKEN:-}" ]] && missing+=("GH_DISPATCH_TOKEN")
if [[ ${#missing[@]} -gt 0 ]]; then
  echo "ERROR: missing required values in $ENV_FILE: ${missing[*]}" >&2
  exit 1
fi

echo "== GitHub Actions secrets =="
printf '%s' "$TELEGRAM_BOT_TOKEN" | gh secret set TELEGRAM_BOT_TOKEN
printf '%s' "$TELEGRAM_CHAT_ID"   | gh secret set TELEGRAM_CHAT_ID
if [[ -n "${TELEGRAM_THREAD_ID:-}" ]]; then
  printf '%s' "$TELEGRAM_THREAD_ID" | gh secret set TELEGRAM_THREAD_ID
fi
if [[ -n "${OPENROUTER_API_KEY:-}" ]]; then
  printf '%s' "$OPENROUTER_API_KEY" | gh secret set OPENROUTER_API_KEY
  echo "  ✓ OPENROUTER_API_KEY set"
else
  echo "  ⚠ OPENROUTER_API_KEY boş — makale üretimi çalışmayacak, doldurup script'i tekrar çalıştır"
fi
if [[ -n "${VERCEL_TOKEN:-}" ]]; then
  printf '%s' "$VERCEL_TOKEN" | gh secret set VERCEL_TOKEN
  echo "  ✓ VERCEL_TOKEN set"
else
  echo "  ⚠ VERCEL_TOKEN boş — otomatik deploy adımı başarısız olmaya devam edecek, doldurup script'i tekrar çalıştır"
fi
echo "  ✓ TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID$( [[ -n "${TELEGRAM_THREAD_ID:-}" ]] && echo ', TELEGRAM_THREAD_ID' ) set"

echo "== Vercel env (production) =="
add_vercel_env() {
  local name="$1" value="$2"
  # Remove existing value first (vercel env add fails if it already exists)
  vercel env rm "$name" production --yes >/dev/null 2>&1 || true
  printf '%s' "$value" | vercel env add "$name" production >/dev/null
  echo "  ✓ $name set"
}
add_vercel_env "TELEGRAM_BOT_TOKEN" "$TELEGRAM_BOT_TOKEN"
add_vercel_env "TELEGRAM_CHAT_ID" "$TELEGRAM_CHAT_ID"
add_vercel_env "GH_DISPATCH_TOKEN" "$GH_DISPATCH_TOKEN"
if [[ -n "${TELEGRAM_THREAD_ID:-}" ]]; then
  add_vercel_env "TELEGRAM_THREAD_ID" "$TELEGRAM_THREAD_ID"
fi
if [[ -n "${TELEGRAM_WEBHOOK_SECRET:-}" ]]; then
  add_vercel_env "TELEGRAM_WEBHOOK_SECRET" "$TELEGRAM_WEBHOOK_SECRET"
fi

echo
echo "Done. Values were not printed anywhere in this output."
