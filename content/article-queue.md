# AmareNL Article Queue — SEO-GEO-AEO İçerik Planı
> Laatste update: 2026-10-18 (DataForSEO-ölçümü + 13 nieuwe gemeten onderwerpen; de dagelijkse
> Telegram-artikelqueue is **gepensioneerd**, enige schrijver is de CI-workflow op 4 artikelen/week)
> Vorige update: 2026-09-17 (10 Eylül ham verisi 121 mevcut makaleyle [77 `data/extra-articles.json`
> + 44 `lib/blog.ts`] tek tek çapraz kontrol edildi, FR (AmareFR) kuyruğuyla aynı standarda —
> checkbox + kanıt bazlı dedup — getirildi. Bkz. "🆕 17 EYLÜL 2026" bölümü hemen altta.)
> Önceki update: 2026-09-10 (gerçek Google Ads Keyword Planner verisi, NL, 7 kategori — bkz.
> "10 EYLÜL 2026" bölümü; bu ham veri artık aşağıdaki 17 Eylül bölümünde doğrulanmış durumda)
> Önceki update: 2026-09-02 (24 Ağustos kuyruğu, bu tarihteki cluster-konsolidasyonlarına göre
> doğrulandı ve güncellendi — bkz. Q1-Q4, M4, bölüm C aşağıda)
> Önceki update: 2026-08-24 (öncelik kuyruğu eklendi — bkz. bölüm aşağıda)
> Status: 20/20 TIER ✅ | 3 vergelijkingsartikelen ✅ | NIEUWE BATCH: 15/15 ✅ | **BATCH 3: 0/6 ⏳** | Totaal 74+ artikelen live
> Deploy: Vercel production ✅
> Metodoloji: NL search volume × commercial intent × product match × GEO query fan-out
> Yayın takvimi: **4 artikelen per week** (CI `vitaalroute-article-claude.yml`, ma/di/do/za 12:57 UTC).
> Eén schrijver: deze queue + CI. Geen tweede writer naar `data/extra-articles.json`.
> Kwaliteitscontrole: `~/.hermes/scripts/queue_watchdog.py` (dagelijks 08:00, alleen melding bij actie)
> Bron: vitaalroute-agent-keywords.md + keywords-onderzoek.md + GEO/AIO audit (juli 2026)

---

## 🆕 18 OKTOBER 2026 — DataForSEO ile ÖLÇÜLMÜŞ kuyruk (tek yazar, haftada 4)

**Neden bu bölüm:** 18-10-2026'da günlük Telegram makale kuyruğu (51/51 bitti) **emekliye ayrıldı** ve
`vitaalroute.nl` CI makalesi **Pzt/Sal/Per/Cmt = haftada 4**'e çıkarıldı. Böylece siteye yazan **tek**
hat bu iş akışı; `data/extra-articles.json`'a ikinci bir yazar yok (Product SEO Orkestratör cron'u da
duraklatıldı).

**Ölçüm kaynağı:** DataForSEO Google Ads `keywords_for_keywords` + `search_volume`, location 2528 (NL),
dil `nl`, 18-10-2026. Rakamlar gerçek aylık ortalamadır (≈ değil). Maliyet: 10 kelime ≈ $0,09.

**Öncelik kuralı (bu sırayla):** 1) DÜŞÜK rekabet & hacim ≥500 → 2) ORTA rekabet & hacim ≥1.000 →
3) YÜKSEK rekabet yalnızca hacim ≥5.000 **ve** kümede yazılı içerik varsa. Skor = hacim × (DÜŞÜK 1,6 /
ORTA 1,15 / YÜKSEK 0,8). Aynı kümeden en fazla 2-3 makale; rakip/marka kelimeleri (kruidvat, lucovitaal,
orthica, vitakruid, holland & barrett, davitamon …) hiç kullanılmaz.

**Dedupe kanıtı:** 133 canlı `/blogs/nieuws/*` URL'si + `data/extra-articles.json` (94) + `content/blog/*.mdx`
→ toplam **227 makale / 1,68M karakter** gövde metni tarandı; aşağıdaki 13 konunun hiçbiri bu korpusta
kapsanmıyor (kelime öbeği eşleşmesi + manuel kontrol).

| # | Onderwerp | Ölçülen keyword | Hacim/ay | Rekabet | Ürün (doğrulanmış slug) |
|---|---|---|---|---|---|
| 1 | Visceraal vet: waarom buikvet meer is dan cosmetiek | visceraal vet | 3.600 | DÜŞÜK | Triangle of Wellness (`triangle-of-wellness-xtreme`) |
| 2 | Telogene haaruitval: haar dat maanden later uitvalt | telogene haaruitval | 1.300 | DÜŞÜK | Rootist Densifying (`haarverdikkende-collectie-voor-volume`) |
| 3 | Vervroegde overgang: de overgang vóór je 40e | vervroegde overgang | 720 | DÜŞÜK | Sunrise (`sunrise-2-pack`) |
| 4 | Pre-overgangsklachten: de 10 jaar ervoor | pre overgangsklachten | 720 | ORTA | Sunrise (`sunrise-2-pack`) |
| 5 | Schilferende huid: oorzaken en wat voeding doet | schilferende huid | 880 | ORTA | Skin to Mind (`skin-to-mind-collection`) |
| 6 | Gewrichtspijnen in de overgang | gewrichtspijnen overgang | 880 | YÜKSEK | HL5 (`hl5-peach`) |
| 7 | Borrelende buik: gas, lucht en je darmen | borrelende buik | 480 | DÜŞÜK | Restore (`restore`) |
| 8 | Omega 3-6-9: heb je alle drie nodig? | omega3 6 9 | 880 | YÜKSEK | Sunset (`sunset`) |
| 9 | Rimpels boven je lip: wat werkt | rimpels bovenlip | 720 | YÜKSEK | Skin to Mind OptiMIST (`skin-to-mind-optimist-awaken-glow-facial-mist`) |
| 10 | Gebufferde vitamine C: beter of duurder? | gebufferde vitamine c | 1.300 | YÜKSEK | Sunrise (`sunrise-2-pack`) / ENERGY+ (`energy`) |
| 11 | Buikvet na je 50e: wat echt werkt | buikvet kwijtraken 50 plus | 880 | YÜKSEK | Triangle of Wellness (`triangle-of-wellness-xtreme`) |
| 12 | Dermaroller en haargroei: wat het wel en niet doet | dermaroller haargroei | 720 | YÜKSEK | Rootist (`verdikkend-serum-voor-fijn-haar`) |
| 13 | Spierbehoud na je 40e: eiwit + kracht | spieren bovenbeen | 2.400 | DÜŞÜK | HL5 (`hl5-2-pack`) / ENERGY+ (`energy`) |

**🌍 Landen (18-10-2026 ölçümü):** aynı kelimeler Belçika'da (nl, loc 2056) NL hacminin ~%20-25'i:
`visceraal vet` 880, `spieren bovenbeen` 880 (orta), `telogene haaruitval` 320, `schilferende huid` 210.
Ayrı BE makalesi gerekmiyor — başlıklar nl-NL kalır, `hreflang nl-BE` (ve nl-BE hedefleme) yeterli.

**Volgorde = prioriteitsscore (hoog → laag).** Schrijf ze in deze volgorde; #1-4 zijn de sterkste
"lage concurrentie"-kansen. Productfeit-check blijft verplicht (`data/products/*.json`), EFSA-formulering
alleen, geen genees-/behandelclaims.

**🚫 Gemeten maar bewust NIET in de kuyruk (YMYL — niet automatisch schrijven):** seborroïsch eczeem
(14.800, DÜŞÜK), LDL-cholesterolwaarden (12.100, DÜŞÜK), systolische bloeddruk (2.400, DÜŞÜK). Medische
diagnose/behandeling-intentie; alleen met handmatige redactie en artsverwijzing.

**Kwartaal-verversing:** deze tabel 3 maanden na dato opnieuw meten (`~/.hermes/scripts/kw_queue.py`)
voordat de kuyruk leegloopt — niet wachten tot 0/0.

---

## 🆕 27 OKTOBER 2026 — hermeting (DataForSEO) + verse onderwerpen

**Hermeting:** de 13 keywords van 18-10 zijn vandaag opnieuw gemeten (DataForSEO
`google_ads/search_volume`, NL, location 2528, 27-10-2026 14:35). **Alle 13 volumes zijn
ongewijzigd** (3.600 / 1.300 / 720 / 720 / 880 / 880 / 480 / 880 / 720 / 1.300 / 880 / 720 / 2.400)
— de bestaande tabel hieronder blijft dus geldig, geen correctie nodig.

**Nieuwe onderwerpen (vandaag gemeten, nog niet in de 227-artikelcorpus):**

