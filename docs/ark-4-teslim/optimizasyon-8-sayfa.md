# ARK-4 · 8 sayfa optimizasyonu + probiotica-stammen güçlendirmesi (başlık/meta + iç link + derinlik)

Tarih: 2026-10-20 · Hazırlayan: İçerik Editörü · Dil: Hollandaca (yayın) / Türkçe (iç not)

ÖNEMLİ KAPSAM NOTU: CEO kararı "8 sayfa" der ama açıklama 7 satır listeler.
`vaginale-probiotica (29+25)` iki sorgu varyantını kapsar → orijinal sayımda 8.
Ayrıca "3. yeni makale" olarak geçen **"hoe kies ik de juiste probioticastam"** sorgusu,
halihazırda sıralayan `/probiotica-stammen` sayfasına denk gelir. Kanibalizasyon kuralı gereği
yeni URL AÇILMAZ — mevcut sayfa güçlendirilir. Bu yüzden bu iş aşağıda **madde 1** olarak
optimizasyon kapsamına alındı. Yeni makale sayısı fiilen **2** (zink + probiotica pillar);
üçüncü slot probiotica-stammen güçlendirmesiyle karşılandı.

---

## 1. `/probiotica-stammen` — "hoe kies ik de juiste probioticastam" (15 göst · poz 7.1)

Sayfa var (`app/probiotica-stammen/page.tsx`), içerik güçlü, FAQ şemalı.

- **Yeni başlık (metadata.title):** `Hoe kies ik de juiste probioticastam? Complete gids (2026)`
- **Yeni meta açıklama:** `Hoe kies je de juiste probioticastam? Lactobacillus of Bifidobacterium, CFU of stamcode — complete gids met selectietabel, dosering en de best onderzochte stammen.`
- **Eklenecek H2 bölümü ("Hoe kies ik de juiste stam?"):**

```markdown
## Hoe kies ik de juiste probioticastam?

Volg deze drie stappen:

1. **Bepaal je doel.** Spijsvertering, stemming, vaginale gezondheid of herstel na antibiotica vragen elk om andere stammen.
2. **Kijk naar de stamcode, niet naar het CFU-getal.** Een specifieke stamcode (bijvoorbeeld L. helveticus R0052) is klinisch onderbouwd. Een vaag "50 miljard CFU" zonder stamcodes zegt weinig.
3. **Kies een combinatie die bij je doel past.** Voor stemming is de Cerebiome®-blend (L. helveticus R0052 + B. longum R0175) het best onderzocht; voor brede darmgezondheid werkt een multi-stam formule beter.

| Doel | Best onderzochte stammen |
|---|---|
| Stemming en stress | L. helveticus R0052 + B. longum R0175 (Cerebiome®) |
| Spijsvertering | Lactobacillus + Bifidobacterium multi-stam |
| Vaginale gezondheid | L. rhamnosus, L. reuteri |
```

- **İç link:** Bölüme link → [probiotica-complete-gids](/probiotica-complete-gids) (yeni pillar) + [MentaBiotics](/producten/mentabiotics) + [Restore](/producten/restore).

---

## 2. `/blogs/nieuws/ashwagandha-vs-rhodiola-adaptogeen-vergelijking` (29 göst)

Sayfa var, başlık zaten iyi ("Ashwagandha vs Rhodiola: Wat Past Bij Jou?").

- **Başlık:** korunur (sorguyla eşleşiyor). İsteğe bağlı: sonuna `(2026)` ekle.
- **Meta:** mevcut iyi; "rust of energie" cümlesi tık odaklı, korunur.
- **İç link (ekle):** her H2 sonuna → [EDGE+](/edge-plus) ürün bağlantısı + [adaptogenen categorie](/adaptogenen) + [probiotica-stammen](/probiotica-stammen) (stres–darm bağlantısı).
- **Derinlik (ekle):** karşılaştırma tablosu (werking, dosering, bijwerkingen, voor wie) + 1 paragraf "welke kies je bij stress vs vermoeidheid".

---

## 3. `/blogs/nieuws/beste-collageen-supplement-2026-werkt-echt` (15 göst)

Sayfa var.

- **Başlık:** mevcut güçlü ("Beste Collageen Supplement 2026..."), korunur.
- **Meta:** "HL5, NeuCollagen en supermarkt collageen" karşılaştırması iyi; korunur.
- **İç link (ekle):** [HL5](/hl5) ürün + [collageen-poeder categorie](/collageen-poeder) + [haarherstel bloemlezing](/blogs/nieuws/beste-supplementen-haar-nagels-werkt-echt).
- **Derinlik:** "collageen voor mannen" sorgusu (17/24.3) hedeflenir → "Collageen voor mannen" H2 bölümü ekle (huid, gewrichten, spierherstel).

---

## 4. Ana sayfa `/` (13 göst)

Sayfa var ama `metadata` bloğunda **title ve description YOK** (yalnız canonical + hreflang).

- **Ekle (metadata):**
  - `title`: `Vitaalroute.nl — Natuurlijke supplementen voor energie, darmen en balans`
  - `description`: `Natuurlijke supplementen voor meer energie, een gezonde darmflora en hormonale balans. Ontdek het Amare assortiment — met €8 korting en 30 dagen niet-goed-geld-terug.`
- **İç link:** mevcut `symptoms` bloğu iyi; "Opgeblazen buik" → [probiotica-complete-gids](/probiotica-complete-gids) ekle.
- **Not:** teklif kalıbı €8 korting + 30 gün iade kuralına uygun (onaylı kalıp).

---

## 5. `vermoeid-na-griep` (53 göst) — SAYFA YOK

Repo'da `/blogs/nieuws/vermoeid-na-griep-hoe-lang-wat-helpt` yok; eski `amarenl.com` URL'i.
GSC hâlâ gösterim sayıyor → **404/redirect sorunu = teknik SEO, Otomasyon Mühendisi'ne devredilir.**

- **İçerik:** konu yeni pillar makalede ([probiotica-complete-gids](/probiotica-complete-gids), "Vermoeid na griep" bölümü) karşılanıyor. Ayrı bir ince sayfa yerine pillar bölümüne yönlendir.
- **Teknik:** eski URL → 301 redirect → pillar (veya yeni `vermoeid-na-griep` sayfası, karar Otomasyon Mühendisi'nde).

---

## 6. `vaginale-probiotica` (29+25) — SAYFA YOK

Repo'da vaginale probiotica sayfası yok. Aynı şekilde eski URL / boşluk.

- **İçerik:** pillar'daki "Vaginale probiotica" bölümü karşılıyor.
- **Teknik:** redirect kararı Otomasyon Mühendisi'nde. Ayrı makale gerekirse pillar'dan sonra planlanır.

---

## 7. `probiotica-kuur` (12 göst) — SAYFA YOK

Repo'da `probiotica-kuur` sayfası yok.

- **İçerik:** pillar'daki "Hoe werkt een probiotica kuur?" bölümü karşılıyor.
- **Teknik:** redirect kararı Otomasyon Mühendisi'nde.

---

## Teknik SEO devri (Otomasyon Mühendisi)

Üç eski URL 404/boşluk durumunda ve GSC'de hâlâ gösterim alıyor:

1. `/blogs/nieuws/vermoeid-na-griep-hoe-lang-wat-helpt`
2. `vaginale-probiotica` (slug tespiti gerekli)
3. `probiotica-kuur` (slug tespiti gerekli)

Aksiyon: eski `amarenl.com` URL'lerini yeni hedeflere (pillar veya yeni sayfalar) 301'le.
Bu, içerik değil teknik SEO işidir — benim devrettiğim alan.
