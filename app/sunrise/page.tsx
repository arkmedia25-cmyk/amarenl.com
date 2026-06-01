import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Sunrise 2-Pack Kopen — Ochtend Superfoods & 9 Vitaminen | AmareNL",
  description:
    "Amare Sunrise: 22 superfoods, 9 essentiële vitaminen (C, B-complex, Biotine) in vloeibare ochtendformule. Voor energie, huid, haar en immuunsysteem. Direct van Amare — premium kwaliteit.",
  alternates: { canonical: "/sunrise" },
  openGraph: {
    title: "Sunrise 2-Pack Kopen — Ochtend Superfoods & 9 Vitaminen | AmareNL",
    description:
      "Amare Sunrise: 22 superfoods, 9 essentiële vitaminen in vloeibare ochtendformule. Direct van Amare — premium kwaliteit.",
    url: "/sunrise",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunrise 2-Pack Kopen — Ochtend Superfoods & 9 Vitaminen | AmareNL",
    description:
      "Amare Sunrise: 22 superfoods, 9 essentiële vitaminen in vloeibare ochtendformule.",
    images: ["/images/og-default.jpg"],
  },
};

const faqs = [
  {
    question: "Wanneer neem ik Sunrise het beste in?",
    answer:
      "Sunrise is speciaal ontwikkeld voor de ochtend. Neem 1 pouch (30 ml) bij het ontbijt of direct na het opstaan. De 9 B-vitamines en vitamine C ondersteunen je energiemetabolisme aan het begin van de dag. Sunrise maakt deel uit van de Triangle of Wellness: Sunrise (ochtend) → Nitro (middag) → Sunset (avond). Dit ritme volgt het natuurlijke dag-nachtritme van je lichaam.",
  },
  {
    question: "Bevat Sunrise toegevoegde suikers?",
    answer:
      "Sunrise bevat fructose uit natuurlijke vruchtensapconcentraten en is gezoet met steviolglycosiden uit stevia — een natuurlijke, calorievrije zoetstof. Het bevat geen geraffineerde suiker, geen glucose-fructosestroop en geen kunstmatige zoetstoffen. De natuurlijke bessensmaak komt van de 8 soorten bessen in de formule.",
  },
  {
    question: "Is Sunrise geschikt voor veganisten?",
    answer:
      "Ja, Sunrise is 100% plantaardig — volledig vegan. Daarnaast is het glutenvrij, lactosevrij, sojavrij en notenvrij. Een van de meest allergeenvrije supplementen in het Amare-assortiment.",
  },
  {
    question: "Wat is de Triangle of Wellness?",
    answer:
      "De Triangle of Wellness is Amare's dagelijkse ritme van drie supplementen: Sunrise (ochtend) voor 22 superfoods en 9 vitaminen, Nitro Xtreme (middag) voor stikstofmonoxide-ondersteuning, en Sunset (avond) voor omega-3 en vetoplosbare vitaminen D3/A/E. Samen dekken ze de behoeften van een volledige dag — ochtend, middag en avond.",
  },
  {
    question: "Kan ik Sunrise combineren met andere supplementen?",
    answer:
      "Ja, Sunrise is ontworpen als dagelijkse basis die uitstekend combineert met andere Amare producten. Veel gebruikers nemen Sunrise in de ochtend en voegen Energy+ of MentaBiotics toe. Het is de ideale fundering van je dagelijkse supplementenroutine.",
  },
  {
    question: "Kan ik dit product gebruiken in combinatie met medicatie?",
    answer:
      "Raadpleeg altijd eerst je arts voordat je supplementen combineert met voorgeschreven medicatie. Hoewel Amare producten gemaakt zijn met natuurlijke ingrediënten, kunnen interacties met bepaalde medicijnen niet worden uitgesloten. Je arts kent jouw medische geschiedenis en kan het beste adviseren.",
  },
];

