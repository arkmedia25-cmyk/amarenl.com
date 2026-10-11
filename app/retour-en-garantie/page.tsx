import type { Metadata } from "next";
import Link from "next/link";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Retourneren & garantie — 30 dagen geld-terug | ${SITE_NAME}`,
  description:
    "Hoe retourneren en garantie werken als je via VitaalRoute bij Amare bestelt: 30 dagen geld-terug-garantie, waar je een retour aanvraagt, levering uit het Nederlandse magazijn en wie je waarvoor contacteert.",
  alternates: { canonical: `${SITE_URL}/retour-en-garantie` },
  openGraph: {
    title: `Retourneren & garantie — 30 dagen geld-terug | ${SITE_NAME}`,
    description:
      "30 dagen geld-terug-garantie via Amare Global, levering uit het Nederlandse magazijn en stap voor stap hoe je een retour aanvraagt.",
    url: `${SITE_URL}/retour-en-garantie`,
    type: "website",
    siteName: SITE_NAME,
    locale: "nl_NL",
  },
};

const faqs = [
  {
    question: "Kan ik mijn Amare-bestelling retourneren als ik niet tevreden ben?",
    answer:
      "Ja. Amare Global geeft 30 dagen geld-terug-garantie op de producten die je via onze partnerlink bestelt. Ben je niet tevreden, dan vraag je binnen die 30 dagen een retour aan en krijg je het aankoopbedrag terug.",
  },
  {
    question: "Hoe vraag ik een retour of garantie aan?",
    answer:
      "Stuur je ordernummer en de reden kort naar ons via het contactformulier. Wij zetten de aanvraag samen met de klantenservice van Amare in gang en laten je weten wat de volgende stap is. Je kunt de aanvraag ook rechtstreeks bij de Amare-klantenservice doen; je ordernummer staat in je bevestigingsmail.",
  },
  {
    question: "Hoe lang duurt de levering en wat kost verzending?",
    answer:
      "Bestellingen worden vanuit het Nederlandse magazijn door Amare Global verzonden en zijn in de regel binnen 1 tot 2 werkdagen bezorgd. De exacte verzendkosten en de levertijd voor jouw adres zie je bij het afrekenen in de officiële Amare-shop, voordat je betaalt.",
  },
  {
    question: "Geldt de garantie ook als ik het product al gebruikt heb?",
    answer:
      "Volgens het garantiebeleid van Amare geldt de 30-daagse geld-terug-garantie ook wanneer je het product al hebt geprobeerd — ook met een (deels) lege verpakking. De volledige, juridische voorwaarden staan in de officiële Amare-voorwaarden; wij nemen ze hier niet over.",
  },
  {
    question: "Waar bestel en betaal ik: bij jullie of bij Amare?",
    answer:
      "Bij Amare. Je bestelt en betaalt rechtstreeks op de officiële Amare-website; wij zijn een onafhankelijke partner en ontvangen een commissie van Amare als je via onze link bestelt. Voor jou verandert er niets aan de prijs, en de garantie loopt via Amare.",
  },
  {
    question: "Ik heb een klacht over mijn bestelling — bij wie meld ik dat?",
    answer:
      "Meld een klacht over de levering of het product bij de Amare-klantenservice; zij gaan over de verzending en de betaling. Loopt het niet soepel of weet je niet waar je moet beginnen? Stuur ons een bericht via het contactformulier, dan kijken we met je mee.",
  },
];

export default function RetourEnGarantie() {
  const faqSchema = generateFAQSchema(
    faqs.map((f) => ({ question: f.question, answer: f.answer })),
  );

  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Retour & garantie", url: `${SITE_URL}/retour-en-garantie` },
        ])}
        id="retour-breadcrumb"
      />
      <SchemaMarkup schema={faqSchema} id="retour-faq" />

      <div className="bg-white min-h-screen font-nunito">
        <section className="bg-[var(--color-bg-soft)] py-16 md:py-24 border-b border-[var(--color-border)]">
          <div className="container-page max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-5">
              Retourneren en garantie: hoe werkt het bij {SITE_NAME}?
            </h1>
            <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
              Kort antwoord: je bestelt bij Amare, en Amare geeft <strong>30 dagen geld-terug-garantie</strong> op
              je bestelling. Ben je niet tevreden, dan vraag je binnen die 30 dagen een retour aan en krijg je je
              geld terug — ook als je het product al hebt gebruikt. Wij zijn een onafhankelijke Amare-partner:
              wij adviseren en helpen bij de aanvraag, de betaling en de garantie lopen rechtstreeks via Amare.
            </p>
          </div>
        </section>

        <section className="container-page max-w-3xl py-14">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Zo werkt het — in drie stappen
          </h2>
          <ol className="space-y-6 text-[var(--color-text-muted)] leading-relaxed">
            <li>
              <strong className="text-[var(--color-text)]">1. Je bestelt op de officiële Amare-website.</strong>{" "}
              Via onze partnerlink kom je in de officiële shop uit, met eventueel je €8 korting op de eerste
              bestelling. Betalen doe je daar, niet bij ons.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">2. Wordt het bezorgd?</strong> Amare verzendt vanuit
              het Nederlandse magazijn; in de regel is je pakket binnen 1 tot 2 werkdagen onderweg. Bewaar je
              bevestigingsmail met het ordernummer — dat nummer heb je nodig voor een retour.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">3. Niet tevreden?</strong> Meld je retour binnen 30
              dagen via het{" "}
              <Link href="/contact" className="text-[var(--color-primary)] hover:underline">
                contactformulier
              </Link>{" "}
              of rechtstreeks bij de Amare-klantenservice. Wij helpen je met de aanvraag; Amare verwerkt de
              terugbetaling.
            </li>
          </ol>
        </section>

        <section className="bg-[var(--color-bg-soft)] py-14 border-y border-[var(--color-border)]">
          <div className="container-page max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
              Wat wij wel en niet doen
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm leading-relaxed">
              <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
                <p className="font-bold text-[var(--color-text)] mb-3">Wel</p>
                <ul className="space-y-2 text-[var(--color-text-muted)]">
                  <li>• Advies over welke producten bij je doel passen</li>
                  <li>• Uitleg over gebruik en dosering</li>
                  <li>• Meekijken en helpen bij een retour of garantieaanvraag</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
                <p className="font-bold text-[var(--color-text)] mb-3">Niet</p>
                <ul className="space-y-2 text-[var(--color-text-muted)]">
                  <li>• Geen verkoop of betaling op deze site — dat gaat via Amare</li>
                  <li>• Geen medisch advies of behandelplan</li>
                  <li>• Geen eigen garantievoorwaarden: die van Amare gelden</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-sm text-[var(--color-text-muted)] leading-relaxed">
              Waarom we dit gewoon opschrijven: we verdienen een commissie als je via onze link bestelt, en niets
              als je dat niet doet. Onze{" "}
              <Link href="/persoonlijk-advies" className="text-[var(--color-primary)] hover:underline">
                persoonlijke advies
              </Link>{" "}
              is gratis en verplicht je tot niets.
            </p>
          </div>
        </section>

        <section className="container-page max-w-3xl py-14">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Veelgestelde vragen over retourneren en garantie
          </h2>
          <div className="space-y-5">
            {faqs.map((f) => (
              <div key={f.question} className="border border-[var(--color-border)] rounded-xl p-5">
                <h3 className="font-bold text-[var(--color-text)] mb-2">{f.question}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)] p-6">
            <p className="font-bold text-[var(--color-text)] mb-2">Hulp nodig bij je bestelling?</p>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
              Stuur je ordernummer en je vraag via het contactformulier. Wil je eerst rustig lezen wat anderen
              gebruiken? Begin dan bij{" "}
              <Link
                href="/blogs/nieuws/beste-probiotica-2026-kopen-vergelijken"
                className="text-[var(--color-primary)] hover:underline"
              >
                probiotica vergelijken
              </Link>{" "}
              of bekijk{" "}
              <Link href="/over-ons" className="text-[var(--color-primary)] hover:underline">
                wie wij zijn
              </Link>
              .
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
            >
              Contact opnemen →
            </Link>
          </div>
        </section>

        <section className="container-page max-w-3xl pb-16">
          <p className="text-xs text-[var(--color-text-muted)]">
            Voedingssupplement. Geen geneesmiddel. Deze informatie vervangt de officiële voorwaarden van Amare
            Global niet. Raadpleeg bij aanhoudende klachten je huisarts.
          </p>
        </section>
      </div>
    </>
  );
}
