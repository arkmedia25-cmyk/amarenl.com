import HeroSection from "@/components/sections/HeroSection";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import PromoCarousel from "@/components/sections/PromoCarousel";
import TrustBar from "@/components/sections/TrustBar";
import GuaranteeBlock from "@/components/sections/GuaranteeBlock";
import ProductGrid from "@/components/sections/ProductGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";
import FAQSection from "@/components/sections/FAQSection";
import NewsletterForm from "@/components/sections/NewsletterForm";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const symptoms = [
  { q: "😴 Altijd moe?", a: "Ontdek natuurlijke energieboosters", href: "/blogs/nieuws/supplementen-voor-meer-energie-dit-werkt-echt" },
  { q: "😰 Veel stress?", a: "Adaptogenen & ontspanning", href: "/blogs/nieuws/supplementen-stress-burn-out-wat-helpt-echt" },
  { q: "🫃 Opgeblazen buik?", a: "Probiotica & spijsvertering", href: "/darmgezondheid" },
  { q: "💇 Dunner wordend haar?", a: "Collageen van binnenuit", href: "/hl5" },
  { q: "🧠 Snel afgeleid?", a: "Natuurlijke focus supplementen", href: "/edge-plus" },
  { q: "🌙 Slecht slapen?", a: "Melatoninevrije slaapformule", href: "/blogs/nieuws/beter-slapen-zonder-medicatie-supplementen-nachtrust" },
];

const popular = [
  { title: "Magnesium: Het Meest Onderschatte Mineraal", href: "/blogs/nieuws/magnesium-supplement-kopen-welke-vorm-nodig" },
  { title: "Supplementen voor Meer Energie — Dit Werkt Écht", href: "/blogs/nieuws/supplementen-voor-meer-energie-dit-werkt-echt" },
  { title: "De Gut-Brain Connectie: Darmen & Stemming", href: "/blogs/nieuws/gut-brain-connectie-darmen-stemming-mentaal" },
  { title: "Vitamine B12 Tekort: Symptomen & Oplossing", href: "/blogs/nieuws/vitamine-b12-tekort-symptomen-supplement" },
  { title: "Supplementen bij Stress & Burn-out", href: "/blogs/nieuws/supplementen-stress-burn-out-wat-helpt-echt" },
  { title: "Collageen voor Stralende Huid & Sterk Haar", href: "/blogs/nieuws/beste-supplementen-haar-nagels-werkt-echt" },
];

export default function Home() {
  return (
    <>
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: "Home", url: "https://amarenl.com" }])} id="home-breadcrumb" />
      <HeroSection />
      <FeaturedProducts />
      <PromoCarousel />
      <TrustBar />

      {/* Symptoom Wijzer */}
      <section className="py-12 bg-white">
        <div className="container-page max-w-4xl">
          <h2 className="text-xl md:text-2xl font-cormorant font-bold text-[var(--color-text)] mb-2 text-center">
            Wat speelt er bij jou?
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6 text-center">Klik op je klacht en ontdek wat je eraan kunt doen</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {symptoms.map((s) => (
              <Link key={s.q} href={s.href} className="bg-[var(--color-bg-soft)] rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all text-center group">
                <p className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">{s.q}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{s.a}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GuaranteeBlock />
      <ProductGrid />
      <HowItWorks />

      {/* Meest Gelezen */}
      <section className="py-12 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-xl md:text-2xl font-cormorant font-bold text-[var(--color-text)] mb-6 text-center">
            📚 Meest Gelezen Artikelen
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {popular.map((a, i) => (
              <Link key={i} href={a.href} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all group">
                <span className="text-2xl font-bold text-[var(--color-primary)]/20 group-hover:text-[var(--color-primary)]/40 transition-colors">{i + 1}</span>
                <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">{a.title}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/blogs/nieuws" className="text-sm font-bold text-[var(--color-primary)] hover:underline">Bekijk alle artikelen →</Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <BlogPreview />
      <FAQSection />
      <NewsletterForm />
    </>
  );
}
