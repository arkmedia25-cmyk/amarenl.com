# Amare marka sorguları — durum ve yapılanlar (2026-11-06)

## Soru
"Ürün başlıklarına Amare marka adını koysak, amare aranınca sayfamız öne çıkar mı? Trafik alır mıyız?"

## Ölçüm (GSC, 10 Eki – 6 Kas, 28 gün)

| Küme | Sorgu | Gösterim | Tık | Ort. poz |
|---|---|---|---|---|
| Site toplamı | — | 580 | 2 | — |
| `amare` içeren sorgular | 27 | 121 | 1 | 2,5 – 11 |
| `amare` + niyet kelimesi (kopen/prijs/review/…) | ~0 | ~0 | 0 | — |

Gösterimin **95'i ana sayfaya** düşüyor; ürün sayfaları marka sorgularında neredeyse görünmüyor.
En yüksek hacimli sorgular: `amare global` 63 imp / poz 5,8 · `amare happy juice` 13 / 6,5 ·
`amare energy` 7 / 8,0.

## Yorum
- Sayfalar marka sorgularında **zaten** ilk 10'da (bazılarında 2.–3.). Sorun sıralama değil.
- Bunlar **navigasyon** sorguları: kullanıcı resmî siteye gitmek istiyor. `amare` aramalarında ilk
  8 sonucun tamamı amare.com / Amazon / resmî sosyal hesaplar. Marka adını başlığa eklemek bu
  niyeti değiştirmez; tık oranı düşük kalır.
- Gerçek fırsat **marka + niyet** sorguları (`amare mentabiotics kopen`, `amare happy juice prijs`,
  `amare ervaringen`, `amare kortingscode`, `amare ingrediënten`, België varyantları). Bu kümede
  şu an gösterim yok — çünkü bu niyeti hedefleyen başlık/içerik yok.

## Yapılanlar (commit 417c5da)
1. `app/page.tsx` → başlık `Amare Global producten: prijzen & ingrediënten` + description
   (ana sayfa daha önce layout varsayılanını miras alıyordu).
2. `components/sections/AmareBrandHub.tsx` → ana sayfada "Amare producten in Nederland — het
   volledige overzicht": 40 ürüne iç link, paket/çok satan 6 ürün fiyatla, 3 şeffaflık maddesi
   ("officiële Amare-website değiliz; affiliate link, Amare teslim eder").
3. Başlıklarda marka adı: `/mentabiotics`, `/nitro-xtreme`, `/happy-juice-pack`, `/sunset`
   (hepsi ≤ 60 karakter, niyet kelimesi korundu).
4. `/happy-juice-pack` H1: `Amare Happy Juice Pack®`.
5. IndexNow: 5 URL → HTTP 200.

## Marka politikası çizgisi
- "Officiële Amare webshop" gibi ifade **yok**; "onafhankelijk", "wij leggen uit, Amare levert".
- Marka adı domain'de değil, reklamda teklif edilmiyor; yalnızca ürün sayfası başlığında.

## Ölçüm planı
- Baseline: `docs/marka-baseline-2026-11-06.json` (site 580 imp / 2 tık; marka 121 / 1;
  marka+niyet ≈ 0).
- 2 hafta sonra (≈ 20 Kasım) aynı sorgu kümesiyle karşılaştır:
  - hedef: marka sorgularından tık 1 → 8-10
  - hedef: marka+niyet kümesinde ilk kez gösterim (özellikle `kopen`, `prijs`, `ervaringen`)
  - izlenecek: `/supplementen` ve hub bloklu ana sayfanın marka dışı sorgularda da tık alması
- Yorum kuralı: marka tıkları artmazsa suç başlıkta değil, **niyet içeriğinde** — sıradaki adım
  ürün sayfalarına `kopen / prijs / ervaringen / ingrediënten` H2 + FAQ bloğu eklemek.
