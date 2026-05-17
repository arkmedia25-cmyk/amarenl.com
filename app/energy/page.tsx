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
  title: "Energy+ Kopen — Natuurlijke Energie Zonder Crash | AmareNL",
  description:
    "Amare Energy+ met vitamine C, L-glycine en natuurlijke cafeïne (27,64 mg) — energie zonder de crash van koffie. Plantaardig, natuurlijke ingrediënten. Vanuit Nederland verzonden.",
};

const faqs = [
  {
    question: "Hoeveel cafeïne bevat Energy+ vergeleken met koffie?",
    answer:
      "Energy+ bevat 27,64 mg natuurlijke cafeïne per portie — vergelijkbaar met een kop groene thee of een klein stukje pure chocolade. Een gemiddelde kop koffie bevat 80-100 mg. Dit geeft een milde, houdbare energieboost zonder de beruchte cafeïnecrash die je van koffie kent. De cafeïne komt uit natuurlijke plantaardige bronnen, niet uit synthetische toevoegingen.",
  },
  {
    question: "Kan ik Energy+ elke dag gebruiken?",
    answer:
      "Ja, Energy+ is specifiek ontworpen voor dagelijks gebruik als onderdeel van een evenwichtige levensstijl. De formule bevat geen ingrediënten waaraan je lichaam went of die uitputtend werken op je bijnieren. Veel gebruikers maken het onderdeel van hun vaste ochtendroutine. De aanbevolen dosering is 1 zakje per dag.",
  },
  {
    question: "Wat is het beste moment om Energy+ in te nemen?",
    answer:
      "Bij voorkeur 's ochtends of vroeg in de middag. De lichte cafeïne-inhoud (27,64 mg) geeft je een natuurlijke oppepper zonder je slaap te verstoren — mits je het niet vlak voor bedtijd neemt. Als je gevoelig bent voor cafeïne, neem het dan voor 14:00 uur. De vitamine C en L-glycine werken het beste op een lege maag of bij een lichte maaltijd.",
  },
  {
    question: "Is Energy+ geschikt voor sporters?",
    answer:
      "Energy+ is uitstekend geschikt voor mensen met een actieve levensstijl. Vitamine C ondersteunt het energiemetabolisme en helpt bij de vermindering van vermoeidheid — relevant voor zowel sporters als mensen met een drukke werkdag. De L-glycine (1000 mg) ondersteunt mentale helderheid. De lichte cafeïnedosering maakt het een goed alternatief voor zware pre-workouts met synthetische stimulanten.",
  },
  {
    question: "Wat is het verschil tussen Energy+ en Amare EDGE+?",
    answer:
      "Energy+ richt zich op natuurlijke, aanhoudende energie via vitamine C, L-glycine en polyfenolen — met een lichte cafeïneboost. Amare EDGE+ is een vloeibaar nootropicum met citicoline, L-theanine en ashwagandha, gericht op mentale focus en cognitieve helderheid. Ze vullen elkaar perfect aan: Energy+ voor energie, EDGE+ voor focus. Samen met MentaBiotics vormen ze het populaire Happy Juice Pack.",
  },
  {
    question: "Wordt Energy+ vanuit Nederland verzonden?",
    answer:
      "Ja! Sinds begin 2026 worden Amare producten rechtstreeks vanuit Nederland verzonden via PostNL. Dat betekent: geen douaneproces, geen extra importkosten, en snelle levering — meestal 1-2 werkdagen. Ook naar België wordt zonder douane verzonden.",
  },
];

const ingredientGroups = [
  {
    group: "Vitaminen",
    items: "Vitamine C (L-ascorbinezuur)",
    amount: "60 mg (75% RI)",
    purpose: "Ondersteunt energiemetabolisme en helpt vermoeidheid te verminderen",
  },
  {
    group: "Aminozuren",
    items: "L-glycine",
    amount: "1000 mg",
    purpose: "Neurotransmitter-precursor voor mentale helderheid en focus",
  },
  {
    group: "Plantaardige Polyfenolen",
    items: "Frambozenextract (4 mg frambozenketonen), Druivenpitextract (10 mg proanthocyanen), Pijnboomschorsextract (10 mg proanthocyanen), ApplePhenon® appelextract (7 mg polyfenolen), Granaatappelextract",
    amount: "133,56 mg totaal",
    purpose: "Beschermen cellen tegen oxidatieve stress — voor duurzame energie",
  },
  {
    group: "Natuurlijke Cafeïne",
    items: "Cafeïne uit plantaardige bronnen",
    amount: "27,64 mg",
    purpose: "Milde energieboost — vergelijkbaar met groene thee, geen crash",
  },
];

