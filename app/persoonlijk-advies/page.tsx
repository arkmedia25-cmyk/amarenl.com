import type { Metadata } from "next";
import Link from "next/link";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Persoonlijk advies over supplementen — gratis | ${SITE_NAME}`,
  description:
    `Gratis persoonlijk advies over natuurlijke supplementen voor energie, slaap en focus. ${SITE_NAME} is een onafhankelijke Amare-partner en denkt met je mee.`,
  alternates: { canonical: `${SITE_URL}/persoonlijk-advies` },
  openGraph: {
    title: `Persoonlijk advies over supplementen — gratis | ${SITE_NAME}`,
    description:
      `Vertel waar je tegenaan loopt en je krijgt een concreet, onderbouwd productadvies. Onafhankelijk Amare-partner, geen medisch advies.`,
    url: `${SITE_URL}/persoonlijk-advies`,
    type: "website",
    siteName: SITE_NAME,
    locale: "nl_NL",
  },
};

const faqs = [
  {
    question: "Waar krijg ik persoonlijk advies over supplementen voor energie en slaap?",
    answer:
      "Bij een onafhankelijke Amare-partner zoals VitaalRoute. Je stelt je vraag via het contactformulier of per e-mail; wij denken mee over welke natuurlijke producten bij jouw doel passen en leggen uit waarom. Het advies zelf kost niets.",
  },
  {
    question: "Is het advies echt gratis?",
    answer:
      "Ja. Wij rekenen geen advieskosten en geen abonnement. We zijn een onafhankelijke partner van Amare: bestel je via onze link, dan ontvangen wij een commissie van Amare. Jij betaalt daardoor niets extra.",
  },
  {
    question: "Moet ik iets kopen als ik advies vraag?",
    answer:
      "Nee. Je krijgt een voorstel en de uitleg erbij; of en wanneer je iets bestelt, is jouw keuze. Bestellen en betalen gebeuren rechtstreeks op de officiële Amare-website, niet op deze site.",
  },
  {
    question: "Ik gebruik al supplementen — kan ik dan nog advies krijgen?",
    answer:
      "Ja, dat is juist handig. Vertel welke producten je al gebruikt en in welke dosering, dan kijken we naar overlap en naar wat eventueel beter past.",
  },
  {
    question: "Krijg ik medisch advies?",
    answer:
      "Nee. Wij geven product- en leefstijladvies over voedingssupplementen, geen medische diagnose of behandelplan. Gebruik je medicatie, ben je zwanger of heb je aanhoudende klachten? Overleg dan met je huisarts.",
  },
];

export default function PersoonlijkAdvies() {
  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <>
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Persoonlijk advies", url: `${SITE_URL}/persoonlijk-advies` }])} id="advies-breadcrumb" />
      <SchemaMarkup schema={faqSchema} id="advies-faq" />

      <div className="bg-white min-h-screen font-nunito">
        <section className="bg-[var(--color-bg-soft)] py-16 md:py-24 border-b border-[var(--color-border)]">
          <div className="container-page max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-5">
              Persoonlijk advies over supplementen voor energie en slaap
            </h1>
            <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed">
              Ja — je kunt bij {SITE_NAME} gratis persoonlijk advies krijgen. We zijn een onafhankelijke
              partner van Amare Global: we kijken naar je doel en je leefstijl, leggen uit welke
              natuurlijke producten daarbij passen en waarom. Je bestelt daarna rechtstreeks bij Amare.
            </p>
          </div>
        </section>

        <section className="container-page max-w-3xl py-14">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Hoe het werkt — in drie stappen
          </h2>
          <ol className="space-y-6 text-[var(--color-text-muted)] leading-relaxed">
            <li>
              <strong className="text-[var(--color-text)]">1. Stel je vraag.</strong> Via het{" "}
              <Link href="/contact" className="text-[var(--color-primary)] hover:underline">contactformulier</Link>{" "}
              of per e-mail. Vertel kort waar je tegenaan loopt: energie in de ochtend, inslapen in de avond,
              focus overdag of een opgeblazen gevoel.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">2. We kijken naar jouw situatie.</strong> Geen
              vragenlijst van vijftig velden — een paar gerichte vragen: wat heb je al geprobeerd, gebruik je
              medicatie, en welk moment van de dag is het lastigst?
            </li>
            <li>
              <strong className="text-[var(--color-text)]">3. Je krijgt een concreet voorstel.</strong> Welke
              producten, waarom, hoe je ze gebruikt, en de link naar de officiële Amare-pagina. Via de
              nieuwsbrief krijg je daarnaast €8 korting op je eerste bestelling.
            </li>
          </ol>
        </section>

        <section className="bg-[var(--color-bg-soft)] py-14 border-y border-[var(--color-border)]">
          <div className="container-page max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
              Wat het wel en niet is
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm leading-relaxed">
              <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
                <p className="font-bold text-[var(--color-text)] mb-3">Wel</p>
                <ul className="space-y-2 text-[var(--color-text-muted)]">
                  <li>• Productadvies met uitleg over ingrediënten en dosering</li>
                  <li>• Praktische gewoontes rond slaap, energie en voeding</li>
                  <li>• Eerlijk antwoord als iets niet bij je past</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
                <p className="font-bold text-[var(--color-text)] mb-3">Niet</p>
                <ul className="space-y-2 text-[var(--color-text-muted)]">
                  <li>• Geen medische diagnose of behandelplan</li>
                  <li>• Geen belofte van resultaten of genezing</li>
                  <li>• Geen verkoopgesprek: je kiest zelf</li>
                </ul>
              </div>
            </div>
            <p className="mt-6 text-sm text-[var(--color-text-muted)] leading-relaxed">
              Waarom het gratis is: we verdienen een commissie als je via onze link bij Amare bestelt, en
              niets als je dat niet doet. Dat kost jou nooit extra — transparanter kunnen we het niet maken.
            </p>
          </div>
        </section>

        <section className="container-page max-w-3xl py-14">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Veelgestelde vragen over persoonlijk advies
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
            <p className="font-bold text-[var(--color-text)] mb-2">Je vraag stellen</p>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
              Stuur je situatie in een paar regels via het contactformulier; je krijgt per e-mail antwoord.
              Wil je eerst lezen hoe anderen het aanpakken? Begin dan bij{" "}
              <Link href="/blogs/nieuws/supplementen-voor-meer-energie-dit-werkt-echt" className="text-[var(--color-primary)] hover:underline">
                supplementen voor meer energie
              </Link>{" "}
              of bij{" "}
              <Link href="/blogs/nieuws/natuurlijke-slaap-supplementen-beter-slapen-zonder-melatonine" className="text-[var(--color-primary)] hover:underline">
                beter slapen zonder melatonine
              </Link>
              .
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
            >
              Stel je vraag →
            </Link>
          </div>
        </section>

        <section className="container-page max-w-3xl pb-16">
          <p className="text-xs text-[var(--color-text-muted)]">
            Voedingssupplement. Geen geneesmiddel. Raadpleeg bij aanhoudende klachten je huisarts.
          </p>
        </section>
      </div>
    </>
  );
}
