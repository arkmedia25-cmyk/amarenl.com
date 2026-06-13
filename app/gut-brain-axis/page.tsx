import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import {
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata = {
  title: "Darm-Hersen-As: De Wetenschap Achter Je Tweede Brein | AmareNL",
  description:
    "Ontdek hoe je darmen en hersenen communiceren via de nervus vagus. 90% van serotonine wordt in je darm gemaakt. Wetenschap, probiotica en praktische tips voor een gezonde gut-brain axis.",
};

const faqs = [
  {
    question: "Wat is de darm-hersen-as precies?",
    answer:
      "De darm-hersen-as is het bidirectionele communicatienetwerk tussen je darmen en hersenen. Het loopt via de nervus vagus, hormonen, neurotransmitters en immuunsignalen. Je darmen worden daarom ook wel je 'tweede brein' genoemd — het enterische zenuwstelsel bevat 500 miljoen neuronen en produceert 90% van je serotonine. Wat in je darmen gebeurt, heeft direct invloed op je stemming, stressniveau en cognitieve functies.",
  },
  {
    question: "Hoe beïnvloeden probiotica je stemming?",
    answer:
      "Probiotica kunnen de productie van neurotransmitters zoals serotonine en GABA beïnvloeden. Bacteriestammen zoals L. helveticus en B. longum produceren metabolieten die via de nervus vagus signalen naar de hersenen sturen. Dit verklaart waarom een verstoord microbioom vaak samengaat met stemmingsklachten. Klinisch onderzoek met de Cerebiome® blend toont positieve effecten op stress en mentale veerkracht.",
  },
  {
    question: "Kun je de darm-hersen-as verbeteren met voeding?",
    answer:
      "Ja, voeding is de belangrijkste factor. Vezelrijke voeding (groenten, fruit, volkoren granen) voedt goede darmbacteriën. Gefermenteerde producten zoals yoghurt, kefir en kimchi leveren natuurlijke probiotica. Polyphenolrijke voeding (bessen, groene thee, pure chocolade) ondersteunt gunstige bacteriën. Vermijd sterk bewerkt voedsel en overmatige suikers — die voeden ontstekingsbevorderende bacteriën.",
  },
  {
    question: "Hoe snel merk je effect van probiotica op je stemming?",
    answer:
      "De meeste gebruikers ervaren binnen 2-4 weken de eerste subtiele veranderingen bij consistent dagelijks gebruik. Het microbioom heeft tijd nodig om zich aan te passen — nieuwe bacteriestammen moeten zich vestigen en de darmwand moet herstellen. Optimale resultaten worden doorgaans na 6-8 weken bereikt. Consistentie is belangrijker dan dosering.",
  },
  {
    question: "Wat is het verschil tussen probiotica en prebiotica?",
    answer:
      "Probiotica zijn levende bacteriën die je darmflora aanvullen. Prebiotica zijn vezels die als voeding dienen voor deze goede bacteriën. Ze werken synergetisch: prebiotica helpen probiotica overleven en vermenigvuldigen. Amare MentaBiotics combineert beide — het bevat zowel de Cerebiome® bacteriestammen als prebiotische vezels (isomalto-oligosachariden en galacto-oligosachariden).",
  },
  {
    question: "Kan stress je darmgezondheid schaden?",
    answer:
      "Absoluut. Chronische stress activeert de HPA-as en verhoogt cortisol, wat de darmdoorlaatbaarheid verhoogt ('leaky gut'), ontstekingen in de darmwand bevordert en de samenstelling van het microbioom negatief verandert. De darm-hersen-as werkt twee kanten op — stress beïnvloedt je darmen, en een verstoorde darmflora verergert stressgevoeligheid. Dit is waarom een holistische aanpak cruciaal is.",
  },
];

export default function GutBrainAxisPage() {
  const articleSchema = generateArticleSchema({
    title: "Darm-Hersen-As: De Wetenschap Achter Je Tweede Brein",
    description:
      "Ontdek hoe je darmen en hersenen communiceren via de nervus vagus. 90% van serotonine wordt in je darm gemaakt. Wetenschap, probiotica en praktische tips.",
    image: "https://amarecdn.azureedge.net/webassets/web/prod/products/Amare-Mentabiotics-EU-800.jpg",
    datePublished: "2026-05-18",
    author: "AmareNL Redactie",
    slug: "gut-brain-axis",
  });

  const combinedSchema = combineSchemas(
    articleSchema,
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Darm-Hersen-As", url: "/gut-brain-axis" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="gut-brain-axis-schema" />

      {/* ── Breadcrumb ── */}
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">
          Home
        </a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">
          Darm-Hersen-As
        </span>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Gut-Brain Science
            </span>
            <span className="text-[9px] text-[var(--color-text-muted)]">
              Leesduur: 12 min &middot; 3000+ woorden
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
            De{" "}
            <span className="text-[var(--color-primary)]">Darm-Hersen-As</span>:
            Waarom Je Darmen Je Tweede Brein Zijn
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] mb-2 max-w-2xl mx-auto leading-relaxed">
            Je darmen bevatten 500 miljoen neuronen en produceren 90% van je
            serotonine. Ontdek hoe de communicatie tussen darm en brein werkt —
            en hoe je die kunt versterken met voeding, probiotica en
            levensstijl.
          </p>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">
            Laatste update: 18 mei 2026 &middot; Auteur: AmareNL Redactie
          </p>
          <AffiliateCTA
            label="Bekijk MentaBiotics bij Amare →"
            product="mentabiotics"
            variant="primary"
          />
        </div>
      </section>

      {/* ── Wat is de darm-hersen-as? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat is de darm-hersen-as?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              De <strong>darm-hersen-as</strong> (gut-brain axis) is het
              bidirectionele communicatienetwerk tussen je maag-darmkanaal en je
              centrale zenuwstelsel. Dit netwerk verbindt je darmen rechtstreeks
              met je hersenen via de <strong>nervus vagus</strong> — de
              langste hersenzenuw in je lichaam die van je hersenstam naar je
              buik loopt.
            </p>
            <p>
              Maar er is meer dan alleen de nervus vagus. De darm-hersen-as
              omvat ook:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Neurotransmitters:</strong> Je darmen produceren
                serotonine, dopamine, GABA en andere signaalstoffen die je
                stemming, focus en slaap beïnvloeden.
              </li>
              <li>
                <strong>Hormonale signalen:</strong> Het darmhormoon ghreline
                beïnvloedt niet alleen honger, maar ook stemming en
                stressrespons.
              </li>
              <li>
                <strong>Immuunsignalen:</strong> 70% van je immuunsysteem
                bevindt zich in je darmen. Ontstekingen in de darm activeren
                ontstekingsreacties in de hersenen.
              </li>
              <li>
                <strong>Microbiële metabolieten:</strong> Darmbacteriën
                produceren stoffen zoals korte-keten vetzuren (SCFA's) die direct
                effect hebben op de hersenfunctie en de bloed-hersenbarrière
                beschermen.
              </li>
            </ul>
            <div className="bg-[var(--color-bg-soft)] rounded-xl p-6 border border-[var(--color-border)] my-6">
              <h3 className="font-bold text-sm text-[var(--color-primary)] mb-2">
                Wist je dat?
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Je darmen bevatten meer dan{" "}
                <strong>100 biljoen micro-organismen</strong> — dat is 10 keer
                meer dan het aantal menselijke cellen in je lichaam. Het
                gezamenlijke gewicht van je darmmicrobioom is ongeveer 1,5 tot
                2 kg. De genetische informatie van al deze micro-organismen
                samen is 150 keer groter dan je eigen menselijke genoom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Het enterische zenuwstelsel ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Je "tweede brein" — het enterische zenuwstelsel
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              Het <strong>enterische zenuwstelsel</strong> (EZS) is een complex
              netwerk van meer dan 500 miljoen neuronen dat zich in de wand van
              je maag-darmkanaal bevindt. Het is zo uitgebreid dat
              wetenschappers het informeel je "tweede brein" noemen. Het EZS
              kan functioneren <strong>zonder directe input van de
              hersenen</strong> — het regelt autonoom de spijsvertering, de
              doorbloeding van de darmwand en de afgifte van enzymen.
            </p>
            <p>
              Wat dit tweede brein fascinerend maakt, is dat het dezelfde
              neurotransmitters gebruikt als je hoofdbrein:
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[var(--color-primary)] text-left">
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                      Neurotransmitter
                    </th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                      Percentage in darm geproduceerd
                    </th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                      Functie
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-border)]">
                    <td className="py-3 px-4 font-bold text-[var(--color-text)]">
                      Serotonine
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">
                      ~90%
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">
                      Stemming, slaap, eetlust, darmperistaltiek
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]">
                    <td className="py-3 px-4 font-bold text-[var(--color-text)]">
                      Dopamine
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">
                      ~50%
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">
                      Motivatie, beloningssysteem, motorische controle
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]">
                    <td className="py-3 px-4 font-bold text-[var(--color-text)]">
                      GABA
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">
                      ~30-50%
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">
                      Kalmerend effect, angstremming, slaapkwaliteit
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-[var(--color-text)]">
                      Acetylcholine
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">
                      Aanzienlijk deel
                    </td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">
                      Spiercontractie darmwand, cognitieve functies
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Dit verklaart waarom wat je eet en hoe gezond je darmen zijn,
              direct invloed heeft op hoe je je <strong>voelt, denkt en
              presteert</strong>. Het is ook de reden waarom darmproblemen vaak
              samengaan met angst, depressie en vermoeidheid — en waarom een
              gezonde darmflora een van de meest effectieve manieren is om je
              mentale welzijn te ondersteunen.
            </p>
          </div>
        </div>
      </section>

      {/* ── Hoe communiceert de nervus vagus? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            De nervus vagus — de informatie-snelweg tussen darm en brein
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              De <strong>nervus vagus</strong> is de 10e hersenzenuw en de
              langste zenuw in het lichaam. Hij ontspringt in de hersenstam en
              vertakt zich naar het hart, de longen en het volledige
              spijsverteringskanaal. Wat deze zenuw bijzonder maakt: 80% van de
              signalen gaat <strong>van de darmen naar de hersenen</strong>,
              niet andersom.
            </p>
            <p>
              Darmbacteriën produceren metabolieten zoals korte-keten vetzuren
              (butyraat, acetaat, propionaat), tryptofaan-metabolieten en
              polyfenolische afbraakproducten. Deze stoffen activeren
              receptoren in de darmwand, die signalen via de nervus vagus naar
              de hersenstam sturen. Daar worden ze verwerkt in gebieden die
              betrokken zijn bij stemming (amygdala, hippocampus) en stress
              (hypothalamus).
            </p>
            <div className="grid sm:grid-cols-3 gap-4 my-6">
              {[
                {
                  title: "Ontstekingsremming",
                  desc: "De nervus vagus remt ontstekingen via de 'cholinerge anti-inflammatoire reflex'. Een sterke vagale tonus betekent minder laaggradige ontstekingen — een risicofactor voor depressie.",
                },
                {
                  title: "Stressregulatie",
                  desc: "Vagale signalen remmen de HPA-as (hypothalamus-hypofyse-bijnier-as). Een hoge vagale tonus wordt geassocieerd met betere stressbestendigheid en sneller herstel na stressvolle gebeurtenissen.",
                },
                {
                  title: "Darmpermeabiliteit",
                  desc: "De nervus vagus reguleert de doorlaatbaarheid van de darmwand. Wegvallende vagale signalen kunnen bijdragen aan 'leaky gut' — waardoor ontstekingsstoffen in de bloedbaan komen.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]"
                >
                  <h3 className="font-bold text-sm text-[var(--color-text)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Serotonine: 90% uit je darm ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Serotonine — 90% komt uit je darmen, niet uit je hersenen
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              Weinig feiten in de neurowetenschap zijn zo verrassend als dit:{" "}
              <strong>90% van alle serotonine</strong> in je lichaam wordt
              geproduceerd in je darmen, niet in je hersenen. Serotonine wordt
              in de darm geproduceerd door <strong>enterochromaffiene
              cellen</strong> in de darmwand — en het is hetzelfde molecuul als
              de serotonine die in je hersenen werkt als stemmingsregulator.
            </p>
            <p>
              Het aminozuur <strong>tryptofaan</strong> is de bouwsteen van
              serotonine. Darmbacteriën spelen een cruciale rol in het
              beschikbaar maken van tryptofaan. Bepaalde stammen, zoals
              Bifidobacterium longum (onderdeel van de Cerebiome® blend),
              kunnen de tryptofaan-stofwisseling in de darm verbeteren,
              waardoor meer serotonine beschikbaar komt.
            </p>
            <div className="bg-white rounded-xl p-6 border border-[var(--color-border)] my-6">
              <h3 className="font-bold text-sm text-[var(--color-text)] mb-3">
                De serotonine-route van darm naar brein — in 5 stappen
              </h3>
              <ol className="space-y-3">
                {[
                  "Dieet levert tryptofaan (uit eiwitrijke voeding: kalkoen, eieren, kaas, zaden)",
                  "Darmbacteriën zetten tryptofaan om in 5-HTP (5-hydroxytryptofaan)",
                  "Enterochromaffiene cellen zetten 5-HTP om in serotonine (5-HT)",
                  "Serotonine activeert de nervus vagus en stuurt signalen naar de hersenstam",
                  "Hersenstam moduleert stemming, slaap, eetlust en stressrespons",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-[var(--color-text-muted)]">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p>
              Dit verklaart waarom een dieet dat rijk is aan tryptofaan en een
              gezond microbioom essentieel zijn voor{" "}
              <strong>mentaal welzijn</strong>. Je kunt nog zoveel tryptofaan
              eten — als je darmflora niet optimaal functioneert, wordt het
              onvoldoende omgezet naar serotonine.
            </p>
          </div>
        </div>
      </section>

      {/* ── Probiotica en stemming ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Probiotica en stemming — wat zegt de wetenschap?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              Het concept van <strong>psychobiotica</strong> — probiotica die
              de mentale gezondheid ondersteunen — is een van de meest
              opwindende ontwikkelingen in de voedingswetenschap. Verschillende
              bacteriestammen hebben verschillende effecten op stemming en
              cognitie, en onderzoek begint de precieze mechanismen te
              ontrafelen.
            </p>
            <h3 className="font-cormorant text-xl font-bold mt-6 mb-3">
              Cerebiome® — de klinisch onderzochte darm-hersen-blend
            </h3>
            <p>
              Amare's <strong>MentaBiotics</strong> bevat de Cerebiome®
              bacteriële blend — een combinatie van drie specifieke stammen die
              klinisch onderzocht is op effecten op stress en stemming:
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Lactobacillus helveticus R0052:</strong> Deze stam
                produceert bioactieve peptiden die de stressrespons via de
                HPA-as kunnen moduleren. Studies tonen aan dat R0052 de
                cortisolspiegel bij gestreste proefpersonen kan verlagen.
              </li>
              <li>
                <strong>Lactobacillus rhamnosus R0011:</strong> Bekend om het
                vermogen om GABA-receptoren in de hersenen te moduleren via de
                nervus vagus. Dit kan angstgevoelens verminderen en een
                kalmerend effect hebben zonder sedatie.
              </li>
              <li>
                <strong>Bifidobacterium longum R0175:</strong> Produceert
                tryptofaan-metabolieten die de serotonineproductie in de darm
                bevorderen. B. longum is een van de best gedocumenteerde
                psychobiotische stammen in de wetenschappelijke literatuur.
              </li>
            </ul>
            <p>
              Wat MentaBiotics bijzonder maakt, is dat het niet alleen deze
              stammen bevat, maar ook{" "}
              <strong>prebiotische vezels</strong> (isomalto-oligosachariden en
              galacto-oligosachariden) die als voeding dienen voor de goede
              bacteriën. Daarnaast bevat de formule magnesium, dat bijdraagt
              aan een normale psychologische functie, en botanische extracten
              zoals groene thee, druivenpit en pijnboomschors.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA #1 ── */}
      <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">
            Versterk je darm-hersen-as met MentaBiotics
          </h2>
          <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
            De klinisch onderzochte Cerebiome® blend met prebiotica, magnesium
            en botanische extracten — 30 dagen risicovrij proberen.
          </p>
          <AffiliateCTA
            label="Bekijk MentaBiotics bij Amare →"
            product="mentabiotics"
            variant="urgency"
          />
          <p className="mt-4 text-[10px] text-white/60">
            🛡️ 30 dagen geld-terug-garantie &middot; 🚚 Gratis verzending vanaf
            €175
          </p>
        </div>
      </section>

      {/* ── Microbioom en voeding ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Hoe voed je je darm-hersen-as?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              Je kunt de darm-hersen-as op meerdere manieren ondersteunen —
              voeding is de basis, maar er zijn meer factoren die de
              communicatie tussen darm en brein beïnvloeden:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                {
                  title: "Vezelrijke voeding",
                  desc: "Groenten, fruit, peulvruchten en volkoren granen leveren prebiotische vezels die gunstige bacteriën voeden. Streef naar 30-40 gram vezels per dag uit diverse bronnen.",
                },
                {
                  title: "Gefermenteerde voeding",
                  desc: "Kefir, yoghurt, kimchi, zuurkool en kombucha bevatten natuurlijke probiotica die de diversiteit van het microbioom verhogen.",
                },
                {
                  title: "Polyfenol-rijke voeding",
                  desc: "Bessen, groene thee, pure chocolade (>70%), olijfolie en noten bevatten polyfenolen — plantaardige stoffen die gunstige bacteriën selectief voeden.",
                },
                {
                  title: "Slaap en circadiaan ritme",
                  desc: "Het microbioom volgt een 24-uurs ritme. Verstoorde slaap kan de diversiteit van darmbacteriën binnen 48 uur aantasten. Consistent 7-8 uur slaap is cruciaal.",
                },
                {
                  title: "Beweging",
                  desc: "Gematigde beweging verhoogt de diversiteit van het microbioom en versterkt de darmbarrière. 30 minuten dagelijkse beweging is voldoende voor meetbare effecten.",
                },
                {
                  title: "Stressmanagement",
                  desc: "Chronische stress verhoogt cortisol, wat de darmdoorlaatbaarheid verergert. Meditatie, ademhalingsoefeningen en yoga kunnen de vagale tonus verhogen.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-5 border border-[var(--color-border)]"
                >
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
        </div>
      </section>

      {/* ── Gerelateerde Amare producten ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Amare producten voor de darm-hersen-as
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">
            Amare is het enige supplementenbedrijf dat zich volledig richt op
            de gut-brain axis. Deze producten zijn specifiek ontwikkeld om de
            darm-hersencommunicatie te ondersteunen:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                product: "MentaBiotics",
                tag: "⭐ Bestseller",
                desc: "De klinisch onderzochte Cerebiome® blend (1 miljard KVE) met prebiotische vezels, magnesium en botanische extracten — specifiek voor stemming, stress en mentale veerkracht.",
                slug: "mentabiotics",
                price: "€71,83/maand",
              },
              {
                product: "Happy Juice Pack",
                tag: "Meest populair",
                desc: "Combinatie van MentaBiotics + Energy+ + EDGE+. Het complete pakket voor energie, stemming en focus via de gut-brain axis.",
                slug: "happy-juice-pack",
                price: "€155,33/maand",
              },
              {
                product: "Restore",
                tag: "Spijsvertering",
                desc: "Spijsverteringsenzymen + 5 probiotica stammen (10 miljard KVE) + lactase. Perfecte aanvulling op MentaBiotics voor complete darmondersteuning.",
                slug: "restore",
                price: "€48,01/maand",
              },
              {
                product: "GBX SuperFood",
                tag: "Dagelijkse basis",
                desc: "Superfoods voor dagelijkse darmgezondheid — prebiotische vezels en fytonutriënten die gunstige bacteriën voeden.",
                slug: "sunrise",
                price: "vanaf €48,01/maand",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] font-bold text-[var(--color-primary)] uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">
                  {item.product}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mb-3">
                  {item.desc}
                </p>
                <AffiliateCTA
                  label={`Bekijk ${item.product} →`}
                  product={item.slug}
                  variant="secondary"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">
            Veelgestelde vragen over de darm-hersen-as
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

      {/* ── Bronnen & Referenties ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wetenschappelijke bronnen
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)]">
            <ul className="space-y-2 text-xs text-[var(--color-text-muted)]">
              <li>
                Cryan, J.F., & Dinan, T.G. (2012). Mind-altering microorganisms:
                the impact of the gut microbiota on brain and behaviour.{" "}
                <em>Nature Reviews Neuroscience</em>, 13(10), 701-712.
              </li>
              <li>
                Breit, S., Kupferberg, A., Rogler, G., & Hasler, G. (2018).
                Vagus nerve as modulator of the brain-gut axis in psychiatric
                and inflammatory disorders. <em>Frontiers in Psychiatry</em>, 9,
                44.
              </li>
              <li>
                Messaoudi, M., et al. (2011). Assessment of psychotropic-like
                properties of a probiotic formulation (Lactobacillus helveticus
                R0052 and Bifidobacterium longum R0175) in rats and human
                subjects. <em>British Journal of Nutrition</em>, 105(5),
                755-764.
              </li>
              <li>
                Yano, J.M., et al. (2015). Indigenous bacteria from the gut
                microbiota regulate host serotonin biosynthesis. <em>Cell</em>,
                161(2), 264-276.
              </li>
              <li>
                Voedingscentrum (2025). Voeding en darmgezondheid.{" "}
                <em>voedingscentrum.nl</em>
              </li>
              <li>
                RIVM (2024). Microbioom en gezondheid.{" "}
                <em>rivm.nl</em>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA Onderaan ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-2xl text-center">
          <div className="bg-white rounded-2xl p-8 border border-[var(--color-border)]">
            <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3">
              Geef je darm-hersen-as de ondersteuning die het verdient
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
              MentaBiotics met klinisch onderzochte Cerebiome® blend — 1
              miljard KVE probiotica, prebiotische vezels en magnesium. 30
              dagen risicovrij proberen.
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
            <p className="mt-6 text-[9px] text-[var(--color-text-muted)]">
              * Affiliate link — je betaalt hetzelfde bedrag, wij ontvangen een
              commissie.
              <br />
              * Deze uitspraken zijn niet beoordeeld door de NVWA.
              Voedingssupplementen zijn geen vervanging voor een gevarieerd
              voedingspatroon en een gezonde levensstijl. Raadpleeg bij
              aanhoudende klachten altijd een arts.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
