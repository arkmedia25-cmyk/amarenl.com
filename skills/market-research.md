# Skill: Pazar Araştırması (market-research)

Bu yetenek, AmareNL için içerik boşluklarını tespit eder, rakip analizi yapar ve hangi konularda içerik üretilmesi gerektiğini önceliklendirir.

## Ne Zaman Kullanılır
- `/market-research` komutu ile
- Aylık içerik planlaması yaparken
- Yeni ürün lansmanı öncesi
- Hangi anahtar kelimelere odaklanılacağını belirlerken

## Araştırma Adımları

### Adım 1: Mevcut Durum Analizi
1. `lib/products.ts` dosyasındaki TÜM ürünleri oku.
   - Her ürünün `benefitsNL`, `taglineNL`, `descriptionNL` alanlarını tara.
   - Hangi vitamin/mineral/bileşenler öne çıkıyor?
   - Hangi ürünlerin içerik desteği YOK?

2. `content/blog/` klasöründeki mevcut makaleleri tara.
   - Hangi kategorilerde makale var?
   - Hangi kategoriler BOŞ?
   - keywords-ads.md'deki listeden hangileri yazılmış?

3. `keywords-ads.md` dosyasını kontrol et.
   - Önerilen başlıklardan hangileri henüz yazılmadı?
   - Yeni anahtar kelime grupları eklenmeli mi?

### Adım 2: Boşluk Analizi (Content Gap)
Şu matrisi doldur:

| Kategori | Ürün Sayısı | Mevcut Makale | Eksik Konular | Öncelik |
|----------|------------|---------------|---------------|---------|
| hersenen | X | Y | ... | 🔴/🟡/🟢 |
| darmen | X | Y | ... | 🔴/🟡/🟢 |
| schoonheid | X | Y | ... | 🔴/🟡/🟢 |
| essentials | X | Y | ... | 🔴/🟡/🟢 |
| kids | X | Y | ... | 🔴/🟡/🟢 |

### Adım 3: Ürün-İçerik Eşleştirme
Her ürün için şu soruları sor:
1. Bu ürünün ana faydası ne? (benefitsNL)
2. Bu faydayla ilgili bir makale var mı?
3. Hangi sorular bu ürünü satar? (People Also Ask)
4. Hangi anahtar kelimeler bu ürüne trafik çeker?

Çıktı: Her ürün için 1-2 makale fikri.

### Adım 4: Rakip İçerik Boşlukları
Hollandaca supplement/wellness rakiplerini tara:
- Hangi konularda onlar yazmış biz yazmamışız?
- Hangi konularda DAHA İYİ içerik üretebiliriz? (daha uzun, daha bilimsel, daha güncel)
- Hangi "featured snippet" fırsatları kaçırılmış?

### Adım 5: Önceliklendirme Matrisi
Her makale fikrini şuna göre puanla (1-5):

| Kriter | Ağırlık |
|--------|---------|
| SEO potansiyeli (aranma hacmi) | %30 |
| Ürünle doğrudan ilişki (satış potansiyeli) | %30 |
| GEO/AEO potansiyeli (People Also Ask) | %20 |
| Rekabet düşüklüğü (kolay sıralama) | %20 |

### Adım 6: Aylık İçerik Takvimi Önerisi
En yüksek puanlı 4-5 konuyu sırala:
```
Hafta 1: [Başlık] — Kategori: X — Hedef Ürün: Y — Puan: Z
Hafta 2: [Başlık] — Kategori: X — Hedef Ürün: Y — Puan: Z
Hafta 3: ...
Hafta 4: ...
```

## Özel Araştırma Komutları

### Vitamin/İçerik Bazlı Araştırma
Belirli bir vitamin/mineral/bileşen için derinlemesine araştırma:
- "Collageen supplement" → trendler, rakipler, SSS
- "Probiotica stemming" → bilimsel makaleler, kullanıcı soruları
- "Omega-3 kinderen" → hedef kitle, arama hacmi

### Mevsimsel Fırsatlar
- **Ocak:** Detox, yeni yıl kararları, kilo verme
- **Mart-Nisan:** Allergie, bağışıklık
- **Haziran-Ağustos:** Enerji, yaz formu, cilt
- **Eylül-Ekim:** Okul, çocuklar, bağışıklık
- **Kasım-Aralık:** Stres, uyku, hediye paketleri

## Çıktı Formatı
1. **Durum Özeti:** Kaç ürün, kaç makale, hangi kategoriler boş
2. **Boşluk Analizi Tablosu:** Yukarıdaki matris
3. **Öncelikli 5 Makale Fikri:** Puanlarıyla birlikte
4. **Aksiyon Önerisi:** "Şimdi şu skill'i çalıştır: `/blog-writer [konu]`"

## Kural
- Araştırma HER ZAMAN güncel verilerle yapılır (Google Trends, rakip siteleri taranır)
- Önerilen makale başlıkları Hollandaca olur
- Her öneri, bir Amare ürününe doğal şekilde bağlanır
- Tıbbi iddia içeren öneriler elenir
