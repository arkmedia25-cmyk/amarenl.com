# Repo Audit — amarenl.com
> Generated: 2026-05-17 | Claude Code TASK 0

## 1. Next.js & Framework

| Item | Value |
|------|-------|
| Framework | Next.js 16.2.6 |
| Router | App Router |
| Language | TypeScript 5 (strict: true) |
| Styling | Tailwind CSS 3.4 |
| Fonts | Google Fonts (Cormorant Garamond + Nunito Sans) via next/font |
| Hosting | Vercel (CI/CD via GitHub) |
| Node | v24.15.0 |

**next.config.mjs:** Image optimization enabled for `amarecdn.azureedge.net`. No `compress`, `poweredByHeader`, or `experimental.optimizeCss` configured.

## 2. Product Data

- **Source:** `lib/products.ts` (72KB, 1000+ lines) — hardcoded TypeScript array
- **Products:** 40+ entries across 5 categories + 12+ individual products
- **Categories:** Mentale Fitness, Darmen & Digestie, Schoonheid & Verzorging, Dagelijkse Essentials, Gewichtsbeheer
- **Data structure:** `Product` interface with `slug`, `nameNL`, `taglineNL`, `benefitsNL`, `ingredientsNL`, `faqNL`, `mechanismNL`, `targetAudienceNL`, `synergies`, `seoKeywordsNL`
- **Issues:**
  - No `pricing` field (subscription vs one-time)
  - No `images` field (render uses placeholder)
  - No `contraindications` field
  - No `ratings` field (AggregateRating schema missing)
  - Products stored as flat array, not separate JSON files per product
  - No build-time validation script

## 3. Blog Content

- **MDX:** 6 files in `content/blog/`
- **Registry:** `lib/blog.ts` — 20 `BlogPost` entries (hardcoded array)
- **Categories in use:** Beauty, Darmen & Mentaal, Energie, Focus, Gut Health, Immuniteit, Mentaal Welzijn, Metabolisme, Wellness
- **Rendering:** `app/blogs/nieuws/[slug]/page.tsx` with DOMPurify sanitization
- **Issues:**
  - Category names inconsistent (Dutch/English mix)
  - No author person schema
  - HTML content stored in `lib/blog.ts` as string literals (hard to maintain)
  - MDX files only for 6 articles (others in lib/blog.ts only)
  - Blog titles are commodity content ("Supplementen voor meer energie — dit werkt écht")

## 4. SEO & Schema

| Feature | Status |
|---------|--------|
| JSON-LD Schema | ✅ `SchemaMarkup` component (layout + pages) |
| Article schema | ✅ blog post pages |
| Product schema | ❌ Missing on product pages |
| FAQPage schema | ❌ Not implemented |
| AggregateRating | ❌ Not implemented |
| BreadcrumbList | ✅ Homepage only |
| Organization schema | ✅ In `SchemaMarkup` (layout) |
| next-sitemap | ✅ Auto-generated (31 routes) |
| robots.txt | ✅ `public/robots.txt` |
| Canonical URLs | ⚠️ Partial (not all pages) |
| Meta titles/descriptions | ✅ Per page |
| i18n / hreflang | ❌ None |
| GA4 | ✅ GT-MKTPDM2M via `lib/analytics.ts` |

## 5. Routes (13 pages)

```
/                                          → Homepage
/blogs/nieuws/                             → Blog listing (accordion)
/blogs/nieuws/[slug]/                       → Individual blog post (SSG)
/collections/amare-wellness-essentials-2/   → Collection page
/contact/                                  → Contact page
/gewichtsbeheer/                           → Weight management category
/go/                                       → Smart redirect to Amare
/go/[product]/                             → Dynamic product redirect
/happy-juice-pack/                         → Product page
/over-ons/                                 → About us
/privacy-beleid/                           → Privacy policy
/schoonheid/                               → Beauty category
/supplementen/                             → Supplements category
```

## 6. Components (23 files)

| Directory | Files | Key Components |
|-----------|-------|---------------|
| `components/layout/` | 6 | Header, Footer, CampaignBanner, ClientProviders, ReturnVisitorBanner, VisitTracker |
| `components/sections/` | 12 | HeroSection, TrustBar, ProductGrid, HowItWorks, Testimonials, BlogPreview, NewsletterForm, GuaranteeBlock, FAQSection, CategoryLanding, FeaturedProducts, PromoCarousel |
| `components/ui/` | 4 | AffiliateCTA, ExitIntentPopup, FloatingMobileCTA, SchemaMarkup |
| `components/blog/` | 1 | BlogAccordion |

## 7. Affiliate System

- **Base URL:** `https://www.amare.com/2075008/nl-nl/`
- **Component:** `AffiliateCTA` (centralized)
- **Tracking:** 3-layer (`lib/affiliate.ts`): localStorage + `/go` redirect + return banner
- **Smart redirect:** `app/go/page.tsx` + `app/go/[product]/page.tsx`
- **UTM:** Not systematically appended to all affiliate URLs
- **rel attribute:** Uses `nofollow noopener noreferrer` — should be `sponsored noopener`

## 8. Issues Found

### Critical
1. **Product pages too thin** — only CTA button, no 800+ word descriptions
2. **Product schema missing** — no AI shopping visibility
3. **Footer social links dead** (`href="#"` for Instagram/Facebook)
4. **No author identity** on any blog post — E-E-A-T failure
5. **Dutch shipping advantage NOT mentioned** — products ship from NL, no customs. This is a major competitive advantage not highlighted anywhere.

### Moderate
6. Blog titles are commodity content (same as 1000+ other sites)
7. No i18n setup for nl-BE market
8. `rel="sponsored"` not used on affiliate links (Google guideline)
9. Category names mix Dutch and English
10. No pre-commit validation hooks
11. Newsletter integration incomplete (no email API route in .env.local)
12. Templates in codebase still have `100% natuurlijk` claims (partially fixed)

### Low
13. No image optimization `minimumCacheTTL` in next.config
14. No `compress: true` or `poweredByHeader: false`
15. Product images use external CDN only (amarecdn.azureedge.net)
16. No local product image fallbacks

## 9. Competitive Advantage — NOT LEVERAGED

> **Amare ships from the Netherlands (was: from US).**
> - No customs/douane process
> - Fast PostNL delivery (1-2 business days)
> - No extra import costs
> - EU-wide customs-free shipping (including Belgium)

This should be highlighted on: homepage hero, every product page, "Hoe het werkt" sections, blog posts, comparison pages.

## 10. Cross-Site Strategy

- **amarenl.com** → "buy" intent (pricing, ordering, product info)
- **amarereview.nl** → "review" intent (experiences, comparisons, does it work)
- Cross-link: product pages → independent review at AmareReview.nl
- Keyword coordination between both sites needed

## 11. Next Steps (Priority)

1. **TASK 1.1** — Product data structure standardization (separate JSON files per product)
2. **TASK 3.1** — Product schema (Product + Offer + AggregateRating)
3. **TASK 2.1** — Deepen product pages (800+ words each, 3 CTA positions)
4. **TASK 6.1** — Pillar pages (gut-brain axis, probiotic strains, adaptogens)
5. **TASK 12.1** — Conversion tracking (GA4 events for affiliate clicks)
