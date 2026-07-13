import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import {
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata = {
  title: "Probiotica Stammen: Complete Gids voor Darmgezondheid (2026) | AmareNL",
  description:
    "Ontdek welke probiotica stammen écht werken. Lactobacillus, Bifidobacterium, Cerebiome® — complete gids met wetenschappelijke onderbouwing, dosering en vergelijking van de beste probiotica supplementen.",
};

const faqs = [
  {
    question: "Wat zijn probiotica stammen precies?",
    answer:
      "Probiotica stammen zijn specifieke bacterievarianten met een uniek genetisch profiel. Elke stam heeft een andere functie in je darmen — net zoals verschillende medicijnen andere aandoeningen behandelen. Een stam wordt aangeduid met geslacht (bv. Lactobacillus), soort (bv. plantarum) en stamcode (bv. Lp-G18). De combinatie van stammen in een supplement bepaalt de effectiviteit voor specifieke gezondheidsdoelen zoals stemming, immuunfunctie of spijsvertering.",
  },
  {
    question: "Welke probiotica stam is het beste voor stemming?",
    answer:
      "De best onderzochte stammen voor stemming zijn Lactobacillus helveticus R0052 en Bifidobacterium longum R0175 — samen bekend als de Cerebiome® blend. Uit placebo-gecontroleerd onderzoek blijkt dat deze combinatie stressgerelateerde symptomen significant vermindert en cortisolniveaus normaliseert. Dit is de blend in Amare MentaBiotics®. Andere stemmingsondersteunende stammen: Bifidobacterium breve, Lactobacillus casei, en Bifidobacterium bifidum.",
  },
  {
    question: "Hoeveel CFU's heb ik nodig voor effect?",
    answer:
      "De effectieve dosering varieert per stam en gezondheidsdoel, maar klinische studies tonen dat 5-50 miljard CFU per dag effectief is voor de meeste toepassingen. Belangrijker dan het totale CFU-getal is de stamspecifieke dosering: één stam die klinisch effectief is bij 1 miljard CFU is waardevoller dan een generiek '50 miljard CFU' label zonder gespecificeerde stammen. Controleer altijd of het etiket specifieke stamcodes vermeldt.",
  },
  {
    question: "Kun je verschillende probiotica stammen combineren?",
    answer:
      "Ja, multi-stammen formules zijn juist effectiever dan enkelvoudige probiotica voor algemene darmgezondheid. Verschillende stammen koloniseren verschillende delen van je darmkanaal en hebben complementaire functies. Let er wel op dat de stammen wetenschappelijk compatibel zijn — een kwalitatief supplement test of stammen elkaar niet verdringen. Amare MentaBiotics® en Restore combineren meerdere klinisch gedocumenteerde stammen in één formule.",
  },
  {
    question: "Hoelang duurt het voordat probiotica werken?",
    answer:
      "De eerste subtiele veranderingen in spijsvertering ervaren de meeste mensen binnen 1-2 weken. Voor stemmingseffecten via de gut-brain as is 3-4 weken consistent gebruik nodig. Optimale resultaten worden bereikt na 6-8 weken dagelijks gebruik. Het microbioom heeft tijd nodig om te verschuiven — probiotica introduceren gunstige bacteriën, maar die moeten zich vestigen en vermenigvuldigen. Consistentie is de belangrijkste factor.",
  },
  {
    question: "Zijn probiotica veilig voor dagelijks gebruik?",
    answer:
      "Voor gezonde personen zijn probiotica veilig voor dagelijks langdurig gebruik. De bacteriestammen in supplementen behoren tot dezelfde families die van nature in een gezond menselijk microbioom voorkomen. Mensen met een ernstig verzwakt immuunsysteem, katheters of na grote darmoperaties dienen eerst een arts te raadplegen. Raadpleeg bij twijfel altijd je huisarts.",
  },
];

export default function ProbioticaStammenPage() {
  const articleSchema = generateArticleSchema({
    title: "Probiotica Stammen: Complete Gids voor Darmgezondheid (2026)",
    description:
      "Ontdek welke probiotica stammen écht werken. Complete gids met wetenschappelijke onderbouwing en vergelijkingen.",
    datePublished: "2026-07-13",
    slug: "probiotica-stammen",
    category: "darmen",
    image: "/images/blog/probiotica-stammen.jpg",
    citations: [
      {
        author: "Hill C et al.",
        name: "Expert consensus document: The International Scientific Association for Probiotics and Prebiotics consensus statement on the scope and appropriate use of the term probiotic. Nature Reviews Gastroenterology & Hepatology, 2014",
      },
      {
        author: "Messaoudi M et al.",
        name: "Assessment of psychotropic-like properties of a probiotic formulation (Lactobacillus helveticus R0052 and Bifidobacterium longum R0175) in rats and human subjects. British Journal of Nutrition, 2011",
      },
      {
        author: "Voedingscentrum",
        name: "Probiotica — Wat zijn het en werken ze?",
        url: "https://www.voedingscentrum.nl/encyclopedie/probiotica.aspx",
      },
    ],
  });
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://amarenl.com" },
    { name: "Probiotica Stammen", url: "https://amarenl.com/probiotica-stammen" },
  ]);
  const combinedSchema = combineSchemas(articleSchema, faqSchema, breadcrumbSchema);

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="probiotica-stammen-schema" />
      <article className="bg-white min-h-screen font-nunito">
        <header className="bg-[var(--color-bg-soft)] py-20 border-b border-[var(--color-border)]">
          <div className="container-page max-w-4xl">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] mb-8">
              Pillar Page · Darmgezondheid
            </div>
            <h1 className="text-4xl md:text-6xl font-cormorant font-bold text-[var(--color-text)] leading-tight mb-8">
              Probiotica Stammen: De Complete Gids voor Darmgezondheid
            </h1>
            <p className="text-xl text-[var(--color-text-muted)] leading-relaxed italic border-l-4 border-[var(--color-primary)] pl-6">
              Niet alle probiotica zijn hetzelfde. Ontdek welke bacteriestammen écht wetenschappelijk onderbouwd zijn,
              hoe je de juiste kiest voor jouw gezondheidsdoel, en waarom stamspecificiteit het verschil maakt tussen
              een supplement dat werkt en één dat alleen maar geld kost.
            </p>
          </div>
        </header>

        {/* Introductie */}
        <section className="container-page max-w-4xl py-16">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat zijn probiotica stammen precies?
          </h2>
          <p className="text-[var(--color-text)] leading-relaxed mb-4">
            Stel je een bibliotheek voor. De term &ldquo;probiotica&rdquo; is de hele bibliotheek — een verzamelnaam voor
            alle gunstige bacteriën die je darmgezondheid ondersteunen. Een <strong>stam</strong> is één specifiek boek in
            die bibliotheek, met een uniek genetisch profiel, specifieke eigenschappen en wetenschappelijk gedocumenteerde
            effecten. Net zoals je niet zomaar &ldquo;medicijn&rdquo; slikt maar een specifiek middel voor een specifieke
            aandoening, kies je bij probiotica de juiste stam voor jouw gezondheidsdoel.
          </p>
          <p className="text-[var(--color-text)] leading-relaxed mb-4">
            De wetenschappelijke naamgeving volgt een strikte hiërarchie: <strong>Geslacht</strong> (Genus) →{" "}
            <strong>Soort</strong> (Species) → <strong>Stam</strong> (Strain). Bijvoorbeeld:{" "}
            <em>Lactobacillus</em> (geslacht) <em>plantarum</em> (soort) <em>Lp-G18</em> (stamcode). Het is deze
            stamcode die het verschil maakt. Twee stammen van dezelfde soort kunnen totaal verschillende effecten
            hebben — de ene ondersteunt je immuunsysteem, de andere produceert neurotransmitters.
          </p>
        </section>

        {/* Belangrijkste stammen tabel */}
        <section className="container-page max-w-4xl py-12">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">
            De 10 Belangrijkste Probiotica Stammen op een Rij
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--color-primary)] text-white text-sm">
                  <th className="p-4 text-left font-bold">Stam</th>
                  <th className="p-4 text-left font-bold">Belangrijkste Functie</th>
                  <th className="p-4 text-left font-bold">Klinisch Bewijs</th>
                  <th className="p-4 text-left font-bold">Amare Product</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-[var(--color-border)]">
                  <td className="p-4 font-bold">L. helveticus R0052</td>
                  <td className="p-4">Stressvermindering, cortisolregulatie</td>
                  <td className="p-4">⭐ Sterk — 3+ RCT&apos;s</td>
                  <td className="p-4">MentaBiotics®</td>
                </tr>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                  <td className="p-4 font-bold">B. longum R0175</td>
                  <td className="p-4">Stemmingsondersteuning, angstvermindering</td>
                  <td className="p-4">⭐ Sterk — Cerebiome® blend</td>
                  <td className="p-4">MentaBiotics®</td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="p-4 font-bold">L. rhamnosus GG</td>
                  <td className="p-4">Darmbarrière, immuunfunctie</td>
                  <td className="p-4">⭐ Zeer sterk — 800+ studies</td>
                  <td className="p-4">Restore</td>
                </tr>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                  <td className="p-4 font-bold">B. animalis lactis</td>
                  <td className="p-4">Spijsvertering, opgeblazen gevoel</td>
                  <td className="p-4">⭐ Sterk — 200+ studies</td>
                  <td className="p-4">Restore</td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="p-4 font-bold">L. acidophilus NCFM</td>
                  <td className="p-4">Lactosevertering, darmcomfort</td>
                  <td className="p-4">⭐ Sterk</td>
                  <td className="p-4">Probiotics</td>
                </tr>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                  <td className="p-4 font-bold">B. lactis Bi-07</td>
                  <td className="p-4">Immuunmodulatie, weerstand</td>
                  <td className="p-4">⭐ Sterk</td>
                  <td className="p-4">Probiotics</td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="p-4 font-bold">L. plantarum Lp-G18</td>
                  <td className="p-4">Ontstekingsremmend, darmwandintegriteit</td>
                  <td className="p-4">⭐ Matig-sterk</td>
                  <td className="p-4">MentaBiotics®</td>
                </tr>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                  <td className="p-4 font-bold">B. breve Bbr8</td>
                  <td className="p-4">Hersenfunctie, cognitie</td>
                  <td className="p-4">⭐ Opkomend onderzoek</td>
                  <td className="p-4">MentaBiotics®</td>
                </tr>
                <tr className="border-b border-[var(--color-border)]">
                  <td className="p-4 font-bold">L. reuteri DSM 17938</td>
                  <td className="p-4">Darmkrampen, PDS-klachten</td>
                  <td className="p-4">⭐ Zeer sterk</td>
                  <td className="p-4">Restore</td>
                </tr>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]">
                  <td className="p-4 font-bold">B. coagulans GBI-30</td>
                  <td className="p-4">Eiwitvertering, spierherstel</td>
                  <td className="p-4">⭐ Matig-sterk</td>
                  <td className="p-4">FIT20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Hoe kies je */}
        <section className="container-page max-w-4xl py-12">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Hoe kies je het juiste probioticum?
          </h2>
          <p className="text-[var(--color-text)] leading-relaxed mb-6">
            De markt voor probiotica is explosief gegroeid — van yoghurt met &ldquo;goede bacteriën&rdquo; tot
            hooggedoseerde capsules met klinisch gedocumenteerde stammen. Maar meer is niet altijd beter. Dit zijn
            de vijf criteria waarop je een probioticum beoordeelt:
          </p>
          <ol className="space-y-6 list-decimal list-inside text-[var(--color-text)] leading-relaxed">
            <li>
              <strong>Stamspecificiteit:</strong> Het etiket moet exacte stamcodes vermelden (bv. &ldquo;L. helveticus R0052&rdquo;),
              niet alleen &ldquo;Lactobacillus acidophilus&rdquo;. Zonder stamcode weet je niet of je de klinisch onderzochte
              variant krijgt of een generieke neef.
            </li>
            <li>
              <strong>CFU bij productie én houdbaarheidseinde:</strong> CFU (Colony Forming Units) geeft het aantal
              levensvatbare bacteriën aan. Een kwalitatief merk garandeert de CFU tot het einde van de houdbaarheidstermijn,
              niet alleen bij productie. Veel probiotica sterven af tijdens opslag — Amare gebruikt micro-encapsulatie
              (Bio-Tract®) om afgifte in de darm te garanderen.
            </li>
            <li>
              <strong>Wetenschappelijk bewijs per stam:</strong> Zoek naar stammen met gepubliceerd humaan klinisch
              onderzoek. Eén studie met 30 deelnemers is onvoldoende — stammen zoals L. helveticus R0052 hebben
              meerdere RCT&apos;s achter de rug.
            </li>
            <li>
              <strong>Multi-stammen vs enkelvoudig:</strong> Voor algemene darmgezondheid zijn 5-15 complementaire
              stammen effectiever dan één enkele stam. Voor een specifiek doel (bv. stemming via de gut-brain as)
              zijn 2-3 stammen met bewezen synergie effectiever dan 15 willekeurige stammen.
            </li>
            <li>
              <strong>Prebiotica toevoeging (synbiotica):</strong> De beste supplementen combineren probiotica met
              prebiotische vezels die als voeding dienen voor de bacteriën. Dit verhoogt de overlevingskans en
              kolonisatie. Amare MentaBiotics® bevat zowel de Cerebiome® stammen als prebiotische IMO en GOS vezels.
            </li>
          </ol>
        </section>

        {/* Gut-brain stammen */}
        <section className="container-page max-w-4xl py-12 bg-[var(--color-bg-soft)] rounded-lg">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            De Gut-Brain Revolutie: Psychobiotica
          </h2>
          <p className="text-[var(--color-text)] leading-relaxed mb-4">
            De term <strong>psychobiotica</strong> werd in 2013 geïntroduceerd door psychiater Ted Dinan van University
            College Cork. Het beschrijft probiotica stammen die — wanneer ingenomen in adequate hoeveelheden — een
            positief effect hebben op de mentale gezondheid via de darm-hersen-as. Dit is geen pseudowetenschap: de
            nervus vagus fungeert als een directe snelweg waarlangs darmbacteriën signalen naar je hersenen sturen,
            en specifieke stammen beïnvloeden de productie van serotonine, GABA en dopamine.
          </p>
          <p className="text-[var(--color-text)] leading-relaxed mb-6">
            De meest onderzochte psychobiotische formule is de <strong>Cerebiome® blend</strong> — een gepatenteerde
            combinatie van <em>Lactobacillus helveticus R0052</em> en <em>Bifidobacterium longum R0175</em>.
            In het baanbrekende onderzoek van Messaoudi et al. (2011, British Journal of Nutrition) toonden deelnemers
            die deze blend 30 dagen gebruikten significant lagere scores op psychologische stress, angst en depressie
            dan de placebogroep. Cortisol — het primaire stresshormoon — daalde gemiddeld met 23%.
          </p>
          <p className="text-[var(--color-text)] leading-relaxed mb-6">
            Amare <strong>MentaBiotics®</strong> bevat deze Cerebiome® blend plus prebiotische vezels en magnesium
            voor een driedubbele werking op de gut-brain as. Het is wereldwijd het eerste supplement dat specifiek
            is ontwikkeld rond het mentale wellness potentieel van het microbioom.
          </p>
          <AffiliateCTA label="Ontdek MentaBiotics® →" product="mentabiotics" variant="primary" />
        </section>

        {/* Soorten vergelijken */}
        <section className="container-page max-w-4xl py-16">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">
            Probiotica Soorten Vergeleken: Lactobacillus vs Bifidobacterium vs Meer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
              <h3 className="text-xl font-cormorant font-bold text-[var(--color-primary)] mb-3">Lactobacillus</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                De grootste probiotica-familie. Produceert melkzuur en waterstofperoxide, verlaagt de pH in je darmen
                waardoor schadelijke bacteriën minder kans krijgen. Koloniseert voornamelijk in de dunne darm.
                Belangrijkste soorten: L. acidophilus (lactosevertering), L. rhamnosus (immuunfunctie), L. plantarum
                (ontstekingsremmend), L. helveticus (cortisolregulatie), L. reuteri (PDS-klachten).
              </p>
            </div>
            <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
              <h3 className="text-xl font-cormorant font-bold text-[var(--color-primary)] mb-3">Bifidobacterium</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                Dominant in de dikke darm en een van de eerste bacteriën die baby&apos;s via moedermelk binnenkrijgen.
                Produceert acetaat en butyraat — korteketenvetzuren die de darmwand voeden en ontstekingen remmen.
                Belangrijkste soorten: B. longum (stemming, angst), B. breve (cognitie, huid), B. bifidum
                (immuunfunctie), B. animalis lactis (spijsvertering, opgeblazen gevoel).
              </p>
            </div>
          </div>
        </section>

        {/* Veelgestelde vragen */}
        <section className="container-page max-w-4xl py-12">
          <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">
            Veelgestelde Vragen over Probiotica Stammen
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
            <li>Hill C et al. (2014). &ldquo;The International Scientific Association for Probiotics and Prebiotics consensus statement.&rdquo; Nature Reviews Gastroenterology &amp; Hepatology.</li>
            <li>Messaoudi M et al. (2011). &ldquo;Assessment of psychotropic-like properties of a probiotic formulation in rats and human subjects.&rdquo; British Journal of Nutrition, 105(5):755-764.</li>
            <li>Dinan TG et al. (2013). &ldquo;Psychobiotics: a novel class of psychotropic.&rdquo; Biological Psychiatry, 74(10):720-726.</li>
            <li>Voedingscentrum. &ldquo;Probiotica.&rdquo; Geraadpleegd via voedingscentrum.nl/encyclopedie/probiotica.aspx</li>
            <li>RIVM. &ldquo;Veiligheid van probiotica.&rdquo; Geraadpleegd via rivm.nl</li>
            <li>Marco ML et al. (2021). &ldquo;The International Scientific Association for Probiotics and Prebiotics (ISAPP) consensus statement on fermented foods.&rdquo; Nature Reviews Gastroenterology &amp; Hepatology, 18:196-208.</li>
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
              Klaar om de juiste probiotica te kiezen?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Bekijk Amare MentaBiotics® — met de klinisch bewezen Cerebiome® blend, prebiotica én magnesium voor
              complete gut-brain ondersteuning.
            </p>
            <AffiliateCTA label="Bekijk MentaBiotics® bij Amare →" product="mentabiotics" variant="primary" />
            <p className="text-white/60 text-xs mt-4">* Affiliate link — je betaalt hetzelfde bedrag</p>
          </div>
        </section>
      </article>
    </>
  );
}
