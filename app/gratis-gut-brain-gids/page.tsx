import type { Metadata } from "next";
import LeadMagnetForm from "./LeadMagnetForm";

export const metadata: Metadata = {
  title: "Gratis Gut-Brain Gids — Ontdek Jouw Darm-Brein Connectie | AmareNL",
  description:
    "Download de gratis Gut-Brain Gids en ontdek hoe je darmen en hersenen samenwerken. Inclusief persoonlijk supplementen advies + €8 korting op je eerste bestelling.",
  alternates: { canonical: "https://amarenl.com/gratis-gut-brain-gids" },
  openGraph: {
    title: "Gratis Gut-Brain Gids — Ontdek Jouw Darm-Brein Connectie | AmareNL",
    description:
      "Download de gratis Gut-Brain Gids en ontdek hoe je darmen en hersenen samenwerken. Inclusief persoonlijk supplementen advies.",
    url: "https://amarenl.com/gratis-gut-brain-gids",
  },
};

export default function GutBrainGidsPage() {
  return (
    <div className="bg-white min-h-screen font-nunito">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-primary)] text-white py-20">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-block px-4 py-1 mb-6 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest">
            Gratis Download
          </span>
          <h1 className="text-4xl md:text-6xl font-cormorant font-bold mb-6 leading-tight">
            De Complete <span className="text-[var(--color-accent)]">Gut-Brain Gids</span>
          </h1>
          <p className="text-xl text-white/80 mb-4 max-w-2xl mx-auto leading-relaxed">
            Ontdek hoe je darmen en hersenen met elkaar communiceren — en welke supplementen
            deze connectie ondersteunen voor meer energie, een betere stemming en diepe slaap.
          </p>
          <p className="text-white/60 text-sm">PDF • 12 pagina's • Direct in je inbox</p>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-20 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-4xl">
          <h2 className="text-3xl font-cormorant font-bold text-center text-[var(--color-text)] mb-12">
            Wat zit er in de gids?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "1. De Gut-Brain Axis Uitgelegd",
                desc: "Wat is de darm-brein connectie en waarom is het de grootste doorbraak in wellness van dit decennium? In heldere taal, zonder jargon.",
              },
              {
                title: "2. 7 Signalen van een Verstoorde Connectie",
                desc: "Van brain fog tot stress en van een opgeblazen gevoel tot stemmingswisselingen — herken de signalen die je lichaam je stuurt.",
              },
              {
                title: "3. De Wetenschap Achter Probiotica",
                desc: "Wat zijn psychobiotica? Hoe beïnvloeden darmbacteriën je stemming? De research op een rij — met bronverwijzingen naar PubMed-studies.",
              },
              {
                title: "4. Jouw Persoonlijke Supplementen Profiel",
                desc: "Een eenvoudige zelftest: welk supplement past bij jouw klachten? Met duidelijke aanbevelingen per profiel.",
              },
              {
                title: "5. De Complete Product Wijzer",
                desc: "Overzicht van alle Amare producten voor de gut-brain axis — wat doet welk product, voor wie is het, en hoe combineer je ze?",
              },
              {
                title: "6. 30-Dagen Actieplan",
                desc: "Een simpel stappenplan om je gut-brain connectie in 30 dagen te optimaliseren. Met dagelijkse gewoontes, voedingstips en supplement routines.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-2xl border border-[var(--color-border)] hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-[var(--color-text)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="download" className="py-20">
        <div className="container-page max-w-lg text-center">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Download je gratis gids
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8">
            Vul je gegevens in en ontvang de Gut-Brain Gids direct in je inbox. Volledig gratis, geen verplichtingen.
          </p>
          <LeadMagnetForm />
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-[var(--color-bg-soft)] border-t border-[var(--color-border)]">
        <div className="container-page max-w-2xl text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2">
              <span>🔒</span> Geen spam — we delen je gegevens nooit
            </div>
            <div className="hidden sm:block text-[var(--color-border)]">|</div>
            <div className="flex items-center gap-2">
              <span>📩</span> Altijd uitschrijven met één klik
            </div>
            <div className="hidden sm:block text-[var(--color-border)]">|</div>
            <div className="flex items-center gap-2">
              <span>✅</span> 100% gratis — geen verplichtingen
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
