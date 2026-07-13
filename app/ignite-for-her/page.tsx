import type { Metadata } from "next";
import Image from "next/image";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { getProduct } from "@/lib/products";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Amare Ignite for HER Kopen — Vrouwelijk Welzijn & Balans | AmareNL",
  description: "Ignite for HER met Neuravena® (wilde groene haver), shatavari, magnesium en bamboe-silica. Natuurlijke ondersteuning voor vrouwelijk welzijn. Veganistisch.",
  alternates: { canonical: "/ignite-for-her" },
  openGraph: { title: "Amare Ignite for HER Kopen — Vrouwelijk Welzijn | AmareNL", description: "Neuravena®, shatavari, magnesium en silica — voor vrouwelijke balans.", url: "/ignite-for-her", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Amare Ignite for HER Kopen — Vrouwelijk Welzijn | AmareNL", description: "Neuravena®, shatavari, magnesium — vrouwelijke balans.", images: ["/images/og-default.jpg"] },
};

const faqs = [
  { question: "Wat is Neuravena®?", answer: "Neuravena® is een gepatenteerd extract van wilde groene haver (Avena sativa) dat specifiek wordt gebruikt voor cognitieve ondersteuning en algeheel welzijn. Het is het hoofdingrediënt in Ignite for HER met 300 mg per dagdosering." },
  { question: "Bevat Ignite for HER hormonen?", answer: "Nee. Ignite for HER bevat geen hormonen. Het gebruikt plantaardige extracten zoals shatavari en fenegriek die traditioneel in de Ayurveda worden gebruikt ter ondersteuning van de vrouwelijke balans, plus magnesium voor energie en welzijn." },
  { question: "Vanaf welke leeftijd kan ik het gebruiken?", answer: "Ignite for HER is geschikt voor vrouwen vanaf 12 jaar. De formule is zo samengesteld dat het vrouwen in verschillende levensfasen ondersteunt — van tiener tot volwassen en verder." },
  { question: "Is het geschikt voor veganisten?", answer: "Ja! Ignite for HER is 100% veganistisch en vegetarisch. Let wel op: het bevat gluten uit haver — dus niet geschikt bij coeliakie." },
  { question: "Hoe combineer ik Ignite met andere Amare producten?", answer: "Ignite for HER combineert uitstekend met MentaBiotics (voor de darm-hersen connectie en stemming) en Sunrise (voor dagelijkse vitaminen en mineralen). Samen vormen ze een complete basis voor vrouwelijk welzijn." },
];

const ingredients = [
  { g: "Neuravena® wilde groene haver extract", a: "300 mg", p: "Gepatenteerd extract voor cognitie en welzijn" },
  { g: "Rode bietenpoeder", a: "100 mg", p: "Natuurlijke nitraten voor doorbloeding" },
  { g: "Magnesium(oxide)", a: "60 mg (16% RI)", p: "Vermindert vermoeidheid, ondersteunt spieren en zenuwen" },
  { g: "Shatavari 5:1 extract", a: "40 mg (= 200 mg)", p: "Ayurvedisch kruid voor vrouwelijke balans" },
  { g: "Bamboe-extract (70% silica)", a: "28,57 mg (20 mg silica)", p: "Voor huid, haar en nagels" },
  { g: "Fenegriek 6:1 extract", a: "25 mg (= 150 mg)", p: "Traditioneel kruid voor welzijn" },
  { g: "Citroenmelisse 4:1 extract", a: "23,5 mg (= 94 mg)", p: "Natuurlijke ontspanning" },
];

