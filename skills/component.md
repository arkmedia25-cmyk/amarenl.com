# Skill: Component Generator

Bu yetenek, verilen açıklamalara uygun, modern ve responsive UI bileşenleri üretmek için kullanılır.

## Kullanım formatı:
`/component "[bileşen açıklaması]"`

## Kurallar:
1. **Teknoloji:** Tailwind CSS ve TypeScript (React) kullanın.
2. **Tasarım Sistemi:** Projenin `globals.css` dosyasındaki CSS değişkenlerini (`--color-primary`, `--color-accent` vb.) kullanın.
3. **Responsive:** Mobil öncelikli (mobile-first) tasarım yapın.
4. **Erişilebilirlik:** `aria-label`, `alt` etiketleri gibi erişilebilirlik standartlarına uyun.
5. **İkonlar:** Gerektiğinde `lucide-react` kütüphanesini kullanın.
6. **Props:** Bileşen için mutlaka bir TypeScript `interface` tanımlayın.

## Çıktı Formatı:
- Bileşenin kodunu (TSX) tam olarak sunun.
- Gerekli importları en başa ekleyin.
- Bileşenin nasıl kullanılacağına dair kısa bir örnek verin.