| # | Onderwerp | Ölçülen keyword | Hacim/ay | Rekabet | Ürün (doğrulanmış slug) |
|---|---|---|---|---|---|
| A | REM-slaap: wat je hersenen 's nachts doen | rem slaap | 3.600 | DÜŞÜK | Sunset (`sunset`) |
| B | Slechte slaap: oorzaken en wat je zelf kunt aanpakken | slechte slaap | 1.900 | ORTA | Sunset (`sunset`) |
| C | Waar is zink goed voor? | waar is zink goed voor | 1.300 | ORTA | Triangle of Wellness (`triangle-of-wellness-xtreme`) |
| D | Hoeveel diepe slaap heb je per nacht nodig? | hoeveel diepe slaap per nacht | 1.000 | DÜŞÜK | Sunset (`sunset`) |

**Cluster-limiter is vandaag versoepeld (bug):** de poort keek naar de *hele*
onderwerp-omschrijving, inclusief productnamen en toelichtingen. Daardoor werd elk onderwerp
geblokkeerd zodra het model "… (met Triangle of Wellness als product)" of "… rol van vitamine A"
opschreef — 27-10 leverde dat 3 van 3 blokkades en **0 artikelen** op. Nu telt alleen de kop
(vóór " — " of " ("), met productnamen eruit gefilterd. Effect: 10 van de 29 kuyupregels passeren
de poort i.p.v. 7, en #1 (visceraal vet) komt vrij.

**Let op:** woorden die al in ≥3 titels staan blijven geblokkeerd (o.a. `collageen` 17x,
`vitamine` 18x, `probiotica` 11x, `energie` 9x, `haaruitval` 4x). Nieuwe onderwerpen moeten
buiten die clusters vallen — daarom staan hierboven twee slaap- en één zink-onderwerp.

---

## ⚠️ OKUMA SIRASI — Bu bölüm en yeni ve en güvenilir olandır

**17 Eylül 2026 itibariyle bu doğrulama yapıldı** — bkz. hemen altındaki "🆕 17 EYLÜL 2026"
bölümü. Aşağıdaki **"10 EYLÜL 2026 — Gerçek Keyword Planner Verisi (NL, 7 kategori)"** bölümü ham
veri olarak hâlâ geçerli (hacim/rekabet rakamları), ama hangi kelimenin gerçekten boşluk olduğuna
dair kendi iddiaları **güncel değil** — 17 Eylül bölümündeki tek tek doğrulanmış sonuçlara güven.

---

## 🆕 17 EYLÜL 2026 — NL kuyruğu FR (AmareFR) standardına getirildi: tam çapraz kontrol

**Metodoloji (AmareFR'nin `CONTENT_WORKFLOW.md`'deki "16/09/2026" bölümüyle aynı disiplin):** 10
Eylül'ün 7 kategori × top-25 ham keyword verisindeki (`content/keyword-research-2026-09-10.json`)
en yüksek hacimli/en düşük rekabetli adaylar, **121 mevcut makalenin tamamına** (77 `data/extra-
articles.json` + 44 `lib/blog.ts`, tek tek `grep`/python ile) karşı doğrulandı — sadece başlık
değil, makale **içeriği** de tarandı (bkz. kanıtlar altta).

**Sonuç, dürüstçe:** ilk bakışta "boşluk" gibi görünen adayların neredeyse tamamı **zaten
kapsanıyor** — site 121 makaleyle beklenenden çok daha olgun. Sadece **1 net, kanıtlanmış boşluk**
bulundu; onu şişirmek yerine olduğu gibi raporluyorum (FR'deki "Écarté volontairement" mantığıyla
aynı — kapsanan her aday, hangi makalenin kapsadığının kanıtıyla birlikte aşağıda listeli).

### ✅ Aksiyon alınacak (1 madde — checkbox format, FR ile aynı)

- [x] **YAZILDI 17/09/2026 (commit `e1646e4`).** **Probiotica-vergelijking (Kruidvat/Lucovitaal/
      Orthica) eksik** → **Restore / MentaBiotics**
      (`restore`, `mentabiotics`) — mot-clé: "probiotica orthica" ≈5.000/ay Yüksek, "probiotica
      kruidvat" ≈5.000/ay Yüksek, "lucovitaal probiotica" ≈5.000/ay Yüksek.
      **Neden bu net bir boşluk:** site zaten **aynı karşılaştırma formatını** 4 farklı üründe
      kullanıyor — "Kruidvat, Lucovitaal of Vitakruid: hoe verhoudt zich dat tot Sunset/Sunrise?"
      tablosu `omega-3-supplement-kopen-alles-wat-je-moet-weten`, `natuurlijke-vitamine-c-vs-
      synthetisch-vergelijking` ve `vitamine-d-energie-vermoeidheid-winter`'da var; ayrıca
      `beste-collageen-supplement-2026-werkt-echt`'te Orthica/Lucovitaal/Holland & Barrett'a karşı
      tam fiyat/doz tablosu var. **Sadece probiyotik bu 4'lü setin dışında kalmış** —
      `beste-probiotica-2026-kopen-vergelijken` başlığı "vergelijken" dese de içeriğinde Kruidvat/
      Lucovitaal/Vitakruid/Orthica/Holland kelimelerinden **hiçbiri geçmiyor** (python ile
      doğrulandı, bkz. kanıt).
      **Nasıl yapılmalı — YENİ MAKALE DEĞİL, ENRICHMENT:** 14 Eylül'deki b12/foliumzuur oturumunda
      kurulan "check-first, mevcut makaleyi zenginleştir, duplicate yaratma" kuralıyla aynı —
      `beste-probiotica-2026-kopen-vergelijken`'e aynı tablo formatıyla (ürün, tip, doz, fiyat,
      €/gün) bir "Kruidvat, Lucovitaal of Orthica: hoe verhoudt zich dat tot Restore/MentaBiotics?"
      bölümü eklenmeli. Zorunlu çapraz link kuralı (17/09) zaten otomatik uygulanıyor
      (`ensureCrossLinks()`), bu makalede muhtemelen zaten `/producten/restore` linki var —
      sadece rakip tablosu eksik.
      **Tahmini etki:** 15.000/ay toplam arama hacmi (3 kelime × 5.000), Yüksek rekabet ama sıfır
      yeni yazım riski (mevcut, zaten sıralanan bir sayfaya ekleme).
      **✅ Sonuç (17/09/2026):** `lib/blog.ts`'e eklendi, commit `e1646e4`, push'landı. Gerçek
      rakip verisi (web'den, uydurulmadı — bkz. commit mesajı): Kruidvat Pre-&Probiotica €6,99/30
      caps (3 miljard KVE, orthica.nl/kruidvat.nl kaynaklı), Lucovitaal V&M Complex €14,99/30 caps
      (6 stam, KVE etikette yok → "niet vermeld" yazıldı, uydurulmadı), Orthica Orthiflor Original
      €17,50/30 caps (officiële orthica.nl, 9 stam, 1 miljard KVE/capsule). Build + lokal server
      ile doğrulandı: `/restore`, `/mentabiotics`, `/darmgezondheid` hepsi 200. İki bilinen render
      hatası (ürün adı `<h2>`'de + cümle ortasında CTA kopması) önceden düzeltildi, tekrar
      yaşanmadı.

### ❌ Doğrulandı, ZATEN KAPSANIYOR — yazma (kanıtla)

- **ashwagandha (genel)** → `ashwagandha-kopen-nederland-complete-gids` + 3 diğer makale
  (`project_keyword_driven_content_b12_2026_09_14` referansı) — 4 makale zaten var.
- **collageen vs rakip marka (vitakruid/orthica/lucovitaal)** → `beste-collageen-supplement-
  2026-werkt-echt` içinde tam fiyat/tip/doz karşılaştırma tablosu (Orthica Collageen, Holland &
  Barrett dahil) zaten var.
- **omega-3 vs rakip marka / vorm (visolie)** → `omega-3-supplement-kopen-alles-wat-je-moet-weten`
  içinde "Kruidvat, Lucovitaal of Vitakruid: hoe verhoudt zich dat tot Sunset?" bölümü zaten var.
- **vitamine C vs rakip marka** → `natuurlijke-vitamine-c-vs-synthetisch-vergelijking` içinde aynı
  karşılaştırma bölümü zaten var.
- **vitamine D3 vs rakip marka + "teveel vitamine d" (bovengrens)** → `vitamine-d-energie-
  vermoeidheid-winter` içinde hem Vitakruid/Lucovitaal karşılaştırması HEM DE "bovengrens"
  (güvenli üst sınır) bilgisi zaten var — python ile doğrulandı. ⚠️ Tam "overdosis semptomları"
  odaklı ayrı bir makale hâlâ gri alan; yazmadan önce bu makalenin ilgili paragrafını oku, muhtemelen
  enrichment yeterli, yeni makale değil.
- **magnesium: welke vorm is het beste** → `magnesium-supplement-kopen-welke-vorm-nodig` (blog.ts)
  zaten tam bu başlıkla var.
- **darmflora stap-voor-stap herstellen** → `darmflora-verbeteren-herstel-spijsvertering-natuurlijk`
  ("Darmflora Verbeteren: 7 Manieren") zaten bu açıyı kapsıyor.
- **natuurlijk afvallen / vetverbranders "werken ze echt"** → `natuurlijk-afvallen-supplementen-
  metabolisme` ("Natuurlijk Afvallen: Wat Werkt Écht?") muhtemelen bu açıyı zaten kapsıyor —
  düşük güvenle işaretliyorum (başlık/excerpt kontrolü, tam içerik taranmadı), yazmadan önce
  mutlaka tam kontrol et.

### 🚫 Kategori tamamen elendi

- **`kids` kategorisi** — 8 keyword'ün tamamı ya çok düşük hacim (max 500/ay) ya da doğrudan rakip
  marka aramaları ("davitamon kindervitamines"). **Amare'nin hiçbir çocuk ürünü yok** (40 üründen
  hiçbiri `kids` kategorisinde). Ürünsüz, hacimsiz, marka-arama kategorisi — kuyruğa hiç girmemeli.

### Not — kuyruk mekanizması hâlâ FR'den daha zayıf bir noktada

Bu dosya hâlâ bir "redactieplan" (düz metin), FR'deki gibi satır bazlı `[x]`/`[ ]` durumu
otomatik script tarafından okunmuyor — `scripts/generate-article-claude.mjs` bu dosyayı bütün
olarak modele veriyor, seçim model-bazlı (bkz. README "Onderwerp-queue" notu, 15/09/2026).
Yukarıdaki `[ ]` checkbox'ı FR ile tutarlılık ve insan takibi için ekledim, ama script'in kendisi
bunu henüz parse etmiyor — güvence hâlâ 17/09'da eklenen "cluster-limiet" (kök kelime başına 3
kullanım sınırı) ve bu tek maddenin **enrichment** olması (yeni slug yaratmadığı için duplicate
riski yapısal olarak yok).