export default function IgniteHerPage() {
  const product = getProduct("ignite-her");
  const img = product?.images?.primary || "https://amarecdn.azureedge.net/webassets/web/prod/products/Ignite-Her-EU-800.jpg";

  const schema = combineSchemas(
    generateProductSchema({ name: "Amare Ignite for HER", nameNL: "Amare Ignite for HER", description: "Ignite for HER is een veganistisch supplement voor vrouwen met Neuravena® (300 mg), shatavari, magnesium, bamboe-silica, fenegriek en citroenmelisse voor natuurlijke ondersteuning van vrouwelijk welzijn.", image: img, slug: "ignite-for-her", priceRetail: 55.00, priceSubscription: 49.50, ratingValue: 4.5, ratingCount: 300, affiliateUrl: "https://www.amare.com/2075008/nl-nl/ignite-for-her" }),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Ignite for HER", url: "/ignite-for-her" }])
  );

  return (<>
    <SchemaMarkup schema={schema} id="ignite-her-schema" />
    <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]"><a href="/" className="hover:text-[var(--color-primary)]">Home</a><span className="mx-2">/</span><span className="text-[var(--color-primary)] font-semibold">Ignite for HER</span></nav>

    <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
      <div className="container-page py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]"><Image src={img} alt="Amare Ignite for HER — vrouwelijk welzijn supplement" fill className="object-contain p-6" priority /></div>
          <div>
            <div className="inline-flex items-center gap-2 mb-4"><span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Veganistisch</span><span className="text-[9px] text-[var(--color-text-muted)]">⭐ 4.5/5 (300+ reviews)</span></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">Amare <span className="text-[var(--color-primary)]">Ignite for HER</span></h1>
            <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">Natuurlijke ondersteuning voor vrouwelijk welzijn — Neuravena®, shatavari, magnesium en silica.</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">100% veganistisch. <strong>Direct van Amare.</strong></p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-200">🛡️ 30 dagen geld terug</span>
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-200">🎁 €8 welkomstkorting</span>
              <span className="inline-flex items-center gap-1 bg-[var(--color-bg-soft)] text-[var(--color-primary)] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[var(--color-border)]">🚚 Gratis verzending &ge;€175</span>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] mb-5 italic">Voedingssupplement. Geen geneesmiddel. De NVWA heeft de gezondheidsclaims van de gebruikte ingrediënten beoordeeld.</p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <AffiliateCTA label="Probeer nu → €49,50/maand" product="ignite-her" variant="primary" />
              <AffiliateCTA label="Of eenmalig €55,00" product="ignite-her" variant="secondary" />
            </div>
            <p className="text-[9px] text-[var(--color-text-muted)]">* Affiliate link — je betaalt hetzelfde bedrag. Abonnement op elk moment opzegbaar.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat is Ignite for HER?</h2>
      <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
        <p><strong>Ignite for HER</strong> is geen multivitamine en geen generiek 'vrouwensupplement'. Het is een gerichte formule die specifiek is ontwikkeld voor de unieke behoeften van het vrouwelijk lichaam — met ingrediënten die elkaar aanvullen op het gebied van energie, welzijn, ontspanning en schoonheid.</p>
        <p>De kern is <strong>Neuravena®</strong> — een gepatenteerd extract van wilde groene haver (300 mg) dat wordt ondersteund door klinisch onderzoek naar cognitieve functie. Daaromheen zitten shatavari en fenegriek — twee traditionele Ayurvedische kruiden die al generaties worden gebruikt voor vrouwelijke balans. Magnesium ondersteunt energie en het zenuwstelsel, bamboe-silica draagt bij aan huid, haar en nagels, en citroenmelisse helpt bij natuurlijke ontspanning.</p>
        <p>Het resultaat is een supplement dat niet één ding belooft maar het hele plaatje ondersteunt — van hoe je je voelt tot hoe je eruitziet.</p>
      </div>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Ingrediënten per dagdosering (2 capsules)</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2 border-[var(--color-primary)] text-left"><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Ingrediënt</th><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Hoeveelheid</th><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Wat het doet</th></tr></thead><tbody>{ingredients.map((r, i) => (<tr key={i} className="border-b border-[var(--color-border)]"><td className="py-3 px-4 font-bold text-[var(--color-text)] align-top text-xs">{r.g}</td><td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">{r.a}</td><td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">{r.p}</td></tr>))}</tbody></table></div>
    </div></section>

    <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]"><div className="container-page max-w-3xl text-center">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">Investeer in jezelf — je verdient het</h2>
      <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">Probeer Ignite for HER 30 dagen risicovrij.</p>
      <AffiliateCTA label="Bestel Ignite for HER → €49,50/maand" product="ignite-her" variant="urgency" />
      <p className="mt-4 text-[10px] text-white/60">🛡️ 30 dagen geld-terug &middot; 🌱 100% veganistisch &middot; 📦 Direct van Amare</p>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
      <div className="space-y-4">{faqs.map((faq, i) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div></details>))}</div>
    </div></section>

    <section className="py-12 bg-white"><div className="container-page max-w-3xl text-center">
      <h2 className="text-xl md:text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3">Natuurlijke balans voor elke levensfase</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-lg mx-auto">Ignite for HER — Neuravena®, shatavari en magnesium in één veganistische formule.</p>
      <AffiliateCTA label="Bestel Amare Ignite for HER →" product="ignite-her" variant="primary" />
      <p className="mt-4 text-[9px] text-[var(--color-text-muted)]">* Deze uitspraken zijn niet beoordeeld door de NVWA. Supplementen zijn geen vervanging voor een gevarieerd voedingspatroon.</p>
    </div></section>
  </>);
}
