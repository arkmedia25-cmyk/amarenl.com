---
name: article-quality
description: Quality rules for AmareNL article writing — human language, structure, E-E-A-T, SEO compliance. Used by scripts/generate-article.mjs (GitHub Actions pipeline).
---

# AmareNL Article Quality Rules

> Deze regels gelden voor élk artikel dat voor amarenl.com geschreven wordt.
> Overtreding = artikel wordt niet gepubliceerd tot het gecorrigeerd is.

## 0. VASTE REGELS (NIET ONDERHANDELBAAR)

Deze twee regels zijn hard en veranderen nooit, ongeacht welk model of welke sessie het artikel schrijft:

- **Uitsluitend Nederlands, geen enkel ander woord.** Geen Turkse, Engelse of andere vreemde woorden binnen een Nederlandse zin (bv. niet "Sıvı formül" i.p.v. "Vloeibare formule"). Lees de volledige tekst na afloop nog één keer door specifiek op vreemde-taal-lekken, ook losse woorden.
- **Geen ruwe markdown-tekens in de output.** Nooit een letterlijke `#`, `##`, `###`, `**` of soortgelijk teken vóór of na een kop of woord laten staan — dat verraadt direct dat het AI-gegenereerd is. Koppen zijn altijd echte `<h2>`/`<h3>` HTML-tags, tekst binnen die tags bevat geen markdown-restjes. Koppen en paragrafen lezen als een menselijke redacteur ze getypt zou hebben — klassieke, natuurlijke opbouw, geen robotische sjabloonformulering.

## 1. MENSELIJKE TAAL (Anti-AI Slop)

- **Natuurlijk Nederlands**: Schrijf zoals een ervaren gezondheidsjournalist — niet als een chatbot.
- **Geen robot-taal**: Vermijd "In deze blogpost gaan we...", "In conclusie kunnen we stellen dat...", "Het is belangrijk op te merken dat..."
- **Begin elke alinea concreet**: Niet "Er zijn veel voordelen van X", maar "X helpt je lichaam op drie manieren."
- **Afwisselende zinslengte**: Mix korte statements (5-8 woorden) met langere uitleg (15-25 woorden).
- **Spreektaal waar gepast**: "Dat klinkt te mooi om waar te zijn, toch?" i.p.v. "Dit fenomeen kan men observeren."

## 2. STRUCTUUR REGELS

### Verplichte elementen (in volgorde):
```
1. H2: Definitie sectie ("Wat is [X]?") — zoekwoord in eerste 100 woorden
2. H2: Hoofdvoordeel #1 (met interne link naar gerelateerd artikel)
3. H2: Hoofdvoordeel #2 (met interne link naar ander gerelateerd artikel)
4. H2: Diepgaande uitleg (met affiliate product link)
5. H2: Praktische tips of "Waar op letten"
6. H2: Veelgestelde vragen (FAQ — exact 3 vragen, gebruik <h3> voor elke vraag)
7. H2: Conclusie / dagelijkse routine
```

### Interne links (VERPLICHT):
- **Minimaal 2 interne links** naar andere blog artikelen op amarenl.com
- Format: `<a href="/blogs/nieuws/[slug]">relevante ankertekst</a>`
- Gebruik ALLEEN bestaande slugs (aangeleverd in de prompt) — nooit een slug verzinnen
- Ankertekst moet natuurlijk in de zin vloeien

### FAQ formaat (belangrijk voor schema-extractie):
```html
<h3>Vraag hier?</h3>
<p>Antwoord in 40-60 woorden.</p>
```
Gebruik `<h3>` voor de vraag, NIET `<p><strong>`. Anders wordt de FAQ niet correct als schema geëxtraheerd door de site.

## 3. E-E-A-T SIGNALEN

- **Voedingscentrum link**: Bij voedingsclaims → link naar voedingscentrum.nl
- **EFSA referentie**: Bij gezondheidsclaims → "De Europese Voedselveiligheidsautoriteit (EFSA) erkent..."
- **PubMed/NIH**: Bij wetenschappelijke claims → "Onderzoek gepubliceerd in [journal] toont aan..."
- **NVWA disclaimer**: Slotzin toevoegen: `<p><em>* Deze uitspraken zijn niet beoordeeld door de NVWA. Raadpleeg bij twijfel je huisarts.</em></p>`

## 4. VERBODEN TAALGEBRUIK

```
❌ "geneest"          → ✅ "ondersteunt"
❌ "behandelt"         → ✅ "draagt bij aan"
❌ "klinisch bewezen"  → ✅ "onderzoek suggereert" / "wordt in verband gebracht met"
❌ "voorkomt"          → ✅ "helpt beschermen tegen" / "verlaagt het risico op"
❌ "garantie op"       → ✅ "kan bijdragen aan"
❌ "revolutionair"     → ✅ "innovatief" / "doordacht"
❌ "wondermiddel"      → ✅ "waardevolle aanvulling"
```

## 5. AFFILIATE LINKS

- **Altijd in nieuw tabblad**: `target="_blank" rel="nofollow noopener noreferrer"`
- **Disclaimer direct na link**: `<em>* Voedingssupplement. Geen geneesmiddel.</em>`
- **Max 3 affiliate links per artikel**
- **Natuurlijke inbedding**: Link vanuit de context, niet als losse button

## 6. TECHNISCH FORMAAT

Output moet **pure JSON** zijn, geen markdown-codeblokken eromheen:

```json
{
  "slug": "uniek-slug-zonder-datum",
  "title": "Titel — max 60 tekens met zoekwoord",
  "date": "YYYY-MM-DD",
  "category": "darmen|mentaal|schoonheid|essentials|energie|gewichtsbeheer",
  "excerpt": "Korte samenvatting 1-2 zinnen met zoekwoord",
  "content": "<h2>...</h2><p>...</p>..."
}
```

**KRITIEK — `content` veld regels:**
- Puur HTML: alleen `h2`, `h3`, `p`, `strong`, `em`, `ul`, `li`, `a`, `table`/`thead`/`tbody`/`tr`/`th`/`td`
- GEEN React/JSX componenten (`<AffiliateCTA .../>` bestaat niet in dit formaat)
- GEEN `import` statements
- GEEN `<script>` tags
- Gebruik gewone `<a href="https://www.amare.com/...">` voor affiliate links, geen custom componenten

## 7. CHECKLIST VOOR PUBLICATIE

- [ ] Minimum 800 woorden (doel: 1200-1800)
- [ ] H2/H3 structuur correct (geen H1 in content)
- [ ] Minimaal 2 interne links naar bestaande amarenl.com artikelen
- [ ] Minimaal 1 E-E-A-T bron (Voedingscentrum/EFSA/PubMed)
- [ ] FAQ sectie met exact 3 vragen in `<h3>` formaat (40-60 woorden per antwoord)
- [ ] Zoekwoord in eerste 100 woorden van de content
- [ ] NVWA disclaimer aanwezig
- [ ] Affiliate disclaimer aanwezig na elke product link
- [ ] Geen verboden medische claims (zie sectie 4)
- [ ] Geen AI-robot taal
- [ ] Uniek slug (niet eerder gebruikt)
