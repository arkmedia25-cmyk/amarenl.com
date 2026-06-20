import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentale Wellness Supplementen — Focus, Energie & Stemming | AmareNL",
  description: "Ontdek Amare's mentale wellness supplementen: Happy Juice Pack, MentaBiotics, EDGE+, Energy+ en meer. Voor focus, stemming en natuurlijke energie. Wetenschappelijk onderbouwd.",
  alternates: { canonical: "/supplementen" },
  openGraph: { title: "Mentale Wellness Supplementen — Focus & Stemming | AmareNL", description: "Happy Juice Pack, MentaBiotics, EDGE+ voor focus, stemming en energie.", url: "/supplementen", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
};

const faqs = [
  { question: "Wat zijn mentale wellness supplementen?", answer: "Mentale wellness supplementen ondersteunen je focus, stemming en mentale veerkracht via de gut-brain as. Ze bevatten ingrediënten zoals probiotica, adaptogenen (ashwagandha, rhodiola) en nootropics die je hersenfunctie en energieniveau op een natuurlijke manier ondersteunen — zonder synthetische stimulanten." },
  { question: "Welk Amare product is het beste voor focus?", answer: "EDGE+ is Amare's cafeïnevrije nootropicum speciaal voor focus. Het combineert pantotheenzuur (Vit B5) met adaptogene extracten. Voor energie én focus is de Happy Juice Pack de populairste keuze — een bundel van Energy+, EDGE+ en MentaBiotics." },
  { question: "Hoe snel merk ik effect van mentale wellness supplementen?", answer: "Energy+ en Amare ON geven vaak binnen 30-60 minuten merkbare energie. Adaptogenen zoals die in EDGE+ en MentaBiotics hebben 2-4 weken nodig. Voor blijvend resultaat is dagelijks gebruik gedurende minimaal 8 weken aanbevolen." },
  { question: "Zijn deze supplementen veilig voor dagelijks gebruik?", answer: "Ja. Amare's mentale wellness producten zijn gemaakt met natuurlijke ingrediënten en ontworpen voor dagelijks gebruik. Het zijn voedingssupplementen, geen geneesmiddelen. Raadpleeg bij twijfel altijd je arts, vooral als je medicatie gebruikt." },
];

export default function SupplementenPage() {
  return (<>
    <SchemaMarkup schema={combineSchemas(generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Mentale Wellness", url: "/supplementen" }]), generateFAQSchema(faqs))} id="supplementen-schema" />
    <CategoryLanding category={{ slug: "supplementen", title: "Mentale Wellness", subtitle: "Supplementen voor focus, energie & mentale veerkracht", description: "Optimaliseer je gut-brain connectie met wetenschappelijk onderbouwde supplementen. Voor meer focus, een betere stemming en natuurlijke energie gedurende de dag." }} categorySlug="hersenen" />

    {/* SEO Content */}
    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Mentale Wellness — Meer Dan Alleen 'Niet Moe' Zijn</h2>
      <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
        <p>Mentale wellness gaat over hoe je je voelt, hoe scherp je denkt, en hoe goed je omgaat met de dagelijkse drukte. Het is het verschil tussen de dag doorkomen en de dag echt leven. Amare's mentale wellness lijn is gebouwd rond één centraal idee: <strong>je darmen en je hersenen zijn onlosmakelijk verbonden</strong>.</p>
        <p>De gut-brain as — de communicatielijn tussen je darmzenuwstelsel en je brein — bepaalt voor een groot deel hoe je je voelt. Ongeveer 90% van je serotonine (het 'gelukshormoon') wordt in je darmen aangemaakt. Door je darmflora te ondersteunen met de juiste probiotica en voedingsstoffen, ondersteun je direct je stemming, focus en stressbestendigheid.</p>
        <h3>Wat kun je verwachten?</h3>
        <p>Mensen die consistent Amare's mentale wellness producten gebruiken rapporteren: betere focus tijdens werk of studie, minder last van middagdips, een stabielere stemming, en het gevoel beter met stress om te kunnen gaan. Het zijn geen wondermiddelen — het zijn gerichte voedingssupplementen die je lichaam geven wat het nodig heeft om optimaal te functioneren.</p>
        <h3>Voor wie is deze categorie?</h3>
        <p>Voor drukke professionals die scherp willen blijven, studenten in tentamenperiodes, ouders die alle ballen in de lucht houden, en iedereen die merkt dat stress en vermoeidheid hun dagelijkse leven beïnvloeden. Mentale wellness is geen luxe — het is de basis van al het andere.</p>
      </div>
    </div></section>

    {/* FAQ */}
    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen over Mentale Wellness</h2>
      <div className="space-y-4">{faqs.map((faq, i) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div></details>))}</div>
    </div></section>

    <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">* Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA. Supplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.</p>
  </>);
}
