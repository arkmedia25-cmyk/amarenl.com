import type { Metadata } from "next";
import Link from "next/link";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import { generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/schema";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Beste Probiotica Supplement? Complete Gids 2026 | AmareNL",
  description: "Beste probiotica supplement kopen? Ontdek welke stammen echt werken voor stemming en spijsvertering.",
  alternates: { canonical: "/beste-probiotica" },
};

const faqItems = [
  { question: "Wat is de beste keuze?", answer: "Kies op stamspecificiteit, niet CFU. Voor stemming: L. helveticus + B. longum. Voor spijsvertering: L. plantarum + B. breve. MentaBiotics met klinisch onderzochte Cerebiome blend + magnesium + prebiotica." },
  { question: "Hoe lang duurt het voor ik resultaat zie?", answer: "De meeste gebruikers merken de eerste effecten na 2-4 weken consistent gebruik. Optimale resultaten na 8-12 weken. Consistentie is cruciaal — dagelijks gebruik geeft het beste resultaat." },
  { question: "Kan ik dit combineren met andere supplementen?", answer: "Ja, de Amare formules zijn ontworpen om elkaar aan te vullen. Combineer gerust met andere producten uit het assortiment. Raadpleeg bij twijfel een arts." },
  { question: "Is er een geld-terug garantie?", answer: "Ja, Amare biedt 30 dagen geld-terug garantie op alle producten — zelfs als de verpakking leeg is. Niet tevreden? Geld terug, geen vragen." },
];

const breadcrumb = generateBreadcrumbSchema([
  { name: "Home", url: "https://amarenl.com" },
  { name: "Beste Probiotica Supplement", url: "https://amarenl.com/beste-probiotica" },
]);

export default function Page() {
  return (
    <>
      <SchemaMarkup schema={combineSchemas(breadcrumb, generateFAQSchema(faqItems))} id="beste-probiotica" />

      <section className="bg-gradient-to-br from-[var(--color-bg-soft)] to-purple-50 py-20 md:py-28">
        <div className="container-page max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              🦠 Darm · Brein · Stemming
            </span>
            <h1 className="text-4xl md:text-6xl font-cormorant font-bold text-[var(--color-text)] leading-tight mb-6">
              Beste Probiotica Supplement? <span className="text-[var(--color-primary)]">Dit Moet Je Weten</span>
            </h1>
            <p className="text-lg text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto">
              Niet elke probiotica is hetzelfde. Ontdek waarom CFU's niet het hele verhaal vertellen en welk probioticum past bij jouw doel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#kopen" className="btn-primary px-8 py-4 text-lg">Beste keuze bekijken →</Link>
              <Link href="#kopen" className="px-8 py-4 text-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-bold hover:bg-[var(--color-primary)] hover:text-white transition-all">Direct bestellen</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-[var(--color-border)]">
        <div className="container-page max-w-3xl">
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <p className="text-sm font-bold text-amber-800 mb-2">🧠 Het korte antwoord:</p>
            <p className="text-amber-900">Kies op stamspecificiteit, niet CFU. Voor stemming: L. helveticus + B. longum. Voor spijsvertering: L. plantarum + B. breve. MentaBiotics met klinisch onderzochte Cerebiome blend + magnesium + prebiotica.</p>
          </div>
        </div>
      </section>

      <section id="kopen" className="py-20 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] text-center mb-4">
            Onze <span className="text-[var(--color-primary)]">Aanbeveling</span>
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-12">Wetenschappelijk onderbouwde formules met premium ingrediënten.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-[var(--color-primary)] relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[var(--color-accent)] text-[var(--color-text)] px-3 py-1 rounded-full text-xs font-bold">BESTE KEUZE</div>
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">MentaBiotics</h3>
              <p className="text-[var(--color-text-muted)] mb-4">Cerebiome blend + magnesium + prebiotica</p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> Klinisch onderzochte Cerebiome blend</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> Magnesium voor stemming</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> 5752mg prebiotische vezels</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> 30 dagen geld-terug garantie</li>
              </ul>
              <AffiliateCTA label="Bestel MentaBiotics → €71,83/maand" product="mentabiotics" variant="primary" />
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[var(--color-border)]">
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">Restore</h3>
              <p className="text-[var(--color-text-muted)] mb-4">5 stammen + 5 enzymen</p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> 5 probiotica stammen</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> 5 spijsverteringsenzymen</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> Dagelijkse ondersteuning</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> Voordelige instap</li>
              </ul>
              <AffiliateCTA label="Bestel Restore → €29,70/maand" product="restore" variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] text-center mb-12">
            Veelgestelde <span className="text-[var(--color-primary)]">Vragen</span>
          </h2>
          <div className="space-y-4">
            {faqItems.map((faq, i) => (
              <details key={i} className="group bg-[var(--color-bg-soft)] rounded-xl p-6 border border-[var(--color-border)]">
                <summary className="font-bold text-[var(--color-text)] cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-[var(--color-primary)] group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <StickyMobileCTA product="mentabiotics" subscriptionPrice="€71,83" />
    </>
  );
}
