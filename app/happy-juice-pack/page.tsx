import type { Metadata } from "next";
import Image from "next/image";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { getAffiliateUrl, getProduct } from "@/lib/products";
import {
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Happy Juice Pack Kopen — Energie, Stemming & Focus | AmareNL",
  description:
    "Het Happy Juice Pack van Amare is de #1 bundel voor mentale energie, focus en een stabiele stemming. MentaBiotics + Energy+ + EDGE+. Direct van Amare — premium kwaliteit.",
  alternates: { canonical: "/happy-juice-pack" },
  openGraph: {
    title: "Happy Juice Pack Kopen — Energie, Stemming & Focus | AmareNL",
    description: "Het Happy Juice Pack van Amare is de #1 bundel voor mentale energie, focus en een stabiele stemming.",
    url: "/happy-juice-pack",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Juice Pack Kopen — Energie, Stemming & Focus | AmareNL",
    description: "Het Happy Juice Pack van Amare is de #1 bundel voor mentale energie, focus en een stabiele stemming.",
    images: ["/images/og-default.jpg"],
  },
}

const faqs = [
  {
    question: "Wat is het Happy Juice Pack precies?",
    answer:
      "Het Happy Juice Pack is Amare's best verkochte productbundel, speciaal ontwikkeld om de gut-brain axis te ondersteunen. Het combineert drie producten — MentaBiotics (probiotica voor de darm-hersen-as), Energy+ (natuurlijke energie zonder cafeïnecrash) en Amare EDGE+ (plantaardig nootropicum voor focus) — tot één dagelijkse routine voor mentale veerkracht, energie en helderheid.",
  },
  {
    question: "Hoe snel merk ik resultaat van Happy Juice?",
    answer:
      "Veel gebruikers rapporteren de eerste subtiele veranderingen — zoals een stabielere stemming en minder middagdip — binnen 2 tot 3 weken bij consistent dagelijks gebruik. Optimale resultaten voor mentale focus en veerkracht worden doorgaans na 6 tot 8 weken bereikt. De darm-hersen-as heeft tijd nodig om te herstellen; dit is geen quick fix maar een duurzame investering.",
  },
  {
    question: "Is Happy Juice geschikt voor dagelijks gebruik?",
    answer:
      "Ja, het Happy Juice Pack is ontworpen als dagelijkse ochtendroutine. De probiotica in MentaBiotics ondersteunen continu je darmflora, terwijl Energy+ en EDGE+ je overdag van natuurlijke energie en focus voorzien. Het pack bevat geen synthetische stimulanten die je bijnieren uitputten — je bouwt geen tolerantie op en ervaart geen crash.",
  },
  {
    question: "Wat is het verschil tussen de Mango en Watermelon variant?",
    answer:
      "Beide varianten bevatten exact dezelfde werkzame ingrediënten en doseringen. Het enige verschil is de smaak van de EDGE+ drank — Mango of Watermelon. Kies de smaak die je het meest aanspreekt. De Mango-variant is het populairst onder Nederlandse gebruikers.",
  },
  {
    question: "Kan ik Happy Juice combineren met andere Amare producten?",
    answer:
      "Absoluut. Happy Juice werkt uitstekend samen met andere Amare producten zoals Restore (extra spijsverteringsenzymen), Sunset (omega-3 voor het brein) en de Triangle of Wellness. Veel gebruikers bouwen hun routine geleidelijk uit. Begin met Happy Juice en voeg later andere producten toe op basis van je behoeften.",
  },
  {
    question: "Kan ik dit product gebruiken in combinatie met medicatie?",
    answer:
      "Raadpleeg altijd eerst je arts voordat je supplementen combineert met voorgeschreven medicatie. Hoewel Amare producten gemaakt zijn met natuurlijke ingrediënten, kunnen interacties met bepaalde medicijnen niet worden uitgesloten. Je arts kent jouw medische geschiedenis en kan het beste adviseren.",
  },
];

