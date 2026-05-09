# Skill: Performance Audit

Bu yetenek, projenin performansını Next.js en iyi uygulamaları, Core Web Vitals ve modern web standartlarına göre analiz etmek için kullanılır.

## Kullanım formatı:
`/perf-audit [dizin]`

## Kontrol Listesi:

1. **Bundle Analizi & Kütüphane Kullanımı:**
   - `package.json` içerisinde gereksiz veya çok ağır kütüphaneler var mı? (Örn: moment.js yerine day.js önerisi)
   - İthal edilen kütüphaneler tüm bundle'ı mı çekiyor yoksa sadece gerekli modülleri mi?

2. **Code Splitting & Dynamic Imports:**
   - Sadece ihtiyaç duyulduğunda yüklenmesi gereken büyük bileşenler (Popup, Modallar, ağır grafikler) `next/dynamic` ile yükleniyor mu?
   - Sayfa bazlı olmayan ama ortak kullanılan büyük modüllerin ayrıştırılması.

3. **Görsel Optimizasyonu:**
   - `next/image` bileşeni kullanılıyor mu?
   - Görsellerde `priority` özelliği doğru kullanılmış mı (LCP için)?
   - Görsel boyutları (width/height) ve formatları (WebP/Avif) optimize mi?

4. **Font & Stil Optimizasyonu:**
   - `next/font` ile font optimizasyonu yapılmış mı?
   - CSS bundle boyutu kontrolü (Kullanılmayan CSS'lerin temizlenmesi).

5. **Lazy Loading:**
   - Ekranın altında kalan (below-the-fold) içerikler ve görseller lazy load ediliyor mu?
   - Ağır third-party scriptlerin (Analytics, Ads) yüklenme zamanlaması.

6. **Caching & Rendering:**
   - Static Site Generation (SSG) veya Incremental Static Regeneration (ISR) doğru yapılandırılmış mı?
   - `fetch` isteklerinde caching stratejileri.

## Çıktı Formatı:
- **Bulgu:** [Hangi alanda optimizasyon gerekiyor?]
- **Mevcut Durum:** [Mevcut kod yapısı]
- **Öneri:** [Adım adım optimizasyon talimatı]
- **Tahmini Etki:** [LCP / CLS / Bundle Size üzerindeki etkisi]
