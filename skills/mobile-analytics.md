# Skill: Event Analytics Setup (Mixpanel/GA4)

Bu yetenek, kullanıcı davranışlarını ve dönüşüm hunilerini (funnels) izlemek için gerekli event (olay) ve property (özellik) yapılandırmalarını oluşturmak için kullanılır.

## Kullanım formatı:
`/mobile-analytics "[funnel veya event açıklaması]"`

## Kontrol Listesi:

1. **Event Adlandırma (Naming Convention):**
   - Açık ve tutarlı isimler kullan (Örn: `Product Clicked`, `Affiliate Redirect Started`).
   - Yılan büyük harf (Snake Case) veya Boşluklu başlık formatına sadık kal.

2. **Property (Özellik) Tanımlama:**
   - Her event için bağlamsal veri ekle (Örn: `product_id`, `source_page`, `is_bestseller`).
   - Kullanıcı bazlı özellikler (User Properties) tanımla (Örn: `is_first_visit`, `preferred_category`).

3. **Funnel (Huni) Adımları:**
   - Kullanıcının "Giriş"ten "Dönüşüm"e giden adımlarını netleştir.
   - Her adımda "drop-off" (ayrılma) noktalarını ölçecek eventleri belirle.

4. **Implementasyon (Kod):**
   - React/Next.js bileşenleri içine `mixpanel.track()` veya `gtag('event', ...)` kodlarını hazırla.

## Çıktı Formatı:
- Huni adımlarının listesi.
- Her adım için gerekli event ve property detayları.
- Örnek kod bloğu (Next.js uyumlu).
