"use client";

import Image from "next/image";
import Link from "next/link";
import { products, getAffiliateUrl, getProductPageUrl, type Product } from "@/lib/products";
import { storeAffiliateVisit } from "@/lib/affiliate";

/**
 * Bepaal de juiste link voor een product:
 * - Alle 43 producten hebben nu een interne pagina
 * - Deep pages (16x) → /[slug], overige (27x) → /producten/[slug]
 */
function getProductHref(product: Product): {
  href: string;
  isExternal: boolean;
} {
  const internalUrl = getProductPageUrl(product.id);
  if (internalUrl) {
    return { href: internalUrl, isExternal: false };
  }
  return { href: getAffiliateUrl(product.id), isExternal: true };
}
import TrustBar from "./TrustBar";
import GuaranteeBlock from "./GuaranteeBlock";
import FAQSection from "./FAQSection";

interface CategoryData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
}

interface Props {
  category: CategoryData;
  categorySlug: string;
}

export default function CategoryLanding({ category, categorySlug }: Props) {
  const categoryProducts = products
    .filter((p) => p.category === categorySlug)
    .sort((a, b) => a.priority - b.priority);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-[var(--color-bg-soft)] py-16 md:py-24 border-b border-[var(--color-border)]">
        <div className="container-page text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
            {category.title}
          </h1>
          <p className="text-sm md:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-xl mx-auto">
            {category.description}
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Products Grid */}
      <section className="py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] text-center mb-10">
            {category.subtitle}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {categoryProducts.map((product) => {
              const { href, isExternal } = getProductHref(product);

              const cardContent = (
                <>
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[var(--color-bg-soft)]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.isBestseller && (
                      <div className="absolute top-2 left-2 bg-[var(--color-primary)] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Best
                      </div>
                    )}
                    {product.isNew && (
                      <div className="absolute top-2 right-2 bg-[var(--color-accent)] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Nieuw
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-[var(--color-text)] mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-[var(--color-text-muted)] line-clamp-1 mb-3">
                      {product.taglineNL}
                    </p>
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <span className="text-[8px] uppercase text-[var(--color-text-muted)]">Abonnee</span>
                        <span className="block text-sm font-bold text-[var(--color-primary)]">€{product.priceSubscription.toFixed(2)}</span>
                      </div>
                      <span className="text-[10px] text-[var(--color-text-muted)] opacity-50">€{product.priceRetail.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-center text-[10px] font-bold group-hover:opacity-90 transition-all">
                    {isExternal ? "Bestel bij Amare →" : "Bekijk product →"}
                  </div>
                </>
              );

              if (isExternal) {
                return (
                  <a
                    key={product.id}
                    href={href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    onClick={storeAffiliateVisit}
                    className="group bg-white rounded-3xl border border-[var(--color-border)] p-4 hover:shadow-xl transition-all duration-500 flex flex-col w-full"
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <Link
                  key={product.id}
                  href={href}
                  className="group bg-white rounded-3xl border border-[var(--color-border)] p-4 hover:shadow-xl transition-all duration-500 flex flex-col w-full"
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <GuaranteeBlock />

      {/* FAQ */}
      <FAQSection />
    </div>
  );
}
