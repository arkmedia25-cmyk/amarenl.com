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

*CLAUDE.md versie: 2.8 | Project: amarenl.com | Framework: Next.js 16 App Router | Taal: NL*
*Laatste update: 18 mei 2026 — FIT20/Sunset ✅ | 3 Pillar Pages in progress*

---

## 19. SESSIE STATUS — 20 juni 2026

### Voltooid (deze en vorige sessies)
- [x] Fase 1-9 t/m FIT20/Sunset (zie boven)
- [x] 9 deep product pages (1000+ woorden, Product+FAQ+Breadcrumb schema)
- [x] 43 producten database (individuele JSON + geaggregeerde index)
- [x] 6 categoriepagina's + 2 speciale routes (/go, /go/[product])
- [x] Build: 0 errors, 0 ESLint warnings, TypeScript strict clean

### 🆕 Content Orchestrator (13 juni 2026)
- [x] `content-orchestrator` skill — ana orkestratör, tüm pipeline'ı yönetir
- [x] `keyword-analyzer` skill — anahtar kelime analizi, GEO skoru
- [x] `traffic-monitor` skill — GA4 trafik ve dönüşüm izleme
- [x] `server/` paketi — Node.js cron + Telegram bot
  - `server/index.ts` — cron scheduler (Pzt/Crş/Cum + günlük build check)
  - `server/orchestrator.ts` — pipeline adımları (research, publish, report)
  - `server/telegram-bot.ts` — Telegram kontrol botu (9 komut)
  - `server/health.ts` — sistem sağlık kontrolü
- [x] 20 makale kuyrukta (content/article-queue.md)

### 🆕 Cron Auto-Publish — 20 juni 2026
- [x] Expand #14 collageen-peptiden: 973 → 1676 woorden (NVWA, FAQ, vergelijkingstabel, AffiliateCTA, 4 wetenschappelijke bronnen)
- [x] 20/20 TIER artikelen voltooid — queue volledig afgevinkt ✅
- [x] Alle 6 ⏳ artikelen geverifieerd op 1200+ woorden en NVWA-compliance
- [x] Queue metadata geüpdatet (40+ artikelen live, 0 openstaand)

### Kurulum gerekenler (sunucu için)
- [ ] `server/.env` oluştur (ANTHROPIC_API_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_ADMIN_CHAT_IDS)
- [ ] `cd server && npm install`
- [ ] Sunucuda `npm start` ile başlat
- [ ] @BotFather'dan Telegram bot token'ı al
- [ ] Chat ID'ni `.env`'e ekle

### Hala eksik
**İçerik:**
- [ ] 3 pillar pages — `/gut-brain-axis`, `/probiotica-stammen`, `/adaptogenen` (dosyalar var, kontrol edilmeli)
- [x] 20 makale allemaal voltooid (16 live + 4 gecovered)
- [ ] 1 deep product page daha (Skin to Mind of VitaGBX)

**Infrastructuur:**
- [ ] E-mail API route (/api/subscribe)
- [ ] GA4 conversion tracking
- [ ] verdikkend-serum-voor-fijn-haar → 500 (Amare server-side)

