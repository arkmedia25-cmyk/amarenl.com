# AmareNL Article Queue — SEO-GEO-AEO İçerik Planı
> Laatste update: 2026-08-24 (öncelik kuyruğu eklendi — bkz. bölüm aşağıda)
> Status: 20/20 TIER ✅ | 3 vergelijkingsartikelen ✅ | NIEUWE BATCH: 15/15 ✅ | **BATCH 3: 0/6 ⏳** | Totaal 74+ artikelen live
> Deploy: Vercel production ✅
> Metodoloji: NL search volume × commercial intent × product match × GEO query fan-out
> Yayın takvimi: 2 günde bir (cron — article-scheduler skill)
> Bron: amarenl-agent-keywords.md + keywords-onderzoek.md + GEO/AIO audit (juli 2026)

---

## ⚠️ OKUMA SIRASI — Bu bölüm en yeni ve en güvenilir olandır

Aşağıdaki **"24 AĞUSTOS 2026 — Anahtar Kelime Fırsat Araştırması"** bölümü, en güncel ve en
kapsamlı veriye dayanıyor (GSC 6 ay + son 28 gün, Google Ads Keyword Planner, canlı SERP
kontrolü, + bu repodaki 81 mevcut makaleyle çapraz kontrol). **Bu bölümü, aşağıdaki eski
bölümlerin (Mayıs–Temmuz 2026) önüne koy.**

Eski bölümler (30 GÜNLÜK PLAN, NIEUWE BATCH, Priority Matrix, 12 Artikelen Takvimi) artık
kısmen güncelliğini yitirmiş olabilir — 21-24 Ağustos'ta büyük bir konsolidasyon yapıldı
(kolajen kümesi 13→birleştirildi, 9 duplicate-content kümesi temizlendi, ~180 makaleden 81'e
düşüldü). Bir ⏳ satırı seçmeden önce **mutlaka `data/extra-articles.json`'da o slug'ın hâlâ
yok olduğunu doğrula** — çoğu slug değişti veya makale artık başka bir sayfaya birleşti.
Emin değilsen, o satırı atla ve bu yeni bölümdeki maddeleri tercih et.

---

## 🆕 24 AĞUSTOS 2026 — Anahtar Kelime Fırsat Araştırması (Öncelikli Kuyruk)

> Kaynak: GSC (6 ay + son 28 gün) + Google Ads Keyword Planner (NL) + canlı SERP kontrolü +
> `data/extra-articles.json` çapraz kontrolü (81 makale, 24 Ağustos itibariyle).
> Rapor: "AmareNL — SEO Fırsat Araştırması" (634 aday tarandı, 592 gerçekçi fırsat, 26 YMYL
> nedeniyle hariç tutuldu). Tam liste: `amarenl-keyword-planner-analizi.xlsx` (Top Fırsatlar +
> Tüm Liste sekmeleri).
>
> **ÖNEMLİ — yayın hızı kararı (Musa, 24 Ağustos):** Cron GÜNLÜK olarak kontrol eder ama
> GÜNLÜK YAYIN yapmaz — mevcut ~2 günde bir / haftada 3 yayın temposu korunuyor (Soro-analizi
> ve Ağustos 2026 core update "scaled content abuse" riski nedeniyle bilinçli olarak yavaş
> tutuluyor, bkz. `soro-vs-amarenl-analiz.md`). Cron her gün çalışır, önce kota/kalite
> şartlarını kontrol eder, uygunsa kuyruktan TEK bir görev seçer (yeni yazı / mevcut sayfa
> güçlendirme / küme birleştirme) — uygun değilse o gün hiçbir şey yapmadan çıkar. Detaylar
> için `.github/workflows/amarenl-article-claude.yml` ve bu görevin Claude Code prompt'una bak.

### A. Öncelik 1 — Yeni yazı (gerçek, doğrulanmış boşluk — kanibalizasyon riski yok)

| # | Konu / Başlık Önerisi | Hedef Anahtar Kelimeler (birleştirilmiş varyantlar) | Hacim (top.) | Ads-Rekabet* | Kategori/Ürün | Not |
|---|---|---|---|---|---|---|
| Q1 | Beste Probiotica Kopen 2026: Complete Vergelijkingsgids | probiotica beste, best probiotica, probiotica welke beste, beste probiotica | ~20.000 | Yüksek | darmen — MentaBiotics | Yüksek ticari niyet (CPC €1,01-2,45). 10 probiotica makalesi var ama "beste/vergelijking" açısı yok — kontrol et, gerçekten yoksa yaz. |
| Q2 | Magnesium in Voeding: Welke Voedingsmiddelen Bevatten Magnesium? | voeding met magnesium, magnesium voeding, magnesium in voedingsmiddelen, magnesium en voeding, magnesium in/welke voeding | ~30.000 (toplam varyant) | Orta | essentials — Sunrise | 6 farklı arama varyantı TEK makalede birleştir — ayrı ayrı yazma (kanibalizasyon riski). |
| Q3 | Magnesium Hoeveel Per Dag? Dosering & Veiligheid | magnesium hoeveel per dag | 5.000 | Orta | essentials — Sunrise | Dozaj/güvenlik odaklı, `teveel-magnesium-symptomen-risico` makalesine iç link. |
| Q4 | Magnesium Vormen Vergelijken: Tauraat, Orotaat, Citraat, Glycinaat | magnesium tauraat, magnesiumorotaat | 10.000 (toplam) | Yüksek | essentials — Sunrise, Sleep+ | Form-karşılaştırma, ürün seçimine yardımcı — ticari niyet yüksek. |
| Q5 | Collageen Tabletten/Poeder vs Vloeibaar Collageen: Wat Werkt Beter? | collageentabletten, collageenpillen | 10.000 (toplam) | Yüksek | schoonheid — HL5 | Mevcut USP mesajıyla birebir örtüşüyor (sıvı = 3x emilim) — yüksek öncelik. |


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
| Q6 | Magnesium voor Spieren | Mevcut `magnesium-onmisbaar-mineraal-rust-energie-spierherstel` pillar'ı zaten "spierherstel" kapsıyor olabilir | Önce pillar'ı oku — konu zaten iyi kapsanıyorsa yeni yazı yerine pillar'ı derinleştir |
| Q7 | Probiotica voor Darmen / Probiotica Vrouw | 10 probiotica makalesi zaten var, olası örtüşme yüksek | Her ikisi için de: gerçekten farklı bir açı yoksa YAZMA, en yakın mevcut makaleyi güçlendir |
| Q8 | Magnesiumspray / Magnesium Voetenbad | `magnesiumolie-spray-transdermaal-werkt-het` muhtemelen bunu zaten kapsıyor | Makaleyi oku, spray+voetenbad zaten varsa yeni yazı YAZMA |
| Q9 | Vermoeide/Zware Benen varyantları | `zware-benen-oorzaken-wat-helpt` zaten var, kalan varyantlar aynı sorgunun eş anlamlıları | Yeni yazı YAZMA — zaten kapsanıyor |

