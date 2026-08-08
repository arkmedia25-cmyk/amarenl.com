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

### 🆕 GSC 404 Temizliği (04 Agu 2026)

**Sorun:** Google Search Console 117 URL'i 404 olarak raporluyordu (eski WordPress/Shopify kalıntıları + geçiş sırasında kaybolan sayfalar).

**Yapılanlar:**

1. **vercel.json — 10 yeni yönlendirme eklendi** (toplam 143 redirect):
   - `/amare-edge-grape` → `/edge-plus`
   - `/urun/restore` → `/restore` (spesifik, wildcard'dan önce)
   - `/urun/edge` → `/edge-plus` (spesifik, wildcard'dan önce)
   - `/products/amare-happy-juice-edge-plus-watermelon` → `/happy-juice-pack`
   - `/products/amare-ignite-for-her` → `/ignite-for-her`
   - Tüm redirect'ler `permanent: true` (301)

2. **robots.txt güncellendi** — WordPress/Shopify sistem URL'leri Disallow:
   - `/?page_id=`, `/wp-content/`, `/wp-admin/`, `/feed=`, `/author/`
   - `/sample-page/`, `/collections/`, `/policies/`, `/cdn`, `/wpm`
   - Google'ın bu kalıntıları tekrar taraması caydırıldı

3. **Sonraki adım (manuel — Musa yapacak):**
   - Deploy ettikten sonra GSC'de URL Inspection ile birkaç eski URL'i kontrol et
   - GSC > Coverage > Not Found listesini "Doğrula" butonu ile güncelle

**Not:** `nitro-xtreme`, `sunset`, `fit20` sayfaları zaten mevcut — GSC'de bunların 404 görünmesi önbellek/gecikmeli indeks sorunu, kod tarafında sorun yok.

---

### 🆕 Faz 5 — Meta Ads Lead Generation (07-08 Aug 2026, in uitvoering)
Betaald NL-verkeer naar `/gratis-gut-brain-gids`. **07-08:** kritieke lead-capture bug gevonden en
gefixt (formulieren gaven altijd 500/verloren leads stil via MailerLite 422), concurrentie-analyse
ververst (Vitakruid/Nutriphyt/Orthica — Nutriphyt's 409-dagen-lopende advertentie is het sterkste
signaal). **08-08:** creative-scenario compleet, definitieve keuze gemaakt: **varianten A (gut-brain
illustratie) + B (gids-mockup)**, variant C afgevallen. Nog niet live — volgende stap is de Pixel-
CAPI-check en ad-account setup. Volledige details: zie `CLAUDE.md` sectie 20, subsectie "Faz 5".

### 🆕 Agency OS — Faz 1 & 2 (28 Tem 2026)
Volledig geautomatiseerde, maar **mens-gecontroleerde** content-pipeline. Details + openstaande
punten: zie `CLAUDE.md` sectie 20 ("AGENCY OS STATUS"). Kort:
- **Telegram-onaygate**: elk gegenereerd artikel wordt een `draft/<slug>` PR, nooit direct naar `main`.
  Onaply via ✅/❌ in Telegram → automatische merge + deploy.
- **Claude API content-motor** (`scripts/generate-article-claude.mjs`, cron ma/wo/vr): kiest zelf het
  volgende onderwerp uit `content/article-queue.md`, onderbouwt wetenschappelijke claims met **echte**
  PubMed-abstracts (publieke E-utilities API), en gebruikt concurrentie- + YouTube-signaal als
  thema-inspiratie (nooit als letterlijke bron).
- **`tools/competitor-scraper/`** — vitaminstore.nl prijs/voorraad/reviews, wekelijkse snapshot-cron.
- **`tools/youtube-research/`** — YouTube Data API v3, wekelijkse snapshot-cron.
- Oude vaste `TOPIC_POOLS` DeepSeek/OpenRouter-workflows staan nog als `workflow_dispatch`-only
  handmatige fallback (schedule uitgezet, geen dubbele publicatie meer).

---

## Nog te doen

### Product Pages (TASK 2.1)
- [x] FIT20 pagina (wei + collageen, 620 regels)
- [x] Sunset pagina (omega-3 avondformule, 622 regels)
- [ ] 1 extra pagina voor 10 totaal (Skin to Mind of VitaGBX)

### Blog Content
- [x] Agency OS Faz 1+2 content-motor (zie hierboven) — vervangt de handmatige queue-aanpak
- [ ] **17 PR's** wachten op Telegram-goedkeuring (13 gecorrigeerde stash-artikelen + 2 testartikelen)
- [ ] 3 pillar pages (Gut-Brain Axis, Probiotica Stammen, Adaptogenen) — kısmen yazıldı

### Infrastructuur
- [x] ~~E-mail API route (/api/subscribe) — Mailchimp integratie~~ — bestaat al (MailerLite, niet
      Mailchimp), maar gaf tot 07-08-2026 altijd 500/verloren leads — zie Faz 5 hierboven, nu gefixt
- [ ] GA4 conversion tracking voor affiliate clicks (TASK 12.1)
- [ ] verdikkend-serum-voor-fijn-haar → Amare server 500 (buiten onze controle)
- [ ] **Vercel deploy inhalen** zodra de 24u free-plan upload-limiet reset (geraakt 28-07-2026, te veel
      test-deploys op één dag) — zie `CLAUDE.md` sectie 20
- [ ] **Faz 3** (video, Higgsfield) — nog steeds on hold (account/betaling, zie `CLAUDE.md`)
- [ ] **Faz 4** (Pinterest) — infrastructuur klaar, wacht op Pinterest Standard access
- [ ] **Faz 5** (Meta Ads) — gestart 07-08-2026, creative-scenario in review, nog niet live (zie hierboven)

### Bekende Issues
- `verdikkend-serum-voor-fijn-haar` — HTTP 500 op Amare.com (server-side)
- GitHub auto-deploy naar Vercel werkt niet → Actions-workflows deployen expliciet via `vercel --prod`

---

## ⚠️ Content Orchestrator (13 Haz 2026) — VEROUDERD, NIET GEBRUIKEN

Dit `server/`-package hieronder is **vervangen** door de Agency OS Faz 1/2 pipeline hierboven. Laat
staan als historisch referentiemateriaal, maar start dit niet opnieuw op — er bleek ook een aparte,
écht-actieve automatische bot buiten deze repo te draaien (Hermes gateway LaunchAgent,
`AmareNL_Orchestrator_Bot`, zelfde Telegram chat_id), die op 28-07-2026 is stopgezet. Twee parallelle
publicatiesystemen was precies het soort ongecontroleerde automatisering die tot de ranking-crash
leidde die deze hele Agency OS-inspanning heeft getriggerd.

### Kurulum (historisch, niet gebruiken)
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

### Telegram Bot Komutları (historisch)
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

### Cron Takvimi (historisch)
| Gün | Saat (Amsterdam) | Görev |
|-----|-----------------|-------|
| Pazartesi | 07:57 | Tam pipeline (research + publish + report) |
| Çarşamba | 09:57 | Makale yayını |
| Cuma | 09:57 | Makale yayını |
| Her gün | 10:00 | Build kontrolü |

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

<!-- Telegram onay akışı testi — 2026-07-28T09:42:02Z -->
<!-- Vercel token testi — 2026-07-28T10:40:09Z -->
