# Skill: Form & Lead Processing

Bu yetenek, sitedeki formlardan (İletişim, Bülten, E-kitap talebi) gelen verileri sınıflandırmak, ilgili servislere (CRM/Mail Service) iletmek ve otomatik yanıt süreçlerini yönetmek için kullanılır.

## Kullanım formatı:
`/form-process "[form tipi veya gelen veri örneği]"`

## Kontrol Listesi:

1. **Veri Sınıflandırma (Classification):**
   - Talebi türüne göre ayır (Örn: `Soru`, `Şikayet`, `İş Ortaklığı`, `E-kitap Talebi`).
   - Talebin aciliyetini ve konusunu (Ürün danışmanlığı, Teknik sorun vb.) belirle.

2. **CRM & Mail Entegrasyonu:**
   - Veriyi `CLAUDE.md` Bölüm 9'da belirtilen segmentlere ayır (`popup-exit`, `blog-organic` vb.).
   - API üzerinden ilgili listeye (Mailchimp, Klaviyo vb.) kayıt oluştur.

3. **Otomatik Yanıt (Auto-responder):**
   - Kullanıcıya anında gidecek onay e-postasının içeriğini hazırla.
   - E-kitap linki veya indirim kodunun iletildiğinden emin ol.

4. **Hata Yönetimi:**
   - Eksik veya hatalı form verilerinde kullanıcıya verilecek uyarı mesajlarını belirle.

## Çıktı Formatı:
- Verinin atanacağı segment/etiket bilgisi.
- CRM API isteği için gerekli JSON gövdesi.
- Otomatik yanıt e-posta taslağı (Hollandaca/NL).
