import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gewichtsbeheer Supplementen — Metabolisme & Vitaliteit | AmareNL",
  description:
    "Ondersteun je metabolisme en gewichtsbeheer met Amare supplementen. GBX Fit, Origin, FIT20 en meer — wetenschappelijk onderbouwd, gemaakt met natuurlijke ingrediënten.",
  alternates: { canonical: "/gewichtsbeheer" },
  openGraph: {
    title: "Gewichtsbeheer Supplementen — Metabolisme & Vitaliteit | AmareNL",
    description: "Ondersteun je metabolisme en gewichtsbeheer met Amare supplementen. Natuurlijke ingrediënten.",
    url: "/gewichtsbeheer",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gewichtsbeheer Supplementen — Metabolisme & Vitaliteit | AmareNL",
    description: "Ondersteun je metabolisme en gewichtsbeheer met Amare supplementen. Natuurlijke ingrediënten.",
    images: ["/images/og-default.jpg"],
  },
}

const category = {
  slug: "gewichtsbeheer",
  title: "Gewichtsbeheer & Metabolisme",
  subtitle: "Supplementen voor een actief metabolisme & vitaliteit",
  description:
    "Ondersteun je lichaam op een natuurlijke manier. Onze producten voor gewichtsbeheer combineren eiwitten, metabolisme-ondersteuning en dagelijkse essentials voor een gebalanceerde levensstijl.",
};

export default function GewichtsbeheerPage() {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Gewichtsbeheer", url: "/gewichtsbeheer" },
        ])}
        id="gewichtsbeheer-breadcrumb"
      />
      <CategoryLanding category={category} categorySlug="essentials" />
    </>
  );
}
