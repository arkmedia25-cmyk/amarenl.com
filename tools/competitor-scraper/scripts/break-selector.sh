#!/usr/bin/env bash
# Self-heal demosu için PRIMARY price selector'ını deterministik olarak bozar.
# Her seferinde aynı take çıkar. Geri almak için: npm run reset -- --restore-code
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$REPO_ROOT"

TARGET="p.price .woocommerce-Price-amount'"
if ! grep -qF "$TARGET" scrape.js; then
  echo "⚠️  Primary price selector bulunamadı — scrape.js zaten değişmiş olabilir."
  echo "    Önce temizle:  npm run reset -- --restore-code"
  exit 1
fi

cp scrape.js scrape.js.bak
# perl: macOS + Linux'ta aynı çalışır (\Q..\E pattern'i otomatik escape eder).
perl -i -pe "s/\Qp.price .woocommerce-Price-amount'\E/p.price .woocommerce-Price-amount-BROKEN'/g" scrape.js

echo "💥 Primary price selector kırıldı:"
echo "     'p.price .woocommerce-Price-amount'  ->  '...-BROKEN'"
echo
echo "   Şimdi çalıştır:  node scrape.js"
echo "     -> primary null döner; URL önce çalıştığı için self-heal fallback'le kurtarır;"
echo "        changes.log'a 'SELF-HEALED ...' düşer ve fiyat yine doğru gelir."
echo
echo "   Geri al:  npm run reset -- --restore-code      (ya da: mv scrape.js.bak scrape.js)"
