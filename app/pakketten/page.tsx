import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pakketten & Bundels — Beste Waarde Supplement Pakketten | AmareNL",
  description: "Bespaar op Amare's populairste bundels: Happy Juice Pack, Triangle of Wellness, Happy Lifestyle Pack. Tot 40% voordeliger dan los kopen. Inclusief gratis verzending.",
  alternates: { canonical: "/pakketten" },
  openGraph: { title: "Pakketten & Bundels | AmareNL", description: "Beste waarde supplement pakketten — voordeliger dan los kopen.", url: "/pakketten", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
};

const faqs = [
  { question: "Wat is het voordeel van een pakket ten opzichte van losse producten?", answer: "Pakketten zijn aanzienlijk voordeliger — je bespaart tot 40% ten opzichte van de producten los aanschaffen. Bovendien zijn de producten in een pakket zorgvuldig op elkaar afgestemd. Je krijgt een compleet systeem in plaats van losse onderdelen." },
  { question: "Welk pakket past het beste bij mij?", answer: "De Happy Juice Pack is de populairste keuze voor mentale energie en focus. De Triangle of Wellness Xtreme is het meest complete dag-nacht systeem. Het Happy Lifestyle Pack is voor wie echt all-in wil gaan met de volledige Amare ervaring." },
  { question: "Kan ik een pakket eerst uitproberen?", answer: "Ja, alle pakketten vallen onder de 30-dagen geld-terug-garantie. Zelfs als de verpakking leeg is, krijg je je geld terug. Je loopt dus geen enkel risico." },
  { question: "Hoe werkt het abonnement op een pakket?", answer: "Met een abonnement bespaar je 10% op elke levering en krijg je gratis verzending. Je pakket wordt automatisch elke maand geleverd. Je kunt op elk moment opzeggen of pauzeren — geen verplichtingen." },
];

export default function PakkettenPage() {
  return (<>
    <SchemaMarkup schema={combineSchemas(generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Pakketten & Bundels", url: "/pakketten" }]), generateFAQSchema(faqs))} id="pakketten-schema" />
    <CategoryLanding category={{ slug: "pakketten", title: "Pakketten & Bundels", subtitle: "Beste waarde — voordeliger dan los", description: "Onze zorgvuldig samengestelde bundels combineren de populairste producten met flinke korting." }} categorySlug="pakketten" />

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Waarom een Pakket de Slimste Keuze is</h2>
      <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
        <p>Supplementen werken het beste in combinatie. Je lichaam is geen verzameling losse onderdelen — het is een systeem waarin alles met alles samenhangt. Amare's pakketten zijn ontwikkeld vanuit die filosofie: producten die elkaar versterken in plaats van los naast elkaar te staan.</p>
        <p>De <strong>Happy Juice Pack</strong> — Amare's #1 bestseller — combineert Energy+, EDGE+ en MentaBiotics in één bundel. Energie, focus en stemmingsondersteuning die samenwerken via de gut-brain as. De <strong>Triangle of Wellness Xtreme</strong> is het complete dag-nacht systeem: Sunrise in de ochtend, Nitro in de middag, Sunset in de avond. En het <strong>Happy Lifestyle Pack</strong> biedt de volledige Amare ervaring voor wie het maximale uit zijn supplementroutine wil halen.</p>
        <p>Financieel is het helder: je bespaart tot 40% ten opzichte van los kopen, krijgt gratis verzending, en hebt één bestelling in plaats van drie. Minder gedoe, meer resultaat.</p>
      </div>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
      <div className="space-y-4">{faqs.map((faq, i) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div></details>))}</div>
    </div></section>
    <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">* Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA.</p>
  </>);
}
