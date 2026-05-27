# AmareNL.com — Affiliate Bridge Site

> Next.js 14 | TypeScript | Tailwind CSS | Vercel

AmareNL.com is een Nederlandse affiliate bridge site die bezoekers informeert over natuurlijke wellness supplementen en doorstuurt naar Amare.com.

---

## Live

- Productie: **https://amarenl.com**
- Amare affiliate ID: **2075008**

---

## Ontwikkeling

```bash
npm run dev        # localhost:3000
npm run build      # Productie build
npm run lint       # ESLint
npm run sitemap    # Sitemap genereren
```

---

## Structuur

```
app/                    # Next.js App Router
├── page.tsx            # Homepage
├── layout.tsx          # Root layout (GA4, fonts, schema, affiliate tracking)
├── blogs/nieuws/       # Blog systeem (28 artikelen — 17 origineel + 11 pipeline)
├── go/                 # Akıllı affiliate yönlendirme
├── collections/        # Collectie pagina's
├── supplementen/       # Categoriepagina's
├── gewichtsbeheer/
├── schoonheid/
├── over-ons/
├── contact/
└── privacy-beleid/

components/
├── layout/             # Header, Footer, CampaignBanner, ReturnVisitorBanner, VisitTracker
├── sections/           # HeroSection, ProductGrid, PromoCarousel, TrustBar, etc.
├── ui/                 # AffiliateCTA, ExitPopup, SchemaMarkup, FloatingMobileCTA
└── blog/               # BlogCard, BlogContent, BlogAccordion

lib/
├── products.ts         # 40+ Amare producten database
├── blog.ts             # 28 blog artikelen (17 origineel + 11 pipeline)
├── schema.ts           # JSON-LD generators (Organization, Article, FAQ, Product, etc.)
├── analytics.ts        # GA4 event helpers
└── affiliate.ts        # 3-katmanlı affiliate tracking sistemi

content/blog/           # MDX blog artikelen
public/images/          # Statische assets
```

---

## Belangrijkste Features

### SEO & Schema
- JSON-LD Schema markup op alle pagina's (Organization, Article, FAQ, Product, BreadcrumbList)
- Auto sitemap via next-sitemap
- Unieke meta tags per pagina

### Affiliate Tracking (3 katman)
- **localStorage:** Ziyaretçi kaydı + otomatik affiliate ID
- **/go yönlendirme:** Akıllı redirect sayfası (`/go/[product]` ürüne özel)
- **Return visitor banner:** Geri dönen ziyaretçiye özel karşılama

### Conversie
- Exit-intent popup (e-mail capture)
- PromoCarousel (3 döner banner — ürün + kampanya)
- CampaignBanner (aylık güncellenen teklif)
- Floating mobile CTA

### Analytics
- Google Analytics 4 (GT-MKTPDM2M)
- Event tracking (affiliate clicks, form submissions, CTA clicks)
- IP anonimleştirme

---

## Deployment

Push naar `main` branch → automatische Vercel deployment.

---

## 12 Artikelen Pipeline (19 mei — 10 jun 2026)

| # | Artikel | Product | Status |
|---|---------|---------|--------|
| 1 | Vitamine D Tekort Symptomen | Sunrise | ✅ |
| 2 | Beste Probiotica 2026 | MentaBiotics | ✅ |
| 3 | Collageen Supplement Kopen | HL5 2-Pack | ✅ |
| 4 | Ashwagandha Kopen Nederland | EDGE+ | ✅ |
| 5 | Gut-Brain Connectie | Happy Juice Pack | ✅ |
| 6 | Haaruitval Supplement Vrouwen | HL5 | ✅ |
| 7 | Focus Supplement | EDGE+ | ✅ |
| 8 | Hormoonbalans Supplement Vrouwen | Ignite for HER | ✅ |
| 9 | Darmflora Verbeteren | Restore | ✅ |
| 10 | Supplement Routine Ochtend | Triangle of Wellness | ✅ |
| 11 | Plantaardige Proteïne Shake Kopen | Origin | ✅ |
| 12 | Menopauze Supplement | Ignite for HER | 🔜 10 jun |

Zie `CLAUDE.md` en `content/article-queue.md` voor volledige projectdocumentatie.
