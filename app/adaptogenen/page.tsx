import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import {
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata = {
  title: "Adaptogenen: De Complete Gids voor Natuurlijke Stressverlichting (2026) | AmareNL",
  description:
    "Alles over adaptogenen zoals Ashwagandha, Rhodiola en Heilige Basilicum. Complete gids: wat zijn adaptogenen, hoe werken ze, welke passen bij jou en het beste adaptogeen supplement kopen.",
};

const faqs = [
  {
    question: "Wat zijn adaptogenen precies?",
    answer:
      "Adaptogenen zijn natuurlijke stoffen — meestal kruiden of paddenstoelen — die je lichaam helpen zich aan te passen aan fysieke, chemische en biologische stress. De term werd in 1947 geïntroduceerd door de Russische toxicoloog Dr. Nikolai Lazarev. Om als adaptogeen te kwalificeren moet een stof aan drie criteria voldoen: (1) het moet aspecifiek werken — het verhoogt weerstand tegen verschillende soorten stress, niet slechts één; (2) het normaliseert lichaamsfuncties zonder bestaande processen te verstoren; en (3) het is niet-toxisch bij normaal gebruik.",
  },
  {
    question: "Wat is de beste adaptogeen voor stress?",
    answer:
      "Ashwagandha (Withania somnifera) is het meest onderzochte adaptogeen voor stressvermindering — met meer dan 40 klinische studies. Het verlaagt cortisol met gemiddeld 27-30%, verbetert slaapkwaliteit en vermindert angstsymptomen. Rhodiola rosea is het beste adaptogeen voor mentale en fysieke vermoeidheid — het verbetert uithoudingsvermogen en cognitieve prestaties onder stress. Voor optimale resultaten combineren veel formules meerdere adaptogenen.",
  },
  {
    question: "Hoe snel werken adaptogenen?",
    answer:
      "In tegenstelling tot cafeïne of medicatie werken adaptogenen cumulatief. De meeste gebruikers ervaren subtiele effecten binnen 1-2 weken: een gevoel van 'rustigere energie', betere stressbestendigheid en verbeterde slaap. De volledige effecten op de HPA-as (hypothalamus-hypofyse-bijnier-as) ontwikkelen zich over 4-8 weken consistent gebruik. Adaptogenen reguleren — ze stimuleren of onderdrukken niet — en die regulatie kost tijd.",
  },
  {
    question: "Zijn adaptogenen veilig om dagelijks te nemen?",
    answer:
      "De meeste adaptogenen zijn veilig voor dagelijks langdurig gebruik bij de aanbevolen dosering. Ashwagandha is veilig bevonden in studies tot 6 maanden aaneengesloten gebruik. Sommige adaptogenen hebben contra-indicaties: Ashwagandha wordt afgeraden bij zwangerschap, Rhodiola kan bij hoge doseringen duizeligheid veroorzaken, en Panax ginseng kan interacteren met bloedverdunners. Raadpleeg bij twijfel of medicijngebruik altijd je arts.",
  },
  {
    question: "Wat is het verschil tussen adaptogenen en nootropics?",
    answer:
      "Adaptogenen helpen je lichaam omgaan met stress en normaliseren fysiologische functies — ze werken systemisch op je stressrespons. Nootropics (zoals Lion's Mane, Bacopa monnieri, cafeïne) richten zich specifiek op cognitieve functies: focus, geheugen, mentale helderheid. Er is overlap — Lion's Mane is zowel een adaptogeen (stressregulatie) als een nootropic (NGF-stimulatie voor hersencellen). Amare MentaFocus® en EDGE+ combineren adaptogene en nootropische ingrediënten voor breedspectrum cognitieve ondersteuning.",
  },
  {
    question: "Kun je adaptogenen combineren met probiotica?",
    answer:
      "Absoluut. Adaptogenen en probiotica werken via complementaire mechanismen. Adaptogenen ondersteunen de HPA-as en normaliseren cortisol — chronisch verhoogd cortisol verstoort juist je microbioom. Probiotica versterken de darmbarrière en moduleren ontstekingen — ontstekingen activeren de stressrespons. De combinatie (adaptogeen + probioticum) creëert een positieve feedbackloop die effectiever is dan elk afzonderlijk. Dit is de rationale achter Amare's gut-brain filosofie met producten zoals MentaBiotics® en MentaFocus®.",
  },
];

export default function AdaptogenenPage() {
  const articleSchema = generateArticleSchema({
    title: "Adaptogenen: De Complete Gids voor Natuurlijke Stressverlichting (2026)",
    description:
      "Alles over adaptogenen zoals Ashwagandha, Rhodiola en Heilige Basilicum. Complete gids met wetenschappelijke onderbouwing.",
    datePublished: "2026-07-13",
    slug: "adaptogenen",
    category: "mentaal",
    image: "/images/blog/adaptogenen.jpg",
    citations: [
      {
        author: "Chandrasekhar K et al.",
        name: "A prospective, randomized double-blind, placebo-controlled study of safety and efficacy of a high-concentration full-spectrum extract of Ashwagandha root in reducing stress and anxiety in adults. Indian Journal of Psychological Medicine, 2012",
      },
      {
        author: "Panossian A, Wikman G.",
        name: "Effects of Adaptogens on the Central Nervous System and the Molecular Mechanisms Associated with Their Stress—Protective Activity. Pharmaceuticals, 2010",
      },
      {
        author: "Voedingscentrum",
        name: "Kruiden en gezondheid — Wat zegt de wetenschap?",
      },
    ],
  });
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://amarenl.com" },
    { name: "Adaptogenen", url: "https://amarenl.com/adaptogenen" },
  ]);
  const combinedSchema = combineSchemas(articleSchema, faqSchema, breadcrumbSchema);

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="adaptogenen-schema" />
      <article className="bg-white min-h-screen font-nunito">
        <header className="bg-[var(--color-bg-soft)] py-20 border-b border-[var(--color-border)]">
          <div className="container-page max-w-4xl">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-8">
              Pillar Page · Mentale Wellness
            </div>
            <h1 className="text-4xl md:text-6xl font-cormorant font-bold text-[var(--color-text)] leading-tight mb-8">
              Adaptogenen: Natuurlijke Stressverlichting voor Lichaam en Geest
            </h1>
            <p className="text-xl text-[var(--color-text-muted)] leading-relaxed italic border-l-4 border-[var(--color-primary)] pl-6">
              In een wereld die nooit stilstaat, zoekt je lichaam naar balans. Adaptogenen — de eeuwenoude kruiden
              en paddenstoelen uit de Ayurveda en Traditionele Chinese Geneeskunde — helpen je lichaam precies dat te
              doen: aanpassen, herstellen en gedijen onder druk. Ontdek welke adaptogenen écht werken en hoe je ze
              gebruikt voor meer rust, energie en veerkracht.
            </p>
          </div>
        </header>

        {/* Wat zijn adaptogenen */}
        <section className="container-page max-w-4xl py-16">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat zijn adaptogenen en hoe werken ze?
          </h2>
          <p className="text-[var(--color-text)] leading-relaxed mb-4">
            Adaptogenen zijn een unieke klasse van natuurlijke stoffen die je lichaam helpen weerstand te bieden
            tegen <strong>alle vormen van stress</strong> — fysiek, chemisch, biologisch en psychologisch. Het concept
            werd in de jaren 1940 ontwikkeld door Sovjetwetenschappers die op zoek waren naar stoffen die soldaten,
            atleten en kosmonauten konden helpen presteren onder extreme omstandigheden. Wat ze ontdekten was
            opmerkelijk: bepaalde kruiden hielpen het lichaam niet door het te stimuleren (zoals cafeïne) of te
            verdoven (zoals kalmeringsmiddelen), maar door het <em>te normaliseren</em>.
          </p>
          <p className="text-[var(--color-text)] leading-relaxed mb-4">
            De kern van hun werking ligt in de <strong>HPA-as</strong> (hypothalamus-hypofyse-bijnier-as) — het centrale
            stressregulatiesysteem van je lichaam. Wanneer je stress ervaart, activeert je hypothalamus de hypofyse,
            die op zijn beurt je bijnieren aanzet tot cortisolproductie. Bij chronische stress raakt dit systeem
            ontregeld: cortisol blijft te hoog of schommelt juist te veel. Adaptogenen grijpen in op meerdere
            niveaus van deze cascade — ze verhogen de expressie van heat shock proteins (HSP70) die cellen beschermen
            tegen stressschade, moduleren de afgifte van stresshormonen en ondersteunen mitochondriële functie.
          </p>
        </section>

        {/* De belangrijkste adaptogenen */}
        <section className="container-page max-w-4xl py-12">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">
            De 8 Belangrijkste Adaptogenen — Wetenschappelijk Onderbouwd
          </h2>

          <div className="space-y-10">
            <div className="bg-white border border-[var(--color-border)] rounded-lg p-8">
              <h3 className="text-2xl font-cormorant font-bold text-[var(--color-primary)] mb-2">
                1. Ashwagandha (Withania somnifera)
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
                Ayurvedische Ginseng · Cortisolverlagend · Slaapondersteunend
              </p>
              <p className="text-[var(--color-text)] leading-relaxed mb-4">
                Ashwagandha is het meest onderzochte adaptogeen ter wereld, met meer dan 40 klinische studies. Het
                werkzame bestanddeel — withanoliden — bindt aan GABA-receptoren in de hersenen en moduleert de HPA-as.
                In de landmark-studie van Chandrasekhar et al. (2012) ervoeren deelnemers een <strong>44% reductie
                in stressscores</strong> en een gemiddelde cortisoldaling van 27,9% na 60 dagen gebruik van 300mg
                KSM-66® Ashwagandha-extract. Andere studies tonen verbeteringen in slaapkwaliteit (28% sneller in
                slaap vallen), testosteronspiegel (17% stijging bij mannen) en fysiek uithoudingsvermogen.
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                <strong>Aanbevolen dosering:</strong> 300-600mg gestandaardiseerd extract (5% withanoliden) per dag.{" "}
                <strong>Beste tijd:</strong> &apos;Avonds vanwege de kalmerende werking.
              </p>
            </div>

            <div className="bg-white border border-[var(--color-border)] rounded-lg p-8">
              <h3 className="text-2xl font-cormorant font-bold text-[var(--color-primary)] mb-2">
                2. Rhodiola rosea (Rozewortel)
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
                Arctische Wortel · Mentale Energie · Fysiek Uithoudingsvermogen
              </p>
              <p className="text-[var(--color-text)] leading-relaxed mb-4">
                Rhodiola gedijt in de extreme omstandigheden van het arctisch gebied — en helpt jouw lichaam hetzelfde
                te doen. De actieve bestanddelen (rosavins en salidrosiden) verbeteren de zuurstofopname in cellen
                en verhogen de ATP-productie in mitochondriën. Klinisch onderzoek toont dat Rhodiola <strong>mentale
                vermoeidheid met 20% vermindert</strong> tijdens stressvolle cognitieve taken, fysiek uithoudingsvermogen
                verbetert en burn-out symptomen verlicht. Het is het beste adaptogeen voor &apos;s ochtends — het geeft
                energie zonder de bijwerkingen van cafeïne.
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                <strong>Aanbevolen dosering:</strong> 200-400mg gestandaardiseerd extract (3% rosavins, 1% salidrosiden).{" "}
                <strong>Beste tijd:</strong> &apos;Ochtends vanwege de energie-gevende werking.
              </p>
            </div>

            <div className="bg-white border border-[var(--color-border)] rounded-lg p-8">
              <h3 className="text-2xl font-cormorant font-bold text-[var(--color-primary)] mb-2">
                3. Lion&apos;s Mane (Hericium erinaceus)
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
                Pruikzwam · NGF-Stimulatie · Focus & Cognitie
              </p>
              <p className="text-[var(--color-text)] leading-relaxed mb-4">
                Lion&apos;s Mane is een medicinale paddenstoel die de productie van <strong>Nerve Growth Factor
                (NGF)</strong> stimuleert — een eiwit dat essentieel is voor de groei, het onderhoud en het herstel
                van neuronen. Het is een van de weinige natuurlijke stoffen die de bloed-hersenbarrière kan passeren
                en direct hersencellen ondersteunt. Japanse studies tonen verbeteringen in cognitieve functie,
                geheugen en concentratie bij gezonde volwassenen. Daarnaast heeft Lion&apos;s Mane anxiolytische
                (angstverminderende) eigenschappen via ontstekingsmodulatie in de hippocampus.
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                <strong>Aanbevolen dosering:</strong> 500-1000mg extract (30% polysacchariden) per dag.{" "}
                <strong>Beste tijd:</strong> &apos;Ochtends of vroeg in de middag.
              </p>
            </div>
          </div>
        </section>

        {/* Adaptogenen voor specifieke doelen */}
        <section className="container-page max-w-4xl py-12">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">
            Welk Adaptogeen Past bij Jou?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--color-bg-soft)] rounded-lg p-6">
              <h4 className="font-bold text-[var(--color-text)] mb-2">😰 Voor stress &amp; angst</h4>
              <p className="text-sm text-[var(--color-text-muted)]">Ashwagandha KSM-66® + L-theanine</p>
              <p className="text-xs text-[var(--color-primary)] mt-1">→ Amare MentaBiotics® + EDGE+</p>
            </div>
            <div className="bg-[var(--color-bg-soft)] rounded-lg p-6">
              <h4 className="font-bold text-[var(--color-text)] mb-2">⚡ Voor energie &amp; focus</h4>
              <p className="text-sm text-[var(--color-text-muted)]">Rhodiola rosea + Lion&apos;s Mane</p>
              <p className="text-xs text-[var(--color-primary)] mt-1">→ Amare MentaFocus® + EDGE+</p>
            </div>
            <div className="bg-[var(--color-bg-soft)] rounded-lg p-6">
              <h4 className="font-bold text-[var(--color-text)] mb-2">😴 Voor betere slaap</h4>
              <p className="text-sm text-[var(--color-text-muted)]">Ashwagandha + Magnesium + Glycine</p>
              <p className="text-xs text-[var(--color-primary)] mt-1">→ Amare Sleep+™ + MentaBiotics®</p>
            </div>
            <div className="bg-[var(--color-bg-soft)] rounded-lg p-6">
              <h4 className="font-bold text-[var(--color-text)] mb-2">🏃 Voor sportprestaties</h4>
              <p className="text-sm text-[var(--color-text-muted)]">Rhodiola + Cordyceps + Beta-alanine</p>
              <p className="text-xs text-[var(--color-primary)] mt-1">→ Amare FIT20 + EDGE+</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container-page max-w-4xl py-12">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">
            Veelgestelde Vragen over Adaptogenen
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[var(--color-border)] rounded-lg p-6">
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">{faq.question}</h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bronnen */}
        <section className="container-page max-w-4xl py-12">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wetenschappelijke Bronnen
          </h2>
          <ol className="space-y-2 text-sm text-[var(--color-text-muted)] list-decimal list-inside">
            <li>Chandrasekhar K et al. (2012). &ldquo;A prospective, randomized double-blind, placebo-controlled study of safety and efficacy of Ashwagandha root extract.&rdquo; Indian Journal of Psychological Medicine, 34(3):255-262.</li>
            <li>Panossian A, Wikman G. (2010). &ldquo;Effects of Adaptogens on the Central Nervous System.&rdquo; Pharmaceuticals, 3(1):188-224.</li>
            <li>Lopresti AL et al. (2019). &ldquo;An investigation into the stress-relieving and pharmacological actions of an Ashwagandha extract.&rdquo; Medicine, 98(37):e17186.</li>
            <li>Olsson EM et al. (2009). &ldquo;A randomised, double-blind, placebo-controlled, parallel-group study of Rhodiola rosea.&rdquo; Planta Medica, 75(2):105-112.</li>
            <li>Mori K et al. (2009). &ldquo;Improving effects of the mushroom Yamabushitake (Hericium erinaceus) on mild cognitive impairment.&rdquo; Phytotherapy Research, 23(3):367-372.</li>
            <li>Voedingscentrum. &ldquo;Kruidenpreparaten.&rdquo; Geraadpleegd via voedingscentrum.nl</li>
          </ol>
          <p className="text-xs text-[var(--color-text-muted)] mt-4 italic">
            * Deze uitspraken zijn niet beoordeeld door de NVWA. Voedingssupplementen zijn geen geneesmiddel.
            Raadpleeg bij gezondheidsklachten altijd een arts.
          </p>
        </section>

        {/* CTA */}
        <section className="container-page max-w-4xl py-12 text-center">
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-lg p-10 text-white">
            <h2 className="text-3xl font-cormorant font-bold mb-4">
              Ontdek Amare&apos;s Adaptogene Supplementen
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Van de Cerebiome® blend in MentaBiotics® tot de nootropische focusformule van EDGE+ —
              ervaar zelf hoe wetenschappelijk onderbouwde supplementen je stressbestendigheid kunnen versterken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AffiliateCTA label="Bekijk MentaBiotics® →" product="mentabiotics" variant="primary" />
              <AffiliateCTA label="Bekijk EDGE+ →" product="edge-plus" variant="primary" />
            </div>
            <p className="text-white/60 text-xs mt-4">* Affiliate link — je betaalt hetzelfde bedrag</p>
          </div>
        </section>
      </article>
    </>
  );
}
