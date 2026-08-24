# Gearchiveerd — 23 augustus 2026

Deze bestanden zijn hier op 23-08-2026 uit `data/staging/` verplaatst tijdens de
kolajen-kümesi-consolidatie (zie CLAUDE.md, sectie 29).

**Waarom:** `server/auto-publish.ts` leest `data/staging/*.json` alfabetisch en
publiceert het EERSTE bestand — zonder Telegram-goedkeuring, zonder EFSA-check,
zonder duplicate-content-check — rechtstreeks naar `data/extra-articles.json`,
gevolgd door een automatische `git commit` + `git push` + `vercel --prod` deploy.
Dat is een compleet andere, ongated pipeline dan de Faz 1/2 Telegram-approval-flow
die de rest van dit project gebruikt.

De 9 bestanden hier (001 t/m 008 + extend.json + publish-schedule.json) zouden,
als deze pipeline ooit weer draait, bijna letterlijke duplicaten hebben gepubliceerd
van artikelen die al live staan:
- `001-collageen-poeder-vs-vloeibaar.json` → was AL gepubliceerd als
  `collageen-poeder-vs-vloeibaar-wat-is-beter`, en is nu juist verwijderd/
  geredirect als onderdeel van de kolajen-consolidatie. Opnieuw publiceren zou
  de net opgeruimde duplicate content direct terugzetten.
- `002-magnesium-voedingsbronnen.json` (slug `waar-zit-magnesium-in-...`) —
  bijna identiek aan het al bestaande `waar-zit-magnesium-in-voedingsbronnen-
  supplementen-gids`.
- `004-vitamine-d-voeding.json` (slug `vitamine-d-voeding-welke-producten-helpen`)
  — bijna identiek aan het al bestaande `vitamine-d-voeding-welke-producten-
  helpen-echt` (verschil: alleen "-echt").
- `005-vitamine-c-tekort.json` (slug `vitamine-c-tekort-symptomen-oorzaken-
  oplossing`) — bijna identiek aan het al bestaande `vitamine-c-tekort-
  symptomen-oorzaken-oplossingen` (verschil: enkelvoud/meervoud).
- En zo verder — zie CLAUDE.md sectie 29 voor de volledige analyse.

**Niets is verwijderd** — alle 9 bestanden staan hier compleet, alleen uit de
actieve queue-map gehaald zodat `readdirSync("data/staging")` ze niet meer
oppikt (die scan is niet recursief).

**Belangrijk, nog te doen (kan niet vanaf een device-bridge sessie):**
controleer op de Mac zelf of `server/auto-publish.ts` daadwerkelijk nog actief
gepland staat (crontab, pm2, of een LaunchAgent) — dat kon niet betrouwbaar
geverifieerd worden vanuit deze sessie. Zie CLAUDE.md sectie 29.
