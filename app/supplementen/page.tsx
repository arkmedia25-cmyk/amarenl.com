import Link from "next/link";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from "@/lib/schema";
import { getAllProducts, getProductPageUrl } from "@/lib/products";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Supplementen kopen | Alle Amare producten`,
  description:
    "Alle Amare supplementen op één plek: vitaminen en mineralen, collageen, probiotica, omega 3 en nootropica. Vergelijk prijs en ingrediënten — €8 korting en 30 dagen garantie.",
  alternates: { canonical: "/supplementen" },
  openGraph: {
    title: `Supplementen kopen — het volledige Amare-assortiment | ${SITE_NAME}`,
    description: "Vitaminen, collageen, probiotica en nootropica: alle 40 Amare producten met prijs en ingrediënten.",
    url: "/supplementen",
    type: "website",
    siteName: `${SITE_NAME}`,
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
};

const SECTIONS: { key: string; title: string; intro: string; href: string; linkLabel: string }[] = [
  {
    key: "essentials",
    title: "Vitaminen, mineralen & omega 3",
    intro:
      "De dagelijkse basis: Sunrise met 9 vitaminen en superfoods, Sunset met omega 3 en vitamine D3, A en E, Nitro Xtreme met B-vitaminen en zink, en de voordeelbundels.",
    href: "/essentials",
    linkLabel: "Alle essentials bekijken",
  },
  {
    key: "hersenen",
    title: "Hersenen, focus & energie",
    intro:
      "Voor focus en mentale energie: EDGE+ (met en zonder cafeïne), Energy+, ON focus-shot, Ignite for HIM en de Happy Juice Pack-bundels.",
    href: "/beste-probiotica",
    linkLabel: "Probiotica & darm-hersen-as",
  },
  {
    key: "darmen",
    title: "Darmen & spijsvertering",
    intro: "Probiotica en prebiotica voor je darmflora: MentaBiotics met Cerebiome en magnesium, en Restore als poeder met vezels.",
    href: "/darmgezondheid",
    linkLabel: "Alle darmproducten bekijken",
  },
  {
    key: "schoonheid",
    title: "Huid, haar & collageen",
    intro:
      "Vloeibaar collageen (HL5) en haarverzorging: shampoo, conditioner, serum en droogshampoo, plus de Skin to Mind-huidverzorging.",
    href: "/schoonheid",
    linkLabel: "Alle huid- en haarproducten bekijken",
  },
  {
    key: "pakketten",
    title: "Pakketten & bundels",
    intro: "Voordeelsets die meerdere producten combineren — van het Triangle of Wellness dag-nacht systeem tot het Brand Partner-startpakket.",
    href: "/pakketten",
    linkLabel: "Alle pakketten bekijken",
  },
];

const GUIDES = [
  { href: "/vitamine-d-supplement", label: "Vitamine D supplement" },
  { href: "/magnesium-supplement", label: "Magnesium supplement" },
  { href: "/collageen-poeder", label: "Collageen poeder" },
  { href: "/omega-3-supplement", label: "Omega 3 supplement" },
  { href: "/beste-probiotica", label: "Probiotica kiezen" },
  { href: "/supplementenwijzer", label: "Supplementenwijzer" },
];

const faqs = [
  {
    question: "Welke supplementen verkoopt Amare in Nederland?",
    answer:
      "Het assortiment bestaat uit vijf groepen: vitaminen en mineralen (Sunrise, Sunset, Nitro Xtreme), focus en energie (EDGE+, Energy+, ON, Ignite), darm en spijsvertering (MentaBiotics, Restore), huid en haar (HL5 collageen en de haarverzorgingslijn) en samengestelde pakketten. Op deze pagina staan alle 40 producten met een eigen pagina.",
  },
  {
    question: "Wat kosten de supplementen en waar bestel je ze?",
    answer:
      "De prijzen staan per product vermeld, zowel de eenmalige aankoop als het abonnementsvoordeel. Bestellen gaat rechtstreeks bij Amare via onze partnerlink; je betaalt dezelfde prijs als bij Amare zelf, met €8 korting op je eerste bestelling en 30 dagen niet-goed-geld-terug.",
  },
  {
    question: "Wat is het verschil tussen een abonnement en een eenmalige aankoop?",
    answer:
      "Bij een abonnement (Subscribe & Save) ontvang je het product periodiek tegen een lagere stukprijs en kun je op elk moment opzeggen. Bij een eenmalige aankoop bestel je zonder vervolgverplichting. De korting per variant staat bij het product.",
  },
  {
    question: "Zijn de supplementen geschikt voor dagelijks gebruik?",
    answer:
      "De producten zijn bedoeld als aanvulling op een gevarieerd voedingspatroon. Op elke productpagina staat de dosering en het moment van inname. Gebruik je medicatie, ben je zwanger of geef je borstvoeding, overleg dan met je arts.",
  },
  {
    question: "Hoe snel worden producten geleverd?",
    answer:
      "Bestellingen worden door Amare Europe vanuit Nederland verzonden met standaard Europese verzending. De levertijd en verzendkosten zie je bij het afrekenen in de Amare-shop.",
  },
];

export default function SupplementenPage() {
  const all = getAllProducts();
  const byCategory = (cat: string) => all.filter((p) => p.category === cat);

  return (
    <>
      <SchemaMarkup
        schema={combineSchemas(
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Supplementen", url: "/supplementen" },
          ]),
          generateFAQSchema(faqs)
        )}
        id="supplementen-schema"
      />

      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <nav className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
            <Link href="/">Home</Link> <span className="mx-1">/</span> <span>Supplementen</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Supplementen van Amare — het volledige assortiment
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            Alle 40 Amare-supplementen op één pagina: vitaminen en mineralen, collageen, probiotica, omega 3 en
            nootropica. Per product vind je de samenstelling, dosering en prijs — eenmalig of met
            abonnementsvoordeel. Je bestelt rechtstreeks bij Amare; wij leggen uit wat er in zit en voor wie het
            bedoeld is.
          </p>
        </div>
      </section>

      {SECTIONS.map((section) => {
        const items = byCategory(section.key);
        if (!items.length) return null;
        return (
          <section key={section.key} className="py-10 bg-[var(--color-bg-soft)]" id={section.key}>
            <div className="container-page max-w-4xl">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)]">{section.title}</h2>
                <Link href={section.href} className="text-xs font-bold text-[var(--color-primary)] underline">
                  {section.linkLabel} →
                </Link>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-6 max-w-2xl leading-relaxed">{section.intro}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {items.map((p) => {
                  const url = getProductPageUrl(p.slug);
                  const price = p.pricing?.oneTime ?? p.pricing?.subscription;
                  return (
                    <li key={p.slug} className="bg-white rounded-xl border border-[var(--color-border)] p-4">
                      <Link href={url ?? "/supplementen"} className="font-bold text-sm text-[var(--color-text)] hover:text-[var(--color-primary)]">
                        {p.name}
                      </Link>
                      <p className="text-[11px] text-[var(--color-text-muted)] mt-1 leading-relaxed">
                        {p.descriptionNL || p.taglineNL}
                      </p>
                      {price ? (
                        <p className="text-[11px] font-bold text-[var(--color-primary)] mt-2">
                          vanaf €{price.toFixed(2).replace(".", ",")}
                          {p.pricing?.subscription && p.pricing.subscription !== price ? " (abonnement)" : ""}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="py-12 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Twijfel je welk supplement past?
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
            Deze gidsen gaan dieper in op één nutriënt of klacht, met het verschil tussen vormen, doseringen en de
            producten die erbij passen.
          </p>
          <ul className="flex flex-wrap gap-2">
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="inline-block px-4 py-2 rounded-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] text-[11px] font-bold text-[var(--color-text)]"
                >
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">
            Veelgestelde vragen over de supplementen
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group">
                <summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">
        * Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA. Supplementen
        zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl. Prijzen en
        beschikbaarheid kunnen bij Amare wijzigen.
      </p>
    </>
  );
}
