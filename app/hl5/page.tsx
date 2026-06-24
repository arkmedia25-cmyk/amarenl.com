import type { Metadata } from "next";
import Image from "next/image";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { getProduct } from "@/lib/products";
import {
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "HL5 Collageen Kopen — Huid, Haar & Nagels Van Binnenuit | AmareNL",
  description:
    "Amare HL5 met 5 g gehydrolyseerd collageen (Type 1 & 3) per portie — vloeibare formule voor maximale opname. Huid, haar, nagels en gewrichten. Direct van Amare — premium kwaliteit.",
  alternates: { canonical: "/hl5" },
  openGraph: {
    title: "HL5 Collageen Kopen — Huid, Haar & Nagels Van Binnenuit | AmareNL",
    description: "Amare HL5 met 5 g gehydrolyseerd collageen per portie — vloeibare formule voor maximale opname.",
    url: "/hl5",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HL5 Collageen Kopen — Huid, Haar & Nagels Van Binnenuit | AmareNL",
    description: "Amare HL5 met 5 g gehydrolyseerd collageen per portie — vloeibare formule voor maximale opname.",
    images: ["/images/og-default.jpg"],
  },
}

const faqs = [
  {
    question: "Wat is het verschil tussen HL5 collageen en collageenpoeder?",
    answer:
      "HL5 is een vloeibare collageenformule met 5 g gehydrolyseerde collageenpeptiden (Type 1 & 3) per sachet. Vloeibaar collageen wordt aanzienlijk sneller opgenomen dan poeders of capsules — tot 90% binnen 6 uur. HL5 is daarnaast lactosevrij, bevat geen toegevoegde suikers, en is gemaakt van grasgevoerd collageen. De perziksmaak maakt het een prettige dagelijkse toevoeging aan je routine.",
  },
  {
    question: "Hoe lang duurt het voordat ik resultaat zie van HL5?",
    answer:
      "Veel gebruikers ervaren na 8-12 weken dagelijks gebruik zichtbare verbeteringen in huidelasticiteit en hydratatie. Voor nagels merk je vaak al na 4-6 weken verschil — ze worden sterker en breken minder snel. Voor optimale resultaten wordt een kuur van 3-6 maanden aangeraden, in combinatie met gezonde voeding en voldoende hydratatie. Collageen werkt cumulatief: hoe langer je het gebruikt, hoe beter de resultaten.",
  },
  {
    question: "Kan ik HL5 combineren met andere Amare producten?",
    answer:
      "Ja, HL5 combineert uitstekend met de Skin to Mind™ collectie voor uitwendige huidverzorging — zo verzorg je je huid van binnen en van buiten. Ook met Sunrise (vitamine C) is HL5 een goede combinatie, omdat vitamine C bijdraagt aan de normale collageenvorming in het lichaam. De Rootist haarverzorgingslijn vormt samen met HL5 een complete aanpak voor haar en nagels.",
  },
  {
    question: "Waarom verliest mijn lichaam collageen?",
    answer:
      "Vanaf je 25e levensjaar neemt de natuurlijke collageenproductie met ongeveer 1% per jaar af. Roken, overmatige blootstelling aan UV-straling, een dieet met veel suiker en chronische stress kunnen dit proces versnellen. Collageen is het meest voorkomende eiwit in het lichaam — Type 1 collageen alleen al maakt 90% uit van al het collageen. Suppletie kan helpen om het natuurlijke verlies aan te vullen.",
  },
  {
    question: "Is HL5 geschikt voor veganisten?",
    answer:
      "Nee, HL5 is niet geschikt voor veganisten. Het collageen is afkomstig van runderen (grasgevoerd). HL5 is wel lactosevrij en bevat geen gluten of soja. Voor veganisten biedt Amare Origin — een 100% plantaardige eiwitshake met mineralen die onder meer calcium, magnesium en zink levert voor botten en huid.",
  },
  {
    question: "Kan ik dit product gebruiken in combinatie met medicatie?",
    answer:
      "Raadpleeg altijd eerst je arts voordat je supplementen combineert met voorgeschreven medicatie. Hoewel Amare producten gemaakt zijn met natuurlijke ingrediënten, kunnen interacties met bepaalde medicijnen niet worden uitgesloten. Je arts kent jouw medische geschiedenis en kan het beste adviseren.",
  },
];

