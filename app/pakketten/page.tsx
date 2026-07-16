import type { Metadata } from "next";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from "@/lib/schema";
import PakketGrid from "./PakketGrid";
import LeadForm from "./LeadForm";

export const metadata: Metadata = {
  title: "Word Amare Brand Partner — Start je Eigen Wellness Business | AmareNL",
  description: "Start als Amare Brand Partner. Verdien commissie met premium supplementen. Laat je gegevens achter voor gratis info & persoonlijk advies. Geen voorraad, geen verzending.",
  alternates: { canonical: "/pakketten" },
};

const faqs = [
  {
    question: "Wat is een Amare Brand Partner?",
    answer: "Als Brand Partner deel je premium supplementen met je netwerk en verdien je commissie op elke verkoop. Je krijgt een persoonlijke webshop, training, marketingmateriaal en toegang tot de community. Amare regelt productie, verzending en klantenservice — jij deelt, zij doen de rest."
  },
  {
    question: "Welk Launch Pack past bij mij?",
    answer: "Basic (€277,68/maand) = voordeligste instap, essentiële producten. Triangle (€511,21/maand) = 3x sets om te delen, perfect voor social media. Pro (€649,64/maand) = volledig assortiment, hoogste commissie. Laat je gegevens achter, dan helpen we je persoonlijk kiezen."
  },
  {
    question: "Hoeveel kan ik verdienen?",
    answer: "Dit hangt af van hoeveel je deelt. Brand Partners verdienen commissie op elke verkoop via hun link — ook terugkerend op abonnementen. Het Pro pack geeft het hoogste percentage. Veel partners bouwen een stabiel maandelijks inkomen op."
  },
  {
    question: "Is er een geld-terug garantie op Launch Packs?",
    answer: "Launch Packs zijn business starter kits. Dit is een investering in je eigen Brand Partner business — hier geldt de standaard 30-dagen garantie niet voor. Twijfel je? Laat je gegevens achter, dan helpen we je het juiste pakket te kiezen."
  },
];

export default function PakkettenPage() {
  return (
    <div className="bg-white min-h-screen font-nunito">
      <SchemaMarkup schema={combineSchemas(
        generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Word Brand Partner", url: "/pakketten" }]),
        generateFAQSchema(faqs)
      )} id="pakketten-schema" />

      {/* ── HERO + LEAD FORM ── */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)] text-white py-16 md:py-24">
        <div className="container-page max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left — Hero text */}
            <div>
              <span className="inline-block px-3 py-1 mb-4 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                🚀 Nieuwe Categorie — Lead Gen
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold mb-4 leading-tight">
                Start je Eigen <span className="text-[var(--color-accent)]">Wellness Business</span>
              </h1>
              <p className="text-white/80 mb-4 leading-relaxed">
                Word Amare Brand Partner. Deel premium supplementen, verdien commissie, bouw je eigen inkomen.
              </p>
              <ul className="space-y-2 text-sm text-white/70">
                <li>✅ Geen voorraad — Amare regelt verzending</li>
                <li>✅ Training & marketingmateriaal inbegrepen</li>
                <li>✅ Verdien op eenmalige én terugkerende aankopen</li>
                <li>✅ Start vanuit huis — deel via social media</li>
              </ul>
            </div>

            {/* Right — Lead Form */}
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-cormorant font-bold text-[var(--color-text)] mb-2 text-center">
                  Gratis Info & Persoonlijk Advies 📩
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] text-center mb-5">
                  Laat je gegevens achter. We sturen je alle info over het Brand Partner programma + helpen je het juiste pakket te kiezen. Vrijblijvend.
                </p>
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOE WERKT HET ── */}
      <section className="py-12 bg-white">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-xl font-cormorant font-bold text-[var(--color-text)] mb-8">Hoe Werkt Het?</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { step: "1", title: "Laat je gegevens achter", desc: "Vul het formulier in. We sturen je alle info + helpen je het juiste pakket kiezen." },
              { step: "2", title: "Kies je Launch Pack", desc: "Basic, Triangle of Pro — kies wat bij je past en bestel bij Amare." },
              { step: "3", title: "Start met verdienen", desc: "Deel je link, ervaar de producten, ontvang commissie op elke verkoop." },
            ].map((item) => (
              <div key={item.step} className="p-4 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                <div className="w-7 h-7 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2">{item.step}</div>
                <h3 className="font-bold text-xs text-[var(--color-text)] mb-1">{item.title}</h3>
                <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAUNCH PACKS (referans) ── */}
      <section className="py-12 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-5xl">
          <h2 className="text-xl font-cormorant font-bold text-center text-[var(--color-text)] mb-2">
            Kies je Launch Pack
          </h2>
          <p className="text-center text-xs text-[var(--color-text-muted)] mb-8">
            Klik op een pakket voor alle details. Onderaan elke pagina vind je de bestellink naar Amare.
          </p>
          <PakketGrid />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-xl font-cormorant font-bold text-[var(--color-text)] mb-6 text-center">Veelgestelde Vragen</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-[var(--color-bg-soft)] rounded-xl border border-[var(--color-border)] group">
                <summary className="p-4 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-[var(--color-primary)] text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-4 pb-4 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">
        * Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA. Resultaten als Brand Partner kunnen per persoon verschillen.
      </p>
    </div>
  );
}
