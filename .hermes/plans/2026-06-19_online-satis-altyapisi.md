# Online Gıda Takviyesi Satış Altyapısı — Uygulama Planı

> **Hazırlayan:** Hermes Agent  
> **Tarih:** 19 Haziran 2026  
> **Hedef:** Amare.com affiliate'likten kendi online satışına geçiş  

---

## Durum Analizi

**Neredesin:**
- amarenl.com → SEO/blog bridge sitesi (34 makale, günlük içerik)
- amarereview.nl → İnceleme sitesi (2 makale, 2 günde bir içerik)
- Amare.com affiliate (ID: 2075008)
- Hollanda pazarı, Hollandaca içerik
- Claude Cowork'a ihtiyaç yok — Hermes her şeyi yapıyor

**Nereye gitmek istiyorsun:**
- Online gıda takviyesi satışı
- Kendi müşteri tabanın
- Pasif gelir

---

## Önerilen Mimari

```
amarenl.com (SEO içerik) ──→ SHOP.amarenl.com (satış) ──→ Ödeme (Mollie)
amarereview.nl (inceleme) ──┘                              │
                                                           ↓
email listesi ←── Mailchimp/ConvertKit ←── Müşteri
                                                        
Tedarik: Amare.com (affiliate) veya toptan alım
```

**Neden bu mimari:**
- amarenl.com SEO'da yükselmeye devam eder, satış sayfasına trafik gönderir
- Ayrı satış alanı (shop.amarenl.com) profesyonel durur
- Mollie → iDEAL dahil tüm Hollanda ödeme yöntemleri
- Envanter yok → sipariş geldikçe Amare'den al veya dropship

---

## Faz 1: Basit Satış Sayfası (1-2 gün)

**Hedef:** En hızlı şekilde satışa başlamak

### 1.1 En çok satan 3 ürünü belirle
- Happy Juice Pack (en popüler)
- MentaBiotics (gut-brain)
- HL5 Collageen (cilt)

### 1.2 Tek sayfa satış (landing page)
- `shop.amarenl.com` veya `amarenl.com/shop`
- Her ürün için: faydalar, fiyat, "Satın Al" butonu
- Mollie ödeme linki entegrasyonu

### 1.3 Ödeme: Mollie
- `mollie.com` → ücretsiz hesap
- iDEAL, Bancontact, Credit card, PayPal
- Komisyon: €0.25 + %1.2/işlem
- Hermes ile API entegrasyonu

**Bu fazın maliyeti:** €0/ay (Mollie sadece işlem başına)

---

## Faz 2: Mini E-ticaret (1 hafta)

### 2.1 Shopify Lite (€9/ay)
- `shop.amarenl.com` alt domain
- Ürün sayfaları, sepet, checkout
- Mobil optimize

### 2.2 Ürün kataloğu
- 5-10 Amare ürünü
- Her ürün için: açıklama, faydalar, fiyat, SSS

### 2.3 Otomatik sipariş akışı
- Sipariş → email bildirimi
- Amare'den manuel sipariş (veya API varsa otomatik)

---

## Faz 3: Otomasyon & Ölçekleme (2-4 hafta)

### 3.1 Email pazarlama
- Mailchimp ücretsiz (500 kişiye kadar)
- Hoş geldin serisi (5 email)
- Sepeti terk edenlere otomatik email

### 3.2 İçerik → satış hunisi
- Her blog makalesinin altına ürün CTA'sı
- Supplementen Wijzer → email capture → satış
- "En çok satanlar" widget'ı

### 3.3 Analitik
- Google Analytics e-ticaret takibi
- Hangi içerik satış getiriyor?

---

## NVWA Uyumluluğu (ZORUNLU)

Hollanda'da gıda takviyesi satışı için:

| Gereklilik | Nasıl |
|-----------|-------|
| NVWA kaydı | `nvwa.nl` → bedava kayıt |
| Sağlık iddiaları | SADECE EU onaylı claims |
| Etiket bilgisi | Ürün sayfasında tam içerik |
| Disclaimer | Her sayfada "geen medisch advies" |
| KVK kaydı | Zaten var (Amare affiliate) |

---

## Maliyet Özeti

| Araç | Aylık |
|------|-------|
| Mollie | €0 + işlem komisyonu |
| Shopify Lite | €9 |
| Mailchimp | €0 (500 kişi) |
| Domain (shop.amarenl.com) | €0 (mevcut domain) |
| **Toplam** | **€9/ay** |

---

## Uygulama Sırası

1. Mollie hesabı aç → sen yap (mollie.com, KVK ile)
2. En çok satan 3 ürün landing page → ben yaparım
3. Ödeme linkleri → ben entegre ederim
4. Test siparişi → sen verirsin
5. Canlıya al
6. Shopify/ölçekleme → Faz 2

---

## Riskler & Açık Sorular

- **Tedarik:** Amare'den toptan alım yapabiliyor musun? Yoksa her siparişi affiliate link üzerinden mi vereceksin?
- **Stok:** Stok tutacak mısın yoksa sipariş geldikçe mi alacaksın?
- **İade:** İade politikası ne olacak?
- **Fatura:** Fatura kesmen gerekecek (Moneybird, Factuursturen vb.)