const ingredientGroups = [
  {
    group: "9 Essentiële Vitaminen",
    items: "Vitamine C (60 mg), B3/Niacine (25 mg), B5 (15 mg), B6 (1,7 mg), B2 (1,7 mg), B1 (1,5 mg), B9/Foliumzuur (200 µg), Biotine (150 µg, 300% RI), B12 (3 µg)",
    amount: "105 mg totaal",
    purpose: "Energie, immuunsysteem, huid, haar en psychologische functie",
  },
  {
    group: "22 Superfoods",
    items: "8 bessen: bosbes, blauwe bes, Canadese bosbes, framboos, aronia, vossenbes, cranberry, açaí; Groenten: spinazie, boerenkool, broccoli; Fruit: granaatappel, mangosteen, druivenschil, amla-bes; Overig: Panax ginseng, taurine (200 mg), inositol (25 mg)",
    amount: "—",
    purpose: "Polyfenolen en fytonutriënten uit natuurlijke bronnen",
  },
  {
    group: "Aminozuren & Adaptogenen",
    items: "Taurine (200 mg), Inositol (25 mg), Panax ginseng extract (1,57 mg)",
    amount: "226,57 mg",
    purpose: "Taurine en ginseng voor mentale alertheid in de ochtend",
  },
];

export default function SunrisePage() {
  const product = getProduct("sunrise-2-pack");
  const productImage =
    product?.image ||
    "https://amarecdn.azureedge.net/webassets/web/prod/products/Sunrise-2pk-EU-800.jpg";

  const productSchema = generateProductSchema({
    name: "Amare Sunrise 2-Pack",
    nameNL: "Amare Sunrise 2-Pack",
    description:
      "Amare Sunrise is een vloeibare ochtendformule met 22 superfoods (8 bessen, groene groenten, granaatappel) en 9 essentiële vitaminen (C, B1, B2, B3, B5, B6, B9, B12, Biotine). Vitamine C en B-vitamines ondersteunen het energiemetabolisme en helpen vermoeidheid te verminderen. Biotine (300% RI) voor normaal haar en huid.",
    image: productImage,
    slug: "sunrise",
    priceRetail: 95.31,
    priceSubscription: 85.78,
    ratingValue: 4.5,
    ratingCount: 420,
    affiliateUrl: "https://www.amare.com/2075008/nl-nl/sunrise-2pack",
  });

  const combinedSchema = combineSchemas(
    productSchema,
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Sunrise", url: "/sunrise" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="sunrise-schema" />
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">Home</a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">Sunrise</span>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
              <Image src={productImage} alt="Amare Sunrise — ochtend superfoods met 9 vitaminen" fill className="object-contain p-6" priority />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-[9px] text-[var(--color-text-muted)]">⭐ 4.5/5 (420+ reviews)</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
                Amare <span className="text-[var(--color-primary)]">Sunrise</span> 2-Pack
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">
                22 superfoods + 9 essentiële vitaminen in vloeibare ochtendformule — start je dag met een complete voedingsboost.
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Biotine (300% RI) voor haar en huid. B-vitamines voor energie.{" "}
                <strong>Direct van Amare — premium kwaliteit.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <AffiliateCTA label="Bestel bij Amare → €85,78/maand" product="sunrise-2-pack" variant="primary" />
                <AffiliateCTA label="Of eenmalig €95,31" product="sunrise-2-pack" variant="secondary" />
              </div>
              <p className="text-[9px] text-[var(--color-text-muted)]">* Affiliate link — je betaalt hetzelfde bedrag. Abonnement op elk moment opzegbaar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wat is Sunrise? ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat is Sunrise?</h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              <strong>Sunrise</strong> is Amare's vloeibare ochtendformule — het eerste deel van de Triangle of Wellness. Elke portie van 30 ml levert{" "}
              <strong>22 zorgvuldig geselecteerde superfoods</strong> en <strong>9 essentiële vitaminen</strong> in een handige, kant-en-klare pouch.
              Het is ontwikkeld als dagelijkse voedingsfundering: één pouch bij het ontbijt, en je hebt de belangrijkste micronutriënten voor de dag binnen.
            </p>
            <p>Wat maakt Sunrise bijzonder:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>8 soorten bessen:</strong> bosbes, blauwe bes, Canadese bosbes, framboos, aronia, vossenbes, cranberry en açaí leveren een breed spectrum aan natuurlijke polyfenolen.</li>
              <li><strong>Groene groenten:</strong> spinazie, boerenkool en broccoli — rijke bronnen van chlorofyl en antioxidanten.</li>
              <li><strong>9 essentiële vitaminen:</strong> het complete B-complex (B1, B2, B3, B5, B6, B9, B12) plus vitamine C en Biotine (300% RI). Vitamine C, B2, B3, B5, B6, B9 en B12 ondersteunen het energiemetabolisme en helpen bij de vermindering van vermoeidheid.</li>
              <li><strong>Taurine (200 mg) en Panax ginseng:</strong> voor mentale alertheid in de ochtend.</li>
            </ul>
            <p>Het 2-Pack bevat twee maandvoorraden (60 pouches) — voordeliger dan losse aankoop.</p>
          </div>
        </div>
      </section>

      {/* ── Voor wie? ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Voor wie is Sunrise geschikt?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "🌅", title: "Ochtendmensen én niet-ochtendmensen", desc: "Die hun dag willen starten met een complete voedingsboost — zonder pillen te hoeven slikken." },
              { icon: "💊", title: "Wie geen multivitaminepillen lust", desc: "Sunrise is vloeibaar, smaakt naar bessen, en levert 9 vitaminen in één pouch — een smakelijk alternatief voor capsules." },
              { icon: "👩‍💼", title: "Drukke professionals", desc: "Die 's ochtends snel en makkelijk hun vitaminen willen innemen — één pouch, klaar." },
              { icon: "🌱", title: "Veganisten & mensen met allergieën", desc: "100% plantaardig, glutenvrij, lactosevrij, sojavrij, notenvrij — geschikt voor vrijwel elk dieet." },
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

      {/* ── Ingrediënten tabel ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat zit erin? — Per portie (30 ml)</h2>
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

      {/* ── Hoe gebruiken? ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Hoe gebruik je Sunrise?</h2>
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
            <ol className="space-y-4">
              <li className="flex gap-4"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">1</span><div><strong className="text-sm text-[var(--color-text)]">Neem 1 pouch (30 ml) bij het ontbijt</strong><p className="text-xs text-[var(--color-text-muted)] mt-1">Direct uit de pouch drinken of mengen met water. De vloeibare vorm zorgt voor snelle opname.</p></div></li>
              <li className="flex gap-4"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">2</span><div><strong className="text-sm text-[var(--color-text)]">Maak het je ochtendritueel</strong><p className="text-xs text-[var(--color-text-muted)] mt-1">Koppel Sunrise aan een bestaande gewoonte — bijvoorbeeld direct na het tandenpoetsen of bij je ontbijt. Consistentie is de sleutel.</p></div></li>
              <li className="flex gap-4"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">3</span><div><strong className="text-sm text-[var(--color-text)]">Combineer met Sunset voor het complete ritme</strong><p className="text-xs text-[var(--color-text-muted)] mt-1">Sunrise in de ochtend + Sunset in de avond = de Triangle of Wellness. Samen dekken ze je dagelijkse behoefte aan vitaminen, superfoods en omega-3.</p></div></li>
            </ol>
            <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]">
              <strong>⏰ Tijdsinvestering:</strong> 10 seconden per ochtend.<br />
              <strong>🌱 Dieet:</strong> 100% vegan, glutenvrij, lactosevrij, sojavrij, notenvrij.<br />
              <strong>📦 2-Pack:</strong> 60 pouches — 2 maanden voorraad.
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat kun je verwachten?</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">Dit is wat veel gebruikers rapporteren bij dagelijks gebruik:</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { week: "Week 1-2", title: "Eerste signalen", items: ["Prettig ochtendritueel", "Lekkere bessensmaak", "Lichte toename alertheid"] },
              { week: "Week 3-4", title: "Duidelijke verandering", items: ["Meer energie in de ochtend", "Minder vermoeidheid overdag", "Betere huiduitstraling"] },
              { week: "Week 6-8", title: "Optimale resultaten", items: ["Consistente ochtendenergie", "Gezondere haar en nagels", "Sterkere natuurlijke weerstand"] },
            ].map((phase, i) => (
              <div key={i} className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]">
                <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">{phase.week}</div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-2">{phase.title}</h3>
                <ul className="space-y-1">{phase.items.map((item, j) => (<li key={j} className="text-xs text-[var(--color-text-muted)] flex gap-2"><span className="text-[var(--color-primary)]">✓</span> {item}</li>))}</ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[var(--color-text-muted)] italic">* Gebaseerd op gebruikersrapportages, niet beoordeeld door NVWA. Individuele resultaten kunnen variëren.</p>
        </div>
      </section>

      {/* ── CTA Midden ── */}
      <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">Start je ochtend met 22 superfoods</h2>
          <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">Probeer Sunrise 30 dagen risicovrij. Niet tevreden? Geld terug.</p>
          <AffiliateCTA label="Bestel nu — Abonnement €85,78/maand" product="sunrise-2-pack" variant="urgency" />
          <p className="mt-4 text-[10px] text-white/60">🛡️ 30 dagen garantie &middot; 🚚 Gratis verzending vanaf €175 &middot; 📦 Vanuit Nederland</p>
        </div>
      </section>

      {/* ── Prijzen ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Prijzen en besparingen</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[var(--color-bg-soft)] rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">Abonnement — Bespaar 10%</div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">€85,78<span className="text-sm font-normal text-[var(--color-text-muted)]">/maand</span></div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">Elke maand automatisch geleverd. Op elk moment opzegbaar.</p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]"><li>✓ €9,53 goedkoper per maand</li><li>✓ Nooit zonder voorraad</li><li>✓ Gratis verzending</li></ul>
              <AffiliateCTA label="Start abonnement →" product="sunrise-2-pack" variant="primary" />
            </div>
            <div className="rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Eenmalige aankoop</div>
              <div className="text-3xl font-bold text-[var(--color-text)] mb-1">€95,31</div>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">Eenmalig bestellen, geen verplichtingen.</p>
              <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]"><li>✓ Vrijblijvend</li><li>✓ 2 maanden voorraad (60 pouches)</li><li>✓ Verzending €4,95</li></ul>
              <AffiliateCTA label="Eenmalig bestellen →" product="sunrise-2-pack" variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group">
                <summary className="p-5 font-bold text-sm text-[var(--color-text)] cursor-pointer hover:text-[var(--color-primary)] transition-colors list-none flex justify-between items-center">
                  {faq.question}<span className="text-[var(--color-primary)] text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Onderaan ── */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-2xl text-center">
          <div className="bg-[var(--color-bg-soft)] rounded-2xl p-8 border border-[var(--color-border)]">
            <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3">Begin je dag met een voedingsboost</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">Sunrise levert 22 superfoods en 9 vitaminen in één pouch. 30 dagen risicovrij proberen.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <AffiliateCTA label="Bestel Sunrise bij Amare →" product="sunrise-2-pack" variant="primary" />
              <AffiliateCTA label="Of bekijk alle producten" product="" variant="secondary" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
              <span>🛡️ 30 dagen garantie</span><span className="text-[var(--color-border)]">|</span>
              <span>🚚 Wetenschappelijk onderbouwd</span><span className="text-[var(--color-border)]">|</span>
              <span>🌿 Natuurlijke ingrediënten</span><span className="text-[var(--color-border)]">|</span>
              <span>⭐ 10.000+ klanten</span>
            </div>
            <p className="mt-6 text-[9px] text-[var(--color-text-muted)]">
              * Affiliate link — je betaalt hetzelfde bedrag.<br />
              * Deze uitspraken zijn niet beoordeeld door de NVWA. Voedingssupplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
