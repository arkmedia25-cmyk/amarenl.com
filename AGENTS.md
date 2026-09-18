# Çalışma Akışı

Her yeni özellik ve her hata düzeltmesi bu dört adımdan geçer.
Adımları atlama. Sıra değişmez.

## 1. İZOLE ET
Her iş kendi worktree'sinde başlar. `new-feature` skill'ini kullan.
ASLA main üstünde çalışma.

## 2. İNŞA ET
Kod yazarken `code-structure` skill'ini kullan.

## 3. KANITLA
İş bittiğinde `prove-it` skill'ini kullan.
Kanıt olmadan adım 4'e geçme.

## 4. GÖNDER
PR'ı `ship-it` skill'i ile aç.
Kod inceleme puanı tam değilse ADIM 2'ye dön, düzelt, tekrar kanıtla, tekrar gönder.
Puan tam olana kadar bu döngüden çıkma.
Merge işlemini ASLA sen yapma — PR linkini bana ver, merge'e ben basarım.

## İstisna
Tek dosyadan az ve geri alınabilir bir değişiklikse (yazı düzeltmesi, sabit değer,
yorum satırı) dört adımı atla ve doğrudan yap. Emin değilsen bana sor.

## Proje kuralları
<!-- AŞAĞIYI KENDİ PROJENE GÖRE DOLDUR. Doldurmazsan skill'ler çalışır ama
     komutları her seferinde arar; doldurursan hızlanır. -->
- Paket yöneticisi: [npm / pnpm / bun / yarn]
- Kurulum komutu: [npm install]
- Geliştirme sunucusu: [npm run dev]
- Test komutu: [npm test]
- Lint komutu: [npm run lint]
- Bunları her PR'dan önce çalıştır.
