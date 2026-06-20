import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schoonheid & Verzorging — Collageen, Huid & Haar Supplementen | AmareNL",
  description: "Stralende huid, sterker haar en nagels van binnenuit. HL5 collageen, Skin to Mind serums en Rootist haarverzorging. Wetenschappelijk onderbouwd, natuurlijke ingrediënten.",
  alternates: { canonical: "/schoonheid" },
  openGraph: { title: "Schoonheid & Verzorging Supplementen | AmareNL", description: "Collageen, huid & haar van binnenuit — HL5, Skin to Mind en Rootist.", url: "/schoonheid", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
};

const faqs = [
  { question: "Wat is het verschil tussen HL5 collageen en gewone collageenpoeders?", answer: "HL5 is een vloeibare collageenformule met 5g gehydrolyseerd collageen Type 1 & 3 per portie. De vloeibare vorm wordt tot 90% binnen 6 uur opgenomen — aanzienlijk sneller dan poeders of capsules. Het is grasgevoerd, lactosevrij en heeft een perziksmaak." },
  { question: "Werkt collageen echt voor huid en haar?", answer: "Collageen is het meest voorkomende eiwit in je lichaam en vormt de structurele basis van je huid, haar, nagels en bindweefsel. Vanaf je 25e neemt de natuurlijke productie met ~1% per jaar af. Suppletie met gehydrolyseerd collageen levert de bouwstenen die je lichaam nodig heeft. Gebruikers rapporteren zichtbare verbetering na 8-12 weken consistent gebruik." },
  { question: "Wat is het verschil tussen inwendige en uitwendige verzorging?", answer: "Inwendige verzorging (zoals HL5 collageen) levert bouwstenen van binnenuit. Uitwendige verzorging (Skin to Mind serums, Rootist haarproducten) werkt direct op de huid en het haar. De combinatie is het meest effectief: van binnen opbouwen, van buiten beschermen." },
  { question: "Zijn de schoonheidsproducten geschikt voor de gevoelige huid?", answer: "Amare's Skin to Mind en Rootist producten zijn ontwikkeld met natuurlijke ingrediënten en vrij van agressieve chemicaliën. Ze zijn dermatologisch getest. Bij een zeer gevoelige huid is het altijd verstandig om eerst een kleine hoeveelheid te testen." },
];

export default function SchoonheidPage() {
  return (<>
    <SchemaMarkup schema={combineSchemas(generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Schoonheid & Verzorging", url: "/schoonheid" }]), generateFAQSchema(faqs))} id="schoonheid-schema" />
    <CategoryLanding category={{ slug: "schoonheid", title: "Schoonheid & Verzorging", subtitle: "Van binnenuit stralen", description: "Ontdek Amare's beauty- en verzorgingslijn: collageen voor huid en haar, plus de nieuwe Skin to Mind™ en Rootist™ collecties." }} categorySlug="schoonheid" />

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Schoonheid Begint van Binnenuit</h2>
      <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
        <p>Crèmes en serums doen hun werk aan de buitenkant, maar échte schoonheid begint dieper. Je huid, haar en nagels zijn een spiegel van wat er binnenin gebeurt. Voedingsstoffen zoals collageen, biotine, vitamine C en silica vormen de bouwstenen waar je lichaam ze het hardst nodig heeft.</p>
        <p>Amare's schoonheidslijn combineert het beste van twee werelden: <strong>inwendige voeding</strong> via HL5 collageen en <strong>uitwendige verzorging</strong> via de Skin to Mind™ en Rootist™ collecties. HL5 levert 5 gram gehydrolyseerd collageen per dag — de bouwsteen voor stevige huid, sterk haar en nagels die niet splijten. De Skin to Mind serums en Rootist haarproducten doen de rest.</p>
        <h3>De holistische aanpak</h3>
        <p>Wat Amare's schoonheidslijn bijzonder maakt is de holistische filosofie. Het gaat niet om één wondermiddel maar om een systeem: collageen van binnenuit voor structuur, serums van buitenaf voor hydratatie en bescherming, en gespecialiseerde haarverzorging die verder kijkt dan alleen shampoo. Alles werkt samen, niets staat op zichzelf.</p>
      </div>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
      <div className="space-y-4">{faqs.map((faq, i) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div></details>))}</div>
    </div></section>
    <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">* Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA.</p>
  </>);
}
