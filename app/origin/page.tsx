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
  title: "Amare Origin Kopen — 100% Plantaardige Eiwitshake | AmareNL",
  description:
    "Amare Origin: 23 g plantaardig eiwit uit erwten, pompoenpit en tuinbonen. Met calcium, magnesium, zink en MCT-olie. 100% vegan, allergeenvrij. Vanuit Nederland verzonden.",
};

const faqs = [
  {
    question: "Is Origin een volledige maaltijdvervanger?",
    answer:
      "Origin levert 23 g eiwit, gezonde vetten (MCT-olie, lijnzaad), prebiotische vezels (appelpectine) en 6 essentiële mineralen per portie van 44 g (163 kcal). Het kan dienen als lichte maaltijdvervanger, bijvoorbeeld als ontbijt of lunchshake. Voor een volledige maaltijd combineer je het met een banaan, wat haver of spinazie. Origin is primair een eiwitsupplement met toegevoegde micronutriënten, geen totale maaltijdvervanger.",
  },
  {
    question: "Wat is het verschil tussen Origin en FIT20?",
    answer:
      "Origin is 100% plantaardig met eiwit uit erwten, pompoenpit en tuinbonen — volledig vegan, glutenvrij, lactosevrij, sojavrij en notenvrij. FIT20 bevat dierlijke eiwitten (wei en collageen) met 21 aminozuren. Origin is de keuze voor veganisten en mensen met allergieën; FIT20 voor wie dierlijke eiwitten prefereert en een ander aminozuurprofiel zoekt.",
  },
  {
    question: "Kan ik Origin gebruiken voor gewichtsbeheersing?",
    answer:
      "Origin kan onderdeel zijn van een gewichtsbeheersingsplan door de verzadigende combinatie van 23 g eiwit, MCT-olie en prebiotische vezels (appelpectine). Deze drie componenten helpen het hongergevoel tussen maaltijden te verminderen. Vervang bijvoorbeeld je normale ontbijt door een Origin-shake als onderdeel van een calorietekort — altijd in combinatie met gezonde voeding en beweging.",
  },
  {
    question: "Bevat Origin toegevoegde suikers?",
    answer:
      "Nee, Origin bevat geen toegevoegde suikers. De chocoladesmaak komt van natuurlijk cacaopoeder en de lichte zoetheid van stevia. Met slechts 163 kcal per portie (44 g) is het een bewuste keuze voor wie op de calorie-inname let.",
  },
  {
    question: "Is Origin geschikt voor mensen met voedselallergieën?",
    answer:
      "Ja, Origin is één van de meest allergeenvrije eiwitshakes op de markt: 100% vegan, glutenvrij, lactosevrij, sojavrij en notenvrij. Gemaakt in een faciliteit die kruisbesmetting minimaliseert. Altijd het etiket controleren als je een specifieke allergie hebt.",
  },
  {
    question: "Wordt Origin vanuit Nederland verzonden?",
    answer:
      "Ja! Sinds begin 2026 worden Amare producten rechtstreeks vanuit Nederland verzonden via PostNL. Dat betekent: geen douaneproces, geen extra importkosten, en snelle levering — meestal 1-2 werkdagen. Ook naar België wordt zonder douane verzonden.",
  },
];

const ingredientGroups = [
  {
    group: "Plantaardig Eiwit",
    items: "Erwteneiwitisolaat (55%), Pompoenpiteiwit, Tuinboneneiwit",
    amount: "23 g totaal",
    purpose: "Compleet aminozuurprofiel voor spieronderhoud en verzadiging",
  },
  {
    group: "Mineralen",
    items: "Calcium (212 mg, 26% RI), Magnesium (96 mg, 25% RI), Zink (6 mg, 60% RI), Kalium (221 mg, 11% RI), Mangaan (1,5 mg, 75% RI)",
    amount: "536,5 mg totaal",
    purpose: "Magnesium voor spierfunctie, calcium voor botten, zink voor huid en immuunsysteem",
  },
  {
    group: "Vitamine",
    items: "Vitamine E (D-α-tocoferol uit zonnebloemolie)",
    amount: "12,5 mg α-TE (104% RI)",
    purpose: "Antioxidant die cellen helpt beschermen tegen oxidatieve stress",
  },
  {
    group: "Gezonde Vetten & Vezels",
    items: "MCT-kokosolie, Lijnzaadpoeder (omega-3 bron), Appelpectine (prebiotische vezel), Cacaopoeder",
    amount: "—",
    purpose: "MCT voor langdurige energie, lijnzaad en appelpectine voor verzadiging en darmgezondheid",
  },
];

