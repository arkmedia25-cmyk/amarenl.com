import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dagelijkse Essentials — Vitamines, Proteïne & Omega 3 | AmareNL",
  description: "Je dagelijkse basis: Sunrise (22 superfoods + 9 vitaminen), Origin (plantaardig eiwit), Sunset (omega 3) en Nitro Xtreme (noni). Complete dagelijkse voedingsondersteuning.",
  alternates: { canonical: "/essentials" },
  openGraph: { title: "Dagelijkse Essentials Supplementen | AmareNL", description: "Vitamines, proteïne & omega 3 voor je dagelijkse routine.", url: "/essentials", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
};

const faqs = [
  { question: "Wat maakt Sunrise anders dan een gewone multivitamine?", answer: "Sunrise is meer dan een multivitamine — het combineert 22 superfoods (waaronder amla, camu camu en wilde bosbes) met 9 essentiële vitaminen. De vitamine C komt uit natuurlijke bronnen voor betere opname, en het bevat co-factoren zoals bioflavonoïden die in synthetische multivitamines ontbreken." },
  { question: "Is Origin een volledige maaltijdvervanger?", answer: "Origin is ontworpen als maaltijdshake met 23g plantaardig eiwit (erwt-rijst blend), MCT-olie, 7g vezels en 26 micronutriënten. Het kan een maaltijd vervangen — bijvoorbeeld als ontbijt of lunch op drukke dagen — maar is ook geschikt als aanvulling op je voeding." },
  { question: "Moet ik alle essentials producten dagelijks nemen?", answer: "Nee, je kiest wat bij jouw levensstijl past. Veel gebruikers starten met Sunrise als basis (ochtend), voegen Origin toe als eiwitshake, en Sunset voor de avond. Nitro Xtreme is optioneel als middagboost. Begin met één product en bouw uit op basis van wat je lichaam nodig heeft." },
  { question: "Zijn de essentials geschikt voor veganisten?", answer: "Origin is 100% plantaardig en veganistisch. Sunrise is grotendeels plantaardig. Sunset bevat visolie (omega 3) en is niet veganistisch. Nitro Xtreme is plantaardig. Check altijd het etiket voor de meest actuele informatie." },
];

export default function EssentialsPage() {
  return (<>
    <SchemaMarkup schema={combineSchemas(generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Dagelijkse Essentials", url: "/essentials" }]), generateFAQSchema(faqs))} id="essentials-schema" />
    <CategoryLanding category={{ slug: "essentials", title: "Dagelijkse Essentials", subtitle: "Vitamines, proteïne & omega 3", description: "De basis van je dagelijkse supplementroutine. Van Sunrise voor je ochtend tot Sunset voor je avond." }} categorySlug="essentials" />

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Dagelijkse Essentials — De Basis van Elke Dag</h2>
      <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
        <p>Je lichaam heeft elke dag dezelfde voedingsstoffen nodig: vitaminen, mineralen, eiwitten, gezonde vetten. De Dagelijkse Essentials van Amare maken het simpel om die basis consistent binnen te krijgen — zonder een schap aan losse potjes.</p>
        <p><strong>Sunrise</strong> is je ochtendroutine: 22 superfoods en 9 vitaminen in één drankje. <strong>Origin</strong> is je eiwitbasis: 23g plantaardig eiwit voor spieronderhoud en verzadiging. <strong>Sunset</strong> sluit je dag af met omega 3 en vitamine E voor hart, hersenen en celherstel. <strong>Nitro Xtreme</strong> is de optionele middagboost met noni, B-vitamines en mineralen.</p>
        <p>Samen vormen ze de Triangle of Wellness — Amare's complete dag-nacht systeem dat je natuurlijke ritme volgt: energie in de ochtend, focus in de middag, herstel in de avond.</p>
      </div>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
      <div className="space-y-4">{faqs.map((faq, i) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div></details>))}</div>
    </div></section>
    <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">* Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA.</p>
  </>);
}
