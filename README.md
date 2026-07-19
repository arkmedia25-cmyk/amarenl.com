# AmareNL.com — Affiliate Bridge Site

> Next.js 16 | TypeScript | Tailwind CSS | Vercel

AmareNL.com is een Nederlandse affiliate bridge site die bezoekers informeert over natuurlijke wellness supplementen en doorstuurt naar Amare.com.

---

## Live

- Productie: **https://amarenl.com**
- Amare affiliate ID: **2075008**
- Analytics: GA4 (GT-MKTPDM2M)

---

## Ontwikkeling

```bash
npm run dev        # localhost:3000
npm run build      # Productie build
npm run lint       # ESLint
npx next-sitemap   # Sitemap genereren
npx tsx scripts/generate-product-index.ts  # Product index herbouwen
npx tsx scripts/efsa-audit.js              # EFSA compliance scan
npx tsx scripts/validate-products.js       # Affiliate URL validatie
```

---

## Structuur

```
app/                        # Next.js App Router (14 routes)
├── page.tsx                # Homepage
├── layout.tsx              # Root layout (GA4, fonts, schema, affiliate tracking)
├── blogs/nieuws/           # Blog systeem (17 artikelen)
├── go/                     # Akıllı affiliate yönlendirme
├── collections/            # Collectie pagina
├── happy-juice-pack/       # Deep product page (1000+ woorden)
├── mentabiotics/           # Deep product page
├── energy/                 # Deep product page
├── hl5/                    # Deep product page
├── origin/                 # Deep product page
├── restore/                # Deep product page
├── sunrise/                # Deep product page
├── supplementen/           # Categoriepagina
├── gewichtsbeheer/         # Categoriepagina
├── schoonheid/             # Categoriepagina
├── over-ons/
├── contact/
└── privacy-beleid/

components/
├── layout/                 # Header, Footer, CampaignBanner, ReturnVisitorBanner, ClientProviders
├── sections/               # HeroSection, ProductGrid, PromoCarousel, TrustBar, GuaranteeBlock, etc.
├── ui/                     # AffiliateCTA, ExitPopup, SchemaMarkup, FloatingMobileCTA
└── blog/                   # BlogCard, BlogContent, BlogAccordion

lib/
├── products.ts             # 43 Amare producten (statische JSON import)
├── blog.ts                 # 17 MDX blog artikelen
├── schema.ts               # JSON-LD generators (Product+FAQ+Breadcrumb, Organization, Article)
├── analytics.ts            # GA4 event helpers
└── affiliate.ts            # 3-katmanlı affiliate tracking

data/
├── products/               # 43 individuele [slug].json bestanden
└── products.json           # Geaggregeerde index (auto-generated)

scripts/
├── generate-product-index.ts  # Bouwt data/products.json uit individuele JSONs
├── efsa-audit.js              # EFSA compliance scanner
└── validate-products.js       # Affiliate URL validator

content/blog/               # MDX blog artikelen
public/images/              # Statische assets
```

---

## Wat is klaar

### SEO & Schema
- JSON-LD Product+FAQ+Breadcrumb schema op alle 7 deep product pages
- JSON-LD **MedicalWebPage** schema op gezondheidsblogs (E-E-A-T boost)
- JSON-LD **HowTo** schema op stapsgewijze handleidingen
- JSON-LD **SiteLinksSearch** schema op hele site
- JSON-LD Organization, Article, FAQ, Speakable, Person op blogpagina's
- Auto sitemap via next-sitemap (202 routes, blog posts met echte lastmod)
- Google Search Console geverifieerd
- AI crawlers expliciet toegestaan (GPTBot, CCBot, anthropic-ai, PerplexityBot)

### Producten
- **43** producten in database
- **7** deep product pages (1000+ woorden, EFSA-compliant)
  - Happy Juice Pack, MentaBiotics, Energy+, HL5, Origin, Restore, Sunrise
- Product dropdown menu in navigatie (desktop + mobiel)
- Alle PostNL/shipping claims verwijderd (Amare handelt verzending)
- Affiliate URL fixes: ignite-him, ignite-her, skin-to-mind-neunight

### Affiliate Tracking (3 lagen)
1. **localStorage** — bezoekerregistratie + automatische affiliate ID
2. **/go** — akıllı redirect (`/go/[product]` voor productspecifieke links)
3. **Return visitor banner** — herkenning terugkerende bezoekers

### Conversie
- Exit-intent popup (e-mail capture)
- PromoCarousel (3 roulerende banners)
- CampaignBanner (maandelijks aanbod)
- Floating mobile CTA
- AffiliateCTA component (herbruikbaar)

