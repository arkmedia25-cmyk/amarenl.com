# 🚀 DEPLOY LOG — amarenl.com

> **KURAL:** Her deploy öncesi bu dosyaya kayıt düş. Her deploy sonrası sonucu güncelle.
> **ASLA uncommitted değişiklikle deploy etme!**

---

## Deploy Geçmişi

| # | Tarih | Saat | Deploy ID | Değişiklik | Sonuç |
|---|-------|------|-----------|------------|-------|
| 35 | 2026-07-23 | — | dpl_GvicP4UQzmYEgAyBFkQoj97Kdf13 | **ACİL DÜZELTME:** 21 Temmuz "humanize" commit'i (6cd8fa6) `data/extra-articles.json`'ı 57→4 makaleye düşürmüştü — 51 endekslenmiş makale 2 gün boyunca 404 vermiş (GSC düşüşünün olası nedeni). 51 makale geri yüklendi + `middagdip-oplossen-zonder-koffie-nitro-xtreme` makalesi (yarım kalmış otomatik yayın) tamamlandı. Tüm URL'ler doğrulandı. | ✅ Live |
| 34 | 2026-07-19 | ~16:00 | dpl_CWaRYWvo6sxUG1FzHzRrXcfN4w7Z | GEO/AEO optimizasyonu FAZ 1-3: MedicalWebPage+HowTo schema, 36 iç link, 8 referans, güvenlik header'ları | ✅ Live |
| 33 | 2026-07-18 | ~15:00 | dpl_2ifet4gP9byJWq4h5sGo2Y3Yfa9w | Remote sync + tüm fix'ler geri yüklendi (115+ blog, 43 ürün) | ✅ Live |
| 32 | 2026-07-18 | ~14:00 | — | ~~DEPLOY_LOG.md eklendi~~ | ✅ |
| 31 | 2026-07-18 | ~12:00 | — | ~~Makale #15~~ — Ürün sayfalarını kırdı, rollback yapıldı | ❌ ROLLBACK |
| 30 | 2026-07-17 | 18:11 | dpl_9cKWut2JKj61AJyHgLSzX8M3hCuT | Ürün sayfaları + header + kategoriler + NeuCollagen homepage | ✅ |
| 29 | 2026-06-18 | 07:27 | — | Makale #14 (Collageen Peptiden) | ✅ |
| 28 | 2026-06-18 | 07:17 | — | Makale #13 (Beste Eiwitpoeder 2026) | ✅ |
| 27 | 2026-06-16 | — | — | 3 karşılaştırma makalesi (B1-B3) | ✅ |
| 26 | 2026-06-15 | — | — | Makale #12 (Adaptogenen) | ✅ |
| 25 | 2026-06-10 | — | — | Pipeline 12/12 tamamlandı | ✅ |

---

## ⚠️ 2026-07-18 HATA RAPORU

**Hata:** `vercel --prod` ile deploy edildi, local repo'da commit'lenmemiş ürün sayfası değişiklikleri Vercel'e yansımadı. Sonuç:
- Ürün kutuları iç sayfa yerine direkt affiliate link'e yönlendirdi
- Homepage NeuCollagen kayboldu
- Header kategorileri eski haline döndü

**Kök neden:** Önceki session'da yapılan değişiklikler **commit edilmeden** `vercel --prod` ile deploy edilmiş. Git sadece commit'li dosyaları takip eder. Yeni bir deploy, commit'siz değişiklikleri ezer.

**Çözüm:**
1. ✅ `vercel promote` ile önceki deploy'a rollback yapıldı
2. Her deploy öncesi `git status` kontrolü zorunlu
3. Tüm değişiklikler commit'lenip push'lanacak

---

## 📋 Deploy Kontrol Listesi (HER SEFERİNDE)

```
[ ] git status — uncommitted değişiklik var mı?
[ ] git add -A && git commit -m "..." — her şey commit'li
[ ] git push origin main — remote güncel
[ ] npm run build — lokal build başarılı mı?
[ ] vercel --prod — deploy
[ ] DEPLOY_LOG.md güncelle
```

---

## 🔑 Kritik Dosyalar (Deploy'da kaybolursa site kırılır)

| Dosya | İçerik | Risk |
|-------|--------|------|
| `lib/products.ts` | Ürün veritabanı + affiliate linkler | YÜKSEK |
| `components/sections/ProductGrid.tsx` | Ürün grid'i + iç sayfa yönlendirme | YÜKSEK |
| `components/layout/Header.tsx` | Navigasyon + kategoriler + dropdown | YÜKSEK |
| `app/page.tsx` | Homepage (Hero, ürünler, blog) | YÜKSEK |
| `app/*/page.tsx` | Deep product sayfaları | ORTA |
| `lib/blog.ts` | Blog veritabanı | ORTA |
| `content/article-queue.md` | Makale kuyruğu | DÜŞÜK |
| `content/blog/*.mdx` | Blog içerikleri | ORTA |

---

| 32 | 2026-07-18 | ~14:00 | dpl_2ifet4gP9byJWq4h5sGo2Y3Yfa9w | Remote sync + ProductGrid fix + tüm sayfalar geri yüklendi | ✅ Live |

---

*Son güncelleme: 2026-07-18 — Başarılı deploy*
