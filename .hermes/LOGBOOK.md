# Hermes — İşlem Günlüğü

> Kurallar için `.hermes/RULES.md`'ye bak. Her girdi en üste eklenir (en yeni en üstte).

---

## 2026-08-15 09:xx — Araştırma (Claude tarafından, Hermes adına değil): "AmareNL_Orchestrator_Bot" hâlâ aktif mi?

- Ne yapıldı: Musa'nın "bot mesaj gönderdi ama onay butonu yok" bildirimi üzerine
  `launchctl list` + `ps aux` ile sistem kontrol edildi. `ai.hermes.gateway-amarenl`
  LaunchAgent'ının (`KeepAlive: true`, `RunAtLoad: true`) hâlâ çalıştığı doğrulandı (~5 gündür,
  muhtemelen 28-07'deki "durdurma" sadece process'i öldürmüş, LaunchAgent'ı unload etmemiş).
  Cron listesi (`~/.hermes/profiles/amarenl/cron/jobs.json`) ve o günkü cron çıktısı
  (`~/.hermes/profiles/amarenl/cron/output/353c91b3a2f3_20260815_090124.txt`) incelendi.
- Hangi dosyalar/branch'ler etkilendi: Hiçbiri (salt-okunur inceleme). `.hermes/RULES.md`'ye
  Kural 0 (her işlemden önce README.md oku) eklendi ve bu bulgu ışığında güncellendi.
- Plan kapsamında mıydı: N/A — bu inceleme Claude tarafından yapıldı, Hermes'in kendisi
  tarafından değil.
- Sonuç: Cron görevi `353c91b3a2f3` ("Dagelijkse blog artikel") günde bir kez, 14-07'den beri
  26 kez çalışmış, `publish_next.py` script'i **amarenl.com reposuna hiç yazmıyor** — tamamen
  ayrı bir proje klasöründen (`~/projects/worldcup-shorts/social-media/artikelen`) statik .md
  dosyası okuyup Telegram'a düz metin gönderiyor, ilerlemeyi kendi `.publish_progress`
  dosyasında tutuyor. Bugünkü çıktı, aynı sabah resmi pipeline'dan (#15 PR) yayınlanan makaleyle
  aynıydı — tesadüf/ortak kaynak, çakışan yazma değil. **Risk düşük ama sıfır değil:** script
  zararsız olsa da, gateway'in kendisi genel amaçlı bir AI ajanı — sohbette "yayınla" gibi bir
  talimat verilirse ne yapacağı bu script'in dışında, garanti edilemez. Musa'nın gördüğü "onay
  butonu" muhtemelen bu mesajla aynı Telegram sohbetindeki (chat_id 812914122) resmi
  `amarenl_content_bot`'un PR-onay mesajıyla karışmasından kaynaklanıyor — bu script'te hiç
  buton kodu yok. **Öneri (uygulanmadı, kullanıcı kararı bekleniyor):** bu cron görevini
  (`353c91b3a2f3`) devre dışı bırakmak, çünkü artık resmi pipeline ile içerik çakışıyor ve
  kafa karışıklığına yol açıyor.

---

---

## 🧩 2026-09-15 — Artikel-pipeline: Anthropic → Gemini (Anthropic-krediet op)

**Symptoom:** `amarenl-article-claude.yml` faalde sinds 13-09-2026 bij elke run binnen ~30 seconden.

**Oorzaak (geverifieerd met een directe API-call):**
```
400 invalid_request_error: "Your credit balance is too low to access the Anthropic API."
```

**Fix (gecommit):**
- Nieuw: `scripts/anthropic-compat-gemini.mjs` — shim die de Anthropic-SDK-interface nabootst
  (`new Anthropic({apiKey})`, `client.messages.create({model, max_tokens, system, messages})`)
  maar intern Google's **OpenAI-compatibele Gemini-endpoint** aanroept.
- In `scripts/generate-article-claude.mjs` is **alleen de importregel** gewijzigd:
  `import Anthropic from "@anthropic-ai/sdk";` → `import Anthropic from "./anthropic-compat-gemini.mjs";`
- `.github/workflows/amarenl-article-claude.yml`: `GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}`
  toegevoegd (`ANTHROPIC_API_KEY` blijft staan omdat het script die bij de start controleert).
- Repo-secret `GEMINI_API_KEY` gezet.

**Belangrijk voor latere wijzigingen:**
- De shim laat **altijd** `GEMINI_API_KEY` uit de omgeving voorgaan op de (dode) Anthropic-key die
  als `apiKey` wordt meegegeven. Draai die volgorde niet om.