### C. Mevcut sayfayı güçlendir (yeni yazı DEĞİL — bkz. `amarenl-trafik-artirma-plani.md` bölüm 1)

| Sayfa | Sorun | Aksiyon |
|---|---|---|
| `prebiotica-probiotica-verschil-darmen-uitleg` | 687 kelime, hâlâ ince (hedef 1000+) | 1000+ kelimeye genişlet, "pre en probiotica" anahtar kelimesini kapsa |
| `amare wellness` sorgusuna karşılık gelen sayfa | Pozisyon 8 ama 0 tıklama (CTR sorunu) | Meta title/description'ı gözden geçir — içerik değil, sadece metin |

### D. YMYL / düşük öncelik — otomatik pipeline'a SOKMA

| Konu | Neden |
|---|---|
| me chronische vermoeidheid | Tıbbi durum (ME/CVS) — YMYL, otomatik yazım riskli, editöryel/insan incelemesi gerekir |
| behandeling bloedarmoede | "behandeling" kelimesi zaten sitenin kendi yasaklı terimler listesinde — anemi tedavisi iddiası riski |
| probiotica kinderen / probiotica babys | Çocuk sağlığı — YMYL, dikkatli ele alınmalı, otomatik pipeline'da düşük öncelik |
| jicht en vermoeidheid | Düşük hacim + anormal CPC (muhtemelen gürültü), gerçekçi öncelik değil |

### E. Marka/Ürün Sayfaları (Amare-branded — düşük hacim, yüksek satın-alma niyeti)

> Kaynak: Musa'nın Google Ads Keyword Planner'dan çektiği "amare" markalı 10 kelimelik ek
> export (27 Ağustos 2026). Hacimler çok düşük (~50/ay, bazılarında ölçülemeyecek kadar az) —
> bu yüzden ayrı bir kampanya değil, mevcut pipeline'a düşük efortlu 3 ek görev olarak
> ekleniyor. Değer hacimde değil: bu aramaları yapanlar markayı zaten biliyor ve satın almaya
> yakın — GSC'de "amare" geçen hiçbir sorgudan son 90 günde 0 tıklama/0 gösterim vardı, yani şu
> an bu segmentten hiç pay alınmıyor.
>
> **Dikkat — "happy juice" tuzağı:** çıplak "happy juice" kelimesi 500/ay hacimli görünüyor
> ama bu muhtemelen Amare'yle ilgisiz — "happy juice douglas" / "happy juice eau de toilette"
> gibi kardeş kelimeler, Douglas parfümeri zincirinde satılan bir tuvalet suyu ürününe işaret
> ediyor. Bu yüzden bu kelimeyi çıplak hedefleme — kullanılacaksa mutlaka "Amare Happy Juice"
> olarak, başlıkta net şekilde.
>
> **Uyum notu:** Bu sayfalar ürün-adı odaklı (marka-adı odaklı değil), bu yüzden düşük risk —
> ama Amare Global Policy Manual'da ücretli reklam/keyword bidding'de marka kullanımı yazılı
> izin olmadan yasak deniyor. Organik blog içeriği için net bir yasak görülmedi, ama Musa ilk
> yayından önce sponsoruyla/compliance ile bir teyit etmek istiyor — yayına almadan önce bunu
> kontrol et.

| # | Konu / Başlık Önerisi | Hedef Anahtar Kelimeler | Hacim (Ads) | Rekabet | Not |
|---|---|---|---|---|---|
| M1 | Amare Sunrise vs Sunset: Verschil en Wanneer Welke te Gebruiken | amare sunrise, amare sunset | 50+50/ay | Düşük | İki gerçek Amare ürünü, düşük rekabet — muhtemelen henüz kimse yazmamış. |
| M2 | Amare HL5 Uitgelegd: Wat Is Het en Hoe Werkt Het? | amare hl5 | 50/ay | Bilinmiyor | HL5 zaten collageen cluster'da "sıvı = 3x emilim" mesajıyla anılıyor — bu sayfa ürünü doğrudan açıklayan destek sayfası. |
| M3 | Amare Producten Kopen in Nederland: Complete Gids | amare supplementen kopen, amare ervaringen | Ölçülemedi (çok düşük ama gerçek) | Bilinmiyor | Satın-alma niyetli, marka bilen kullanıcıya yönelik — hacim verisi yok ama düşük efortlu, atlanabilir değil. |

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

> Bron: amarenl-agent-keywords.md

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
