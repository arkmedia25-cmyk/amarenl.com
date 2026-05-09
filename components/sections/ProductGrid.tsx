"use client";

import { useState } from "react";
import Image from "next/image";
import { products, categories, getAffiliateUrl } from "@/lib/products";
import { storeAffiliateVisit } from "@/lib/affiliate";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("alle");

  const filteredProducts =
    activeCategory === "alle"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 bg-white" id="products">
      <div className="container-page">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Onze <span className="text-[var(--color-primary)]">Collectie</span>
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] max-w-xl mx-auto">
            Wetenschappelijk onderbouwde supplementen voor darmen en hersenen.
          </p>
        </div>

        {/* Category Filter */}
        <div className="w-full flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory("alle")}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                activeCategory === "alle"
                  ? "bg-[var(--color-primary)] text-white shadow-lg"
                  : "bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]"
              }`}
            >
              Alle
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  activeCategory === category.slug
                    ? "bg-[var(--color-primary)] text-white shadow-lg"
                    : "bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]"
                }`}
              >
                {category.nameNL}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - Structured for 3-4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <a
              key={product.id}
              href={getAffiliateUrl(product.id)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              onClick={storeAffiliateVisit}
              className="group bg-white rounded-3xl border border-[var(--color-border)] p-4 hover:shadow-xl transition-all duration-500 flex flex-col w-full"
            >
              {/* Product Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[var(--color-bg-soft)]">
                <Image
                  src={product.image}
                  alt={product.nameNL}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                {product.isBestseller && (
                  <div className="absolute top-2 left-2 bg-[var(--color-primary)] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    Best
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute top-2 right-2 bg-[var(--color-accent)] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    Nieuw
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="text-sm font-bold text-[var(--color-text)] mb-1 line-clamp-1">
                  {product.nameNL}
                </h3>
                <p className="text-[10px] text-[var(--color-text-muted)] line-clamp-1 mb-3">
                  {product.taglineNL}
                </p>

                {/* Price */}
                <div className="flex flex-col gap-0.5 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-[var(--color-primary)] font-bold uppercase tracking-tighter">Abonnement</span>
                    <span className="text-sm font-bold text-[var(--color-primary)]">€{product.priceSubscription.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center opacity-40">
                    <span className="text-[8px] uppercase">Eenmalig</span>
                    <span className="text-[10px] font-medium">€{product.priceRetail.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-center text-[10px] font-bold group-hover:opacity-90 shadow-md transition-all">
                Bestel bij Amare →
              </div>
            </a>
          ))}
        </div>

        {/* Trust Badges - Smaller */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-6 opacity-40 grayscale text-[9px] font-bold uppercase tracking-widest">
          <span>iDEAL</span>
          <span className="w-1 h-1 bg-current rounded-full" />
          <span>PostNL</span>
          <span className="w-1 h-1 bg-current rounded-full" />
          <span>30 Dagen Garantie</span>
        </div>
      </div>
    </section>
  );
}
