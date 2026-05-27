# CLAUDE.md — amarenl.com
# Amare Affiliate Bridge Site | Next.js 14 | Vercel

> Dit is het projectgeheugen voor Claude Code.
> Lees dit bestand volledig voordat je iets aanpast, aanmaakt of verwijdert.

---

## 1. PROJECTOVERZICHT

**Site:** amarenl.com
**Type:** Affiliate bridge site (geen eigen webshop)
**Doel:** Hollandse bezoekers aantrekken → informeren → vertrouwen opbouwen → doorsturen naar amare.com via affiliate link
**Eigenaar:** Onafhankelijke Amare affiliate partner (Nederland)
**Taal:** Nederlands (NL) — alle content, UI, SEO
**Satış sayfası:** amare.com (externe affiliate link — opent altijd in nieuw tabblad)

### Belangrijke Documenten
- Brand Guidelines: [brand-spec.md](brand-spec.md)
- SEO & Keywords: [keywords-ads.md](keywords-ads.md)
- Affiliate Tracking Systeem: [affiliate-tracking.md](affiliate-tracking.md)
- Core Products: [lib/products.ts](lib/products.ts)

---

## 2. TECHNISCHE STACK

```
Framework:     Next.js 14 (App Router)
Taal:          TypeScript
Styling:       Tailwind CSS
Hosting:       Vercel (automatische CI/CD via GitHub)
DNS:           Namecheap → Vercel
CMS/Blog:      MDX bestanden in /content/blog/
E-mail:        Bestaand mailsysteem (zie sectie 9)
Analytics:     Google Analytics 4
Schema:        JSON-LD (Article, Product, FAQ, BreadcrumbList)
Fonts:         Google Fonts (Cormorant Garamond + Nunito Sans)
Icons:         Lucide React
```

### Mappenstructuur

```
amarenl/
├── app/
│   ├── layout.tsx                  → Root layout (GA4, fonts, meta)
│   ├── page.tsx                    → Homepage
│   ├── blogs/
│   │   └── nieuws/
│   │       ├── page.tsx            → Blog overzichtspagina
│   │       └── [slug]/
│   │           └── page.tsx        → Individuele blogpost
│   ├── collections/
│   │   └── amare-wellness-essentials-2/
│   │       └── page.tsx            → Collectie pagina (SEO behoud)
│   ├── happy-juice-pack/
│   │   └── page.tsx                → Product pagina (SEO behoud)
│   ├── supplementen/
│   │   └── page.tsx
│   ├── gewichtsbeheer/
│   │   └── page.tsx
│   ├── schoonheid/
│   │   └── page.tsx
│   ├── over-ons/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── privacy-beleid/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── CampaignBanner.tsx      → Bovenkant pagina, maandelijks update
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx
│   │   ├── BlogPreview.tsx
│   │   ├── NewsletterForm.tsx
│   │   └── GuaranteeBlock.tsx
│   ├── ui/
│   │   ├── AffiliateCTA.tsx        → Herbruikbare CTA knop → amare.com
│   │   ├── ExitPopup.tsx           → Exit-intent popup
│   │   └── SchemaMarkup.tsx        → JSON-LD component
│   └── blog/
│       ├── BlogCard.tsx
│       └── BlogContent.tsx
├── content/
│   └── blog/                       → MDX bestanden voor alle blogposts
│       ├── apotheek-of-groenteboer.mdx
│       ├── altijd-moe-ontdek-hoe-cel-energie-jouw-energieniveau-bepaalt.mdx
│       └── amare-triangle-of-wellness-ervaringen-waarom-balans-voeding-en-vitaliteit-samenkomen.mdx
├── lib/
│   ├── blog.ts                     → MDX lees- en parse functies
│   ├── schema.ts                   → JSON-LD generators
│   └── analytics.ts                → GA4 event helpers
├── public/
│   ├── images/
│   ├── robots.txt
│   └── sitemap.xml                 → Automatisch via next-sitemap
└── styles/
    └── globals.css
```

---

## 3. KRITISCHE SEO-REGELS — NOOIT SCHENDEN

### ⚠️ URL-structuur MOET exact overeenkomen met huidige site
De volgende URL's staan geïndexeerd in Google. Ze MOGEN NIET veranderen:

```
/blogs/nieuws/[slug]          → Blog artikelen (App Router: app/blogs/nieuws/[slug])
/collections/amare-wellness-essentials-2
/happy-juice-pack/
/                             → Homepage
```

### Redirect-regels (vercel.json)
Maak een `vercel.json` aan in de root met redirects voor eventuele varianten:

```json
{
  "redirects": [
    {
      "source": "/blog/:slug",
      "destination": "/blogs/nieuws/:slug",
      "permanent": true
    },
    {
      "source": "/nieuws/:slug",
      "destination": "/blogs/nieuws/:slug",
      "permanent": true
    }
  ]
}
```

