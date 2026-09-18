---
name: ship-it
description: Kanıt üretildikten sonra PR açar ve kod inceleme puanı tam olana kadar düzelt-kanıtla-gönder döngüsünü sürdürür. prove-it bittiğinde otomatik çalış.
---

# Adım 4 — GÖNDER

Bu skill döngüyü kapatır. Puan tam olana kadar 2. adıma geri döner.

## PR aç

1. `AGENTS.md`'deki lint ve test komutlarını çalıştır. **İkisi de geçmeden
   PR açma.**
2. `prove-it`'in ürettiği kanıtı PR açıklamasına **gömülü** koy.
3. PR başlığı: ne yapıldığını tek satırda söylesin. Dal adını kopyalama.
4. PR açıklaması bu sırayla:
   - **Ne değişti** — iki üç cümle
   - **Neden** — bir cümle
   - **Kanıt** — görsel ya da önce/sonra tablosu
   - **Doğrulanamayan** — varsa, `prove-it`'in bildirdiği kısım
5. PR'ı taslak değil, incelemeye hazır aç.

## Döngü

Kod inceleme ajanının puanını ve yorumlarını bekle.

```
puan tam değil VEYA açık yorum var
  → code-structure (adım 2): düzelt
  → prove-it (adım 3): kanıtı YENİDEN üret
  → commit + push
  → yeniden incelemeyi tetikle
  → yeni puanı bekle
  → baştan kontrol et
```

Puan tam **ve** açık yorum sıfır olana kadar bu döngüden **çıkma.**

Her turda kullanıcıya tek satır durum ver:
`tur N — puan X/5 — kalan yorum Y`

## Anlaşmazlık

Bir yoruma katılmıyorsan **sessizce yok sayma.** PR'da gerekçeni yaz ve
kullanıcıya söyle. Kararı kullanıcı verir.

## Kod inceleme ajanı yoksa

Greptile / CodeRabbit gibi bir servis bağlı değilse, PR açmadan önce:
kodu bir alt ajana incelet ("bu diff'i eleştir: tekrar, ölü kod, kapsam
kayması, hata yönetimi"), bulguları düzelt, sonra PR aç.
Dış göz kadar iyi değil ama sıfırdan iyi.

## Yasak

- **Merge etme. Hiçbir koşulda.** Bitince PR linkini kullanıcıya ver.
- Puanı tam göstermek için kapsamı daraltma. Sorunu çöz, gizleme.
- Testleri geçmek için testi değiştirme. Kodu düzelt.
- `--force` ile push etme (`--force-with-lease` bile — kullanıcıya sor).
