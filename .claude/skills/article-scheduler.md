---
name: article-scheduler
description: Makale kuyruğundan sıradaki konuyu alır, blog-writer agent'ı çağırır, yayınlar ve kuyruğu günceller. Ma/Wo/Vr 9:57 cron ile otomatik çalışır.
---

# 📅 Article Scheduler Agent — AmareNL

## Görev Tanımı
Bu agent, **Pazartesi / Çarşamba / Cuma 9:57**'de otomatik çalışarak:
1. `content/article-queue.md`'den sıradaki makaleyi alır
2. `blog-writer` skill'ini çağırarak makaleyi yazdırır
3. Makaleyi `lib/blog.ts`'e ekler
4. Kuyruğu günceller (checkbox işaretler)
5. Build doğrulaması yapar

## Cron Tetikleyici
```
cron: 57 9 * * 1,3,5  (Pazartesi, Çarşamba, Cuma sabah 9:57)
```

## Çalışma Adımları

### Adım 1: Zaman Kontrolü
- Bugünün tarihini kontrol et
- `content/article-queue.md`'deki yayın takvimine bak
- Bugüne atanmış makale var mı?
- **Yoksa:** Bugüne en yakın `- [ ]` makaleyi bul

### Adım 2: Kuyruktan Makaleyi Al
1. `content/article-queue.md` dosyasını oku
2. İlk `- [ ]` (yazılmamış) makaleyi bul
3. Şu bilgileri çıkar:
   - Başlık (NL)
   - Slug
   - Kategori
   - Anahtar kelime
   - Hedef ürün(ler)
   - FAQ soruları

### Adım 3: Blog Writer'ı Çağır
Aşağıdaki prompt ile blog-writer agent'ını tetikle:
```
Blog yazma görevi:
- Başlık: [kuyruktaki başlık]
- Slug: [kuyruktaki slug]
- Kategori: [kategori]
- Anahtar Kelime: [keyword]
- Hedef Ürün: [product-id]
- FAQ Soruları: [soru1, soru2, soru3]

Lütfen:
1. lib/products.ts'ten hedef ürün bilgilerini oku
2. Makaleyi HTML formatında yaz (1.200-1.800 kelime)
3. lib/blog.ts'e ekle (BlogPost dizisinin başına)
4. content/blog/[slug].mdx olarak kaydet
5. Kalite kontrolünden geçir
```

### Adım 4: Kuyruğu Güncelle
`content/article-queue.md`'de yazılan makalenin:
- `- [ ]` işaretini `- [x]` olarak değiştir
- Tarih ekle: `- [x] YYYY-MM-DD — [başlık]`

### Adım 5: Doğrulama
```bash
npx next build 2>&1 | tail -5
```
- Build başarılı mı?
- Hata varsa, hataları düzelt ve tekrar dene

### Adım 6: Özet Rapor
```markdown
## 📝 Makale Yayınlandı — [Tarih]

**Başlık:** [X]
**Slug:** [X]
**Kategori:** [X]
**Kelime Sayısı:** X,XXX
**Hedef Anahtar Kelime:** [X]
**Bağlı Ürünler:** [X, Y]

✅ Build: Başarılı
✅ Slug: Benzersiz
✅ Kalite kontrolü: 8/8

⏭ Sıradaki makale: [Bir sonraki başlık] — [Tarih]
```

## Hata Yönetimi
- **Build hatası:** Hatayı logla, düzelt, tekrar dene (max 2 deneme)
- **Slug çakışması:** Slug sonuna `-2` ekle
- **Ürün bulunamadı:** En yakın alternatif ürünü kullan
- **Üst üste 2 hata:** Skill'i durdur, manuel müdahale bildirimi gönder

## Özel Durumlar
- **Hafta sonu:** Makale yazma (cron zaten sadece hafta içi)
- **Tatil günleri:** Normal çalışmaya devam et
- **Kuyruk boşsa:** market-research agent'ını çağır, yeni konular ekle

## Başarı Metrikleri
- Makale başına ortalama kelime: 1.200+
- Build başarı oranı: %95+
- Zamanında yayınlanma: %90+
