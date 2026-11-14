import Link from "next/link";
import { getArticlesForProduct } from "@/lib/blog";

/**
 * Ürün sayfası → makale ters iç linki.
 *
 * NEDEN (14.11.2026): tıklama getiren sayfalar ürün sayfaları, ama ürün sayfaları
 * hiçbir makaleye link vermiyordu → iç link ağı tek yönlüydü ve yeni makaleler
 * Google'da "unknown to Google" kalıyordu (26 makalenin 25'i).
 *
 * `seed`: ürün adı + kısa açıklama; kelime örtüşmesine göre 3 makale seçilir.
 */
export default function RelatedArticles({
  seed,
  heading = "Lees ook",
  limit = 3,
}: {
  seed: string;
  heading?: string;
  limit?: number;
}) {
  const articles = getArticlesForProduct(seed, limit);
  if (articles.length === 0) return null;

  return (
    <section className="py-12 bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
      <div className="container-page max-w-3xl">
        <h2 className="text-xl md:text-2xl font-cormorant font-bold text-[var(--color-text)] mb-6">
          {heading}
        </h2>
        <ul className="space-y-4">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/blogs/nieuws/${a.slug}`}
                className="text-base font-semibold text-[var(--color-primary)] hover:underline"
              >
                {a.title}
              </Link>
              {a.excerpt && (
                <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {a.excerpt.length > 150 ? `${a.excerpt.slice(0, 150)}…` : a.excerpt}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
