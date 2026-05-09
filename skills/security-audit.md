# Skill: Security Audit (OWASP Top 10)

Bu yetenek, projenin kaynak kodlarını OWASP Top 10 güvenlik standartlarına göre analiz etmek ve olası açıkları raporlamak için kullanılır.

## Kullanım formatı:
`/security-audit [dizin]`

## Kontrol Listesi (OWASP Top 10):

1. **A01:2021-Broken Access Control:**
   - Server Action'larda yetkilendirme kontrolü yapılıyor mu?
   - Kullanıcı verilerine erişirken sadece kullanıcı ID'sine mi güveniliyor? (IDOR)
   - Middleware üzerinden sayfa erişim kısıtlamaları doğru yapılandırılmış mı?

2. **A02:2021-Cryptographic Failures:**
   - `.env` dosyalarında hassas veriler (API key, secret) açıkça duruyor mu?
   - Şifreleme algoritmaları güncel mi? (Zayıf MD5/SHA1 kullanımı var mı?)
   - HTTP yerine HTTPS zorunluluğu var mı?

3. **A03:2021-Injection:**
   - Kullanıcı girdileri (URL parametreleri, form verileri) sanitize ediliyor mu?
   - SQL Injection riski var mı? (ORMs kullanımı kontrol edilmeli)
   - XSS riskine karşı `dangerouslySetInnerHTML` kullanımı var mı?

4. **A04:2021-Insecure Design:**
   - Hata mesajları hassas sistem bilgilerini sızdırıyor mu?
   - Güvenli tasarım prensipleri (fail-safe defaults) uygulanmış mı?

5. **A05:2021-Security Misconfiguration:**
   - `next.config.js` içinde güvenlik başlıkları (CSP, X-Frame-Options) ayarlı mı?
   - Gereksiz portlar veya servisler açık mı?
   - Debug modları üretim ortamında kapalı mı?

6. **A06:2021-Vulnerable and Outdated Components:**
   - `package.json` içindeki bağımlılıklar güncel mi? (`npm audit` sonuçları)
   - Bilinen açığı olan kütüphaneler kullanılıyor mu?

7. **A07:2021-Identification and Authentication Failures:**
   - Oturum yönetimi (JWT, Session) güvenli mi? (HttpOnly, Secure flagları)
   - Brute-force saldırılarına karşı koruma var mı?

8. **A08:2021-Software and Data Integrity Failures:**
   - Güvenilmeyen kaynaklardan script çekiliyor mu?
   - Veri bütünlüğü kontrolleri (checksum) yapılıyor mu?

9. **A09:2021-Security Logging and Monitoring Failures:**
   - Kritik işlemler (login, ödeme, yetki değişikliği) loglanıyor mu?
   - Loglar hassas veri içeriyor mu?

10. **A10:2021-Server-Side Request Forgery (SSRF):**
    - Sunucu tarafından yapılan isteklerde kullanıcı girdisi kısıtlanıyor mu?

## Çıktı Formatı:
Analiz sonunda her bir başlık için şu rapor sunulur:
- **Durum:** [GÜVENLİ / RİSKLİ / KRİTİK]
- **Bulgu:** [Açıklama]
- **Kod Konumu:** [Dosya yolu ve satır]
- **Çözüm Önerisi:** [Nasıl düzeltilir?]
