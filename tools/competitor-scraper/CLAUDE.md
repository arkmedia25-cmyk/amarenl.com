# data-autopilot — Claude Code buradaysan ÖNCE BUNU OKU

Bu klasör: Claude Code ile kurulmuş, **çalışan** bir web scraper. Bir kullanıcı bu projede `claude`
açtıysa, büyük ihtimalle **kendi verisini** çekmek istiyor ama koddan anlamıyor olabilir. Senin işin:
onu **proaktif karşılamak** ve birkaç dakikada kendi sitesine uyarlamak. Kullanıcının dilinde konuş
(bu topluluk **Türkçe**); kod, komut ve çıktı **İngilizce** kalır.

## 1) Kullanıcı oturum açınca — PROAKTİF DAVRAN
Sessizce emir bekleme. Kısa bir karşılama + net bir teklifle başla. Şablon:

> "Merhaba 👋 Bu klasör çalışan bir web scraper — bir sayfadan **ürün adı, fiyat ve stok** çekip
> `data.csv`'ye yazıyor, değişiklikleri fark ediyor ve selector kırılınca **kendini onarıyor.**
> Hazır demo `scrapeme.live` üzerinde çalışıyor. **Sen hangi siteden ne çekmek istiyorsun?**
> Bir örnek ürün/sayfa URL'si ver — canlı sayfayı inceleyip scraper'ı senin sitene uyarlayayım."

Kullanıcı "nasıl çalışır / nasıl kurarım" derse: `npm install` → `node scrape.js <url>` (tek ürün) →
`node scrape.js` (urls.txt → data.csv) → `node server.js` (panel, http://localhost:8787). Sonra hemen
"kendi sitene uyarlayalım mı?" diye teklif et.

## 2) Kendi sitesine uyarlama tarifi (kullanıcı URL verince)
1. **ÖNCE yasal kontrol.** Hedef sitenin `robots.txt` + kullanım şartlarına bak. Login/CAPTCHA arkası,
   yasaklı path ya da şüpheli/izinsiz hedefse **DUR**, kibarca reddet, public+izinli bir alternatif öner.
   Sadece **public + izinli** veri. Kişisel veri (isim/iletişim) çekme — Türkiye'de **KVKK** devreye girer.
2. **Canlı sayfayı fetch et**, adı/fiyatı/stoğu tutan **gerçek** HTML element+class'larını oku (hafızadan
   tahmin etme — sitenin şu anki HTML'ine bak).
3. `scrape.js` içindeki **`SELECTORS`**'ı güncelle (aşağıya bak). **Sadece selector'ları** değiştir;
   akış/CSV/self-heal kodunu olduğu gibi bırak.
4. `node scrape.js <url>` ile tek üründe test et. Yanlış/null gelirse selector'ı düzeltip **temiz JSON
   gelene kadar** tekrar çalıştır (fetch → çalıştır → düzelt → tekrar).
5. Kullanıcının URL'lerini `urls.txt`'e koy → `node scrape.js` → `data.csv`. İstersen `node server.js`
   ile paneli göster. Her sabah otomatik için `crontab.example`'daki satırı öner.

## 3) Bu scraper nasıl çalışıyor (yardım ederken bil)
- `node scrape.js <url>` → tek ürün, stdout'a **tek JSON**.
- `node scrape.js` → `urls.txt`'i gezer → `data.csv` (kolonlar: `timestamp,url,name,price,in_stock`),
  istekler arası **2sn** nazik gecikme, tek sayfa patlarsa `errors.txt`'e loglar ve **devam eder**.
- Değişiklik → `changes.log` (`PRICE DROP` / `PRICE RISE` / `BACK IN STOCK`).
- **Self-heal:** primary selector null dönerse fallback'ler denenir → düzelirse `SELF-HEALED` (changes.log),
  hepsi düşerse `errors.txt`'e yüksek-sesli flag.
- Selector'lar **`scrape.js` içinde top-level**:
  ```js
  const SELECTORS = {
    name:  ['h1.product_title', 'h1.entry-title', 'h1'],
    price: ['p.price .woocommerce-Price-amount', '.summary .price .amount', '.woocommerce-Price-amount'],
    stock: ['p.stock', '.stock'],
  };
  // index 0 = primary (normal yol), sonrası = self-heal'in denediği fallback'ler
  ```
- Yardımcı komutlar: `npm run break` (self-heal demosu için selector kır) · `npm run reset` (artefaktları
  temizle; `-- --restore-code` scrape.js'i `reference/`'tan geri yükler) · `node server.js` (dashboard).

## 4) Teknoloji (koru)
- ESM (`"type":"module"`), Node 18+ built-in `fetch` (node-fetch yok). Parser: **cheerio**.
- **Ücretli scraping API YOK, headless tarayıcı (puppeteer/playwright) YOK.** Her şey tek okunabilir
  `scrape.js` içinde — aşırı soyutlama yapma, tutorial okunabilirliği önce gelir.

## 5) Yasal guardrail (tartışmasız)
- Sadece **public + izinli** sayfa. `robots.txt` + ToS önce bakılır. Yasaklı path'e dokunma.
- **Login arkası, CAPTCHA, agresif bot-engelleme → bypass ETME, atlatma tekniği ÖNERME.**
- Kişisel veri yok (KVKK). İstekler arası **≥2sn** nazik gecikme (nezaket, gizlenme değil).
- Devasa ölçek (milyonlarca sayfa/proxy) bu aracın işi değil — dedike altyapı gerekir, dürüstçe söyle.

## 6) Çıktı sözleşmesi (değiştirme)
- CSV kolonları: `timestamp,url,name,price,in_stock`. `price` her zaman **sayı** (para sembolü temizlenir),
  `in_stock` **boolean** (bilinmiyorsa null). Tek URL modu **tek JSON** basar, başka çıktı yok.

## 7) Maliyet
- `node scrape.js` **bedava** — küçük/stabil veride AI'yı döngüye sokma.
- `claude -p` (headless) aboneliğin **normal kullanım limitinden** yer. (Anthropic 15 Haz 2026'da ayrı bir
  Agent SDK kredisi duyurdu ama rollout'u durdurdu — şimdilik normal limitten düşüyor.) Beyni sadece
  sayfa gerçekten değişince kullan.
