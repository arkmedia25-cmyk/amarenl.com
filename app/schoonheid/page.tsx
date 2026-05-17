import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schoonheid & Verzorging — Huid, Haar & Collageen | AmareNL",
  description:
    "Ontdek Amare schoonheidsproducten: HL5 collageen, Skin to Mind huidverzorging, Rootist haarverzorging en meer. Wetenschappelijk onderbouwd, natuurlijke ingrediënten.",
};

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
