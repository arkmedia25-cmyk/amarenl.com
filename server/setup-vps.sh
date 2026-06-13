#!/bin/bash
# ===========================================
# AmareNL Orchestrator — VPS Kurulum Scripti
# DigitalOcean / Ubuntu 22.04+
# ===========================================
set -e

echo "🚀 AmareNL Orchestrator VPS Kurulumu"
echo "===================================="

# 1. Node.js 22+ kontrolü / kurulumu
echo ""
echo "📦 Node.js kontrol ediliyor..."
if ! command -v node &> /dev/null; then
  echo "Node.js bulunamadı, kuruluyor..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
echo "✅ Node.js $(node -v)"

# 2. Proje dizini
PROJECT_DIR="/opt/AmareNL.com"
echo ""
echo "📁 Proje dizini: $PROJECT_DIR"

if [ ! -d "$PROJECT_DIR" ]; then
  echo "Repo klonlanıyor..."
  git clone https://github.com/WeArkMedia/AmareNL.com.git "$PROJECT_DIR"
else
  echo "Repo zaten var, güncelleniyor..."
  cd "$PROJECT_DIR" && git pull origin main
fi

cd "$PROJECT_DIR"

# 3. Server bağımlılıkları
echo ""
echo "📦 npm paketleri kuruluyor..."
cd "$PROJECT_DIR/server"
npm install

# 4. Log dizini
mkdir -p "$PROJECT_DIR/logs"

# 5. PM2 kurulumu
echo ""
echo "⚙️ PM2 kontrol ediliyor..."
if ! command -v pm2 &> /dev/null; then
  echo "PM2 kuruluyor..."
  npm install -g pm2
fi
echo "✅ PM2 $(pm2 -v)"

# 6. PM2 başlatma
echo ""
echo "🔥 Orchestrator başlatılıyor..."
pm2 delete amarenl-orchestrator 2>/dev/null || true
pm2 start "$PROJECT_DIR/server/ecosystem.config.json"
pm2 save
pm2 startup systemd -u $(whoami) --hp $HOME

echo ""
echo "===================================="
echo "✅ Kurulum tamamlandı!"
echo ""
echo "📋 Durum kontrolü:"
echo "   pm2 status"
echo "   pm2 logs amarenl-orchestrator"
echo ""
echo "🤖 Telegram bot'unuza /status yazın!"
echo "===================================="
