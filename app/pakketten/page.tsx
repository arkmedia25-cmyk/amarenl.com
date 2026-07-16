import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Amare Brand Partner — Launch Packs & Startpakketten | AmareNL",
  description: "Start als Amare Brand Partner en verdien commissie. Kies je Launch Pack: Basic, Pro of Triangle Marketing Pack. Inclusief training, platform toegang en marketingmateriaal.",
  alternates: { canonical: "/pakketten" },
  openGraph: { title: "Word Amare Brand Partner — Launch Packs | AmareNL", description: "Start als Amare Brand Partner. Kies je startpakket en begin met verdienen.", url: "/pakketten", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
};

const faqs = [
  { question: "Wat is een Amare Brand Partner?", answer: "Als Amare Brand Partner deel je premium supplementen met je netwerk en verdien je commissie op elke verkoop via jouw persoonlijke link. Je krijgt je eigen webshop, toegang tot trainingen, marketingmateriaal en een community van gelijkgestemde ondernemers. Het is geen voorraad houden of zelf verzenden — Amare regelt alles." },
  { question: "Welk Launch Pack past het beste bij mij?", answer: "Het Basic pack is de voordeligste instap (€277,68/maand) — ideaal om te starten. Het Pro pack (€649,64/maand) geeft de hoogste commissie en het volledige assortiment — voor wie serieus wil verdienen. Het Triangle Marketing Pack (€399/maand) focust op Amare's #1 bestseller — perfect voor social media." },
  { question: "Kan ik eerst de producten zelf proberen?", answer: "Ja! Alle Launch Packs vallen onder de 30-dagen geld-terug-garantie. Je kunt de producten zelf ervaren voordat je ze deelt. Zelfs als de verpakking leeg is, krijg je je geld terug. Je loopt dus geen enkel risico." },
  { question: "Hoeveel kan ik verdienen als Brand Partner?", answer: "Dat hangt af van hoeveel je deelt. Amare Brand Partners verdienen commissie op elke verkoop via hun link — inclusief terugkerende abonnementscommissie. Met het Pro pack krijg je het hoogste commissiepercentage. Veel partners bouwen een stabiel maandelijks inkomen op." },
];

export default function PakkettenPage() {
  return (<>
    <SchemaMarkup schema={combineSchemas(generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Pakketten & Bundels", url: "/pakketten" }]), generateFAQSchema(faqs))} id="pakketten-schema" />
    <CategoryLanding category={{ slug: "pakketten", title: "Word Amare Brand Partner", subtitle: "Kies je Launch Pack & start met verdienen", description: "Deze Launch Packs zijn je toegang tot het Amare Brand Partner programma. Kies het pakket dat bij je past, ontvang premium producten, en start met delen en verdienen." }} categorySlug="pakketten" />

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Waarom Amare Brand Partner Worden?</h2>
      <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
        <p>Amare is meer dan supplementen — het is een beweging. Als Brand Partner deel je niet alleen producten, maar een missie: mentaal welzijn toegankelijk maken voor iedereen via de gut-brain axis.</p>
        <p><strong>Wat je krijgt als Brand Partner:</strong></p>
        <p>✅ Je eigen persoonlijke webshop met affiliate links<br/>
        ✅ Commissie op elke verkoop — ook terugkerend op abonnementen<br/>
        ✅ Volledige training en marketingmateriaal<br/>
        ✅ Toegang tot de Amare community en events<br/>
        ✅ Geen voorraad, geen verzending — Amare regelt alles</p>
        <p>De Launch Packs hieronder zijn je start. Kies het pakket dat bij je ambitie past. Alle packs bevatten de producten die je zelf kunt ervaren én delen, plus toegang tot het Brand Partner platform.</p>
      </div>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
      <div className="space-y-4">{faqs.map((faq, i) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div></details>))}</div>
    </div></section>
    <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">* Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA.</p>
  </>);
}