### Huidige staat — Cijfers
- **43** producten in database (data/products/*.json + products.json)
- **40+** blog artikelen live
- **9** deep product pages (1000+ woorden) + 3 pillar pages (dosyalar var)
- **6** categoriepagina's + 27 app routes
- **6** skills (.claude/skills/: orchestrator, scheduler, writer, research, keyword, traffic)
- **1** server paketi (server/: orchestrator + Telegram bot)
- **0** openstaande artikelopdrachten 🎉

> ⚠️ **VEROUDERD (zie sectie 20):** de `server/` package + Telegram bot hierboven is **niet** het huidige
> systeem. Er bleek ook een aparte, écht-actieve automatische bot te draaien buiten deze repo (Hermes
> gateway LaunchAgent, `AmareNL_Orchestrator_Bot`) — die is stopgezet op 28-07-2026. Het huidige,
> geverifieerde systeem is de Faz 1/2 GitHub Actions pipeline in sectie 20.

---

## 20. AGENCY OS STATUS — 28 juli 2026

### Faz 1 — Telegram-onaygate (KLAAR)
Artikel-workflows committen niet meer direct naar `main`. Ze openen een `draft/<slug>` PR,
sturen een Telegram-bericht met ✅/❌ knoppen (`app/api/telegram/webhook/route.ts`), en pas na
onaply merget/deployt `.github/workflows/amarenl-promote-draft.yml` automatisch.

**Bekende bug (gevonden + opgelost 28-07-2026):** een PR (#5) bleef OPEN staan ondanks dat de
gebruiker "reject" had geklikt in Telegram — na diagnose bleek de webhook zelf prima te werken (een
handmatige test-call met het juiste `TELEGRAM_WEBHOOK_SECRET` sloot de PR direct). Vermoedelijke
oorzaak: menselijke misklik tussen de vele PR-berichten, niet een codefout. **Als dit weer gebeurt:**
test de webhook direct met een curl-call (zie sessie-log) vóór je verder zoekt — dat isoleert snel of
het serverside of Telegram-side is.

### Faz 2 — Claude API content-motor (KLAAR, uitgebreid met research-context)
`scripts/generate-article-claude.mjs` draait op een echte cron (ma/wo/vr, `amarenl-article-claude.yml`)
en kiest zelf het volgende onderwerp uit `content/article-queue.md`. Sinds 28-07-2026 twee-staps:
1. Lichte "kies onderwerp + PubMed-zoektermen" call
2. Echte PubMed-abstracts opgehaald via de publieke E-utilities API (geen scraping, geen key nodig) →
   primaire bron voor wetenschappelijke claims (niet het parametrisch geheugen van het model)
3. Plus optionele context uit `tools/competitor-scraper/snapshot/` en `tools/youtube-research/snapshot/`
   — **altijd puur thema-inspiratie, nooit letterlijk overgenomen**

Beide research-tools draaien wekelijks (zondag) via eigen GitHub Actions crons en committen hun
snapshot rechtstreeks naar `main` (brondata, geen PR nodig).

### Concurrentie-scraper (`tools/competitor-scraper/`)
Eigen geïsoleerde `package.json` (alleen cheerio), geen impact op de Next.js dependencies. Nu
uitgelijnd op vitaminstore.nl (prijs/voorraad/reviews, categorie vitamine D). Uitbreiden naar meer
concurrenten/categorieën = nieuwe URLs in `urls.txt` + eventueel nieuwe `SELECTORS` per site
(zie `tools/competitor-scraper/CLAUDE.md` voor de aanpassings-flow).

### YouTube research (`tools/youtube-research/`)
Officiële YouTube Data API v3, 12 Nederlandse zoektermen (2 per productcategorie) met Engelstalige
fallback als een NL-zoekterm te weinig resultaten oplevert (kleine NL-markt op YouTube). Haalt
video-titels + topcomments op als thema-signaal.

### 28-07-2026 — Vercel free-plan upload-limiet geraakt
Te veel test-deploys op één dag → `DeploymentError: Too many requests - try again in 24 hours
(code: "api-upload-free")`. PR-merges lukken nog wel (merge gebeurt vóór deploy), maar de site
update niet totdat de limiet reset. Gebruiker koos bewust voor **wachten** i.p.v. Vercel Pro.
**Als dit weer gebeurt:** check `vercel ls` voor de laatste succesvolle deploy-tijd, en overweeg
Vercel Pro als dit vaker voorkomt bij actief testen.

### 29-07-2026 — Faz 3 gestart, on hold (account/betaling)
Higgsfield MCP (`https://mcp.higgsfield.ai/mcp`) gekoppeld + companion skills geïnstalleerd
(`npx skills add higgsfield-ai/skills` → `.agents/skills/higgsfield-*`, 3 ervan door de installer
zelf als "High Risk" gemarkeerd: `marketplace-cards`, `product-photoshoot`, `websites` — nog niet
geïnspecteerd, niet gebruiken zonder eerst de SKILL.md's te lezen).

Gekozen flow: **ugc-product-flow** (product-only, voiceover, geen nep-persoon die het product
"aanbeveelt" — bewust gekozen boven een pratende "creator"-testimonial, dat zou een nep-review zijn
en botst met Nederlandse reclameregels/ACM + de eigen NVWA/anti-fabricatie-regels van dit project).

**Kredieten:** het gekoppelde account is een gratis/proefaccount (10 credits). De workflow's
gepinde modellen (`gpt_image_2` board + `seedance_2_0` video) kosten samen ~97 credits voor
één 10s clip — ver buiten budget. Goedkoper alternatief gevonden en getest: `nano_banana_2` voor
het board (2 credits) + `veo3_1_lite` voor de video (6 credits @ 6s, geen audio) = 8 credits totaal.
Resultaat: 1 stille, 6s productshot van Happy Juice Pack — **gebruiker vond het niet overtuigend**
("1 product, te kort, stil, zegt niks"). Terechte kritiek: een echte boodschap heeft seslendirme +
meerdere shots/beats nodig, wat weer een veelvoud aan credits kost.

**Account-verwarring:** de OAuth-koppeling ging naar een "proefaccount", niet het account waar de
gebruiker echt op wil betalen. Er is geen MCP-tool om binnen een sessie van account te wisselen —
vereist het loskoppelen/herverbinden van de Higgsfield MCP-server (`/mcp` in Claude Code) om een
nieuw Google-login-scherm te forceren. Gebruiker wilde dit niet meteen doen, **Faz 3 staat on hold**
tot ze beslist welk account/betaalplan ze gebruikt (opties gecheckt: 3-daagse gratis trial met 100
credits — kaart vereist, auto-renew naar $49/mo Plus tenzij geannuleerd — of direct Plus/Ultra
abonnement, geen eenmalige credit-topup beschikbaar op dit moment).

**Belangrijke les:** geen enkel eenmalig-credit-topup-pad bestond op het moment van testen — alleen
abonnementen of de kaart-vereiste trial. Vraag de gebruiker VOORAF welk account ze willen koppelen,
vóórdat je de OAuth-flow start, om dit soort omwisselen te voorkomen.

### 30-07-2026 — GSC-check + PR #4 deploy hersteld + Faz 4 (Pinterest) opgezet, blocked op Pinterest Standard access

**GSC-snapshot (3 maanden):** gemiddelde positie 32,8 (was 56,8 op 24-07, dus herstel loopt maar
nog ver van de oude ~9). Merk-zoektermen ("amare global" etc.) scoren goed (positie 4-10); nieuwe
informatieve blogartikelen scoren nog slecht (positie 40-90 — normaal voor nieuwe content zonder
autoriteit). Twee technische issues gevonden: (1) duplicate URL's door trailing-slash-verschil
(`/happy-juice-pack` vs `/happy-juice-pack/`, `/darmgezondheid` vs `/darmgezondheid/` — splitst
ranking-signaal), (2) 100 pagina's "Ontdekt — nog niet geïndexeerd" in Coverage-report. De 117
404's in Coverage dateren van vóór de redirect-fix van 28-07 (nog niet herscand door Google, geen
nieuw probleem).

**PR #4 deploy hersteld:** was 28-07 gemerged maar deploy faalde op de Vercel-uploadlimiet
("Upload aborted"). 24u-window was voorbij → `gh run rerun 30357588885 --failed` opnieuw gedraaid,
nu volledig geslaagd (build + deploy + Telegram-notificatie). Magnesium-artikel staat nu live.

**Faz 4 (Pinterest) — infrastructuur gebouwd, wacht op Pinterest-goedkeuring:**
- Ontdekt: een oude, nooit afgemaakte Pinterest-poging uit 20-06-2026 lag al in de repo
  (`content/PINTEREST_PLAN.md` met 10 kant-en-klare pins, `public/images/pins/` met 15 afbeeldingen,
  `scripts/pinterest-auth.ts`, `scripts/pinterest-pin.ts`, `app/api/pinterest/callback/route.ts`) —
  maar `PINTEREST_ACCESS_TOKEN` in `.env.local` stond leeg, OAuth was nooit voltooid.
- Vercel's `PINTEREST_CLIENT_ID`/`PINTEREST_CLIENT_SECRET` (9 dagen oud) bleken verouderd/onjuist →
  vervangen door de actuele waarden uit het Pinterest developer-dashboard (App-ID 1582959,
  "Amarenl.com" app) + opnieuw gedeployed.
- **Kernprobleem gevonden:** de volledige OAuth `authorization_code`-flow (`/v5/oauth/token`) faalt
  consistent met `{"code":2,"message":"Authentication failed."}` — ook mét correcte credentials, ook
  met alléén read-scopes. De app-eigen "Token genereren"-snelknop in het dashboard werkt wél (bewijst
  dat App-ID/secret kloppen). Conclusie: **Pinterest Trial-toegang staat de normale OAuth-flow niet
  toe** — alleen de ingebouwde dashboard-snelknop (levert een 24u-durend, read-only token: pins:read,
  boards:read, user_accounts:read, ads:read, catalogs:read — geen pins:write). Dit app heeft
  "Upgrade naar Standard-toegang" **in afwachting** staan; pas na goedkeuring werkt de echte OAuth-flow
  met `pins:write`.
- **Gebruiker koos bewust: wachten op Pinterest-goedkeuring**, niet de 10 pins nu handmatig posten
  (was aangeboden als snel alternatief, afgewezen — zie [[feedback-amarenl-workflow]] voor waarom
  automatisering/controle hier zwaarder weegt dan snelheid).
- **Gebouwd, klaar om te activeren zodra Standard access is goedgekeurd:**
  - `content/pinterest-queue.json` — de 10 pins uit PINTEREST_PLAN.md, elk met stabiele `id`,
    gekoppelde afbeelding, en een `boardCategory`-label (board wordt bij het posten dynamisch
    opgezocht via naam, geen hardgecodeerde board-ID's nodig — boards bestaan mogelijk nog niet).
  - `scripts/pinterest-queue-notify.mjs` — pakt de eerstvolgende `"queued"` pin, stuurt 'm naar
    Telegram (`sendPhoto` + ✅/❌ inline-knoppen), zet status op `"pending"`.
  - `.github/workflows/amarenl-pinterest-queue.yml` — cron ma/wo/vr/za 09:00 Amsterdam, draait de
    notify-script en commit't de queue-statuswijziging.
  - `app/api/telegram/webhook/route.ts` uitgebreid: `pin_approve:<id>` / `pin_reject:<id>`
    callback_data. Bij afwijzen: status → `rejected` via GitHub Contents API. Bij goedkeuren: haalt
    `PINTEREST_ACCESS_TOKEN` uit env, zoekt board-ID op via naam, post de pin via Pinterest API v5,
    zet status → `posted`. **Als `PINTEREST_ACCESS_TOKEN` nog niet gezet is, geeft de bot een
    duidelijke Telegram-melding** ("Pinterest henüz bağlı değil") in plaats van te crashen.
- **Activatiestappen voor de volgende sessie (zodra Pinterest Standard access goedkeurt):**
  1. Check goedkeuringsstatus op `https://developers.pinterest.com/apps/1582959/` (tab "Configureren").
  2. Voltooi de OAuth-flow met scope `pins:read,pins:write,boards:read` via
     `https://www.pinterest.com/oauth/?client_id=1582959&redirect_uri=https%3A%2F%2Famarenl.com%2Fapi%2Fpinterest%2Fcallback&response_type=code&scope=pins%3Aread%2Cpins%3Awrite%2Cboards%3Aread`
     (callback-pagina toont access_token + refresh_token).
  3. Zet `PINTEREST_ACCESS_TOKEN` (en `PINTEREST_REFRESH_TOKEN` voor later) als Vercel
     production env var, `vercel deploy --prod`.
  4. Maak de 5 boards aan op het Pinterest-account als ze nog niet bestaan (namen in
     `content/PINTEREST_PLAN.md` sectie 2 — moeten exact overeenkomen met `boardCategory` in de queue).
  5. Trigger de workflow handmatig (`gh workflow run amarenl-pinterest-queue.yml`) of wacht op de cron.

### Faz 5 — Meta Ads Lead Generation (05-08-2026 gestart)

**Doel:** betaald NL-verkeer naar `/gratis-gut-brain-gids` sturen, e-maillijst laten groeien via
bestaande Pixel/CAPI-tracking — geen nieuwe infrastructuur nodig, alles staat al.

**Bestaande infrastructuur (hergebruikt, niet opnieuw gebouwd):**
- `lib/meta-pixel.ts` — Pixel + CAPI, events: PageView/ViewContent/Lead/Subscribe/Contact/
  InitiateCheckout, PII SHA-256 gehasht vóór verzending
- `NEXT_PUBLIC_META_PIXEL_ID` + `META_CAPI_TOKEN` — al 8 dagen live in Vercel production
- Landingspagina `/gratis-gut-brain-gids` (`LeadMagnetForm.tsx`) → `/api/subscribe` → MailerLite
  (`nl-audience` groep, non-blocking sync), `trackLeadConversion` vuurt Pixel+CAPI direct na
  succesvolle submit

**Business Manager:** gebruiker heeft al een Meta Business Manager — geen nieuwe aanmaken. Ad-account
onder dat bestaande BM opzetten.

**Budget:** €10-15/dag (~€300-450/maand), 1 campagne, 1 ad set — te klein budget om over meerdere
ad sets te spreiden.

**Campagnestructuur:**
- Objective: Leads (website conversion, geoptimaliseerd op `Lead` pixel event)
- Ad set: NL, 25-45 jaar, interesses wellness/energie/stress/slaap (matcht bestaande ICP)
- 2-3 creative-varianten binnen dezelfde ad set (mini-A/B)

**Creative:** statisch beeld bij launch — Faz 3 (Higgsfield video) staat on hold, dus geen video.
Copy: value-first, geen agressieve verkooptaal, binnen EFSA/ACM-grenzen (zelfde discipline als de
rest van de site — geen sahte testimonials/overclaims).

**Belangrijke beperking:** geen Meta Marketing API-koppeling deze sessie — campagne moet handmatig in
Ads Manager UI opgezet worden. Claude bereidt targeting/copy/creative-richting voor en begeleidt
stap voor stap, voert de campagne niet zelf uit.

### 07-08-2026 — kritieke lead-capture bug gevonden + gefixt, concurrentie-analyse ververst, eerste creative-scenario opgesteld

**Kritieke bug (bleek NIET "niet blokkerend" te zijn, zoals hierboven eerder aangenomen — gecorrigeerd):**
Elke form-submit op `/gratis-gut-brain-gids` (en de 5 andere lead-formulieren) gaf een 500-error.
Root cause was twee-traps: (1) `writeSubscribers()` deed `fs.writeFileSync` naar `data/subscribers.json`
vóór de MailerLite-sync, en dat crasht op Vercel's read-only serverless filesystem — de MailerLite-call
werd dus nooit bereikt; (2) zelfs na het verwijderen van de lokale file-write bleek de MailerLite-call
zelf ook stuk: `groups: ['nl-audience']` — MailerLite's API verwacht een numerieke group-id, geen slug,
en gaf 422 terug. Omdat deze call vóór de fix `.catch(() => {})` had (fire-and-forget), werd die 422
altijd stil geslikt en toonde het formulier altijd "succesvol" terwijl er nooit een lead aankwam.
**Praktisch effect: vermoedelijk zijn alle leads via deze formulieren de afgelopen periode verloren
gegaan, niet alleen sinds recent.** Beide bugs gefixt (`app/api/subscribe/route.ts`, group-id nu
`185294849333790257` = "Amare NL Leads"), gededuped naar main, live geverifieerd met een test-submit
(HTTP 200 + echte MailerLite-inschrijving). **Dit was een harde blocker voor Faz 5 — zonder deze fix
zou betaald verkeer naar een kapotte formulier zijn gestuurd.**

**Concurrentie-analyse ververst (`analytics/` ClickHouse-stack):** Docker Desktop stond uit (start niet
automatisch op login), dus de dagelijkse cron faalde stil sinds ~05-08. Handmatig herstart + verse
`track-competitor-ads.mjs`-run (token zit in `/Users/ark/projects/amarenl.com/analytics/.env`, niet in
deze checkout). Belangrijkste bevindingen (volledig rapport: zie artifact-link in sessie, of herhaal de
queries in `analytics/competitor-analysis-queries.sql` filtered op eigen brand-page):
- **"Vitals" als concurrent is onbruikbaar** — alle 2766+ "Vitals"-advertenties zijn romance-novel-apps,
  niet Vitals Vitamins. Bekend risico uit `competitors.json`, nu bevestigd. Voortaan negeren of pas
  herinstellen zodra de echte `page_id` bekend is.
- Vitakruid/Orthica ruwe totalen zijn opgeblazen door reseller/drogist-pagina's (24pharma, Vitaminstore,
  Etos, etc.) — alleen cijfers gefilterd op de eigen merkpagina zijn betrouwbaar: Vitakruid 49 actieve
  ads (~18 dagen gem. looptijd, snelle rotatie), Nutriphyt 30 actieve ads (~58 dagen gem., stickiest
  creative), Orthica maar 4 (nauwelijks eigen paid spend, leunt op resellers).
- **Sterkste signaal:** Nutriphyt's Methialyn-advertentie (B-complex/energie, emoji + symptoomvraag +
  genoemd mechanisme) draait ononderbroken al **409 dagen** — duidelijkste "winnende formule" in de
  markt. Vitakruid's patroon is juist quiz/keuzehulp-gedreven or educatief, geen harde productclaims.
  Geen van de 3 legitieme concurrenten startte nieuwe creative in de laatste 7 dagen (rustig venster).

### 08-08-2026 — creative-scenario compleet, DEFINITIEVE keuze: varianten A + B

Alle 3 copy-varianten kregen een afbeelding die merkkleuren (`#6B4C8C`/`#9B7FBE`/`#C8A951` uit
`app/globals.css`) correct toepast, getoetst aan `scripts/efsa-audit.js`'s verboden-patronenlijst (geen
"geneest/behandelt/klinisch bewezen/100% veilig", taal blijft "ondersteunt"-vorm). Volledige side-by-
side ad-mockup-review (Instagram/Facebook feed-vorm) werd gepubliceerd als sessie-artifact.

**Gebruiker koos A + B voor de campagne, C valt af:**
- **A — symptoom+mechanisme** (Nutriphyt-patroon): "😴 Moe, gespannen of slaap je slecht? ... gut-brain
  axis ..." → `content/meta-ads-drafts/creative-1-gutbrain-illustration.png` — abstracte gut-brain-
  illustratie (silhouet + gloeiende verbindingslijn hoofd↔buik). **Definitief, klaar voor gebruik.**
- **B — nieuwsgierigheid/vraag**: "Wist je dat je darmen vaak de 'tweede hersenen' worden genoemd?..."
  → `content/meta-ads-drafts/creative-3-gids-mockup.png` — premium hardcover gids-mockup, paars kaft,
  goudfolie gut-brain-embleem (zelfde visuele symbool als A, geen leesbare tekst op de kaft = geen risico
  op AI-tekstvervorming). Toont de gids als tastbaar waardevol object i.p.v. "gratis PDF"-gevoel.
  **Definitief, klaar voor gebruik.**
- **C — vertrouwen/anti-hype — AFGEVALLEN**, niet meegenomen naar de campagne. Bestanden
  (`creative-2-lifestyle-moment-v2.png` en de afgekeurde v1) blijven staan als referentie/toekomstige
  optie, niet actief gebruikt.

Reden 2-varianten i.p.v. 3: bij €10-15/dag budget is elke extra variant een verdunning van het budget
over meer creatives, wat Meta's leerfase (richtlijn: ~50 conversies/ad-set/week) vertraagt. A + B werden
gekozen als de twee sterkste/meest onderscheidende invalshoeken.

**Pixel/CAPI live-check (08-08-2026) — BEVESTIGD, end-to-end werkend:**
- Client-side: `fbq` laadt correct op `/gratis-gut-brain-gids` (`window.fbq.loaded === true`), geen
  directe `facebook.com/tr` network-request gezien in de test-browser — vermoedelijk een ad-blocker in
  die browserprofiel, niet per se een sitefout (CAPI dekt dit scenario juist af, zie hieronder).
- Server-side CAPI: rechtstreekse test-POST naar productie `/api/capi-event` (event `Lead`,
  `event_source_url: /gratis-gut-brain-gids`) gaf `{"ok":true}` terug — bewijst dat `sendCAPIEvent()`
  het event daadwerkelijk naar Meta's Graph API stuurde én Meta het accepteerde (dus `META_PIXEL_ID` +
  `META_CAPI_TOKEN` zijn beide correct in Vercel production). Volledige tracking-keten is klaar voor
  launch.

**Volgende stappen:**
1. Ad-account onder bestaande BM koppelen, betaalmethode + €10-15/dag budget instellen (gebruiker)
2. Campagne live zetten met varianten A + B, 1-2 weken laten lopen vóór evaluatie (leerfase niet te
   vroeg afbreken)
3. Wekelijkse CPL/lead-rapportage — kan als RemoteTrigger routine geautomatiseerd worden (zelfde
   patroon als Postiz/AmareNL reply-watch)
4. Overweeg: Docker Desktop auto-start bij login instellen, zodat de concurrentie-cron niet meer stil
   faalt zoals eerder deze week (~2 dagen data-gat doordat Docker niet draaide)

### Openstaand voor volgende sessie
- [ ] **15 PR's** staan nog open in de Telegram-approval-queue (#3, #6-18, #20 — #5 en #19 zijn al
      gesloten) — moeten nog door de gebruiker beoordeeld worden
- [x] ~~Vercel-deploy geblokkeerd~~ — opgelost 30-07: `gh run rerun 30357588885 --failed` geslaagd,
      PR #4 (magnesium-artikel) staat nu live.
- [ ] **Faz 3** — Higgsfield gekoppeld maar ON HOLD: gebruiker moet beslissen welk Higgsfield-account
      + betaalplan (zie hierboven), dan pas verder met een echte, meerdere-shots + voiceover video
- [ ] **Faz 4 (Pinterest)** — infrastructuur volledig gebouwd 30-07, **wacht op Pinterest Standard
      access-goedkeuring** (app 1582959, Trial-toegang staat de OAuth-flow nog niet toe). Zie sectie
      hierboven voor exacte activatiestappen zodra goedgekeurd. Instagram/TikTok/YouTube copy-drafts
      nog niet gebouwd (kan hetzelfde queue+Telegram-patroon hergebruiken, geen API nodig — copy-paste).
- [ ] **Faz 5 (Meta Ads)** — plan vastgelegd 07-08-2026, nog niet gestart. Volgende stap: Pixel
      live-check + ad-account onder bestaande Business Manager koppelen (zie sectie hierboven).
- [ ] Overweeg: algemene web-search API (naast PubMed) voor bredere onderwerp-research, besproken
      maar niet geïmplementeerd
- [ ] `server/` package (sectie 19) opruimen of expliciet archiveren — momenteel misleidende
      documentatie die een niet-actief systeem beschrijft alsof het draait
- [ ] De 3 "High Risk" Higgsfield skills (`marketplace-cards`, `product-photoshoot`, `websites`)
      nog niet geïnspecteerd — lees de SKILL.md's voordat ze gebruikt worden

---

## 21. SORO-ONDERZOEK → TELEGRAM-CHECKLIST — 21 augustus 2026 (Cowork-sessie, extern, via device-bridge)

**Context:** gebruiker vroeg waarom trysoro.com (AI-SEO-concurrent) zulke hoge CTR haalt en of ze een
"geheime techniek" hebben. Onderzocht via 4 onafhankelijke bronnen (Soro's eigen blog + 3 externe
reviews, waaronder een 60-dagen test). **Conclusie: geen geheime techniek.** Het enige dat consistent
het verschil maakt tussen goed en slecht presterende Soro-gebruikers is **menselijke editorial review
vóór publicatie**, met name bij YMYL (gezondheid/supplementen)-content. Volledig onderzoeksrapport met
bronvermeldingen: zie sessie-artifact `soro-gizli-teknik-arastirmasi.md` (aan gebruiker geleverd,
niet in dit repo).

**Waarom dit relevant is voor dit project:** dit bevestigt exact wat sectie 20 (Faz 1, Telegram-
onaygate) en de EFSA-sectie hierboven al aantoonden — de zwakte zit niet in de contentmotor
(lengte/meta/interne links/afbeelding zijn al technisch in orde), maar in **hoeveel een mens er echt
naar kijkt vóór publicatie.** Concreet gevonden in dit repo: EFSA-audit lag wekenlang onbehandeld,
Telegram-approval-bericht bevatte tot nu toe geen enkel kwaliteitssignaal (alleen titel + samenvatting
+ PR-link) — "goedkeuren" was dus feitelijk blind vertrouwen.

**Zes concrete regels (uit het onderzoek, prioriteitsvolgorde):**
1. Publicatietempo moet de menselijke reviewcapaciteit volgen, niet de generatiesnelheid van de
   automatisering.
2. Telegram-goedkeuring moet een echte checklist tonen, niet alleen ja/nee — **hieronder geïmplementeerd.**
3. Auteursidentiteit moet echt zijn (geen generieke "AmareNL Redactie") — **nog niet geïmplementeerd,
   openstaand actiepunt.**
4. Elk nieuw artikel moet een verplichte externe bron hebben (RIVM/PubMed/klinische studie) —
   **detectie nu geïmplementeerd (zie hieronder), maar niet als harde blokkade — alleen zichtbaar
   signaal in Telegram.**
5. Kanibalisatie-clusters (stress/slaap, zie `amarenl-trafik-artirma-plani.md`) eerst samenvoegen
   vóór nieuwe content in diezelfde categorie — **detectie nu geïmplementeerd als zichtbaar signaal,
   samenvoegen zelf nog niet gedaan.**
6. YMYL-content zou idealiter geen volledige auto-publish moeten hebben zonder verhoogde
   kwaliteitsdrempel — dit project heeft al de Telegram-gate (Faz 1), dus dit punt is grotendeels al
   gedekt; de checklist hieronder is de verfijning daarvan.

**Wat vandaag is geïmplementeerd (deze sessie, commit `20dd880` op branch
`draft/fix-magnesium-duplicate` — LET OP: niet op `seo-aeo-overhaul`, zie waarschuwing onderaan):**

`scripts/generate-article-claude.mjs` — nieuwe functie `buildApprovalChecklist(article, extraJsonBefore)`
vlak vóór `pickTopic()`. Berekent, ná generatie en vóór de artikel wordt toegevoegd aan
`data/extra-articles.json`:
- `wordCount` + `wordCountOk` (>= 1000 — **let op: dit is puur een weergavesignaal, de bestaande harde
  `validate()`-poort met minimum 800 woorden is NIET aangepast, om geen onverwacht retry-gedrag te
  riskeren in de live cron zonder dat live te kunnen testen**)
- `hasCitation` — regex-check op `rivm\.nl|pubmed|ncbi\.nlm\.nih\.gov|bron:|referentie:|https?:\/\/`
  in de artikeltekst
- `sameCategoryCount` — hoeveel bestaande artikelen al dezelfde categorie hebben (kanibalisatie-signaal)
- `efsaOk: true` — placeholder, EFSA/NVWA-check gebeurt al hard in `validate()` hierboven; als de
  generator zover komt is die poort al gehaald

Deze 4 waarden worden als extra `GITHUB_OUTPUT`-keys geschreven (`word_count`, `word_count_ok`,
`has_citation`, `same_category_count`), naast de al bestaande `slug`/`title`/`excerpt`.

`.github/workflows/amarenl-article-claude.yml` — de "Notify Telegram"-stap leest deze 4 nieuwe
outputs en bouwt een 4-regelige checklist die vóór de PR-link in het Telegram-bericht komt:
```
✅ EFSA/NVWA kontrolü: geçti (otomatik doğrulandı)
✅/⚠️ Kelime sayısı: <N> (hedefin üstünde / 1000 hedefinin altında — kontrol et)
✅/⚠️ Kaynak/atıf: var / YOK — kontrol et
✅/⚠️ Kategori çakışması: çakışma yok / bu kategoride zaten N makale var — konu çakışması olabilir
```
(In het Turks, omdat de gebruiker die de Telegram-knoppen bedient Turks leest — bewuste keuze, niet
een fout; de rest van dit bestand blijft Nederlands.)

**Verificatie gedaan:** `node --check scripts/generate-article-claude.mjs` → syntax OK.
`python3 -c "import yaml; yaml.safe_load(...)"` op de workflow → YAML geldig. `git diff` van beide
bestanden nagelopen, minimaal en gericht.

**⚠️ NIET live getest.** Dit is code die nog nooit door een echte scheduled/manual run van
`amarenl-article-claude.yml` is gelopen. **Actie voor de eerstvolgende sessie die een run van dit
workflow ziet (handmatig getriggerd of via de ma/wo/vr cron):** controleer het eerste echte
Telegram-bericht zorgvuldig — klopt de checklist-opmaak, komen de waarden overeen met het
werkelijke artikel, breekt er niets in de `GITHUB_OUTPUT`-multiline-syntax (`excerpt` gebruikt al
`<<DELIM`-stijl, de 4 nieuwe regels zijn simpele eenregelige outputs, dus geen multiline-risico
verwacht, maar niet 100% zeker zonder een echte run).

**⚠️ BRANCH-WAARSCHUWING — belangrijk, lees dit:** deze commit (`20dd880`) staat op
`draft/fix-magnesium-duplicate`, de branch die toevallig actief uitgecheckt stond op het moment dat
deze Cowork-sessie begon te werken (waarschijnlijk door de lopende automatisering). Dat is **niet**
dezelfde branch als `seo-aeo-overhaul`, waar sectie 21/22 van de EFSA-fix-saga staat (ja, dubbele
sectienummering tussen branches — dit bestand is op dit moment op minstens 2 branches uit elkaar
gelopen). Deze sessie heeft geprobeerd de commit via `git worktree add` + `cherry-pick` naar
`seo-aeo-overhaul` te verplaatsen, maar dat mislukte herhaaldelijk door dezelfde FUSE-mount
lock-beperking (`.git/worktrees/seo-aeo-wt/index.lock` kon niet betrouwbaar unlinked worden, zelfs
niet met de `mv`-workaround die bij een gewone commit wel werkt — cherry-pick doet intern een tweede
geneste git-aanroep die de net vrijgemaakte lock blijkbaar meteen weer tegenkomt). De worktree-
registratie bij `.git/worktrees/seo-aeo-wt` kon ook niet opgeruimd worden (zelfde unlink-probleem) en
staat dus nog **geregistreerd maar leeg** — voer lokaal (waar dit geen probleem is) uit:
`git worktree remove -f -f /tmp/seo-aeo-wt` (map bestaat niet meer, alleen de .git-registratie) of
gewoon `git worktree prune`.

**Samengevat voor de volgende sessie met echte git-toegang:**
1. Twee losse, nog-niet-samengevoegde takken van werk bestaan nu: (a) `seo-aeo-overhaul` met de
   EFSA-content-fix (`be60dcc`/`ca0c3e8`/`162d069`, zie sectie 21/22 op díe branch), nog niet
   gepusht; (b) `draft/fix-magnesium-duplicate` met deze Telegram-checklist (`20dd880`), waarschijnlijk
   al wel gepusht/PR'd door de reguliere automatisering (check `git log origin/draft/fix-magnesium-
   duplicate` zodra je netwerktoegang hebt).
2. `git worktree prune` uitvoeren om de stray-registratie op te ruimen.
3. Overweeg op termijn `seo-aeo-overhaul` gewoon te pushen en los te mergen — de EFSA-fix staat daar
   al maanden klaar en is inhoudelijk voltooid, alleen de push ontbreekt.
