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
