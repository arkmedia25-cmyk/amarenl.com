import type { Metadata } from "next";
import Image from "next/image";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { getProduct } from "@/lib/products";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Amare EDGE+™ Kopen — Cafeïnevrij Nootropicum voor Focus | AmareNL",
  description: "EDGE+ is Amare's cafeïnevrije nootropicum met pantotheenzuur (Vit B5), goji, mango-extract en Boswellia. Natuurlijke focus zonder crash, zonder cafeïne. Direct van Amare.",
  alternates: { canonical: "/edge-plus" },
  openGraph: { title: "Amare EDGE+™ Kopen — Cafeïnevrij Nootropicum | AmareNL", description: "Cafeïnevrij nootropicum met pantotheenzuur, goji en mango voor focus.", url: "/edge-plus", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Amare EDGE+™ Kopen — Cafeïnevrij Nootropicum | AmareNL", description: "Cafeïnevrij nootropicum voor focus.", images: ["/images/og-default.jpg"] },
};

const faqs = [
  { question: "Bevat EDGE+ cafeïne?", answer: "Nee, EDGE+ is volledig cafeïnevrij. Het ondersteunt focus en energie via pantotheenzuur (Vit B5) en adaptogene plantenextracten — zonder stimulanten en zonder crash. Perfect voor mensen die gevoelig zijn voor cafeïne of 's middags nog willen kunnen slapen." },
  { question: "Wat is het verschil tussen EDGE+ en Energy+?", answer: "Energy+ bevat natuurlijke cafeïne (27,64 mg) en L-glycine voor actieve energie. EDGE+ is cafeïnevrij en richt zich op langdurige mentale focus via Vitamine B5, goji, mango-extract en Boswellia. Ze vullen elkaar goed aan — Energy+ voor energie, EDGE+ voor focus." },
  { question: "Hoe snel werkt EDGE+?", answer: "EDGE+ is geen stimulant — je voelt niet binnen 10 minuten een 'kick'. Het ondersteunt je natuurlijke focus en energiemetabolisme. De meeste gebruikers merken na 1-2 weken consistent gebruik verschil in mentale helderheid en concentratie." },
  { question: "Kan ik EDGE+ combineren met koffie?", answer: "Ja, EDGE+ is cafeïnevrij dus het combineert prima met je ochtendkoffie. Het voegt focus en adaptogene ondersteuning toe zonder extra cafeïne." },
  { question: "Welke smaken zijn er?", answer: "EDGE+ is verkrijgbaar in Mango (mix met water) en Watermelon (mix met water). Beide zijn fris, natuurlijk van smaak — geen chemische nasmaak." },
];

