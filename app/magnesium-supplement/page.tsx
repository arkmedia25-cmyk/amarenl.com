import type { Metadata } from "next";
import Link from "next/link";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import { generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/schema";
import { Check, X, Star, Award, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Magnesium Supplement Kopen? Complete Gids 2026 | AmareNL",
  description: "Magnesium supplement kopen? Ontdek welke vorm (bisglycinaat, citraat, malaat) je nodig hebt voor slaap, stress of spieren. Beste magnesium supplementen vergeleken.",
  alternates: { canonical: "/magnesium-supplement" },
  openGraph: {
    title: "Magnesium Supplement Kopen? Complete Gids 2026 | AmareNL",
    description: "Ontdek welke magnesium vorm je nodig hebt. Vergelijk bisglycinaat, citraat en malaat. Beste prijs-kwaliteit.",
    url: "/magnesium-supplement",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
  },
};

const faqItems = [
  { question: "Welke vorm magnesium is het beste?", answer: "Magnesiumbisglycinaat is de beste allround keuze: hoge opneembaarheid, geen darmklachten, en het aminozuur glycine werkt kalmerend. Voor constipatie kies je citraat, voor spierherstel malaat." },
  { question: "Hoeveel magnesium per dag heb je nodig?", answer: "De aanbevolen dagelijkse hoeveelheid is 300-350 mg voor volwassenen. Bij stress, intensief sporten of slaapproblemen adviseren experts 400-500 mg per dag, bij voorkeur verdeeld over twee innames." },
  { question: "Wanneer kan ik het beste magnesium innemen?", answer: "Neem magnesium 's avonds 1-2 uur voor het slapen. Magnesium ondersteunt ontspanning en een diepere slaap. Combineer niet met calcium — die concurreren om opname. Wacht minimaal 2 uur." },
  { question: "Heeft magnesium bijwerkingen?", answer: "Magnesiumbisglycinaat heeft vrijwel geen bijwerkingen. Magnesiumcitraat kan bij hoge doseringen laxerend werken. Blijf onder 500 mg per dag tenzij een arts anders adviseert." },
  { question: "Welk magnesium supplement kiezen voor stress?", answer: "Magnesiumbisglycinaat is de beste keuze bij stress. Het glycine werkt rustgevend op het zenuwstelsel. De combinatie met probiotica (zoals in MentaBiotics) versterkt het effect via de darm-hersen-as." },
];

const breadcrumb = generateBreadcrumbSchema([
  { name: "Home", url: "https://amarenl.com" },
  { name: "Magnesium Supplement Kopen", url: "https://amarenl.com/magnesium-supplement" },
]);

export default function MagnesiumLandingPage() {
  return (
    <>
      <SchemaMarkup schema={combineSchemas(breadcrumb, generateFAQSchema(faqItems))} id="magnesium-landing" />

      {/* HERO */}
      <section className="bg-gradient-to-br from-[var(--color-bg-soft)] to-purple-50 py-20 md:py-28">
        <div className="container-page max-w-5xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              ⚡ 300+ Lichaamsprocessen
            </span>
            <h1 className="text-4xl md:text-6xl font-cormorant font-bold text-[var(--color-text)] leading-tight mb-6">
              Magnesium Supplement <span className="text-[var(--color-primary)]">Kopen?</span> Dit Moet Je Weten
            </h1>
            <p className="text-lg text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto">
              Niet elke magnesium is hetzelfde. Ontdek welke vorm écht werkt voor <strong>slaap, stress of spieren</strong> — en welke je beter kunt laten liggen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#vergelijken" className="btn-primary px-8 py-4 text-lg">
                Vergelijk de beste vormen →
              </Link>
              <Link href="#kopen" className="px-8 py-4 text-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full font-bold hover:bg-[var(--color-primary)] hover:text-white transition-all">
                Direct bestellen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ANSWER BOX (AEO — Answer Engine Optimization) */}
      <section className="py-8 bg-white border-b border-[var(--color-border)]">
        <div className="container-page max-w-3xl">
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <p className="text-sm font-bold text-amber-800 mb-2">🧠 Het korte antwoord (voor als je haast hebt):</p>
            <p className="text-amber-900">
              <strong>Magnesiumbisglycinaat</strong> is de beste allround keuze voor de meeste mensen — het wordt het best opgenomen, geeft geen darmklachten, en het glycine werkt kalmerend. 
              Kies <strong>citraat</strong> alleen als je ook last hebt van constipatie. Kies <strong>malaat</strong> als je spierherstel na het sporten wilt ondersteunen.
              Een complete formule zoals <strong>Amare MentaBiotics</strong> combineert magnesium met probiotica voor de darm-hersen-as.
            </p>
          </div>
        </div>
      </section>

      {/* VERGELIJK VORMEN (SEO table) */}
      <section id="vergelijken" className="py-20 bg-white">
        <div className="container-page max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] text-center mb-4">
            Welke Magnesium Vorm Heb Jij <span className="text-[var(--color-primary)]">Nodig?</span>
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-12">
            Drie vormen, drie toepassingen. Kies op basis van jouw doel.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Bisglycinaat", best: "Beste allround", voor: "Slaap & Stress", opname: "⭐⭐⭐⭐⭐", darmen: "Geen klachten", extra: "Glycine kalmeert zenuwstelsel" },
              { name: "Citraat", best: "Goedkoopste", voor: "Constipatie", opname: "⭐⭐⭐⭐", darmen: "Kan laxerend werken", extra: "Hoge biologische beschikbaarheid" },
              { name: "Malaat", best: "Sporters", voor: "Spierherstel", opname: "⭐⭐⭐⭐", darmen: "Mild", extra: "Appelzuur voor energieproductie" },
            ].map((vorm) => (
              <div key={vorm.name} className="bg-[var(--color-bg-soft)] rounded-2xl p-6 border border-[var(--color-border)] hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-1">{vorm.name}</h3>
                <span className="inline-block px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-xs font-bold mb-4">{vorm.best}</span>
                <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                  <li><strong>Voor:</strong> {vorm.voor}</li>
                  <li><strong>Opname:</strong> {vorm.opname}</li>
                  <li><strong>Darmen:</strong> {vorm.darmen}</li>
                  <li><strong>Plus:</strong> {vorm.extra}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT AANBEVELING + CTA */}
      <section id="kopen" className="py-20 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] text-center mb-4">
            Onze <span className="text-[var(--color-primary)]">Aanbeveling</span>
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-12">
            Magnesium werkt het beste samen met andere nutriënten. Deze Amare formules combineren het met wetenschappelijk onderbouwde ingrediënten.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* MentaBiotics */}
            <div className="bg-white rounded-2xl p-8 border-2 border-[var(--color-primary)] relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[var(--color-accent)] text-[var(--color-text)] px-3 py-1 rounded-full text-xs font-bold">🥇 BESTE KEUZE</div>
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">MentaBiotics®</h3>
              <p className="text-[var(--color-text-muted)] mb-4">Magnesium + Cerebiome® probiotica voor de darm-hersen-as</p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> 56,25 mg magnesium + L-glutamine</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> Klinisch onderzochte Cerebiome® blend</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> 30 dagen geld-terug garantie</li>
              </ul>
              <AffiliateCTA label="Bestel MentaBiotics → €71,83/maand" product="mentabiotics" variant="primary" />
            </div>

            {/* Sunrise */}
            <div className="bg-white rounded-2xl p-8 border border-[var(--color-border)]">
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">Sunrise</h3>
              <p className="text-[var(--color-text-muted)] mb-4">Magnesium in een complete ochtendformule met 22 superfoods</p>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> Magnesium + 9 vitaminen + mineralen</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> 22 plantaardige superfoods</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> Extra vitamine D3 & B-complex</li>
              </ul>
              <AffiliateCTA label="Bestel Sunrise → €85,78/maand" product="sunrise" variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
