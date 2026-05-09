# Skill: JSDoc Documentation Generator

Bu yetenek, projedeki fonksiyonlara ve sınıflara standart JSDoc formatında dokümantasyon eklemek için kullanılır.

## Kullanım formatı:
`/jsdoc [dizin veya dosya yolu]`

## Kurallar:
1. **Standart Format:** `@param`, `@returns`, `@description` etiketlerini mutlaka kullan.
2. **TypeScript Uyumu:** Eğer fonksiyon TypeScript tiplerine sahipse, JSDoc içerisinde bu tipleri tekrar belirtmek yerine açıklamalara odaklan (ancak istenirse tipler de eklenebilir).
3. **Anlamlı Açıklamalar:** Sadece "bu bir fonksiyondur" gibi yüzeysel açıklamalar yerine, fonksiyonun amacını, yan etkilerini (side effects) ve varsa kısıtlamalarını belirt.
4. **Karmaşık Tipler:** Eğer fonksiyon bir Interface veya Type alıyorsa, JSDoc içerisinde bu tipin neyi temsil ettiğini kısaca açıkla.

## Çıktı Formatı:
- Mevcut fonksiyonun JSDoc eklenmiş güncel hali.
- Varsa kod içerisindeki belirsiz noktalar için uyarılar.