### Sitemap
- Gebruik `next-sitemap` package
- Alle blogposts automatisch opnemen
- Prioriteit: homepage=1.0, categoriepagina's=0.8, blog=0.6
- Wijzig sitemap.xml NOOIT handmatig — laat next-sitemap dit doen

### Meta tags
- Elke pagina heeft unieke `title` en `description`
- Title format: `[Paginatitel] | AmareNL`
- Description: max 155 tekens, bevat hoofdzoekwoord
- Open Graph tags op elke pagina
- Canonical URL op elke pagina

---

## 4. MERKIDENTITEIT & KLEUREN

### Kleurenpalet (exact — CSS variabelen)

```css
:root {
  --color-primary:     #6B4C8C;  /* Amare diep paars — hoofdkleur */
  --color-primary-light: #9B7FBE; /* Licht paars — hover, secundair */
  --color-accent:      #C8A951;  /* Goud — CTA knoppen, highlights */
  --color-bg:          #FFFFFF;  /* Wit — hoofdachtergrond */
  --color-bg-soft:     #F9F6FF;  /* Heel licht paars — sectie-achtergronden */
  --color-text:        #2C2C2C;  /* Donkergrijs — hoofdtekst */
  --color-text-muted:  #6B6B6B;  /* Grijs — subtitels, meta */
  --color-success:     #4CAF50;  /* Groen — garantie-iconen */
  --color-border:      #E8E0F0;  /* Licht paars-grijs — randen */
}
```

> ⚠️ Gebruik ALTIJD CSS-variabelen. Schrijf NOOIT hardcoded hex-kleuren in componenten.
> De kleuren moeten overeenkomen met amare.com zodat bezoekers een vloeiende overgang ervaren.

### Typografie

```
Koppen (H1-H3):  Cormorant Garamond — elegant, premium
Bodytekst:       Nunito Sans — leesbaar, vriendelijk
CTA-knoppen:     Nunito Sans Semi-bold, normal case (GEEN hoofdletters)
```

### Visuele stijl
- Schoon, minimalistisch, premium
- Veel witruimte
- Subtiele paarse accenten
- Geen drukke achtergronden
- Productfoto's: lichte, luchtige stijl (conform amare.com)

---

## 5. AFFILIATE LINKS — KRITISCHE REGELS

```
Affiliate basis-URL: https://www.amare.com/2075008/nl-nl/
Affiliate ID: 2075008
```

> Zie [affiliate-tracking.md](affiliate-tracking.md) voor het volledige 3-katmanlı takip sistemi.

### Regels voor affiliate links
- Openen ALTIJD in nieuw tabblad: `target="_blank" rel="nofollow noopener noreferrer"`
- NOOIT `rel="sponsored"` weglaten bij betaalde/affiliate links (Google richtlijn)
- Affiliate disclosure ALTIJD zichtbaar op elke pagina (footer + boven productknoppen)
- Gebruik de `AffiliateCTA` component — schrijf NOOIT raw affiliate links inline
- Alle affiliate links MOETEN `storeAffiliateVisit()` aanroepen bij klik

### AffiliateCTA component gebruik
```tsx
// ✅ Correct
<AffiliateCTA
  label="Bestel bij Amare →"
  product="happy-juice-pack"
  variant="primary"
/>

// ❌ Fout — nooit hardcoded
<a href="https://amare.com/...">Bestel nu</a>
```

### Akıllı Yönlendirme (`/go`)
- `amarenl.com/go` — otomatik Amare'ye yönlendirir
- Sosyal medya, e-posta, bookmark için kullan
- Dosya: `app/go/page.tsx`

---

## 6. PRODUCTEN & CATEGORIEËN

### Productcategorieën (7 hoofdcategorieën)

#### 🧠 Hersenen & Mentale Wellness
| Product | Kernboodschap NL |
|---------|-----------------|
| **FundaMentals Pack®** | Complete gut-brain ondersteuning in één pakket |
| **MentaBiotics®** ⭐ | Probiotica voor stemming, stress en mentale veerkracht |
| **MentaFocus®** | Meer focus en mentale helderheid |
| **MentaSync®** | Optimaliseert gut-brain communicatie |
| **Happy Juice Pack** ⭐ | Meest populair — energie, stemming, focus |
| **Amare EDGE®** | Plantaardig nootropicum voor drive en focus |
| **Sleep+™** | Melatoninevrije slaapformule |

#### 🦠 Darmen & Spijsvertering
| Product | Kernboodschap NL |
|---------|-----------------|
| **Probiotics** | 10 miljard CFU's voor darmgezondheid |
| **Digestive** | Spijsverteringsenzymen, minder opgeblazen gevoel |
| **GBX SuperFood** | Superfoods voor dagelijkse vitaliteit |
| **GBX SeedFiber** | Vezels voor gezonde darmflora |

#### ⚖️ Gewichtsbeheer
| Product | Kernboodschap NL |
|---------|-----------------|
| **GBX Fit** | 's Werelds eerste QUADbiotic vetverbrander |
| **GBX Protein** | Plantaardig eiwit voor spierherstel |
| **Amare EDGE®** | Metabolisme-ondersteuning |

