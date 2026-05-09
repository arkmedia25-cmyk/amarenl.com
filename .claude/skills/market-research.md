---
name: market-research
description: Pazar araştırması ve içerik boşluğu analizi yapar. AmareNL için hangi konularda blog yazılması gerektiğini önceliklendirir.
---

# Pazar Araştırması & İçerik Boşluğu Analizi

Bu skill, AmareNL sitesi için SEO odaklı içerik stratejisi oluşturur.

## Görev

1. **Mevcut ürünleri tara:** `lib/products.ts` dosyasındaki TÜM ürünleri oku. Her ürünün `benefitsNL`, `taglineNL`, `descriptionNL`, `usageNL` alanlarındaki vitamin/mineral/bileşenleri çıkar.

2. **Mevcut makaleleri tara:** `content/blog/` klasöründeki tüm MDX makaleleri listele.

3. **Keywords eşleştirmesi:** `keywords-ads.md` dosyasını oku, hangi konuların henüz yazılmadığını bul.

4. **Boşluk matrisi oluştur:**

| Kategori | Ürün Sayısı | Makale Sayısı | Eksik Konular | Öncelik | Önerilen Başlık |
|----------|------------|---------------|---------------|---------|-----------------|

5. **Her eksik konu için:**
   - Hedef anahtar kelime (Hollandaca)
   - Hangi Amare ürününe bağlanacağı
   - Tahmini SEO potansiyeli (Düşük/Orta/Yüksek)
   - People Also Ask soruları (3 adet Hollandaca)

6. **Öncelik sıralaması yap:**
   - 🔴 Kritik: Ürün var, makale yok, yüksek SEO potansiyeli
   - 🟡 Önemli: Kısmi içerik var, geliştirilebilir
   - 🟢 Düşük: Mevsimsel veya niş konu

7. **Çıktı olarak şunu söyle:** "Şu konuda makale yazmamı ister misin?" diye sor ve en yüksek öncelikli 3 konuyu öner.

## Kurallar
- Araştırmayı HER ZAMAN güncel dosyaları okuyarak yap
- Önerilerini Hollandaca başlıklarla ver
- Her öneriyi bir Amare ürününe bağla
- Tıbbi iddia içeren başlıklardan kaçın
