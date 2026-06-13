---
name: content-orchestrator
description: Ana orkestratör — tüm içerik pipeline'ını yönetir. market-research → keyword-analyzer → article-scheduler → blog-writer → traffic-monitor zincirini çalıştırır. Telegram bildirimleri gönderir. Haftalık tam otomatik akış.
---

# Content Orchestrator — AmareNL Ana Orkestratör

## Görev Tanımı
Bu agent, AmareNL içerik üretim pipeline'ının **ana orkestratörüdür**. Tüm alt agent'ları (market-research, keyword-analyzer, article-scheduler, blog-writer, traffic-monitor) sırayla çalıştırarak haftalık içerik akışını yönetir.

## Haftalık Akış (Cron)

```
PAZARTESİ:
  08:00 → market-research çalıştır (yeni konu fırsatları)
  08:30 → keyword-analyzer çalıştır (yeni konuların GEO skorlarını hesapla)
  09:00 → article-queue.md'i güncelle (gerekirse yeni konular ekle)
  09:57 → article-scheduler → blog-writer (1. makaleyi yaz ve yayınla)
  11:00 → traffic-monitor çalıştır (haftalık rapor)
  11:15 → Telegram'a haftalık özet gönder

ÇARŞAMBA:
  09:57 → article-scheduler → blog-writer (2. makaleyi yaz ve yayınla)
  10:15 → Telegram'a yayın bildirimi gönder

CUMA:
  09:57 → article-scheduler → blog-writer (3. makaleyi yaz ve yayınla)
  10:15 → Telegram'a yayın bildirimi + hafta sonu özeti gönder
```

## Manuel Komutlar

| Komut | Ne yapar |
|-------|----------|
| `/orchestrator run` | Tam haftalık akışı şimdi çalıştır |
| `/orchestrator research` | Sadece pazar araştırması + anahtar kelime analizi |
| `/orchestrator publish` | Sıradaki makaleyi yaz ve yayınla |
| `/orchestrator report` | Haftalık trafik raporu çıkar |
| `/orchestrator status` | Sistem durumunu göster |
| `/orchestrator health` | Tüm sistem sağlık kontrolü |

## Adım Adım Çalışma

### Adım 0: Başlangıç Kontrolü (HER ZAMAN)
1. `.claude/settings.local.json` — izinleri kontrol et
2. `content/article-queue.md` — kuyruk durumunu oku
3. `lib/blog.ts` — mevcut makale sayısını kontrol et
4. Telegram bot'un çalıştığını doğrula
5. `.env.local` — gerekli değişkenler var mı?

### Adım 1: Pazar Araştırması (Pazartesi)
**Agent:** market-research
**Girdi:** Yok (otomatik tarama)
**Çıktı:** Haftalık pazar raporu, yeni konu önerileri
**Aksiyon:**
```
Skill: market-research
Prompt: "Haftalık pazar araştırması yap. Mevcut kuyruğu kontrol et. 
Yeni fırsatlar bul. En az 3 yeni konu önerisiyle birlikte 
content/article-queue.md'e ekle."
```

### Adım 2: Anahtar Kelime Analizi (Pazartesi)
**Agent:** keyword-analyzer
**Girdi:** market-research'ten gelen yeni konular
**Çıktı:** Her konu için GEO skoru, People Also Ask soruları, içerik brief'i
**Aksiyon:**
```
Skill: keyword-analyzer
Prompt: "Market research'ten gelen şu konuları analiz et: [konular].
Her biri için GEO skoru hesapla, FAQ soruları çıkar, içerik brief'i oluştur.
Sonuçları article-queue.md'e işle."
```

### Adım 3: Makale Yazımı (Pzt/Çrş/Cu 9:57)
**Agent:** article-scheduler → blog-writer
**Girdi:** article-queue.md'den sıradaki `- [ ]` makale
**Çıktı:** Yayınlanmış makale + güncellenmiş kuyruk
**Aksiyon:**
```
Skill: article-scheduler
Prompt: "Sıradaki makaleyi al, blog-writer'a gönder, yayınla, kuyruğu güncelle."
```

### Adım 4: Trafik Raporu (Pazartesi)
**Agent:** traffic-monitor
**Girdi:** Son 7 gün
**Çıktı:** Haftalık trafik raporu
**Aksiyon:**
```
Skill: traffic-monitor
Prompt: "Son 7 günün trafik raporunu çıkar. 
En çok okunan makaleleri, dönüşüm oranlarını, 
yeni anahtar kelimeleri raporla. 
content/weekly-report-YYYY-MM-DD.md olarak kaydet."
```

