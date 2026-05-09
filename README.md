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
├── blogs/nieuws/       # Blog systeem (17 artikelen)
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
├── blog.ts             # 17 MDX blog artikelen
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

Zie `CLAUDE.md` voor volledige projectdocumentatie.