- Model instelbaar via `GEMINI_MODEL` (default `gemini-2.5-flash`), endpoint via `GEMINI_BASE_URL`.
- Terug naar Anthropic: krediet opladen **en** de importregel terugzetten op `@anthropic-ai/sdk`.

**Quota:** de Gemini free tier is gratis maar **niet onbeperkt** (RPM/TPM/RPD per project; RPD reset
om middernacht Pacific tijd). Actuele limieten: https://aistudio.google.com/rate-limit

### ⚠️ Twee parallelle systemen schrijven naar hetzelfde bestand

`data/extra-articles.json` wordt door **twee** onafhankelijke processen geschreven:

1. **GitHub Actions** (`amarenl-article-claude.yml`) — commit `data/extra-articles.json` +
   `public/sitemap.xml`.
2. **Hermes cron** (job `42fc71dcca93` in het `default`-profiel, workdir `~/projects/amarenl.com`)
   — schrijft naar hetzelfde bestand.

Gevolg op 15-09-2026: tijdens een testrun van (2) is het bestand teruggebracht van **75 naar 1
artikel** (een test-payload). Hersteld met `git checkout -- data/extra-articles.json` (75 artikelen).
**Nooit beide tegelijk laten lopen** en nooit het hele bestand door een model laten herschrijven.

**Maatregelen die al genomen zijn (Hermes-kant):**
- De Hermes-cronprompts van `42fc71dcca93`, `1137ceb04673` en `de8fde06b5ce` zijn voorzien van een
  blok met **absolute paden** (in Hermes draaien cron-tools niet in de workdir — `pwd` geeft
  `/Users/ark/.hermes`), een verbod op testbestanden en een verbod op het herschrijven van het
  hele JSON-bestand.
- Toevoegen gaat nu via `~/.hermes/scripts/amarenl-append-article.py <nieuw-artikel.json>`:
  valideert verplichte velden + dubbele slug, maakt een backup, schrijft atomisch en verifieert
  daarna. Het model schrijft alleen nog een **los** JSON-bestand met het nieuwe artikel.

### Onderwerp-queue

`content/article-queue.md` is een **redactieplan, geen checkboxlijst** — er zijn geen `[ ]`/`[x]`
markers. Het script leest het hele document en geeft het samen met de bestaande artikelen aan het
model; de keuze is dus **modelgebaseerd**. Er is daarom geen harde garantie dat een al geschreven
onderwerp nooit opnieuw gekozen wordt: het `queue_topic_matched`-veld in de log is het enige
controlespoor. Wil je dezelfde harde garantie als bij vital4you/wearkmedia, dan moet de queue een
expliciete statusmarkering per regel krijgen (nog niet gedaan).

**Let op:** de queue-header waarschuwt zelf dat de keyworddata van 10-09-2026 nog niet tegen de
81+ bestaande artikelen (`data/extra-articles.json` + `lib/blog.ts`) is gecontroleerd.

---

## 2026-09-17 — Interne links zijn nu VERPLICHT in elk artikel

**Aanleiding:** een steekproef van de laatste 12 artikelen in `data/extra-articles.json` toonde
**0 productlinks en 0 categorielinks** (10 van de 12 artikelen hadden zelfs geen enkele interne
link). Er was dus geen doorstroom van bezoekers en geen kliks — precies het tegenovergestelde van
wat de site nodig heeft.

**Wat er is gebouwd** (in `scripts/generate-article-claude.mjs`):
- `collectProductTargets()` — leest de 40 producten uit `data/products.json`; hun URL is
  `/producten/<slug>` (dynamische route `app/producten/[slug]`).
- `collectCategoryTargets()` — vaste lijst van 15 echte topic-/categoriepagina's, gekruist met de
  bestaande mappen in `app/`, zodat er **nooit** naar een 404 gelinkt wordt.
- `ensureCrossLinks()` — controleert de content en vult aan indien nodig.

**De regel (per artikel):**
1. minimaal **2 productlinks** — `<a href="/producten/<slug>">Productnaam</a>`
2. minimaal **1 categorie-/themiapagina** — `<a href="/supplementen">supplementen</a>`
3. minimaal **2 artikellinks** — `<a href="/blogs/nieuws/<slug>">Titel</a>` (bestaande regel)

**Twee vangnetten, zodat dit nooit meer stilletjes misgaat:**
- De prompt noemt de regel nu expliciet én geeft de volledige lijst geldige doelen mee (het model
  kan dus geen slugs meer verzinnen die in een 404 eindigen).
