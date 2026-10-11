# Quick-win log — vitaalroute.nl / amarenl.com (ronde 2, 11 oktober 2026)

Bron van de "voor"-cijfers: rank-rapport 2026-10-11 (`~/Documents/geo-visibility/reports/rank-2026-10-11.md`),
Google Search Console, venster 28 dagen. Effect meten: wekelijkse rank-engine (cron `f46993af864f`,
maandag 09:20) en de maandelijkse AI-meting (6 november).

Let op: de site draait op **vitaalroute.nl**. Het oude domein **amarenl.com bestaat niet meer**:
het geeft per URL een 308-redirect naar hetzelfde pad op vitaalroute.nl (gecontroleerd op
11-10-2026: `/`, `/happy-juice-pack` en een blogartikel redirecten alle drie 308 → vitaalroute.nl).
De GSC-property `amarenl.com` laat dus alleen zien hoeveel legacy-vraag er nog naar oude URL's
wijst; de rank-engine slaat die property over bij de quick wins. Eén aanpassing op vitaalroute.nl
telt voor beide, want de redirect komt op die pagina uit.

| # | Pagina | Doelzoekwoord | Voor (positie / vertoningen) | Wat is aangepast | Verwacht |
|---|---|---|---|---|---|
| 1 | `/blogs/nieuws/zink-waar-goed-voor-tekort-signalen-supplement` | in welk eten zit zink | 16,0 / 7 | H2 in vraagvorm + antwoordblok (rijkste bronnen, fytinezuur, vitamine C-tip) + interne link naar het immuunartikel | Antwoordblok hoort de vraag direct te dekken → 16,0 → top 5 |
| 2 | idem | welke zink is het beste | 11,8 / 13 | Nieuwe sectie met H2 in vraagvorm + antwoordblok (picolinaat/citraat vs oxide, max 25 mg, niet met ijzer/koper) + interne link | 11,8 → 4-8 in 2-6 weken |
| 3 | `/blogs/nieuws/beste-collageen-supplement-2026-werkt-echt` | beste collageen supplement | 7,7 / 7 | Antwoordblok direct onder de vergelijkings-H2 (type 1&3, 5 g/dag, vitamine C als co-factor) | Directe match op de exacte term → top 3-5 |
| 4 | `/blogs/nieuws/lions-mane-paddenstoel-focus-nootropic` | lion's mane ervaringen | 9,8 / 5 | Nieuwe sectie "Lion's Mane ervaringen: wat gebruikers melden" (verwachtingsmanagement, 4 weken proefperiode) | Long-tail ervaringsvraag → top 3-5 |
| 5 | `/probiotica-stammen` | hoe kies ik de juiste probioticastam | 7,5 / 12 | Nieuwe sectie met H2 in vraagvorm + antwoordblok (doel → stamcode, Cerebiome-voorbeeld) + 2 interne links | 7,5 → top 3 |

## Kwaliteitsregels die zijn gevolgd (`amarenl-article-quality` skill)

- Geen verboden medische claims: "draagt bij aan", "wordt in verband gebracht met", geen
  "geneest/voorkomt/klinisch bewezen".
- FAQ/antwoorden 40-60 woorden, in het Nederlands van de rest van de site (geen chatbot-taal).
- Zinkartikel had **0 interne links** — de skill eist er minimaal 2; nu 2 toegevoegd.
  Ook de probiotica-pagina kreeg 2 interne links naar bestaande (live, 200) pagina's.
- Geen nieuw artikel geschreven: de content-farmregel (max 2 artikelen per keywordcluster) blijft
  gerespecteerd — dit zijn verbeteringen op bestaande URL's.

## Verificatie

- `python3 -c "json.load(extra-articles.json)"` → 91 artikelen, geldig.
- `npm run build` → exit 0, Compiled successfully.
- Na deploy: live gecontroleerd op de nieuwe H2's en antwoordblokken.
- IndexNow: gewijzigde URL's aangemeld (vitaalroute.nl).

## Niet van mij, wel meegecommit

`data/extra-articles.json` bevatte al één nieuwe draft uit de contentpipeline
("EDGE+ Mango of Watermelon: welke variant kies jij?"). Die is meegegaan in dezelfde commit
omdat het bestand één geheel is — het is de eigen output van de cron-pipeline.

---

# Ronde 3a — legacy-vraag (zelfde dag, na de correctie dat amarenl.com niet meer bestaat)

Bron: "Legacy-vraag"-blok in het rank-rapport (GSC-property amarenl.com, 308 → vitaalroute.nl).
Deze vragen wijzen naar oude URL's, maar het verkeer landt op dezelfde pagina's op vitaalroute.nl —
dus dit is de grootste onbenutte vraag van het hele portfolio.

| # | Pagina (vitaalroute.nl) | Zoekvragen (vertoningen op oud domein) | Wat is aangepast |
|---|---|---|---|
| 1 | `/blogs/nieuws/teveel-magnesium-symptomen-risico` | klachten teveel magnesium (31) · te veel magnesium klachten (28) · teveel magnesium hoofdpijn (21) · magnesium bijwerkingen (20) · te veel magnesium schadelijk (17) · teveel aan magnesium (17) · teveel magnesium duizelig (17) ≈ **167** | Twee nieuwe secties bovenaan: "Klachten bij te veel magnesium: welke merk je?" en "Magnesium bijwerkingen: welke zijn bekend?" met antwoordblokken van 45-50 woorden; Voedingscentrum-link toegevoegd (die ontbrak) |
| 2 | `/blogs/nieuws/natuurlijke-slaap-supplementen-beter-slapen-zonder-melatonine` | slaap supplement (21) | Nieuwe sectie "Slaap supplement: welk supplement helpt bij slecht slapen?" met antwoordblok dat per slaapprobleem het juiste supplement koppelt |
| 3 | `/blogs/nieuws/prebiotica-probiotica-verschil-darmen-uitleg` | prebiotica (19) · verschil pre en probiotica (16) · probiotica en prebiotica (14) ≈ **49** | Nieuwe sectie "Wat is prebiotica?" bovenaan met antwoordblok + 2 interne links (het artikel had er **nul**, terwijl de kwaliteitsregel er minimaal 2 eist) |
| 4 | `/blogs/nieuws/vloeibaar-collageen-hl5-huid-haar-nagels` | collageen haargroei (18) | Nieuwe sectie "Collageen en haargroei: wat zegt onderzoek?" met eerlijk antwoord (haar = keratine, collageen werkt indirect) |
| 5 | `/blogs/nieuws/supplementen-voor-meer-energie-dit-werkt-echt` | energie supplementen (36) · supplementen energie (10) ≈ **46** | Nieuwe sectie "Energie supplementen: welke werken echt?" + Voedingscentrum-link + 2 interne links (artikel had er nul) |

Totaal geadresseerde vraag deze ronde: circa **300 vertoningen per maand** op één cluster pagina's.
Verificatie: JSON geldig (91 artikelen), `npm run build` exit 0, live gecontroleerd, IndexNow aangemeld.
