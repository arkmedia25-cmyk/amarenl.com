# Skill: SEO Setup

Bu yetenek, projenin sayfaları ve blog içerikleri için tam kapsamlı SEO yapılandırması (Meta, OG, JSON-LD, Sitemap) oluşturmak için kullanılır.

## Kullanım formatı:
`/seo-setup "[sayfa tipi veya içerik konusu]"`

## Kontrol Listesi:

1. **Next.js Metadata API:**
   - Sayfaya özel `title` (max 60 karakter) ve `description` (max 155 karakter) oluştur.
   - Canonical URL ve alternates (dil seçenekleri) yapılandır.

2. **Open Graph (OG) & Twitter Cards:**
   - Sosyal medya paylaşım görsellerini ve başlıklarını ayarla.
   - `og:type`, `og:locale` ve `og:site_name` bilgilerini ekle.

3. **JSON-LD (Structured Data):**
   - Sayfa tipine göre (Article, Product, FAQPage, BreadcrumbList) uygun şemayı üret.
   - `SchemaMarkup.tsx` bileşenine uygun veri modelini hazırla.

4. **Sitemap & Robots:**
   - Sayfanın `next-sitemap` konfigürasyonuna dahil edilip edilmeyeceğini belirle.
   - `robots.txt` kurallarına uygunluğu denetle (noindex gerekip gerekmediği).

5. **AEO/GEO Optimizasyonu:**
   - AI arama motorları için soru-cevap formatında (FAQ) içerik blokları tasarla.

## Çıktı Formatı:
- Sayfa için gerekli `export const metadata: Metadata = { ... }` bloğu.
- Sayfaya eklenecek JSON-LD script içeriği.
- Varsa sitemap ve robots önerileri.
