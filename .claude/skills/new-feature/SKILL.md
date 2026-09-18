---
name: new-feature
description: Yeni bir özellik, hata düzeltmesi veya refactor işine başlarken izole bir worktree kurar ve ortamı hazırlar. Kullanıcı yeni bir iş tanımladığında otomatik çalış.
---

# Adım 1 — İZOLE ET

Bu skill her yeni işin ilk adımıdır. Amaç: bu iş, başka hiçbir işin dosyasına
dokunmadan kendi kopyasında yürüsün.

## Önce kontrol et

Zaten bir worktree içindeysen **yeni bir tane açma.** Mevcut olanda devam et.
Kontrol: çalışma dizinin `.claude/worktrees/` altında mı?

## Worktree aç

```
claude --worktree <kısa-ad>
```

Ad kuralı: kısa, tireli, işi anlatan. Türkçe karakter kullanma.
İyi: `odeme-sayfasi`, `api-hiz`, `mail-sablonu`
Kötü: `yeni-ozellik`, `duzeltme`, `test2`

Bu komut şunları yapar:
- `.claude/worktrees/<kısa-ad>/` altında izole bir checkout açar
- `worktree-<kısa-ad>` adında yeni bir dal oluşturur
- Uzaktaki ana daldan (genelde `main`) dallanır — temiz zemin
- Claude'u o dizinde başlatır

## Ortamı hazırla

Worktree taze bir checkout. Bağımlılıklar kurulu değil.

1. Repo kökündeki paket yöneticisini tespit et (lock dosyasına bak:
   `package-lock.json` → npm, `pnpm-lock.yaml` → pnpm, `bun.lockb` → bun,
   `yarn.lock` → yarn). `AGENTS.md`'de yazıyorsa onu kullan, arama.
2. Kurulum komutunu çalıştır.
3. Proje kökünde `.worktreeinclude` yoksa oluştur, içine `.env` ve `.env.local` yaz.
4. `.gitignore`'da `.claude/worktrees/` yoksa ekle.

## Kurallar

- Ana checkout'ta (main) **ASLA** dosya düzenleme. Claude Code bunu zaten
  engelliyor; sen de deneme.
- Başka bir worktree'nin dosyalarına dokunma.
- Worktree'yi sen silme. Oturumdan çıkarken Claude Code soracak.
- `-p` ile headless çalışıyorsan temizlik yapılmaz; işin bitince
  `git worktree remove <yol>` gerekir. Bunu kullanıcıya hatırlat.

## Bittiğinde

Worktree hazır ve bağımlılıklar kurulu olduğunda `code-structure` skill'ine geç.
