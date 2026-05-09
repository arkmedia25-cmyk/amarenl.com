import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Leaf, Heart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Over AmareNL — Onafhankelijke Amare Affiliate Partner | AmareNL",
  description:
    "AmareNL is een onafhankelijke affiliate partner van Amare Global. Wij helpen Nederlanders met natuurlijke supplementen voor mentale wellness, darmgezondheid en vitaliteit.",
};

const values = [
  {
    icon: Shield,
    title: "Betrouwbaar",
    text: "Wij geven eerlijk advies op basis van onderzoek en eigen ervaring. Geen loze beloften, alleen wat écht werkt.",
  },
  {
    icon: Leaf,
    title: "Natuurlijk",
    text: "Wij geloven in de kracht van natuurlijke ingrediënten. Alle Amare producten zijn 100% natuurlijk en wetenschappelijk onderbouwd.",
  },
  {
    icon: Heart,
    title: "Betrokken",
    text: "Jouw welzijn staat centraal. Wij denken met je mee en helpen je de juiste producten te vinden voor jouw behoeften.",
  },
  {
    icon: Users,
    title: "Community",
    text: "Wij bouwen aan een community van mensen die bewust met hun gezondheid bezig zijn. Samen staan we sterker.",
  },
];

export default function OverOns() {
  return (
    <div className="bg-white min-h-screen font-nunito">
      {/* Hero */}
      <section className="bg-[var(--color-bg-soft)] py-16 md:py-24 border-b border-[var(--color-border)]">
        <div className="container-page max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Over AmareNL
          </h1>
          <p className="text-sm md:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-xl mx-auto">
            Jouw gids naar natuurlijke mentale wellness, darmgezondheid en vitaliteit — via de wetenschappelijk onderbouwde producten van Amare Global.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20">
        <div className="container-page max-w-3xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
                Ons verhaal
              </h2>
              <div className="space-y-4 text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
                <p>
                  AmareNL is ontstaan uit een persoonlijke zoektocht naar mentale helderheid en energie. Na jaren van vermoeidheid, brain fog en stress ontdekten wij de kracht van de gut-brain connectie — en specifiek de producten van Amare Global.
                </p>
                <p>
                  Wat begon als een persoonlijke transformatie, groeide uit tot een missie: andere Nederlanders helpen dezelfde positieve verandering te ervaren. Wij zijn ervan overtuigd dat mentale wellness begint bij wat je je lichaam geeft — voeding, supplementen en aandacht voor je darmgezondheid.
                </p>
                <p>
                  Vandaag de dag is AmareNL het grootste Nederlandstalige platform over Amare producten. Wij delen kennis, ervaringen en eerlijke reviews om jou te helpen de beste keuze te maken voor jouw welzijn.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
              <Image
                src="/images/about-amarenl.jpg"
                alt="AmareNL — Jouw gids naar natuurlijke wellness"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] text-center mb-12">
            Waar wij voor staan
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-3xl p-6 border border-[var(--color-border)] text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[var(--color-bg-soft)] flex items-center justify-center text-[var(--color-primary)]">
                  <v.icon size={22} />
                </div>
                <h3 className="font-bold text-[var(--color-text)] mb-2">{v.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Independent Partner */}
      <section className="py-16 md:py-20">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Onafhankelijke partner
          </h2>
          <div className="space-y-4 text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
            <p>
              AmareNL is een <strong>onafhankelijke affiliate partner</strong> van Amare Global. Wij zijn geen onderdeel van Amare Global zelf. Dit betekent dat wij vrij zijn om eerlijke reviews en advies te geven — zonder inmenging van het moederbedrijf.
            </p>
            <p>
              Wanneer jij een product koopt via onze affiliate links, ontvangen wij een kleine commissie van Amare Global. Dit heeft <strong>geen enkele invloed</strong> op de prijs die jij betaalt. Het is onze manier om dit platform te onderhouden en te blijven investeren in waardevolle content.
            </p>
            <div className="bg-[var(--color-bg-soft)] rounded-3xl p-6 border border-[var(--color-border)] mt-6">
              <p className="text-sm font-bold text-[var(--color-text)] mb-2">
                ⚠️ Wettelijke disclaimer
              </p>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                De informatie op deze website is uitsluitend bedoeld voor educatieve doeleinden en is geen medisch advies. Supplementen zijn geen vervanging voor een gevarieerd dieet en een gezonde levensstijl. Raadpleeg altijd een arts voordat je begint met nieuwe supplementen, vooral bij zwangerschap, medicatiegebruik of bestaande gezondheidsklachten. Deze uitspraken zijn niet beoordeeld door de NVWA of de Europese Autoriteit voor Voedselveiligheid (EFSA).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-bg-soft)] text-center">
        <div className="container-page max-w-xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Klaar om te beginnen?
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">
            Ontdek de producten die het best bij jou passen. Begin met de Happy Juice Pack — onze meest populaire formule voor mentale energie.
          </p>
          <a
            href="#newsletter"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-primary)] text-white rounded-full text-sm font-bold hover:opacity-90 transition-all"
          >
            Ontvang gratis advies
          </a>
        </div>
      </section>
    </div>
  );
}
