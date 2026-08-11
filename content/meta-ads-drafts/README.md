# Meta Ads — Lead-Gen Kampanya — Durum (güncelleme: 11-08-2026 oturumu)

Bu dosya, bu oturumlarda yapılanların tam kaydı. Devam ederken buradan başla.

## ⏳ HATIRLATMA — İşletme doğrulaması inceleniyor, ~13-08-2026'da kontrol et
"Ark Media" adına İşletme Doğrulaması (Business Verification) 11-08-2026'da "In beoordeling"
(inceleniyor) durumunda bulundu — Meta'nın tahmini ~2 iş günü, yani **Perşembe 13-08-2026**
civarı sonuç beklenir. Kontrol linki:
`business.facebook.com/settings/security?business_id=1372325337373227`

Bugün ayrıca doğrulandı: yeni ad account açma denemesi artık **izin hatası vermiyor** (Admin
rollü yeni sistem kullanıcısı `amarenl-admin` ile test edildi, token
`META_ACCESS_TOKEN_ADMIN` olarak `/Users/ark/projects/amarenl.com/analytics/.env`'de duruyor) —
ama **"Maximumaantal advertentieaccounts: 1"** limitine takılıyor, bu da doğrudan Unverified
Business'tan kaynaklanıyor. Yani rol/token sorunu değil, tamamen doğrulama meselesi — doğrulama
onaylanınca ya limit yükselecek ya da mevcut hesap düzeltilebilecek. Detay: memory
`project_meta_ads_account_country_bug.md` (STATUS UPDATE — 2026-08-11 bölümü).

## ÖZET — 10-08-2026 sonu itibarıyla — KAMPANYA BİLİNÇLİ OLARAK BEKLETİLİYOR
**Kullanıcı kararı: Meta reklamlarını birkaç gün bekletiyoruz, sorun tam çözülene kadar
dokunmuyoruz.** Kampanya + Ad Set doğrulandı, ikisi de `PAUSED`/`PAUSED` — harcama yok, güvenli.

**Bugün (10-08) bulunan gerçek kök neden — üç ayrı engelin ortak kaynağı:**
Meta'nın kendi destek canlı sohbeti (business help chat) üzerinden netleşti: **ad account
`act_1523034172332806` yanlışlıkla "Verenigde Staten (US)" ülkesiyle kayıtlı**, para birimi EUR
ile karışık/tutarsız bir kombinasyon. Bu tek hata üç farklı belirtiye yol açıyor:
1. Hollanda kartı eklerken "Ongeldig land / Invalid country" hatası (kart-hesap ülke uyuşmazlığı)
2. Yeni bir ad account açmaya çalışınca "hesap limitine ulaşıldı" hatası (muhtemelen Unverified
   Business + zaten var olan bozuk hesap kombinasyonu)
3. (08-08'den beri bilinen) API üzerinden `/adcreatives` oluşturamama — "app development modunda"

Hepsi aynı köke, **holistiglow İşletmesinin (Business Manager, ID 1372325337373227) Meta'da
doğrulanmamış (Unverified) olmasına** çıkıyor gibi görünüyor.

**Destek sohbetinin önerdiği çözüm yolları:**
- Mevcut US-kayıtlı hesaba `Betaalmethode verifiëren` (kart zaten sistemde, sondan 3419) ile
  doğrulamayı zorla tamamlamayı dene → **kullanıcı denedi, aynı ülke hatası tekrar çıktı, işe
  yaramadı**
- Doğru ülke/para birimiyle (Nederland/EUR) sıfırdan yeni bir ad account oluştur → **denendi,
  Meta "hesap limitine ulaşıldı" dedi, açtırmadı**
- Meta destek temsilcisine bağlan, hesabı düzelttir veya doğru şekilde yeni hesaba geçir →
  **kullanıcı bağlanmayı denedi, o anda destek talebi açma yoğunluktan dolayı mümkün olmadı**

**Legal entity netleşti:** Doğrulama gerektiğinde yasal işletme adı **"Ark Media"** olacak (KVK'da
kayıtlı tek isim bu) — "HolistiGlow" sadece Sayfa/marka adı, doğrulama formunda kullanılmayacak,
Sayfa/BM görünen adını değiştirmeye gerek yok. Bkz. memory `project_legal_entity_structure.md`.

## Sonraki oturumda ilk iş (10-08 sonrası)
1. Meta Business Support'a tekrar ulaşmayı dene (yoğunluk geçmiş olabilir) — hedef: ya (a) mevcut
   `act_1523034172332806`'nın ülkesini US'ten Nederland'a düzelttirmek, ya da (b) hesap limitini
   kaldırıp doğru ülkeyle yeni hesap açmasına izin vermelerini sağlamak.
2. Paralel/alternatif yol: İşletme Doğrulamasını (Business Verification) başlat — legal entity
   Ark Media + KVK uittreksel belgesi ile. Üç engelin de ortak kökü bu olabilir, doğrulanınca
   hem hesap limiti hem API dev-mode kısıtlaması kalkabilir. Link:
   `business.facebook.com/settings/security?business_id=1372325337373227` (kullanıcı 10-08'de bu
   sayfayı açtı ama "Verify Business" butonunu henüz bulamadı/aramadı — bir sonraki oturumda
   birlikte sayfayı tarayarak bulunmalı).
3. İkisinden biri çözülünce, aşağıdaki "önceki oturumun devam adımları" listesine geri dön
   (reklamları oluştur → API'den doğrula → onay al → ACTIVE yap).

## ÖNCEKİ ÖZET — 09-08-2026 sonu itibarıyla
Kök neden bulundu: uygulama Development modunda kalıyor çünkü **holistiglow İşletmesi (Business
Manager) Meta'da doğrulanmamış (Unverified)**. Doğrulama, `amarenl.com`'un kendi başına KVK'da
kayıtlı olmaması nedeniyle (gerçek kayıtlı işletme **Ark Media** — bkz. memory
`project_legal_entity_structure.md`) karmaşık/uzun sürecek — bu yüzden **API'yi beklemeden
manuel yayın yoluna geçildi.**

**Karar:** Kampanya+Ad Set API üzerinden zaten kuruldu (duraklatılmış). Kullanıcı, reklamların
kendisini (creative+ad) Ads Manager UI'dan elle oluşturuyor — bu yol Development-mode kısıtlamasına
takılmıyor çünkü Meta'nın kendi resmi arayüzü kullanılıyor.

**Şu anki ilerleme:** Kullanıcı 1. reklama (Gut-Brain) görsel/video ekledi ama **henüz
kaydetmedi/yayınlamadı** — API'den kontrol edildi, ad set içinde henüz kayıtlı bir reklam yok
(`/52607870851547/ads` → boş liste). Yarın kaldığı yerden devam edecek.

## DURUM — 09-08-2026, ikinci güncelleme (oturum sonu)
Kullanıcı Ads Manager'da 2 reklamı (Gut-Brain + Yorgunluk, Duplicate yöntemiyle) doldurup
"kaydetti". Ama API kontrolünde **`act_1523034172332806/ads` tamamen boş döndü** — reklamlar
Meta'nın tarafında hiç oluşmamış görünüyor. Muhtemel sebep: **ödeme yöntemi (kart) eksik/geçersiz
olduğu için Meta reklamları arka planda reddetmiş/kaydetmemiş olabilir** — kullanıcı ayrıca ödeme
kartı ve Facebook Sayfa bağlantısında çözülmemiş bir sorun olduğunu belirtti.

Ayrıca fark edilen: Kampanya bir noktada kendiliğinden/yanlışlıkla **ACTIVE** olmuştu (Ad Set hâlâ
PAUSED olduğu için gerçek harcama olmadı — alt seviye duraklatılmışken üst seviye aktif olsa bile
para gitmiyor). **Güvenlik için kampanya tekrar PAUSED yapıldı** ve doğrulandı — hem Kampanya hem
Ad Set şu an `PAUSED`/`PAUSED` durumunda.

## Sonraki oturumda ilk iş (sırayla)
1. **Önce ödeme yöntemini çöz** — Business Manager → Ödeme Ayarları (Billing) bölümünde geçerli
   bir kart eklenmiş mi kontrol et. Muhtemelen reklamların "kaybolmasının" kök nedeni bu.
2. Facebook Sayfa bağlantısındaki (kullanıcının bahsettiği ama detaylandırmadığı) sorunu netleştir.
3. İkisi de çözülünce, Ads Manager'da 2 reklamı **sıfırdan** oluştur (önceki denemeler API'de hiç
   görünmüyor, muhtemelen gerçekten kaydedilmemişler) — metinler aşağıda hâlâ hazır duruyor.
4. Bu sefer kaydettikten hemen sonra `curl .../act_1523034172332806/ads` ile TEKRAR DOĞRULA —
   Ads Manager ekranında görünmesi API'de var olduğu anlamına gelmiyor, ikisini de kontrol et.
5. Her şey doğru geldiğinde, kullanıcı onayıyla kampanya+adset+ads `ACTIVE` yap.
6. Ad Set'in `start_time` alanı artık düzenlenemiyor (Meta kuralı). Sorun değil — ACTIVE yapıldığı
   anda hemen yayına başlayacak.

## Ayrıca (düşük öncelik, acil değil)
- İşletme doğrulaması (Business Verification) paralelde başlatılabilir — ileride tam API
  otomasyonu (benim doğrudan reklam oluşturabilmem) için gerekiyor, ama bugünkü yayın için
  şart değil. Başlarken legal entity olarak **Ark Media** kullanılmalı, amarenl.com değil.
  Link: `business.facebook.com/settings/info?business_id=1372325337373227`

## ÖNCEKİ ÖZET (08-08-2026)
2 video reklam üretildi (marka/ürün adı geçmeyen, sorun-odaklı lead-gen), Meta'da kampanya+ad
set kuruldu (duraklatılmış), videolar yüklendi, Sayfa erişimi çözüldü — ama son adımda
**uygulama Development modunda takıldı**, reklam kreatifi oluşturulamadı.

## Video materyalleri (hazır, kredi harcanmadı bir daha)
- **Gut-Brain (pilot):** `video/leadgen-gutbrain/leadgen-gutbrain-ad-v2-subtitled.mp4`
  16s, 21 kredi tuttu. Hook+doğrulama (6s) + mekanizma/merak boşluğu (8s) + end-card (2s).
  Zamanlı (kelime-oranlı) altyazılı. Script: `scripts/generate-leadgen-gutbrain-video.sh`
- **Yorgunluk:** `video/leadgen-yorgunluk/leadgen-yorgunluk-ad-v1.mp4`
  12s, 15 kredi tuttu (kısaltılmış versiyon — kredi kısıtlıydı). Script:
  `scripts/generate-leadgen-yorgunluk-video.sh`
- Yazılmış ama HENÜZ ÜRETİLMEMİŞ script'ler (metin+görsel yönerge hazır, konuşma metni bu
  sohbette yazıldı, henüz Higgsfield'e gönderilmedi): **stres**, **tükenmişlik sendromu**,
  **kalp-damar**. Kredi bulununca aynı kalıpla (ör. `generate-leadgen-yorgunluk-video.sh`'ı
  kopyalayıp prompt'ları değiştirerek) üretilebilir.
- Reddedilen/kullanılmayan eski deneme: `video/beat1_product_closeup.mp4` (Happy Juice Pack
  markalı ilk deneme — artık kullanılmıyor, "marka yok" kararından önceydi).

## Higgsfield kredi durumu
- Bakiye bu oturum sonunda: **1.71 kredi** (Starter plan, arkmedia25@gmail.com)
- Kredi havuzu BAŞKA bir projeyle paylaşılıyor (bu oturumda 202 kredi bulunmuş, tükenmişti) —
  yeni video üretmeden önce `higgsfield account status` ile güncel bakiyeye bak.
- CLI zaten kurulu ve kimlik doğrulanmış (`~/.config/higgsfield/credentials.json`), tekrar
  bağlanmaya gerek yok. **Higgsfield MCP sunucusunu asla ekleme** — Higgsfield tarafında bilinen
  bir OAuth bug'ı var, her zaman başarısız olur. Sadece CLI (`higgsfield`/`higgs`/`hf` komutu).

## Meta Ads — oluşturulanlar (hepsi PAUSED, canlı değil)
| Varlık | ID | Not |
|---|---|---|
| Ad account | `act_1523034172332806` | HolistiGlow |
| Business Manager | `1372325337373227` | "holistiglow" |
| Campaign | `52607862382747` | "NL – Leadgen – Gut-Brain & Yorgunluk – Aug26", OUTCOME_LEADS |
| Ad Set | `52607870851547` | €7/gün, NL 25-45, start_time 2026-08-09T01:00 (**geçmişte kalmış olabilir, aktive etmeden önce güncelle**) |
| Video 1 (Meta'ya yüklü) | `1600093201698295` | gut-brain |
| Video 2 (Meta'ya yüklü) | `1777484169933458` | yorgunluk |
| Pixel | `1876697123186995` | canlı sitede doğrulandı |
| Facebook Page | `725486407317133` | "Holistiglow" — ADVERTISE yetkisi sistem kullanıcısına eklendi |
| System User | `122099575791416362` | "amarenl-analytics" |
| App | `1936506310377907` | "AmareNL Analytics" — **Development modunda, bloke burada** |

Token: `content/meta-ads-drafts/` dışında, `/Users/ark/projects/amarenl.com/analytics/.env`
içinde `META_ACCESS_TOKEN_ADS_MANAGEMENT` olarak duruyor (ads_management + pages_* + instagram_*
izinli, System User token, süresi yok).

## TIKANDIĞIMIZ YER
Reklam kreatifi (`/adcreatives`) oluşturmaya çalışırken hata:
> "Het advertentiebericht is gemaakt door een app in ontwikkelingsmodus. De app moet openbaar
> zijn om deze advertentie te maken."

**Çözüm:** `developers.facebook.com/apps/1936506310377907` içinde uygulamayı **Development →
Live** moduna almak gerekiyor. Kullanıcı bu switch'i standart yerde (`/settings/basic/` veya
`/dashboard/` üst kısmı) bulamadı — Meta arayüzü değişmiş olabilir, ya da önce bazı zorunlu
alanların (Gizlilik Politikası URL'si, kategori, business verification) doldurulması gerekiyor
olabilir. **Sonraki oturumda ilk iş:** bu switch'i bulmak (App Review sekmesi, ya da
"Kullanım Örnekleri"/"Use cases" sekmesi altında olabilir) veya business verification durumunu
kontrol etmek.

## Devam etme adımları (sırayla)
1. App'i Live moda al (yukarıdaki blok).
2. `curl .../adcreatives` çağrısını tekrar dene (komutlar aşağıda, ID'ler hazır).
3. 2 reklam (`/ads`) oluştur, her biri ilgili creative_id + adset_id ile, status=PAUSED.
4. Ad Set'in `start_time`'ını güncelle (geçmiş bir tarih olmuşsa Meta hata verir veya hemen
   başlatır — o anki tarihe göre yeniden hesapla).
5. Kullanıcıyla birlikte Ads Manager'da son görsel kontrol yap.
6. Onay alınca campaign + adset + ads durumunu `ACTIVE` yap (bunu da API'den yapabilirim).

## Hazır reklam kreatifi içerikleri (adcreatives çağrısı için)
**Reklam 1 — Gut-Brain:**
- Headline: `Ontdek de echte oorzaak`
- Primary text: `Constant moe, gespannen, of je concentratie kwijt — en niets lijkt echt te helpen? Er is vaak een reden die je nog niet kende. Ontdek 'm in de gratis gids. 🎁`
- Description: `Gratis · 2 minuten · geen verplichtingen`
- CTA: Meer informatie (LEARN_MORE) → `https://amarenl.com/gratis-gut-brain-gids`

**Reklam 2 — Yorgunluk:**
- Headline: `Ontdek de echte oorzaak`
- Primary text: `Constant moe, ook met genoeg slaap? Je energie ontstaat op celniveau — en soms zit daar het probleem. Ontdek de echte oorzaak in de gratis gids. 🎁`
- Description: `Gratis · 2 minuten · geen verplichtingen`
- CTA: Meer informatie (LEARN_MORE) → `https://amarenl.com/gratis-gut-brain-gids`

## Diğer session notları
- Ad hesabının Meta'daki adı **"HolistiGlow"** — kullanıcı doğruladı, doğru hesap bu, AmareNL ile
  aynı marka/kişi, sadece farklı isimlendirme.
- Sayfa sorunu neden 4-5 tur sürdü (öğrenilen ders): (1) önce token'da `pages_*` scope yoktu,
  (2) Sayfa Business Manager'a bağlıydı ama sistem kullanıcısına atanmamıştı, (3) atama Sayfa'nın
  kendi "Mensen toegevoegd" (People) sekmesinden yapılınca çözüldü — Sistem Kullanıcı tarafındaki
  "Assign Assets" akışı bu hesapta çalışmadı/bulunamadı.
- Kampanya brief'i (insan-okunur, Ads Manager UI'da manuel kurulum için): `campaign-brief-leadgen-v1.md`
