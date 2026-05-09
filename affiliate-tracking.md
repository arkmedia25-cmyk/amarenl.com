# Affiliate Tracking Systeem — AmareNL.com

> Versie 1.1 | 2026-05-09
> Verantwoordelijk bestand: `lib/affiliate.ts`

---

## Probleem

Ziyaretçi amarenl.com üzerinden Amare'ye gidiyor. Ama daha sonra direkt `amare.com` yazıp giderse veya başka bir affiliate linkine tıklarsa, komisyon başkasına gidebilir. Bu sistem ziyaretçinin HER ZAMAN bizim affiliate ID (2075008) ile Amare'ye yönlendirilmesini sağlar.

---

## 3 Katmanlı Koruma

### Katman 1 — localStorage Kaydı

**Ne yapar:** Ziyaretçi siteye geldiğinde ve herhangi bir butona tıkladığında tarayıcısına şu kayıtlar atılır:
- `amarenl_aff` = `2075008` (affiliate ID)
- `amarenl_aff_ts` = timestamp (ilk ziyaret zamanı)
- `amarenl_aff_visits` = sayı (kaç kez geldiği)

**Kullanıldığı yerler:**
| Dosya | Tetikleyici |
|---|---|
| `components/layout/VisitTracker.tsx` | Her sayfa yüklemesinde otomatik |
| `components/ui/AffiliateCTA.tsx` | Buton tıklamasında |
| `components/sections/ProductGrid.tsx` | Ürün kartı tıklamasında |
| `components/sections/CategoryLanding.tsx` | Kategori sayfası ürün tıklamasında |
| `components/layout/CampaignBanner.tsx` | Banner tıklamasında |
| `components/sections/PromoCarousel.tsx` | Carousel slide tıklamasında |

### Katman 2 — Akıllı Yönlendirme Sayfaları

#### `/go` — Genel yönlendirme
`amarenl.com/go` → `amare.com/2075008/nl-nl/`

**Dosya:** `app/go/page.tsx`

#### `/go/[product]` — Ürüne özel yönlendirme
```
amarenl.com/go/sunset        → amare.com/2075008/nl-nl/sunset
amarenl.com/go/mentabiotics  → amare.com/2075008/nl-nl/mentabiotics
```

**Dosya:** `app/go/[product]/page.tsx`

**Kullanım:**
- Sosyal medya, WhatsApp, e-posta kampanyaları
- "Bu sayfayı favorilere ekleyin" — ziyaretçi hep senin linkinden gider

### Katman 3 — Geri Dönen Ziyaretçi Banner'ı

**Ne yapar:** Daha önce siteyi ziyaret etmiş (en az 1 saat önce) kullanıcı tekrar geldiğinde sayfanın üstünde özel bir banner gösterir.

**Dosya:** `components/layout/ReturnVisitorBanner.tsx`

**Banner içeriği:**
> Welkom terug! Verder winkelen bij Amare? [Ja, ga naar Amare →] [X]

**Gösterilme yeri:** CampaignBanner ile Header arasında (tüm sayfalarda)

---

## Teknik Detaylar

### `lib/affiliate.ts` — API

```typescript
// Sabitler
AFFILIATE_ID = "2075008"
AMARE_BASE = "https://www.amare.com/2075008/nl-nl"

// localStorage işlemleri
getAffiliateId(): string          // Mevcut affiliate ID'yi döndürür
storeAffiliateVisit(): void       // Ziyaret kaydını tazeler
isReturnVisitor(): boolean        // 1 saatten eski ziyaretçi mi?
getVisitCount(): number           // Kaç kez gelmiş?
incrementVisitCount(): void       // Sayaç +1

// URL oluşturma
getAmareUrl(productPath?): string // Amare linkini oluşturur
// Örnek: getAmareUrl("sunset") → "https://www.amare.com/2075008/nl-nl/sunset"
// Örnek: getAmareUrl()         → "https://www.amare.com/2075008/nl-nl"
```

### Cross-Domain Sınırlaması

> ⚠️ `amarenl.com`, `amare.com` domainine cookie bırakamaz. Bu tarayıcı güvenliği gereğidir (same-origin policy).
>
> Affiliate takibi **URL parametresi** ile yapılır. Amare'nin kendi sistemi, kendi domain'ine cookie bırakır.
>
> Bu sistemin amacı: Ziyaretçiyi MÜMKÜN OLDUĞUNCA bizim affiliate linkimizden Amare'ye yönlendirmek.

---

## Nasıl Test Edilir

1. **localStorage kontrolü:**
   - Siteyi ziyaret et → DevTools → Application → Local Storage → `localhost:3000`
   - `amarenl_aff`, `amarenl_aff_ts`, `amarenl_aff_visits` anahtarlarını gör

2. **/go sayfası:**
   - `localhost:3000/go` → Amare ana sayfasına yönlendirmeli
   - `localhost:3000/go/sunset` → Sunset ürün sayfasına yönlendirmeli

3. **Return banner:**
   - localStorage'daki `amarenl_aff_ts` değerini manuel olarak eski bir zamana ayarla
   - Sayfayı yenile → banner çıkmalı

4. **Buton tıklaması:**
   - Herhangi bir affiliate butonuna tıkla
   - localStorage'daki `amarenl_aff_ts` güncellenmeli

---

## Gelecek Revizyonlar

- [ ] `/go/[product]` sayfasına UTM parametresi ekle
- [ ] ReturnVisitorBanner için A/B testi (farklı metinler)
- [ ] Affiliate tıklama analitiği (GA4 event ile birleştir)
- [ ] E-posta kampanyalarında `/go` linkini kullan
