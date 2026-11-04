# Attributie 1 november 2026 — twee nieuwe klanten

Bron: Amare "nieuwe persoonlijke inschrijving" + "nieuwe bestelling"-mails (mus-16@hotmail.com)
gekruist met Cited-sessies (`/api/sessions`, Europe/Amsterdam).

## De twee orders

| # | Klant | Account | Inschrijving (NL-tijd) | Product | Bedrag | Kanaal volgens Cited |
|---|---|---|---|---|---|---|
| 1 | Rianne Ruisch, 's-Hertogenbosch | 2247420 | 01-11 16:32:24 | MentaBiotics™ (Subscribe & Save) | €77,88 | Google organisch → `/mentabiotics` |
| 2 | Merve Dogan, Nieuwegein | 2247422 | 01-11 16:56:20 | Amare Sunset™ | €49,22 | direct (geen referrer) → `/sunset` |

Orders 6449013 en 6449024. Beide klanten schreven zich bij de aankoop in — dus nieuwe klanten,
en de affiliate-link (`susp_2075008`) is in beide gevallen gebruikt.

## Bewijs per order

1. **16:28:30** — Android/Chrome, referrer `google.com`, 3 weergaven, alle op `/mentabiotics`
   (sessie `vE7dxzh7_AAXt`, eindigt 16:51). CTA op die pagina wijst naar
   `amare.com/susp_2075008/nl-nl/pdp/mentabiotics-sticks`. **4 minuten later** de MentaBiotics-order.
2. **16:52:06** — iOS/Safari, geen referrer, één weergave `/sunset` (sessie `vVTcUYB7DzsTC`).
   Dezelfde bezoeker (`5d5677b7ed57a42a`) komt **17:36** terug op `/sunset` — na de order.
   **4 minuten na de weergave** de Sunset-order. CTA wijst naar `amare.com/susp_2075008/nl-nl/sunset`.

## Grenzen van deze meting (toen)

- Geen UTM op bio-/pinlinks → referrerloze bezoekers zijn "direct"; welk kanaal dat was, is niet te
  bewijzen (Instagram-bio, DM of handmatig getypt).
- Geen affiliate-klik-event → attributie leunt op het tijdsverschil (4 min) + exacte productmatch.
- `country` komt uit de browsertijdzone, niet uit IP: de Sunset-bezoeker staat als `DE` terwijl het
  adres in Nieuwegein is.
- Google-zoekterm van de MentaBiotics-bezoeker is niet beschikbaar (GSC-querydrempel).

## Sinds 4 november automatisch

- `amare_klik`-event bij elke affiliate-klik (`page`, `target`, `label`) — geverifieerd op productie.
- Cited-goal "Amare klik" (id 1) → verschijnt als conversie in het paneel.
- Kanaallinks met UTM: `docs/kanaal-links.md`.
