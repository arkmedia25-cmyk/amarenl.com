# amarenl.com Affiliate Bridge — Dönüşüm Optimizasyon Planı

> **Hedef:** amarenl.com → amare.com arası dönüşümü artırmak (daha fazla satış)  
> **Model:** Affiliate bridge — tüm satışlar amare.com'da  
> **Mevcut durum:** 34 makale, SEO trafiği başlıyor, henüz satış yok  

---

## Sorun Tespiti

Ziyaretçi geliyor, makale okuyor ama **amare.com'a tıklayıp satın almıyor.**

Muhtemel sebepler:
1. CTA'lar yeterince güçlü değil
2. Ziyaretçi güvenmiyor (henüz)
3. Makaleden amare.com'a geçiş kopuk
4. Ziyaretçi bir daha geri gelmiyor (email yakalanmıyor)

---

## Çözüm Paketi (5 Adım)

### 1. CTA Optimizasyonu — "Satın al" değil "Keşfet"

**Şu an (zayıf):**
```
<AffiliateCTA products={["Happy Juice Pack"]} />
→ Kullanıcıya "ürün sayfasına git" diyor
```

**Yapılacak (güçlü):**
- Her makalede 3 CTA noktası: girişte, ortada, sonda
- "Bekijk de ervaringen" (deneyimleri gör)
- "Ontdek waarom 5000+ Nederlanders kiezen voor Amare"
- "Probeer 30 dagen risicovrij" (30 gün risksiz dene)

### 2. Trust Bar — Güven inşa et

Her sayfada görünen bant:
```
✅ 30 dagen niet-goed-geld-terug  |  ✅ Gratis verzending NL  |  ✅ 5000+ tevreden klanten
```

### 3. Exit-Intent Popup — Kaçanları yakala

Siteden çıkarken:
```
"Wacht! Wil je €10 korting op je eerste bestelling?"
→ Email gir → Amare'ye yönlendir (kupon koduyla)
```

### 4. Email Yakalama — Geri getir

- Supplementen Wijzer (zaten yaptık) → email capture
- "Elke week de beste supplementen tips" → newsletter
- 5 email'lik nurture serisi:
  1. Hoş geldin + Wijzer
  2. Neden Amare? (güven)
  3. En popüler ürün (sosyal kanıt)
  4. Başarı hikayesi
  5. Özel teklif → amare.com'a yönlendir

### 5. İçerik Stratejisi — Trafik artırma

- Günlük 1 makale (✅ zaten kurulu)
- Hedef: 3 ayda 100 makale
- Her makale belirli bir arama sorgusunu hedefliyor
- Uzun kuyruklu anahtar kelimeler (az rekabet, yüksek niyet)

---

## Uygulama Planı

### Bugün (Faz 1 — 2 saat):
1. ✅ Trust bar ekle
2. ✅ CTA'ları güçlendir
3. ✅ Exit-intent popup

### Yarın (Faz 2 — 2 saat):
4. Mailchimp hesabı aç
5. Email capture formu
6. Newsletter kayıt sayfası

### Bu hafta (Faz 3 — devam eden):
7. 5 email'lik nurture serisi yaz
8. İlk 100 email toplanana kadar bekle
9. İlk email kampanyasını gönder

---

## Başarı Metrikleri

| Metrik | Şu an | 30 gün hedef | 90 gün hedef |
|--------|-------|-------------|-------------|
| Günlük ziyaretçi | ? | 50 | 200 |
| Amare.com tıklama | ? | 5/gün | 30/gün |
| Email listesi | 0 | 50 | 500 |
| İlk satış | 0 | 🎯 | 10+ |

---

## Teknik: Ne kuracağım

1. **TrustBar bileşeni** — mevcut sitede var, aktifleştirilecek
2. **ExitPopup** — mevcut bileşen var, aktifleştirilecek
3. **Mailchimp embed** — amarenl.com/supplementen-wijzer sayfasına
4. **Güçlendirilmiş AffiliateCTA** — indirim/kupon vurgusuyla