export default function EnergyPlusPage() {
  const product = getProduct("energy");
  const productImage =
    product?.image ||
    "https://amarecdn.azureedge.net/webassets/web/prod/products/Amare-Energy-Dragonfruit-EU-800.jpg";

  const productSchema = generateProductSchema({
    name: "Energy+",
    nameNL: "Amare Energy+",
    description:
      "Amare Energy+ is een natuurlijke energieformule met vitamine C (60 mg), L-glycine (1000 mg) en plantaardige polyfenolen uit framboos, druivenpit, pijnboomschors, appel en granaatappel. Bevat 27,64 mg natuurlijke cafeïne — vergelijkbaar met groene thee. Vrij van synthetische stimulanten.",
    image: productImage,
    slug: "energy",
    priceRetail: 59.84,
    priceSubscription: 55.48,
    ratingValue: 4.5,
    ratingCount: 500,
    affiliateUrl: "https://www.amare.com/2075008/nl-nl/EnergyPlus",
  });

  const combinedSchema = combineSchemas(
    productSchema,
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Energy+", url: "/energy" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="energy-schema" />

      {/* ── Breadcrumb ── */}
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">
          Home
        </a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">Energy+</span>
      </nav>

      {/* ── HERO + CTA #1 ── */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
              <Image
                src={productImage}
                alt="Amare Energy+ — natuurlijke energieformule met vitamine C en L-glycine"
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
                Amare Energy<span className="text-[var(--color-primary)]">+</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">
                Natuurlijke energie zonder crash — met vitamine C, L-glycine en
                plantaardige polyfenolen.
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Vitamine C ondersteunt het energiemetabolisme en helpt
                vermoeidheid te verminderen.{" "}
                <strong>Vanuit Nederland verzonden, geen douane.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <AffiliateCTA
                  label="Bestel bij Amare → €55,48/maand"
                  product="energy"
                  variant="primary"
                />
                <AffiliateCTA
                  label="Of eenmalig €59,84"
                  product="energy"
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

      {/* ── Wat is Energy+? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat is Energy+?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              <strong>Energy+</strong> is Amare's natuurlijke energieformule —
              ontwikkeld voor mensen die overdag meer energie willen zonder de
              nadelen van koffie of synthetische stimulanten. In plaats van je
              lichaam op te peppen met hoge doses cafeïne, werkt Energy+ via
              drie complementaire mechanismen:{" "}
              <strong>vitamine C voor het energiemetabolisme</strong>,{" "}
              <strong>L-glycine voor mentale helderheid</strong>, en{" "}
              <strong>plantaardige polyfenolen</strong> die cellen helpen
              beschermen tegen oxidatieve stress.
            </p>
            <p>
              Het resultaat is een formule die je natuurlijke energieniveau
              ondersteunt — niet overstimuleert. De 27,64 mg natuurlijke
              cafeïne per portie is vergelijkbaar met een kop groene thee en
              geeft een milde oppepper zonder de beruchte middagdip.
            </p>
            <p>Elk zakje Energy+ bevat:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Vitamine C (60 mg, 75% RI)</strong> — ondersteunt het
                energiemetabolisme en helpt bij de vermindering van
                vermoeidheid. Draagt ook bij aan de normale werking van het
                immuunsysteem.
              </li>
              <li>
                <strong>L-glycine (1000 mg)</strong> — een aminozuur dat werkt
                als neurotransmitter-precursor en bijdraagt aan mentale
                helderheid en focus.
              </li>
              <li>
                <strong>Plantaardige polyfenolenmix</strong> — framboos (met
                frambozenketonen), druivenpit, pijnboomschors, ApplePhenon®
                appel en granaatappel leveren een breed spectrum aan
                antioxidanten.
              </li>
              <li>
                <strong>Natuurlijke cafeïne (27,64 mg)</strong> — uit
                plantaardige bronnen, voor een milde energieboost.
              </li>
            </ul>
            <p>
              Energy+ is vrij van kunstmatige kleurstoffen en
              conserveringsmiddelen. Het komt in handige zakjes die je mengt
              met water, sap of een smoothie — geen pillen, geen gedoe.
            </p>
          </div>
        </div>
      </section>

      {/* ── Voor wie is dit? ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Voor wie is Energy+ geschikt?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "☕",
                title: "Koffiedrinkers die willen minderen",
                desc: "Die op zoek zijn naar een natuurlijk alternatief zonder cafeïnecrash, trillende handen of een verstoorde nachtrust.",
              },
              {
                icon: "💻",
                title: "Drukke professionals",
                desc: "Die aanhoudende energie nodig hebben voor een lange werkdag — zonder de achtbaan van suiker en cafeïne.",
              },
              {
                icon: "🏃",
                title: "Actieve sporters",
                desc: "Die hun energiemetabolisme willen ondersteunen met vitamine C en natuurlijke polyfenolen.",
              },
              {
                icon: "👩‍🎓",
                title: "Studenten & jongeren (12+)",
                desc: "Die tijdens intensieve studieperiodes hun concentratie en energie op peil willen houden.",
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
            Hoe gebruik je Energy+?
          </h2>
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Meng 1 zakje met 350 ml koude vloeistof
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Gebruik koud water, melk, sap, een smoothie of roer het door
                    yoghurt. Niet mengen met kokend water of sterk verhitte
                    vloeistoffen — dat kan de werkzame stoffen aantasten.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Neem bij voorkeur 's ochtends
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Het beste moment is bij het ontbijt of vroeg in de middag.
                    Door de lichte cafeïne-inhoud wordt inname in de avond
                    afgeraden als je gevoelig bent voor cafeïne. De vitamine C
                    en L-glycine werken optimaal in de eerste helft van de dag.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Dagelijks gebruiken voor het beste resultaat
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Energy+ is ontworpen voor dagelijkse inname. Het is geen
                    'booster' die je alleen neemt op drukke dagen — het
                    ondersteunt je natuurlijke energieniveau continu. Maak het
                    onderdeel van je ochtendritueel.
                  </p>
                </div>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]">
              <strong>⏰ Tijdsinvestering:</strong> Minder dan 1 minuut per
              ochtend.
              <br />
              <strong>👤 Geschikt voor:</strong> Volwassenen en jongeren vanaf
              12 jaar.
              <br />
              <strong>⚠ Let op:</strong> Bevat 27,64 mg cafeïne per portie.
              Niet gebruiken in combinatie met andere cafeïnehoudende
              supplementen op dezelfde dag.
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
                week: "Week 1-2",
                title: "Eerste signalen",
                items: [
                  "Mildere middagdip na de lunch",
                  "Minder behoefte aan koffie in de middag",
                  "Lichte toename in alertheid",
                ],
              },
              {
                week: "Week 3-4",
                title: "Duidelijke verandering",
                items: [
                  "Consistente energie gedurende de dag",
                  "Betere concentratie op werk/studie",
                  "Minder vermoeidheid in de avond",
                ],
              },
              {
                week: "Week 6-8",
                title: "Optimale resultaten",
                items: [
                  "Stabiel energieniveau zonder pieken/dalen",
                  "Natuurlijke alertheid zonder stimulanten",
                  "Betere mentale helderheid",
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
            Klaar voor natuurlijke energie zonder crash?
          </h2>
          <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
            Probeer Energy+ 30 dagen risicovrij. Niet tevreden? Geld terug.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <AffiliateCTA
              label="Bestel nu — Abonnement €55,48/maand"
              product="energy"
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
                Abonnement — Bespaar 7%
              </div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
                €55,48
                <span className="text-sm font-normal text-[var(--color-text-muted)]">
                  /maand
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Elke maand automatisch geleverd. Op elk moment opzegbaar.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ €4,36 goedkoper per maand</li>
                <li>✓ Nooit zonder voorraad</li>
                <li>✓ Gratis verzending</li>
              </ul>
              <AffiliateCTA
                label="Start abonnement →"
                product="energy"
                variant="primary"
              />
            </div>
            <div className="rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Eenmalige aankoop
              </div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
                €59,84
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Eenmalig bestellen, geen verplichtingen.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ Vrijblijvend</li>
                <li>✓ Voorraad voor 1 maand (30 zakjes)</li>
                <li>✓ Verzending €4,95</li>
              </ul>
              <AffiliateCTA
                label="Eenmalig bestellen →"
                product="energy"
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
              Ervaar natuurlijke energie zonder crash
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
              Energy+ is de natuurlijke energieformule van Amare — met vitamine
              C, L-glycine en plantaardige polyfenolen. 30 dagen risicovrij
              proberen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <AffiliateCTA
                label="Bestel Energy+ bij Amare →"
                product="energy"
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
              <br />* Raadpleeg bij aanhoudende klachten altijd een arts. Niet geschikt voor kinderen jonger dan 12 jaar.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
