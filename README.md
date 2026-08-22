# AmareNL.com — Affiliate Bridge Site

> Next.js 16 | TypeScript | Tailwind CSS | Vercel

AmareNL.com is een Nederlandse affiliate bridge site die bezoekers informeert over natuurlijke wellness supplementen en doorstuurt naar Amare.com.

---

## Live

- Productie: **https://amarenl.com**
- Amare affiliate ID: **2075008**
- Analytics: GA4 (GT-MKTPDM2M)

---

## Ontwikkeling

```bash
npm run dev        # localhost:3000
npm run build      # Productie build
npm run lint       # ESLint
npx next-sitemap   # Sitemap genereren
npx tsx scripts/generate-product-index.ts  # Product index herbouwen
npx tsx scripts/efsa-audit.js              # EFSA compliance scan
npx tsx scripts/validate-products.js       # Affiliate URL validatie
```

---

## Structuur

```
app/                        # Next.js App Router (14 routes)
├── page.tsx                # Homepage
├── layout.tsx              # Root layout (GA4, fonts, schema, affiliate tracking)
├── blogs/nieuws/           # Blog systeem (17 artikelen)
├── go/                     # Akıllı affiliate yönlendirme
├── collections/            # Collectie pagina
├── happy-juice-pack/       # Deep product page (1000+ woorden)
├── mentabiotics/           # Deep product page
├── energy/                 # Deep product page
├── hl5/                    # Deep product page
├── origin/                 # Deep product page
├── restore/                # Deep product page
├── sunrise/                # Deep product page
├── supplementen/           # Categoriepagina
├── gewichtsbeheer/         # Categoriepagina
├── schoonheid/             # Categoriepagina
├── over-ons/
├── contact/
└── privacy-beleid/

components/
├── layout/                 # Header, Footer, CampaignBanner, ReturnVisitorBanner, ClientProviders
├── sections/               # HeroSection, ProductGrid, PromoCarousel, TrustBar, GuaranteeBlock, etc.
├── ui/                     # AffiliateCTA, ExitPopup, SchemaMarkup, FloatingMobileCTA
└── blog/                   # BlogCard, BlogContent, BlogAccordion

lib/
├── products.ts             # 43 Amare producten (statische JSON import)
├── blog.ts                 # 17 MDX blog artikelen
├── schema.ts               # JSON-LD generators (Product+FAQ+Breadcrumb, Organization, Article)
├── analytics.ts            # GA4 event helpers
└── affiliate.ts            # 3-katmanlı affiliate tracking

data/
├── products/               # 43 individuele [slug].json bestanden
└── products.json           # Geaggregeerde index (auto-generated)

scripts/
├── generate-product-index.ts  # Bouwt data/products.json uit individuele JSONs
├── efsa-audit.js              # EFSA compliance scanner
└── validate-products.js       # Affiliate URL validator

content/blog/               # MDX blog artikelen
public/images/              # Statische assets
```

---

## Wat is klaar

### SEO & Schema
- JSON-LD Product+FAQ+Breadcrumb schema op alle 7 deep product pages
- JSON-LD **MedicalWebPage** schema op gezondheidsblogs (E-E-A-T boost)
- JSON-LD **HowTo** schema op stapsgewijze handleidingen
- JSON-LD **SiteLinksSearch** schema op hele site
- JSON-LD Organization, Article, FAQ, Speakable, Person op blogpagina's
- Auto sitemap via next-sitemap (202 routes, blog posts met echte lastmod)
- Google Search Console geverifieerd
- AI crawlers expliciet toegestaan (GPTBot, CCBot, anthropic-ai, PerplexityBot)

### Producten
- **43** producten in database
- **7** deep product pages (1000+ woorden, EFSA-compliant)
  - Happy Juice Pack, MentaBiotics, Energy+, HL5, Origin, Restore, Sunrise
- Product dropdown menu in navigatie (desktop + mobiel)
- Alle PostNL/shipping claims verwijderd (Amare handelt verzending)
- Affiliate URL fixes: ignite-him, ignite-her, skin-to-mind-neunight

### Affiliate Tracking (3 lagen)
1. **localStorage** — bezoekerregistratie + automatische affiliate ID
2. **/go** — akıllı redirect (`/go/[product]` voor productspecifieke links)
3. **Return visitor banner** — herkenning terugkerende bezoekers

