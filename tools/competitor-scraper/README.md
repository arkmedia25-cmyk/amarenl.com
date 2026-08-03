# data-autopilot — Claude Code ile Web Scraper (Veri Otopilotta)

Claude Code ile **sıfırdan** kurulan tek-dosya bir web scraper. Bir sayfadan ürün adı / fiyat / stok
çeker, listeyi `data.csv`'ye yazar, **bir şey değişince** seni uyarır ve site HTML'ini değiştirip
selector'ı kırdığında **kendini onarır**. Cron'a koyarsın, sen uyanmadan temiz veri gelir.

> **Vaat:** Kütüphane araştırması yok, XPath ezberlemek yok, Stack Overflow'dan kopyala-yapıştır yok.
> Bir paragrafta ne istediğini söyle — gerisini bu pattern halleder.

> 🤖 **En kolay yol:** Bu klasörde **Claude Code aç** (`claude`) ve "kendi siteme uyarlayalım" de.
> Rehber (`CLAUDE.md`) Claude'a gömülü — seni karşılar, hangi siteden ne çekmek istediğini sorar ve
> scraper'ı senin sitene uyarlar. Koddan anlamana gerek yok.

---

## Bu nedir / ne değildir

**Bu:** insanların aylık ~50$'a SaaS olarak ödediği türden gerçek bir scraper + tam otopilot.
Sonunda elinde 3 şey olur: (1) yapılandırılmış veri çeken **script**, (2) veri değişince fark eden
**gözcü**, (3) her şeyi tek başına koşturan **zamanlanmış iş**.