const ingredients = [
  { product: "MentaBiotics®", amount: "1 sachet", key: "Cerebiome® blend: L. helveticus R0052, L. rhamnosus R0011, B. longum R0175 (1 miljard CFU) + Magnesium (56,25 mg) + L-glutamine (230 mg) + botanische extracten", purpose: "Darm-hersen-as, stemming, stressrespons" },
  { product: "Energy+", amount: "2 capsules", key: "Groene thee-extract, Rhodiola rosea, Vitamine B-complex, Panax ginseng", purpose: "Natuurlijke energie, vermindering vermoeidheid" },
  { product: "Amare EDGE+™", amount: "1 zakje (30 ml)", key: "Plantaardig nootropicum: citicoline, L-theanine, ashwagandha, ginkgo biloba", purpose: "Mentale focus, concentratie, cognitieve helderheid" },
];

export default function HappyJuicePackPage() {
  const product = getProduct("happy-juice-pack-amare-edge-mango");
  const affiliateUrl = getAffiliateUrl("happy-juice-pack-amare-edge-mango");
  const productImage = product?.image || "https://amarecdn.azureedge.net/webassets/web/prod/products/HJ_mango-EU-800_25.jpg";

  const productSchema = generateProductSchema({
    name: "Amare Happy Juice Pack® - Amare EDGE+™ Mango",
    nameNL: "Amare Happy Juice Pack®",
    description:
      "Het Happy Juice Pack is Amare's #1 productbundel voor mentale energie, focus en een stabiele stemming. Combineert MentaBiotics (probiotica), Energy+ (natuurlijke energie) en Amare EDGE+ (focus nootropicum) voor complete gut-brain ondersteuning. Direct van Amare — premium kwaliteit.",
    image: productImage,
    slug: "happy-juice-pack",
    priceRetail: 172.22,
    priceSubscription: 155.33,
    ratingValue: 4.8,
    ratingCount: 750,
    affiliateUrl: affiliateUrl,
  });

  const combinedSchema = combineSchemas(
    productSchema,
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Happy Juice Pack", url: "/happy-juice-pack" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="happy-juice-schema" />

      {/* ── Breadcrumb ── */}
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">Home</a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">Happy Juice Pack</span>
      </nav>

      {/* ── HERO + CTA #1 ── */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
              <Image
                src={productImage}
                alt="Amare Happy Juice Pack — MentaBiotics, Energy+ en EDGE+ Mango"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Bestseller</span>
                <span className="text-[9px] text-[var(--color-text-muted)]">⭐ 4.8/5 (750+ reviews)</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
                Happy Juice Pack<span className="text-[var(--color-primary)]">®</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-6 leading-relaxed">
                De #1 bundel van Amare voor mentale energie, focus en een stabiele stemming — wetenschappelijk onderbouwd, gemaakt met natuurlijke ingrediënten. <strong>Direct van Amare — premium kwaliteit.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <AffiliateCTA label="Bestel bij Amare → €155,33/maand" product="happy-juice-pack-amare-edge-mango" variant="primary" />
                <AffiliateCTA label="Of eenmalig €172,22" product="happy-juice-pack-amare-edge-mango" variant="secondary" />
              </div>
              <p className="text-[9px] text-[var(--color-text-muted)]">* Affiliate link — je betaalt hetzelfde bedrag. Abonnement op elk moment opzegbaar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wat is het Happy Juice Pack? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat is het Happy Juice Pack?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              Het <strong>Happy Juice Pack</strong> is de meest populaire productbundel van Amare — en dat is niet zonder reden. Deze bundel is specifiek ontwikkeld rondom één centraal wetenschappelijk inzicht: <strong>je darmen en hersenen staan constant met elkaar in verbinding</strong> via de gut-brain axis. Wat er in je darmen gebeurt, heeft direct invloed op hoe je je voelt, hoe scherp je denkt en hoeveel energie je hebt.
            </p>
            <p>
              Het pack combineert drie complementaire producten in één dagelijkse routine:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>MentaBiotics®</strong> — Een probioticum met de klinisch onderzochte Cerebiome® blend (L. helveticus R0052, L. rhamnosus R0011, B. longum R0175), magnesium en L-glutamine. Gericht op de darm-hersen-as voor mentale veerkracht en een stabiele stemming.</li>
              <li><strong>Energy+</strong> — Natuurlijke energie uit groene thee-extract, Rhodiola rosea en B-vitamines. Zonder de crash die je van cafeïne krijgt — het ondersteunt je natuurlijke energieniveau op celniveau.</li>
              <li><strong>Amare EDGE+™</strong> — Een vloeibaar plantaardig nootropicum met citicoline, L-theanine en ashwagandha. Ontwikkeld voor mentale focus, concentratie en cognitieve helderheid gedurende de dag.</li>
            </ul>
            <p>
              Samen vormen deze drie producten een <strong>complete gut-brain routine</strong> die je 's ochtends doorloopt in minder dan 5 minuten. Het resultaat: meer energie, een helderdere focus en een stabielere stemming — de hele dag door.
            </p>
          </div>
        </div>
      </section>

      {/* ── Voor wie is dit? ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Voor wie is het Happy Juice Pack geschikt?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "🎯", title: "Drukke professionals", desc: "Die mentale focus en energie nodig hebben zonder de achtbaan van cafeïne." },
              { icon: "🧘", title: "Mensen met stressklachten", desc: "Die hun mentale veerkracht op een natuurlijke manier willen ondersteunen." },
              { icon: "📚", title: "Studenten", desc: "Die betere concentratie en helderheid zoeken tijdens studiemarathons." },
              { icon: "🌱", title: "Gezondheidsbewuste Nederlanders", desc: "Die de gut-brain connectie willen optimaliseren met wetenschappelijk onderbouwde supplementen." },
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
            Wat zit erin? — Ingrediënten per dagelijkse portie
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--color-primary)] text-left">
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">Product</th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">Dosering</th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">Belangrijkste ingrediënten</th>
                  <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">Doel</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((item, i) => (
                  <tr key={i} className="border-b border-[var(--color-border)]">
                    <td className="py-3 px-4 font-bold text-[var(--color-text)]">{item.product}</td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">{item.amount}</td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">{item.key}</td>
                    <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">{item.purpose}</td>
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
            Hoe gebruik je het Happy Juice Pack?
          </h2>
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">1</span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">MentaBiotics® sachet</strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Meng 1 sachet met 250 ml water en neem bij je ontbijt. De vloeibare formule zorgt voor optimale opname van de probiotica.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">2</span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">Energy+ capsules</strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Neem 2 capsules met water, bij voorkeur in de ochtend. De B-vitamines en adaptogenen ondersteunen je natuurlijke energie gedurende de dag.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">3</span>
                <div>
                  <strong className="text-sm text-[var(--color-text)]">Amare EDGE+™ drank</strong>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">Drink 1 zakje (30 ml) direct. De Mango-smaak maakt het een aangename toevoeging aan je ochtendroutine. De L-theanine en ashwagandha ondersteunen een kalme, gefocuste staat.</p>
                </div>
              </li>
            </ol>
            <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]">
              <strong>⏰ Tijdsinvestering:</strong> Minder dan 5 minuten per ochtend.<br />
              <strong>📅 Consistentie:</strong> Dagelijks gebruik geeft de beste resultaten. Veel gebruikers rapporteren eerste effecten na 2-3 weken.
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
            Resultaten verschillen per persoon, maar dit is wat veel gebruikers rapporteren bij consistent dagelijks gebruik:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { week: "Week 1-2", title: "Eerste signalen", items: ["Mildere middagdip", "Iets stabielere stemming", "Minder 'brain fog' in de ochtend"] },
              { week: "Week 3-4", title: "Duidelijke verandering", items: ["Betere focus op werk/studie", "Meer energie zonder crash", "Rustiger gevoel bij stress"] },
              { week: "Week 6-8", title: "Optimale resultaten", items: ["Consistente mentale helderheid", "Stabiele stemming overdag", "Veerkracht bij drukke periodes"] },
            ].map((phase, i) => (
              <div key={i} className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]">
                <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">{phase.week}</div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-2">{phase.title}</h3>
                <ul className="space-y-1">
                  {phase.items.map((item, j) => (
                    <li key={j} className="text-xs text-[var(--color-text-muted)] flex gap-2">
                      <span className="text-[var(--color-primary)]">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[var(--color-text-muted)] italic">
            * Deze ervaringen zijn gebaseerd op gebruikersrapportages en zijn niet beoordeeld door de NVWA. Individuele resultaten kunnen variëren. Supplementen zijn geen vervanging voor een gevarieerd dieet en gezonde levensstijl.
          </p>
        </div>
      </section>

      {/* ── CTA #2 (Midden) ── */}
      <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">
            Klaar voor meer energie en focus?
          </h2>
          <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
            Probeer het Happy Juice Pack 30 dagen risicovrij. Niet tevreden? Geld terug.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <AffiliateCTA label="Bestel nu — Abonnement €155,33/maand" product="happy-juice-pack-amare-edge-mango" variant="urgency" />
          </div>
          <p className="mt-4 text-[10px] text-white/60">
            🛡️ 30 dagen geld-terug-garantie &middot; 🚚 Gratis verzending vanaf €175 &middot; 📦 Direct van Amare
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
              <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">Abonnement — Bespaar 10%</div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">€155,33<span className="text-sm font-normal text-[var(--color-text-muted)]">/maand</span></div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">Elke maand automatisch geleverd. Op elk moment opzegbaar.</p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ €16,89 goedkoper per maand</li>
                <li>✓ Nooit zonder voorraad</li>
                <li>✓ Gratis verzending</li>
              </ul>
              <AffiliateCTA label="Start abonnement →" product="happy-juice-pack-amare-edge-mango" variant="primary" />
            </div>
            <div className="rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Eenmalige aankoop</div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">€172,22</div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">Eenmalig bestellen, geen verplichtingen.</p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]">
                <li>✓ Vrijblijvend</li>
                <li>✓ Voorraad voor 1 maand</li>
                <li>✓ Verzending €4,95</li>
              </ul>
              <AffiliateCTA label="Eenmalig bestellen →" product="happy-juice-pack-amare-edge-mango" variant="secondary" />
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
              <details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group">
                <summary className="p-5 font-bold text-sm text-[var(--color-text)] cursor-pointer hover:text-[var(--color-primary)] transition-colors list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-[var(--color-primary)] text-lg group-open:rotate-45 transition-transform">+</span>
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
              Begin vandaag met het Happy Juice Pack
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
              Ervaar zelf waarom duizenden Nederlanders kiezen voor Amare's #1 bundel. 30 dagen risicovrij proberen.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <AffiliateCTA label="Bestel bij Amare →" product="happy-juice-pack-amare-edge-mango" variant="primary" />
              <AffiliateCTA label="Of bekijk alle producten" product="" variant="secondary" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              <span>🛡️ 30 dagen garantie</span>
              <span className="text-[var(--color-border)]">|</span>
              <span>🚚 Wetenschappelijk onderbouwd</span>
              <span className="text-[var(--color-border)]">|</span>
              <span>🌿 Natuurlijke ingrediënten</span>
              <span className="text-[var(--color-border)]">|</span>
              <span>⭐ 10.000+ klanten</span>
            </div>
            <p className="mt-6 text-[9px] text-[var(--color-text-muted)]">
              * Affiliate link — je betaalt hetzelfde bedrag, wij ontvangen een commissie.<br />
              * Deze uitspraken zijn niet beoordeeld door de NVWA. Voedingssupplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.<br />
              * Raadpleeg bij aanhoudende klachten altijd een arts. Niet geschikt voor zwangere vrouwen, borstvoeding gevende vrouwen en kinderen jonger dan 18 jaar.
            </p>
          </div>
        </div>
      </section>
      <StickyMobileCTA product="happy-juice-pack-amare-edge-mango" subscriptionPrice="€155,33" oneTimePrice="€172,22" />
    </>
  );
}
