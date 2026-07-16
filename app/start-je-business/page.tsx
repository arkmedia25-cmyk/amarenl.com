import type { Metadata } from "next";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Start Je Eigen Wellness Business — Verdien met Amare | AmareNL",
  description:
    "Wil je extra inkomen naast je baan? Start je eigen wellness business met het Triangle Marketing Pack. Alles wat je nodig hebt in één pakket. Ontdek hoe het werkt.",
  alternates: { canonical: "/start-je-business" },
  openGraph: {
    title: "Start Je Eigen Wellness Business — Verdien met Amare | AmareNL",
    description: "Extra inkomen met wellness producten? Begin vandaag nog.",
    url: "/start-je-business",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Je Eigen Wellness Business — Verdien met Amare | AmareNL",
    description: "Extra inkomen met wellness producten? Begin vandaag nog.",
    images: ["/images/og-default.jpg"],
  },
};

const faqs = [
  {
    question: "Wat is het Triangle Marketing Pack precies?",
    answer:
      "Het Triangle Marketing Pack is het complete startpakket voor iedereen die een eigen wellness business wil beginnen met Amare. Het bevat 3x Triangle of Wellness (dag-nacht systeem), extra Sunrise, Sunset en Nitro Xtreme — plus downloadbare marketingmaterialen. Alles wat je nodig hebt om te starten met delen en verdienen.",
  },
  {
    question: "Hoeveel kan ik verdienen als Brand Partner?",
    answer:
      "Dat hangt helemaal van jou af. De meeste Brand Partners beginnen naast hun baan en verdienen €200-800 per maand bij. Sommigen bouwen het uit tot een fulltime inkomen. Je verdient commissie op je eigen verkopen én op de verkopen van je team. Er is geen minimum — je bepaalt zelf hoeveel tijd je erin steekt.",
  },
  {
    question: "Moet ik ervaring hebben met sales of marketing?",
    answer:
      "Nee. De meeste succesvolle Brand Partners hadden nul ervaring toen ze begonnen. Je deelt wat je zelf gebruikt en waar je enthousiast over bent. AmareNL helpt je met content, een persoonlijke website en marketingmateriaal — zodat jij je kunt focussen op delen en connecten met mensen.",
  },
  {
    question: "Wat als de producten niet voor mij werken?",
    answer:
      "Amare biedt 30 dagen niet-tevreden-geld-terug garantie. Als de producten niet bij je passen, krijg je je geld terug. Geen risico — je probeert het gewoon uit. De meeste mensen merken binnen 2-4 weken verschil in energie, slaap en focus.",
  },
  {
    question: "Hoe begin ik?",
    answer:
      "Stap 1: Bestel het Triangle Marketing Pack via onderstaande link. Stap 2: Gebruik de producten zelf — ervaar het verschil. Stap 3: Deel je ervaring met vrienden, familie en online. Stap 4: Bouw je eigen team en verdien commissie. Het klinkt simpel — en dat is het ook. Je deelt wat werkt.",
  },
  {
    question: "Is dit een piramidespel?",
    answer:
      "Absoluut niet. Amare is een legitiem direct sales bedrijf met echte, hoogwaardige producten. Je verdient geld door producten te verkopen — niet door alleen maar mensen in te schrijven. Het Triangle Marketing Pack is een fysiek product dat je ontvangt en gebruikt. Dit is geen 'snel rijk' schema — het is een echt bedrijf dat je opbouwt met echte producten.",
  },
];

const benefits = [
  {
    title: "Flexibel naast je baan",
    desc: "Begin parttime, bouw op in jouw tempo. Geen targets, geen verplichte uren. Jij bepaalt wanneer en hoeveel je werkt.",
    icon: "🕐",
  },
  {
    title: "Compleet startpakket",
    desc: "Het Triangle Marketing Pack bevat alles: 3 maanden productvoorraad, marketingmateriaal, productinformatie. Je kunt vandaag nog beginnen.",
    icon: "📦",
  },
  {
    title: "Bewezen producten",
    desc: "Je deelt producten die wetenschappelijk onderbouwd zijn en die je zelf gebruikt. Geen loze verkooppraatjes — je deelt wat écht werkt.",
    icon: "🔬",
  },
  {
    title: "Persoonlijke begeleiding",
    desc: "Je staat er niet alleen voor. Je krijgt support van ervaren Brand Partners en toegang tot een community van gelijkgestemden.",
    icon: "🤝",
  },
  {
    title: "Ongelimiteerd inkomen",
    desc: "Er is geen plafond. Hoe meer je deelt, hoe meer je verdient. Plus: je bouwt een team dat blijft verkopen — passief inkomen.",
    icon: "💰",
  },
  {
    title: "30 dagen geld-terug",
    desc: "Probeer de producten zonder risico. Bevalt het niet? Geld terug. Je hebt niets te verliezen.",
    icon: "🛡️",
  },
];

