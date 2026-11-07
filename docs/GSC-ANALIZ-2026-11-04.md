# vitaalroute.nl — GSC analizi · 2026-11-04

Mülk: `sc-domain:vitaalroute.nl` · Servis hesabı: siteFullUser · Veri son günü: **2026-11-04** (çekim: 04.11)

## Özet — bu sitede gerçek ilerleme var, sorun başka yerde

28 günde **17 tık / 1.558 gösterim / CTR %1,09 / ağırlıklı pozisyon 23,6**. Önceki 28 günde 4 tık / 1.580 gösterim / poz 42,8.
→ Tık 4 kat arttı, pozisyon 42,8 → **23,6** iyileşti. Aylık: Eylül 4 tık, Ekim 14 tık, Kasım (4 gün) 2 tık.
Haftalık gösterim: 342 → 354 → 333 → **454** → 162 (bu hafta 4 gün).

Yani "gösterim düşüyor" değil — gösterim yatay, **pozisyon yükseliyor**. Asıl kayıp iki yerde:

### 1) Trafik 3 host arasında bölünmüş — migration kapanmamış (en büyük kaldıraç)

| Host | 28g gösterim | tık | poz | durum |
|---|---|---|---|---|
| vitaalroute.nl (kanonik) | 1.188 | 17 | 23,6 | canlı, 200 |
| www.vitaalroute.nl | 370 | — | — | 308 → non-www |
| **amarenl.com** (emekli) | **906** | **16** | **10,2** | 308 → vitaalroute.nl |

amarenl.com hâlâ günde ~29 gösterim ve ~1 tık alıyor, üstelik **pozisyon 10,2** ile vitaalroute.nl'nin (23,6) çok önünde. Aynı makaleler iki hostta ayrı ayrı sıralıyor:

- `vermoeid-na-griep-hoe-lang-wat-helpt`: amarenl.com 94 gösterim (poz 9,7) **+** vitaalroute.nl 111 gösterim (poz 9,7)
- `venkelthee-opgeblazen-gevoel`: amarenl.com 86 gösterim (poz 8,2) **+** vitaalroute.nl 103 gösterim (poz 8,5)

301/308 yönlendirme tek başına taşımayı bitirmez; GSC'de **Adres Değişikliği** gönderilmediği sürece Google iki mülkü ayrı tutar. **Adres Değişikliği 15.10.2026'dan önce yapıldı** (bkz. `docs/GSC-DENETIM-2026-10-15.md`: "1 siteniz bu siteye taşınıyor"). Buna rağmen eski host hâlâ sıralıyor — sebep CoA değil, **yeniden tarama gecikmesi**:

Bugünkü URL Denetimi kayıtları (04.11):

| URL | coverage | googleCanonical | son crawl |
|---|---|---|---|
| amarenl.com/happy-juice-pack | Submitted and indexed | amarenl.com | **10.09** |
| amarenl.com/…/vermoeid-na-griep… | Submitted and indexed | amarenl.com | **22.08** |
| amarenl.com/…/venkelthee… | Submitted and indexed | amarenl.com | **11.09** |
| amarenl.com/sunrise | Submitted and indexed | amarenl.com | **02.09** |
| amarenl.com/…/vaginale-probiotica… | **Page with redirect** | **vitaalroute.nl** ✓ | 29.10 |
| www.vitaalroute.nl/mentabiotics | Submitted and indexed | **www** (user: non-www) | **19.09** |

Yani Google bu URL'leri **Ağustos–Eylül'den beri yeniden taramadı**; kayıt güncellenmedikçe eski host SERP'te kalmaya devam ediyor. Yeniden taranan tek URL (29.10) tam olarak beklenen duruma dönmüş: `Page with redirect` + canonical `vitaalroute.nl`. Kaldıraç CoA'yı tekrar göndermek değil, **eski host URL'lerini yeniden taramaya zorlamak**.

İş etkisi küçük: 308 kullanıcıyı zaten vitaalroute.nl'ye indiriyor, yani o 16 tık kaybolmuyor — sadece GSC'de eski mülkte raporlanıyor. Gerçek maliyet sinyal bölünmesi (Google hangi hostu sıralayacağını test ediyor).
Ayrıca 3 sayfa URL Denetimi'nde hâlâ `Page with redirect`, googleCanonical = `www.vitaalroute.nl` (crawl 18–19.09) — www kayıtlarının kalıntısı, kendiliğinden iyileşir; hızlandırmak için yeniden dizin isteği.

