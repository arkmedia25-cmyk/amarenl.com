# Skill: Blog Makale Üretici (blog-writer)

Bu yetenek, AmareNL sitesi için SEO/GEO uyumlu, Hollandaca blog makaleleri üreten ve bunları MDX formatında kaydeden içerik üretim asistanıdır.

## Ne Zaman Kullanılır
- `/blog-writer` komutu ile manuel tetiklenir
- Yeni bir blog makalesi gerektiğinde
- keywords-ads.md'deki boşlukları doldurmak için
- Ürün lansmanlarında içerik üretmek için

## Makale Üretim Adımları

### Adım 1: Konu Seçimi ve Araştırma
1. `lib/products.ts` dosyasını oku, tüm ürünleri ve kategorileri tara.
2. `keywords-ads.md` dosyasını oku, henüz yazılmamış konuları bul.
3. `content/blog/` klasöründeki mevcut makaleleri kontrol et, aynı konu tekrar yazılmasın.
4. Şu kriterlere göre bir konu seç:
   - SEO potansiyeli yüksek (keywords-ads.md'de referans varsa öncelikli)
   - Ürünle doğrudan ilişkili (Happy Juice, MentaBiotics, NeuCollagen, Energy+, VitaGBX)
   - Kullanıcının sorduğu sorulara cevap veren

### Adım 2: Arama Trendlerini Kontrol Et
1. Konuyla ilgili Google'da trend olan soruları ara (People Also Ask formatı).
2. Rakip sitelerde aynı konuda neler yazılmış, içerik boşluklarını bul.
3. Konunun Hollandaca arama hacmini değerlendir.

### Adım 3: Makaleyi Yaz (MDX Formatı)
Aşağıdaki şablona SIKI SIKIYA uy:

```mdx
---
title: "[Başlık — max 60 karakter, Hollandaca]"
date: "[YYYY-MM-DD — bugünün tarihi]"
category: "[hersenen | darmen | gewichtsbeheer | schoonheid | essentials | kids | lifestyle]"
tags: ["tag1", "tag2", "tag3"]
metaDescription: "[Max 155 karakter Hollandaca — ana anahtar kelime içermeli]"
slug: "[url-dostu-slug]"
affiliateCta: true
schema: "Article"
excerpt: "[1-2 cümle — blog kartında görünecek kısa özet]"
author: "AmareNL Redactie"
image: "/images/blog/[slug]-cover.jpg"
---

## Wat is [X] en waarom is het belangrijk?

[150-200 kelime giriş — ana anahtar kelime ilk 100 kelime içinde geçmeli. "Wat is..." formatında başla, GEO için önemli.]

## [H2 ikinci bölüm — faydalar, bilimsel açıklama]

[200-300 kelime — ürünle ilişkili faydaları bilimsel ama anlaşılır dille açıkla. PubMed/Voedingscentrum referansı ekle.]

## [H2 üçüncü bölüm — pratik tavsiyeler]

[200-300 kelime — okuyucunun uygulayabileceği pratik ipuçları.]

## Veelgestelde vragen

**Vraag 1?**
[40-60 kelime — net, direkt cevap. AI snippet için optimize edilmiş.]

**Vraag 2?**
[40-60 kelime — net, direkt cevap.]

**Vraag 3?**
[40-60 kelime — net, direkt cevap.]

<AffiliateCTA label="Bekijk [ürün adı] bij Amare →" product="[product-id]" />

## Conclusie

[Kısa özet + yumuşak ürün tavsiyesi. "Overweeg...", "Veel gebruikers ervaren..." gibi yumuşak ifadeler.]
```

### Adım 4: Kalite Kontrol Listesi
- [ ] Makale min. 800 kelime (hedef: 1,200-1,800)
- [ ] Ana anahtar kelime yoğunluğu %1-2
- [ ] H1 başlık Hollandaca ve max 60 karakter
- [ ] Meta description Hollandaca ve max 155 karakter
- [ ] En az 2 dahili link (AmareNL içi sayfalara)
- [ ] FAQ bölümünde en az 3 soru-cevap
- [ ] Affiliate CTA doğru `product` ID'si ile eklenmiş
- [ ] Tıbbi iddia YOK ("geneest", "behandelt", "klinisch bewezen te genezen" gibi ifadeler olmamalı)
- [ ] Yumuşak dil: "ondersteunt", "draagt bij aan", "veel gebruikers ervaren"
- [ ] Sağlık disclaimeri: "Deze uitspraken zijn niet beoordeeld door de NVWA"
- [ ] `content/blog/[slug].mdx` dosyasına kaydedilmiş
- [ ] Slug benzersiz, mevcut makalelerle çakışmıyor

## Önemli Kurallar

### KESİNLİKLE YAPMA
- ❌ "Geneest...", "Behandelt...", "Klinisch bewezen..." gibi tıbbi iddialar
- ❌ İngilizce terimler (Hollandaca alternatifi varsa kullan)
- ❌ Aynı slug'u tekrar kullanma
- ❌ Hardcoded affiliate link (her zaman AffiliateCTA component kullan)
- ❌ 800 kelimeden kısa makale
- ❌ Meta description olmadan makale yayınlama

### MUTLAKA YAP
- ✅ Hollandaca yaz (site dili NL)
- ✅ "Wat is..." formatında açılış (GEO için)
- ✅ Bilimsel referanslar (Voedingscentrum, RIVM, PubMed)
- ✅ FAQ bölümü (AEO için)
- ✅ Affiliate disclosure görünür olsun
- ✅ Cormorant Garamond + Nunito Sans fontları kullanılacak (tailwind prose ile otomatik)

## Örnek Konu Rotasyonu
```
Hafta 1: Gut-brain axis, serotonine, focus — (hersenen)
Hafta 2: Probiotica, prebiotica, microbioom — (darmen)
Hafta 3: QUADbiotic, metabolisme, vetverbranding — (gewichtsbeheer)
Hafta 4: Collageen, hyaluronzuur, huid, haar — (schoonheid)
Hafta 5: Omega-3, vitamines, dagelijkse routine — (essentials)
```

## Çıktı Formatı
1. Seçilen konu ve nedeni (1 cümle)
2. Üretilen makalenin başlığı, slug'ı, meta description'ı
3. Makalenin tam MDX içeriği (dosyaya kaydedilir)
4. Kalite kontrol sonuçları
