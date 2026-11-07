# GSC denetimi — 15 Ekim 2026

Veri penceresi: **2026-09-16 → 2026-10-13** (son veri günü 13 Ekim; GSC ~2 gün gecikmeli)
Servis hesabı: hermes-gsc@disco-technique-488718-b0.iam.gserviceaccount.com
Ölçüm yöntemi: `page` boyutu (gerçek toplam), sorgu boyutu yalnızca bant/boşluk analizi için

## 1. Erişim tablosu (hangi mülk okunabiliyor)

| Mülk | Yetki |
|---|---|
| sc-domain:vitaalroute.nl | siteFullUser |
| https://amarenl.com/ | siteOwner |
| sc-domain:wearkmedia.com | siteFullUser |
| https://www.wearkmedia.com/ | siteFullUser |
| sc-domain:vitalroute.fr | siteFullUser |
| https://www.vital4you.de/ | siteFullUser |

Hepsi okunabildi — okunamayan mülk yok.

## 2. 28 günlük tablo (page boyutu = gerçek toplam)

| Mülk | Tık | Gösterim | CTR | Ağ. poz. | Gösterim alan sayfa |
|---|---|---|---|---|---|
| amarenl.com (legacy) | 24 | 1.903 | %1,26 | 17,7 | 125 |
| sc-domain:vitaalroute.nl | 9 | 1.876 | %0,48 | 38,4 | 149 |
| sc-domain:wearkmedia.com | 2 | 530 | %0,38 | 42,0 | 80 |
| www.wearkmedia.com | 1 | 374 | %0,27 | 34,3 | 72 |
| vital4you.de | 6 | 322 | %1,86 | 30,7 | 43 |
| vitalroute.fr | 0 | 84 | %0 | 60,0 | 11 |

Not: `amarenl.com` mülkü aynı sitenin eski mülküdür (308 → vitaalroute.nl). GSC "1 siteniz bu siteye taşınıyor" bildirimi bu adres değişikliğidir; **yönlendirmeler kaldırılmaz**.

## 3. Asıl bulgu: vitaalroute.nl'de 210 URL'nin ~%40'ı indekste değil

Panelde: **208 dizine eklenmiş / 164 dizine eklenmemiş (4 neden)**. 23 Eyl 2026 tarihli yeni neden:
*"Kopya, Google kullanıcıdan farklı bir standart sayfa seçti"*.

Sitemap'teki **210 URL'nin tamamını** URL Inspection API ile tek tek denetledim (tam sayım):

| Durum | Adet | Pay |
|---|---|---|
| Submitted and indexed | 130 | %61,9 |
| **URL is unknown to Google** (hiç taranmamış) | 47 | %22,4 |
| **Discovered – currently not indexed** | 23 | %11,0 |
| **Page with redirect** (bayat kayıt) | 9 | %4,3 |
| Crawled – currently not indexed | 1 | %0,5 |

Yani paneldeki "164 indekste değil"in büyük kısmı **kopya değil, keşif/tarama gecikmesi**: 70 URL Google tarafından hiç taranmamış ya da taranmayı bekliyor.

### 3a. "Kopya / farklı canonical" nedeninin kökeni: www ↔ non-www kalıntısı

Tüm sitemap'te 11 URL'de Google'ın seçtiği canonical sitenin istediğinden farklı; 9'unda Google hâlâ **www** sürümünü canonical seçiyor ve bu 9 URL'in hepsi "Page with redirect" durumunda:

- /blogs/nieuws/beste-multivitamine-supplementen-vergelijking
- /blogs/nieuws/collageen-mannen-30-huid-gewrichten-spierherstel
- /blogs/nieuws/elektrolyten-aanvullen-sport-hydratatie-gids
- /blogs/nieuws/happy-juice-pack-vs-losse-supplementen-vergelijken
- /blogs/nieuws/happy-juice-pack-vs-triangle-of-wellness-vergelijking
- /blogs/nieuws/hoofdhuid-verdient-aandacht-clarify-serum-haaruitval
- /blogs/nieuws/vermoeid-na-griep-hoe-lang-wat-helpt
- /collageen-poeder
- /producten/skin-to-mind-neunight-restore-renew-serum

**Tarafımızdaki durum test edildi ve temiz:** www 308 → non-www, canonical non-www, robots sağlıklı, sitemap 210 URL tamamı non-www, amarenl.com 308 → vitaalroute.nl.
4 farklı UA (Googlebot desktop, Googlebot smartphone, normal Chrome, curl) ile test: **hepsi 200, hepsi doğru non-www canonical** — bot'a özel yönlendirme yok.

