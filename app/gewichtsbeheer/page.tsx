import CategoryLanding from "@/components/sections/CategoryLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gewichtsbeheer Supplementen — Metabolisme & Vitaliteit | AmareNL",
  description:
    "Ondersteun je metabolisme en gewichtsbeheer met Amare supplementen. GBX Fit, Origin, FIT20 en meer — wetenschappelijk onderbouwd, 100% natuurlijk.",
};

const category = {
  slug: "gewichtsbeheer",
  title: "Gewichtsbeheer & Metabolisme",
  subtitle: "Supplementen voor een actief metabolisme & vitaliteit",
  description:
    "Ondersteun je lichaam op een natuurlijke manier. Onze producten voor gewichtsbeheer combineren eiwitten, metabolisme-ondersteuning en dagelijkse essentials voor een gebalanceerde levensstijl.",
};

export default function GewichtsbeheerPage() {
  return <CategoryLanding category={category} categorySlug="essentials" />;
}
