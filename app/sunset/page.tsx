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
  title: "Sunset Kopen — Omega-3 Visolie Avondformule met D3 | AmareNL",
  description:
    "Amare Sunset: EPA 520 mg, DHA 223 mg per dagdosering met vitamine D3 (6 µg), A, E en astaxanthine 2 mg. Melatoninevrije avondformule voor hart, hersenen en herstel. Direct van Amare.",
};

const faqs = [
  {
    question: "Waarom 's avonds omega-3 innemen in plaats van 's ochtends?",
    answer:
      "Omega-3 vetzuren ondersteunen natuurlijke ontstekingsremmende processen die vooral 's nachts actief zijn tijdens je slaap. Inname bij de avondmaaltijd zorgt ervoor dat EPA en DHA beschikbaar zijn wanneer je lichaam bezig is met herstel en regeneratie. Bovendien bevat Sunset vitamine D3 — een vetoplosbare vitamine die beter wordt opgenomen met een maaltijd, wat de avondmaaltijd ideaal maakt.",
  },
  {
    question: "Bevat Sunset melatonine?",
    answer:
      "Nee, Sunset bevat geen melatonine. In plaats van je lichaam kunstmatig slaperig te maken, ondersteunt Sunset de natuurlijke slaapcyclus via omega-3 vetzuren, vitamine D3, vitamine E en astaxanthine — nutriënten die je lichaam nodig heeft voor nachtelijk herstel. Dit maakt Sunset ook geschikt voor mensen die gevoelig zijn voor melatonine of het liever niet gebruiken.",
  },
  {
    question: "Wat is het verschil tussen Sunset en een standaard visoliesupplement?",
    answer:
      "Sunset is veel meer dan alleen visolie. Naast 520 mg EPA en 223 mg DHA per dagdosering (3 capsules), bevat het vitamine D3 (6 µg, 120% RI), vitamine A (200 µg RE, 25% RI), vitamine E (18 mg α-TE, 150% RI) en maar liefst 2 mg astaxanthine — een van de krachtigste natuurlijke antioxidanten. Een standaard visoliesupplement bevat vaak alleen EPA/DHA zonder deze extra nutriënten.",
  },
  {
    question: "Kan ik Sunset combineren met andere supplementen?",
    answer:
      "Sunset is specifiek ontworpen als de avondpijler van de Triangle of Wellness — combineer met Sunrise (ochtend) en Nitro Xtreme (middag) voor een complete dagelijkse routine. Sunset past ook uitstekend bij MentaBiotics voor extra darm-hersen-ondersteuning of HL5 voor collageen. Vermijd het combineren van Sunset met andere supplementen die hoge doses vitamine D3 of A bevatten om overdosering te voorkomen.",
  },
  {
    question: "Is Sunset geschikt voor vegetariërs of veganisten?",
    answer:
      "Nee, de EPA en DHA in Sunset zijn afkomstig uit wilde visolie (zalm en andere vette vis) en de capsules bevatten visgelatine. Sunset is daarmee niet geschikt voor veganisten en vegetariërs. Voor een plantaardig omega-3 alternatief raden we algenolie aan — Amare heeft deze optie momenteel niet in het assortiment, maar er zijn goede plantaardige alternatieven op de markt.",
  },
  {
    question: "Kan ik dit product gebruiken in combinatie met bloedverdunners?",
    answer:
      "Omega-3 vetzuren hebben een mild bloedverdunnend effect. Raadpleeg altijd eerst je arts voordat je Sunset of een ander omega-3 supplement combineert met bloedverdunners of andere voorgeschreven medicatie. Je arts kent jouw medische geschiedenis en kan het beste adviseren over eventuele interacties.",
  },
];

