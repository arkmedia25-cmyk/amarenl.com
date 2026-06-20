import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pakketten & Bundels — Beste Waarde Supplement Pakketten | AmareNL",
  description: "Bespaar met Amare's supplement bundels: Happy Juice Pack, Triangle of Wellness, Happy Lifestyle Pack. Voordeliger dan los kopen.",
  alternates: { canonical: "/pakketten" },
  openGraph: { title: "Pakketten & Bundels Supplementen | AmareNL", description: "Beste waarde supplement pakketten — voordeliger dan los kopen.", url: "/pakketten", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
};

export default function PakkettenPage() {
  return (<>
    <SchemaMarkup schema={generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Pakketten & Bundels", url: "/pakketten" }])} id="pakketten-breadcrumb" />
    <CategoryLanding category={{ slug: "pakketten", title: "Pakketten & Bundels", subtitle: "Beste waarde — voordeliger dan los", description: "Onze zorgvuldig samengestelde bundels combineren de populairste producten met flinke korting. Van de Happy Juice Pack tot het complete Triangle of Wellness systeem." }} categorySlug="pakketten" />
  </>);
}
