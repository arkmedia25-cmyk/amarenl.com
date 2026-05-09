# Skill: Scan Secrets

Bu yetenek, proje içerisindeki dosyalarda yanlışlıkla bırakılmış olabilecek API anahtarları, tokenlar, şifreler ve diğer hassas verileri tespit etmek için kullanılır.

## Kullanım formatı:
`/scan-secrets [dizin]`

## Taranan Kalıplar:
1. **API Anahtarları:** Generic, Google (AIza...), Stripe (sk_live...), AWS (AKIA...), vb.
2. **Tokenlar:** JWT (eyJ...), OAuth tokenları, Bearer tokenlar.
3. **Şifreler:** `password`, `secret`, `api_key` gibi değişken isimlerinin yanındaki değerler.
4. **Özel Anahtarlar:** SSH private keyler, SSL sertifikaları (`-----BEGIN...`).
5. **Konfigürasyon Dosyaları:** `.env`, `config.json` gibi dosyaların commit edilip edilmediği kontrolü.

## Güvenlik Notu:
Bu tarama sırasında bulunan gerçek anahtarları raporda tam olarak göstermeyin (maskeleyin, örn: `AIza...x8p9`).

## Çıktı Formatı:
- **Dosya:** [Dosya yolu]
- **Tür:** [API Key / Token / Password]
- **Risk Seviyesi:** [DÜŞÜK / ORTA / YÜKSEK]
- **Öneri:** [Verinin .env dosyasına taşınması veya anahtarın iptal edilmesi]
