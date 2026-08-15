# Hermes — Çalışma Kuralları (ZORUNLU)

> Bu dosya Hermes gateway/bot bu repoya tekrar bağlanırsa okunmalı ve uyulmalıdır.

## Kural 0 — Her işlemden ÖNCE README.md oku (istisnasız)

Bu repoda (`amarenl.com`) herhangi bir işlem yapmadan — dosya okumadan/yazmadan, Telegram'a
mesaj göndermeden, bir script çalıştırmadan **önce** her seferinde önce kök dizindeki
`README.md`'yi oku. O dosya güncel proje durumunu, aktif otomasyon pipeline'larını ve neyin
zaten yapılmış/yapılıyor olduğunu içerir. README'de anlatılan akışın **dışında** farklı bir
işlem yapma — README neyi, hangi sistemle, hangi onay mekanizmasıyla yapılacağını söylüyorsa
Hermes ona uyar, kendi başına alternatif bir yol icat etmez. Bu kural diğer tüm kuralların
önkoşuludur; README okunmadan aşağıdaki kurallar da doğru uygulanamaz çünkü "kapsam" ve
"mevcut pipeline" tanımı README'den geliyor.
> Yazılma sebebi: 2026-07-21'de "humanize" commit'i `data/extra-articles.json`'ı
> 57 makaleden 4'e düşürdü, 51 endekslenmiş sayfa 2 gün 404 verdi (bkz. `DEPLOY_LOG.md`
> kayıt #35) — ve ayrıca bu repodan bağımsız, habersiz çalışan bir kopya (Hermes gateway
> LaunchAgent, `AmareNL_Orchestrator_Bot`) uzun süre resmi pipeline ile aynı anda içerik
> yayınladı (bkz. `CLAUDE.md` sectie 19-20, "durduruldu 28-07-2026" olarak not edilmişti — ama
> 15-08-2026'da `launchctl list` ile kontrol edilince `ai.hermes.gateway-amarenl` LaunchAgent'ının
> hâlâ çalıştığı görüldü, ~5 gündür kesintisiz; muhtemelen 28-07'de process öldürüldü ama
> LaunchAgent `KeepAlive`/`RunAtLoad` ile kendini yeniden başlattı. Bu tarihte incelenen tek cron
> görevi (`353c91b3a2f3`, günlük makale) zararsız çıktı — repoya hiç yazmıyor, ayrı bir proje
> klasöründen (`~/projects/worldcup-shorts/social-media/artikelen`) statik metin okuyup sadece
> Telegram'a gönderiyor — ama gateway'in kendisi genel amaçlı bir AI ajanı olduğu için, sohbet
> üzerinden doğal dille "yayınla" gibi bir talimat verilirse ne yapacağı garanti değil. Detay:
> `.hermes/LOGBOOK.md` 15-08-2026 girdisi.) Bu iki olay, sitenin
aylardır süren trafik/ranking düşüşünün bilinen en olası nedenleridir.

## Kural 1 — Kapsam dışına çıkma

Hermes yalnızca kendisine **açıkça verilen görev/plan** kapsamında işlem yapar
(`.hermes/plans/` altındaki onaylı plan dosyaları). Plan dışında:
- `data/extra-articles.json`, `data/products*.json` gibi canlı içerik dosyalarını
  **doğrudan değiştirmez veya kısaltmaz** (truncate/overwrite yasak — sadece ekleme).
- `main` branch'ine **doğrudan commit/push yapmaz** — her değişiklik bir PR olarak açılır,
  insan onayı bekler (bu reponun genel kuralı, `CLAUDE.md` sectie 20'deki Telegram-onaygate
  ile aynı prensip).
- Aynı anda başka bir otomasyon sistemiyle (bu repodaki GitHub Actions pipeline'ı dahil)
  **çakışan/paralel yayın yapmaz** — önce mevcut pipeline'ın çalışıp çalışmadığını kontrol et.

## Kural 2 — Her işlem loglanır

Kapsam içi olsun olmasın, Hermes'in yaptığı **her işlem** `.hermes/LOGBOOK.md`'ye eklenir
(silme değil, sadece ekleme — dosyanın başına en yeni girdi). Log formatı:

```
## YYYY-MM-DD HH:MM — [kısa başlık]
- Ne yapıldı: ...
- Hangi dosyalar/branch'ler etkilendi: ...
- Plan kapsamında mıydı: evet/hayır (hayırsa neden yapıldığını açıkla)
- Sonuç: başarılı/başarısız, doğrulama nasıl yapıldı
```

## Kural 3 — Belirsizlikte dur, sorma değil doğrudan hareket etme

Bir görev plan dosyasında net değilse veya kapsamı aşıyorsa, Hermes işlemi **yapmaz**,
`.hermes/LOGBOOK.md`'ye "beklemede" olarak not düşer ve insan onayı bekler. Tahmin ederek
devam etmek, önceki incident'lerin (57→4 truncation, paralel yayın) tam olarak nedeniydi.
