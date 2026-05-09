# Skill: Troubleshoot & Debug

Bu yetenek, projenin geliştirme (development) ve yayınlama (deployment) aşamalarında karşılaşılan hataları teşhis etmek ve hızlı çözümler üretmek için kullanılır.

## Kullanım formatı:
`/troubleshoot "[hata mesajı veya hata kodu]"`

## Kontrol Listesi:

1. **Hata Kaynağı Tespiti:**
   - Hata Build zamanında mı (Build-time) yoksa Çalışma zamanında mı (Runtime) oluşuyor?
   - Sorun Frontend (Client-side), Backend (API Routes/Server Actions) veya Altyapı (Vercel/Hosting) kaynaklı mı?

2. **Vercel & Next.js Spesifik Hatalar:**
   - `Module not found`, `Type error`, `ISR (Incremental Static Regeneration)` hataları.
   - Çevre değişkenlerinin (Environment Variables) eksikliği veya yanlış yapılandırılması.

3. **Log Analizi:**
   - Konsol çıktılarını ve Vercel Deployment loglarını inceleyerek hatanın "root cause" (kök neden) tespitini yap.

4. **Çözüm Rehberi:**
   - Hatayı düzeltmek için adım adım kod değişikliği veya yapılandırma güncellemesi öner.
   - Hatayı tekrar önlemek için "best practice" tavsiyesi ver.

## Çıktı Formatı:
- **Hata Analizi:** [Hatanın neden oluştuğuna dair teknik açıklama]
- **Kritiklik Seviyesi:** [Düşük / Orta / Yüksek / Bloklayıcı]
- **Çözüm Adımları:** [Adım adım uygulama rehberi]
- **Doğrulama:** [Hatanın çözüldüğünü nasıl anlarız?]
