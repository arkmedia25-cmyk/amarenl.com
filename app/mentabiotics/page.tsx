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
  title: "MentaBiotics Kopen — Probiotica voor Mentale Veerkracht | AmareNL",
  description:
    "Amare MentaBiotics met Cerebiome® blend: probiotica voor de darm-hersen-as. Magnesium voor normale psychologische functie. Vanuit Nederland verzonden, geen douane.",
};

const faqs = [
  {
    question: "Hoe snel merk ik iets van MentaBiotics?",
    answer:
      "De meeste gebruikers ervaren binnen 2-4 weken de eerste veranderingen bij consistent dagelijks gebruik. Omdat MentaBiotics inwerkt op de darm-hersen-as — een complex communicatienetwerk — heeft het lichaam tijd nodig om een nieuw evenwicht te vinden. Optimale resultaten worden doorgaans na 6-8 weken bereikt. Dit is geen quick fix, maar een duurzame ondersteuning van je mentale veerkracht.",
  },
  {
    question: "Wat is het verschil tussen MentaBiotics en gewone probiotica?",
    answer:
      "De meeste probiotica richten zich uitsluitend op spijsvertering. MentaBiotics is specifiek ontwikkeld voor de darm-hersen-as: het combineert de klinisch onderzochte Cerebiome® bacteriële blend (L. helveticus R0052, L. rhamnosus R0011, B. longum R0175) met prebiotische vezels, magnesium en botanische extracten zoals groene thee, druivenpit en pijnboomschors. Deze combinatie maakt het een gerichte formule voor mentaal welzijn, niet alleen voor de darmen.",
  },
  {
    question: "Kan ik MentaBiotics combineren met andere Amare producten?",
    answer:
      "Ja, MentaBiotics werkt uitstekend samen met Energy+ voor natuurlijke energie en met Amare EDGE+ voor focus. Samen vormen deze drie het Happy Juice Pack — Amare's populairste bundel. Ook met Restore (spijsverteringsenzymen) en Sunset (omega-3) is MentaBiotics goed te combineren. Begin met MentaBiotics en bouw je routine geleidelijk uit op basis van je behoeften.",
  },
  {
    question: "Hoe lang moet ik MentaBiotics gebruiken voor blijvend resultaat?",
    answer:
      "MentaBiotics is ontworpen voor dagelijks, langdurig gebruik. De darmflora is dynamisch en reageert continu op voeding, stress en omgevingsfactoren. Consistente dagelijkse inname helpt om een stabiel microbieel evenwicht te behouden. Veel gebruikers maken MentaBiotics onderdeel van hun vaste ochtendroutine — net zoals tandenpoetsen. Er is geen maximale gebruiksduur; het product is veilig voor langdurig gebruik.",
  },
  {
    question: "Is MentaBiotics veilig voor dagelijks gebruik?",
    answer:
      "MentaBiotics is een voedingssupplement, geen geneesmiddel. Het bevat van nature voorkomende bacteriestammen, prebiotische vezels, magnesium en botanische extracten — allemaal ingrediënten met een lange geschiedenis van veilig gebruik. Let op: MentaBiotics bevat 1 mg EGCG per dagelijkse dosis uit groene thee-extract; combineer het niet met andere groene theesupplementen op dezelfde dag. Niet geschikt voor zwangere vrouwen, borstvoeding gevende vrouwen en kinderen onder de 18 jaar.",
  },
  {
    question: "Wordt MentaBiotics vanuit Nederland verzonden?",
    answer:
      "Ja! Sinds begin 2026 worden Amare producten rechtstreeks vanuit Nederland verzonden via PostNL. Dat betekent: geen douaneproces, geen extra importkosten, en snelle levering — meestal 1-2 werkdagen. Ook naar België wordt zonder douane verzonden. Je ontvangt je MentaBiotics snel en zonder verrassingen.",
  },
];

const ingredientGroups = [
  {
    group: "Cerebiome® Probiotische Blend",
    items: "L. helveticus R0052, L. rhamnosus R0011, B. longum R0175",
    amount: "1 miljard KVE",
    purpose: "Klinisch onderzochte stammen voor de darm-hersen-as",
  },
  {
    group: "Prebiotische Vezels",
    items: "Isomalto-oligosacharide (2752 mg), Galacto-oligosacharide (1800 mg), Gedeeltelijk gehydrolyseerde guargom (1200 mg)",
    amount: "5752 mg totaal",
    purpose: "Voeding voor goede darmbacteriën",
  },
  {
    group: "Mineralen & Aminozuren",
    items: "Magnesium(oxide) (56,25 mg, 15% RI), L-glutamine (230 mg)",
    amount: "286,25 mg",
    purpose: "Magnesium draagt bij aan normale psychologische functie en vermindering van vermoeidheid",
  },
  {
    group: "Botanische Extracten",
    items: "Groene thee-extract (26,41 mg), Appelextract (100 mg), Gemberwortelextract (25 mg), Pijnboomschorsextract (20 mg), Druivenpitextract (15 mg)",
    amount: "186,41 mg",
    purpose: "Polyfenolen en antioxidanten uit natuurlijke bronnen",
  },
];

