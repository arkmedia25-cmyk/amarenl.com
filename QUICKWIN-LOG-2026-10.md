# Quick-win log — vitaalroute.nl / amarenl.com (ronde 2, 11 oktober 2026)

Bron van de "voor"-cijfers: rank-rapport 2026-10-11 (`~/Documents/geo-visibility/reports/rank-2026-10-11.md`),
Google Search Console, venster 28 dagen. Effect meten: wekelijkse rank-engine (cron `f46993af864f`,
maandag 09:20) en de maandelijkse AI-meting (6 november).

Let op: amarenl.com en vitaalroute.nl serveren dezelfde codebase; amarenl.com heeft
`canonical → https://vitaalroute.nl`. Eén aanpassing telt dus voor beide properties.

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
