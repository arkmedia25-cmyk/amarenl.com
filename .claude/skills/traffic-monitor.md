---
name: traffic-monitor
description: GA4 trafik ve kullanıcı davranışı izleme. Haftalık trafik raporu, en çok okunan makaleler, dönüşüm metrikleri. Her Pazartesi çalışır.
---

# 📊 Traffic Monitor Agent — AmareNL

## Görev Tanımı
Bu agent, **her Pazartesi** haftalık trafik raporu çıkarır. AmareNL'nin Google Analytics 4 (GT-MKTPDM2M) verilerini analiz ederek hangi içeriklerin trafik çektiğini, hangi anahtar kelimelerin dönüşüm getirdiğini raporlar.

## Çalışma Adımları

### Adım 1: GA4 Verilerini Çek
GA4 ID: `GT-MKTPDM2M`

Aşağıdaki metrikleri kontrol et (son 7 gün):

```markdown
## 📊 Haftalık Trafik Raporu — [Tarih Aralığı]

### Genel Bakış
| Metrik | Bu Hafta | Geçen Hafta | Değişim |
|--------|----------|-------------|---------|
| Toplam Kullanıcı | X,XXX | X,XXX | +/-% |
| Yeni Kullanıcı | X,XXX | X,XXX | +/-% |
| Sayfa Görüntüleme | X,XXX | X,XXX | +/-% |
| Ort. Oturum Süresi | X:XX | X:XX | +/-% |
| Hemen Çıkma Oranı | %XX | %XX | +/-% |
| Affiliate Tıklama | XXX | XXX | +/-% |
| Form Gönderimi | XX | XX | +/-% |
```

### Adım 2: Trafik Kaynakları Analizi

```markdown
### Trafik Kaynakları
| Kaynak | Kullanıcı | % Değişim | Dönüşüm |
|--------|-----------|-----------|---------|
| Organik Arama | X,XXX | +/-% | XX |
| Doğrudan | XXX | +/-% | X |
| Sosyal Medya | XX | +/-% | X |
| Referans | XX | +/-% | X |
```

### Adım 3: En Popüler Sayfalar

```markdown
### 🏆 En Çok Görüntülenen Sayfalar (Top 5)
| # | Sayfa | Görüntülenme | Ort. Süre | Dönüşüm |
|---|-------|-------------|-----------|---------|
| 1 | / | X,XXX | X:XX | XX |
| 2 | /blogs/nieuws/[slug] | XXX | X:XX | XX |
| 3 | ... | ... | ... | ... |
```

### Adım 4: Blog Performansı

```markdown
### 📝 Blog Performansı
| Makale | Görüntülenme | Ort. Süre | Hemen Çıkma | Affiliate Tıklama |
|--------|-------------|-----------|-------------|------------------|
| [Başlık 1] | XXX | X:XX | %XX | XX |
| [Başlık 2] | XXX | X:XX | %XX | XX |
| [Başlık 3] | XXX | X:XX | %XX | XX |
| ... | ... | ... | ... | ... |

### 🥇 En İyi Dönüşüm Getiren Makaleler
1. **[Başlık]** — XX affiliate tıklama (%CTR)
2. ...
```

### Adım 5: Anahtar Kelime Performansı (Google Search Console)

```markdown
### 🔑 En İyi Performans Gösteren Anahtar Kelimeler
| Anahtar Kelime | Tıklama | Gösterim | CTR | Ort. Pozisyon |
|----------------|---------|----------|-----|---------------|
| [kelime 1] | XXX | X,XXX | %X | X.X |
| [kelime 2] | XX | X,XXX | %X | X.X |
| ... | ... | ... | ... | ... |

### 🆕 Yeni Keşfedilen Anahtar Kelimeler
- [kelime] — [tıklama] tıklama, [pozisyon] pozisyon
```

### Adım 6: İçgörüler ve Öneriler

```markdown
## 💡 Bu Haftanın İçgörüleri

### Ne Çalışıyor?
1. **[İçgörü 1]** — [veri]
2. **[İçgörü 2]** — [veri]

### Ne İyileştirilmeli?
1. **[Öneri 1]** — [aksiyon]
2. **[Öneri 2]** — [aksiyon]

### Aksiyon Önerileri
- [ ] [Öneri 1] — Sorumlu: article-scheduler
- [ ] [Öneri 2] — Sorumlu: market-research
- [ ] [Öneri 3] — Sorumlu: blog-writer
```

## Uyarı Eşikleri (Alert)

| Metrik | Kritik Eşik | Uyarı |
|--------|------------|-------|
| Haftalık ziyaretçi | -%20 vs geçen hafta | 🔴 Trafik düşüşü |
| Hemen çıkma oranı | >%70 | 🟡 Yüksek bounce |
| Affiliate tıklama | -%30 vs geçen hafta | 🔴 Dönüşüm düşüşü |
| Ort. oturum süresi | <45 saniye | 🟡 Düşük etkileşim |
| Form gönderimi | 0 (haftalık) | 🔴 Lead yok |

## Notlar
- GA4 verilerine doğrudan erişim yoksa, Google Search Console verileriyle yetin
- Elle veri girilmişse (manual tracking), onu kullan
- Raporu her Pazartesi `content/weekly-report-YYYY-MM-DD.md` olarak kaydet
- Eski raporları 30 gün sonra temizle