export default function MentaBioticsPage() {
  const product = getProduct("mentabiotics");
  const productImage =
    product?.image ||
    "https://amarecdn.azureedge.net/webassets/web/prod/products/Amare-Mentabiotics-EU-800.jpg";

  const productSchema = generateProductSchema({
    name: "Amare MentaBiotics®",
    nameNL: "Amare MentaBiotics®",
    description:
      "Amare MentaBiotics® combineert de klinisch onderzochte Cerebiome® bacteriële blend (1 miljard KVE) met prebiotische vezels, magnesium en botanische extracten. Specifiek ontwikkeld voor de darm-hersen-as — magnesium draagt bij aan een normale psychologische functie en aan de vermindering van vermoeidheid.",
    image: productImage,
    slug: "mentabiotics",
    priceRetail: 80.55,
    priceSubscription: 71.83,
    ratingValue: 4.5,
    ratingCount: 500,
    affiliateUrl:
      "https://www.amare.com/2075008/nl-nl/mentabiotics",
  });

  const combinedSchema = combineSchemas(
    productSchema,
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "MentaBiotics", url: "/mentabiotics" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="mentabiotics-schema" />

      {/* ── Breadcrumb ── */}
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">
          Home
        </a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">
          MentaBiotics
        </span>
      </nav>

      {/* ── HERO + CTA #1 ── */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
              <Image
                src={productImage}
                alt="Amare MentaBiotics — Cerebiome® probiotica voor mentale veerkracht"
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
                Amare MentaBiotics<span className="text-[var(--color-primary)]">®</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">
                Probiotica voor mentale veerkracht — met de klinisch onderzochte
                Cerebiome® blend, prebiotica en magnesium.
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Magnesium draagt bij aan een normale psychologische functie en
                aan de vermindering van vermoeidheid.{" "}
                <strong>Vanuit Nederland verzonden, geen douane.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <AffiliateCTA
                  label="Bestel bij Amare → €71,83/maand"
                  product="mentabiotics"
                  variant="primary"
                />
                <AffiliateCTA
                  label="Of eenmalig €80,55"
                  product="mentabiotics"
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

      {/* ── Wat is MentaBiotics? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat is MentaBiotics?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              <strong>MentaBiotics®</strong> is een multi-component probioticaformule
              van Amare, specifiek ontwikkeld voor de{" "}
              <strong>darm-hersen-as</strong> — het complexe
              communicatienetwerk tussen je darmen en je hersenen. Waar gewone
              probiotica zich meestal alleen op spijsvertering richten, pakt
              MentaBiotics het breder aan: het combineert probiotische stammen,
              prebiotische vezels, magnesium en botanische extracten in één
              dagelijkse sachet.
            </p>
            <p>
              De kern van de formule is de{" "}
              <strong>
                Cerebiome® bacteriële blend — L. helveticus R0052, L. rhamnosus
                R0011 en B. longum R0175
              </strong>{" "}
              — met 1 miljard KVE (kolonievormende eenheden) per portie. Deze
              specifieke stammen zijn uitgebreid onderzocht op hun interactie
              met de darm-hersen-as via de nervus vagus.
            </p>
            <p>
              Daarnaast bevat elk sachet:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Prebiotische vezels</strong> (isomalto-oligosacharide,
                galacto-oligosacharide, guargom) — dienen als voeding voor
                goede darmbacteriën en ondersteunen de darmflora.
              </li>
              <li>
                <strong>Magnesium (56,25 mg, 15% RI)</strong> — een mineraal
                dat bijdraagt aan een normale psychologische functie, een
                normaal energieleverend metabolisme en aan de vermindering van
                vermoeidheid.
              </li>
              <li>
                <strong>L-glutamine (230 mg)</strong> — een aminozuur dat een
                rol speelt in de darmgezondheid.
              </li>
              <li>
                <strong>Botanische extracten</strong> — groene thee, druivenpit,
                pijnboomschors, gember en appel leveren polyfenolen die cellen
                helpen beschermen tegen oxidatieve stress.
              </li>
            </ul>
            <p>
              MentaBiotics komt in handige sachets die je mengt met water —
              geen capsules, geen pillen. De vloeibare inname zorgt voor een
              optimale opname van de actieve ingrediënten.
            </p>
          </div>
        </div>
      </section>

      {/* ── Voor wie is dit? ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Voor wie is MentaBiotics geschikt?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "💼",
                title: "Drukke professionals met stress",
                desc: "Die hun mentale veerkracht willen ondersteunen tijdens veeleisende periodes — zonder cafeïne of stimulanten.",
              },
              {
                icon: "😰",
                title: "Mensen met stemmingswisselingen",
                desc: "Die op zoek zijn naar een natuurlijke manier om hun emotionele balans te ondersteunen via de darm-hersen-as.",
              },
              {
                icon: "🔬",
                title: "Gezondheidsbewuste volwassenen",
                desc: "Die de wetenschap achter de gut-brain connectie begrijpen en hun microbioom willen optimaliseren.",
              },
              {
                icon: "😴",
                title: "Mensen met aanhoudende vermoeidheid",
                desc: "Die baat hebben bij magnesium — het mineraal dat bijdraagt aan de vermindering van vermoeidheid en een normaal energieleverend metabolisme.",
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
            Hoe gebruik je MentaBiotics?
          </h2>
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Meng 1 sachet met 250 ml water
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Gebruik koud of lauw water — geen kokend water, dat kan de
                    probiotische bacteriën beschadigen. Roer goed door tot het
                    poeder volledig is opgelost.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Neem bij je ontbijt — niet op een lege maag
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    De aanwezigheid van voedsel helpt de probiotica om de maag
                    te passeren en de darmen te bereiken. Een ontbijt met wat
                    vezels is ideaal.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">
                    Wees consistent — dagelijks gebruik
                  </strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    De darmflora gedijt op regelmaat. Dagelijkse inname op
                    hetzelfde tijdstip geeft de beste resultaten. Maak het
                    onderdeel van je ochtendroutine.
                  </p>
                </div>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]">
              <strong>⏰ Tijdsinvestering:</strong> Minder dan 2 minuten per
              ochtend.
              <br />
              <strong>⚠ Let op:</strong> Bevat 1 mg EGCG per dosis uit groene
              thee-extract. Niet combineren met andere groene theesupplementen
              op dezelfde dag. Niet geschikt voor zwangere vrouwen,
              borstvoeding gevende vrouwen en kinderen &lt;18 jaar.
              <br />
              <strong>📅 Consistentie:</strong> Dagelijks gebruik geeft de beste
              resultaten. Eerste effecten vaak na 2-4 weken.
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
                  "Lichtere spijsvertering",
                  "Iets stabielere stemming",
                  "Minder opgeblazen gevoel",
                ],
              },
              {
                week: "Week 3-4",
                title: "Duidelijke verandering",
                items: [
                  "Betere emotionele balans",
                  "Minder vermoeidheid overdag",
                  "Rustiger reactie op stress",
                ],
              },
              {
                week: "Week 6-8",
                title: "Optimale resultaten",
                items: [
                  "Consistente mentale veerkracht",
                  "Stabiele stemming",
                  "Goede spijsvertering",
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
            Klaar voor meer mentale veerkracht?
          </h2>
          <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
            Probeer MentaBiotics 30 dagen risicovrij. Niet tevreden? Geld terug.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <AffiliateCTA
              label="Bestel nu — Abonnement €71,83/maand"
              product="mentabiotics"
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
                Abonnement — Bespaar 11%
              </div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
                €71,83
                <span className="text-sm font-normal text-[var(--color-text-muted)]">
                  /maand
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Elke maand automatisch geleverd. Op elk moment opzegbaar.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ €8,72 goedkoper per maand</li>
                <li>✓ Nooit zonder voorraad</li>
                <li>✓ Gratis verzending</li>
              </ul>
              <AffiliateCTA
                label="Start abonnement →"
                product="mentabiotics"
                variant="primary"
              />
            </div>
            <div className="rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Eenmalige aankoop
              </div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
                €80,55
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">
                Eenmalig bestellen, geen verplichtingen.
              </p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ Vrijblijvend</li>
                <li>✓ Voorraad voor 1 maand (30 sachets)</li>
                <li>✓ Verzending €4,95</li>
              </ul>
              <AffiliateCTA
                label="Eenmalig bestellen →"
                product="mentabiotics"
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
              Ervaar de darm-hersen connectie zelf
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
              MentaBiotics is de #1 bestseller onder Amare's losse producten.
              Wetenschappelijk onderbouwd, gemaakt met natuurlijke ingrediënten.
              30 dagen risicovrij proberen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <AffiliateCTA
                label="Bestel MentaBiotics bij Amare →"
                product="mentabiotics"
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
              <br />* Raadpleeg bij aanhoudende klachten altijd een arts. Niet geschikt voor zwangere vrouwen, borstvoeding gevende vrouwen en kinderen jonger dan 18 jaar.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
