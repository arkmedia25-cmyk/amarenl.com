import Image from "next/image";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { getProduct } from "@/lib/products";
import {
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata = {
  title: "FIT20 Kopen — Wei + Collageen Eiwitpoeder Spierherstel | AmareNL",
  description:
    "FIT20 combineert grasgevoerd wei-isolaat met collageenpeptiden voor 20 g eiwit en 21 aminozuren per portie. Met magnesiumcitraat, MCT-olie en enzymen. Vanille smaak. Direct van Amare.",
};

const faqs = [
  {
    question: "Wat maakt FIT20 anders dan andere eiwitpoeders?",
    answer:
      "FIT20 combineert wei-isolaat met collageenpeptiden — de meeste eiwitpoeders bevatten alleen wei. Dit levert 21 aminozuren voor zowel spier- als bindweefselondersteuning. Bovendien bevat FIT20 magnesiumcitraat (27% RI) voor spierfunctie, MCT-oliepoeder voor snelle energie en toegevoegde enzymen voor optimale verteerbaarheid. De meeste standaard eiwitpoeders missen deze extra's.",
  },
  {
    question: "Is FIT20 geschikt bij lactose-intolerantie?",
    answer:
      "FIT20 bevat lactose uit wei-eiwit en is daardoor niet geschikt bij ernstige lactose-intolerantie. Bij lichte intolerantie kunnen de toegevoegde spijsverteringsenzymen helpen bij de vertering. Voor een volledig plantaardig alternatief zonder lactose raden we Amare Origin aan — een vegan eiwitshake met 23 g plantaardig eiwit per portie.",
  },
  {
    question: "Wanneer neem ik FIT20 het beste in voor optimaal spierherstel?",
    answer:
      "Het ideale moment is binnen 30 minuten na de training, wanneer je spieren het meest ontvankelijk zijn voor aminozuren. FIT20 kan ook bij het ontbijt of als eiwitrijk tussendoortje op elk moment van de dag worden gebruikt. Meng 1 maatschep (30,7 g) met 350 ml water of melk voor een complete eiwitshake.",
  },
  {
    question: "Is FIT20 geschikt voor dagelijks gebruik, ook op rustdagen?",
    answer:
      "Ja, spierherstel vindt niet alleen plaats op trainingsdagen — ook op rustdagen heeft je lichaam aminozuren nodig voor spieropbouw en bindweefselonderhoud. FIT20 is ontworpen voor dagelijkse inname als onderdeel van een actieve levensstijl. De 20 g eiwit per portie maken het ook een uitstekende aanvulling op een eiwitrijk ontbijt.",
  },
  {
    question: "Kan ik FIT20 stapelen met andere Amare supplementen?",
    answer:
      "FIT20 werkt uitstekend samen met Energy+ voor energie vóór de training en Amare EDGE+ voor mentale focus. In de Triangle of Wellness past FIT20 als extra eiwitbron naast Sunrise (ochtend) en Sunset (avond). De combinatie FIT20 + Restore is ideaal voor sporters — FIT20 voor spierherstel, Restore voor spijsvertering en darmgezondheid.",
  },
  {
    question: "Kan ik dit product gebruiken in combinatie met medicatie?",
    answer:
      "Raadpleeg altijd eerst je arts voordat je supplementen combineert met voorgeschreven medicatie. Hoewel Amare producten gemaakt zijn met natuurlijke ingrediënten, kunnen interacties met bepaalde medicijnen niet worden uitgesloten. Je arts kent jouw medische geschiedenis en kan het beste adviseren.",
  },
];

const ingredientGroups = [
  {
    group: "Eiwitbronnen",
    items: "Grasgevoed wei-eiwitisolaat, Gehydrolyseerde collageenpeptiden",
    amount: "20 g eiwit totaal",
    purpose: "Spierherstel, -opbouw en bindweefselondersteuning via 21 aminozuren",
  },
  {
    group: "Aminozuurprofiel",
    items: "Glycine (3,02 g), Proline (2,30 g), Alanine (1,62 g), Leucine, Isoleucine, Valine + 15 andere aminozuren",
    amount: "21 aminozuren totaal",
    purpose: "Compleet aminozuurprofiel voor spierproteïnesynthese en collageenvorming",
  },
  {
    group: "Mineralen",
    items: "Magnesiumcitraat",
    amount: "100 mg (27% RI)",
    purpose: "Draagt bij aan normale spierfunctie en vermindering van vermoeidheid",
  },
  {
    group: "Energie & Opname",
    items: "MCT-oliepoeder, Zonnebloemlecithine, Toegevoegde spijsverteringsenzymen",
    amount: "—",
    purpose: "Snelle energie uit MCT, verbeterde opname via lecithine, optimale verteerbaarheid",
  },
];

export default function Fit20Page() {
  const product = getProduct("fit20");
  const productImage =
    product?.image ||
    "https://amarecdn.azureedge.net/webassets/web/prod/products/Fit20-Vanilla-EU-800.jpg";

  const productSchema = generateProductSchema({
    name: "FIT20",
    nameNL: "Amare FIT20",
    description:
      "FIT20 combineert grasgevoerd wei-eiwitisolaat met gehydrolyseerde collageenpeptiden voor 20 g eiwit per portie. Bevat 21 aminozuren, magnesiumcitraat (27% RI), MCT-oliepoeder en spijsverteringsenzymen. Vanille smaak.",
    image: productImage,
    slug: "fit20",
    priceRetail: 53.34,
    priceSubscription: 48.01,
    ratingValue: 4.4,
    ratingCount: 200,
    affiliateUrl: "https://www.amare.com/2075008/nl-nl/fit20",
  });

  const combinedSchema = combineSchemas(
    productSchema,
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "FIT20", url: "/fit20" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="fit20-schema" />

      {/* ── Breadcrumb ── */}
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">
          Home
        </a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">FIT20</span>
      </nav>

      {/* ── HERO + CTA #1 ── */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
              <Image
                src={productImage}
                alt="Amare FIT20 — eiwitpoeder met wei-isolaat en collageenpeptiden, vanille smaak"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Spierherstel
                </span>
                <span className="text-[9px] text-[var(--color-text-muted)]">
                  ⭐ 4.4/5 (200+ reviews)
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
                Amare <span className="text-[var(--color-primary)]">FIT20</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">
                20 g eiwit per portie — grasgevoerd wei-isolaat + collageenpeptiden
                met magnesiumcitraat en MCT-olie.
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                21 aminozuren voor compleet spierherstel en bindweefselondersteuning.{" "}
                <strong>Direct van Amare — premium kwaliteit.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <AffiliateCTA
                  label="Bestel bij Amare → €48,01/maand"
                  product="fit20"
                  variant="primary"
                />
                <AffiliateCTA
                  label="Of eenmalig €53,34"
                  product="fit20"
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

      {/* ── Wat is FIT20? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat is FIT20?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              <strong>FIT20</strong> is Amare's premium eiwitformule — geen
              standaard eiwitpoeder, maar een combinatie van{" "}
              <strong>grasgevoerd wei-eiwitisolaat en gehydrolyseerde
              collageenpeptiden</strong>. Deze combinatie levert 20 g eiwit en
              maar liefst 21 verschillende aminozuren per portie (30,7 g),
              waaronder opvallend hoge hoeveelheden glycine (3,02 g), proline
              (2,30 g) en alanine (1,62 g).
            </p>
            <p>
              De meeste eiwitpoeders richten zich uitsluitend op spierherstel via
              wei-eiwit. FIT20 gaat een stap verder door collageenpeptiden toe te
              voegen — die voorzien de specifieke aminozuren die je lichaam nodig
              heeft voor <strong>bindweefsel, gewrichten, pezen en huid</strong>.
              Dit maakt FIT20 bijzonder relevant voor sporters die niet alleen
              spieren willen opbouwen, maar ook hun gewrichten willen ondersteunen.
            </p>
            <p>Elke portie FIT20 (30,7 g) levert:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Grasgevoed wei-eiwitisolaat</strong> — snel opneembare
                aminozuren voor spierproteïnesynthese. Wei-isolaat is de meest
                gezuiverde vorm van wei-eiwit, met minder dan 1% vet en vrijwel
                geen lactose.
              </li>
              <li>
                <strong>Gehydrolyseerde collageenpeptiden</strong> — voorzien de
                aminozuren glycine en proline voor bindweefselondersteuning,
                gewrichtsgezondheid en huidelasticiteit.
              </li>
              <li>
                <strong>Magnesiumcitraat (100 mg, 27% RI)</strong> — draagt bij
                aan een normale spierfunctie, vermindert vermoeidheid en
                ondersteunt het energiemetabolisme.
              </li>
              <li>
                <strong>MCT-oliepoeder</strong> — medium-chain triglyceriden die
                snel door de lever worden omgezet in ketonen voor directe energie
                zonder bloedsuikerpiek.
              </li>
              <li>
                <strong>Toegevoegde spijsverteringsenzymen</strong> — verbeteren
                de verteerbaarheid en opname van eiwitten, vooral nuttig voor
                mensen met een gevoelige spijsvertering.
              </li>
            </ul>
            <p>
              FIT20 wordt geleverd in een heerlijke <strong>vanille</strong> smaak
              en is vrij van kunstmatige kleurstoffen en conserveringsmiddelen.
            </p>
          </div>
        </div>
      </section>

      {/* ── Voor wie is dit? ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Voor wie is FIT20 geschikt?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🏋️",
                title: "Krachtsporters & bodybuilders",
                desc: "Die na de training snel opneembare aminozuren nodig hebben voor spierherstel en -opbouw — mét extra ondersteuning voor gewrichten.",
              },
              {
                icon: "🏃",
                title: "Duursporters",
                desc: "Die na lange runs of fietstochten zowel spier- als bindweefselherstel willen ondersteunen met een compleet aminozuurprofiel.",
              },
              {
                icon: "💪",
                title: "Actieve volwassenen",
                desc: "Die een eiwitrijk ontbijt of tussendoortje zoeken voor spieronderhoud en verzadiging — zonder kunstmatige toevoegingen.",
              },
              {
                icon: "🧘",
                title: "Herstellende sporters",
                desc: "Die herstellen van blessures en baat hebben bij de collageenpeptiden voor pees- en gewrichtsherstel naast spieropbouw.",
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
            Hoe gebruik je FIT20?
          </h2>
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Meng 1 maatschep (30,7 g) met 350 ml koude vloeistof
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Gebruik koud water of melk voor een romige vanilleshake. Ook
                    heerlijk in een smoothie met banaan, of door je havermout.
                    Niet mengen met kokend water — dat kan de eiwitstructuur
                    aantasten.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Neem binnen 30 minuten na de training
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Het anabole venster — de periode waarin je spieren het meest
                    ontvankelijk zijn voor aminozuren — is het grootst direct na
                    inspanning. FIT20 kan ook bij het ontbijt of als eiwitrijke
                    snack op elk moment van de dag worden gebruikt.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Dagelijks gebruiken — ook op rustdagen
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Spierherstel en bindweefselonderhoud vinden elke dag plaats,
                    niet alleen op trainingsdagen. Consistent dagelijks gebruik
                    geeft de beste resultaten. Eén pot FIT20 bevat 30 porties —
                    precies één maand bij dagelijks gebruik.
                  </p>
                </div>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]">
              <strong>⏰ Tijdsinvestering:</strong> Minder dan 1 minuut per shake.
              <br />
              <strong>👤 Geschikt voor:</strong> Volwassenen en jongeren vanaf
              12 jaar.
              <br />
              <strong>⚠ Let op:</strong> Bevat melk (wei-eiwit) en lactose. Niet
              geschikt bij ernstige lactose-intolerantie of koemelkallergie.
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
            rapporteren bij consistent dagelijks gebruik in combinatie met training:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                week: "Week 1-2",
                title: "Sneller herstel",
                items: [
                  "Minder spierpijn na trainingen",
                  "Betere energie beschikbaarheid",
                  "Lichtere benen bij duursport",
                ],
              },
              {
                week: "Week 3-4",
                title: "Kracht & spiermassa",
                items: [
                  "Merkbare spiergroei bij krachttraining",
                  "Minder gewrichtsklachten",
                  "Sneller herstel tussen sets",
                ],
              },
              {
                week: "Week 6-8",
                title: "Optimale resultaten",
                items: [
                  "Zichtbare toename in spiermassa",
                  "Sterkere nagels en voller haar",
                  "Soepelere gewrichten bij intensieve training",
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
            Klaar voor sneller spierherstel en meer kracht?
          </h2>
          <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
            Probeer FIT20 30 dagen risicovrij. Niet tevreden? Geld terug.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <AffiliateCTA
              label="Bestel nu — Abonnement €48,01/maand"
              product="fit20"
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
                €48,01
                <span className="text-sm font-normal text-[var(--color-text-muted)]">
                  /maand
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Elke maand automatisch geleverd. Op elk moment opzegbaar.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ €5,33 goedkoper per maand</li>
                <li>✓ Nooit zonder voorraad</li>
                <li>✓ Gratis verzending</li>
              </ul>
              <AffiliateCTA
                label="Start abonnement →"
                product="fit20"
                variant="primary"
              />
            </div>
            <div className="rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Eenmalige aankoop
              </div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
                €53,34
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Eenmalig bestellen, geen verplichtingen.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ Vrijblijvend</li>
                <li>✓ Voorraad voor 1 maand (30 porties)</li>
                <li>✓ Verzending €4,95</li>
              </ul>
              <AffiliateCTA
                label="Eenmalig bestellen →"
                product="fit20"
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
              Ervaar het FIT20 verschil — 21 aminozuren voor compleet herstel
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
              De enige eiwitshake die wei-isolaat combineert met collageenpeptiden,
              magnesiumcitraat en MCT-olie. 30 dagen risicovrij proberen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <AffiliateCTA
                label="Bestel FIT20 bij Amare →"
                product="fit20"
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
              <span>🔬 Wetenschappelijk onderbouwd</span>
              <span className="text-[var(--color-border)]">|</span>
              <span>🌿 Natuurlijke ingrediënten</span>
              <span className="text-[var(--color-border)]">|</span>
              <span>⭐ 10.000+ klanten</span>
            </div>
            <p className="mt-6 text-[9px] text-[var(--color-text-muted)]">
              * Affiliate link — je betaalt hetzelfde bedrag, wij ontvangen een commissie.
              <br />
              * Deze uitspraken zijn niet beoordeeld door de NVWA. Voedingssupplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.
              <br />* Raadpleeg bij aanhoudende klachten altijd een arts. Bevat melk en lactose.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
