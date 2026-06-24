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
  title: "Restore Kopen — Probiotica & Spijsverteringsenzymen | AmareNL",
  description:
    "Amare Restore: 5 probiotische stammen (2 miljard KVE) + 5 enzymen incl. lactase + 9 botanische extracten. Voor darmflora & spijsvertering. Direct van Amare — premium kwaliteit.",
  alternates: { canonical: "/restore" },
  openGraph: {
    title: "Restore Kopen — Probiotica & Spijsverteringsenzymen | AmareNL",
    description: "Amare Restore: 5 probiotische stammen + 5 enzymen + 9 botanische extracten voor darmflora.",
    url: "/restore",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restore Kopen — Probiotica & Spijsverteringsenzymen | AmareNL",
    description: "Amare Restore: 5 probiotische stammen + 5 enzymen + 9 botanische extracten voor darmflora.",
    images: ["/images/og-default.jpg"],
  },
}

const faqs = [
  {
    question: "Wat is het verschil tussen Restore en MentaBiotics?",
    answer:
      "Restore richt zich op spijsvertering met 5 spijsverteringsenzymen (waaronder lactase voor lactosevertering), 5 probiotische stammen en 9 botanische extracten zoals gember en venkel. MentaBiotics richt zich specifiek op de darm-hersen-as met de klinisch onderzochte Cerebiome® blend, magnesium en botanische extracten. Beide vullen elkaar aan: Restore voor de spijsvertering, MentaBiotics voor mentale veerkracht.",
  },
  {
    question: "Helpt Restore bij lactose-intolerantie?",
    answer:
      "Restore bevat het enzym lactase (1000 ALU per 2 capsules) dat helpt bij de vertering van lactose — de melksuiker waar mensen met lactose-intolerantie moeite mee hebben. Neem de capsules bij een maaltijd die lactose bevat. Restore is zelf lactosevrij en vervangt geen medisch dieet, maar kan ondersteuning bieden bij het verteren van kleine hoeveelheden lactose.",
  },
  {
    question: "Wanneer moet ik Restore innemen voor het beste resultaat?",
    answer:
      "Neem 2 capsules bij de eerste maaltijd van de dag en nogmaals 2 capsules bij een volgende maaltijd — totaal 4 capsules per dag. Innemen bij de maaltijd is essentieel omdat de spijsverteringsenzymen dan direct kunnen werken op het voedsel dat je verteert. Niet meer dan 6 capsules per dag innemen.",
  },
  {
    question: "Kan ik Restore dagelijks gebruiken?",
    answer:
      "Ja, Restore is ontworpen voor dagelijks gebruik bij de maaltijden. De 5 probiotische stammen ondersteunen continu je darmflora, terwijl de enzymen helpen bij de dagelijkse vertering. Consistent gebruik geeft de beste resultaten. Er is geen maximale gebruiksduur — Restore is geschikt voor langdurig dagelijks gebruik.",
  },
  {
    question: "Zijn er bijwerkingen bij het starten met Restore?",
    answer:
      "Sommige gebruikers ervaren de eerste dagen lichte veranderingen in de stoelgang wanneer ze starten met probiotica — dit is normaal en meestal tijdelijk. Je darmflora past zich aan de nieuwe bacteriestammen aan. Als dit langer dan een week aanhoudt, halveer dan de dosering en bouw langzaam op.",
  },
  {
    question: "Kan ik dit product gebruiken in combinatie met medicatie?",
    answer:
      "Raadpleeg altijd eerst je arts voordat je supplementen combineert met voorgeschreven medicatie. Hoewel Amare producten gemaakt zijn met natuurlijke ingrediënten, kunnen interacties met bepaalde medicijnen niet worden uitgesloten. Je arts kent jouw medische geschiedenis en kan het beste adviseren.",
  },
];