- Voldoet het model toch niet, dan voegt `ensureCrossLinks()` automatisch een kort blok
  **"Gerelateerde producten & categorieën"** toe met geldige links. Er wordt dus **nooit** een
  artikel afgekeurd om links — en er gaat **geen** artikel meer live zonder interne links.

**Geverifieerd (17-09-2026):**
- Unit-test met de echte functies uit het script: **13/13 geslaagd**; elk doel bestaat aantoonbaar
  als route in `app/`.
- De live run van 17-09 sloeg het onderwerp over wegens de **cluster-limiet** (kernwoord
  "vitamine" 9x, limiet 3) en stuurde daarover een Telegram-bericht. Dat is een bestaande,
  gewenste anti-kanibalisatie-regel — geen fout van deze wijziging.

**Verwante regel:** artikelen moeten ook inhoudelijk bij de gelinkte producten/categorieën passen
(geen willekeurige links). De prompt vermeldt dit expliciet.

---

## 2026-09-17 — Kuyruk FR-standardına getirildi + probiotica-vergelijking geschreven

**Aanleiding:** operator vroeg de status van de "populaire keywords → artikel-kuyruğu" taak te
controleren en, indien onaf, over te nemen — met expliciete nadruk op **geen dubbele content**.

**Wat is gedaan:**
1. **Volledige cross-check** van de 10-09-2026 keyword-data tegen **alle 121 bestaande artikelen**
   (77 `data/extra-articles.json` + 44 `lib/blog.ts`, content zelf doorzocht, niet alleen titels).
   Resultaat in `content/article-queue.md` sectie "🆕 17 EYLÜL 2026": bijna elke ogenschijnlijke
   "gap" bleek al gedekt (ashwagandha, collageen/omega-3/vitamine-C/D vs concurrentiemerken,
   magnesium-vorm, darmflora-stappen, natuurlijk afvallen) — met bewijs per item (welk artikel
   het al dekt).
2. **Eén bevestigd gat gevonden en geschreven:** een "Kruidvat, Lucovitaal of Orthica"-
   vergelijkingssectie ontbrak bij probiotica, terwijl dit format al bestond voor 4 andere
   producten. Toegevoegd aan `beste-probiotica-2026-kopen-vergelijken` (**enrichment, geen nieuw
   artikel** — dezelfde regel als de b12-sessie van 14-09). Commit `e1646e4`, gepusht.
   - Concurrentiedata is **echt, via live web search geverifieerd** (orthica.nl officiële prijs
     €17,50/30 caps; Kruidvat/Lucovitaal productpagina's) — **niet verzonnen**. Waar een cijfer
     niet op het etiket stond (Lucovitaal KVE), staat er letterlijk "niet vermeld", geen gok.
   - Build + lokale server geverifieerd (`/restore`, `/mentabiotics`, `/darmgezondheid` → 200).
3. **`kids`-categorie afgeraden** voor de queue: geen Amare-product, verwaarloosbaar volume,
   enkel concurrentiemerk-zoekopdrachten ("davitamon").
4. **Los hiervan, apart gevonden en gefixt:** de dagelijkse Telegram-artikelcron
   (`~/.hermes/profiles/amarenl/scripts/artikel_send.py`, andere queue dan hierboven — vaste map
   met 25 oude artikelen) was sinds 15-09 **dezelfde 3 artikelen aan het herhalen** (queue was op
   en wrapte stilletjes terug naar #1). Script aangepast: bij een lege queue stuurt het nu een
   waarschuwing i.p.v. te herhalen; progress-teller gereset zodat het niet morgen alsnog #04 (al
   gepubliceerd) opnieuw stuurt.

**Voor de volgende sessie — om dubbel werk te voorkomen:**
- De queue-status in `content/article-queue.md` is nu up-to-date tot 17-09-2026. Lees eerst die
  "🆕 17 EYLÜL 2026"-sectie voordat je nieuwe onderwerpen voorstelt uit de 10-09-data — de meeste
  zijn al als "gedekt" gemarkeerd mét bewijs.
- Het enige queue-item van deze ronde staat op `[x]` (gedaan). Geen nieuwe probiotica-vergelijking
  meer schrijven.
- De Telegram-artikelcron (`artikel_send.py`) is een **apart systeem** van de website-blogpijplijn
  hierboven — verwar ze niet. Die map (`~/projects/worldcup-shorts/social-media/artikelen/`) heeft
  nog steeds maar 25 statische bestanden; als die queue weer leeg raakt, waarschuwt het script nu
  in plaats van te herhalen, maar er is nog geen nieuwe content toegevoegd aan die map.