**Bu değil:** her siteye sihirli anahtar değil. Login arkası, CAPTCHA, agresif bot-engelleme **yok**
(bkz. [Limitler](#-limitler)). Devasa ölçek (milyon sayfa / dönen proxy) için dedike altyapı gerekir.

---

## ⚡ Quickstart

Bu araç `amarenl.com` reposu içinde `tools/competitor-scraper/` altında yaşıyor — kendi izole
`package.json`'ı var, ana Next.js uygulamasının bağımlılıklarına dokunmaz.

```bash
cd tools/competitor-scraper
npm install                       # tek bağımlılık: cheerio (HTML parser)

# 1) Tek sayfa — stdout'a JSON (data.csv'ye dokunmaz)
node scrape.js https://scrapeme.live/shop/Bulbasaur/
# -> { "name": "Bulbasaur", "price": 63, "in_stock": true }

# 2) Liste — urls.txt'i gez, data.csv'ye yaz, değişiklikleri changes.log'a düş
node scrape.js
```

Kendi verin için: `urls.txt`'i kendi (izinli, public) URL'lerinle değiştir; başka site için
`scrape.js` içindeki `CONFIG.SELECTORS`'ı güncelle. Akış kodu aynı kalır.

---

## 🔧 7 yetenek

| # | Yetenek | Nasıl |
|---|---|---|
| 1 | Tek sayfa → JSON | `node scrape.js <url>` |
| 2 | Liste → CSV | `urls.txt` → `data.csv` (kolonlar: `timestamp,url,name,price,in_stock`) |
| 3 | Nazik + dayanıklı | İstekler arası 2sn gecikme; bir sayfa patlarsa `errors.txt`'e logla, **devam et** |
| 4 | Değişiklik tespiti | Fiyat düştü/yükseldi ya da tekrar stokta → `changes.log`'a tek satır |
| 5 | Self-heal | Önce çalışmış URL null dönerse fallback selector'larla onar → `SELF-HEALED` |
| 6 | Otopilot | `cron` + headless `claude -p` ile zamanla (bkz. `crontab.example`) |
| 7 | Dürüst sınırlar | Sadece public + izinli veri; bypass yok |

**Demo komutları (kendi gözünle gör):**
```bash
node scrape.js              # temiz koşu (3 ürün + 1 kasıtlı 404 errors.txt'e gider)
npm run break              # primary fiyat selector'ını kır (self-heal demosu)
node scrape.js             # -> changes.log'da "SELF-HEALED ...", fiyat yine doğru
npm run reset -- --restore-code   # her şeyi temizle + scrape.js'i geri yükle
```

---

## ⏰ Cron + AI beyin (otopilot)

`crontab -e` ile aşağıdakilerden birini ekle (tam hali: `crontab.example`):

```bash
# Seviye 1 — en basit, ÜCRETSİZ: her sabah 07:00 scrape + her şeyi logla
0 7 * * * cd ~/data-autopilot && node scrape.js >> run.log 2>&1

# Seviye 2 — otopilot + AI özeti: scrape sonrası Claude değişenleri anlatsın (headless)
0 7 * * * cd ~/data-autopilot && node scrape.js && claude -p --no-session-persistence --permission-mode acceptEdits --allowedTools "Read,Write" "Read changes.log from the last 24 hours. Write a 3-line plain-English summary of what moved and what I should care about. Append it to digest.md with today's date." >> run.log 2>&1
```

`claude -p` = print/headless mode: sohbet penceresi olmadan, tek seferlik, denetimsiz koşar. Veri
sadece *gelmez* — **açıklanmış** gelir (`digest.md`'ye tarihli insan-dili özet).

---

## ⚖️ Yasal & Etik (atlamA)

- **Önce `robots.txt` + kullanım şartlarına (ToS) bak.** Sadece **herkese açık ve izin verilen** veri.
- **Login arkası, CAPTCHA, agresif bot-engelleme → geçmeye çalışma.** Bu pattern bunu yapmaz, sen de yapma.
- **Kişisel veri** (isim, iletişim vb.) scraping'inde Türkiye'de **KVKK** devreye girer — dikkatli ol.
- 2sn nazik gecikme + kendini tanıtan dürüst User-Agent = **nezaket/uyumluluk**, gizleme/atlatma değil.
- Bu repodaki demo `scrapeme.live` üzerinde: scraping'e açık bir sandbox ("/shop/" robots'ta serbest) →
  ekranda göstermek **%100 yasal**.

---

## 💸 Maliyet disiplini

- `node scrape.js` **bedavadır**. Küçük/stabil veride yapay zekâyı döngüye **sokma** — düz script yeter.
- Her headless `claude -p` koşusu aboneliğinin **normal kullanım limitinden** yer → her cron özeti kotandan yer.
  (Anthropic **15 Haziran 2026'da** programatik / Agent SDK kullanımını ayrı bir aylık Agent SDK kredisine
  taşıyacağını **duyurdu ama rollout'u aynı gün durdurdu** — bu yüzden şimdilik hâlâ normal limitten düşüyor.
  Kamerada söylersen bu "duyuruldu ama durduruldu" halini söyle, "ayrı krediden düşüyor" deme.)
  ([resmi açıklama](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan))
- Pratik kural: **beyni yalnızca sayfa gerçekten değiştiğinde kullan.** Gerisi düz `node scrape.js`.

---

## 🚧 Limitler

- Login/CAPTCHA/bot-block arkasındaki sayfalar → kapsam dışı (ve denenmemeli).
- Ağır JavaScript ile render edilen SPA'larda zayıf (bu sürüm HTML parse eder, tarayıcı çalıştırmaz).
- Devasa ölçek (milyonlarca sayfa, dönen proxy) → dedike scraping altyapısı/araç gerekir.
- Tatlı nokta: birkaç düzine–birkaç yüz **public + izinli** sayfa, bir zamanlamayla. %90'lık durum bu.

---

## 🗂️ Dosya haritası

```
scrape.js              Scraper (tek dosya, tüm 7 yetenek)
urls.txt               Girdi: her satıra bir ürün URL'si (# = yorum)
package.json           ESM + cheerio + npm scriptleri
CLAUDE.md              Repo kuralları (Claude Code için)
crontab.example        2 cron satırı + headless claude -p digest
server.js              Yerel dashboard backend (zero-dep)  ->  node server.js  (http://localhost:8787)
dashboard/             Panel arayüzü (gerçek scraper verisini okur)
scripts/reset-demo.sh  Artefaktları temizle / scrape.js'i geri yükle  (npm run reset)
scripts/break-selector.sh  Self-heal demosu için selector kır          (npm run break)
reference/             Bitmiş scrape.js yedeği + örnek data.csv
── üretilenler (gitignore): data.csv · changes.log · errors.txt · digest.md · run.log
```

---

## 🎁 Ücretsiz topluluk

Bu template'i al, kendi URL'lerini koy, bu gece çalışan bir veri pipeline'ın olsun.
Daha fazlası (hype'sız) → **Digital Academy** topluluğu: [skool.com/otomasyon](https://www.skool.com/otomasyon)

MIT © 2026 Digital Academy
