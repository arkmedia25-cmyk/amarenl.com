#!/usr/bin/env bash
# Demo'yu temiz duruma al — üretilen artefaktları siler (urls.txt / node_modules / git'e DOKUNMAZ).
#   npm run reset                  -> sadece artefaktları temizle
#   npm run reset -- --restore-code -> ayrıca scrape.js'i reference'tan geri yükle (break sonrası)
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$REPO_ROOT"

rm -f data.csv changes.log errors.txt digest.md run.log
echo "🧹 Artefaktlar temizlendi (data.csv, changes.log, errors.txt, digest.md, run.log)."

if [[ "${1:-}" == "--restore-code" || "${1:-}" == "--restore" ]]; then
  if [[ -f reference/scrape.reference.js ]]; then
    cp reference/scrape.reference.js scrape.js
    rm -f scrape.js.bak
    echo "♻️  scrape.js, reference/scrape.reference.js'ten geri yüklendi."
  else
    echo "⚠️  reference/scrape.reference.js yok — scrape.js'e dokunulmadı."
  fi
fi

echo "✅ Temiz durum. Tekrar çekime hazır: node scrape.js"