Sonuç: **canlı sitede hata yok; Google'ın elindeki kayıt eski** (www'un canonical olduğu dönemden). Kendiliğinden düzelir, hızlandırmak için o 5 URL'de tek tek "Dizine ekleme iste" + "Düzeltmeyi doğrula" tıklanmalı (API'den yapılamaz, UI işi).

### 3b. Keşif gecikmesi (asıl iş)

Google'ın hiç görmediği 47 URL sitemap'te kayıtlı — yani sitemap yeterli değil, **iç link gerekiyor**. Dağılım: 42 blog yazısı + 5 para sayfası.

Para sayfaları (öncelik bunlarda, çünkü satış sayfaları): `/on` (Amare ON Energy Shot — canlıda 200, 108 KB), `/adaptogenen`, `/gewichtsbeheer`, `/magnesium-supplement`, `/persoonlijk-advies`.
Blog tarafında hiç taranmamış örnekler: `beste-eiwitshake-2026…`, `collageen-supplement-kopen-waar-op-letten`, `magnesium-tauraat-orotaat-citraat-glycinaat-vergeleken`, `ervaringen-gebruikers-amare-supplementen`, `persoonlijk-advies-supplementen-gratis-intake-begeleiding`.

Bunların 23'ü daha ileri aşamada ("keşfedildi, indekslenmedi") — sitemap'ten bulunmuş, sırada bekliyor.

## 4. Tıklama fırsatı (gösterim var, tık yok)

vitaalroute.nl — yüksek gösterim, 0 tık (pozisyon 30+ ⇒ içerik sıralıyor, başlık/açıklama sorguyu taşımıyor):

| Sayfa | Gösterim | Poz. |
|---|---|---|
| /blogs/nieuws/zink-waar-goed-voor-tekort-signalen-supplement | 164 | 37,1 |
| /blogs/nieuws/teveel-magnesium-symptomen-risico | 117 | 58,4 |
| /blogs/nieuws/supplementen-voor-meer-energie-dit-werkt-echt | 114 | 64,6 |
| /blogs/nieuws/waar-zit-omega-3-in-voedingsbronnen-supplementen | 79 | 85,8 |

Pozisyon bantları (28g, sorgu boyutu): 4–10 bandında 99 gösterim **0 tık**; 21–50 bandında 282 gösterim 0 tık; 51–100 bandında 690 gösterim 0 tık.

vital4you.de dürüst notu: sorguların %68'i 51–100 bandında (96 gösterim, 0 tık) — Almanca bloglar henüz ilk sayfada değil.

## 5. Sitemap sağlığı

| Mülk | URL | Son indirme | Hata/Uyarı |
|---|---|---|---|
| vitaalroute.nl | 210 | 2026-10-15 12:48 | 0 / 0 |
| amarenl.com | 210 | 2026-10-15 14:17 | 0 / 0 |
| wearkmedia.com | 376 | 2026-10-15 11:48 | 0 / 0 |
| vitalroute.fr | 84 | 2026-10-15 11:22 | 0 / 0 |
| vital4you.de | 85 | 2026-10-15 11:23 | 0 / 0 |

## 6. Yapılacaklar (öncelik sırası)

1. **GSC UI, 9 URL:** §3a'daki 9 URL'de "Dizine ekleme iste"; sonra panelde "Düzeltmeyi doğrula". 9'unun canlıda 200 + doğru canonical verdiği Googlebot UA ile teyit edildi (site tarafında iş yok, sadece yeniden tarama tetiklenecek).
2. **Keşif:** 47 hiç taranmamış + 23 bekleyen URL'e indeksli sayfalardan iç link ver (özellikle 5 para sayfasına); her deploy'dan sonra IndexNow + GSC ping.
3. **Meta düzeltmesi:** §4'teki 4 sayfada başlık/açıklamada sorgunun tam ifadesini kullan (zink, teveel magnesium, supplementen voor meer energie, omega-3).
4. **Bekleyen:** amarenl.com adres değişikliği tamamlanınca eski mülk verisi yeni mülke taşınır; eski property "retired" kalır, silinmez.

Yeniden ölçüm: **2026-11-12** (4 hafta sonra aynı pencere karşılaştırması).