export default function EdgePlusPage() {
  const product = getProduct("edge-mango");
  const img = product?.images?.primary || "https://amarecdn.azureedge.net/webassets/web/prod/products/EU_Mango_800_25.jpg";

  const schema = combineSchemas(
    generateProductSchema({ name: "Amare EDGE+™ Mango", nameNL: "Amare EDGE+™ Mango", description: "EDGE+ is Amare's cafeïnevrije, plantaardige nootropicum met pantotheenzuur (Vit B5, 3 mg), goji, mango-extract, Terminalia chebula en Boswellia serrata. Ondersteunt focus, energiemetabolisme en dagelijkse vitaliteit.", image: img, slug: "edge-plus", priceRetail: 86.00, priceSubscription: 77.28, ratingValue: 4.5, ratingCount: 500, affiliateUrl: "https://www.amare.com/2075008/nl-nl/amareedge-plus-mango" }),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "EDGE+", url: "/edge-plus" }])
  );

  const ingredients = [{ g: "Isomalto-oligosacharide (prebiotische vezel)", a: "945 mg", p: "Voedingsbodem voor gunstige darmbacteriën" }, { g: "Pantotheenzuur (Vitamine B5)", a: "3 mg (50% RI)", p: "Energiemetabolisme, hormoonsynthese, mentale prestaties" }, { g: "Terminalia chebula extract", a: "216 mg", p: "Ayurvedisch adaptogeen voor welzijn" }, { g: "Mango vruchtenextract", a: "100 mg", p: "Natuurlijke antioxidanten" }, { g: "Boswellia serrata (wierook) extract", a: "54 mg", p: "Traditioneel kruid voor welzijn" }, { g: "Goji vruchtenextract", a: "50 mg", p: "Adaptogeen uit de Traditionele Chinese Geneeskunde" }];

  return (<>
    <SchemaMarkup schema={schema} id="edgeplus-schema" />
    <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]"><a href="/" className="hover:text-[var(--color-primary)]">Home</a><span className="mx-2">/</span><span className="text-[var(--color-primary)] font-semibold">EDGE+™</span></nav>

    <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
      <div className="container-page py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]"><Image src={img} alt="Amare EDGE+ Mango — cafeïnevrij nootropicum" fill className="object-contain p-6" priority /></div>
          <div>
            <div className="inline-flex items-center gap-2 mb-4"><span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Cafeïnevrij</span><span className="text-[9px] text-[var(--color-text-muted)]">⭐ 4.5/5 (500+ reviews)</span></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">Amare <span className="text-[var(--color-primary)]">EDGE+™</span> Mango</h1>
            <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">Het cafeïnevrije nootropicum voor focus, drive en dagelijkse mentale helderheid.</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">Plantaardig, adaptogeen, geen crash. <strong>Direct van Amare.</strong></p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-200">🛡️ 30 dagen geld terug</span>
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-200">🎁 €8 welkomstkorting</span>
              <span className="inline-flex items-center gap-1 bg-[var(--color-bg-soft)] text-[var(--color-primary)] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[var(--color-border)]">🚚 Gratis verzending &ge;€175</span>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] mb-5 italic">Voedingssupplement. Geen geneesmiddel. De NVWA heeft de gezondheidsclaims van de gebruikte ingrediënten beoordeeld.</p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <AffiliateCTA label="Probeer nu → €77,28/maand" product="edge-mango" variant="primary" />
              <AffiliateCTA label="Of eenmalig €86,00" product="edge-mango" variant="secondary" />
            </div>
            <p className="text-[9px] text-[var(--color-text-muted)]">* Ook verkrijgbaar in Watermelon. Abonnement op elk moment opzegbaar.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat is EDGE+?</h2>
      <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
        <p><strong>EDGE+</strong> is Amare's antwoord op de vraag: "Hoe krijg ik meer focus zonder cafeïne?" Het is een volledig cafeïnevrij, plantaardig nootropicum dat je mentale helderheid en focus ondersteunt via pantotheenzuur (Vitamine B5) en zorgvuldig geselecteerde adaptogene plantenextracten.</p>
        <p>Wat EDGE+ onderscheidt van andere 'focus supplementen': het bevat geen cafeïne, geen synthetische stimulanten, en geen 'proprietary blends' waar je niet weet wat erin zit. Elke stof is bewust gekozen — pantotheenzuur voor je energiemetabolisme, Terminalia chebula en Boswellia als adaptogenen, goji en mango voor antioxidanten.</p>
        <p>Het resultaat is geen opgefokte energiepiek maar <strong>kalme, aanhoudende focus</strong>. Het soort focus waarbij je om 16:00 uur realiseert dat je sinds vanochtend productief bent geweest zonder dat je erover na hoefde te denken.</p>
      </div>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Voor wie is EDGE+?</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {[{ icon: "🧠", title: "Kenniswerkers", desc: "Lange focus nodig zonder de cafeïne-achtbaan? EDGE+ geeft je kalme, aanhoudende concentratie — geen pieken en dalen." }, { icon: "☕", title: "Cafeïnegevoeligen", desc: "Koffie geeft je hartkloppingen? EDGE+ is volledig cafeïnevrij — alle focus, geen bijwerkingen." }, { icon: "🌙", title: "Avondwerkers", desc: "Wil je 's avonds nog kunnen slapen? EDGE+ verstoort je nachtrust niet. Neem het ook in de middag zonder problemen." }, { icon: "🎯", title: "Mensen met drukke agenda", desc: "Van vergadering naar vergadering zonder mentale vermoeidheid. EDGE+ ondersteunt je de hele werkdag." }].map((item, i) => (<div key={i} className="bg-white rounded-xl p-5 border border-[var(--color-border)]"><div className="text-2xl mb-2">{item.icon}</div><h3 className="font-bold text-sm text-[var(--color-text)] mb-1">{item.title}</h3><p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p></div>))}
      </div>
    </div></section>

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Ingrediënten per stickpack</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2 border-[var(--color-primary)] text-left"><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Ingrediënt</th><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Hoeveelheid</th><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Functie</th></tr></thead><tbody>{ingredients.map((r, i) => (<tr key={i} className="border-b border-[var(--color-border)]"><td className="py-3 px-4 font-bold text-[var(--color-text)] align-top text-xs">{r.g}</td><td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">{r.a}</td><td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">{r.p}</td></tr>))}</tbody></table></div>
    </div></section>

    {/* ── Hoe gebruik je het? ── */}
    <section className="py-16 bg-[var(--color-bg-soft)]">
      <div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Hoe gebruik je EDGE+?</h2>
        <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
          <ol className="space-y-4">
            <li className="flex gap-4"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">1</span><div><strong className="text-sm text-[var(--color-text)]">Meng 1 stickpack met 250 ml koud water</strong><p className="text-xs text-[var(--color-text-muted)] mt-1">Gebruik koud of lauw water — niet met kokend water mengen. Roer goed door tot het poeder volledig is opgelost. De Mango-smaak maakt het een aangenaam ochtendritueel.</p></div></li>
            <li className="flex gap-4"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">2</span><div><strong className="text-sm text-[var(--color-text)]">Neem bij voorkeur in de ochtend of vroege middag</strong><p className="text-xs text-[var(--color-text-muted)] mt-1">EDGE+ is cafeïnevrij — dus ook geschikt voor de middag zonder dat het je nachtrust verstoort. Neem het bij het ontbijt of bij de lunch voor kalme, aanhoudende focus gedurende de dag.</p></div></li>
            <li className="flex gap-4"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">3</span><div><strong className="text-sm text-[var(--color-text)]">Dagelijks gebruiken voor het beste resultaat</strong><p className="text-xs text-[var(--color-text-muted)] mt-1">EDGE+ is ontworpen voor dagelijkse inname. De adaptogenen en pantotheenzuur werken cumulatief — hoe consistenter je gebruik, hoe beter de resultaten. Maak het onderdeel van je ochtend- of middagritueel.</p></div></li>
          </ol>
          <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]">
            <strong>⏰ Tijdsinvestering:</strong> Minder dan 1 minuut per dag.<br />
            <strong>☕ Cafeïnevrij:</strong> Geschikt voor cafeïnegevoeligen — verstoort je nachtrust niet.<br />
            <strong>📦 Inhoud:</strong> 30 stickpacks — 1 maand voorraad bij dagelijks gebruik.
          </div>
        </div>
      </div>
    </section>

    {/* ── Wat kun je verwachten? ── */}
    <section className="py-16 bg-white">
      <div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat kun je verwachten?</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">Resultaten verschillen per persoon, maar dit is wat veel gebruikers rapporteren bij consistent dagelijks gebruik:</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { week: "Week 1-2", title: "Eerste signalen", items: ["Minder mentale vermoeidheid in de middag", "Betere focus tijdens het lezen", "Geen cafeïne-achtbaan meer"] },
            { week: "Week 3-4", title: "Duidelijke verandering", items: ["Langere concentratieboog op werk/studie", "Kalmer maar alerter gevoel", "Minder afleiding door omgevingsgeluid"] },
            { week: "Week 6-8", title: "Optimale resultaten", items: ["Consistente mentale helderheid", "Productieve dagen zonder dip", "Natuurlijke drive zonder stimulanten"] },
          ].map((phase, i) => (
            <div key={i} className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">{phase.week}</div>
              <h3 className="font-bold text-sm text-[var(--color-text)] mb-2">{phase.title}</h3>
              <ul className="space-y-1">{phase.items.map((item, j) => (<li key={j} className="text-xs text-[var(--color-text-muted)] flex gap-2"><span className="text-[var(--color-primary)]">✓</span> {item}</li>))}</ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-[var(--color-text-muted)] italic">* Deze ervaringen zijn gebaseerd op gebruikersrapportages en zijn niet beoordeeld door de NVWA. Individuele resultaten kunnen variëren. Voedingssupplementen zijn geen vervanging voor een gevarieerd dieet en gezonde levensstijl.</p>
      </div>
    </section>

    {/* ── CTA #2 (Midden) ── */}
    <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
      <div className="container-page max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">Focus zonder cafeïne — het kan</h2>
        <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">Probeer EDGE+ 30 dagen risicovrij. Niet tevreden? Geld terug.</p>
        <AffiliateCTA label="Bestel EDGE+ → €77,28/maand" product="edge-mango" variant="urgency" />
        <p className="mt-4 text-[10px] text-white/60">🛡️ 30 dagen geld-terug-garantie &middot; 🚚 Gratis verzending vanaf €175 &middot; 📦 Direct van Amare</p>
      </div>
    </section>

    {/* ── Prijzen ── */}
    <section className="py-16 bg-white">
      <div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Prijzen en besparingen</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-[var(--color-bg-soft)] rounded-xl p-6 border border-[var(--color-border)]">
            <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">Abonnement — Bespaar 10%</div>
            <div className="text-3xl font-bold text-[var(--color-text)] mb-1">€77,28<span className="text-sm font-normal text-[var(--color-text-muted)]">/maand</span></div>
            <p className="text-xs text-[var(--color-text-muted)] mb-4">Elke maand automatisch geleverd. Op elk moment opzegbaar.</p>
            <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]"><li>✓ €8,72 goedkoper per maand</li><li>✓ Nooit zonder voorraad</li><li>✓ Gratis verzending</li></ul>
            <AffiliateCTA label="Start abonnement →" product="edge-mango" variant="primary" />
          </div>
          <div className="rounded-xl p-6 border border-[var(--color-border)]">
            <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Eenmalige aankoop</div>
            <div className="text-3xl font-bold text-[var(--color-text)] mb-1">€86,00</div>
            <p className="text-xs text-[var(--color-text-muted)] mb-4">Eenmalig bestellen, geen verplichtingen.</p>
            <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]"><li>✓ Vrijblijvend</li><li>✓ 30 stickpacks per verpakking</li><li>✓ Verzending €4,95</li></ul>
            <AffiliateCTA label="Eenmalig bestellen →" product="edge-mango" variant="secondary" />
          </div>
        </div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
      <div className="space-y-4">{faqs.map((faq, i) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div></details>))}</div>
    </div></section>

    {/* ── CTA #3 (Onderaan) ── */}
    <section className="py-16 bg-white">
      <div className="container-page max-w-2xl text-center">
        <div className="bg-[var(--color-bg-soft)] rounded-2xl p-8 border border-[var(--color-border)]">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3">Ervaar het verschil van echte focus</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">EDGE+ — cafeïnevrij nootropicum met pantotheenzuur en adaptogenen. 30 dagen risicovrij proberen.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
            <AffiliateCTA label="Bestel Amare EDGE+ →" product="edge-mango" variant="primary" />
            <AffiliateCTA label="Of bekijk alle producten" product="" variant="secondary" />
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
            <span>🛡️ 30 dagen garantie</span><span className="text-[var(--color-border)]">|</span>
            <span>☕ Cafeïnevrij</span><span className="text-[var(--color-border)]">|</span>
            <span>🌿 Plantaardig</span><span className="text-[var(--color-border)]">|</span>
            <span>⭐ 10.000+ klanten</span>
          </div>
          <p className="mt-6 text-[9px] text-[var(--color-text-muted)]">
            * Affiliate link — je betaalt hetzelfde bedrag, wij ontvangen een commissie.<br />
            * Deze uitspraken zijn niet beoordeeld door de NVWA. Voedingssupplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.<br />
            * Raadpleeg bij aanhoudende klachten altijd een arts. Niet geschikt voor zwangere vrouwen, borstvoeding gevende vrouwen en kinderen jonger dan 18 jaar.
          </p>
        </div>
      </div>
    
      <StickyMobileCTA product="amareedge-plus-mango" subscriptionPrice="€77,28" />
</section>
  </>);
}
