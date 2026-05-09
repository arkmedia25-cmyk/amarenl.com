import CategoryLanding from "@/components/sections/CategoryLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentale Fitness Supplementen — Focus, Energie & Stemming | AmareNL",
  description:
    "Ontdek Amare supplementen voor mentale fitness: Happy Juice Pack, MentaBiotics, EDGE+, Energy+ en meer. Wetenschappelijk onderbouwd, 100% natuurlijk.",
};

const category = {
  slug: "supplementen",
  title: "Mentale Fitness",
  subtitle: "Supplementen voor focus, energie & mentale veerkracht",
  description:
    "Optimaliseer je gut-brain connectie met wetenschappelijk onderbouwde supplementen. Voor meer focus, een betere stemming en natuurlijke energie gedurende de dag.",
};

export default function SupplementenPage() {
  return <CategoryLanding category={category} categorySlug="hersenen" />;
}
