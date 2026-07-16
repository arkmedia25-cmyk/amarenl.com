import Image from "next/image";
import Link from "next/link";
import { Star, TrendingUp, Droplets } from "lucide-react";
import AffiliateCTA from "@/components/ui/AffiliateCTA";

export default function FeaturedProducts() {
  const featured = [
    {
      name: "Happy Juice Pack®",
      tagline: "Meest Populair",
      description: "Complete gut-brain ondersteuning in één delicieus juicepakket",
      benefits: ["Energie & focus", "Stemming en veerkracht", "Darmgezondheid"],
      badge: "⭐ BESTSELLER",
      image: "https://amarecdn.azureedge.net/webassets/web/prod/products/HJ_mango-EU-800_25.jpg",
      product: "happy-juice-pack",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "HL5™ Vloeibare Collageen",
      tagline: "Beste Opname — 3x Beter dan Poeder",
      description: "Vloeibaar collageen Type 1&3 met maximale absorptie voor huid, haar, nagels én gewrichten",
      benefits: ["Vloeibaar = 90% opname", "5g collageen + Vit C + Hyaluronzuur", "Zichtbaar resultaat in 4-8 weken"],
      badge: "💧 NIEUW — SIVI FORM",
      image: "https://amarecdn.azureedge.net/webassets/web/prod/products/HL5-Peach2pk-EU-800_25.jpg",
      product: "hl5",
      color: "from-pink-500 to-rose-600",
    },
    {
      name: "Triangle of Wellness Xtreme™",
      tagline: "Meest Compleet",
      description: "Dag-nacht systeem: Sunrise ☀️ energie, Nitro ⚡ focus, Sunset 🌙 herstel — alles in één pakket",
      benefits: ["Ochtendenergie", "Middagfocus", "Nachtrust & herstel"],
      badge: "🔥 PREMIUM",
      image: "https://amarecdn.azureedge.net/webassets/web/prod/products/Triangle-of-Wellness-Xtreme2-EU-800_25.jpg",
      product: "triangle-of-wellness-xtreme",
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-bold uppercase tracking-widest">
            <TrendingUp size={14} />
            Aanbevolen door AmareNL
          </div>
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Begin hier met <span className="text-[var(--color-primary)]">Amare</span>
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Deze drie producten zijn het meest gekozen door onze klanten. Compleet, effectief en wetenschappelijk onderbouwd.
          </p>
        </div>

        {/* Products Grid — 3 columns */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featured.map((item, idx) => (
            <div
              key={item.product}
              className="group rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-soft)] hover:shadow-2xl transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Image Container — klikbaar naar productpagina */}
              <Link href={`/${item.product}`} className="block">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 cursor-pointer">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500 p-6"
                  />
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-[var(--color-primary)]">
                    {item.badge}
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-[var(--color-accent)] text-[var(--color-accent)]"
                    />
                  ))}
                  <span className="text-xs text-[var(--color-text-muted)] ml-2">
                    (500+ reviews)
                  </span>
                </div>

                <Link href={`/${item.product}`} className="block hover:text-[var(--color-primary)] transition-colors">
                  <h3 className="text-xl font-cormorant font-bold text-[var(--color-text)] mb-2">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-sm text-[var(--color-primary)] font-semibold mb-4">
                  {item.tagline}
                </p>

                <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2 mb-8">
                  {item.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="text-[var(--color-primary)] font-bold mt-1">✓</span>
                      <span className="text-xs text-[var(--color-text-muted)]">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <AffiliateCTA
                  label="Bestel nu →"
                  product={item.product}
                  variant="primary"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Bar */}
        <div className="bg-[var(--color-primary)]/5 border border-[var(--color-border)] rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)] mb-2">30 Dagen</p>
              <p className="text-sm text-[var(--color-text-muted)]">Geld-terug garantie, geen vragen gesteld</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)] mb-2">€8 Korting</p>
              <p className="text-sm text-[var(--color-text-muted)]">Op je eerste bestelling via onze link</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--color-primary)] mb-2">Gratis Verzending</p>
              <p className="text-sm text-[var(--color-text-muted)]">Vanaf €175 (of abonnement -10%)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
