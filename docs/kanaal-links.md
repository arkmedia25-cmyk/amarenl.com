# Kanaallinks met UTM — waar elke bezoeker vandaan komt

**Waarom:** Cited bewaart per bezoek de `utm_source` van de eerste paginaweergave. Zonder UTM
belanden Instagram-bio, Pinterest-pin en WhatsApp-DM allemaal in dezelfde `direct`-emmer —
precies wat de twee verkopen van 1 november onmeetbaar maakte (zie `docs/attributie-2026-11-01.md`).

**Regel:** elke link die je zelf plaatst (bio, pin, DM, mail) krijgt `utm_source` + `utm_medium`.
Bronnamen zijn vast — niet vrij invullen, anders splitst de rapportage.

| Kanaal | Waar | Link |
|---|---|---|
| Instagram bio | @holistiglow / @amarenl | `https://vitaalroute.nl/?utm_source=instagram&utm_medium=bio` |
| Instagram story / link-sticker | story | `https://vitaalroute.nl/?utm_source=instagram&utm_medium=story` |
| Instagram DM (handmatig) | gesprek | `https://vitaalroute.nl/?utm_source=instagram&utm_medium=dm` |
| TikTok bio | profiel | `https://vitaalroute.nl/?utm_source=tiktok&utm_medium=bio` |
| Pinterest | pin-link (per artikel) | `https://vitaalroute.nl/blogs/nieuws/<slug>?utm_source=pinterest&utm_medium=pin` |
| WhatsApp / DM-bericht | 1-op-1 | `https://vitaalroute.nl/<pagina>?utm_source=whatsapp&utm_medium=dm` |
| E-mail / nieuwsbrief | MailerLite | `https://vitaalroute.nl/<pagina>?utm_source=email&utm_medium=nieuwsbrief` |
| YouTube-beschrijving | video | `https://vitaalroute.nl/<pagina>?utm_source=youtube&utm_medium=beschrijving` |

## Vaste bronlijst (`utm_source`)

`instagram` · `tiktok` · `pinterest` · `whatsapp` · `email` · `youtube` · `reddit` · `facebook`

Gebruik geen varianten (`IG`, `insta`, `instagram_bio`) — Cited bewaart de bron als losse waarde,
dus elke spelling wordt een eigen rij in het kanaalrapport.

## Waar je het resultaat leest

- Paneel → Kanalen: `direct` daalt, de genoemde bronnen verschijnen.
- `GET /api/metrics?site=sa373527370df2a25&type=utm_source` → bron per bron met aantallen.
- Verkoop koppelen: Amare-mail (tijdstip) + Cited `amare_klik`-event (tijdstip + `target`-product)
  vallen binnen enkele minuten op elkaar. Zonder UTM is alleen "direct" te zien; met UTM staat de
  bron meteen in dezelfde sessie.

## Wat al automatisch gemeten wordt (sinds 2026-11-04)

Elke klik op een `amare.com`-link stuurt een `amare_klik`-event met `page`, `target` en `label`.
Dat gebeurt in de browser (`components/layout/CitedAffiliateTracker.tsx`), dus ook voor links in
artikel-HTML. Pin- en biolinks hebben daarnaast UTM nodig voor de *herkomst*; de klikmeting zegt
*wat* er gekocht is, de UTM zegt *waar de bezoeker vandaan kwam*.