const ingredientGroups = [
  {
    group: "Collageenpeptiden",
    items: "Gehydrolyseerd collageen Type 1 & 3 — grasgevoerd, opgesplitst in kleine peptiden voor optimale absorptie",
    amount: "5 g",
    purpose: "Structurele ondersteuning voor huid, haar, nagels, botten en bindweefsel",
  },
  {
    group: "Eiwit",
    items: "Collageenpeptiden",
    amount: "5 g",
    purpose: "Eiwit draagt bij aan behoud van normale botten",
  },
  {
    group: "Prebiotica & Zuur",
    items: "Fructo-oligosachariden, Appelciderazijn",
    amount: "—",
    purpose: "Prebiotische vezels en appelciderazijn voor darmcomfort",
  },
  {
    group: "Smaak & Zoetstof",
    items: "Erythritol, Siciliaans citroenextract, natuurlijk perzikaroma",
    amount: "—",
    purpose: "Natuurlijke zoetstof — lagere bloedsuikerstijging dan suiker",
  },
];

export default function HL5Page() {
  const product = getProduct("hl5-2-pack");
  const productImage =
    product?.image ||
    "https://amarecdn.azureedge.net/webassets/web/prod/products/HL5-Peach-2pk-EU-800.jpg";

  const productSchema = generateProductSchema({
    name: "Amare HL5 2-Pack",
    nameNL: "Amare HL5 2-Pack",
    description:
      "Amare HL5 levert 5 gram grasgevoerd, gehydrolyseerd collageen (Type 1 & 3) per portie in vloeibare vorm voor maximale opname. Type 1 collageen vormt 90% van al het collageen in het lichaam — essentieel voor huid, haar, nagels, botten en bindweefsel. Perzik smaak, lactosevrij.",
    image: productImage,
    slug: "hl5",
    priceRetail: 144.90,
    priceSubscription: 130.42,
    ratingValue: 4.5,
    ratingCount: 500,
    affiliateUrl: "https://www.amare.com/2075008/nl-nl/hl5-peach-2pack",
  });

  const combinedSchema = combineSchemas(
    productSchema,
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "HL5", url: "/hl5" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="hl5-schema" />

      {/* ── Breadcrumb ── */}
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">
          Home
        </a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">HL5</span>
      </nav>

      {/* ── HERO + CTA #1 ── */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
              <Image
                src={productImage}
                alt="Amare HL5 — 5 g gehydrolyseerd collageen Type 1 & 3, perzik smaak"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Bestseller
                </span>
                <span className="text-[9px] text-[var(--color-text-muted)]">
                  ⭐ 4.5/5 (500+ reviews)
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
                Amare <span className="text-[var(--color-primary)]">HL5</span>{" "}
                2-Pack
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">
                5 g gehydrolyseerd collageen (Type 1 & 3) per portie — vloeibare
                formule voor maximale opname.
              </p>
            <p className="mt-2 text-xs text-[var(--color-primary)] font-bold">🔗 <a href="/collageen-poeder" className="hover:underline">Lees: Collageen poeder — complete kopersgids →</a></p>

              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Voor huid, haar, nagels, botten en bindweefsel.{" "}
                <strong>Direct van Amare — premium kwaliteit.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <AffiliateCTA
                  label="Bestel bij Amare → €130,42/maand"
                  product="hl5-2-pack"
                  variant="primary"
                />
                <AffiliateCTA
                  label="Of eenmalig €144,90"
                  product="hl5-2-pack"
                  variant="secondary"
                />
              </div>
              <p className="text-[9px] text-[var(--color-text-muted)]">
                * Affiliate link — je betaalt hetzelfde bedrag. Abonnement op elk
                moment opzegbaar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wat is HL5? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat is HL5?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              <strong>HL5</strong> is Amare's vloeibare collageenformule — ontwikkeld
              om het lichaam te voorzien van hoogwaardige, gemakkelijk opneembare
              collageenpeptiden. Elke portie levert{" "}
              <strong>5 gram gehydrolyseerd collageen (Type 1 & 3)</strong>{" "}
              afkomstig van grasgevoerde runderen. Door het hydrolyseproces
              wordt collageen opgesplitst in kleinere peptiden die het lichaam
              efficiënt kan opnemen en transporteren naar de weefsels die het
              nodig hebben.
            </p>
            <p>
              Type 1 collageen is met afstand het meest voorkomende type — het
              maakt <strong>90% van al het collageen in het lichaam</strong> uit
              en vormt de structurele basis van huid, haar, nagels, botten,
              pezen en bindweefsel. Type 3 collageen werkt samen met Type 1 en
              is belangrijk voor de elasticiteit van de huid en de structuur van
              bloedvaten.
            </p>
            <p>
              Wat HL5 onderscheidt van gewone collageenpoeders is de{" "}
              <strong>vloeibare formule</strong>. De gehydrolyseerde peptiden
              worden tot 90% binnen 6 uur opgenomen — aanzienlijk sneller dan
              capsules of poeders die eerst moeten worden afgebroken in de maag.
              De perziksmaak en handige sachets maken het een moeiteloze
              dagelijkse toevoeging.
            </p>
            <p>
              Het 2-Pack bevat twee maandvoorraden — voordeliger dan losse
              aankoop en je hebt meteen voorraad voor een volledige kuur.
            </p>
          </div>
        </div>
      </section>

      {/* ── Voor wie is dit? ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Voor wie is HL5 geschikt?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "✨",
                title: "Vrouwen & mannen vanaf 25 jaar",
                desc: "Die de natuurlijke afname van collageenproductie willen aanvullen — voor huidelasticiteit, haarglans en nagelsterkte.",
              },
              {
                icon: "🏃",
                title: "Sporters met gewrichtsbelasting",
                desc: "Die collageen willen gebruiken voor het behoud van soepele gewrichten en sterk bindweefsel bij intensieve training.",
              },
              {
                icon: "💇",
                title: "Wie dunner wordend haar of broze nagels heeft",
                desc: "Die van binnenuit de bouwstenen willen leveren voor sterker haar en nagels die minder snel breken.",
              },
              {
                icon: "🌿",
                title: "Gezondheidsbewuste levensgenieters",
                desc: "Die een schone collageenformule zoeken — grasgevoerd, lactosevrij, geen toegevoegde suikers, met natuurlijke zoetstof.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-[var(--color-border)]"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wat zit erin? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat zit erin? — Ingrediënten per dagelijkse portie
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--color-primary)] text-left">
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                    Groep
                  </th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                    Ingrediënten
                  </th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                    Hoeveelheid
                  </th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                    Functie
                  </th>
                </tr>
              </thead>
              <tbody>
                {ingredientGroups.map((g, i) => (
                  <tr key={i} className="border-b border-[var(--color-border)]">
                    <td className="py-3 px-4 font-bold text-[var(--color-text)] align-top">
                      {g.group}
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">
                      {g.items}
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">
                      {g.amount}
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">
                      {g.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Hoe gebruik je het? ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Hoe gebruik je HL5?
          </h2>
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Schud het sachet goed voor gebruik
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    De actieve ingrediënten kunnen zich onderin verzamelen. Even
                    schudden zorgt voor een gelijkmatige verdeling.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Neem 1 sachet (30 ml) per dag
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Direct uit het sachet drinken of mengen met water. Het kan
                    's ochtends, voor het slapen of tussen maaltijden — kies
                    het moment dat het beste in je routine past.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Blijf consistent — minimaal 8-12 weken
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Collageen werkt cumulatief. Je lichaam bouwt het geleidelijk
                    op in de weefsels. De eerste zichtbare resultaten verschijnen
                    meestal na 8-12 weken dagelijks gebruik. Voor optimale
                    resultaten wordt een kuur van 3-6 maanden aanbevolen.
                  </p>
                </div>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]">
              <strong>⏰ Tijdsinvestering:</strong> Nog geen 30 seconden per dag.
              <br />
              <strong>👤 Geschikt voor:</strong> Volwassenen en jongeren vanaf
              12 jaar.
              <br />
              <strong>⚠ Niet geschikt voor:</strong> Veganisten (bevat dierlijk
              collageen).
              <br />
              <strong>📦 Inhoud:</strong> 2-Pack = 60 sachets (2 maanden
              voorraad).
            </div>
          </div>
        </div>
      </section>

      {/* ── Wat kun je verwachten? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat kun je verwachten?
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">
            Resultaten verschillen per persoon, maar dit is wat veel gebruikers
            rapporteren bij consistent dagelijks gebruik:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                week: "Week 4-6",
                title: "Eerste signalen",
                items: [
                  "Nagels voelen sterker aan",
                  "Minder broze nagelpunten",
                  "Lichte verbetering huidhydratatie",
                ],
              },
              {
                week: "Week 8-12",
                title: "Zichtbaar resultaat",
                items: [
                  "Zichtbaar verbeterde huidelasticiteit",
                  "Haar glanst meer en voelt voller",
                  "Nagels breken minder snel",
                ],
              },
              {
                week: "Maand 3-6",
                title: "Optimale resultaten",
                items: [
                  "Consistente huidverbetering",
                  "Sterker haar met minder uitval",
                  "Soepele gewrichten bij beweging",
                ],
              },
            ].map((phase, i) => (
              <div
                key={i}
                className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]"
              >
                <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">
                  {phase.week}
                </div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-2">
                  {phase.title}
                </h3>
                <ul className="space-y-1">
                  {phase.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-xs text-[var(--color-text-muted)] flex gap-2"
                    >
                      <span className="text-[var(--color-primary)]">✓</span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[var(--color-text-muted)] italic">
            * Deze ervaringen zijn gebaseerd op gebruikersrapportages en zijn
            niet beoordeeld door de NVWA. Individuele resultaten kunnen
            variëren. Voedingssupplementen zijn geen vervanging voor een
            gevarieerd dieet en gezonde levensstijl.
          </p>
        </div>
      </section>

      {/* ── CTA #2 (Midden) ── */}
      <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">
            Investeer in je huid, haar en nagels — van binnenuit
          </h2>
          <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
            Probeer HL5 30 dagen risicovrij. Niet tevreden? Geld terug.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <AffiliateCTA
              label="Bestel nu — Abonnement €130,42/maand"
              product="hl5-2-pack"
              variant="urgency"
            />
          </div>
          <p className="mt-4 text-[10px] text-white/60">
            🛡️ 30 dagen geld-terug-garantie &middot; 🚚 Gratis verzending vanaf
            €175 &middot; 📦 Direct van Amare
          </p>
        </div>
      </section>

      {/* ── Prijzen ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Prijzen en besparingen
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[var(--color-bg-soft)] rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">
                Abonnement — Bespaar 10%
              </div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
                €130,42
                <span className="text-sm font-normal text-[var(--color-text-muted)]">
                  /maand
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Elke maand automatisch geleverd. Op elk moment opzegbaar.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ €14,48 goedkoper per maand</li>
                <li>✓ Nooit zonder voorraad</li>
                <li>✓ Gratis verzending</li>
              </ul>
              <AffiliateCTA
                label="Start abonnement →"
                product="hl5-2-pack"
                variant="primary"
              />
            </div>
            <div className="rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Eenmalige aankoop
              </div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
                €144,90
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Eenmalig bestellen, geen verplichtingen.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ Vrijblijvend</li>
                <li>✓ 2 maanden voorraad (60 sachets)</li>
                <li>✓ Verzending €4,95</li>
              </ul>
              <AffiliateCTA
                label="Eenmalig bestellen →"
                product="hl5-2-pack"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Veelgestelde vragen ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">
            Veelgestelde vragen
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-xl border border-[var(--color-border)] group"
              >
                <summary className="p-5 font-bold text-sm text-[var(--color-text)] cursor-pointer hover:text-[var(--color-primary)] transition-colors list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-[var(--color-primary)] text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA #3 (Onderaan) ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-2xl text-center">
          <div className="bg-[var(--color-bg-soft)] rounded-2xl p-8 border border-[var(--color-border)]">
            <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3">
              Geef je huid, haar en nagels wat ze nodig hebben
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
              HL5 levert 5 g grasgevoerd collageen per portie — de bouwsteen voor
              een stralende huid, sterk haar en gezonde nagels. 30 dagen
              risicovrij proberen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <AffiliateCTA
                label="Bestel HL5 bij Amare →"
                product="hl5-2-pack"
                variant="primary"
              />
              <AffiliateCTA
                label="Of bekijk alle producten"
                product=""
                variant="secondary"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              <span>🛡️ 30 dagen garantie</span>
              <span className="text-[var(--color-border)]">|</span>
              <span>🚚 Wetenschappelijk onderbouwd</span>
              <span className="text-[var(--color-border)]">|</span>
              <span>🌿 Natuurlijke ingrediënten</span>
              <span className="text-[var(--color-border)]">|</span>
              <span>⭐ 10.000+ klanten</span>
            </div>
            <p className="mt-6 text-[9px] text-[var(--color-text-muted)]">
              * Affiliate link — je betaalt hetzelfde bedrag, wij ontvangen een commissie.
              <br />
              * Deze uitspraken zijn niet beoordeeld door de NVWA. Voedingssupplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.
              <br />* Raadpleeg bij aanhoudende klachten altijd een arts. Niet geschikt voor veganisten. Niet geschikt voor kinderen jonger dan 12 jaar.
            </p>
          </div>
        </div>
      
      <StickyMobileCTA product="hl5-peach-2pack" subscriptionPrice="€130,42" />
</section>
    </>
  );
}