#### ✨ Schoonheid — Huid, Haar & Nagels
| Product | Kernboodschap NL |
|---------|-----------------|
| **NeuCollagen™** 🆕 | 6-dimensioneel collageen — huid, haar, nagels, gewrichten, spieren + cortisol |
| **HL5™** | Gehydrolyseerde collageen peptiden, Berry & Peach smaak |
| **DermaBiotics™ Pack** | Gut-skin axis — serum + collagen spray |
| **Skin to Mind™** 🆕 | Neurowetenschappelijke huidverzorging |

#### 🌿 Dagelijkse Essentials
| Product | Kernboodschap NL |
|---------|-----------------|
| **VitaGBX™** | Complete multivitamine — 50+ voedingsstoffen |
| **OmMega** | Omega-3 voor hart, brein en gewrichten |
| **Energy+** | Natuurlijke energie zonder crash |

#### 👶 Kids & Tieners
| Product | Kernboodschap NL |
|---------|-----------------|
| **Kids FundaMentals®** | Gut-brain voor kinderen |
| **Kids VitaGBX™** | 50+ vitamines, GMO-vrij, suikervrij |
| **Kids Mood+™** | Focus, rust en cognitieve prestatie |

#### 🎁 Pakketten & Bundels
- Happy Juice Pack, FundaMentals Pack®, DermaBiotics Pack, Kids Pack
- Altijd tonen als "beste waarde" — hogere orderwaarde → gratis verzending vanaf €175

### Productprioritering op de site
1. **Happy Juice Pack** — meest populair, eerste positie
2. **NeuCollagen™** — nieuwste product (maart 2026), hero banner
3. **FundaMentals Pack®** — best verkochte pakket
4. **MentaBiotics®** — bestseller enkelvoudig product

---

## 7. PAGINA-SECTIES (Homepage volgorde)

```
1. CampaignBanner      → Bovenaan, maandelijks update, paarse achtergrond
2. Header              → Logo + navigatie + affiliate CTA knop
3. HeroSection         → H1 + subtitel + 2 CTA's + NeuCollagen highlight
4. TrustBar            → 5 vertrouwenssignalen (zie hieronder)
5. GuaranteeBlock      → 30 dagen garantie + €8 korting + gratis verzending
6. ProductGrid         → 7 categorieën, prioriteit boven
7. HowItWorks          → 3-stappen proces
8. Testimonials        → 3-5 klantervaringen
9. BlogPreview         → Laatste 3 artikelen
10. NewsletterForm     → Lead magnet (e-book + €8 korting)
11. Footer             → Links + socials + affiliate disclosure
```

### TrustBar inhoud (5 items)
```
🛡️  30 dagen geld-terug-garantie
🎁  €8 korting op eerste bestelling
🚚  Gratis verzending vanaf €175
🌿  100% natuurlijke ingrediënten
⭐  10.000+ tevreden klanten wereldwijd
```

### CTA-hiërarchie
```
Primaire CTA:    "Bestel bij Amare →"           → affiliate link, nieuw tabblad
Secundaire CTA:  "Ontvang gratis advies"         → opent nieuwsbriefformulier
Urgentie CTA:    "Profiteer nu van €8 korting →" → affiliate link + korting highlight
```

---

## 8. BLOG SYSTEEM

### ⚠️ DUAL DATA LAYER — KRİTİK

Blog render sistemi **İKİ KATMANLI** çalışır. Her makale iki yerde yaşar:

| Katman | Konum | Ne işe yarar |
|--------|-------|-------------|
| **1. Render HTML** | `lib/blog.ts` → `blogPosts[]` | **Sayfada render edilen içerik budur.** MDX değil! |
| **2. Ürün linkleri** | `lib/blog.ts` → `articleProductMap{}` | `linkifyProductMentions()` buradan okuyup linkleri basar |
| **3. MDX (referans)** | `content/blog/[slug].mdx` | SEO frontmatter + yedek. `<AffiliateCTA>` component'i **MDX'te çalışmaz!** |

**Önemli:** `<AffiliateCTA>` sadece MDX içinde yazılır ama sayfada **render edilmez**. Ürün linkleri `linkifyProductMentions()` tarafından otomatik oluşturulur.

### Yeni Makale Yayınlama Checklist (HER SEFERİNDE)

```
[ ] 1. content/blog/[slug].mdx oluştur (frontmatter + AffiliateCTA etiketiyle)
[ ] 2. lib/blog.ts → blogPosts[] dizisine HTML entry ekle (en başa, en yeni tarihli)
[ ] 3. lib/blog.ts → articleProductMap{} içine slug için ürün linkleri ekle
[ ] 4. content/article-queue.md işaretle (✅)
[ ] 5. npm run build (hata varsa düzelt)
[ ] 6. git add + commit + push origin main
[ ] 7. vercel --prod --yes
[ ] 8. curl ile canlıyı kontrol et
```

### Ürün Linkleme Sistemi