const ingredientGroups = [
  {
    group: "Omega-3 uit visolie",
    items: "EPA (Eicosapentaeenzuur), DHA (Docosahexaeenzuur)",
    amount: "EPA 520 mg + DHA 223 mg = 743 mg totaal",
    purpose: "Hartfunctie (EPA/DHA bij 250 mg/dag), hersenfunctie & gezichtsvermogen (DHA bij 250 mg/dag)",
  },
  {
    group: "Vetoplosbare Vitaminen",
    items: "Vitamine D3 (cholecalciferol), Vitamine A (retinylpalmitaat), Vitamine E (D-α-tocoferol)",
    amount: "D3: 6 µg (120% RI), A: 200 µg RE (25% RI), E: 18 mg α-TE (150% RI)",
    purpose: "Calciumopname & botten (D3), immuunsysteem (A), celbescherming tegen oxidatieve stress (E)",
  },
  {
    group: "Antioxidant",
    items: "Astaxanthine uit Haematococcus pluvialis alg",
    amount: "2 mg",
    purpose: "Krachtigste natuurlijke carotenoïde antioxidant — ondersteunt celbescherming en huidgezondheid",
  },
];

export default function SunsetPage() {
  const product = getProduct("sunset");
  const productImage =
    product?.image ||
    "https://amarecdn.azureedge.net/webassets/web/prod/products/Sunset-EU-800.jpg";

  const productSchema = generateProductSchema({
    name: "Sunset",
    nameNL: "Amare Sunset",
    description:
      "Amare Sunset is een avondsupplement met EPA 520 mg, DHA 223 mg uit wilde visolie. Verrijkt met vitamine D3 (6 µg), A, E en 2 mg astaxanthine. Melatoninevrij — ondersteunt hart, hersenen en nachtelijk herstel.",
    image: productImage,
    slug: "sunset",
    priceRetail: 75,
    priceSubscription: 67.50,
    ratingValue: 4.6,
    ratingCount: 400,
    affiliateUrl: "https://www.amare.com/2075008/nl-nl/sunset",
  });

  const combinedSchema = combineSchemas(
    productSchema,
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Sunset", url: "/sunset" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="sunset-schema" />

      {/* ── Breadcrumb ── */}
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">
          Home
        </a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">Sunset</span>
      </nav>

      {/* ── HERO + CTA #1 ── */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
              <Image
                src={productImage}
                alt="Amare Sunset — omega-3 avondformule met EPA, DHA, vitamine D3 en astaxanthine"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Avondherstel
                </span>
                <span className="text-[9px] text-[var(--color-text-muted)]">
                  ⭐ 4.6/5 (400+ reviews)
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
                Amare <span className="text-[var(--color-primary)]">Sunset</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">
                Omega-3 avondformule met EPA 520 mg, DHA 223 mg, vitamine D3, A, E
                en astaxanthine — voor hart, hersenen en nachtelijk herstel.
              </p>
            <p className="mt-2 text-xs text-[var(--color-primary)] font-bold">🔗 <a href="/omega-3-supplement" className="hover:underline">Lees: Omega 3 — alles wat je moet weten →</a></p>

              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Melatoninevrij. Onderdeel van de Triangle of Wellness.{" "}
                <strong>Direct van Amare — premium kwaliteit.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <AffiliateCTA
                  label="Bestel bij Amare → €67,50/maand"
                  product="sunset"
                  variant="primary"
                />
                <AffiliateCTA
                  label="Of eenmalig €75"
                  product="sunset"
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

      {/* ── Wat is Sunset? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat is Sunset?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              <strong>Sunset</strong> is Amare's avondformule — een omega-3
              supplement dat verder gaat dan standaard visolie. Waar de meeste
              visoliesupplementen alleen EPA en DHA leveren, combineert Sunset{" "}
              <strong>EPA 520 mg en DHA 223 mg</strong> per dagdosering (3
              capsules) met vier essentiële vetoplosbare nutriënten: vitamine D3
              (6 µg, 120% RI), vitamine A (200 µg RE, 25% RI), vitamine E (18 mg
              α-TE, 150% RI) en <strong>2 mg astaxanthine</strong> — een van de
              krachtigste natuurlijke antioxidanten.
            </p>
            <p>
              De naam Sunset is geen toeval: deze formule is specifiek ontworpen
              voor <strong>inname bij de avondmaaltijd</strong>. Terwijl jij
              slaapt, werkt je lichaam aan herstel op celniveau. De EPA en DHA
              ondersteunen natuurlijke ontstekingsremmende processen, vitamine D3
              draagt bij aan de calciumopname voor je botten, en astaxanthine
              beschermt cellen tegen oxidatieve stress.
            </p>
            <p>
              Sunset is de derde pijler van de <strong>Triangle of Wellness</strong>,
              naast Sunrise (ochtend) en Nitro Xtreme (middag). Samen vormen ze een
              complete dagcyclus voor energie, focus en herstel.
            </p>
            <p>Elke dagdosering Sunset (3 capsules) levert:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>EPA 520 mg + DHA 223 mg</strong> — uit wilde visolie
                (zalm e.a.). EPA en DHA dragen bij aan een normale hartfunctie
                (bij inname van 250 mg/dag). DHA ondersteunt daarnaast de
                hersenfunctie en het gezichtsvermogen.
              </li>
              <li>
                <strong>Vitamine D3 (6 µg, 120% RI)</strong> — essentieel voor
                de opname van calcium, de instandhouding van sterke botten en
                de normale werking van het immuunsysteem.
              </li>
              <li>
                <strong>Vitamine A (200 µg RE, 25% RI)</strong> — ondersteunt
                het immuunsysteem, het gezichtsvermogen en de instandhouding van
                een gezonde huid en slijmvliezen.
              </li>
              <li>
                <strong>Vitamine E (18 mg α-TE, 150% RI)</strong> — beschermt
                cellen tegen oxidatieve stress. De natuurlijke D-α-tocoferol uit
                rijstzemelenolie is beter opneembaar dan synthetische vormen.
              </li>
              <li>
                <strong>Astaxanthine (2 mg)</strong> — een carotenoïde
                antioxidant uit de alg Haematococcus pluvialis. Astaxanthine is
                tot 6000 keer krachtiger dan vitamine C als antioxidant en kan
                de bloed-hersenbarrière passeren.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Voor wie is dit? ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Voor wie is Sunset geschikt?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "❤️",
                title: "Hartbewuste volwassenen",
                desc: "Die hun hartfunctie willen ondersteunen via de bewezen werking van EPA en DHA (bij 250 mg/dag) — zonder maagklachten die sommige visoliesupplementen geven.",
              },
              {
                icon: "🧠",
                title: "Mensen met focus op hersenfunctie",
                desc: "DHA is een structurele component van hersencellen. Mensen die hun cognitieve functie op lange termijn willen ondersteunen hebben baat bij consistente DHA-inname.",
              },
              {
                icon: "☀️",
                title: "Nederlanders met vitamine D-tekort",
                desc: "Ruim 60% van de Nederlanders heeft in de winter een te lage vitamine D-status. Sunset levert 120% van de dagelijkse RI aan D3 — juist in de maanden dat je huid weinig zon ziet.",
              },
              {
                icon: "🌙",
                title: "Mensen die beter willen slapen",
                desc: "Sunset ondersteunt de natuurlijke slaapcyclus zonder melatonine — via nutriënten die nachtelijk herstel op celniveau bevorderen. Geen kunstmatige slaperigheid, maar ondersteuning van binnenuit.",
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
            Wat zit erin? — Ingrediënten per dagdosering (3 capsules)
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
            Hoe gebruik je Sunset?
          </h2>
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Neem 3 capsules bij de avondmaaltijd
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    De vetoplosbare vitaminen (D3, A, E) en omega-3 vetzuren
                    worden beter opgenomen in combinatie met een maaltijd die
                    vetten bevat. De avondmaaltijd is het ideale moment — je
                    lichaam gebruikt de nutriënten tijdens de nachtelijke
                    herstelfase.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Consistent dagelijks gebruiken
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Omega-3 vetzuren werken cumulatief — het duurt enkele weken
                    voordat de EPA/DHA-spiegels in je celmembranen optimaal zijn.
                    Dagelijkse inname zonder overslaan geeft de beste resultaten.
                    Eén pot Sunset bevat 90 capsules — precies 30 dagen bij 3
                    capsules per dag.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Combineer met de Triangle of Wellness
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Sunset is het avondluik van de Triangle of Wellness. Gebruik
                    's ochtends Sunrise (22 superfoods + 9 vitamines) en 's
                    middags Nitro Xtreme (nitraten + 56 mineralen) voor een
                    complete dagelijkse routine. De drie formules zijn ontworpen
                    om elkaar te versterken zonder overlap.
                  </p>
                </div>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]">
              <strong>⏰ Tijdsinvestering:</strong> Minder dan 30 seconden bij
              de avondmaaltijd.
              <br />
              <strong>👤 Geschikt voor:</strong> Volwassenen.
              <br />
              <strong>⚠ Let op:</strong> Bevat visgelatine en visolie — niet
              geschikt voor veganisten/vegetariërs. Raadpleeg een arts bij
              gebruik van bloedverdunners.
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
            Omega-3 vetzuren werken geleidelijk — de effecten bouwen zich op
            naarmate je celmembranen verrijkt raken met EPA en DHA:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                week: "Week 1-2",
                title: "Opbouwfase",
                items: [
                  "EPA/DHA-spiegels in het bloed beginnen te stijgen",
                  "Mogelijk minder droge huid",
                  "Betere vetoplosbare vitamine-status",
                ],
              },
              {
                week: "Week 3-4",
                title: "Merkbare verandering",
                items: [
                  "Minder stijfheid bij het opstaan",
                  "Verbeterde huidhydratatie en -gladheid",
                  "Stabielere energie in de ochtend",
                ],
              },
              {
                week: "Week 6-8",
                title: "Optimale resultaten",
                items: [
                  "Optimale omega-3 index in celmembranen",
                  "Duidelijk soepelere gewrichten",
                  "Betere slaapkwaliteit en ochtendenergie",
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
            Klaar voor betere nachtrust en hartgezondheid?
          </h2>
          <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
            Probeer Sunset 30 dagen risicovrij. Niet tevreden? Geld terug.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <AffiliateCTA
              label="Bestel nu — Abonnement €67,50/maand"
              product="sunset"
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
                €67,50
                <span className="text-sm font-normal text-[var(--color-text-muted)]">
                  /maand
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Elke maand automatisch geleverd. Op elk moment opzegbaar.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ €7,50 goedkoper per maand</li>
                <li>✓ Nooit zonder voorraad</li>
                <li>✓ Gratis verzending</li>
              </ul>
              <AffiliateCTA
                label="Start abonnement →"
                product="sunset"
                variant="primary"
              />
            </div>
            <div className="rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Eenmalige aankoop
              </div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
                €75
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Eenmalig bestellen, geen verplichtingen.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ Vrijblijvend</li>
                <li>✓ Voorraad voor 1 maand (90 capsules)</li>
                <li>✓ Verzending €4,95</li>
              </ul>
              <AffiliateCTA
                label="Eenmalig bestellen →"
                product="sunset"
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
              Ervaar de Sunset nachtrust — omega-3, D3 en astaxanthine
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
              De compleetste omega-3 avondformule van Amare — EPA 520 mg, DHA
              223 mg, D3, A, E en 2 mg astaxanthine. Melatoninevrij. 30 dagen
              risicovrij proberen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <AffiliateCTA
                label="Bestel Sunset bij Amare →"
                product="sunset"
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
              <span>🐟 Wilde visolie</span>
              <span className="text-[var(--color-border)]">|</span>
              <span>⭐ 10.000+ klanten</span>
            </div>
            <p className="mt-6 text-[9px] text-[var(--color-text-muted)]">
              * Affiliate link — je betaalt hetzelfde bedrag, wij ontvangen een commissie.
              <br />
              * Deze uitspraken zijn niet beoordeeld door de NVWA. Voedingssupplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.
              <br />* Gezondheidsclaims wachten op goedkeuring door de Europese Commissie. Raadpleeg bij medische klachten altijd een arts. Bevat visgelatine en visolie — niet geschikt voor veganisten/vegetariërs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
