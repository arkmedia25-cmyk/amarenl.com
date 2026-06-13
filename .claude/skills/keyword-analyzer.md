---
name: keyword-analyzer
description: Hollandaca anahtar kelime analizi. SEO-GEO potansiyeli, arama hacmi tahmini, People Also Ask soruları çıkarır. market-research tarafından çağrılır.
---

# 🔑 Keyword Analyzer Agent — AmareNL

## Görev Tanımı
Bu agent, belirli bir Hollandaca anahtar kelime veya konunun SEO-GEO potansiyelini analiz eder.
Market-research agent'ı tarafından çağrılır veya manuel `/keyword-analyzer "keyword"` ile çalışır.

## Çalışma Adımları

### Adım 1: Anahtar Kelimeyi Al
- market-research agent'ından gelen konu/kelime
- Veya manuel komut: `/keyword-analyzer "collageen supplement"`

### Adım 2: Anahtar Kelime Metriklerini Çıkar

Her anahtar kelime için şu tabloyu doldur:

```markdown
## Anahtar Kelime Analizi: "[keyword]"

### Temel Metrikler
| Metrik | Değer |
|--------|-------|
| Anahtar Kelime (NL) | [keyword] |
| Tahmini Aylık Arama (NL) | X,XXX |
| Arama Niyeti | Informational / Commercial / Transactional |
| Rekabet Seviyesi | Düşük / Orta / Yüksek |
| Mevsimsellik | Evergreen / Mevsimsel (aylar) |
| GEO Potansiyeli | Düşük / Orta / Yüksek |

### People Also Ask (Google NL)
1. "Wat is [keyword] en hoe werkt het?"
2. "Is [keyword] veilig om dagelijks te gebruiken?"
3. "Hoe snel zie je resultaat van [keyword]?"
4. "Wat zijn de bijwerkingen van [keyword]?"
5. "Welke [keyword] is het beste?"

### İlgili Arama Terimleri (Lateral Keywords)
- [terim 1] — [tahmini hacim]
- [terim 2] — [tahmini hacim]
- [terim 3] — [tahmini hacim]
- [terim 4] — [tahmini hacim]
- [terim 5] — [tahmini hacim]

### Amare Ürün Eşleşmesi
| Ürün | Uygunluk | Açıklama |
|------|----------|----------|
| [Ürün 1] | ⭐⭐⭐⭐⭐ | Mükemmel eşleşme... |
| [Ürün 2] | ⭐⭐⭐ | Kısmi eşleşme... |

### Önerilen Başlık (SEO-GEO Optimize)
"[SEO başlık — max 60 karakter, anahtar kelime başta]"

### Önerilen Meta Description
"[Max 155 karakter — anahtar kelime + fayda + CTA iması]"
```

### Adım 3: GEO Skoru Hesapla

5 kriter × 1-5 puan:

| Kriter | Puan | Açıklama |
|--------|------|----------|
| Arama Hacmi | X/5 | NL aylık arama |
| Ticari Niyet | X/5 | Satın alma niyeti |
| Ürün Eşleşmesi | X/5 | Amare ürün uyumu |
| Rekabet Boşluğu | X/5 | Rakip eksikliği |
| GEO Uygunluğu | X/5 | AI overviews potansiyeli |
| **TOPLAM** | **XX/25** | |

### Adım 4: İçerik Brief'i Üret

```markdown
## İçerik Brief'i: [Başlık]

### Hedef Kitle
- [Demografi]
- [Sorun/İhtiyaç]
- [Arama anındaki ruh hali]

### İçerik Yapısı
1. H2: Wat is [X] en waarom is het belangrijk? (150-200 kelime)
2. H2: [Bilimsel açıklama] (200-300 kelime)
3. H2: [Pratik çözümler] (200-300 kelime)
4. H2: Veelgestelde vragen (3 soru)
5. H2: Conclusie

### Zorunlu Unsurlar
- [ ] Anahtar kelime ilk 100 kelimede
- [ ] Min. 1 bilimsel kaynak (Voedingscentrum / RIVM / PubMed)
- [ ] NVWA disclaimer
- [ ] AfiliateCTA: [ürün]
- [ ] 2+ iç link (diğer Amare sayfalarına)

### Rakip İçerik Boşluğu
Rakiplerin eksik bıraktığı açılar:
- [Açı 1]
- [Açı 2]
```

## GEO Çağı İçin Anahtar Kelime Seçim Kuralları

### ✅ İyi Anahtar Kelime
- "Wat is..." formatı (AI overviews için ideal)
- Uzun kuyruklu (long-tail): 3+ kelime
- Soru formatı: "hoe werkt...", "is ... veilig", "wat zijn de voordelen van..."
- Deneyim odaklı: "...ervaringen", "...review", "...gebruikers"

### ❌ Kötü Anahtar Kelime
- Tek kelime: "collageen", "probiotica" (çok geniş, rekabet yüksek)
- Sadece İngilizce terimler
- Aşırı ticari: "kopen", "bestellen", "goedkoop" (GEO'da düşük performans)
- Medikal iddialı: "genezen", "behandeling" (yasal risk)

## Yasaklılar
- ❌ Sahte arama hacmi rakamları
- ❌ Medikal iddia içeren anahtar kelimeler
- ❌ Rakip marka isimleri hedefleme
