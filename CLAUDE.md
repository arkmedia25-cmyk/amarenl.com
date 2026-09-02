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
Framework:     Next.js 16 (App Router)
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
  [x] JSON-LD per paginatype (Organization, Article, FAQ, Product, BreadcrumbList)
  [x] Google Analytics 4 integratie (GT-MKTPDM2M)
  [x] Google Search Console verificatie (googlebc32e3c9c012a1b4.html)

Fase 7 — Automatisering (2026-05-09)
  [x] article-queue.md met 20 geplande artikelen
  [x] article-scheduler skill (.claude/skills/)
  [x] market-research skill
  [x] blog-writer skill
  [x] cron: ma/wo/vr 9:57 auto-publish
  [x] Tailwind animaties gefixt (slide-up, fade-in, bounce-slow)

Fase 8 — Deep Product Pages (TASK 2.1) — 2026-05-17
  [x] /happy-juice-pack — 1000+ woorden, Product+FAQ+Breadcrumb schema, 3 CTA posities
  [x] /mentabiotics — Cerebiome® blend, prebiotica, magnesium
  [x] /energy — Energy+ natuurlijke cafeïne, vitamine C, L-glycine
  [x] /hl5 — HL5 2-Pack collageen, 5g gehydrolyseerd collageen Type 1&3
  [x] /origin — Vegan proteïne shake, 23g plantaardig eiwit
  [x] /restore — Spijsverteringsenzymen, 5 probiotica stammen, lactase
  [x] /sunrise — 22 superfoods, 9 vitamines, morning blend
  [x] /fit20 — wei-isolaat + collageen, 21 aminozuren, magnesiumcitraat
  [x] /sunset — omega-3 avondformule, EPA 520 mg, DHA 223 mg, D3/A/E, astaxanthine
  [ ] /[10e product] — Skin to Mind of VitaGBX

Fase 9 — Data & Infrastructuur — 2026-05-17
  [x] 43 producten in individuele data/products/[slug].json
  [x] data/products.json geaggregeerde index (generate-product-index.ts)
  [x] Statische JSON import in lib/products.ts (client/server compatibel)
  [x] EFSA compliance scanner (scripts/efsa-audit.js)
  [x] Product URL validator (scripts/validate-products.js)
  [x] PostNL/shipping claims verwijderd (Amare handelt verzending)
  [x] Product dropdown menu in Header (desktop + mobiel, click-outside)
  [x] Affiliate URL fixes: ignite-him, ignite-her, skin-to-mind-neunight
  [~] verdikkend-serum-voor-fijn-haar → 500 error (Amare server-side)