const ingredientGroups = [
  {
    group: "Probiotische Blend",
    items: "B. infantis, L. plantarum, L. rhamnosus, B. longum, L. acidophilus",
    amount: "2 miljard KVE (per 2 caps)",
    purpose: "5 bacteriestammen ter ondersteuning van een gezonde darmflora",
  },
  {
    group: "Spijsverteringsenzymen",
    items: "Amylase (6250 SKB), Protease (2500 HUT), Lactase (1000 ALU), Lipase (250 IE), Cellulase (100 IE)",
    amount: "250 mg (per 2 caps)",
    purpose: "Helpt bij vertering van koolhydraten, eiwitten, lactose, vetten en vezels",
  },
  {
    group: "Botanische Basis",
    items: "Paardenbloemwortel (150 mg), Gemberwortel (50 mg), Mariadistelzaad (20 mg), Heermoes (15 mg), Jeneverbes (15 mg), Venkelzaad (15 mg), Heemstwortel (15 mg), Peterselieblad (10 mg)",
    amount: "290 mg totaal",
    purpose: "Traditionele kruiden ter ondersteuning van de spijsvertering",
  },
  {
    group: "Absorptiebooster",
    items: "Zwartepeperzaadextract (4:1), Roze Himalaya-zout (50 mg)",
    amount: "51,27 mg",
    purpose: "Zwarte peper ondersteunt de opname van voedingsstoffen",
  },
];