### Conversie
- Exit-intent popup (e-mail capture)
- PromoCarousel (3 roulerende banners)
- CampaignBanner (maandelijks aanbod)
- Floating mobile CTA
- AffiliateCTA component (herbruikbaar)

### Security
- XSS protectie (DOMPurify op alle HTML render)
- Next.js 16.2.6 (latest stable)
- 0 npm vulnerabilities (high-severity)
- Clean console (geen debug logs)
- **HSTS** (max-age=63072000; includeSubDomains; preload)
- **X-Content-Type-Options: nosniff**
- **X-Frame-Options: DENY**
- **Referrer-Policy: strict-origin-when-cross-origin**

### GEO/AEO (🆕 19 Tem 2026)
- **11** JSON-LD schema types in lib/schema.ts
- **36** interne links toegevoegd aan 10 blog artikelen
- **8** wetenschappelijke bronvermeldingen (RIVM, Voedingscentrum, PubMed, Gezondheidsraad)
- MedicalWebPage schema voor alle YMYL gezondheidscontent
- HowTo schema auto-detectie voor stapsgewijze handleidingen
- Speakable schema voor voice search (Google Assistant, Siri)
- SiteLinksSearch schema voor branded SERP
- Crawl-delay: 1 (snelle indexatie)

### 🆕 GSC 404 Temizliği (04 Agu 2026)

**Sorun:** Google Search Console 117 URL'i 404 olarak raporluyordu (eski WordPress/Shopify kalıntıları + geçiş sırasında kaybolan sayfalar).

**Yapılanlar:**

