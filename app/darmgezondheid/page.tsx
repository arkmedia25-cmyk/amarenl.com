import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Darmgezondheid Supplementen — Probiotica, Enzymen & Superfoods | AmareNL",
  description: "Een gezonde darmflora is de basis van je welzijn. Ontdek Amare's probiotica (MentaBiotics), spijsverteringsenzymen (Restore) en superfoods. Voor betere spijsvertering en stemming.",
  alternates: { canonical: "/darmgezondheid" },
  openGraph: { title: "Darmgezondheid Supplementen | AmareNL", description: "Probiotica, enzymen & superfoods voor een gezonde darmflora en betere spijsvertering.", url: "/darmgezondheid", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
};

const faqs = [
  { question: "Waarom is darmgezondheid zo belangrijk?", answer: "Je darmen doen veel meer dan alleen voedsel verteren. Ze bevatten 70% van je immuunsysteem, produceren 90% van je serotonine, en communiceren direct met je hersenen via de nervus vagus. Een gezonde darmflora is de basis van je fysieke én mentale gezondheid." },
  { question: "Wat is het verschil tussen probiotica en prebiotica?", answer: "Probiotica zijn levende bacteriën die je darmflora aanvullen (zoals in MentaBiotics). Prebiotica zijn vezels die als voeding dienen voor die bacteriën (zoals de isomalto-oligosachariden in EDGE+). Ze werken het beste samen: prebiotica voeden de probiotica." },
  { question: "Hoe snel merk ik verbetering van probiotica?", answer: "De eerste effecten — minder opgeblazen gevoel, betere stoelgang — merk je vaak na 1 tot 2 weken. Voor stemmingsverbetering via de gut-brain as duurt het 4 tot 8 weken. Consistent dagelijks gebruik is essentieel." },
  { question: "Kan ik probiotica combineren met andere supplementen?", answer: "Ja, probiotica combineren uitstekend met vrijwel alle supplementen. Neem ze bij voorkeur op een lege maag ('s ochtends of voor het slapengaan) voor optimale opname. Vermijd combinatie met hete dranken — die kunnen de bacteriën beschadigen." },
];

export default function DarmgezondheidPage() {
  return (<>
    <SchemaMarkup schema={combineSchemas(generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Darmgezondheid", url: "/darmgezondheid" }]), generateFAQSchema(faqs))} id="darmen-schema" />
    <CategoryLanding category={{ slug: "darmgezondheid", title: "Darmen & Digestie", subtitle: "Probiotica, enzymen & superfoods", description: "Een gezonde darmflora is de basis van je welzijn. Ontdek Amare's darmondersteunende supplementen — van probiotica tot spijsverteringsenzymen." }} categorySlug="darmen" />

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Darmgezondheid — Het Fundament van Je Welzijn</h2>
      <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
        <p>Je darmen zijn geen simpele verwerkingsmachine voor voedsel. Ze zijn een complex ecosysteem van biljoenen bacteriën — samen het <strong>microbioom</strong> genoemd — dat direct communiceert met je hersenen, je immuunsysteem aanstuurt, en je stemming beïnvloedt. Als je darmflora uit balans is, merk je dat niet alleen aan je spijsvertering, maar aan je hele welzijn.</p>
        <p>Amare's darmgezondheid producten richten zich op de complete darm-hersen-as. MentaBiotics combineert psychobiotica — bacteriestammen waarvan onderzoek aantoont dat ze stemming en stressbestendigheid ondersteunen. Restore voegt daar spijsverteringsenzymen aan toe voor wie moeite heeft met de vertering van bepaalde voedingsmiddelen.</p>
        <h3>Signalen dat je darmflora aandacht nodig heeft</h3>
        <p>Een opgeblazen gevoel na het eten, onregelmatige stoelgang, vermoeidheid zonder duidelijke oorzaak, en stemmingswisselingen kunnen allemaal wijzen op een verstoorde darmflora. Het goede nieuws: je darmflora past zich relatief snel aan — binnen weken kun je significante verbetering merken met de juiste ondersteuning.</p>
        <h3>Voor wie?</h3>
        <p>Voor iedereen die merkt dat voeding niet lekker valt, die last heeft van een onrustige buik, of die wil werken aan een stabielere stemming vanuit de basis. Darmgezondheid is geen niche — het is de basis van alles.</p>
      </div>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
      <div className="space-y-4">{faqs.map((faq, i) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div></details>))}</div>
    </div></section>
    <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">* Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA.</p>
  </>);
}