export default function RestorePage() {
  const product = getProduct("restore");
  const productImage =
    product?.image ||
    "https://amarecdn.azureedge.net/webassets/web/prod/products/Restore-EU-800.jpg";

  const productSchema = generateProductSchema({
    name: "Amare Restore",
    nameNL: "Amare Restore",
    description:
      "Amare Restore combineert 5 probiotische bacteriestammen (2 miljard KVE) met 5 spijsverteringsenzymen (incl. lactase) en 9 botanische extracten voor complete spijsverteringsondersteuning. Lactosevrij, glutenvrij, sojavrij.",
    image: productImage,
    slug: "restore",
    priceRetail: 33.01,
    priceSubscription: 29.70,
    ratingValue: 4.5,
    ratingCount: 380,
    affiliateUrl: "https://www.amare.com/2075008/nl-nl/restore",
  });

  const combinedSchema = combineSchemas(
    productSchema,
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Restore", url: "/restore" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="restore-schema" />

      {/* ── Breadcrumb ── */}
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">Home</a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">Restore</span>
      </nav>

      {/* ── HERO + CTA #1 ── */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
              <Image
                src={productImage}
                alt="Amare Restore — probiotica en spijsverteringsenzymen"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-[9px] text-[var(--color-text-muted)]">
                  ⭐ 4.5/5 (380+ reviews)
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
                Amare <span className="text-[var(--color-primary)]">Restore</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">
                5 probiotische stammen + 5 spijsverteringsenzymen + 9 botanische
                extracten — complete formule voor darmflora en vertering.
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Inclusief lactase voor ondersteuning bij lactose-intolerantie.{" "}
                <strong>Direct van Amare — premium kwaliteit.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <AffiliateCTA
                  label="Bestel bij Amare → €29,70/maand"
                  product="restore"
                  variant="primary"
                />
                <AffiliateCTA
                  label="Of eenmalig €33,01"
                  product="restore"
                  variant="secondary"
                />
              </div>
              <p className="text-[9px] text-[var(--color-text-muted)]">
                * Affiliate link — je betaalt hetzelfde bedrag. Abonnement op elk moment opzegbaar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wat is Restore? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat is Restore?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              <strong>Restore</strong> is Amare's complete spijsverteringsformule —
              ontwikkeld voor iedereen die zijn darmflora en vertering op een
              natuurlijke manier wil ondersteunen. Waar veel probiotica zich
              beperken tot één of twee stammen, combineert Restore drie
              complementaire systemen:{" "}
              <strong>5 probiotische stammen</strong> (2 miljard KVE per
              dosering), <strong>5 spijsverteringsenzymen</strong> en{" "}
              <strong>9 botanische extracten</strong>.
            </p>
            <p>Wat maakt Restore bijzonder:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Probiotica (2 miljard KVE)</strong> — 5 zorgvuldig
                geselecteerde stammen: B. infantis, L. plantarum, L. rhamnosus,
                B. longum en L. acidophilus. Deze combinatie ondersteunt de
                diversiteit van de darmflora.
              </li>
              <li>
                <strong>Enzymencomplex (250 mg)</strong> — amylase voor
                koolhydraten, protease voor eiwitten, lactase voor lactose,
                lipase voor vetten en cellulase voor vezels. Vooral lactase
                (1000 ALU) is waardevol voor mensen met lactose-intolerantie.
              </li>
              <li>
                <strong>Botanische extracten (290 mg)</strong> — paardenbloem,
                gember, mariadistel, venkel, jeneverbes en meer. Kruiden die
                traditioneel worden gebruikt ter ondersteuning van de
                spijsvertering.
              </li>
              <li>
                <strong>Zwarte peper-extract</strong> — ondersteunt de opname
                van voedingsstoffen uit de voeding en de formule zelf.
              </li>
            </ul>
            <p>
              Restore is lactosevrij, glutenvrij, sojavrij en geschikt voor
              vegetariërs. Het komt in plantaardige capsules — geen poeders,
              geen gedoe.
            </p>
          </div>
        </div>
      </section>

      {/* ── Voor wie is dit? ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Voor wie is Restore geschikt?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "🥛",
                title: "Mensen met lactose-intolerantie",
                desc: "Die baat hebben bij lactase (1000 ALU per 2 caps) om lactose uit zuivel beter te verteren.",
              },
              {
                icon: "🍽️",
                title: "Eters met een opgeblazen gevoel",
                desc: "Die na de maaltijd last hebben van winderigheid of een vol gevoel — de enzymen helpen bij de afbraak van voeding.",
              },
              {
                icon: "🔄",
                title: "Wie zijn darmflora wil herstellen",
                desc: "Na antibiotica, bij onregelmatige stoelgang, of als onderdeel van een gezonde levensstijl.",
              },
              {
                icon: "🌿",
                title: "Fan van natuurlijke formules",
                desc: "Die probiotica en spijsverteringsenzymen willen combineren met traditionele kruiden zoals gember en venkel.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-[var(--color-border)]">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">{item.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wat zit erin? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat zit erin? — Ingrediënten per 2 capsules
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--color-primary)] text-left">
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">Groep</th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">Ingrediënten</th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">Hoeveelheid</th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">Functie</th>
                </tr>
              </thead>
              <tbody>
                {ingredientGroups.map((g, i) => (
                  <tr key={i} className="border-b border-[var(--color-border)]">
                    <td className="py-3 px-4 font-bold text-[var(--color-text)] align-top">{g.group}</td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">{g.items}</td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">{g.amount}</td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">{g.purpose}</td>
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
            Hoe gebruik je Restore?
          </h2>
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">1</span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">2 capsules bij de eerste maaltijd</strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Neem de eerste 2 capsules bij je ontbijt of lunch. De enzymen werken direct op het voedsel dat je op dat moment eet.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">2</span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">Nogmaals 2 capsules bij een volgende maaltijd</strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Neem de tweede dosering bij de lunch of avondeten — totaal 4 capsules per dag. Maximaal 6 capsules per dag.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">3</span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">Blijf consistent — neem dagelijks bij de maaltijd</strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">De probiotica werken cumulatief. Dagelijks gebruik geeft de beste ondersteuning voor darmflora en spijsvertering.</p>
                </div>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]">
              <strong>⏰ Inname:</strong> Bij de maaltijd — essentieel voor de enzymwerking.<br />
              <strong>👤 Geschikt voor:</strong> Volwassenen en kinderen vanaf 12 jaar.<br />
              <strong>🌿 Dieet:</strong> Lactosevrij, glutenvrij, sojavrij. Geschikt voor vegetariërs.<br />
              <strong>📦 Inhoud:</strong> 120 capsules — 30 porties.
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
            Resultaten verschillen per persoon. Dit is wat veel gebruikers rapporteren:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { week: "Week 1", title: "Aanpassingsfase", items: ["Lichtere vertering direct na maaltijd", "Minder opgeblazen gevoel bij lactose", "Darmen passen zich aan de probiotica aan"] },
              { week: "Week 2-4", title: "Duidelijke verbetering", items: ["Regelmatigere stoelgang", "Minder winderigheid na maaltijden", "Comfortabeler gevoel in de buik"] },
              { week: "Week 4-8", title: "Optimale resultaten", items: ["Consistente, comfortabele spijsvertering", "Betere tolerantie voor lactose", "Stabiele darmfunctie"] },
            ].map((phase, i) => (
              <div key={i} className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]">
                <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">{phase.week}</div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-2">{phase.title}</h3>
                <ul className="space-y-1">
                  {phase.items.map((item, j) => (
                    <li key={j} className="text-xs text-[var(--color-text-muted)] flex gap-2"><span className="text-[var(--color-primary)]">✓</span> {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[var(--color-text-muted)] italic">
            * Deze ervaringen zijn gebaseerd op gebruikersrapportages en zijn niet beoordeeld door de NVWA. Individuele resultaten kunnen variëren. Voedingssupplementen zijn geen vervanging voor een gevarieerd dieet en gezonde levensstijl.
          </p>
        </div>
      </section>

      {/* ── CTA #2 (Midden) ── */}
      <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">Klaar voor een betere spijsvertering?</h2>
          <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">Probeer Restore 30 dagen risicovrij. Niet tevreden? Geld terug.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <AffiliateCTA label="Bestel nu — Abonnement €29,70/maand" product="restore" variant="urgency" />
          </div>
          <p className="mt-4 text-[10px] text-white/60">
            🛡️ 30 dagen geld-terug-garantie &middot; 🚚 Gratis verzending vanaf €175 &middot; 📦 Direct van Amare
          </p>
        </div>
      </section>

      {/* ── Prijzen ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Prijzen en besparingen</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[var(--color-bg-soft)] rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">Abonnement — Bespaar 10%</div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">€29,70<span className="text-sm font-normal text-[var(--color-text-muted)]">/maand</span></div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">Elke maand automatisch geleverd. Op elk moment opzegbaar.</p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ €3,31 goedkoper per maand</li>
                <li>✓ Nooit zonder voorraad</li>
                <li>✓ Gratis verzending</li>
              </ul>
              <AffiliateCTA label="Start abonnement →" product="restore" variant="primary" />
            </div>
            <div className="rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Eenmalige aankoop</div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">€33,01</div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">Eenmalig bestellen, geen verplichtingen.</p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ Vrijblijvend</li>
                <li>✓ 120 capsules per verpakking</li>
                <li>✓ Verzending €4,95</li>
              </ul>
              <AffiliateCTA label="Eenmalig bestellen →" product="restore" variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Veelgestelde vragen ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group">
                <summary className="p-5 font-bold text-sm text-[var(--color-text)] cursor-pointer hover:text-[var(--color-primary)] transition-colors list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-[var(--color-primary)] text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA #3 (Onderaan) ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-2xl text-center">
          <div className="bg-[var(--color-bg-soft)] rounded-2xl p-8 border border-[var(--color-border)]">
            <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3">Geef je darmen de ondersteuning die ze verdienen</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
              Restore combineert probiotica, enzymen en botanische extracten in één complete formule. 30 dagen risicovrij proberen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <AffiliateCTA label="Bestel Restore bij Amare →" product="restore" variant="primary" />
              <AffiliateCTA label="Of bekijk alle producten" product="" variant="secondary" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              <span>🛡️ 30 dagen garantie</span><span className="text-[var(--color-border)]">|</span>
              <span>🚚 Wetenschappelijk onderbouwd</span><span className="text-[var(--color-border)]">|</span>
              <span>🌿 Natuurlijke ingrediënten</span><span className="text-[var(--color-border)]">|</span>
              <span>⭐ 10.000+ klanten</span>
            </div>
            <p className="mt-6 text-[9px] text-[var(--color-text-muted)]">
              * Affiliate link — je betaalt hetzelfde bedrag, wij ontvangen een commissie.<br />
              * Deze uitspraken zijn niet beoordeeld door de NVWA. Voedingssupplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.<br />
              * Raadpleeg bij aanhoudende klachten altijd een arts. Geschikt voor volwassenen en kinderen vanaf 12 jaar.
            </p>
          </div>
        </div>
      
      <StickyMobileCTA product="restore" subscriptionPrice="€29,70" />
</section>
    </>
  );
}
