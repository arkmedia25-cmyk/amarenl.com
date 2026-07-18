# 🚀 DEPLOY LOG — amarenl.com

> **KURAL:** Her deploy öncesi bu dosyaya kayıt düş. Her deploy sonrası sonucu güncelle.
> **ASLA uncommitted değişiklikle deploy etme!**

---

## Deploy Geçmişi

| # | Tarih | Saat | Deploy ID | Değişiklik | Sonuç |
|---|-------|------|-----------|------------|-------|
| 31 | 2026-07-18 | ~12:00 | — | ~~Makale #15 (Huidverzorging)~~ — Ürün sayfalarını kırdı, rollback yapıldı | ❌ ROLLBACK |
| 30 | 2026-07-17 | 18:11 | dpl_9cKWut2JKj61AJyHgLSzX8M3hCuT | Ürün sayfaları + header + kategoriler + NeuCollagen homepage (önceki session) | ✅ Live |
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

| 32 | 2026-07-18 | ~14:00 | dpl_2ifet4gP9byJWq4h5sGo2Y3Yfa9w | Remote sync + DEPLOY_LOG.md + tüm fix'ler geri yüklendi | ✅ Live |

---

*Son güncelleme: 2026-07-18 — Başarılı deploy*