---

## 🆕 10 EYLÜL 2026 — Gerçek Keyword Planner Verisi (NL, 7 kategori, ham — doğrulanmamış)

> Kaynak: Google Ads Keyword Planner, gerçek hesap (971-159-3723), locatie=Hollanda, taal=Dutch,
> son 12 ay. Claude in Chrome üzerinden, kullanıcının kendi giriş yapılı Chrome'u kullanılarak
> canlı çekildi (sandboxed Browser pane'de passkey/şifre duvarına takıldı — bkz. oturum notu).
> Google Ads API Basic Access hâlâ onay bekliyor (bkz. memory `google-ads-api-basic-access-application`)
> — bu yüzden bu tur manuel/tarayıcı-destekli yapıldı, otomatik değil. Ham CSV'ler:
> `~/Downloads/Keyword Stats 2026-09-10 at *.csv` (7 dosya, kategori başına).
>
> **ÖNEMLİ — bu veri henüz mevcut 81+ makaleyle çapraz kontrol edilmedi.** Aşağıdaki hacimler
> gerçek ama "boşluk" iddiası değil — bir sonraki oturum her adayı `data/extra-articles.json` +
> `lib/blog.ts`'te arayıp gerçekten kapsanmıyor mu diye doğrulamalı (24 Ağustos bölümündeki
> yöntemle aynı).

### En yüksek hacimli gerçek bulgular (aylık arama, NL)

| Kelime | Hacim | Rekabet | Not |
|---|---|---|---|
| d3 e | 500.000 | Düşük | ⚠️ **-90% üç aylık VE yıldan yıla değişim** — muhtemelen geçici bir spike/anomali (viral video vb.), istikrarlı bir fırsat değil. Yazmadan önce Trends'te doğrula. |
| ashwagandha | 50.000 | Yüksek | **Hiçbir Amare ürününde ashwagandha yok** (tüm `data/products/*.json` tarandı, sıfır eşleşme) — sadece bilgilendirici içerik olabilir, ürün CTA'sı zorlama. Zaten 4 makale var (bkz. `project_adaptogenen_cluster_gsc_findings` memory). |
| probiotica | 50.000 | Yüksek | MentaBiotics + Restore'da zaten var, `/mentabiotics` ve `/restore` başlıklarında zaten kapsanıyor. |
| collageen | 50.000 | Yüksek | HL5'te zaten var, `/hl5` başlığında kapsanıyor. `hl5-2-pack` ürün sayfası eksikti — **bu oturumda düzeltildi** (bkz. commit). |
| vitamine d / vitamine c / omega 3 | her biri 50.000 | Yüksek | Sunrise/Sunset zaten kısmen kapsıyor (`/sunset` başlığı "Omega-3" içeriyor). |
| cortisol verlagen | 50.000 | Yüksek | **Amare'de doğrudan eşleşen ürün yok** — mevcut stres/adaptogenen içeriğiyle (informational) kapsanabilir, ürün zorlaması yapma. |
| overgangsklachten | 50.000 | Orta | Menopoz-spesifik Amare ürünü yok — mevcut `menopauze-supplement-*` makaleleriyle çapraz kontrol et. |
| eiwitshake | 5.000 | Yüksek | GBX Protein'e eşleşebilir — ürün var mı kontrol et, `data/extra-articles.json`'da eiwitshake araması yap. |

### Kategori bazlı tam top-25 listeleri
`content/keyword-research-2026-09-10.json` — 7 kategori (adaptogenen_hersenen, darmen,
schoonheid, essentials, hormonen, kids, gewichtsbeheer) × top 25 kelime, hacim+rekabet.

### Derinlemesine analiz (tüm 9.176 satır, sadece top-25 değil) — 10 Eylül 2026, ikinci geçiş