```typescript
// lib/blog.ts içinde:
linkifyProductMentions(post.content, post.slug)  // HTML içindeki ürün isimlerini linke çevirir
getProductLinksForArticle(post.slug)             // Sayfa altındaki ürün kartları
```

**Nasıl çalışır:** `linkifyProductMentions()` HTML içinde `<strong>ÜrünAdı</strong>` ve standalone `ÜrünAdı` pattern'lerini arar, `articleProductMap[slug]` ile eşleştirip affiliate linke çevirir. "Amare ÜrünAdı" prefix'ini de tanır (fix: 19 May 2026).

**Dikkat edilecekler:**
- Ürün isimleri HTML içinde `<strong>` ile vurgulanmış olmalı
- `articleProductMap`'teki isimlerle birebir aynı olmalı ("Amare" prefix'i opsiyonel)
- Sadece `isInternal: false` olanlar doğrudan amare.com'a linklenir
- `BlogAccordion` component'i de `linkifyProductMentions()` çağırmalı (fix: 19 May 2026)

### MDX bestandsstructuur
Alle blogposts staan in `/content/blog/[slug].mdx`

### Verplichte frontmatter per artikel
```yaml
---
title: "Titel van het artikel — max 60 tekens"
date: "YYYY-MM-DD"
category: "hersenen | darmen | gewichtsbeheer | schoonheid | hormonen | essentials | kids | lifestyle"
tags: ["tag1", "tag2", "tag3"]
metaDescription: "Max 155 tekens — bevat hoofdzoekwoord"
slug: "exact-zelfde-als-huidige-url-slug"
affiliateCta: true
schema: "Article"
excerpt: "Korte samenvatting voor blogkaart — 1-2 zinnen"
author: "AmareNL Redactie"
image: "/images/blog/[slug]-cover.jpg"
---
```

### Bestaande geïndexeerde artikelen (SLUG MAG NIET WIJZIGEN)
```
apotheek-of-groenteboer
altijd-moe-ontdek-hoe-cel-energie-jouw-energieniveau-bepaalt
amare-triangle-of-wellness-ervaringen-waarom-balans-voeding-en-vitaliteit-samenkomen
```

### Artikelstructuur (template)
```mdx
## [H2 eerste sectie — bevat zoekwoord]
[150-200 woorden inleiding — zoekwoord in eerste 100 woorden]

## [H2 tweede sectie]
[inhoud]

## [H2 derde sectie]
[inhoud]

## Veelgestelde vragen
**Vraag 1?**
Antwoord in 40-60 woorden — helder en direct.

**Vraag 2?**
Antwoord in 40-60 woorden.

**Vraag 3?**
Antwoord in 40-60 woorden.

<AffiliateCTA label="Bekijk dit product bij Amare →" product="[product-slug]" />

## Conclusie
[Korte samenvatting + zachte aanbeveling]
```

### Artikellengte
- Minimum: 800 woorden
- Doel: 1.200 – 1.800 woorden
- Zoekwoorddichtheid: 1-2%

### Blogcategorieën & onderwerpen (rotatie voor dagelijkse automatie)
```
hersenen      → gut-brain axis, serotonine, focus, slaap, stress
darmen        → probiotica, prebiotica, microbioom, spijsvertering
gewichtsbeheer → QUADbiotic, metabolisme, vetverbranding
schoonheid    → collageen, hyaluronzuur, huid, haar, nagels
hormonen      → cortisol, hormoonbalans, menopauze, vrouwengezondheid
essentials    → omega-3, vitamines, dagelijkse routine
kids          → kinderontwikkeling, focus school, gut-brain kids
```

---

## 9. E-MAIL LEAD SYSTEEM

### Integratiepunten (koppelen aan bestaand mailsysteem)
```
1. ExitPopup component    → /components/ui/ExitPopup.tsx
2. NewsletterForm sectie  → /components/sections/NewsletterForm.tsx
3. Blog inline CTA forms  → In MDX blogposts
4. Contact pagina         → /app/contact/page.tsx
```

### Formuliervelden (minimum)
```
- Voornaam (verplicht)
- E-mailadres (verplicht)
- GDPR checkbox (verplicht): "Ik ga akkoord met het privacybeleid"
```

### API route voor formulierverwerking
```
/app/api/subscribe/route.ts  → POST endpoint
```

Verwerk formulierinzendingen via de bestaande mailservice.
Vraag de eigenaar naar de API-sleutel en sla op in `.env.local`:
```
MAIL_API_KEY=
MAIL_LIST_ID=
MAIL_API_URL=
```

### Segmentatietags (voeg toe bij inschrijving)
```
popup-exit     → Via exit-intent popup
blog-organic   → Via blogpost inline form
homepage-hero  → Via homepage hero CTA
nl-audience    → Alle Nederlandse abonnees (altijd toevoegen)
```

### Double opt-in stroom
```
1. Formulier verzonden → API route aangeroepen
2. Mailservice stuurt bevestigingsmail
3. Klik op bevestigingslink → geactiveerd
4. Welkomstmail + e-book PDF link verzonden
5. Automatische e-mailserie start (7 e-mails)
```

