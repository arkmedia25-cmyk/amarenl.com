import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Darmgezondheid Supplementen — Probiotica, Enzymen & Superfoods | AmareNL",
  description: "Ondersteun je darmflora met Amare's probiotica, spijsverteringsenzymen en superfoods. MentaBiotics, Restore, SeedFiber — wetenschappelijk onderbouwd.",
  alternates: { canonical: "/darmgezondheid" },
  openGraph: { title: "Darmgezondheid Supplementen | AmareNL", description: "Probiotica, enzymen & superfoods voor een gezonde darmflora.", url: "/darmgezondheid", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
};

export default function DarmgezondheidPage() {
  return (<>
    <SchemaMarkup schema={generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Darmgezondheid", url: "/darmgezondheid" }])} id="darmen-breadcrumb" />
    <CategoryLanding category={{ slug: "darmgezondheid", title: "Darmen & Digestie", subtitle: "Probiotica, enzymen & superfoods", description: "Een gezonde darmflora is de basis van je welzijn. Ontdek Amare's darmondersteunende supplementen — van probiotica tot spijsverteringsenzymen." }} categorySlug="darmen" />
  </>);
}
