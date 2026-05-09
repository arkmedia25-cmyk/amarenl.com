---
name: article-scheduler
description: Makale kuyruğundan sıradaki konuyu alır, SEO uyumlu Hollandaca blog makalesi yazar ve otomatik yayınlar.
---

# Otomatik Makale Üretici ve Yayınlayıcı

Bu skill, `content/article-queue.md` dosyasındaki sıralı kuyruktan bir sonraki makaleyi alır, yazar ve `lib/blog.ts`'e ekleyerek yayınlar.

## Çalıştırma
- Manuel: `/article-scheduler`
- Otomatik: Cron ile haftada 3 kez (Pazartesi, Çarşamba, Cuma)

## Adım Adım Çalışma

### Adım 1: Kuyruğu Oku
1. `content/article-queue.md` dosyasını oku.
2. İlk `- [ ]` (yazılmamış) makaleyi bul.
3. O satırdaki şu bilgileri al:
   - Başlık (kalın yazılı kısım)
   - Kategori (örn: `darmen`, `hersenen`, `schoonheid`)
   - Hedef ürün (örn: `MentaBiotics`, `Happy Juice Pack`)
   - Anahtar kelimeler (satır sonundaki keyword'ler)

### Adım 2: Ürün Araştırması
1. `lib/products.ts` dosyasını oku.
2. Hedef ürün(ler)in `benefitsNL`, `taglineNL`, `descriptionNL` alanlarını bul.
3. Ürünün gerçek faydalarını, içeriklerini, kullanım şeklini öğren.

### Adım 3: Makaleyi Yaz
Aşağıdaki formata SIKI SIKIYA uy. Hedef: 1,200-1,800 kelime.

Kategoriye göre `category` değeri:
- hersenen → "Mentaal Welzijn"
- darmen → "Gut Health"
- schoonheid → "Beauty"
- essentials → "Wellness"
- kids → "Kids"

Makale içeriği HTML formatında olmalı (blog sistemi `lib/blog.ts` HTML kullanıyor):

```html
<h2>Wat is [X] en waarom is het belangrijk?</h2>
<p>[150-200 kelime giriş — ana anahtar kelime ilk 100 kelimede geçsin]</p>

<h2>[H2 ikinci bölüm]</h2>
<p>[200-300 kelime]</p>
<ul>
  <li><strong>Fayda 1:</strong> açıklama</li>
  <li><strong>Fayda 2:</strong> açıklama</li>
</ul>

<h2>[H2 üçüncü bölüm]</h2>
<p>[200-300 kelime — pratik tavsiyeler]</p>

<h2>Veelgestelde vragen</h2>

<h3>Soru 1?</h3>
<p>[40-60 kelime cevap]</p>

<h3>Soru 2?</h3>
<p>[40-60 kelime cevap]</p>

<h3>Soru 3?</h3>
<p>[40-60 kelime cevap]</p>

<h2>Conclusie</h2>
<p>[Kısa özet + yumuşak ürün tavsiyesi]</p>
<p><em>* Deze uitspraken zijn niet beoordeeld door de NVWA. Supplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.</em></p>
```

### Adım 4: lib/blog.ts'e Ekle
1. `lib/blog.ts` dosyasını oku.
2. `export const blogPosts: BlogPost[] = [` satırını bul.
3. Dizinin EN BAŞINA (ilk eleman olarak) yeni makaleyi ekle:
```typescript
  {
    slug: "[benzersiz-slug]",
    title: "[Başlık]",
    date: "[YYYY-MM-DD — bugünün tarihi]",
    category: "[Kategori]",
    excerpt: "[1-2 cümle özet]",
    content: `[HTML içerik]`,
    image: "/images/blog/[slug]-cover.jpg"
  },
```

### Adım 5: Kuyruğu Güncelle
1. `content/article-queue.md` dosyasında yazdığın makalenin `- [ ]` işaretini `- [x]` olarak değiştir.
2. Satırın başına tarih ekle: `- [x] 2026-05-XX **Başlık** | ...`

### Adım 6: Doğrulama
- [ ] Build başarılı mı? (`npx next build`)
- [ ] Slug benzersiz mi?
- [ ] Min. 800 kelime mi?
- [ ] 3 FAQ sorusu var mı?
- [ ] NVWA disclaimeri var mı?

## Yasaklı İfadeler (KESİNLİKLE)
- ❌ geneest, behandelt, klinisch bewezen te genezen
- ❌ Absolute medische garanties
- ❌ İngilizce cümleler (Hollandaca yaz)

## Zorunlu İfadeler
- ✅ "ondersteunt een gezond..."
- ✅ "draagt bij aan..."
- ✅ "veel gebruikers ervaren..."
- ✅ "* Deze uitspraken zijn niet beoordeeld door de NVWA"
