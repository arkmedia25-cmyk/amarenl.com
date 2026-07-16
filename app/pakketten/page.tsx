import type { Metadata } from "next";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from "@/lib/schema";
import PakketGrid from "./PakketGrid";
import LeadForm from "./LeadForm";

export const metadata: Metadata = {
  title: "Word Amare Brand Partner — Start je Eigen Wellness Business | AmareNL",
  description: "Start als Amare Brand Partner en verdien commissie met premium supplementen. Kies je Launch Pack, ontvang training en start met verdienen. Geen voorraad, geen verzending.",
  alternates: { canonical: "/pakketten" },
  openGraph: {
    title: "Word Amare Brand Partner | AmareNL",
    description: "Start je eigen wellness business met Amare. Kies je Launch Pack en begin met verdienen.",
    url: "/pakketten",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
};

const faqs = [
  {
    question: "Wat is een Amare Brand Partner?",
    answer: "Als Amare Brand Partner deel je premium supplementen met je netwerk en verdien je commissie op elke verkoop. Je krijgt een persoonlijke webshop, toegang tot trainingen, marketingmateriaal en een community. Amare regelt alle logistiek — jij deelt, zij verzenden."
  },
  {
    question: "Welk Launch Pack past bij mij?",
    answer: "Basic (€277,68/maand) = voordeligste instap. Pro (€649,64/maand) = hoogste commissie + volledig assortiment. Triangle (€399/maand) = focus op Amare's #1 bestseller. Twijfel je? Laat je gegevens achter, dan helpen we je kiezen."
  },
  {
    question: "Hoeveel kan ik verdienen als Brand Partner?",
    answer: "Dit hangt af van hoeveel je deelt. Brand Partners verdienen commissie op elke verkoop via hun link — inclusief terugkerende abonnementscommissie. Het Pro pack geeft het hoogste percentage. Veel partners bouwen een stabiel maandelijks inkomen op."
  },
  {
    question: "Kan ik de producten eerst zelf proberen?",
    answer: "Als Brand Partner gebruik je de producten zelf én deel je ze met anderen. Dit is jouw business starter kit — je ervaart het volledige Amare assortiment uit eerste hand. Zo weet je precies wat je deelt en kun je authentiek vertellen over je ervaring."
  },
  {
    question: "Is er een geld-terug garantie op Launch Packs?",
    answer: "Launch Packs zijn business starter kits — hier geldt de standaard 30-dagen garantie niet voor. Je koopt een pakket om Brand Partner te worden. Twijfel je welk pakket bij je past? Laat je gegevens achter in het formulier hierboven, dan helpen we je kiezen."
  },
];

export default function PakkettenPage() {
  return (
    <div className="bg-white min-h-screen font-nunito">
      <SchemaMarkup schema={combineSchemas(
        generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Word Brand Partner", url: "/pakketten" }]),
        generateFAQSchema(faqs)
      )} id="pakketten-schema" />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)] text-white py-20 md:py-28">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-block px-4 py-1.5 mb-6 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest">
            Launch Packs
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-cormorant font-bold mb-6 leading-tight">
            Start je Eigen <span className="text-[var(--color-accent)]">Wellness Business</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-4 max-w-2xl mx-auto leading-relaxed">
            Word Amare Brand Partner. Deel premium supplementen, verdien commissie, bouw je eigen inkomen — zonder voorraad, zonder verzending, zonder risico.
          </p>
          <p className="text-white/60 text-sm">Kies je Launch Pack en start vandaag ↓</p>
        </div>
      </section>

      {/* ── HOE WERKT HET ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-center text-[var(--color-text)] mb-10">
            Hoe Het Werkt
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", icon: "📦", title: "Kies je Launch Pack", desc: "Basic, Pro of Triangle — kies het pakket dat bij je ambitie past. Alle packs bevatten producten + toegang tot het Brand Partner platform." },
              { step: "2", icon: "🚀", title: "Start met Delen", desc: "Deel je persoonlijke link met vrienden, familie en volgers. Gebruik de producten zelf en vertel je eerlijke ervaring. Authenticiteit verkoopt." },
              { step: "3", icon: "💰", title: "Verdien Commissie", desc: "Elke aankoop via jouw link levert commissie op — ook terugkerende abonnementen. Bouw een stabiel maandelijks inkomen op." },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 rounded-2xl bg-[var(--color-bg-soft)] border border-[var(--color-border)] hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-3">{item.step}</div>
                <h3 className="font-bold text-[var(--color-text)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAUNCH PACKS ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-center text-[var(--color-text)] mb-4">
            Kies Je Launch Pack
          </h2>
          <p className="text-center text-sm text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto">
            Elk pack geeft toegang tot het Brand Partner programma. Klik op een pack om direct te bestellen bij Amare.
          </p>
          <PakketGrid />
        </div>
      </section>

      {/* ── VOORDELEN ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-center text-[var(--color-text)] mb-10">
            Wat Je Krijgt als Brand Partner
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "🛒", title: "Eigen Amare webshop", desc: "Jouw persoonlijke pagina waar klanten direct kunnen bestellen." },
              { icon: "💸", title: "Commissie op elke verkoop", desc: "Verdien op losse aankopen én terugkerende abonnementen." },
              { icon: "📚", title: "Volledige training", desc: "Leer hoe je effectief deelt — online en offline." },
              { icon: "🎨", title: "Marketingmateriaal", desc: "Kant-en-klare content, afbeeldingen en video's om te delen." },
              { icon: "👥", title: "Community & events", desc: "Toegang tot exclusieve Brand Partner events en community." },
              { icon: "📦", title: "Geen voorraad nodig", desc: "Amare regelt productie, verzending en klantenservice." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="container-page max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-4">
            Meer Weten? 🚀
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Laat je gegevens achter en we sturen je alle informatie over het Brand Partner programma. Vrijblijvend, geen verplichtingen.
          </p>
          <LeadForm />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8 text-center">
            Veelgestelde Vragen
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group">
                <summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER NOTE ── */}
      <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">
        * Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA. Resultaten als Brand Partner kunnen per persoon verschillen.
      </p>
    </div>
  );
}