export default function OriginPage() {
  const product = getProduct("origin");
  const productImage =
    product?.image ||
    "https://amarecdn.azureedge.net/webassets/web/prod/products/Origin-Chocolate-EU-800.jpg";

  const productSchema = generateProductSchema({
    name: "Amare Origin",
    nameNL: "Amare Origin",
    description:
      "Amare Origin is een 100% veganistische eiwitshake met 23 g plantaardig eiwit uit erwten, pompoenpit en tuinbonen. Verrijkt met MCT-kokosolie, lijnzaad, appelpectine, calcium, magnesium, zink, kalium, mangaan en vitamine E (104% RI). Chocoladesmaak, glutenvrij, lactosevrij, sojavrij, notenvrij.",
    image: productImage,
    slug: "origin",
    priceRetail: 44.45,
    priceSubscription: 40.00,
    ratingValue: 4.5,
    ratingCount: 320,
    affiliateUrl: "https://www.amare.com/2075008/nl-nl/kyani-origin-chocolate",
  });

  const combinedSchema = combineSchemas(
    productSchema,
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Origin", url: "/origin" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="origin-schema" />

      {/* ── Breadcrumb ── */}
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">
          Home
        </a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">Origin</span>
      </nav>

      {/* ── HERO + CTA #1 ── */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
              <Image
                src={productImage}
                alt="Amare Origin — 100% plantaardige eiwitshake, chocoladesmaak"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="bg-green-600 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Vegan
                </span>
                <span className="text-[9px] text-[var(--color-text-muted)]">
                  ⭐ 4.5/5 (320+ reviews)
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
                Amare <span className="text-[var(--color-primary)]">Origin</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">
                100% plantaardige eiwitshake — 23 g eiwit uit erwten, pompoenpit
                en tuinbonen, met MCT-olie en 6 mineralen.
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Vegane proteïne zonder compromissen — chocoladesmaak, allergeenvrij.{" "}
                <strong>Vanuit Nederland verzonden, geen douane.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <AffiliateCTA
                  label="Bestel bij Amare → €40,00/maand"
                  product="origin"
                  variant="primary"
                />
                <AffiliateCTA
                  label="Of eenmalig €44,45"
                  product="origin"
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

      {/* ── Wat is Origin? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat is Origin?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              <strong>Origin</strong> is Amare's 100% plantaardige eiwitshake —
              ontwikkeld voor iedereen die hoogwaardige, allergeenvrije
              proteïne zoekt zonder dierlijke ingrediënten. Elke portie van 44 g
              levert <strong>23 gram plantaardig eiwit</strong> uit drie
              complementaire bronnen: erwten (55%), pompoenpit en tuinbonen.
              Deze combinatie levert een compleet aminozuurprofiel — iets wat
              niet elke plantaardige shake kan zeggen.
            </p>
            <p>
              Wat Origin bijzonder maakt, is de balans tussen eiwit en
              micronutriënten. Per shake krijg je niet alleen proteïne, maar
              ook:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Vitamine E (12,5 mg, 104% RI)</strong> — een krachtige
                antioxidant uit zonnebloemolie, die cellen helpt beschermen
                tegen oxidatieve stress.
              </li>
              <li>
                <strong>6 essentiële mineralen:</strong> calcium (26% RI) voor
                botten, magnesium (25% RI) voor spierfunctie, zink (60% RI)
                voor huid en immuunsysteem, plus kalium en mangaan.
              </li>
              <li>
                <strong>MCT-kokosolie en lijnzaadpoeder</strong> — gezonde
                vetten voor langdurige energie en natuurlijke omega-3.
              </li>
              <li>
                <strong>Appelpectine</strong> — een prebiotische vezel die goede
                darmbacteriën voedt.
              </li>
            </ul>
            <p>
              Met slechts 163 kcal per portie en zonder toegevoegde suikers is
              Origin een lichte maar voedzame keuze — ideaal als ontbijt, na
              het sporten, of als gezonde middagsnack.
            </p>
          </div>
        </div>
      </section>

      {/* ── Voor wie is dit? ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Voor wie is Origin geschikt?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🌱",
                title: "Veganisten & vegetariërs",
                desc: "Die een betrouwbare, plantaardige eiwitbron zoeken met een compleet aminozuurprofiel — zonder dierlijke ingrediënten.",
              },
              {
                icon: "🏋️",
                title: "Sporters na de training",
                desc: "Die 23 g eiwit, gezonde vetten en mineralen willen voor spierherstel — zonder lactose, soja of kunstmatige toevoegingen.",
              },
              {
                icon: "🤧",
                title: "Mensen met voedselallergieën",
                desc: "Die een veilige shake zoeken: glutenvrij, lactosevrij, sojavrij en notenvrij — een van de schoonste formules op de markt.",
              },
              {
                icon: "⚖️",
                title: "Gewichtsbewuste gebruikers",
                desc: "Die een verzadigende shake met 163 kcal en prebiotische vezels willen als onderdeel van gewichtsbeheersing.",
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
            Wat zit erin? — Ingrediënten per portie (44 g)
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
            Hoe gebruik je Origin?
          </h2>
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Doe 3 maatschepjes (44 g) in een shaker
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Gebruik het meegeleverde schepje. Drie afgestreken schepjes
                    geven exact de aanbevolen portie van 44 g.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Voeg 300 ml koud water toe en schud krachtig
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Koud water of koude plantaardige melk werkt het beste. Even
                    krachtig schudden (15-20 seconden) geeft een gladde,
                    klontvrije shake. Ook heerlijk in een smoothie met banaan.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Drink direct — 14 porties per verpakking
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Ideaal als ontbijt, na het sporten of als gezonde middagsnack.
                    Geschikt voor volwassenen en jongeren vanaf 12 jaar. Een
                    verpakking gaat 2 weken mee bij dagelijks gebruik.
                  </p>
                </div>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]">
              <strong>⏰ Bereidingstijd:</strong> Minder dan 1 minuut.
              <br />
              <strong>👤 Geschikt voor:</strong> Volwassenen en jongeren vanaf
              12 jaar.
              <br />
              <strong>✅ Allergeenvrij:</strong> Vegan, glutenvrij, lactosevrij,
              sojavrij, notenvrij.
              <br />
              <strong>📦 Inhoud:</strong> 616 g per verpakking — 14 porties.
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
            Origin is primair een voedingsshake — geen stimulerend supplement.
            Dit is wat gebruikers ervaren:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                week: "Direct",
                title: "Vanaf de eerste shake",
                items: [
                  "Lekkere, volle chocoladesmaak",
                  "Goed verzadigd gevoel",
                  "Geen opgeblazen gevoel achteraf",
                ],
              },
              {
                week: "Week 1-2",
                title: "In je routine",
                items: [
                  "Minder trek in ongezonde snacks",
                  "Handige, snelle ochtendroutine",
                  "Stabiele energie tot de lunch",
                ],
              },
              {
                week: "Week 4+",
                title: "Lange termijn",
                items: [
                  "Consistent onderdeel van eetpatroon",
                  "Ondersteunt spierherstel na training",
                  "Bewuste, voedzame maaltijdkeuze",
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
            niet beoordeeld door de NVWA. Voedingssupplementen zijn geen
            vervanging voor een gevarieerd dieet en gezonde levensstijl.
          </p>
        </div>
      </section>

      {/* ── CTA #2 (Midden) ── */}
      <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">
            Klaar voor plantaardige proteïne zonder compromissen?
          </h2>
          <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
            Probeer Origin 30 dagen risicovrij. Niet tevreden? Geld terug.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <AffiliateCTA
              label="Bestel nu — Abonnement €40,00/maand"
              product="origin"
              variant="urgency"
            />
          </div>
          <p className="mt-4 text-[10px] text-white/60">
            🛡️ 30 dagen geld-terug-garantie &middot; 🚚 Gratis verzending vanaf
            €175 &middot; 📦 Vanuit Nederland verzonden
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
                €40,00
                <span className="text-sm font-normal text-[var(--color-text-muted)]">
                  /maand
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Elke maand automatisch geleverd. Op elk moment opzegbaar.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ €4,45 goedkoper per maand</li>
                <li>✓ Nooit zonder voorraad</li>
                <li>✓ Gratis verzending</li>
              </ul>
              <AffiliateCTA
                label="Start abonnement →"
                product="origin"
                variant="primary"
              />
            </div>
            <div className="rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Eenmalige aankoop
              </div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
                €44,45
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Eenmalig bestellen, geen verplichtingen.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ Vrijblijvend</li>
                <li>✓ 14 porties per verpakking</li>
                <li>✓ Verzending €4,95</li>
              </ul>
              <AffiliateCTA
                label="Eenmalig bestellen →"
                product="origin"
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
              Ontdek plantaardige proteïne zonder compromissen
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
              Origin levert 23 g eiwit, 6 mineralen en gezonde vetten — 100%
              vegan, allergeenvrij, chocoladesmaak. 30 dagen risicovrij proberen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <AffiliateCTA
                label="Bestel Origin bij Amare →"
                product="origin"
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
              <span>🚚 Snelle PostNL levering</span>
              <span className="text-[var(--color-border)]">|</span>
              <span>🇳🇱 Vanuit Nederland</span>
              <span className="text-[var(--color-border)]">|</span>
              <span>🔄 Geen douane</span>
            </div>
            <p className="mt-6 text-[9px] text-[var(--color-text-muted)]">
              * Affiliate link — je betaalt hetzelfde bedrag, wij ontvangen een commissie.
              <br />
              * Deze uitspraken zijn niet beoordeeld door de NVWA. Voedingssupplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.
              <br />* Raadpleeg bij aanhoudende klachten altijd een arts. Geschikt voor volwassenen en jongeren vanaf 12 jaar.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