---

## 10. EXIT-INTENT POPUP

**Bestand:** `/components/ui/ExitPopup.tsx`

### Triggerlogica
```typescript
// Desktop: mouse verlaat viewport bovenaan
document.addEventListener('mouseleave', (e) => {
  if (e.clientY < 0) showPopup();
});

// Mobiel: detecteer terug-navigatie intent
// via pageshow + visibilitychange events
```

### Cookie-instelling
```
Naam:     amarenl_popup_shown
Waarde:   true
Duur:     30 dagen
```
→ Toon popup maximaal 1x per sessie, daarna pas na 30 dagen opnieuw.

### Popupinhoud (Nederlands)
```
Titel:    "Wacht! Voordat je gaat... 🎁"
Body:
  ✅ E-book: "7 Stappen naar Mentaal Welzijn" (GRATIS)
  ✅ €8 Korting op je eerste bestelling

Formulier:
  [Voornaam]
  [E-mailadres]
  [Ja, stuur mij het gratis e-book! →]   ← primaire CTA, goudkleurig

Onderin klein:
  "🔒 Geen spam. Je kunt je altijd afmelden."

Sluitknop: X rechtsboven
```

---

## 11. CAMPAGNEBANNER

**Bestand:** `/components/layout/CampaignBanner.tsx`

- Staat bovenaan elke pagina, boven de header
- Achtergrond: gradient van `--color-primary` naar `--color-accent`
- Witte tekst, gecentreerd
- Bevat optioneel een countdown timer
- Maandelijks handmatig updaten (geen CMS koppeling nodig)
- Voorbeeld inhoud:

```
🔥 MEI AANBIEDING — Geldig t/m 31 mei |
Bestel 2 producten en krijg 20% korting! →
[Bekijk aanbieding]
```

---

## 12. SCHEMA MARKUP (JSON-LD)

Gebruik de `SchemaMarkup` component op elke pagina.

### Per paginatype
```typescript
// Homepage
{ "@type": "Organization" } + { "@type": "WebSite" }

// Blogpost
{ "@type": "Article" } + { "@type": "FAQPage" }

// Productpagina
{ "@type": "Product" } + { "@type": "Review" }

// Alle pagina's
{ "@type": "BreadcrumbList" }
```

---

## 13. SEO, GEO & AEO REGELS

### On-page SEO (elke pagina)
- Unieke H1 met hoofdzoekwoord
- Meta title max 60 tekens, format: `[Titel] | AmareNL`
- Meta description max 155 tekens
- URL: kort, schoon, Nederlands (`/supplementen/vitamine-d-belang/`)
- Alt-tekst op alle afbeeldingen (Nederlands)
- Minimaal 2 interne links per blogpost
- Canonical tag op elke pagina

### GEO (zichtbaarheid in AI-zoekmachines)
- Begin elke sectie met een duidelijke definitie: "Wat is [X]?"
- FAQ-blokken op elke pagina (min. 3 vragen)
- Link naar gezaghebbende bronnen: Voedingscentrum, RIVM, PubMed
- E-E-A-T signalen: auteursnaam, datum, bronvermeldingen

### AEO (Featured Snippets & People Also Ask)
- FAQ-antwoorden: 40-60 woorden, direct en informatief
- Gebruik lijsten en tabellen (AI prefereert gestructureerde content)
- HowTo schema voor stap-voor-stap artikelen
- Vraagformaat: "Wat is...", "Hoe werkt...", "Is ... veilig?", "Wat zijn de voordelen van..."

---

## 14. JURIDISCHE VEREISTEN (Nederland / EU)

### Verplichte pagina's
- `/privacy-beleid/` — Volledige privacyverklaring (GDPR)
- Cookiebanner bij eerste bezoek — toestemming vragen voor analytics
- Disclaimer op elke pagina (footer)

### Affiliate disclosure (VERPLICHT — overal zichtbaar)
```
Tekst voor footer:
"Deze website bevat affiliate links. Wij ontvangen een commissie
bij aankoop via onze links, zonder extra kosten voor jou."

Tekst boven productknop:
"* Affiliate link — je betaalt hetzelfde bedrag"
```

### Gezondheidsclaims — STRIKT VERBODEN
```
❌ "Dit geneest..."
❌ "Dit behandelt [ziekte]"
❌ "Klinisch bewezen te genezen"
❌ Absolute medische garanties
✅ "Ondersteunt een gezond gevoel"
✅ "Draagt bij aan..."
✅ "Veel gebruikers ervaren..."
✅ Altijd toevoegen: "* Deze uitspraken zijn niet beoordeeld door de NVWA"
```

Referentie: EU Health Claims Regulation, Keuringsraad NL

---

## 15. OMGEVING & COMMANDO'S

### Lokale ontwikkeling
```bash
npm run dev        → Start op localhost:3000
npm run build      → Productie build
npm run lint       → ESLint controle
npm run type-check → TypeScript controle
npx next-sitemap   → Genereer sitemap.xml
```

