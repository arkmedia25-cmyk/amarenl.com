---
name: prove-it
description: Bir özellik ya da düzeltme bittiğinde yapılan işin kanıtını üretir — önce/sonra görsel, video ya da ölçüm. PR açmadan önce otomatik çalış.
---

# Adım 3 — KANITLA

Ajan söz veremez. Bu skill'in amacı: yapıldığı **gösterilsin.**

## Kanıt türünü seç

| Değişiklik | Kanıt |
|---|---|
| Ekranda görünüyor | Önce + sonra ekran görüntüsü |
| Bir akış (form, giriş, çok adımlı işlem) | Kısa ekran videosu |
| Görünmüyor (performans, sorgu sayısı, veri, mantık) | **Ölçüm**: önce değeri / sonra değeri |

Emin değilsen: kullanıcı bu değişikliği ekranda görebilir mi? Evetse görsel,
hayırsa ölçüm.

## Nasıl üretilir

1. **"Önce"yi değişiklikten ÖNCE al.** Unuttuysan değişikliği geçici olarak
   `git stash` ile geri al, kanıtı al, `git stash pop` ile geri getir.
2. Uygulamayı yerel çalıştır (`AGENTS.md`'deki geliştirme sunucusu), ilgili
   sayfaya git, görüntüyü al.
3. Görüntüleri repo içinde geçici bir klasöre kaydet (`.proof/`), `.gitignore`'a
   ekle, PR'a **gömülü** olarak yükle, sonra klasörü sil.
4. Ölçümde: aynı koşulda ölç. Önce soğuk, sonra sıcak önbellekle ölçme —
   karşılaştırma anlamsız olur. Ölçüm yöntemini PR'da bir cümleyle yaz.

## Kendini denetle — bu en önemli kısım

"Sonra" kanıtını ürettikten sonra **ona bak.** Özellik gerçekten bitmiş mi?

- Bitmemişse: `code-structure` skill'ine dön, düzelt, kanıtı yeniden üret.
  **Bunu kullanıcıya sormadan yap.**
- Kanıt üretemiyorsan (ortam yok, üçüncü taraf kimlik doğrulaması gerekiyor,
  canlı ödeme akışı): bunu **açıkça söyle.** Hangi kısmın doğrulanamadığını
  yaz ve kullanıcıdan elle doğrulamasını iste. "Çalışıyor" deme.

## Yasak

- Kanıt olmadan PR açma.
- Almadığın bir ekran görüntüsünü almış gibi anlatma.
- Ölçmediğin bir sayıyı yazma.
- Kanıtı "iyi görünsün" diye kırpma ya da seçme. Sorun varsa sorun görünsün.

## Bittiğinde

Kanıt hazır olduğunda `ship-it` skill'ine geç.