İlk geçiş sadece hacme göre top-25/kategori bakmıştı (~175 satır, verinin %2'si). Kullanıcı
sorunca tüm veri üzerinden gerçek bir analiz yapıldı — 4 eksen: soru formatlı (GEO/AEO), rakip
marka karşılaştırma, orta-hacim+düşük-rekabet gizli fırsatlar, marka-dışı satın-alma niyeti.

**En önemli bulgu — rakip marka karşılaştırma boşluğu:** "vitakruid" (Hollanda'nın en büyük
supplement perakende markası) neredeyse HER kategoride yüksek hacimle çıkıyor (ashwagandha
vitakruid, vitakruid collageen, vitakruid vitamine d, vitakruid visolie — hepsi 500-5.000/ay) —
ama `data/extra-articles.json` + `lib/blog.ts`'te "vitakruid" kelimesi **sıfır kez** geçiyor.
Amare'nin hiçbir rakip-karşılaştırma içeriği yok. Aynı şekilde kruidvat, lucovitaal, orthica da
sık tekrarlanıyor. Bir "Amare vs Vitakruid: [kategori] karşılaştırması" formatı gerçek, boş bir
niş — Amare eczane/drogisterij'de satılmadığı için bu doğrudan rakip değil, dürüst bir
karşılaştırma meşru içerik olur.

**Doğrulanmış gerçek boşluk (kontrol edildi, mevcut değil):**
- "teveel vitamine d" — 5.000/ay, **Düşük** rekabet, GEO-dostu (güvenlik/doz sorusu). Hiçbir
  makalede yok.

**Doğrulandı, ZATEN VAR — yazma:**
- "vitamine c hoeveel per dag" — `vitamine-c-tekort-symptomen-oorzaken-oplossingen` zaten
  kapsıyor.

**Diğer soru-formatlı fırsatlar (henüz tek tek doğrulanmadı, bir sonraki oturum kontrol etsin):**
vitamine d hoeveel per dag (5.000, Düşük), vitamine d3 hoeveel per dag (5.000, Orta), magnesium
welke is het beste (5.000), haaruitval welke vitamine (5.000, Yüksek), probiotica welke beste
(5.000).

**Gizli fırsatlar (orta hacim + düşük/orta rekabet, en kolay sıralanabilecekler):**
synbiotica (500, Orta), yakult bij antibiotica / antibiotica en yakult (500, Düşük — çok
spesifik ama gerçek arama davranışı, Restore/MentaBiotics'e bağlanabilir), gehydrolyseerd (500,
Düşük — mevcut HL5 pillar'ına long-tail destek olabilir).

Tam script: scratchpad'de `deep_analysis.py` (kalıcı değil, gerekirse tekrar yazılabilir —
mantığı: `data[i]` satırlarını soru-kelimesi/rakip-marka-listesi/hacim-rekabet eşiklerine göre
filtrele).

### Üçüncü geçiş — 364 ham adayı ~24 konu kümesine indirip TEK TEK doğrulama (10 Eylül 2026)

Kullanıcı "önce ürünlerimizde bunlar var mı bul, filtrele" dedi. 364 ham aday (hacim≥500) 24
gerçek konu kümesine indirildi ve her biri `data/extra-articles.json` + `lib/blog.ts` içinde
gerçekten arandı (sadece slug değil, içerik/excerpt de).

**EN BÜYÜK DOĞRULANMIŞ BOŞLUK — essentials marka-karşılaştırma:** `essentials` kategorisi bu
tüm veri setindeki en büyük kategori (6.334 kelime) ve neredeyse tamamı **Kruidvat / Lucovitaal
/ Vitakruid / Davitamon** marka isimleriyle vitamin/mineral kombinasyonlarından oluşuyor (her
biri 500/ay, ama onlarca varyant — toplamda binlerce arama). **Doğrulandı: vitamine D, vitamine
C, omega-3/visolie, multivitamine, magnesium için BU MARKALARA karşı sıfır içerik var** (ne
`extra-articles.json`'da ne `lib/blog.ts`'te). Bu, tüm veri setindeki tek en büyük yakalanmamış
fırsat.

**Önemli düzeltme — collageen marka karşılaştırması aslında ZATEN VAR:** İlk geçişte "vitakruid
sıfır kez geçiyor, hiç karşılaştırma yok" dedim — bu YANLIŞ/eksikti. `lib/blog.ts` satır 316-338
(muhtemelen `collageen-hl5-vs-supermarkt-vergelijken` makalesi) **Lucovitaal, Orthica, Kruidvat
ve Holland & Barrett'e karşı HL5'i fiyat/gram tablosuyla zaten karşılaştırıyor.** Sadece
**Vitakruid** (en yüksek hacimli marka, 5.000/ay "vitakruid collageen") o tabloda eksik — yeni
makale değil, mevcut tabloya bir satır eklemek yeterli.

**Doğrulanmış gerçek boşluklar (öncelik sırasıyla):**
| Konu | Maks. hacim | Durum |
|---|---|---|
| Essentials marka karşılaştırma (Kruidvat/Lucovitaal/Vitakruid vs Amare — vitamine D, C, omega-3, multivitamine, magnesium) | binlerce (toplam) | 🟡 **Vitamine D ✅ + Vitamine C ✅ yapıldı** (10-09). Omega-3/multivitamine/magnesium hâlâ boş. |
| Collageen tablosuna Vitakruid satırı ekle | 5.000 | 🟡 Küçük düzeltme, yeni makale değil |
| beste multivitamine (+ consumentenbond/vrouw/man/60+/70+ varyantları) | 500×~7 | 🔴 Boş |
| beste eiwitshake (+ afvallen/consumentenbond varyantları) | 500×~5 | 🔴 Boş |
| beste magnesium supplement / beste opneembare magnesium | 500×2 | 🔴 Boş |
| tot welke leeftijd vitamine d (RIVM-tipi soru) | 500 | 🔴 Boş |
| eiwitshake hoeveel per dag | 500 | 🔴 Boş |
| omega 3 in welke voeding | 500 | 🔴 Boş |
| collageen in welke voeding | 500 | 🔴 Boş |
| collageen bijwerkingen | 500 | 🔴 Boş |

**Doğrulandı, ZATEN VAR — yazma:** probiotica na antibiotica (3 makalede), vitamine D hoeveel
per dag (`vitamine-d-voeding-welke-producten-helpen-echt`), haaruitval welke vitamine (3
makalede), magnesium welke is beste (3 makalede), vitamine D in voeding, visolie/omega3 waarom
(2 makalede), vitamine D3+K2 kombinasyonu, omega3 hoeveel per dag, vitamine C hoeveel per dag
(`vitamine-c-tekort-symptomen-oorzaken-oplossingen`).

### Vitamine D — uygulandı (10 Eylül 2026)

`vitamine-d-energie-vermoeidheid-winter`'a şunlar eklendi, ayrı bir makale açmadan, mevcut
başlıkların altına doğal şekilde entegre edilerek:
- **Kruidvat, Lucovitaal of Vitakruid: hoe verhoudt zich dat tot Sunset?** — yeni H2,

... [OUTPUT TRUNCATED - 99 chars omitted out of 50,030 total] ...

ingsmiddelen, magnesium en voeding, magnesium in/welke voeding | ~30.000 (toplam varyant) | Orta | essentials — Sunrise | ✅ **02-09 doğrulandı: ZATEN VAR — YAZMA.** `waar-zit-magnesium-in-voedingsbronnen-supplementen-gids` (02-09'da pillar'a genişletildi — besin kaynakları + günlük öğün planı + doz tablosu) bunu tam kapsıyor. |
| ~~Q3~~ | ~~Magnesium Hoeveel Per Dag? Dosering & Veiligheid~~ | magnesium hoeveel per dag | 5.000 | Orta | essentials — Sunrise | ✅ **02-09 doğrulandı: ZATEN VAR — YAZMA.** Aynı pillar'a (`waar-zit-magnesium-in...`) 02-09'da birleştirildi — nüfus-grubu bazlı doz tablosu + RIVM istatistiği dahil. |
| Q4 | Magnesium Vormen Vergelijken: Tauraat, Orotaat, Citraat, Glycinaat | magnesium tauraat, magnesiumorotaat | 10.000 (toplam) | Yüksek | essentials — Sunrise, Sleep+ | 🟡 **02-09 doğrulandı: KISMEN VAR.** `magnesium-supplement-kopen-welke-vorm-nodig` zaten tauraat/citraat/glycinaat/bisglycinaat kapsıyor — sadece **orotaat** eksik. Sıfırdan makale YAZMA, mevcut makaleye küçük bir orotaat bölümü ekle. |
| ~~Q5~~ | ~~Collageen Tabletten/Poeder vs Vloeibaar Collageen: Wat Werkt Beter?~~ | collageentabletten, collageenpillen | 10.000 (toplam) | Yüksek | schoonheid — HL5 | ✅ **02-09 doğrulandı: ZATEN VAR — YAZMA.** `collageen-poeder-vs-pillen-vergelijking` (820 kelime) poeder/pillen/vloeibaar üçlü karşılaştırmasını, %90 vs %30 emilim istatistiğini ve HL5 konumlandırmasını tam kapsıyor; pillar'a (`vloeibaar-collageen-hl5-huid-haar-nagels`) doğru linkleniyor. |


> *Ads-Rekabet = Google Ads reklam-verenler rekabeti (CPC/bidding), organik SERP zorluğu DEĞİL — bir kelime
> Ads'te "Yüksek" olsa da organik ilk 10'da otorite eksikliği olabilir (ve tam tersi). Gerçek organik
> rakip-gücü verisi için orijinal "SEO Fırsat Araştırması" raporundaki canlı SERP kontrolüne bak —
> bu oturumda o raporun tam 592 satırlık tablosu teknik bir engel nedeniyle (artifact iframe erişimi)
> otomatik olarak çekilemedi, sadece özet istatistikleri görüldü. Sıralama burada bilerek hacim +
> doğrulanmış-boşluk öncelikli yapıldı, saf düşük-Ads-rekabet önceliği DEĞİL — çünkü gerçekten düşük
> Ads-rekabetli kelimelerin neredeyse hepsi ya zaten kapsanıyor ya da YMYL riskli çıktı (bkz. D bölümü).

### B. Öncelik 2 — Doğrulama gerekli (muhtemelen kısmen kapsanıyor, önce kontrol et)

| # | Konu | Neden şüpheli | Aksiyon |
|---|---|---|---|
| ~~Q6~~ | ~~Magnesium voor Spieren~~ | Mevcut `magnesium-onmisbaar-mineraal-rust-energie-spierherstel` pillar'ı zaten "spierherstel" kapsıyor olabilir | ✅ **02-09 doğrulandı: ZATEN VAR — YAZMA.** Pillar'da 9 ayrı "spier"-geçişi var, konu iyi kapsanıyor. |
| ~~Q7~~ | ~~Probiotica voor Darmen / Probiotica Vrouw~~ | 10 probiotica makalesi zaten var, olası örtüşme yüksek | ✅ **02-09 doğrulandı: ZATEN VAR — YAZMA.** "Probiotica Vrouw" `vaginale-probiotica-werkt-het-echt` (864 kelime) tarafından kapsanıyor. "Probiotica voor Darmen" zaten 8+ makalede doymuş durumda. |
| Q8 | Magnesiumspray / Magnesium Voetenbad | `magnesiumolie-spray-transdermaal-werkt-het` muhtemelen bunu zaten kapsıyor | 🔴 **02-09 doğrulandı: KISMEN.** Spray zaten kapsanıyor, ama "voetenbad" (ayak banyosu) hiç geçmiyor — gerçek küçük boşluk. Sıfırdan makale değil, mevcut makaleye kısa bir voetenbad bölümü eklenebilir. |
| ~~Q9~~ | ~~Vermoeide/Zware Benen varyantları~~ | `zware-benen-oorzaken-wat-helpt` zaten var, kalan varyantlar aynı sorgunun eş anlamlıları | ✅ **02-09 doğrulandı: ZATEN VAR — YAZMA.** Makale 839 kelime, kapsamlı. |

### C. Mevcut sayfayı güçlendir (yeni yazı DEĞİL — bkz. `amarenl-trafik-artirma-plani.md` bölüm 1)

| Sayfa | Sorun | Aksiyon |
|---|---|---|
| ~~`prebiotica-probiotica-verschil-darmen-uitleg`~~ | ~~687 kelime, hâlâ ince (hedef 1000+)~~ | ✅ **02-09 ÇÖZÜLDÜ.** 1255 kelimeye genişletildi (ISAPP resmi tanımları zaten vardı, `probiotica-prebiotica-mentabiotics-vergelijken`'in özgün içeriği — fiyat/kategori tablosu, "hangi kombinasyon sana uygun" bölümü, öz-izleme FAQ'ı — buraya birleştirildi, o makale 301 ile buraya yönlendirildi). |
| `amare wellness` sorgusuna karşılık gelen sayfa | Pozisyon 6.8 (02-09 GSC verisi — dosyadaki "pozisyon 8" biraz eski), 24 gösterim, 0 tıklama (CTR sorunu) | Hangi sayfanın bu sorguya karşılık geldiği 02-09'da netleştirilmedi (muhtemelen ana sayfa veya `/supplementen` — marka+kategori sorgusu). Bir sonraki oturumda GSC'de sayfa bazlı kontrol edip title/description gözden geçir. |

### D. YMYL / düşük öncelik — otomatik pipeline'a SOKMA

| Konu | Neden |
|---|---|
| me chronische vermoeidheid | Tıbbi durum (ME/CVS) — YMYL, otomatik yazım riskli, editöryel/insan incelemesi gerekir |
| behandeling bloedarmoede | "behandeling" kelimesi zaten sitenin kendi yasaklı terimler listesinde — anemi tedavisi iddiası riski |
| probiotica kinderen / probiotica babys | Çocuk sağlığı — YMYL, dikkatli ele alınmalı, otomatik pipeline'da düşük öncelik |
| jicht en vermoeidheid | Düşük hacim + anormal CPC (muhtemelen gürültü), gerçekçi öncelik değil |

### E. Marka/Ürün Sayfaları (Amare-branded — gerçek ürün kataloğuna göre düzeltildi)

> Kaynak (ilk taslak): Musa'nın Google Ads Keyword Planner'dan çektiği "amare" markalı 10
> kelimelik ek export (27 Ağustos 2026).
>
> **DÜZELTME — aynı gün, ikinci geçiş:** İlk taslak (M1-M3) sadece o küçük keyword export'una
> dayanıyordu, siteyle çapraz kontrol edilmemişti. Musa'nın "sitenin kendi ürün kataloğundan
> git" önerisi üzerine `data/products/` (39 gerçek SKU, ürün başlıkları) +
> `public/product-pdfs/PRODUCT_REFERENCE.md` (resmi ingrediyen/işlev bilgisi) ile
> `data/extra-articles.json` (78 makale) çapraz kontrol edildi. Sonuç: M2 ve M3 zaten
> kapsanıyormuş — siteyi kontrol etmeden öneri vermek hataydı. Aşağıda düzeltilmiş liste var.
>
> **Dikkat — "happy juice" tuzağı (hâlâ geçerli):** çıplak "happy juice" kelimesi Google'da
> Douglas parfümeri zincirinin bir tuvalet suyu ürünüyle karışıyor — kullanılacaksa mutlaka
> "Amare Happy Juice" olarak, başlıkta net şekilde.
>
> **Uyum notu (hâlâ geçerli):** Bu sayfalar ürün-adı odaklı, marka-adı odaklı değil — düşük
> risk, ama ilk yayından önce Amare sponsoruyla/compliance ile bir teyit önerilir.

| # | Konu / Başlık Önerisi | Durum | Not |
|---|---|---|---|
| ~~M2~~ | ~~Amare HL5 Uitgelegd~~ | ❌ ZATEN VAR — YAZMA | `vloeibaar-collageen-hl5-huid-haar-nagels` (11 mention) bunu tam kapsıyor. |
| ~~M3~~ | ~~Amare Producten Kopen / Ervaringen~~ | ❌ ZATEN VAR — YAZMA | `ervaringen-gebruikers-amare-supplementen` bunu tam kapsıyor. |
| M1 (revize) | Amare Sunset: Volledige Review (Vitamine E, D3, K2, Omega-3) | 🟡 **02-09 doğrulandı: KISMEN.** | Tam "boşluk" değil: 2 makale Sunset'in bazı bileşenlerini kapsıyor (`calcium-botten-supplement-nederland` — Sunset & Origin, calcium/D3/K2; `vitamine-e-huid-haar-supplement` — Sunset vitamine E). Sunrise'ınki gibi TEK kapsamlı review yok, iki dar-açılı makaleye bölünmüş. Sıfırdan mı yazılsın yoksa ikisi mi birleştirilsin — henüz karar verilmedi. |
| ~~M4~~ (yeni) | ~~Amare ON: Wat Is Het en Hoe Ondersteunt Het Mentale Focus?~~ | ❌ ZATEN VAR — YAZMA | ✅ **02-09 doğrulandı: dedike makale zaten var** (`b-vitamines-energie-supplement-nederland`, başlığı 02-09'da "Amare ON: B-Vitamines Voor Energie?" olarak kısaltıldı). Dosyanın "78 makalede sıfır kapsama" iddiası yanlıştı. |

> **Stratejik açık soru (Musa'nın kararı gerekiyor, otomatik pipeline'a eklenmedi):** Rootist
> (saç bakımı alt markası — şampuan, conditioner, serum, 13 SKU) neredeyse hiç kapsanmıyor: 78
> makalenin sadece 1'i saç/hoofdhuid konulu (`hoofdhuid-verdient-aandacht-clarify-serum-haaruitval`).
> Bu küçük bir ek değil — farklı bir müşteri niyeti ve muhtemelen ayrı anahtar kelime
> araştırması gerektiren, potansiyel olarak yeni bir içerik kolu. Musa isterse ayrı bir
> araştırma turu yapılabilir; şimdilik kuyruğa eklenmedi.

---


## 🆕 30 GÜNLÜK PLAN — 15 Makale, 2 Günde Bir (17 Tem — 15 Ağu 2026)

> Kaynak: Ahrefs NL + Google Ads + keywords-onderzoek.md
> **Strateji:** En yüksek hacimli kapsanmamış anahtar kelimeler × ticari niyet

| Gün | Tarih | # | Anahtar Kelime | Arama | Makale | Ürün |
|-----|-------|---|---------------|--------|--------|------|
| 1 | 17 Tem | P1 | **collageen** | **16.000** | ✅ Collageen Complete Gids — yayında | HL5 |
| 2 | 19 Tem | P2 | **collageen poeder** | **12.000** | Collageen Poeder vs Vloeibaar: Wat Is Beter? | HL5 |
| 3 | 21 Tem | M1 | **waar zit magnesium in** | **4.600** | Waar Zit Magnesium In? Voedingsbronnen & Supplementen | Sunrise |
| 4 | 23 Tem | M2 | **magnesium slaap** | **4.200** | ✅ magnesium-supplement-slapen-spieren-stress — yayında (2 duplicate 15-08'de temizlendi) | Sleep+, Sunset |
| 5 | 25 Tem | V1 | **vitamine d voeding** | **5.100** | Vitamine D in Voeding: Welke Producten Helpen Echt? | Sunrise |
| 6 | 27 Tem | V2 | **vitamine c tekort** | **1.700** | Vitamine C Tekort: Symptomen, Oorzaken & Oplossingen | Sunrise, VitaGBX |
| 7 | 29 Tem | O1 | **omega-3 bijwerkingen** | **3.800** | Omega-3 Bijwerkingen en Voordelen: Eerlijk Verhaal | Sunset, OmMega |
| 8 | 31 Tem | S1 | **natuurlijke ontstekingsremmers** | **1.800** | Natuurlijke Ontstekingsremmers: Supplementen Die Werken | Restore, OmMega |
| 9 | 2 Ağu | H1 | **overgang supplementen** | **2.300** | ✅ menopauze-supplement-natuurlijke-ondersteuning-overgang — yayında (2 duplicate 15-08'de temizlendi) | Ignite Her, Sunset |
| 10 | 4 Ağu | E1 | **supplementen abonnement** | **2.900** | Supplementen Abonnement: Elke Maand in Huis | Happy Juice Pack |
| 11 | 6 Ağu | I1 | **ijzertekort supplementen** | **1.400** | IJzertekort: Supplementen Die Echt Helpen | Sunrise |
| 12 | 8 Ağu | C1 | **collageen mannen** | **800** | ✅ collageen-mannen-30-huid-gewrichten-spierherstel — yayında (2 duplicate 15-08'de temizlendi) | HL5 |
| 13 | 10 Ağu | C2 | **collageen resultaten** | **600** | Collageen Resultaten: Voor en Na 4-8-12 Weken | HL5 |
| 14 | 12 Ağu | Z1 | **zwangerschap supplementen** | **1.300** | Zwangerschap en Supplementen: Wat Mag Wel en Niet? | VitaGBX |
| 15 | 14 Ağu | W1 | **winter supplementen** | **800** | Supplementen Tegen Winterdip: Voorbereiden op de Kou | Sunrise, Sunset |

> **Toplam potansiyel: ~58.000 aylık arama**
> Kural: Her makale ≥1200 kelime, 4+ H2, FAQ, NVWA, iç linkler

### 🎯 COLLAGEEN CLUSTER (arka planda devam)

### 🎯 COLLAGEEN CLUSTER (Mevcut 7 + Yeni 6 = 13 içerik)

> ⚠️ **HER MAKALEDE VURGULA:** HL5 sıvı form → toz/pastil collagen'den 3x daha iyi emilim.
> USP'ler: Vloeibaar (max opname) | 5g gehydrolyseerd collageen | Vit C + Hyaluronzuur + Biotine | Klinisch onderzocht
> Rakip karşılaştırması: Toz collagen ~%30 emilim → HL5 sıvı ~%90 emilim (vloeistof gaat direct naar bloedbaan)

| # | Anahtar Kelime | Arama | Açı / Makale | Ürün | Status |
|---|---------------|--------|-------------|------|--------|
| **P1** | **collageen** | **16.000** | 🔴 Collageen: De Complete Gids 2026 — Pillar Page — **Sıvı vs Toz karşılaştırması öne çıksın** | HL5 (vloeibaar) | ⏳ |
| **P2** | **collageen poeder** | **12.000** | 🟡 Collageen Poeder vs Vloeibaar: Wat Is Beter? — **HL5 sıvı = 3x betere opname** | HL5 | ⏳ |
| **P3** | collageen mannen | ~800 | 🟢 Collageen voor Mannen 30+ — **Vloeibaar, makkelijk in ochtendroutine** | HL5 | ✅ (collageen-mannen-30-huid-gewrichten-spierherstel, 2 duplicate 15-08 opgeruimd) |
| **P4** | collageen resultaten | ~600 | 🟢 Collageen Resultaten: Voor en Na 4-8-12 Weken — **Sıvı = sneller zichtbaar** | HL5, NeuCollagen | ⏳ |
| **P5** | collageen type 1 2 3 | ~500 | 🟢 Collageen Types — **HL5 Type 1&3 vloeibaar = beste opname** | HL5, NeuCollagen | ⏳ |
| **P6** | collageen vitamine c | ~400 | 🟢 Collageen + Vitamine C — **HL5 bevat al Vit C + Hyaluronzuur** | HL5, Sunrise | ⏳ |

> Mevcut 7 collagen yazısı + bu 6 yeni = **13 içeriklik cluster** → Google'da "collageen" için otorite

### 🔥 DİĞER YÜKSEK HACİMLİ HEDEFLER

| # | Anahtar Kelime | Arama | Makale | Ürün | Status |
|---|---------------|--------|--------|------|--------|
| **7** | **waar zit magnesium in** | **4.600** | Waar Zit Magnesium In? Voedingsbronnen & Supplementen Gids | Sunrise | ⏳ |
| **8** | **supplementen abonnement** | **2.900*** | Supplementen Abonnement: Elke Maand in Huis (Amare vs VitaminesPerPost) | Happy Juice Pack | ⏳ |
| **9** | **waar zit vitamine c in** | **1.700** | Waar Zit Vitamine C In? Voeding vs Supplementen | Sunrise | ⏳ |
| **10** | **zwangerschap supplementen** | **1.300*** | Zwangerschap en Supplementen: Wat Mag Wel en Niet? | VitaGBX | ⏳ |

> \* Rakip anahtar kelimeden türetilmiş (vitaminesperpost, davitamon)
> Toplam potansiyel: **~40.800 aylık arama**
> Yayın takvimi: 2 günde bir (Pzt-Çrş-Cum) → 3 haftada tamamlanır

---

### 📅 Yayın Takvimi

```
Week 1: B3-1 (Pzt 21 jul) → B3-2 (Çrş 23 jul) → B3-3 (Cum 25 jul)
Week 2: B3-4 (Pzt 28 jul) → B3-5 (Çrş 30 jul) → B3-6 (Cum 1 aug)
```

---

## 🆕 NIEUWE BATCH — Juli 2026 (15 artikelen)

> **Legenda:** ⏳ = te schrijven | ✍️ = in progress | ✅ = gepubliceerd

### 🔴 TIER 1 — High Volume + High Commercial Intent (4 artikelen)

| # | Makale Başlığı (NL) | Slug | Kategori | Hedef Ürün | Arama* | Status |
|---|---------------------|------|----------|------------|--------|--------|
| N1 | Haaruitval bij Vrouwen: Oorzaken & Natuurlijke Oplossingen | haaruitval-vrouwen-oorzaken-natuurlijke-oplossingen | schoonheid | HL5, NeuCollagen | 2.600 | ⏳ |
| N2 | Overgang en Supplementen: Natuurlijke Ondersteuning bij de Menopauze | ~~overgang-supplementen-menopauze-natuurlijk-ondersteuning~~ → menopauze-supplement-natuurlijke-ondersteuning-overgang | hormonen | Ignite Her, Sunset | 2.300 | ✅ (duplicate opgeruimd 15-08) |
| N3 | Prebiotica vs Probiotica: Wat is het Verschil en Heb je Beide Nodig? | prebiotica-probiotica-verschil-darmen-uitleg | darmen | MentaBiotics, SeedFiber | 900 | ⏳ |
| N4 | Vitamine D Tekort in Nederland: Oorzaken, Symptomen & Oplossingen | vitamine-d-tekort-nederland-oorzaken-oplossingen | essentials | Sunrise, Sunset | 5.100 | ⏳ |

### 🟡 TIER 2 — Medium Volume + Specific Intent (5 artikelen)

| # | Makale Başlığı (NL) | Slug | Kategori | Hedef Ürün | Arama* | Status |
|---|---------------------|------|----------|------------|--------|--------|
| N5 | Darm-Huid Connectie: Hoe Je Darmen Je Huid Beïnvloeden | ~~darm-huid-connectie-probiotica-stralende-huid~~ → darm-huid-connectie-gezondheid-stralende-huid-probiotica | darmen | DermaBiotics, MentaBiotics | 1.200 | ✅ (duplicate opgeruimd 15-08) |
| N6 | Beste Supplementen voor de Overgang: Complete Gids 2026 | ~~beste-supplementen-overgang-menopauze-2026~~ → menopauze-supplement-natuurlijke-ondersteuning-overgang | hormonen | Ignite Her, Sunset, HL5 | 1.500 | ✅ (duplicate opgeruimd 15-08) |
| N7 | Collageen en Gewrichten: Werkt Het Echt voor Pijnverlichting? | collageen-gewrichten-pijnverlichting-supplement | schoonheid | HL5, NeuCollagen | 1.100 | ⏳ |
| N8 | Natuurlijke Ontstekingsremmers: Supplementen Die Werken | natuurlijke-ontstekingsremmers-supplementen | essentials | OmMega, Restore, Sunrise | 1.800 | ⏳ |
| N9 | Ashwagandha vs Rhodiola: Welk Adaptogeen Past Bij Jou? | ashwagandha-vs-rhodiola-adaptogeen-vergelijking | mentaal | MentaBiotics, EDGE+ | 950 | ⏳ |

### 🟢 TIER 3 — Emerging Niches & GEO Queries (6 artikelen)

| # | Makale Başlığı (NL) | Slug | Kategori | Hedef Ürün | Arama* | Status |
|---|---------------------|------|----------|------------|--------|--------|
| N10 | Wat Zijn Adaptogenen? De Complete Beginnersgids | adaptogenen-beginnersgids-wat-zijn-het | mentaal | EDGE+, MentaFocus | 700 | ⏳ |
| N11 | Hoe Herken Je een Vitamine D Tekort? Symptomen & Test | ~~vitamine-d-tekort-symptomen-test~~ → vitamine-d-tekort-symptomen | essentials | Sunrise, VitaGBX | 800 | ✅ (duplicate opgeruimd 15-08) |
| N12 | Darmgezondheid Verbeteren: 10 Dagelijkse Gewoontes | darmgezondheid-verbeteren-dagelijkse-gewoontes | darmen | MentaBiotics, Restore, SeedFiber | 1.300 | ⏳ |
| N13 | Collageen Poeder vs Pillen: Wat is Beter? | collageen-poeder-vs-pillen-vergelijking | schoonheid | HL5, NeuCollagen | 600 | ⏳ |
| N14 | Supplementen bij Winterdip: Voorkomen & Behandelen | supplementen-winterdip-voorkomen-behandelen | mentaal | Sunrise, Sunset, Energy+ | 500 | ⏳ |
| N15 | De Gut-Brain Axis en Slaap: De Connectie Uitgelegd | gut-brain-axis-slaap-connectie-nachtrust | darmen | Sleep+, MentaBiotics, Sunset | 650 | ✅ (al live) |

> *Tahmini aylık NL arama hacmi

### 📅 Yayın Takvimi (2 günde bir)

```
Week 1: N1 (ma) → N2 (wo) → N3 (vr)
Week 2: N4 (ma) → N5 (wo) → N6 (vr)
Week 3: N7 (ma) → N8 (wo) → N9 (vr)
Week 4: N10 (ma) → N11 (wo) → N12 (vr)
Week 5: N13 (ma) → N14 (wo) → N15 (vr)
```

---

## 📊 Dutch Market Priority Matrix — Mayıs 2026

> **Legenda:** ✅ = gepubliceerd (live) | 🔄 = onderwerp gecovered door gerelateerd artikel | ⏳ = nog te schrijven

### 🔴 TIER 1 — High Volume + High Commercial Intent

| # | Makale Başlığı (NL) | Slug | Kategori | Hedef Ürün | Arama* | Status |
|---|---------------------|------|----------|------------|--------|--------|
| 1 | Probiotica en Je Stemming | probiotica-stemming-darm-hersen-connectie | darmen | MentaBiotics, Restore | 3.200 | ⏳ |
| 2 | Beste Collageen Supplement 2026 | beste-collageen-supplement-2026-werkt-echt | schoonheid | HL5, NeuCollagen | 2.800 | ⏳ |
| 3 | Natuurlijk Afvallen Supplementen | natuurlijk-afvallen-supplementen-metabolisme | gewichtsbeheer | FIT20, EDGE+ | 2.400 | ⏳ |
| 4 | Supplementen voor Meer Energie | supplementen-meer-energie-zonder-crash-natuurlijk | energie | Energy+, Happy Juice | 2.100 | ⏳ |

### 🟡 TIER 2 — High Volume + Informational Intent

| # | Makale Başlığı (NL) | Slug | Kategori | Hedef Ürün | Arama* | Status |
|---|---------------------|------|----------|------------|--------|--------|
| 5 | Vitamine D Tekort in Nederland | vitamine-d-tekort-nederland-oorzaken-oplossingen | essentials | Sunrise, Sunset | 5.100 | 🔄 |
| 6 | Magnesium voor Slaap en Stress | ~~magnesium-slaap-stress-spierontspanning-voordelen~~ → magnesium-supplement-slapen-spieren-stress | essentials | MentaBiotics, Restore | 4.200 | ✅ (al live onder ander slug) |
| 7 | Omega-3: De Ultieme Gids | omega-3-hersenen-hart-voordelen-supplementen | essentials | Sunset, OmMega | 3.800 | ⏳ |
| 8 | Haaruitval bij Vrouwen | haaruitval-vrouwen-oorzaken-natuurlijke-oplossingen | schoonheid | Rootist, HL5 | 2.600 | 🔄 |
| 9 | Overgang en Supplementen | ~~overgang-supplementen-menopauze-natuurlijk-ondersteuning~~ → menopauze-supplement-natuurlijke-ondersteuning-overgang | hormonen | Ignite Her, Sunset | 2.300 | ✅ (duplicate opgeruimd 15-08) |
| 10 | Stress Verminderen met Supplementen | stress-verminderen-supplementen-cortisol-ontspanning | mentaal | MentaBiotics, MentaFocus | 2.100 | ✅ (al live, duplicate stress-verminderen-supplementen-die-echt-werken opgeruimd 15-08) |

### 🟢 TIER 3 — Medium Volume + Specific Intent

| # | Makale Başlığı (NL) | Slug | Kategori | Hedef Ürün | Arama* | Status |
|---|---------------------|------|----------|------------|--------|--------|
| 11 | De Gut-Brain Connectie | gut-brain-connectie-darmen-stemming-mentaal | darmen | MentaBiotics, Happy Juice | 2.000 | ⏳ |
| 12 | Adaptogenen: De Complete Gids | adaptogenen-natuurlijke-stressverlichting-ashwagandha-rhodiola | mentaal | MentaFocus, EDGE+ | 1.800 | ⏳ |
| 13 | Beste Eiwitpoeder 2026 | beste-eiwitpoeder-2026-plantaardig-wei-vergelijking | essentials | Origin, FIT20 | 1.600 | ⏳ |
| 14 | Collageen Peptiden: Werkt Het Echt? | collageen-peptiden-werkt-echt-wetenschap-resultaten | schoonheid | HL5, NeuCollagen | 1.400 | ⏳ |
| 15 | Huidverzorging van Binnenuit | huidverzorging-van-binnenuit-supplementen-stralende-huid | schoonheid | Skin to Mind, HL5 | 1.300 | ⏳ |

### 🔵 TIER 4 — Emerging Niches / Seasonal

| # | Makale Başlığı (NL) | Slug | Kategori | Hedef Ürün | Arama* | Status |
|---|---------------------|------|----------|------------|--------|--------|
| 16 | Cortisol Verlagen | cortisol-verlagen-natuurlijk-stresshormoon-balans | hormonen | MentaBiotics, Ignite | 1.200 | ⏳ |
| 17 | Beter Slapen Zonder Medicatie | ~~beter-slapen-zonder-medicatie-supplementen-nachtrust~~ → natuurlijke-slaap-supplementen-beter-slapen-zonder-melatonine | wellness | Sleep+, Sunset | 1.100 | ✅ (duplicate opgeruimd 15-08) |
| 18 | Hormoonbalans Vrouw | hormoonbalans-vrouw-supplementen-levensfase | hormonen | Ignite Her, Sunset | 950 | ⏳ |
| 19 | Prebiotica vs Probiotica | prebiotica-probiotica-verschil-darmen-uitleg | darmen | MentaBiotics, SeedFiber | 900 | 🔄 |
| 20 | Kids en Supplementen | kids-supplementen-nodig-groei-focus-school | kids | Kids VitaGBX, Kids Mood+ | 700 | ⏳ |

> *Tahmini aylık NL arama hacmi (Google Ads + Trends verisine dayalı)

---

## 🗓 12 Artikelen — 2 Günde Bir Yayın Takvimi (19 Mayıs — 11 Haziran 2026)

> Bron: vitaalroute-agent-keywords.md

| Gün | # | Anahtar Kelime | Ürün CTA | Status |
|-----|---|---------------|----------|--------|
| Ma 19 mei | 1 | vitamine D tekort symptomen | Sunrise | ⏳ |
| Wo 21 mei | 2 | beste probiotica 2026 | MentaBiotics | ⏳ |
| Vr 23 mei | 3 | collageen supplement kopen | HL5 2-Pack | ⏳ |
| Zo 25 mei | 4 | ashwagandha kopen nederland | EDGE+ | ⏳ |
| Di 27 mei | 5 | gut brain connectie | Happy Juice Pack | ⏳ |
| Do 29 mei | 6 | haaruitval supplement vrouwen | HL5 | ⏳ |
| Za 31 mei | 7 | focus supplement | EDGE+ | ⏳ |
| Ma 2 jun | 8 | hormoonbalans supplement vrouwen | Ignite for HER | ⏳ |
| Wo 4 jun | 9 | darmflora verbeteren | Restore | ⏳ |
| Vr 6 jun | 10 | supplement routine ochtend | Triangle of Wellness | ⏳ |
| Zo 8 jun | 11 | plantaardige proteïne shake kopen | Origin | ⏳ |
| Di 10 jun | 12 | menopauze supplement | Ignite for HER | ⏳ |

> ⏰ Cron: her 2 günde bir saat 9:57'de yeni makale yayınlanır.
> Her makale 1200+ kelime, SEO-GEO optimize, ilgili ürüne AffiliateCTA linki içerir.
> **12/12 pipeline voltooid — 10 juni 2026** 🎉

---

## 🆕 Bonus: 3 Vergelijkingsartikelen (Juni 2026)

| # | Titel | Slug | Categorie | Product | Datum | Status |
|---|-------|------|-----------|---------|-------|--------|
| B1 | Collageen HL5 vs Supermarkt Collageen: Wat is het Verschil? | collageen-hl5-vs-supermarkt-vergelijken | schoonheid | HL5 | 12 jun | ⏳ |
| B2 | Happy Juice Pack vs Losse Supplementen: Wat is Voordeliger? | happy-juice-pack-vs-losse-supplementen-vergelijken | mentaal | Happy Juice Pack | 14 jun | ⏳ |
| B3 | Probiotica vs Prebiotica vs MentaBiotics: De Complete Vergelijking | probiotica-prebiotica-mentabiotics-vergelijken | darmen | MentaBiotics, Restore | 16 jun | ⏳ |

---

## 🔑 Anahtar Kelime → Ürün Eşleştirme Matrisi (Güncel — Live Artikelen)

| Ürün | Gepubliceerde Artikelen (slug) |
|------|-------------------------------|
| **MentaBiotics** | beste-probiotica-2026-kopen-vergelijken, probiotica-stemming-darm-hersen-connectie-mentabiotics, probiotica-prebiotica-mentabiotics-vergelijken, darmflora-verbeteren-herstel-spijsvertering-natuurlijk, prebiotica-vezels-darmen-gezondheid-voeding-supplementen |
| **Happy Juice Pack** | gut-brain-connectie-darmen-stemming-mentaal, happy-juice-pack-vs-losse-supplementen-vergelijken, supplementen-voor-meer-energie-dit-werkt-echt |
| **Energy+** | supplementen-voor-meer-energie-dit-werkt-echt, happy-juice-pack-vs-losse-supplementen-vergelijken, altijd-moe-ontdek-hoe-cel-energie-jouw-energieniveau-bepaalt |
| **HL5** | collageen-supplement-kopen-waar-op-letten, collageen-hl5-vs-supermarkt-vergelijken, haaruitval-supplement-vrouwen-oorzaken-oplossingen |
| **Ignite for HER** | hormoonbalans-supplement-vrouwen-levensfase-ondersteuning, menopauze-supplement-natuurlijke-ondersteuning-overgang |
| **Restore** | darmflora-verbeteren-herstel-spijsvertering-natuurlijk, probiotica-prebiotica-mentabiotics-vergelijken, prebiotica-vezels-darmen-gezondheid-voeding-supplementen |
| **EDGE+** | ashwagandha-kopen-nederland-adaptogeen-supplement, focus-supplement-natuurlijke-nootropics-concentratie, happy-juice-pack-vs-losse-supplementen-vergelijken |
| **Sunrise** | vitamine-d-tekort-symptomen, supplement-routine-ochtend-timing-schema |
| **Sunset** | adaptogenen-stress-supplement-nederland, omega-3-hersenen-supplement-nederland |
| **Origin** | plantaardige-proteine-shake-kopen-vergelijken, beste-eiwitpoeder-2026-plantaardig-wei-vergelijking |
| **FIT20** | natuurlijk-afvallen-supplementen-metabolisme, beste-eiwitpoeder-2026-plantaardig-wei-vergelijking |
| **Triangle of Wellness** | supplement-routine-ochtend-timing-schema |

---

## 📋 Her Makale İçin Zorunlu Yapı (GEO-Optimize)

```yaml
Başlık: "[Anahtar Kelime İçeren SEO Başlığı — max 60 karakter]"
Slug: "[benzersiz-url-slug]"
Kelime Sayısı: 1.200-1.800
Anahtar Kelime: "[primary keyword]"
FAQ Soruları (min 3):
  - "Wat is [X] en hoe werkt het?"
  - "Is [X] veilig om dagelijks te gebruiken?"
  - "Hoe snel zie je resultaat van [X]?"
Yapı:
  H2: Wat is [X] en waarom is het belangrijk? (150-200 kelime, keyword in ilk 100)
  H2: [Fayda/bilimsel açıklama] (200-300 kelime)
  H2: [Pratik tavsiyeler/çözümler] (200-300 kelime)
  H2: Veelgestelde vragen (3 soru × 40-60 kelime)
  H2: Conclusie (kısa özet + yumuşak ürün tavsiyesi)
Affiliate CTA: AfiliateCTA bileşeni ile
Disclaimer: "* Deze uitspraken zijn niet beoordeeld door de NVWA..."
```

## ⚠️ Kritik GEO/SEO Kuralları
- ❌ VERBODEN TERMEN: "geneest" / "behandelt" / "klinisch bewezen" / "voorkomt" — nooit gebruiken in artikelen
- ✅ "ondersteunt", "draagt bij aan", "veel gebruikers ervaren"
- ✅ NVWA disclaimer her makalede zorunlu
- ✅ Anahtar kelime ilk 100 kelimede geçmeli
- ✅ En az 1 adet wetenschappelijke referans (Voedingscentrum, PubMed)
- ✅ Her makale EN AZ 2 farklı Amare ürününe iç link içermeli
- ✅ JSON-LD Article + FAQ schema otomatik eklenecek

## 📊 Kategori Dağılımı (Güncel — 42 artikelen live)

| Kategori | Pipeline | Vergelijking | TIER | Origineel | Bonus | Totaal Live |
|----------|----------|-------------|------|-----------|-------|-------------|
| darmen (Gut Health) | 3 | 1 | 1 | 3 | 2 | 10 |
| schoonheid (Beauty) | 3 | 1 | 2 | 2 | — | 8 |
| essentials (Vitamines) | 2 | — | 2 | 5 | — | 9 |
| mentaal (Mental Wellness) | 2 | 1 | 2 | 2 | — | 7 |
| hormonen (Hormones) | 2 | — | 1 | 1 | — | 4 |
| energie (Energy) | — | — | — | 1 | — | 1 |
| kids | — | — | 1 | 1 | — | 2 |
| wellness | — | — | 1 | 1 | — | 2 |
| **TOPLAM** | **12** | **3** | **10** | **16** | **2** | **43** |

---

## 📈 TIER Voortgang

| TIER | Totaal | ✅ Live | 🔄 Gecovered | ⏳ Open |
|------|--------|---------|-------------|---------|
| TIER 1 (High + Commercial) | 4 | 4 | 0 | 0 |
| TIER 2 (High + Info) | 6 | 3 | 3 | 0 |
| TIER 3 (Medium) | 5 | 5 | 0 | 0 |
| TIER 4 (Niche/Seasonal) | 5 | 4 | 1 | 0 |
| **TOTAAL** | **20** | **16** | **4** | **0** |

> Alle 20 TIER-artikelen voltooid! 🎉 16 live, 4 onderwerpen gecovered door gerelateerde artikelen onder andere slugs.

---

## 🧭 9 OKTOBER 2026 — GEO/AI-zichtbaarheidsmeting (3 motoren × 8 vragen × 4 sites)

**Meting (live, herhaalbaar):** 8 vragen per site (2 discovery / 2 vergelijking / 2 feitelijk / 2 geschiktheid),
gesteld aan **Perplexity Pro, Grok (web) en Gemini (web)** — 96 geldige runs, elke vraag in een nieuwe sessie.
Meetbestanden: `~/Documents/geo-visibility/` (`run_geo.py`, `runs/raw-*.jsonl`, panel in `reports/`).

**Uitkomst vitaalroute.nl:**
- **Discovery-vragen: 0/5 genoemd bij alle drie de motoren** (stress/nachtrust, moe wakker worden, darm-hersenas
  vs. gewone vitaminepillen, betrouwbare NL-webshops, persoonlijk advies).
- **Merkvragen (naam wél genoemd): 3/3 — maar het antwoord is negatief:** "geen bekende/actieve webshop onder deze
  naam te vinden … wees extra alert, zoek KvK/keurmerken/reviews". Dat is een **vertrouwensprobleem**, geen
  zichtbaarheidsprobleem: de motoren kennen het domein onvoldoende als aanbieder.
- **Enige echte contentleemte:** de advies/begeleidingsvraag (V08) — **0 bestaande artikelen** (gecontroleerd tegen
  132 bestaande artikelen in `data/extra-articles.json` + `lib/blog.ts`).

**Waarom dit géén nieuwe artikelen vraagt (dedupe-uitkomst):** de vier discovery-thema's zijn al gedekt —
V01 `supplementen-stress-burn-out-wat-helpt-echt` + `natuurlijke-slaap-supplementen-beter-slapen-zonder-melatonine`;
V02 `waarom-altijd-moe-oorzaken-oplossingen` + `beste-supplementen-tegen-vermoeidheid-energie`;
V03 `prebiotica-probiotica-verschil-darmen-uitleg` + `darmgezondheid-verbeteren-dagelijkse-gewoontes`;
V04 `omega-3-supplement-kopen-alles-wat-je-moet-weten` + `collageen-hl5-vs-supermarkt-vergelijken`.
Een nieuw artikel zou een content-farm-duplicate zijn (max 2 per cluster-regel).

### ✅ Actie 1 — nieuwe pagina (enige bewezen gap)
- [ ] **`/persoonlijk-advies`** (of enrichment van `/over-ons`): direct antwoord op "waar krijg ik persoonlijk
      advies over supplementen voor energie en slaap, met begeleiding?" — voor wie, hoe het werkt (gratis intake,
      productkeuze op basis van leefstijl/vragenlijst), doorlooptijd, wat het **niet** is (geen medisch advies),
      FAQ-blok van 5 vragen + `FAQPage` JSON-LD. Geen genees-/behandelclaims (EFSA-formulering).

### ✅ Actie 2 — citatie-waardigheid van bestaande pagina's (geen nieuwe artikelen)
- [ ] De 8 pagina's hierboven: per pagina één **direct antwoord** in de eerste alinea, een `FAQPage`-blok waarin de
      vraag letterlijk de zoekvraag is, en elk cijfer met **datum + bron + eenheid**. Dit is de vorm die
      AI-antwoorden letterlijk overnemen (Rankie-protocol, dag 4: "maak één pagina bruikbaar").

### ✅ Actie 3 — entiteit & vertrouwen (tegen het "onbekende webshop"-antwoord)
- [x] **Live 9/10/2026** (commit `de0978d`, geverifieerd met curl): `Organization.sameAs` naar de zustersites,
      cross-domain `hreflang` (nl-NL/fr-FR/de-DE/x-default) en `FAQPage` op de homepage.
- [ ] KvK-nummer, retourbeleid en auteurspagina zichtbaar én in schema (`Organization`/`AboutPage`) — alleen
      verifieerbare feiten, niets verzinnen.

**Herhaalmeting:** dezelfde 8 vragen + dezelfde motoren + datum, over 4 weken. Alleen dan is "verbeterd" een
uitspraak; andere vragen of motoren maken de vergelijking ongeldig.