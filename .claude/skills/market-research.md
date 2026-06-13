---
name: market-research
description: Pazar araştırması ve içerik boşluğu analizi. SEO-GEO-AEO odaklı. Haftalık çalışır. AmareNL için hangi konularda blog yazılması gerektiğini önceliklendirir.
---

# 🔍 Market Research Agent — AmareNL

## Görev Tanımı
Bu agent, **her Pazartesi** çalışarak AmareNL için en güncel pazar fırsatlarını tespit eder.
GEO (Generative Engine Optimization) çağında çalıştığını UNUTMA — sadece Google için değil, AI overviews için de optimize ediyorsun.

## Çalışma Adımları

### Adım 1: Mevcut Durumu Tara
1. `lib/products.ts` — TÜM ürünleri oku. Her ürünün faydalarını, içeriklerini, kategorisini çıkar.
2. `content/article-queue.md` — Mevcut kuyruğu oku. Hangi makaleler yazılmış, hangileri kalmış?
3. `lib/blog.ts` — Yayınlanmış tüm makaleleri listele. Hangi konular işlenmiş?
4. `content/blog/` — MDX dosyalarını kontrol et.

### Adım 2: Boşluk Analizi Yap
Şu matrisi doldur:

| Kategori | Ürün Sayısı | Makale Sayısı | Boşluk | Öncelik |
|----------|------------|---------------|--------|---------|
| darmen | X | Y | Z konu eksik | 🔴/🟡/🟢 |
| schoonheid | X | Y | ... | ... |
| essentials | X | Y | ... | ... |
| mentaal | X | Y | ... | ... |
| hormonen | X | Y | ... | ... |
| kids | X | Y | ... | ... |

### Adım 3: Yeni Fırsatları Ara
- **Google Trends NL** popüler aramaları kontrol et: supplementen, afvallen, collageen, probiotica, energie, slaap, stress, menopauze
- **People Also Ask** sorularını tara: her anahtar kelime için 3'er soru çıkar
- **Rakip analizi:** Hollandaca supplement blog'larında hangi konular trend?
- **Mevsimsellik:** Önümüzdeki ay hangi konular yükselişte? (örn: yaz = afvallen, huid; kış = vit D, immuunsysteem)

### Adım 4: Önceliklendirme Kriterleri
Her potansiyel konu için 1-5 puan ver:
1. **Search Volume (NL):** Tahmini aylık arama hacmi (1=az, 5=çok)
2. **Commercial Intent:** Ürün satın alma niyeti (1=bilgi, 5=doğrudan satın alma)
3. **Product Match:** Amare ürünleriyle uyumu (1=zayıf, 5=mükemmel)
4. **Competition Gap:** Rakiplerin bu konuda içerik eksikliği (1=doygun, 5=boşluk)
5. **GEO Potential:** AI overviews'ta kaynak olma potansiyeli (1=düşük, 5=yüksek)

**Toplam puanı en yüksek 3 konuyu acil kuyruğa ekle.**

### Adım 5: Çıktı Formatı
```markdown
## Haftalık Pazar Raporu — [Tarih]

### 🔴 Acil Fırsatlar (Bu hafta yazılmalı)
1. **[Başlık]** | Keyword: [NL] | Ürün: [X] | Puan: XX/25
   - FAQ: [soru1], [soru2], [soru3]

### 🟡 Önümüzdeki Hafta
2. ...

### 📊 Kategori Sağlık Skoru
| Kategori | Skor | Durum |
|----------|------|-------|

### 🔑 Bu Haftanın Trend Anahtar Kelimeleri
- ...
```

## GEO Çağı İçin Özel Kurallar
- ✅ Her konu önerisinde EN AZ 3 "People Also Ask" sorusu ver
- ✅ "Wat is...", "Hoe werkt...", "Is ... veilig?" formatında sorular
- ✅ Kişisel deneyim içerebilecek açılar ara ("ervaringen", "gebruikers", "review")
- ✅ Bilimsel referans verilebilecek konuları tercih et (Voedingscentrum, PubMed)
- ❌ Sadece "commodity content" (her yerde bulunan genel bilgi) üretecek konulardan kaçın

## Yasaklılar
- ❌ "geneest", "behandelt", "klinisch bewezen" iddialı başlıklar
- ❌ İngilizce anahtar kelimeler (Hollandaca odaklan)
- ❌ Ürün olmayan kategorilerde sahte ihtiyaç yaratma
