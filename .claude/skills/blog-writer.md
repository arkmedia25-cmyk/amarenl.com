---
name: blog-writer
description: SEO uyumlu Hollandaca blog makalesi üretir ve MDX formatında content/blog/ klasörüne kaydeder.
---

# Blog Makale Üretici

Bu skill, AmareNL için SEO/GEO uyumlu, Hollandaca blog makaleleri üretir ve MDX formatında kaydeder.

## Zorunlu Okuma
İşe başlamadan önce şu dosyaları oku:
1. `lib/products.ts` — ürün veritabanı (isimler, faydalar, içerikler, affiliate ID'ler)
2. `CLAUDE.md` — blog kuralları (bölüm 8), marka sesi, yasaklı ifadeler
3. `keywords-ads.md` — hedef anahtar kelimeler
4. `content/blog/` — mevcut makaleler (tekrar yazma!)

## Makale Üretim Akışı

### 1. Konuyu Belirle
- Kullanıcı bir konu verdiyse onu kullan
- Vermediyse `keywords-ads.md`'deki ilk boş konuyu seç
- Veya ürün bazlı: bir ürün seç ve faydalarına odaklan

### 2. Makaleyi Yaz
Hedef: **1.200 – 1.800 kelime**, en az 800.

Bu formata SIKI SIKIYA uy:

```mdx
---
title: "[Başlık — max 60 karakter, Hollandaca]"
date: "[YYYY-MM-DD]"
category: "[hersenen | darmen | gewichtsbeheer | schoonheid | essentials | kids | lifestyle]"
tags: ["tag1", "tag2", "tag3"]
metaDescription: "[Max 155 karakter Hollandaca]"
slug: "[benzersiz-url-slug]"
affiliateCta: true
schema: "Article"
excerpt: "[1-2 cümle özet]"
author: "AmareNL Redactie"
image: "/images/blog/[slug]-cover.jpg"
---

## Wat is [X] en waarom is het belangrijk?

[150-200 kelime giriş — ana anahtar kelime ilk 100 kelimede geçsin]

## [H2 ikinci bölüm]

[200-300 kelime]

## [H2 üçüncü bölüm]

[200-300 kelime]

## Veelgestelde vragen

**Vraag 1?**
[40-60 kelime cevap]

**Vraag 2?**
[40-60 kelime cevap]

**Vraag 3?**
[40-60 kelime cevap]

<AffiliateCTA label="Bekijk [ürün adı] bij Amare →" product="[product-id]" />

## Conclusie

[Kısa özet + yumuşak tavsiye]
```

### 3. Kaydet
- Dosya yolu: `content/blog/[slug].mdx`
- Mevcut slug'larla çakışmadığından emin ol

### 4. Kalite Kontrol
- [ ] Min. 800 kelime
- [ ] Meta title max 60 karakter
- [ ] Meta description max 155 karakter
- [ ] FAQ bölümü var (en az 3 soru)
- [ ] Affiliate CTA doğru product ID ile eklenmiş
- [ ] "geneest", "behandelt", "klinisch bewezen" ifadeleri YOK
- [ ] "ondersteunt", "draagt bij aan" gibi yumuşak ifadeler var
- [ ] Sağlık disclaimeri: "Deze uitspraken zijn niet beoordeeld door de NVWA"

## Yasaklı İfadeler (KESİNLİKLE KULLANMA)
- ❌ Geneest / behandelt / klinisch bewezen te genezen
- ❌ Absolute medische garanties
- ❌ İngilizce terimler (Hollandaca alternatifi varsa)

## Zorunlu İfadeler
- ✅ "ondersteunt een gezond..."
- ✅ "draagt bij aan..."
- ✅ "veel gebruikers ervaren..."
- ✅ "* Deze uitspraken zijn niet beoordeeld door de NVWA"