const packContents = [
  { name: "3× Triangle of Wellness", desc: "Dag-nacht systeem: Sunrise, Nitro Xtreme, Sunset", icon: "🔺" },
  { name: "Amare Sunrise™", desc: "22 superfoods + 9 vitaminen voor natuurlijke ochtendenergie", icon: "☀️" },
  { name: "Amare Sunset™", desc: "Omega 3 + vitamine E voor hart, hersenen en diepe slaap", icon: "🌙" },
  { name: "Amare Nitro Xtreme™", desc: "Nonivrucht — helpt voedingsstoffen optimaal opnemen", icon: "⚡" },
  { name: "Marketingmateriaal", desc: "Downloadbare productinfo, deelbare content, training", icon: "📋" },
];

export default function StartJeBusinessPage() {
  return (
    <>
      <SchemaMarkup
        schema={combineSchemas(
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Start Je Business", url: "/start-je-business" },
          ]),
          generateFAQSchema(faqs)
        )}
        id="start-je-business-schema"
      />

      {/* Hero */}
      <section className="relative bg-[var(--color-bg-soft)] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                💼 Business Kans
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-text)] leading-tight mb-6">
                Start je eigen{" "}
                <span className="text-[var(--color-primary)]">wellness business</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-4 leading-relaxed">
                Verdien extra inkomen — of bouw een fulltime bedrijf — door premium wellness
                producten te delen die je zelf gebruikt. Het Triangle Marketing Pack geeft je
                alles wat je nodig hebt om vandaag nog te beginnen.
              </p>
              <p className="text-md text-[var(--color-text-muted)] mb-8 leading-relaxed">
                Geen saleservaring nodig. Geen targets. Geen ingewikkelde systemen. Gewoon
                delen wat werkt — en verdienen terwijl je deelt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <AffiliateCTA
                  label="Start Vandaag — Bestel Triangle Marketing Pack →"
                  product="triangle-marketing-pack"
                  variant="primary"
                />
                <a
                  href="#hoe-werkt-het"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors font-semibold"
                >
                  Hoe werkt het?
                </a>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-4">
                * Triangle Marketing Pack: €511,21. 30 dagen geld-terug garantie. Geen verplichtingen.
              </p>
            </div>
            <div className="relative hidden md:block">
              <div className="aspect-square bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-6">🚀</div>
                  <p className="text-2xl font-serif text-[var(--color-primary)] font-semibold">
                    "Ik begon parttime. <br />
                    Nu verdien ik €800/maand bij."
                  </p>
                  <p className="text-[var(--color-text-muted)] mt-3">— Lisa, 38, Rotterdam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text)] mb-6">
            Herken je dit?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
              <h3 className="text-lg font-semibold text-red-700 mb-3">😤 Zonder eigen business</h3>
              <ul className="space-y-2 text-[var(--color-text-muted)] text-sm">
                <li>❌ Vast salaris — geen controle over je inkomen</li>
                <li>❌ 9-tot-5, files, baas die je tijd bepaalt</li>
                <li>❌ Geen passief inkomen — stoppen = geen geld</li>
                <li>❌ Weinig tijd voor familie, hobby's, jezelf</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-green-700 mb-3">✅ Met Amare Business</h3>
              <ul className="space-y-2 text-[var(--color-text-muted)] text-sm">
                <li>✅ Jij bepaalt je inkomen — geen plafond</li>
                <li>✅ Werk wanneer en waar je wilt</li>
                <li>✅ Bouw een team → blijvend passief inkomen</li>
                <li>✅ Meer vrijheid, meer tijd voor wat écht telt</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hoe werkt het */}
      <section id="hoe-werkt-het" className="py-16 md:py-20 bg-[var(--color-bg-soft)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text)] text-center mb-12">
            Hoe werkt het?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Bestel je pakket", desc: "Begin met het Triangle Marketing Pack — jouw voorraad voor 3 maanden." },
              { step: "2", title: "Gebruik & ervaar", desc: "Probeer de producten zelf. Voel het verschil in energie, slaap en focus." },
              { step: "3", title: "Deel je verhaal", desc: "Vertel vrienden, familie en online wat deze producten voor jou doen." },
              { step: "4", title: "Verdien & bouw", desc: "Verdien commissie op verkopen. Bouw je team. Schaal je inkomen." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-[var(--color-text)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat zit erin */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text)] text-center mb-4">
            Wat zit er in het Triangle Marketing Pack?
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-12">
            Alles wat je nodig hebt om te starten — producten én marketingmateriaal
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {packContents.map((item) => (
              <div key={item.name} className="bg-[var(--color-bg-soft)] rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-[var(--color-text)] mb-1">{item.name}</h3>
                <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 rounded-2xl p-8 text-center">
            <p className="text-4xl font-bold text-[var(--color-primary)] mb-2">€511,21</p>
            <p className="text-[var(--color-text-muted)] mb-4">Eenmalige investering — 3 maanden productvoorraad</p>
            <AffiliateCTA
              label="Bestel Je Triangle Marketing Pack →"
              product="triangle-marketing-pack"
              variant="primary"
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-3">
              Abonnementsprijs. €567,44 eenmalig. Gratis verzending bij besteding boven €175.
            </p>
          </div>
        </div>
      </section>

      {/* Voordelen */}
      <section className="py-16 md:py-20 bg-[var(--color-bg-soft)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text)] text-center mb-12">
            Waarom de Amare Business?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-semibold text-[var(--color-text)] mb-2">{b.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Realistische verdiensten */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text)] text-center mb-8">
            Wat kun je realistisch verdienen?
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-10">
            Geen gouden bergen — wel een eerlijk en haalbaar plaatje
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[var(--color-primary)]">
                  <th className="text-left py-3 px-4 font-semibold text-[var(--color-text)]">Scenario</th>
                  <th className="text-center py-3 px-4 font-semibold text-[var(--color-text)]">Klanten/maand</th>
                  <th className="text-center py-3 px-4 font-semibold text-[var(--color-text)]">Team</th>
                  <th className="text-right py-3 px-4 font-semibold text-[var(--color-text)]">Inkomen/maand</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">🥉 Starter (parttime, 5u/week)</td>
                  <td className="text-center py-3 px-4">3</td>
                  <td className="text-center py-3 px-4">0</td>
                  <td className="text-right py-3 px-4 font-semibold text-[var(--color-primary)]">~€150</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">🥈 Groeier (parttime, 10u/week)</td>
                  <td className="text-center py-3 px-4">8</td>
                  <td className="text-center py-3 px-4">3</td>
                  <td className="text-right py-3 px-4 font-semibold text-[var(--color-primary)]">~€500</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">🥇 Pro (fulltime focus)</td>
                  <td className="text-center py-3 px-4">20</td>
                  <td className="text-center py-3 px-4">15</td>
                  <td className="text-right py-3 px-4 font-semibold text-[var(--color-primary)]">~€2.000+</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] text-center mt-4">
            * Dit zijn realistische schattingen op basis van gemiddelde bestelwaardes en commissiepercentages. 
            Jouw resultaten hangen af van jouw inzet. Dit is geen garantie op inkomen.
          </p>
        </div>
      </section>

      {/* Success stories */}
      <section className="py-16 md:py-20 bg-[var(--color-bg-soft)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text)] text-center mb-12">
            Dit zeggen anderen
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-3">👩‍💼</div>
              <p className="text-sm text-[var(--color-text-muted)] italic mb-4 leading-relaxed">
                "Ik werkte als administratief medewerker en zocht iets ernaast. Amare gaf me de
                flexibiliteit die ik zocht. Na 6 maanden verdiende ik genoeg om een dag minder
                te gaan werken. Beste beslissing ooit."
              </p>
              <p className="text-sm font-semibold text-[var(--color-text)]">Lisa, 38</p>
              <p className="text-xs text-[var(--color-text-muted)]">Rotterdam — Brand Partner sinds 2025</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-3">👨‍💻</div>
              <p className="text-sm text-[var(--color-text-muted)] italic mb-4 leading-relaxed">
                "Als IT'er zat ik de hele dag binnen. Ik had last van stress en weinig energie.
                Toen ik de producten zelf probeerde, was ik verkocht. Nu vertel ik erover en
                verdien ik er ook nog aan. Win-win."
              </p>
              <p className="text-sm font-semibold text-[var(--color-text)]">Mark, 45</p>
              <p className="text-xs text-[var(--color-text-muted)]">Utrecht — Brand Partner sinds 2024</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl mb-3">🧘‍♀️</div>
              <p className="text-sm text-[var(--color-text-muted)] italic mb-4 leading-relaxed">
                "Ik gaf yogales en mijn studenten vroegen altijd naar supplementen. Amare
                paste perfect bij wat ik al deed. Nu combineer ik mijn passie met een inkomen
                — zonder dat het als 'verkopen' voelt."
              </p>
              <p className="text-sm font-semibold text-[var(--color-text)]">Sanne, 31</p>
              <p className="text-xs text-[var(--color-text-muted)]">Amsterdam — Brand Partner sinds 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-text)] text-center mb-12">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-[var(--color-bg-soft)] rounded-xl p-6 cursor-pointer">
                <summary className="font-semibold text-[var(--color-text)] list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-[var(--color-primary)] text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-[var(--color-text-muted)] mt-4 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            Klaar om je eigen wellness business te starten?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Het Triangle Marketing Pack geeft je alles wat je nodig hebt. Producten, marketingmateriaal,
            training en support. Jij hoeft alleen maar te beginnen.
          </p>
          <AffiliateCTA
            label="Ja, Ik Start Mijn Business →"
            product="triangle-marketing-pack"
            variant="urgency"
          />
          <p className="text-white/60 text-xs mt-4">
            €511,21 • 30 dagen geld-terug garantie • Gratis verzending vanaf €175
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-[9px] text-[var(--color-text-muted)] leading-relaxed text-center">
            * Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA.
            Amarenl.com is een onafhankelijke Amare Brand Partner site. De inkomensvoorbeelden zijn
            gebaseerd op gemiddelde resultaten van actieve Brand Partners en vormen geen garantie.
            Jouw resultaten zijn afhankelijk van jouw inzet, netwerk en marktomstandigheden.
            Amare Global is een direct sales bedrijf. Lees de voorwaarden op amare.com.
          </p>
        </div>
      </section>
    </>
  );
}
