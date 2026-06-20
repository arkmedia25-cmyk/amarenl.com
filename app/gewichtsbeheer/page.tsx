import CategoryLanding from "@/components/sections/CategoryLanding";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema, generateFAQSchema, combineSchemas } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gewichtsbeheer Supplementen — Metabolisme & Vitaliteit | AmareNL",
  description: "Ondersteun je metabolisme en gewichtsbeheer met Amare: FIT20, Origin plantaardige eiwitshake en meer. Natuurlijke metabolisme-ondersteuning zonder crash-diëten.",
  alternates: { canonical: "/gewichtsbeheer" },
  openGraph: { title: "Gewichtsbeheer Supplementen — Metabolisme & Vitaliteit | AmareNL", description: "Natuurlijke metabolisme-ondersteuning met Amare supplementen.", url: "/gewichtsbeheer", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
};

const faqs = [
  { question: "Helpen supplementen echt bij gewichtsbeheer?", answer: "Supplementen zijn geen wondermiddel — ze ondersteunen je metabolisme en energieniveau terwijl jij werkt aan voeding en beweging. FIT20 ondersteunt spierherstel en metabolisme, Origin geeft verzadiging met 23g eiwit per shake. De combinatie van de juiste supplementen met gezonde voeding en beweging geeft de beste resultaten." },
  { question: "Wat is het verschil tussen FIT20 en Origin?", answer: "FIT20 richt zich op spierherstel en metabolisme-ondersteuning. Origin is een complete plantaardige maaltijdshake met 23g eiwit, MCT-olie en 26 micronutriënten — perfect als maaltijdvervanger voor gewichtsbeheer. Ze vullen elkaar aan: Origin voor voeding, FIT20 voor metabolisme." },
  { question: "Kan ik afvallen met alleen supplementen?", answer: "Nee, en wees wantrouwig naar producten die dat beloven. Supplementen zijn een hulpmiddel — ze ondersteunen je metabolisme, geven je energie voor beweging, en helpen je verzadigd te blijven. Het echte werk zit in consistente voeding en beweging. Supplementen maken die levensstijl makkelijker vol te houden." },
  { question: "Zijn deze producten geschikt voor intermittent fasting?", answer: "Origin kan uitstekend binnen een eetvenster — neem het als eerste maaltijd. FIT20 kan zowel binnen als buiten het venster. Let op: supplementen met calorieën (zoals Origin) verbreken technisch gezien een vast. Raadpleeg bij twijfel een voedingsdeskundige." },
];

export default function GewichtsbeheerPage() {
  return (<>
    <SchemaMarkup schema={combineSchemas(generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Gewichtsbeheer", url: "/gewichtsbeheer" }]), generateFAQSchema(faqs))} id="gewicht-schema" />
    <CategoryLanding category={{ slug: "gewichtsbeheer", title: "Gewichtsbeheer & Metabolisme", subtitle: "Supplementen voor een actief metabolisme", description: "Ondersteun je lichaam op een natuurlijke manier. Onze producten combineren eiwitten, metabolisme-ondersteuning en dagelijkse essentials." }} categorySlug="essentials" />

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Gewichtsbeheer Zonder Crash-Diëten</h2>
      <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
        <p>Laten we eerlijk zijn: de meeste diëten werken op de korte termijn en falen op de lange termijn. De sleutel tot blijvend gewichtsbeheer is geen crash-dieet maar een <strong>consistent werkend metabolisme</strong>. Je lichaam moet efficiënt voedingsstoffen kunnen verwerken, je moet voldoende eiwitten binnenkrijgen om spiermassa te behouden, en je hebt energie nodig om actief te blijven.</p>
        <p>Amare's gewichtsbeheer producten richten zich precies daarop. <strong>FIT20</strong> ondersteunt spierherstel en metabolisme — je behoudt spiermassa terwijl je aan je gewicht werkt. <strong>Origin</strong> geeft je 23g plantaardig eiwit per shake met MCT-olie voor verzadiging — een praktisch hulpmiddel op drukke dagen of als je moeite hebt met voldoende eiwit uit voeding alleen.</p>
        <h3>Geen magische pil, wel gerichte ondersteuning</h3>
        <p>Supplementen beloven vaak wonderen. Wij niet. Wat Amare wél biedt is gerichte nutritionele ondersteuning die het makkelijker maakt om een gezonde levensstijl vol te houden: minder hongergevoel, stabielere energie, betere sportprestaties. De rest doe jij zelf.</p>
      </div>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
      <div className="space-y-4">{faqs.map((faq, i) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div></details>))}</div>
    </div></section>
    <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">* Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA. Supplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.</p>
  </>);
}
