import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schoonheid & Verzorging — Huid, Haar & Collageen | AmareNL",
  description:
    "Ontdek Amare schoonheidsproducten: HL5 collageen, Skin to Mind huidverzorging, Rootist haarverzorging en meer. Wetenschappelijk onderbouwd, natuurlijke ingrediënten.",
  alternates: { canonical: "/schoonheid" },
  openGraph: {
    title: "Schoonheid & Verzorging — Huid, Haar & Collageen | AmareNL",
    description: "Ontdek Amare schoonheidsproducten: HL5 collageen, Skin to Mind, Rootist en meer.",
    url: "/schoonheid",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schoonheid & Verzorging — Huid, Haar & Collageen | AmareNL",
    description: "Ontdek Amare schoonheidsproducten: HL5 collageen, Skin to Mind, Rootist en meer.",
    images: ["/images/og-default.jpg"],
  },
}

const category = {
  slug: "schoonheid",
  title: "Schoonheid & Verzorging",
  subtitle: "Huid, haar & nagels van binnenuit verzorgd",
  description:
    "Collageen, huidverzorging en haarproducten die wetenschap combineren met natuurlijke ingrediënten. Voor een stralende huid, sterk haar en gezonde nagels.",
};

export default function SchoonheidPage() {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Schoonheid", url: "/schoonheid" },
        ])}
        id="schoonheid-breadcrumb"
      />
      <CategoryLanding category={category} categorySlug="schoonheid" />
    </>
  );
}
