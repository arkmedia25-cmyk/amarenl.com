import type { Metadata } from "next";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import {
  generateProductSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Amare Wellness Essentials — Complete Gezondheid Collectie | AmareNL",
  description:
    "Ontdek de Amare Wellness Essentials collectie. Een zorgvuldig samengestelde bundel voor complete gut-brain ondersteuning. Bestel met korting via AmareNL.",
  alternates: { canonical: "/collections/amare-wellness-essentials-2" },
  openGraph: {
    title: "Amare Wellness Essentials — Complete Gezondheid Collectie | AmareNL",
    description: "Een zorgvuldig samengestelde bundel voor complete gut-brain ondersteuning. Bestel met korting via AmareNL.",
    url: "/collections/amare-wellness-essentials-2",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amare Wellness Essentials — Complete Gezondheid Collectie | AmareNL",
    description: "Een zorgvuldig samengestelde bundel voor complete gut-brain ondersteuning. Bestel met korting via AmareNL.",
    images: ["/images/og-default.jpg"],
  },
}

export default function WellnessEssentials() {
  const schema = combineSchemas(
    generateProductSchema({
      name: "Amare Wellness Essentials",
      nameNL: "Amare Wellness Essentials Collectie",
      description:
        "Een zorgvuldig samengestelde collectie voor complete gut-brain ondersteuning — met FundaMentals Pack, VitaGBX en OmMega.",
      slug: "collections/amare-wellness-essentials-2",
      priceRetail: 299.0,
      priceSubscription: 269.1,
      ratingValue: 4.6,
      ratingCount: 320,
      affiliateUrl: "https://www.amare.com/2075008/nl-nl/wellness-essentials",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Wellness Essentials", url: "/collections/amare-wellness-essentials-2" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={schema} id="wellness-essentials-schema" />
      <div className="container-page py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-cormorant font-bold mb-4">
          Amare Wellness Essentials
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] mb-6">
          Een zorgvuldig samengestelde collectie voor complete gut-brain ondersteuning —
          jouw basis voor optimale gezondheid.
        </p>

        <div className="bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
          <h2 className="text-xl font-cormorant font-bold mb-3">In deze collectie</h2>
          <ul className="space-y-2 text-[var(--color-text)]">
            <li>&#10003; FundaMentals Pack&reg; — Complete gut-brain ondersteuning</li>
            <li>&#10003; VitaGBX&trade; — Multivitamine met 50+ voedingsstoffen</li>
            <li>&#10003; OmMega — Omega-3 voor hart, brein en gewrichten</li>
          </ul>
        </div>

        <AffiliateCTA
          label="Bekijk collectie bij Amare"
          product="mentabiotics"
          variant="primary"
        />

        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
          * Affiliate link — je betaalt hetzelfde bedrag.
          Deze uitspraken zijn niet beoordeeld door de NVWA.
        </p>
      </div>
    </>
  );
}