```

---

*CLAUDE.md versie: 2.9 | Project: amarenl.com | Framework: Next.js 16 App Router | Taal: NL*
*Laatste update: 02 september 2026 — dode sectiereferenties gerepareerd, verouderde statusmeldingen
bijgewerkt, sessie-dagboek (sectie 19-30) ingekort met behoud van herbruikbare lessen per incident*

---

## 19-21. GEÇMİŞ OTURUM ÖZETİ (Content Orchestrator → Agency OS → Soro/checklist)

**Content Orchestrator (13 juni 2026) — VEROUDERD:** `server/` package (Node cron + Telegram bot) is
niet het actieve systeem. De echte automatisering draait via GitHub Actions (zie hieronder). Een aparte
Hermes-gateway LaunchAgent bestond ook nog kort, gestopt 28-07-2026.

**Huidige actieve pijplijn (Faz 1+2, GitHub Actions):**
- **Faz 1 — Telegram-onaygate:** artikel-workflows committen niet direct naar `main`. Ze openen een
  `draft/<slug>` PR, sturen een Telegram-bericht met ✅/❌ knoppen
  (`app/api/telegram/webhook/route.ts`), pas na goedkeuring merget/deployt
  `.github/workflows/amarenl-promote-draft.yml` automatisch.
- **Faz 2 — Claude API content-motor:** `scripts/generate-article-claude.mjs`, cron ma/wo/vr
  (`amarenl-article-claude.yml`). Kiest onderwerp uit `content/article-queue.md`, haalt PubMed-abstracts
  op als primaire bron voor claims, plus optionele context uit `tools/competitor-scraper/` (wekelijkse
  cron, vitaminstore.nl) en `tools/youtube-research/` (wekelijkse cron, YouTube Data API v3) — beide
  puur thema-inspiratie, nooit letterlijk overgenomen.
- **Telegram-approvalbericht bevat een checklist** (n.a.v. Soro-onderzoek 21-08: het enige dat
  consistent goede van slechte AI-SEO-content onderscheidt bleek menselijke review vóór publicatie, geen
  geheime techniek): woordaantal, bron/citatie-check, categorie-overlap, en een harde onderwerp-cluster-
  limiet (`TOPIC_CLUSTER_LIMIT = 3`) die een run bewust overslaat i.p.v. het zoveelste artikel binnen
  een oververtegenwoordigd kernwoord te publiceren — later verder gehard, zie sectie 26.

**Opgeloste incidenten — bewaard voor als het weer gebeurt:**
- *Telegram-PR bleef open ondanks ❌-klik (28-07):* webhook bleek prima te werken — een directe
  curl-call met het juiste `TELEGRAM_WEBHOOK_SECRET` sloot de PR meteen. Vermoedelijk menselijke
  misklik, geen codefout. **Bij herhaling:** test eerst de webhook direct met curl vóórdat je dieper
  zoekt.
- *Vercel free-plan upload-limiet geraakt (28-07, herhaald 30-07):* te veel test-deploys op één dag →
  `DeploymentError: api-upload-free`, 24u block (merges lukken wel, deploy niet). **Bij herhaling:**
  `vercel ls` voor laatste succesvolle deploy-tijd, na 24u `gh run rerun <run-id> --failed`, overweeg
  Vercel Pro als dit vaker voorkomt.
- *Higgsfield-accountverwarring (29-07 → opgelost 27-08):* OAuth koppelde eerst een proefaccount i.p.v.
  het bedoelde account; geen in-sessie manier om te wisselen (vereist MCP-server loskoppelen/opnieuw
  verbinden). **Bij een nieuwe integratie:** vraag ALTIJD vooraf welk account/e-mailadres gekoppeld moet
  worden, vóór de OAuth-flow start.
- *Lead-capture 500-error op alle 6 formulieren (07-08, gefixt):* `fs.writeFileSync` naar
  `data/subscribers.json` crashte op Vercel's read-only serverless filesystem, en de MailerLite-call
  gebruikte een group-**slug** (`nl-audience`) i.p.v. de numerieke group-id die de API verwacht — beide
  gefixt in `app/api/subscribe/route.ts` (group-id nu `185294849333790257`), live geverifieerd met een
  test-submit.
- *GSC trailing-slash duplicate URL's (30-07, **nog NIET opgelost** — geverifieerd 02-09-2026):*
  `/happy-juice-pack` vs `/happy-juice-pack/` (en vergelijkbare paren) splitsen het ranking-signaal.
  Geen `trailingSlash`-config in `next.config.mjs`, geen redirect ervoor in `vercel.json`. Fix: kies één
  vorm, zet die expliciet in `next.config.mjs`, en redirect de andere.

**Huidige status per fase:**
- **Faz 3 (Higgsfield):** betaald Starter Plan actief ($15/mo, workspace "ARK Media"), niet meer
  accountgeblokkeerd. Credits op tot cyclus ververst **4 september 2026**. Gekozen flow:
  ugc-product-flow (product-only, voiceover, geen nep-testimonial — bewuste ACM/NVWA-keuze).
- **Faz 4 (Pinterest):** infrastructuur volledig gebouwd (`content/pinterest-queue.json`,
  `scripts/pinterest-queue-notify.mjs`, Telegram ✅/❌-integratie), **wacht op Pinterest Standard
  access-goedkeuring** (app 1582959 — Trial-toegang staat de OAuth `pins:write`-flow nog niet toe).
  Activatiestappen zodra goedgekeurd:
  1. Check status op `developers.pinterest.com/apps/1582959/`.
  2. OAuth-flow met scope `pins:read,pins:write,boards:read`.
  3. Zet `PINTEREST_ACCESS_TOKEN`/`PINTEREST_REFRESH_TOKEN` als Vercel production env var.
  4. Maak de 5 boards aan (namen in `content/PINTEREST_PLAN.md`).
  5. Trigger `amarenl-pinterest-queue.yml` handmatig of wacht op de cron (ma/wo/vr/za 09:00).
- **Faz 5 (Meta Ads):** plan vastgelegd, **nog niet gestart**. Budget €10-15/dag, Leads-objective op
  `/gratis-gut-brain-gids`, bestaande Pixel/CAPI-tracking geverifieerd werkend (test-POST naar
  `/api/capi-event` gaf `{"ok":true}`). 2 creatives gekozen: **A** (symptoom+mechanisme,
  gut-brain-illustratie) en **B** (nieuwsgierigheid/vraag, gids-mockup) in
  `content/meta-ads-drafts/` — variant C afgevallen. Volgende stap: ad-account onder bestaande
  Business Manager koppelen (handmatig, geen Marketing API-koppeling deze sessie).

**Techniek-noot voor toekomstige Cowork-device-bridge-sessies:** `git cherry-pick` binnen een
`git worktree` faalde herhaaldelijk op een FUSE-mount lock (`index.lock` kon niet unlinked worden, ook
niet met de `mv`-workaround die bij een gewone commit wél werkt — cherry-pick doet intern een tweede
geneste git-aanroep die de lock opnieuw pakt). **Workaround:** commit direct op de branch i.p.v.
cherry-picken tussen worktrees, of gebruik `gh api` om de commit remote te maken.

---

## 25. COLLAGEEN-CLUSTER — DEFINITIEF CONSOLIDATIE-PLAN MET ECHTE GSC-DATA (3 maanden) — 22 augustus 2026

**Context:** een eerdere sessie-analyse vlagde dit als het grootste cannibalisatie-probleem (~25 artikelen);
dat bleef openstaan na Hermes' PR-batch #38-45 (o.a. magnesium-dedupe, stress/burn-out-fix,
collageen-verdieping, 5 EFSA-fixes). Vandaag verse, exacte GSC-data
opgehaald (Search Console → Performans → Filtre ekle → Sayfa → "Şunu içeren URL'ler" → "collageen" → tab
"Sayfa sayısı", periode 3 maanden) om dit van "waarschijnlijk probleem" om te zetten in een direct
uitvoerbaar plan met echte URL's en cijfers — geen giswerk meer.

**Cluster-totaal (3 maanden, alle collageen-URL's samen):** 325 vertoningen, **1 klik**, CTR 0,3%,
gemiddelde positie **51,3**. Dat is pagina 5+ van Google — praktisch onzichtbaar, ondanks dat er 16 losse
artikelen voor deze zoekintentie met elkaar concurreren.

**Per-pagina werkelijkheid — dit zijn de ENIGE 11 URL's (van 16 in `data/extra-articles.json` + 3 extra in
`lib/blog.ts`, dus 19 totaal) die überhaupt vertoningen krijgen:**
1. `/blogs/nieuws/collageen-essentieel-voor-huid-haar-nagels` — 150 vertoningen — bestaat niet meer als
   levende pagina, staat al permanent (301) geredirect naar `vloeibaar-collageen-hl5-huid-haar-nagels` in
   `vercel.json`. Google toont de oude URL in GSC nog met vertoningen, maar dat verkeer landt al op de
   redirect-bestemming.
2. `collageen-mannen-30-huid-gewrichten-spierherstel` — 100 vertoningen (in JSON, auteur + 1 citatie aanwezig)
3. `collageen-poeder-vs-pillen-vergelijking` — 27 vertoningen (in JSON, auteur + 1 citatie aanwezig)
4. `vloeibaar-collageen-hl5-huid-haar-nagels` — 23 eigen vertoningen + 150 binnenkomend via de redirect
   hierboven = **feitelijk de sterkste pagina van de hele cluster** (in JSON, auteur + 2 citaties, al
   verdiept van 374 → 968 woorden op 20-08, commit `d195c1c`)
5. `mijn-ervaring-collageen-6-maanden` — 12 vertoningen (alleen in `lib/blog.ts`, niet in de JSON)
6. `collageen-gewrichten-pijnverlichting-supplement` — 4 vertoningen (in JSON, GEEN auteur/citatie)
7. `collageen-poeder-vs-vloeibaar-wat-is-beter` — 3 vertoningen (in JSON, GEEN auteur/citatie)
8. `fit20-whey-isolaat-collageen-spierherstel-review` — 2 vertoningen (in JSON, GEEN auteur/citatie, staat
   bovendien in de verkeerde categorie "gewichtsbeheer" i.p.v. "schoonheid")
9. `collageen-poeder-kopen-waar-op-letten` — 2 vertoningen maar wel **de enige klik in 3 maanden** van de
   hele cluster (alleen in `lib/blog.ts`)
10. `hl5-2-pack-collageen-huid-haar-nagels-beste-waarde` — 1 vertoning (alleen in `lib/blog.ts`)

**De overige 10 artikelen uit `data/extra-articles.json` krijgen NUL vertoningen in 3 maanden — volledig
onzichtbaar voor Google:** `collageen-de-complete-gids-2026`, `collageen-peptiden-werkt-echt-wetenschap-
resultaten`, `collageen-type-1-2-3-verschil-huid-gewrichten-haar`, `collageen-vitamine-c-synergie-huid`,
`collageen-resultaten-4-8-12-weken-huid-haar-nagels`, `collageen-bijwerkingen-veilig`, `welke-voeding-
collageen-gids`, `rundercollageen-vs-marine-collageen-verschil`, `collageen-hyaluronzuur-combinatie`,
`plantaardig-collageen-bestaat-dat-echt`.

### Concreet voorstel (klaar om uit te voeren)

**Pilaar/autoriteitspagina:** `vloeibaar-collageen-hl5-huid-haar-nagels` — al de sterkste pagina, al
verdiept, ontvangt al redirect-verkeer van de oude URL.

**Laten bestaan als aparte spoke** (duidelijk andere zoekintentie, eigen echte traffic — niet mergen):
`collageen-mannen-30-huid-gewrichten-spierherstel` (mannen-invalshoek, 100 vertoningen) en
`collageen-poeder-vs-pillen-vergelijking` (vergelijkings-intentie, 27 vertoningen). Wel prominent hub-spoke
linken naar/vanaf de pilaarpagina — exact hetzelfde patroon als vandaag al toegepast op
adaptogenen/gut-brain-axis/probiotica-stammen (commit `034d1d4`).

**301-redirecten naar de pilaarpagina + unieke content erin overnemen (13 artikelen weg):** de 10
nul-vertoning artikelen hierboven + `collageen-gewrichten-pijnverlichting-supplement` (4 vertoningen) +
`collageen-poeder-vs-vloeibaar-wat-is-beter` (3, overlapt inhoudelijk met poeder-vs-pillen) +
`fit20-whey-isolaat-collageen-spierherstel-review` (2, hoort qua categorie sowieso niet in de
schoonheid-cluster thuis).

**Apart beoordelen, niet zomaar mergen:**
- `mijn-ervaring-collageen-6-maanden` (12 vertoningen, testimonial-format) — kan als eigen "ervaring"-spoke
  blijven bestaan, of als sectie in de pilaarpagina verwerkt worden.
- `collageen-poeder-kopen-waar-op-letten` — dit is de ENIGE pagina met een klik in 3 maanden. Niet zomaar
  weg-redirecten; zorg dat de rankende content (en de zoekterm die 'm die klik oplevert) behouden blijft in
  de bestemmingspagina.
- `hl5-2-pack-collageen-huid-haar-nagels-beste-waarde` (1 vertoning) — mogelijk een productpagina-variant;
  checken of dit dubbel is met `/hl5`.

**Verwacht resultaat:** van 19 losse collageen-artikelen (16 JSON + 3 `lib/blog.ts`) naar 3-4 levende
pagina's + gerichte 301's. Geconcentreerd linksignaal en contentdiepte zou de gemiddelde positie van 51,3
significant moeten verbeteren voor de overgebleven pagina's.

**Technische uitvoering:**
1. Nieuwe `permanent: true` redirects toevoegen in `vercel.json` voor de 13 te verwijderen slugs →
   `destination: /blogs/nieuws/vloeibaar-collageen-hl5-huid-haar-nagels`.
2. Entries verwijderen uit `data/extra-articles.json` (en `lib/blog.ts` waar van toepassing) — vóór
   verwijderen: grep elke slug in `app/`/`data/` om interne links te vinden die ernaar verwijzen en die
   bijwerken naar de pilaarpagina.
3. Waar een artikel unieke, niet-overlappende informatie bevat (bv. een specifieke studie, een andere
   dosering-tip), die inhoud overnemen in de pilaarpagina vóór je de bron-pagina redirect — anders gaat die
   informatie verloren.
4. Na deploy: `npm run build` / `npx tsc --noEmit` clean, en handmatig GSC "Dizine eklenmesini iste"
   aanvragen voor de pilaarpagina (GSC-indexeringsquotum is beperkt — bewaar het hiervoor).

**Methode voor toekomstige cluster-checks (herbruikbaar voor stress/slaap-clusters):** Search Console →
Performans → Filtre ekle → Sayfa → "Şunu içeren URL'ler" → typ het cluster-trefwoord → tab "Sayfa sayısı"
geeft direct de per-URL vertoning/klik/CTR-tabel over de gekozen periode. Sneller en preciezer dan aannames
over welke artikelen "waarschijnlijk" cannibaliseren. Stress-cluster en slaap-cluster zijn inmiddels
beide geconsolideerd (PR #75: 7→3 pagina's; PR #71: 4 interne links) — dit was het te volgen voorbeeld
voor toekomstige clusters.

---

## 26. HARDE ONDERWERP-CLUSTER GRENS — voorkomt een nieuwe collageen-situatie (22 augustus 2026)

**Aanleiding:** de collageen-cluster (19 artikelen, gemiddelde Google-positie 51) bleek geen incident
maar het resultaat van hoe `scripts/generate-article-claude.mjs` werkte — zachte prompt-instructies
("kies geen overlappend onderwerp") bleken op dit schaalniveau AANTOONBAAR onvoldoende, ook na een
eerdere zachte patch (het "Collageen voor Mannen 30+" driemaal-incident van 11-08, PR #23/#24/#25).

**Geïmplementeerd — ✅ live (bevestigd 02-09-2026):** een programmatische, niet-onderhandelbare poort in
`generate-article-claude.mjs`: `extractKeywords()` haalt kernwoorden uit een titel,
`checkTopicClusterLimit()` blokkeert een onderwerp zodra een kernwoord al in `TOPIC_CLUSTER_LIMIT`
(= 3) bestaande titels voorkomt. Eén herkansing met het kernwoord uitgesloten; lukt dat niet, dan slaat
de run zichzelf bewust over (`skipped=true`) i.p.v. het zoveelste cluster-lid te publiceren.
`.github/workflows/amarenl-article-claude.yml` is meegewerkt met bijbehorende `if: skipped != true`
guards per stap en een aparte rustige "skipped"-Telegram-melding naast de 🚨 KRİTİK-faalmelding
(voorkomt een vals alarm bij elke bewuste skip) — geverifieerd aanwezig in het huidige workflow-bestand.

**Limiet aanpasbaar:** `TOPIC_CLUSTER_LIMIT = 3` in `generate-article-claude.mjs` — verhogen als dit
later te streng blijkt (een cluster met 3 legitiem verschillende invalshoeken), verlagen als er nóg een
sluipende cluster ontstaat ondanks deze grens.

---


## 27. TRIANGLE OF WELLNESS XTREME — ondervertegenwoordigd in cross-sell (22 augustus 2026)

Musa wees erop dat `/triangle-of-wellness-xtreme` (dag-nacht bundel: Sunrise + Nitro Xtreme + Sunset,
€123,55/maand) een van de belangrijkste producten van de site is maar te weinig naar voren komt.
Gecontroleerd: het product staat wél al op de homepage (`FeaturedProducts`, 3e van 3 uitgelichte
producten), heeft een eigen pagina en een compleet record in `data/products.json`. Het echte gat zat in
`lib/blog.ts`'s `articleProductMap` — de per-artikel "Aanbevolen Producten"-widget onderaan elk
blogartikel: van 55 artikel-entries noemde slechts 4 Triangle of Wellness, tegenover MentaBiotics (19),
HL5 (14), Sunrise/Sunset (10 elk). Het ontbrak zelfs op `supplementen-voor-meer-energie-dit-werkt-echt` —
het artikel dat zowel vanuit de homepage-"Symptoom Wijzer" ("😴 Altijd moe?") als vanuit "Meest Gelezen
Artikelen" wordt gelinkt, dus een van de best bezochte pagina's van de site.

**Fix (lib/blog.ts, gecommit):** Triangle of Wellness Xtreme toegevoegd als extra aanbevolen product aan
3 relevante, al bestaande artikel-entries (alleen toegevoegd, niets verwijderd):
`supplementen-voor-meer-energie-dit-werkt-echt`, `altijd-moe-ontdek-hoe-cel-energie-jouw-
energieniveau-bepaalt`, `ijzer-tekort-vermoeidheid-supplement-nederland` — alle drie energie/vermoeidheid-
thema, waar de "complete dag-nacht energie"-positionering van het pakket direct relevant is. Format
identiek aan bestaande entries gekopieerd. Geverifieerd met `npx tsc --noEmit` (schoon, geen errors).

**Bewust niet gedaan:** niet aan alle 55 artikelen toegevoegd — dat zou de widget spammy maken en het
signaal voor écht relevante producten verzwakken. Alleen toegevoegd waar de dag-nacht/energie-positionering
inhoudelijk klopt. Als Musa dit breder wil (bv. ook bij stress- of slaap-artikelen), is dat een kleine
vervolgstap in hetzelfde bestand.

**Aparte observatie, niet actie ondernomen:** `"b-vitamines-energie-supplement-nederland"` heeft een LEGE
product-array (`[]`) — geen enkel aanbevolen product op dat artikel. Los probleem, niet gerelateerd aan
Triangle of Wellness, maar wel een gemiste conversiekans — waard om ook te vullen.

---

## 28. HOMEPAGE PRODUCT-CAROUSEL + COMMIT VASTGEZET OP VERKEERDE BRANCH (22 augustus 2026)

**Aanleiding:** Musa vroeg om de homepage-banner ("slayd banner") aantrekkelijker te maken en de
belangrijke producten erin te tonen, met de expliciete eis dat dit de site niet trager mag maken.

**Wat is gebouwd (`components/sections/PromoCarousel.tsx`):** de bestaande, dependency-vrije carousel
(die al vlak onder `FeaturedProducts` op de homepage staat) is uitgebreid van 3 tekst-only promoslides
naar 5 productslides met echte productfoto's: **Triangle of Wellness Xtreme** (eerst, per sectie 27 —
was ondervertegenwoordigd), Happy Juice Pack®, HL5™, MentaBiotics®, Sunset. Elke slide: productfoto
(96px, `next/image` met `fill` + vaste `sizes="96px"` in een `w-20/w-24`-vaste container — geen CLS),
badge, titel, subtitel, prijs, CTA-knop die naar de bestaande interne productpagina linkt (niet direct
naar de affiliate-link — de productpagina heeft zelf al de juiste `AffiliateCTA`, schema, FAQ).

**Performance-eis geborgd, geen nieuwe afhankelijkheid:**
- Nog steeds 100% dependency-vrij (geen swiper/slick/embla toegevoegd — `package.json` ongewijzigd op
  dat vlak) — pure React state, zelfde mechaniek als voorheen.
- Nog steeds single-slide-in-DOM: alleen `slides[current]` rendert, dus maar 1 productfoto tegelijk
  wordt opgehaald — niet alle 5 vooraf.
- Geen `priority` op de afbeeldingen (de carousel staat niet in de LCP-kritische zone — `HeroSection`
  heeft al `priority`, `FeaturedProducts` erboven ook niet) — standaard lazy-loading van `next/image`.
- `amarecdn.azureedge.net` stond al in `next.config.mjs`'s `images.remotePatterns`, dus Next's eigen
  image-optimizer (resize naar de daadwerkelijke 96px-weergavegrootte i.p.v. de volledige 800px bron)
  werkt automatisch — minder bytes dan voorheen zelfs, niet meer.

**Geverifieerd:** `npx tsc --noEmit --skipLibCheck -p tsconfig.json` → exit 0, leeg, 0 fouten.

**Branch-verwarring (2e keer, opgelost):** deze sessie's commit (`657fe98`) belandde per ongeluk op een
losstaande `draft/readme-pillar-done`-branch i.p.v. `main` (device-bridge stond niet op `main`
uitgecheckt). Later alsnog gepusht en gemerged als PR #66 (24-08). **Vaste regel om herhaling (dit was
al de 2e keer) te voorkomen:** elke Cowork-device-bridge-sessie start met `git checkout main && git
pull` vóór er iets gecommit wordt.

**Device-bridge techniek-noot:** `nohup ... & disown` om `tsc` op de achtergrond te draaien overleeft
de sandbox niet (elke tool-aanroep draait in een eigen `bwrap`-sandbox die kindprocessen hard beëindigt
bij afsluiten). **Werkt wel:** synchroon draaien binnen één aanroep met `timeout 43` +
`--skipLibCheck`.

---

## 29. COLLAGEEN-CLUSTER CONSOLIDATIE UITGEVOERD + KRITIEKE ONTDEKKING: ONGECONTROLEERDE
AUTO-PUBLISH-PIJPLIJN (23 augustus 2026)

**Context:** een onafhankelijke audit over alle 155 live titels bevestigde de collageen-cluster
(24 artikelen, zie sectie 25) plus kleinere near-duplicate-clusters rond vitamine D/probiotica.

**Uitgevoerd:** 12 artikelen omgeleid naar de pillar-pagina `vloeibaar-collageen-hl5-huid-haar-nagels`
(hun unieke feiten eerst overgenomen — 4 nieuwe secties + 2 FAQ's toegevoegd, content 6935→9987
tekens), 1 artikel omgeleid naar `/fit20` (whey/spierherstel-onderwerp hoort daar topisch beter). 3
dode interne links in 2 overlevende artikelen hersteld naar de pillar-URL. Resultaat:
`data/extra-articles.json` 99→86 entries, `vercel.json` +13 permanente redirects.

**Kritieke ontdekking: `server/auto-publish.ts`** — een volledig aparte, ongecontroleerde
publicatie-pijplijn (leest `data/staging/*.json`, publiceert zonder EFSA-/duplicate-check, direct naar
`git push` + `vercel --prod`) die 8 klaarstaande artikelen bevatte, waaronder een exacte duplicaat van
een net-verwijderde collageen-slug. **Genomen actie:** alle 9 bestanden verplaatst naar
`data/staging/_archived-duplicate-risico-22-08/` (niets verwijderd, niet-destructief) zodat het script
niets meer vindt om te publiceren. Status van het script zelf: zie 29.6 hieronder.

**Git-les:** `git add -A && git commit` liet onder zware lock-contentie stil wijzigingen aan 2 bestanden
vallen zonder foutmelding (commit "slaagde" maar bevatte ze niet — pas zichtbaar via
`git diff --stat HEAD~1 HEAD`). **Les:** vertrouw na een commit tijdens lock-contentie nooit alleen op
exit-code 0 — controleer met `git diff --stat` tegen de parent-commit.

### 29.5 Status: ✅ gepusht en gemerged

`draft/readme-pillar-done` (sectie 26-28, carousel + cluster-gate + Triangle-of-Wellness) en
`draft/collageen-cluster-consolidatie` zijn allebei gepusht en gemerged naar `main`
(PR #66 resp. #64, beide 24-08-2026) — geverifieerd via `gh pr list`.

### 29.6 Openstaand — belangrijk actiepunt voor Musa/Hermes

**Update 02-09-2026 — geverifieerd op de echte Mac:** `crontab -l`, `pm2 list`, `launchctl list` en de
LaunchAgent-plists doorzocht op `auto-publish` — geen enkele treffer. Alleen twee Hermes-gateway-agents
(Python venv) en de `com.amarenl.analytics.competitor-ads`-cron draaien; `server/auto-publish.ts` staat
nergens gepland. Risico bevestigd inactief — geen actie nodig, tenzij iemand de gearchiveerde
staging-map bewust weer in gebruik neemt (zie hierboven, dan eerst dezelfde EFSA-/duplicate-checks
toevoegen als de hoofdpijplijn).

**Nog niet aangepakt (destijds bewust buiten scope):** de near-duplicate-clusters rond magnesium,
vitamine C en probiotica/darmflora die in de onafhankelijke audit naar voren kwamen — alleen het risico
dat de staging-queue ze zou *verergeren* was voorlopig gedeactiveerd. **Update:** de vitamine D-cluster
is inmiddels wél geconsolideerd (PR #74, 5→2 pagina's), net als stress/slaap-cluster (PR #75/#71) en de
auteur/citatie-batch (11 PR's, alle categorieën). Nog steeds open: magnesium, vitamine C,
probiotica/darmflora, dode `.mdx`-bestanden in `content/blog/`, de losstaande `seo-aeo-overhaul`-branch,
`/probiotica-stammen`-herindexering, en het lege productaanbevelingen-array in
`b-vitamines-energie-supplement-nederland` (sectie 27).

### 29.7 Hermes had parallel óók al doorgepakt — ✅ beide veilig gemerged

Hermes' eigen branch `draft/dedupe-batch1` verwerkte parallel 9 van de 14 gevonden clusters
(immuunsysteem, probiotica, darmflora, haaruitval, energy+, + 3 dunne-stub-redirects) — onafhankelijk
geverifieerd (tsc clean, geen dode links, redirects bestaan echt) en veilig naast dit werk gemerged
(PR #50, 23-08). Het enige overlap-punt (`data/staging/007-ijzertekort-supplementen.json`, door beide
branches aangeraakt) is bij de merge correct opgelost — bestand staat nu op het gearchiveerde pad
(geverifieerd 02-09-2026). Magnesium zat niet in deze batch — zie 29.6 voor actuele open clusters.

---

## 30. KRITIEKE BUG: TOEKOMSTIGE PUBLICATIEDATA OP HOMEPAGE (23 augustus 2026)

**Melding van Musa:** de homepage toonde bij artikelen een publicatiedatum van "26 oktober 2026",
terwijl de kalender nog maar 23 augustus 2026 aangaf. Gescand: alle 155 artikelen — **23 artikelen in
`data/extra-articles.json`** hadden een datum tot 2 maanden in de toekomst (`lib/blog.ts` was schoon,
het probleem zat uitsluitend in de automatisch-gegenereerde cluster-batches).

### 30.2 Grondoorzaak

`getAllBlogPosts()` in `lib/blog.ts` sorteert alle artikelen op `date` **aflopend** en toont ze
allemaal onmiddellijk — er bestaat **geen enkele gating-logica** die een artikel pas zichtbaar maakt
op of na zijn eigen `date`-veld. De cluster-batch-commits (bijv. `e478516`, "probiotica-kümesi 5
nieuwe... uit het geplande content-kalender") wezen bewust *toekomstige, gespreide* datums toe — een
poging om een natuurlijk publicatietempo te simuleren voor een "content kalender". Maar omdat de site
alles onmiddellijk toont, zodra zo'n batch commit richting `main` gaat, springen die
toekomst-gedateerde artikelen met de nieuwste datum meteen bovenaan de homepage — precies wat Musa zag.

**Dit raakte niet alleen de zichtbare weergave.** Dezelfde `date`-waarde wordt ook gebruikt voor:
`openGraph.publishedTime`, JSON-LD `datePublished` (in zowel het artikel-schema als het
blog-listing-schema), en `sitemap.xml`'s `lastmod` (via `next-sitemap.config.js`). Een toekomstige
`datePublished` in structured data is voor Google potentieel **schadelijker** dan de zichtbare bug —
het kan wijzen op spam/onbetrouwbare content-signalen bij een YMYL-site.

### 30.3 Fix — uitgevoerd op branch `draft/fix-future-dates` (commit `64b21e1`)

Gebaseerd op `origin/main` (`3be0ae9`), via `git worktree` (zelfde techniek als sectie 28/29).

**1. Databron gerepareerd:** de 23 foute datums herverdeeld over de laatste 23 dagen t/m gisteren
(22-08-2026), met behoud van hun onderlinge (foute) volgorde — het artikel met de verste toekomstdatum
kreeg de meest recente nieuwe datum, enzovoort. Dit repareert de sortering én de OG/JSON-LD/sitemap-
metadata in één keer. `data/extra-articles.json` blijft 99 entries — er is niets verwijderd, alleen
`date`-velden gecorrigeerd.

**2. Zichtbare datumweergave volledig verwijderd** (op expliciet verzoek van Musa, als permanente
bescherming tegen een herhaling van deze bugklasse, ook als een toekomstige batch-generatie opnieuw
een foute datum zou toewijzen):
- `components/sections/BlogPreview.tsx` (homepage "Wellness Tips & Insights") — Calendar-icoon +
  datumregel onder de excerpt verwijderd.
- `components/blog/BlogAccordion.tsx` (blog-overzichtspagina, `/blogs/nieuws`) — datumregel onder de
  titel verwijderd.
- `app/blogs/nieuws/[slug]/page.tsx` (artikelpagina) — datumbadge in de header verwijderd.

**Bewust NIET verwijderd:** `post.date` in `openGraph.publishedTime` en de JSON-LD `datePublished`-
velden blijven bestaan — die zijn onzichtbaar voor bezoekers maar nuttig voor Google, zolang de
onderliggende waarde klopt (wat nu het geval is na stap 1).

**Geverifieerd:** `npx tsc --noEmit --skipLibCheck` clean (0 fouten). Nul artikelen met een
toekomstige datum meer in `data/extra-articles.json` (was 23, nu 0). Grep-sweep over alle
`app/`/`components/`-bestanden bevestigt geen andere plek meer waar `post.date` zichtbaar gerenderd
wordt.

### 30.4 Merge-conflict met de collageen-consolidatie — ✅ correct opgelost

5 van de 23 datum-gecorrigeerde slugs overlapten met slugs die `draft/collageen-cluster-consolidatie`
(sectie 29.2) naar de pillar-pagina omleidde. Bij de merge is de verwijdering geaccepteerd (het
artikel bestaat niet meer los, dus de datum-fix was toch niet meer relevant) — bevestigd correct:
collageen-cluster staat nu op 3 slugs (geverifieerd 02-09-2026).

### 30.5 Grondoorzaak nog niet structureel opgelost — actiepunt voor Hermes

Deze fix repareert de bestaande 23 datums en verbergt de weergave overal, maar **lost niet op** dat een
toekomstige cluster-batch-generatie opnieuw een datum in de toekomst zou kunnen toewijzen (de
onzichtbare OG/JSON-LD-metadata zou dan opnieuw fout zijn, ook al valt het bezoekers niet meer op).
Aanbeveling voor wie het volgende cluster-batch-script schrijft of aanpast: wijs nooit een `date` toe
die verder in de toekomst ligt dan vandaag — gebruik `new Date().toISOString().slice(0,10)` (zoals
`scripts/generate-article-claude.mjs` al correct doet, zie regel 617) in plaats van een vooruit-
geplande "content kalender"-datum, tenzij er ook een echt gating-mechanisme in `getAllBlogPosts()`
wordt gebouwd dat toekomstige artikelen pas toont op hun eigen datum.

### 30.6 Status: ✅ gepusht en gemerged

`draft/fix-future-dates` is gepusht en gemerged naar `main` (PR #51 + PR #52, 23-08-2026) — net als
`draft/readme-pillar-done`, `draft/collageen-cluster-consolidatie` en Hermes' `draft/dedupe-batch1`
(sectie 29.7). Alle vier geverifieerd via `gh pr list`.

### 30.7 Kleine opruiming: kapotte git-ref — ✅ inmiddels vanzelf opgelost

Tijdens die sessie ontstond per ongeluk een kapot bestand `.git/refs/heads/draft/collageen-cluster-
consolidatie.lock.old` (0 bytes, restant van een lock-recovery `mv` in sectie 28/29) dat `git branch
-a`/`git fetch --all` deed falen met `fatal: bad object refs/heads/...`. Kon niet verwijderd worden
vanuit deze sessie (FUSE-bridge "Operation not permitted", zelfs met `mv`). **Update 02-09-2026:**
geverifieerd op de echte Mac — `.git/refs/heads/draft/` bestaat niet meer en er staan geen
worktrees geregistreerd (`git worktree list` toont alleen de hoofd-checkout). Al opgelost, geen actie
meer nodig.