### 2) Gösterimlerin %17'si tek bir sayfada ve o sayfa 65. sırada

`/blogs/nieuws/supplementen-voor-meer-energie-dit-werkt-echt` → **268 gösterim (%17), 0 tık, poz 65,3**.
Sorgu dağılımı: `energie supplementen` 143 gösterim (poz 67), `supplementen energie` 33 (69,8), `supplementen meer energie` 27 (71,4), `energiesupplementen` 15 (44,7).
Bu, sitede en çok gösterim toplayan sayfa ve hiç tık getirmiyor — çünkü baş terimlerde otorite yetmiyor. Burada doğru hamle daha çok kelime değil, **uzun kuyruk varyantlarına hedefleme** (düşük rekabetli "hangi supplement bij aanhoudende vermoeidheid"-tipi sorgular).

### 3) Sayfa 1'de olup tıklanmayan sayfalar: başlık kesiliyor

| Sayfa | Gösterim | Tık | Poz | Canlı başlık uzunluğu |
|---|---|---|---|---|
| `/blogs/nieuws/vermoeid-na-griep-hoe-lang-wat-helpt` | 111 | 0 | 9,7 | **82 karakter** (SERP'te kesiliyor) |
| `/blogs/nieuws/venkelthee-opgeblazen-gevoel-...` | 103 | 1 | 8,5 | **78 karakter** |
| `/collageen-poeder` | 75 | 0 | 44,0 | title 47 kr, description **91 kr** (çok kısa) |
| `/blogs/nieuws/teveel-magnesium-symptomen-risico` | 45 | 0 | 8,7 | — |
| `/blogs/nieuws/teveel-vitamine-d-...` | 33 | 0 | 10,0 | — |

Pozisyon 8–10'da 100+ gösterim alıp 0 tık: sorun içerik değil, **snippet**. Başlıklar ~58 karaktere indirilmeli, açıklamalar 130–155'e çıkarılmalı.

Marka tarafı: `amare global` 66 gösterim **poz 5,7, 0 tık** — navigasyonel sorgu, kullanıcı amare.com'u arıyor; bu trafiği tık sanmayalım.

### 4) İndeks: 225 URL'nin rastgele 29'luk örneğinde %62 indeksli

| coverageState | adet | not |
|---|---|---|
| Submitted and indexed | 18 | %62 |
| URL is unknown to Google | 7 | bazıları Haziran/Temmuz yayını — keşif sorunu |
| Page with redirect | 3 | eski www kaydı |
| Discovered – currently not indexed | 1 | |

Örneklem tamamlandı (29/29). Haziran–Ağustos yayınları hâlâ "Google'da yok" (ör. `/blogs/nieuws/supplementen-wijzer-gratis`, `/blogs/nieuws/collageen-poeder-vs-pillen-vergelijking`, `/blogs/nieuws/vermoeidheid-menstruatie-hormonen`) — repo'da iç linkleri var, yani orphan değiller; keşif önceliği sorunu.

Emekli host hâlâ tarama bütçesi tükettiği için kanonik hostta yeni içerik daha yavaş keşfediliyor — 1. maddedeki Adres Değişikliği bu tabloyu da düzeltir.

## Yapılacaklar (öncelik sırası)

1. **Eski host URL'lerini yeniden taramaya zorla** (CoA zaten yapıldı, tekrar gönderilmez): amarenl.com mülkünde 28 gündür gösterim alan ~8 URL + www.vitaalroute.nl URL'lerinden 4'ü için GSC → URL Denetimi → "Dizine eklenmesini iste". Her yeniden tarama kaydı `Page with redirect` + canonical `vitaalroute.nl` yapar, sinyal tek hosta toplanır. Yönlendirmeler kaldırılmamalı.
2. www kayıtları için 3 URL'ye yeniden dizin isteği (kendiliğinden de iyileşir).
3. Başlık düzeltmesi: `vermoeid-na-griep` 82→≤58, `venkelthee` 78→≤58; `/collageen-poeder` açıklaması 91→140.
4. Enerji makalesi: baş terim yerine uzun kuyruk varyantlarına başlık/H2 hedeflemesi.
5. Emekli hostlar düştükten sonra ölçüm: 28g gösterim 1.558 / poz 23,6 taban; 3–4 hafta sonra tekrar bak.
