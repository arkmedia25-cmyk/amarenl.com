# Skill: Responsive Layout Generator

Bu yetenek, mobil-öncelikli (mobile-first) prensibiyle, farklı ekran boyutlarına (Mobile, Tablet, Desktop) tam uyumlu Tailwind CSS düzenleri oluşturmak için kullanılır.

## Kullanım formatı:
`/responsive "[düzen açıklaması]"`

## Kontrol Listesi:

1. **Mobile-First Yaklaşımı:**
   - Önce en küçük ekranlar için stil yaz (`w-full` gibi).
   - `md:`, `lg:`, `xl:` gibi breakpointler ile kademeli olarak genişlet.

2. **Esnek Izgara (Grid) & Flexbox:**
   - Mobilde tek sütun, tablette 2 sütun, masaüstünde 3 veya 4 sütun geçişleri.
   - `gap` ve `padding` değerlerinin ekran boyutuna göre ölçeklenmesi.

3. **Navigasyon ve Yan Menüler:**
   - Mobilde "hamburger menü" veya alt bar, masaüstünde yan menü (sidebar) veya üst navigasyon.
   - `sticky`, `fixed` ve `absolute` konumlandırmaların responsive yönetimi.

4. **İçerik Gizleme/Gösterme:**
   - Mobilde gereksiz öğeleri `hidden` ile gizleme, masaüstünde `block/flex` ile gösterme.

## Çıktı Formatı:
- Tam Tailwind CSS sınıflarını içeren HTML/JSX kodu.
- Breakpoint geçişlerini açıklayan kısa notlar.
