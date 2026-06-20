import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dagelijkse Essentials — Vitamines, Proteïne & Omega 3 | AmareNL",
  description: "Je dagelijkse basis: Sunrise, Origin, Sunset, Nitro Xtreme. Vitamines, plantaardig eiwit en omega 3 — alles voor je dagelijkse routine.",
  alternates: { canonical: "/essentials" },
  openGraph: { title: "Dagelijkse Essentials Supplementen | AmareNL", description: "Vitamines, proteïne & omega 3 voor je dagelijkse routine.", url: "/essentials", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
};

export default function EssentialsPage() {
  return (<>
    <SchemaMarkup schema={generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Dagelijkse Essentials", url: "/essentials" }])} id="essentials-breadcrumb" />
    <CategoryLanding category={{ slug: "essentials", title: "Dagelijkse Essentials", subtitle: "Vitamines, proteïne & omega 3", description: "De basis van je dagelijkse supplementroutine. Van Sunrise voor je ochtend tot Sunset voor je avond — alles wat je lichaam dagelijks nodig heeft." }} categorySlug="essentials" />
  </>);
}