### Omgevingsvariabelen (.env.local)
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_AFFILIATE_BASE_URL=https://www.amare.com/[code]/
MAIL_API_KEY=
MAIL_LIST_ID=
MAIL_API_URL=
NEXT_PUBLIC_SITE_URL=https://amarenl.com
```

> ⚠️ Verwijder NOOIT .env.local
> Commit NOOIT .env.local naar Git (staat in .gitignore)

### Vercel deployment
```
Push naar main branch → automatische deployment via Vercel
Preview branches → automatische preview URL
```

---

## 16. CODEERREGELS

### TypeScript
- Strict mode aan (`"strict": true` in tsconfig)
- Interfaces voor alle props
- Geen `any` types

### Naamgeving
- Componenten: PascalCase (`HeroSection.tsx`)
- Variabelen/functies: camelCase (`affiliateUrl`)
- CSS klassen: Tailwind utilities + CSS variabelen
- Bestanden: kebab-case voor pagina's en content

### Componentregels
- Elk component in eigen bestand
- Geen inline styles — gebruik Tailwind + CSS variabelen
- Alle afbeeldingen via `next/image` (automatische optimalisatie)
- Alle links via `next/link` (client-side navigatie)
- Affiliate links: ALTIJD via `AffiliateCTA` component

### Performance
- Lazy loading voor afbeeldingen (automatisch via `next/image`)
- Dynamische imports voor zware componenten (ExitPopup, etc.)
- Core Web Vitals doel: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Font preloading via `next/font/google`

---

## 17. NIET DOEN

```
❌ URL-structuur van bestaande pagina's wijzigen
❌ Slug van geïndexeerde blogposts aanpassen
❌ .env.local verwijderen of overschrijven
❌ Hardcoded affiliate links (altijd via AffiliateCTA component)
❌ Hardcoded hex-kleuren (altijd CSS variabelen)
❌ Affiliate links zonder rel="nofollow noopener noreferrer"
❌ Affiliate links in hetzelfde tabblad openen
❌ Medische claims of garanties over gezondheidsresultaten
❌ Affiliate disclosure weglaten
❌ node_modules aanpassen
❌ next-sitemap configuratie handmatig overschrijven
❌ Automatisch database migraties uitvoeren
❌ Console.log achterlaten in productie — gebruik logger
```

---

## 18. PRIORITEITSVOLGORDE BIJ OPBOUW

Bouw in deze volgorde:

```
Fase 1 — Fundament
  [x] Next.js 14 project initialiseren (TypeScript + Tailwind)
  [x] CSS variabelen instellen (kleuren, typografie)
  [x] Cormorant Garamond + Nunito Sans via next/font
  [x] Layout: Header + Footer + CampaignBanner
  [x] vercel.json met redirects voor SEO

Fase 2 — SEO Kritisch
  [x] Blogposts in lib/blog.ts (16 artikelen)
  [x] /blogs/nieuws/[slug] pagina
  [x] /blogs/nieuws/ overzichtspagina (accordion)
  [x] /happy-juice-pack/ pagina
  [x] /collections/amare-wellness-essentials-2/ pagina
  [x] next-sitemap configureren
  [x] robots.txt

Fase 3 — Homepage
  [x] HeroSection
  [x] TrustBar
  [x] GuaranteeBlock (30 dagen + €8 + gratis verzending)
  [x] ProductGrid (40 producten, 5 categorieën)
  [x] HowItWorks
  [x] Testimonials
  [x] BlogPreview
  [x] NewsletterForm

Fase 4 — Conversie
  [x] AffiliateCTA component
  [x] ExitPopup (exit-intent)
  [ ] E-mail API route (/api/subscribe)
  [x] CampaignBanner met mei-aanbieding

Fase 5 — Categoriepagina's
  [x] /supplementen/
  [x] /gewichtsbeheer/
  [x] /schoonheid/
  [x] /over-ons/
  [x] /contact/
  [x] /privacy-beleid/

Fase 6 — Schema & Analytics
  [ ] JSON-LD per paginatype
  [ ] Google Analytics 4 integratie
  [ ] Google Search Console verificatie

Fase 7 — Automatisering (2026-05-09)
  [x] article-queue.md met 20 geplande artikelen
  [x] article-scheduler skill (.claude/skills/)
  [x] market-research skill
  [x] blog-writer skill
  [x] cron: ma/wo/vr 9:57 auto-publish
  [x] Tailwind animaties gefixt (slide-up, fade-in, bounce-slow)