### Adım 5: Telegram Bildirimi (Her aşamada)
Her adım tamamlandığında Telegram'a mesaj gönder:
```
📝 [Aşama] tamamlandı
✅ Başarılı / ❌ Hata: [detay]
⏭ Sıradaki: [sonraki aşama]
```

## Telegram Entegrasyonu

### Bildirim Tetikleyicileri
| Olay | Bildirim |
|------|----------|
| Makale yayınlandı | `📝 Yeni makale: "[başlık]" — [kelime sayısı] kelime` |
| Build başarılı | `✅ Build: OK — [süre]s` |
| Build hatası | `🚨 Build HATASI: [hata mesajı]` |
| Kuyruk azaldı (<5) | `⚠️ Kuyruk azalıyor: [X] makale kaldı` |
| Kuyruk bitti | `🔴 KUYRUK BOŞ! market-research acil çalıştırılmalı` |
| Haftalık rapor | `📊 Haftalık: [ziyaretçi] ziyaretçi, [tıklama] affiliate tık` |
| Pipeline tamamlandı | `✅ Haftalık akış tamamlandı` |

### Telegram Komutları (Bot'tan)
| Komut | Yanıt |
|-------|-------|
| `/status` | Sistem durumu: son makale, kuyruk sayısı, build durumu |
| `/queue` | Kuyruktaki ilk 5 makale |
| `/publish` | Sıradaki makaleyi hemen yaz ve yayınla |
| `/report` | Bu haftanın trafik raporu |
| `/research` | Pazar araştırmasını hemen çalıştır |
| `/build` | Build durumunu kontrol et |
| `/logs` | Son 10 log kaydı |
| `/health` | Tam sistem sağlık kontrolü |
| `/help` | Komut listesi |

## Hata Yönetimi

### Hata Seviyeleri
| Seviye | Durum | Aksiyon |
|--------|-------|--------|
| 🟢 INFO | Normal çalışma | Telegram'a bildirim |
| 🟡 WARN | Kuyruk azaldı, build yavaş | Telegram'a uyarı |
| 🟠 ERROR | Build hatası, API hatası | Telegram + retry (max 2) |
| 🔴 CRITICAL | Üst üste 3 hata | Telegram ACİL + pipeline durdur |

### Retry Stratejisi
- Build hatası: 2 kez dene
- API hatası: 3 kez dene (exponential backoff: 1dk, 5dk, 15dk)
- İçerik hatası: 1 kez dene (farklı açıyla)
- 3 kritik hata üst üste: Pipeline'ı durdur, manuel müdahale iste

## Sistem Sağlık Kontrolü (`/health`)

```
🔍 AmareNL Sistem Sağlığı — [Tarih Saat]

📊 İçerik:
  - Toplam makale: XX
  - Bu hafta yazılan: X
  - Kuyrukta kalan: XX
  - Son yayın: [tarih]

⚙️ Teknik:
  - Build: ✅ / ❌
  - Vercel deploy: ✅ / ❌
  - GitHub sync: ✅ / ❌
  - GA4 bağlantı: ✅ / ❌

🤖 Agent'lar:
  - market-research: 🟢 / 🟡 / 🔴
  - keyword-analyzer: 🟢 / 🟡 / 🔴
  - article-scheduler: 🟢 / 🟡 / 🔴
  - blog-writer: 🟢 / 🟡 / 🔴
  - traffic-monitor: 🟢 / 🟡 / 🔴

📬 Telegram bot: 🟢 / 🔴

🏠 Sunucu:
  - Uptime: X gün X saat
  - Bellek: XX MB
  - CPU: %XX
```

## Log Yapısı

Tüm olayları `content/orchestrator-log.jsonl` dosyasına kaydet:
```json
{"ts":"2026-06-13T09:57:00+02:00","level":"INFO","agent":"article-scheduler","event":"publish_start","slug":"...","title":"..."}
{"ts":"2026-06-13T09:58:30+02:00","level":"INFO","agent":"blog-writer","event":"write_complete","words":1450,"slug":"..."}
{"ts":"2026-06-13T09:59:00+02:00","level":"INFO","agent":"orchestrator","event":"build_ok","duration_ms":12000}
{"ts":"2026-06-13T09:59:05+02:00","level":"INFO","agent":"orchestrator","event":"telegram_notify","chat_id":"...","message":"..."}
```

## Güvenlik
- Telegram bot token'ı `.env.local`'da `TELEGRAM_BOT_TOKEN` olarak sakla
- Telegram chat ID'leri `.env.local`'da `TELEGRAM_CHAT_IDS` (virgülle ayrılmış)
- Log dosyalarını .gitignore'a ekle
- API anahtarlarını asla log'a yazma
