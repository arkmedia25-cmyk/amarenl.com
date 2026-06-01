import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentale Fitness Supplementen — Focus, Energie & Stemming | AmareNL",
  description:
    "Ontdek Amare supplementen voor mentale fitness: Happy Juice Pack, MentaBiotics, EDGE+, Energy+ en meer. Wetenschappelijk onderbouwd, gemaakt met natuurlijke ingrediënten.",
  alternates: { canonical: "/supplementen" },
  openGraph: {
    title: "Mentale Fitness Supplementen — Focus, Energie & Stemming | AmareNL",
    description: "Ontdek Amare supplementen voor mentale fitness: Happy Juice Pack, MentaBiotics, EDGE+ en meer.",
    url: "/supplementen",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mentale Fitness Supplementen — Focus, Energie & Stemming | AmareNL",
    description: "Ontdek Amare supplementen voor mentale fitness: Happy Juice Pack, MentaBiotics, EDGE+ en meer.",
    images: ["/images/og-default.jpg"],
  },
}

const category = {
  slug: "supplementen",
  title: "Mentale Fitness",
  subtitle: "Supplementen voor focus, energie & mentale veerkracht",
  description:
    "Optimaliseer je gut-brain connectie met wetenschappelijk onderbouwde supplementen. Voor meer focus, een betere stemming en natuurlijke energie gedurende de dag.",
};

export default function SupplementenPage() {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Mentale Fitness", url: "/supplementen" },
        ])}
        id="supplementen-breadcrumb"
      />
      <CategoryLanding category={category} categorySlug="hersenen" />
    </>
  );
}