1. **vercel.json — 10 yeni yönlendirme eklendi** (toplam 143 redirect):
   - `/amare-edge-grape` → `/edge-plus`
   - `/urun/restore` → `/restore` (spesifik, wildcard'dan önce)
   - `/urun/edge` → `/edge-plus` (spesifik, wildcard'dan önce)
   - `/products/amare-happy-juice-edge-plus-watermelon` → `/happy-juice-pack`
   - `/products/amare-ignite-for-her` → `/ignite-for-her`
   - Tüm redirect'ler `permanent: true` (301)

2. **robots.txt güncellendi** — WordPress/Shopify sistem URL'leri Disallow:
   - `/?page_id=`, `/wp-content/`, `/wp-admin/`, `/feed=`, `/author/`
   - `/sample-page/`, `/collections/`, `/policies/`, `/cdn`, `/wpm`
   - Google'ın bu kalıntıları tekrar taraması caydırıldı

3. **Sonraki adım (manuel — Musa yapacak):**
   - Deploy ettikten sonra GSC'de URL Inspection ile birkaç eski URL'i kontrol et
   - GSC > Coverage > Not Found listesini "Doğrula" butonu ile güncelle

**Not:** `nitro-xtreme`, `sunset`, `fit20` sayfaları zaten mevcut — GSC'de bunların 404 görünmesi önbellek/gecikmeli indeks sorunu, kod tarafında sorun yok.

---

### ✅ Faz 5 — Meta Ads Lead Generation — LIVE sinds 15-08-2026
Betaald NL-verkeer naar `/gratis-gut-brain-gids`. **07-08:** kritieke lead-capture bug gevonden en
gefixt (formulieren gaven altijd 500/verloren leads stil via MailerLite 422), concurrentie-analyse
ververst (Vitakruid/Nutriphyt/Orthica — Nutriphyt's 409-dagen-lopende advertentie is het sterkste
signaal). **08-08:** creative-scenario compleet, definitieve keuze: **varianten A (gut-brain
illustratie) + B (gids-mockup)**, variant C afgevallen. **14/15-08:** ad-account bleek zelf al hersteld
(HolistiGlow, `act_1523034172332806` — actief, geldige betaalmethode); vóór launch nog 2 echte bugs
gevonden+gefixt in de funnel zelf: gids-PDF stond nooit live (404) en blocking `alert()`-dialogen in
de lead-formulieren. Na een live test-submit (welkomstmail + PDF werkten) is de campagne
**geactiveerd**: `NL – Leadgen – Gut-Brain & Yorgunluk – Aug26`, €7/dag, 2 advertenties. **Niet
aankomen tot ~eind augustus** (learning phase). Wekelijkse CPL-rapportage zit nu in de bestaande
maandag-Telegram-report (zie hieronder). Volledige details: `CLAUDE.md` sectie 20, subsectie "Faz 5".

### 🆕 Agency OS — Faz 1 & 2 (28 Tem 2026)
Volledig geautomatiseerde, maar **mens-gecontroleerde** content-pipeline. Details + openstaande
punten: zie `CLAUDE.md` sectie 20 ("AGENCY OS STATUS"). Kort:
- **Telegram-onaygate**: elk gegenereerd artikel wordt een `draft/<slug>` PR, nooit direct naar `main`.
  Onaply via ✅/❌ in Telegram → automatische merge + deploy.
- **Claude API content-motor** (`scripts/generate-article-claude.mjs`, cron ma/wo/vr): kiest zelf het
  volgende onderwerp uit `content/article-queue.md`, onderbouwt wetenschappelijke claims met **echte**
  PubMed-abstracts (publieke E-utilities API), en gebruikt concurrentie- + YouTube-signaal als
  thema-inspiratie (nooit als letterlijke bron).
- **`tools/competitor-scraper/`** — vitaminstore.nl prijs/voorraad/reviews, wekelijkse snapshot-cron.
- **`tools/youtube-research/`** — YouTube Data API v3, wekelijkse snapshot-cron.
- Oude vaste `TOPIC_POOLS` DeepSeek/OpenRouter-workflows staan nog als `workflow_dispatch`-only
  handmatige fallback (schedule uitgezet, geen dubbele publicatie meer).

### 🆕 Sessie 15-08-2026 — GitHub auto-deploy hersteld, funnel-bugs gefixt, PR-batch in uitvoering

**GitHub → Vercel auto-deploy werkt weer** (was al maanden stuk zonder dat iemand het wist — de
regel "manuel CLI deploy" verderop in dit bestand is nu **verouderd**, zie deployment-sectie
hieronder). Root cause: de Vercel GitHub App-installatie had alleen toegang tot repo `wearkmedia`,
`amarenl.com` stond niet in de repo-access-lijst
(github.com/settings/installations → Vercel → Configure). Toegang toegevoegd + `vercel git connect`
— sindsdien deployt elke push naar `main` automatisch (geverifieerd met een echte push, GitHub
commit-status ging `pending → success` in ~45s).

**Twee kleine maar echte bugs gefixt onderweg:**
- `.github/workflows/amarenl-weekly-report.yml` — de GSC-stap gaf altijd "ENOENT" omdat
  `GSC_KEY_PATH=... OUTPUT=$(node ...)` een klassieke bash-valkuil is (twee losse assignments, geen
  echt commando-woord, dus de env var werd nooit ge-export naar het node-subprocess). Gefixt door
  `GSC_KEY_PATH=...` direct vóór `node` te zetten. Zelfde workflow kreeg ook een nieuwe stap: Meta
  Ads CPL (spend/leads/CPL laatste 7 dagen), rechtstreeks via de Graph API, geen lokale
  Docker/ClickHouse-afhankelijkheid.
- **9 open content-PR's gereviewd** (was in Telegram-queue): #23 gesloten als duplicate van #24
  (zelfde onderwerp "Collageen voor Mannen 30+", cannibalisatierisico). Bij alle 8 overige
  (#12–#18, #24) ontbrak een affiliate-CTA/FAQ-sectie — `articleProductMap` in `lib/blog.ts`
  aangevuld per artikel (de bestaande `linkifyProductMentions()`-functie linkt dan automatisch
  productnamen die al in de tekst staan), en bij #12–#18 (die geen FAQ hadden) een "Veelgestelde
  vragen"-sectie met 3 vragen per artikel toegevoegd, rechtstreeks in elke PR-branch gepusht.

**Update — alle 8 PR's gemerged (#12–#18, #24), elk individueel live geverifieerd** (HTTP 200 +
FAQ + CTA aanwezig). De workflow's eigen `vercel deploy`-stap faalde bij een paar PR's met "Upload
aborted" (race condition met de native auto-deploy) — steeds onschadelijk gebleken, productie stond
al goed. #24 kreeg ook nog echt een transient Google Fonts fetch-failure tijdens de build (zelfde
patroon als #15) — opgelost met een handmatige `vercel --prod --yes` retry.

**Duplicate-URL cleanup (zelfde sessie, vervolg):** GSC's 158 pagina's uit de laatste 90 dagen
allemaal getest. 2 echte 404's gevonden en gefixt (301 naar dichtstbijzijnde bestaande artikel).
Belangrijker: **5 groepen dubbele artikelen** ontdekt — hetzelfde onderwerp met 2-3 losse
publicaties (darm-huid connectie, vitamine D tekort, stress verminderen, menopauze x2, **en de
net gemergede #24 zelf** — bleek een derde "Collageen voor Mannen 30+" te zijn, naast een al
bestaand artikel van dezelfde dag dat bij de eerdere #23-vs-#24-vergelijking over het hoofd was
gezien). In elk geval het oudste/langste artikel als canonical gehouden, de rest verwijderd uit
`data/extra-articles.json` + 301-redirect toegevoegd in `vercel.json`. Alle 8 redirects + de
overlevende canonical pagina's live geverifieerd (200, juiste bestemming, geen loops).

**GSC-cijfers (echt, niet geschat):** laatste 90 dagen 88 clicks / 4.873 impressies / gem. positie
38,5; laatste 28 dagen juist slechter (pos 52,0) dan het 90-dagen-gemiddelde. Root cause van de
langdurige traffic-dip staat al in `DEPLOY_LOG.md` #35: een "humanize"-commit op 21-07 verkleinde
`data/extra-articles.json` van 57 naar 4 artikelen, 51 geïndexeerde pagina's gaven 2 dagen 404.

**🔎 Hermes-gateway onderzoek (belangrijk, nog niet afgerond):** de LaunchAgent
`ai.hermes.gateway-amarenl` (het systeem achter `CLAUDE.md`'s "AmareNL_Orchestrator_Bot, gestopt
28-07") bleek via `launchctl list` / `ps aux` **nog steeds te draaien**, al ~5 dagen — `KeepAlive`
+ `RunAtLoad` hebben het proces waarschijnlijk vanzelf herstart nadat het op 28-07 alleen gekilld
werd zonder de LaunchAgent te unloaden. De cron die vandaag zonder goedkeuringsknoppen een artikel
naar Musa's Telegram stuurde is onderzocht: `~/.hermes/profiles/amarenl/scripts/publish_next.py`
schrijft **niet** naar deze repo — het leest statische `.md`-bestanden uit een totaal ander
projectmapje (`~/projects/worldcup-shorts/social-media/artikelen`) en stuurt de tekst alleen door
naar Telegram. Vandaag was dat toevallig hetzelfde artikel als het net gemergede #15 (gedeelde
bronmateriaal, geen live schrijfconflict). Risico is dus lager dan gevreesd, maar niet nul: de
gateway zelf is een general-purpose AI-agent zonder vastgelegde regels tot vandaag. Twee dingen
toegevoegd: `.hermes/RULES.md` (Kural 0 — Hermes moet dit `README.md` lezen vóór elke actie in
deze repo, mag niet buiten de hier beschreven pipeline om iets anders doen) en
`.hermes/LOGBOOK.md` (verplicht logboek voor elke Hermes-actie). **Openstaande beslissing voor
Musa:** de dagelijkse cron (`353c91b3a2f3`, elke ochtend 09:00) is nu puur ruis t.o.v. de officiële
pipeline — uitzetten of laten staan is een keuze, niet iets dat automatisch is opgelost.

### 🆕 Sessie 21-08-2026 — Magnesium duplicate-bug, GSC quick-win batch, EFSA-audit (PR #38–#45, allemaal gemerged)

**Kern-architectuurbug gevonden en gefixt (PR #38):** `magnesium-onmisbaar-mineraal-rust-energie-spierherstel`
was in PR #31 verdiept van 411 → 981 woorden, maar had **nul live effect** — een pre-existing
duplicate slug in `lib/blog.ts`'s `blogPosts`-array (van een eerdere, ongerelateerde commit) won
altijd via `getAllBlogPosts().find()`'s first-match-gedrag. Zelfde bug trof `darmflora-balans-voor-welzijn`
(4 kopieën gevonden, samengevoegd tot 1). Daarnaast bleek `getProductLinksForArticle()`'s fallback
voor niet-gemapte artikelen een kapotte sparse array `[, {...verkeerd object...}]` — rendered een
lege/kapotte "Aanbevolen Producten"-kaart op **107 pagina's**. Beide gefixt.

**Nieuwe architectuur-valkuil ontdekt:** `content/blog/*.mdx`-bestanden worden door **geen enkel**
live codepad gelezen — `scripts/sync-mdx-to-blog.js` converteert ze ooit eenmalig naar een
gecomprimeerd object literal in `lib/blog.ts` (herkenbaar aan `{slug:"...",title:"...",` zonder
spaties, i.t.t. de rest van het bestand). Daarna is de `.mdx` een dode, wees-bestand — bewerken heeft
geen live effect. Bevestigd voor meerdere artikelen tijdens deze sessie; **altijd eerst
`grep lib/blog.ts` voor de slug checken** voordat je een `.mdx`-bestand bewerkt.

**Echte auteur + geverifieerde bronnen (PR #38):** `BlogPost` kreeg `author`/`citations`-velden,
zichtbare "Door Mark"-byline + "Bronnen"-sectie op elke artikelpagina. Toegepast op 28 artikelen —
alleen met daadwerkelijk via PubMed/RIVM/Voedingscentrum/Thuisarts.nl geverifieerde bronnen, nooit
geforceerd. Daarbij 2 inhoudelijke fouten gevonden en gecorrigeerd: een verzonnen ogende bron
("Advances in Therapy, 2017") vervangen door de echte, kritischere Gröber et al. 2017 Nutrients-review
over transdermaal magnesium, en een overdreven "RIVM"-claim over wijdverbreid tekort rechtgezet met de
werkelijke, genuanceerdere Voedselconsumptiepeiling-data.

**GSC quick-win rapport + uitvoering (PR #39–#42, #44):** redirect-aware herberekening van 90 dagen
GSC-data (163 ruwe pagina's → 125 live URL's) leverde een geprioriteerde kansenlijst op. Aangepakt:
kannibalisatie-risico tussen 2 vitamine-D-artikelen (interne link i.p.v. URL-wijziging), 2
CTR-zwakke pagina's (meta description herschreven), `vloeibaar-collageen-hl5` (374→968 woorden,
ontbrak zelfs een NVWA-dipnoot ondanks vlaggenschipproduct), `supplementen-stress-burn-out`
(kannibalisatie met een sterkere zusterpagina + verzonnen ogende statistieken gecorrigeerd),
`supplementen-winterdip` (213→790 woorden — miste lichttherapie, het best onderbouwde middel),
`prebiotica-probiotica-verschil` (kapotte zin + spookverwijzing "(zie referenties)" gefixt), plus
9 resterende lange-staart-pagina's (auteur/NVWA/kleine verdieping).

**Site-brede bugs gevonden tijdens dit werk:**
- **20 pagina's** linkten naar `amarereview.nl` — een derde-partij Amare-affiliatesite die **niet**
  eigendom is van de gebruiker. Trok dus verkeer/link-equity weg naar een concurrent. Alle 20
  verwijderd (PR #43).
- **11 pagina's** hadden kapotte lijst-rendering (markdown `- item` / `1. item` bleef als platte
  tekst binnen `<p>`-tags staan, i.p.v. `<ul>/<ol>`) — automatisch script gebruikt om te fixen.
- Kapotte, niet-klikbare CTA naar het niet-bestaande product "GBX Fit" (geen affiliate-URL bestaat,
  alle varianten geven 404 op amare.com) — op gebruikersinstructie vervangen door een link naar
  `/restore`.

**EFSA-audit uitgevoerd (PR #45):** `scripts/efsa-audit.js` rapporteerde 18 violations, maar het
script mist context — het herkent geen ontkenningen ("verlaagt cortisol **niet** direct") en geen
regel-lijst-tekst die de verboden termen zelf citeert om uit te leggen wat je niet mag schrijven.
Na handmatige verificatie tegen live content bleken slechts **5 van de 18** echte, live violations
(2 pagina-componenten, 1 tabelcel in `lib/blog.ts`, 2 regels in het social-media-contentplan) — die
zijn gefixt. Zie `CLAUDE.md`/agent-memory voor het volledige false-positive-patroon, zodat een
volgende audit niet opnieuw alle 18 hoeft te her-analyseren.

### 🆕 Sessie 22-08-2026 — 3 pillar pages voltooid (PR #48)

Gebruiker koos deze taak uit de "Nog te doen"-lijst. Alle drie pagina's (`/adaptogenen`,
`/gut-brain-axis`, `/probiotica-stammen`) bleken al live en van goede kwaliteit, maar één had een
echte inhoudelijke lacune: `/adaptogenen`'s kop beloofde "8 Belangrijkste Adaptogenen" terwijl er
maar 3 waren uitgeschreven (Ashwagandha, Rhodiola, Lion's Mane). **4 nieuwe adaptogenen toegevoegd**
— Panax Ginseng, Cordyceps militaris, Schisandra chinensis, Heilige Basilicum (Tulsi) — elk met een
echte, via PubMed geverifieerde bron. De kop is eerlijk aangepast naar "7 Belangrijkste" in plaats
van een zwak onderbouwd 8e punt erbij te forceren.

Tijdens deze verdieping ook de bestaande Ashwagandha-claims geaudit tegen de volledige tekst van
Chandrasekhar et al. (2012) via PubMed: de 44%-stressreductie en 27,9%-cortisoldaling bleken **echt**
en rechtstreeks uit die studie, maar een meegelifte 17%-testosteronclaim in dezelfde alinea kwam
nergens in die studie voor (verwijderd) en een 28%-slaapclaim is vervangen door een correct
toegeschreven bron (Langade et al., 2020). Zelfde soort fout gevonden en gefixt op `/probiotica-
stammen` (een niet-bestaand "23% cortisol"-cijfer, ten onrechte aan Messaoudi et al. 2011
toegeschreven) — een terugkerend patroon waarbij specifieke percentages losstaand van hun bron
worden overgenomen en aan het verkeerde of een niet-bestaand resultaat gekoppeld raken.

Daarnaast: alle 3 pagina's kregen `author: "Mark"`, een fout product-label op `/gut-brain-axis`
("GBX SuperFood" wees naar de Sunrise-slug) is gecorrigeerd, en er zijn interne links toegevoegd
vanuit 4 gerelateerde blogartikelen naar hun bijbehorende pillar page — voorheen kregen deze
pagina's vrijwel geen interne links (`/gut-brain-axis`: 0, `/probiotica-stammen`: 0, `/adaptogenen`: 1).

---

## Nog te doen

### Product Pages (TASK 2.1)
- [x] FIT20 pagina (wei + collageen, 620 regels)
- [x] Sunset pagina (omega-3 avondformule, 622 regels)
- [ ] 1 extra pagina voor 10 totaal (Skin to Mind of VitaGBX)

### Blog Content
- [x] Agency OS Faz 1+2 content-motor (zie hierboven) — vervangt de handmatige queue-aanpak
- [x] #23 gesloten als duplicate van #24 (15-08-2026)
- [x] PR #12 gemerged + live (15-08-2026, FAQ + affiliate-CTA toegevoegd)
- [x] **PR's #13, #14, #15, #16, #17, #18, #24** — alle 8 gemerged + individueel live geverifieerd
      (15-08-2026, zie sessielog hierboven)
- [x] 3 pillar pages (Gut-Brain Axis, Probiotica Stammen, Adaptogenen) — voltooid 22-08-2026,
      zie sessielog hieronder

### Infrastructuur
- [x] ~~E-mail API route (/api/subscribe) — Mailchimp integratie~~ — bestaat al (MailerLite, niet
      Mailchimp), maar gaf tot 07-08-2026 altijd 500/verloren leads — zie Faz 5 hierboven, nu gefixt
- [x] **GitHub → Vercel auto-deploy hersteld** (15-08-2026) — zie sessielog hierboven
- [x] **GSC-rapportstap gefixt** (15-08-2026) — bash env-var bug, zie sessielog hierboven
- [x] **Meta Ads CPL-rapportage** toegevoegd aan wekelijkse Telegram-report (15-08-2026)
- [ ] GA4 conversion tracking voor affiliate clicks (TASK 12.1)
- [ ] verdikkend-serum-voor-fijn-haar → Amare server 500 (buiten onze controle)
- [ ] **Faz 3** (video, Higgsfield) — nog steeds on hold (account/betaling, zie `CLAUDE.md`)
- [ ] **Faz 4** (Pinterest) — infrastructuur klaar, wacht op Pinterest Standard access
- [x] **Faz 5** (Meta Ads) — LIVE sinds 15-08-2026 (zie hierboven), niet aankomen tot ~eind augustus

### Bekende Issues
- `verdikkend-serum-voor-fijn-haar` — HTTP 500 op Amare.com (server-side)

---

## ⚠️ Content Orchestrator (13 Haz 2026) — VEROUDERD, NIET GEBRUIKEN

Dit `server/`-package hieronder is **vervangen** door de Agency OS Faz 1/2 pipeline hierboven. Laat
staan als historisch referentiemateriaal, maar start dit niet opnieuw op — er bleek ook een aparte,
écht-actieve automatische bot buiten deze repo te draaien (Hermes gateway LaunchAgent,
`AmareNL_Orchestrator_Bot`, zelfde Telegram chat_id), die op 28-07-2026 is stopgezet. Twee parallelle
publicatiesystemen was precies het soort ongecontroleerde automatisering die tot de ranking-crash
leidde die deze hele Agency OS-inspanning heeft getriggerd.

### Kurulum (historisch, niet gebruiken)
```bash
cd server
cp .env.example .env
# .env dosyasını düzenle:
#   ANTHROPIC_API_KEY=...
#   TELEGRAM_BOT_TOKEN=...  ( @BotFather'dan al)
#   TELEGRAM_ADMIN_CHAT_IDS=...
npm install
npm start
```

### Telegram Bot Komutları (historisch)
| Komut | İşlev |
|-------|-------|
| `/status` | Sistem durumu |
| `/queue` | Makale kuyruğu |
| `/publish` | Sıradaki makaleyi yayınla |
| `/research` | Pazar araştırması başlat |
| `/report` | Haftalık trafik raporu |
| `/health` | Sistem sağlık kontrolü |
| `/logs` | Son 10 log kaydı |
| `/build` | Build durumu |

### Cron Takvimi (historisch)
| Gün | Saat (Amsterdam) | Görev |
|-----|-----------------|-------|
| Pazartesi | 07:57 | Tam pipeline (research + publish + report) |
| Çarşamba | 09:57 | Makale yayını |
| Cuma | 09:57 | Makale yayını |
| Her gün | 10:00 | Build kontrolü |

---

## ⚠️ Deployment — KRİTİK KURALLAR

**GitHub → Vercel auto-deploy artık ÇALIŞIYOR (15-08-2026'dan beri)** — `main`'e her push otomatik
prod deploy tetikler (Vercel GitHub App'in repo-access listesinde `amarenl.com` eksikti, düzeltildi —
detay için yukarıdaki "Sessie 15-08-2026" bölümüne bak). Normal akış artık sadece:
```bash
git push origin main          # Bu kadar — Vercel otomatik build+deploy eder
```
Birkaç saniye içinde `gh api repos/arkmedia25-cmyk/amarenl.com/commits/main/status` ile deploy
durumunu kontrol edebilirsin (`pending` → `success`/`failure`).

**Manuel `vercel --prod --yes` sadece şu durumlarda gerekli:** auto-deploy yine bozulursa (önce
GitHub App repo-access'i kontrol et, Vercel proje ayarlarını değil), ya da acil bir durumda push
beklemeden hemen deploy etmek istersen. **ASLA uncommitted değişiklikle deploy etme** — `vercel
--prod` lokaldeki dosyaları yükler, git'i değil.

### Rollback (acil durum)
```bash
vercel list                   # Son deployment ID'sini bul
vercel promote <DEPLOY_ID>    # Önceki sürüme dön
```

---

Zie `CLAUDE.md` voor volledige projectdocumentatie, codeerregels en SEO-eisen.

<!-- Telegram onay akışı testi — 2026-07-28T09:42:02Z -->
<!-- Vercel token testi — 2026-07-28T10:40:09Z -->