### Security
- XSS protectie (DOMPurify op alle HTML render)
- Next.js 16.2.6 (latest stable)
- 0 npm vulnerabilities (high-severity)
- Clean console (geen debug logs)
- **HSTS** (max-age=63072000; includeSubDomains; preload)
- **X-Content-Type-Options: nosniff**
- **X-Frame-Options: DENY**
- **Referrer-Policy: strict-origin-when-cross-origin**

### GEO/AEO (🆕 19 Tem 2026)
- **11** JSON-LD schema types in lib/schema.ts
- **36** interne links toegevoegd aan 10 blog artikelen
- **8** wetenschappelijke bronvermeldingen (RIVM, Voedingscentrum, PubMed, Gezondheidsraad)
- MedicalWebPage schema voor alle YMYL gezondheidscontent
- HowTo schema auto-detectie voor stapsgewijze handleidingen
- Speakable schema voor voice search (Google Assistant, Siri)
- SiteLinksSearch schema voor branded SERP
- Crawl-delay: 1 (snelle indexatie)

---

## Nog te doen

### Product Pages (TASK 2.1)
- [x] FIT20 pagina (wei + collageen, 620 regels)
- [x] Sunset pagina (omega-3 avondformule, 622 regels)
- [ ] 1 extra pagina voor 10 totaal (Skin to Mind of VitaGBX)

### Blog Content
- [ ] 20 makale kuyrukta (content/article-queue.md)
- [x] Orchestrator + Telegram bot (server/)
- [ ] 3 pillar pages (Gut-Brain Axis, Probiotica Stammen, Adaptogenen) — kısmen yazıldı

### Infrastructuur
- [ ] E-mail API route (/api/subscribe) — Mailchimp integratie
- [ ] Mail credentials in .env.local
- [ ] GitHub → Vercel auto-deploy herstellen (nu CLI: `vercel --prod --yes`)
- [ ] GA4 conversion tracking voor affiliate clicks (TASK 12.1)
- [ ] verdikkend-serum-voor-fijn-haar → Amare server 500 (buiten onze controle)

### Bekende Issues
- `verdikkend-serum-voor-fijn-haar` — HTTP 500 op Amare.com (server-side)
- GitHub auto-deploy naar Vercel werkt niet → handmatig deployen via CLI

---

## Content Orchestrator (🆕 13 Haz 2026)

### Kurulum
```bash
cd server
cp .env.example .env
# .env dosyasını düzenle:
#   ANTHROPIC_API_KEY=...
#   TELEGRAM_BOT_TOKEN=...  ( @BotFather'dan al)
#   TELEGRAM_ADMIN_CHAT_IDS=...
npm install
npm start
```

### Telegram Bot Komutları
| Komut | İşlev |
|-------|-------|
| `/status` | Sistem durumu |
| `/queue` | Makale kuyruğu |
| `/publish` | Sıradaki makaleyi yayınla |
| `/research` | Pazar araştırması başlat |
| `/report` | Haftalık trafik raporu |
| `/health` | Sistem sağlık kontrolü |
| `/logs` | Son 10 log kaydı |
| `/build` | Build durumu |

### Cron Takvimi
| Gün | Saat (Amsterdam) | Görev |
|-----|-----------------|-------|
| Pazartesi | 07:57 | Tam pipeline (research + publish + report) |
| Çarşamba | 09:57 | Makale yayını |
| Cuma | 09:57 | Makale yayını |
| Her gün | 10:00 | Build kontrolü |

### Telegram Bot Nasıl Oluşturulur
1. Telegram'da [@BotFather](https://t.me/BotFather) ile konuş
2. `/newbot` yaz, isim ver (örn: `AmareNL_Orchestrator_Bot`)
3. Token'ı `.env` dosyasına kopyala
4. Bot'una mesaj at
5. `curl https://api.telegram.org/bot<TOKEN>/getUpdates` ile chat ID'ni al
6. Chat ID'ni `.env`'e `TELEGRAM_ADMIN_CHAT_IDS` olarak ekle

---

## ⚠️ Deployment — KRİTİK KURALLAR

**ASLA uncommitted değişiklikle deploy etme!** `vercel --prod` lokaldeki dosyaları yükler, git'i değil.

### Deploy Kontrol Listesi (HER SEFERİNDE)
```bash
git status                    # Temiz mi?
git pull origin main          # Remote güncel mi?
npm run build                 # Build başarılı mı?
git add -A && git commit -m "..."
git push origin main
vercel --prod --yes           # Deploy
```

### Rollback (acil durum)
```bash
vercel list                   # Son deployment ID'sini bul
vercel promote <DEPLOY_ID>    # Önceki sürüme dön
```

GitHub → Vercel auto-deploy kullanılmıyor. Manuel CLI deploy.

---

Zie `CLAUDE.md` voor volledige projectdocumentatie, codeerregels en SEO-eisen.