```

---

*CLAUDE.md versie: 2.8 | Project: amarenl.com | Framework: Next.js 16 App Router | Taal: NL*
*Laatste update: 19 mei 2026 (Product Link Fix + Makale #5) — Dual data layer doc ✅ | linkifyProductMentions fix ✅ | BlogAccordion fix ✅*

---

## 21. SESSIE — 18 mei 2026 (Blog Pipeline & Agent Keywords)

### Voltooid deze sessie
- [x] amarenl-agent-keywords.md projeye eklendi (12 makale prompt'u)
- [x] Makale #1: Vitamine D Tekort Symptomen → Sunrise ✅ (MDX + blog.ts)
- [x] Yayın takvimi: 2 günde bir (eski Ma/Wo/Vr yerine)
- [x] Cron: `57 9 */2 * *` → her 2 günde bir saat 9:57'de yeni makale
- [x] Build başarılı (sitemap güncellendi)

### 12 Makale Kuyruğu (amarenl-agent-keywords.md)
| # | Keyword | Ürün | Tarih |
|---|---------|------|-------|
| 1 | vitamine D tekort symptomen | Sunrise | ✅ 19 mei |
| 2 | beste probiotica 2026 | MentaBiotics | 21 mei |
| 3 | collageen supplement kopen | HL5 | 23 mei |
| 4 | ashwagandha kopen nederland | EDGE+ | 25 mei |
| 5 | gut brain connectie | Happy Juice Pack | 27 mei |
| 6 | haaruitval supplement vrouwen | HL5 | 29 mei |
| 7 | focus supplement | EDGE+ | 31 mei |
| 8 | hormoonbalans supplement vrouwen | Ignite HER | 2 jun |
| 9 | darmflora verbeteren | Restore | 4 jun |
| 10 | supplement routine ochtend | Triangle Xtreme | 6 jun |
| 11 | plantaardige proteïne shake kopen | Origin | 8 jun |
| 12 | menopauze supplement | Ignite HER | 10 jun |

### Huidige staat
- 11 blog MDX dosyası (6 eski + 5 agent serisi)
- 27 blog referansı lib/blog.ts'de (16 eski + 5 agent serisi + 6 pack)
- 43 ürün data/products/ içinde
- Cron: session-only (Claude çıkınca durur — persistent için ayarlanmalı)

---

## 22. SESSIE — 19 mei 2026 (Product Link Fix + Makale #5)

### Voltooid deze sessie
- [x] Makale #5: Gut-Brain Connectie → Happy Juice Pack ✅ (MDX + blog.ts + deploy)
- [x] **BUG FIX — Ürün linkleri görünmüyordu:**
  - `linkifyProductMentions()` "Amare" prefix'ini tanımıyordu → `<strong>Amare MentaBiotics</strong>` eşleşmiyordu
  - Çözüm: Fonksiyona `<strong>Amare ${productName}</strong>` ve standalone `Amare ${productName}` regex'leri eklendi
  - `BlogAccordion` hiç `linkifyProductMentions()` çağırmıyordu → blog listesinde linkler eksikti
  - Çözüm: `BlogAccordion`'a `linkifyProductMentions(post.content, post.slug)` eklendi
- [x] **GSC key bozuk** — ASN.1 seviyesinde kırık, yeni key gerekli (Google Cloud Console → yeni JSON key)
- [x] CLAUDE.md güncellendi — Dual data layer + makale checklist + ürün linkleme kuralları eklendi

### Kritik Dersler
1. **Makale HTML içeriğindeki ürün isimleri `articleProductMap` ile birebir eşleşmeli.** "Amare" prefix'i artık tolere ediliyor.
2. **Her makale yayınında 3 dosya değişir:** MDX + blog.ts (hem blogPosts hem articleProductMap)
3. **İki farklı render noktası var:** `[slug]/page.tsx` VE `BlogAccordion` — ikisi de `linkifyProductMentions` çağırmalı.
4. **MDX'teki `<AffiliateCTA>` component'i çalışmaz** — sayfalar blogPosts HTML'inden render ediliyor.

### 12 Makale Kuyruğu
| # | Keyword | Ürün | Tarih | Status |
|---|---------|------|-------|--------|
| 1 | vitamine D tekort symptomen | Sunrise | 19 mei | ✅ |
| 2 | beste probiotica 2026 | MentaBiotics | 21 mei | ✅ |
| 3 | collageen supplement kopen | HL5 2-Pack | 23 mei | ✅ |
| 4 | ashwagandha kopen nederland | EDGE+ | 25 mei | ✅ |
| 5 | gut brain connectie | Happy Juice Pack | 27 mei | ✅ |
| 6 | haaruitval supplement vrouwen | HL5 | 29 mei | ✅ |
| 7 | focus supplement | EDGE+ | 31 mei | - [ ] |
| 8 | hormoonbalans supplement vrouwen | Ignite HER | 2 jun | - [ ] |
| 9 | darmflora verbeteren | Restore | 4 jun | - [ ] |
| 10 | supplement routine ochtend | Triangle Xtreme | 6 jun | - [ ] |
| 11 | plantaardige proteïne shake kopen | Origin | 8 jun | - [ ] |
| 12 | menopauze supplement | Ignite HER | 10 jun | - [ ] |

---

## 19. SESSIE EINDE — 9 mei 2026

### Voltooid deze sessie
- [x] Fase 6 — Schema & Analytics (JSON-LD, GA4, Search Console)
- [x] Fase 7 — Affiliate Tracking (3 katman: localStorage + /go + return banner)
- [x] PromoCarousel (3 slide: Mei promo / Sunset / Rootist)
- [x] CampaignBanner güncellendi (gratis verzending + 10% abonnement)
- [x] .env.local met GA4 ID GT-MKTPDM2M
- [x] README.md herschreven
- [x] affiliate-tracking.md v1.1

### Nog te doen: 5 artikel schrijven (SEO-GEO-AEO)
3. Probiotica & stemming (gut-brain) — MentaBiotics
4. Vitamine D tekort in Nederland — Sunrise
5. Beste supplementen voor haar & nagels — HL5, Rootist
6. IJzer & vermoeidheid — VitaGBX
7. Natuurlijke vitamine C vs synthetisch — Sunrise

### Huidige staat
- 17 blog artikelen in lib/blog.ts
- 40 producten in lib/products.ts
- 5 categoriepagina's + /go + /go/[product]
- 3 skills (.claude/skills/)
- cron: article-scheduler ma/wo/vr 9:57
- 3-katman affiliate tracking
- PromoCarousel + CampaignBanner

---

## 20. HOTFIX SESSION — 9 mei 2026 (Stabilisatie)

### Fase 1: Tekstuele Fouten
| Bestand | Fout | Oplossing |
|---------|------|----------|
| HeroSection.tsx | "energie ve focus" | "energie en focus" ✓ |
| NewsletterForm.tsx | "nieuwsbrief ve blijf" | "nieuwsbrief en blijf" ✓ |
| FAQSection.tsx | "Alles ne wat je" | "Alles wat je" ✓ |
| BlogPreview.tsx | "as ve mentaal welzijn" | "as en mentaal welzijn" ✓ |
| HeroSection.tsx | Image path: `/amare_hero_wellness_science_1778148263726.png` | `/images/hero-wellness.png` ✓ |

### Fase 2: Security Fixes (CRITICAL)
| Issue | Bestand | Oplossing | Status |
|-------|---------|-----------|--------|
| 5 npm vulnerabilities | package.json | `npm audit fix --force` → Next.js 16.2.6 ✓ | ✅ |
| Next.js 16 breaking change | app/layout.tsx | Created ClientProviders wrapper for `ssr: false` ✓ | ✅ |
| Debug code in production | NewsletterForm.tsx L13 | Removed `console.log()`, added form validation ✓ | ✅ |
| XSS via dangerouslySetInnerHTML | app/blogs/nieuws/[slug]/page.tsx L110 | Added DOMPurify.sanitize() ✓ | ✅ |
| XSS via dangerouslySetInnerHTML | components/blog/BlogAccordion.tsx L55 | Added DOMPurify.sanitize() ✓ | ✅ |

### Code Changes Summary
1. **app/layout.tsx** — Removed `ssr: false` dynamic import (Next.js 16 incompatible)
2. **components/layout/ClientProviders.tsx** — NEW: Client Component wrapper for ExitIntentPopup
3. **components/sections/NewsletterForm.tsx** — Removed debug log, added email validation
4. **app/blogs/nieuws/[slug]/page.tsx** — Added DOMPurify import + sanitization
5. **components/blog/BlogAccordion.tsx** — Added DOMPurify import + sanitization
6. **package.json** → **package-lock.json** — Updated via `npm audit fix --force`

### Build Status ✅
- ✅ Build: Succesvol (Next.js 16.2.6)
- ✅ ESLint: 0 waarschuwingen
- ✅ TypeScript: Strict mode clean
- ✅ Dev Server: Running (localhost:3000)
- ✅ Sitemap: Automatisch gegenereerd (31 routes)
- ✅ No vulnerabilities (high-severity)

### Security Status
- ✅ XSS protection: HTML sanitization enabled
- ✅ Production debug code: Removed
- ✅ npm dependencies: Updated to latest (Next.js 16)
- ✅ Console clean in browser
- ⚠️ Newsletter: Still non-functional (Faz 2 todo)
- ⚠️ Email credentials: Missing in .env.local (Faz 2 todo)

### Deploy Ready: PRODUCTION STABLE ✅
- [x] Alle tekstuele fouten gecorrigeerd
- [x] Alle security fixes applied
- [x] XSS vulnerabilities patched
- [x] Debug code removed
- [x] npm audit critical fixed
- [x] Build succeeds without errors
- [x] Dev server runs without errors
- [x] CSS/Styling intact
- [x] JavaScript/React geen errors
- [x] Responsive design intact
- [x] Mobile CTA werkt
- [x] Affiliate links operationeel

### Volgende Fases (Optional — nog niet gestart)
- **Faz 2:** Newsletter integration (Mailchimp setup)
- **Faz 3:** Affiliate URL validation (40 product links)
- **Faz 4:** Blog image path validation

### Volgende Stap
Site is **PRODUCTION-STABLE en klaar voor Vercel deployment**:
```bash
git add . && git commit -m "Stabilization: security fixes, XSS protection, Next.js 16 upgrade"
git push origin main
```
