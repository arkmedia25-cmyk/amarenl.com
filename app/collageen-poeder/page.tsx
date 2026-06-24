import type { Metadata } from "next";
import Link from "next/link";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import { generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/schema";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Collageen Poeder Kopen? Complete Gids 2026 | AmareNL",
  description: "Collageen poeder kopen? Ontdek welk type collageen je nodig hebt voor huid, haar en nagels.",
  alternates: { canonical: "/collageen-poeder" },
};

const faqItems = [
  { question: "Wat is de beste keuze?", answer: "Gehydrolyseerd collageen Type I & III van grasgevoerde runderen is de gouden standaard. Kies voor vloeibaar, minimaal 5g per dag, met vitamine C. Amare HL5 levert 5g gehydrolyseerd collageen (5 typen) met vitamine C." },
  { question: "Hoe lang duurt het voor ik resultaat zie?", answer: "De meeste gebruikers merken de eerste effecten na 2-4 weken consistent gebruik. Optimale resultaten na 8-12 weken. Consistentie is cruciaal — dagelijks gebruik geeft het beste resultaat." },
  { question: "Kan ik dit combineren met andere supplementen?", answer: "Ja, de Amare formules zijn ontworpen om elkaar aan te vullen. Combineer gerust met andere producten uit het assortiment. Raadpleeg bij twijfel een arts." },
  { question: "Is er een geld-terug garantie?", answer: "Ja, Amare biedt 30 dagen geld-terug garantie op alle producten — zelfs als de verpakking leeg is. Niet tevreden? Geld terug, geen vragen." },
];

const breadcrumb = generateBreadcrumbSchema([
  { name: "Home", url: "https://amarenl.com" },
  { name: "Collageen Poeder Kopen", url: "https://amarenl.com/collageen-poeder" },
]);

export default function Page() {
  return (
    <>
      <SchemaMarkup schema={combineSchemas(breadcrumb, generateFAQSchema(faqItems))} id="collageen-poeder" />

      <section className="bg-gradient-to-br from-[var(--color-bg-soft)] to-purple-50 py-20 md:py-28">
        <div className="container-page max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              ✨ Huid · Haar · Nagels
            </span>
            <h1 className="text-4xl md:text-6xl font-cormorant font-bold text-[var(--color-text)] leading-tight mb-6">
              Collageen Poeder Kopen? <span className="text-[var(--color-primary)]">Dit Moet Je Weten</span>
            </h1>
            <p className="text-lg text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto">
              Vanaf je 25e verlies je elk jaar 1% collageen. Ontdek welk collageen supplement echt werkt voor stralende huid, sterker haar en soepele gewrichten.
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
            <p className="text-amber-900">Gehydrolyseerd collageen Type I & III van grasgevoerde runderen is de gouden standaard. Kies voor vloeibaar, minimaal 5g per dag, met vitamine C. Amare HL5 levert 5g gehydrolyseerd collageen (5 typen) met vitamine C.</p>
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
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">HL5</h3>
              <p className="text-[var(--color-text-muted)] mb-4">5g vloeibaar collageen (5 typen) + vitamine C</p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2"><Check size=16 className="text-green-500 mt-0.5 shrink-0" /> 5 typen collageen (I,II,III,V,X)</li>
                <li className="flex items-start gap-2"><Check size=16 className="text-green-500 mt-0.5 shrink-0" /> Vloeibaar - 90% opname in 6u</li>
                <li className="flex items-start gap-2"><Check size=16 className="text-green-500 mt-0.5 shrink-0" /> Grasgevoerd, geen suiker</li>
                <li className="flex items-start gap-2"><Check size=16 className="text-green-500 mt-0.5 shrink-0" /> 30 dagen geld-terug garantie</li>
              </ul>
              <AffiliateCTA label="Bestel HL5 → €130,42/maand" product="hl5-peach-2pack" variant="primary" />
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[var(--color-border)]">
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">NeuCollagen</h3>
              <p className="text-[var(--color-text-muted)] mb-4">6-dimensionaal collageen</p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2"><Check size=16 className="text-green-500 mt-0.5 shrink-0" /> 6 typen collageen</li>
                <li className="flex items-start gap-2"><Check size=16 className="text-green-500 mt-0.5 shrink-0" /> Extra hyaluronzuur</li>
                <li className="flex items-start gap-2"><Check size=16 className="text-green-500 mt-0.5 shrink-0" /> Huid & gewrichten</li>
                <li className="flex items-start gap-2"><Check size=16 className="text-green-500 mt-0.5 shrink-0" /> Premium formule</li>
              </ul>
              <AffiliateCTA label="Bestel NeuCollagen → €90/maand" product="neucollagen" variant="secondary" />
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

      <StickyMobileCTA product="hl5-peach-2pack" subscriptionPrice="€130,42" />
    </>
  );
}
