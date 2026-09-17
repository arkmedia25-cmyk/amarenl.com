---
name: code-structure
description: Bu repoda kod yazarken uyulacak yapı ve kalite kuralları. Herhangi bir kod yazma, düzenleme veya refactor işinde otomatik çalış.
---

# Adım 2 — İNŞA ET

Bu skill'in amacı: aynı repoda her ajan aynı şekilde yazsın, ve altı ay sonra
o koda dönen kişi anlasın.

## Neden var

Modeller işi **bitirmeye** odaklıdır. Dağınık bitirebiliyorsa dağınık bitirir.
Bu, modelin yetersizliği değil — hedefi "özelliği yap"tı, "temiz yaz" değildi.
Bu dosya o ikinci hedefi veriyor.

## Katmanlar

<!-- AŞAĞISINI KENDİ PROJENE GÖRE DOLDUR. Boş bırakırsan skill işe yaramaz. -->
<!-- İpucu: /init benzeri bir tarama yaptırıp mevcut deseni buraya yazdır. -->

- **Sunum** (`[klasör]`): sadece gösterir. İş mantığı, veri erişimi, hesap YOK.
- **Servis** (`[klasör]`): iş mantığı burada. Framework'e bağımlı olmasın.
- **Veri** (`[klasör]`): veritabanı ve dış servis erişimi. Sadece burada.

Yeni bir dosya yazarken önce hangi katmana ait olduğuna karar ver.
Karar veremiyorsan dosya muhtemelen iki iş yapıyor — böl.

## Kurallar

1. **Tekrar etme.** Aynı mantığı ikinci kez yazmadan önce birincisini bul ve
   ortak bir yere taşı. Aynı isimde iki fonksiyon varsa bu bir hatadır.
2. **Ölü kod bırakma.** Kullanılmayan import, fonksiyon, değişken, dosya —
   sil. "Belki lazım olur" diye bırakma; git'te duruyor.
3. **Dosya boyutu.** Bir dosya [300] satırı geçiyorsa böl.
4. **İsimlendirme.** Bu repodaki mevcut deseni tespit et ve ona uy.
   Yeni bir desen başlatma.
5. **Hata yönetimi.** Bu repoda hatalar nasıl ele alınıyorsa aynısını yap.
   Sessizce yutma; `catch` bloğu boş kalmasın.
6. **Yorum.** Ne yaptığını değil, **neden** yaptığını yaz. Kod ne yaptığını
   zaten söylüyor.

## Kapsam

Sana verilen işi yap. Yolda gördüğün başka bir sorunu **düzeltme** — not al,
PR açıklamasına yaz, kullanıcıya söyle. Kapsam kayması PR incelemesini bozar.

## Her iş sonunda

`AGENTS.md`'deki lint ve test komutlarını çalıştır. İkisi de geçmeden
`prove-it` skill'ine geçme.
