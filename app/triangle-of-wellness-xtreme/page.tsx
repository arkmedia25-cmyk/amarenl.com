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
  title: "Triangle of Wellness Xtreme™ Kopen — Dag & Nacht Supplementen | AmareNL",
  description:
    "Amare's complete dag-nacht systeem: Sunrise (ochtend), Nitro Xtreme (middag) en Sunset (avond). Eén pakket voor energie, focus en herstel. Beste prijs Nederland.",
  alternates: { canonical: "/triangle-of-wellness-xtreme" },
  openGraph: {
    title: "Triangle of Wellness Xtreme™ Kopen — Dag & Nacht Supplementen | AmareNL",
    description: "Complete dag-nacht systeem: Sunrise, Nitro Xtreme en Sunset in één pakket.",
    url: "/triangle-of-wellness-xtreme",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Triangle of Wellness Xtreme™ Kopen — Dag & Nacht Supplementen | AmareNL",
    description: "Complete dag-nacht systeem: Sunrise, Nitro Xtreme en Sunset in één pakket.",
    images: ["/images/og-default.jpg"],
  },
};

const faqs = [
  {
    question: "Wat zit er precies in Triangle of Wellness Xtreme?",
    answer:
      "Het pakket bevat drie producten voor één complete dag: Amare Sunrise™ (22 superfoods + 9 vitaminen, voor de ochtend), Amare Nitro Xtreme™ (nonivruchtenconcentraat dat helpt bij de opname van voedingsstoffen, voor de middag), en Amare Sunset™ (omega 3 + vitamine E voor hart, hersenen en herstel, voor de avond). Samen dekken ze je dagelijkse basis — van energie in de ochtend tot diepe nachtrust.",
  },
  {
    question: "Hoe gebruik ik Triangle of Wellness Xtreme?",
    answer:
      "Sunrise neem je 's ochtends bij het ontbijt. Nitro Xtreme neem je in de middag of vlak voor het avondeten. Sunset neem je 's avonds bij de avondmaaltijd. Dit ritme volgt je natuurlijke circadiaanse klok — energie wanneer je het nodig hebt, herstel wanneer je lichaam zich voorbereidt op slaap.",
  },
  {
    question: "Is dit pakket voordeliger dan los kopen?",
    answer:
      "Ja, je bespaart aanzienlijk ten opzichte van de drie producten los aanschaffen. Het abonnement kost €123,55 per maand — met 10% korting én gratis verzending. Als eenmalige aankoop betaal je €137,27. Bovendien heb je één bestelling en één levering in plaats van drie aparte.",
  },
  {
    question: "Voor wie is Triangle of Wellness Xtreme geschikt?",
    answer:
      "Voor iedereen die een complete dagelijkse basis zoekt zonder zelf te moeten uitzoeken welke supplementen samenwerken. Het is ideaal voor drukke professionals, sporters met behoefte aan energie én herstel, en mensen die merken dat ze 's ochtends moeite hebben met opstarten en 's avonds met afschakelen. De drie producten zijn op elkaar afgestemd — je hoeft niet na te denken over timing of interacties.",
  },
  {
    question: "Hoe snel merk ik effect?",
    answer:
      "Sunrise geeft vaak al binnen de eerste dagen een merkbaar verschil in ochtendenergie. Nitro Xtreme ondersteunt je middagfocus — de meeste gebruikers merken na 1-2 weken minder middagdips. Sunset werkt cumulatief voor slaapkwaliteit en herstel; reken op 3-4 weken voor optimaal effect. Consistent dagelijks gebruik is de sleutel.",
  },
  {
    question: "Kan ik dit product gebruiken in combinatie met medicatie?",
    answer:
      "Raadpleeg altijd eerst je arts voordat je supplementen combineert met voorgeschreven medicatie. Hoewel Amare producten gemaakt zijn met natuurlijke ingrediënten, kunnen interacties met bepaalde medicijnen niet worden uitgesloten.",
  },
];

const productList = [
  {
    name: "Amare Sunrise™",
    time: "Ochtend",
    color: "#F4A261",
    desc: "22 superfoods en 9 essentiële vitaminen. De perfecte start van je dag — ondersteunt natuurlijke energie, immuunsysteem en vitaliteit. Bevat vitamine C uit amla, vitamine D3, ijzer en B-vitamines.",
    icon: "☀️",
  },
  {
    name: "Amare Nitro Xtreme™",
    time: "Middag",
    color: "#E76F51",
    desc: "Nonivruchtenconcentraat dat je lichaam helpt de voedingsstoffen uit Sunrise en Sunset optimaal op te nemen. De brug tussen dag en nacht — ondersteunt focus en energiemetabolisme zonder cafeïne.",
    icon: "⚡",
  },
  {
    name: "Amare Sunset™",
    time: "Avond",
    color: "#6B4C8C",
    desc: "Omega 3-vetzuren (DHA/EPA) en vitamine E voor hart, hersenen en celherstel. De perfecte afsluiting van je dag — ondersteunt diepe, herstellende slaap en bereidt je lichaam voor op morgen.",
    icon: "🌙",
  },
];

const heroImages = [
  {
    src: "https://amarecdn.azureedge.net/webassets/web/prod/products/Triangle-of-Wellness-Xtreme2-EU-800_25.jpg",
    alt: "Triangle of Wellness Xtreme — Sunrise + Nitro + Sunset bundel",
  },
];

export default function TriangleOfWellnessXtremePage() {
  const product = getProduct("triangle-of-wellness-xtreme");
  const productImage =
    product?.images?.primary ||
    heroImages[0].src;

  const productSchema = generateProductSchema({
    name: "Triangle of Wellness Xtreme™",
    nameNL: "Triangle of Wellness Xtreme™",
    description:
      "Amare's complete dag-nacht supplementensysteem: Sunrise voor ochtendenergie, Nitro Xtreme voor opname en focus, Sunset voor herstel en slaap. Drie producten, één pakket — wetenschappelijk onderbouwd en gemaakt met natuurlijke ingrediënten.",
    image: productImage,
    slug: "triangle-of-wellness-xtreme",
    priceRetail: 137.27,
    priceSubscription: 123.55,
    ratingValue: 4.7,
    ratingCount: 350,
    affiliateUrl: "https://www.amare.com/2075008/nl-nl/triangle-of-wellness-xtreme",
  });

  const combinedSchema = combineSchemas(
    productSchema,
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Triangle of Wellness Xtreme", url: "/triangle-of-wellness-xtreme" },
    ])
  );

  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="tow-xtreme-schema" />

      {/* Breadcrumb */}
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">Home</a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">Triangle of Wellness Xtreme™</span>
      </nav>

      {/* HERO */}
      <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
              <Image
                src={productImage}
                alt="Triangle of Wellness Xtreme — Sunrise, Nitro Xtreme en Sunset bundel"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Compleet Systeem
                </span>
                <span className="text-[9px] text-[var(--color-text-muted)]">
                  ⭐ 4.7/5 (350+ reviews)
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
                Triangle of Wellness{" "}
                <span className="text-[var(--color-primary)]">Xtreme™</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">
                Van uitgeput naar energiek — het complete dag-nacht systeem. Sunrise voor je ochtend, Nitro voor je middag, Sunset voor je avond.
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Eén pakket, drie producten — energie, focus en herstel.{" "}
                <strong>30 dagen geld-terug garantie.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <AffiliateCTA
                  label="Bestel bij Amare → €123,55/maand"
                  product="triangle-of-wellness-xtreme"
                  variant="primary"
                />
                <AffiliateCTA
                  label="Of eenmalig €137,27"
                  product="triangle-of-wellness-xtreme"
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

      {/* Video */}
      <section className="py-12 bg-white">
        <div className="container-page max-w-sm mx-auto">
          <video
            className="w-full rounded-2xl shadow-xl"
            autoPlay
            loop
            muted
            playsInline
            controls
            poster="/images/og-default.jpg"
          >
            <source src="/videos/triangle-wellness-xtreme.mp4" type="video/mp4" />
          </video>
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">
            Bekijk de video — 20 seconden
          </p>
        </div>
      </section>

      {/* Wat is het? */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat is Triangle of Wellness Xtreme?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
            <p>
              <strong>Triangle of Wellness Xtreme™</strong> is het meest complete supplementensysteem van Amare — ontworpen om je lichaam te ondersteunen van zonsopgang tot zonsondergang. Het combineert de <strong>drie populairste Amare producten</strong> in één doordacht pakket dat het natuurlijke ritme van je lichaam volgt.
            </p>
            <p>
              Je lichaam werkt niet de hele dag hetzelfde. 's Ochtends heb je energie en vitaminen nodig om op te starten. 's Middags wil je focus zonder dip. 's Avonds draait alles om herstel en diepe slaap. Triangle of Wellness Xtreme erkent dat onderscheid en levert per dagdeel wat je lichaam nodig heeft.
            </p>
            <p>
              Wat dit pakket bijzonder maakt: de drie producten zijn niet zomaar bij elkaar geraapt — ze werken <strong>synergetisch</strong>. Nitro Xtreme helpt je lichaam de voedingsstoffen uit Sunrise en Sunset beter op te nemen. Het is een systeem, geen verzameling.
            </p>
          </div>
        </div>
      </section>

      {/* De drie producten */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8 text-center">
            Drie producten, één ritme — van ochtend tot avond
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {productList.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-xl p-6 border border-[var(--color-border)] hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div
                  className="text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded-full inline-block"
                  style={{ backgroundColor: item.color + "20", color: item.color }}
                >
                  {item.time}
                </div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voor wie? */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Voor wie is Triangle of Wellness Xtreme?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "💼",
                title: "Drukke professionals",
                desc: "Die 's ochtends moeite hebben met opstarten, 's middags een dip ervaren, en 's avonds niet kunnen afschakelen. Eén pakket dekt de hele dag.",
              },
              {
                icon: "🏃",
                title: "Actieve sporters",
                desc: "Die naast energie vóór het sporten ook herstel erna nodig hebben. Sunrise geeft de boost, Sunset het herstel.",
              },
              {
                icon: "🌿",
                title: "Gezondheidsbewuste starters",
                desc: "Die willen beginnen met supplementen maar niet weten waar te starten — dit pakket is de complete basis.",
              },
              {
                icon: "🔄",
                title: "Mensen met onregelmatig ritme",
                desc: "Die moeite hebben met een consistent dag-nachtritme en baat hebben bij supplementen die het circadiaanse ritme ondersteunen.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">{item.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hoe gebruik je het? */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Hoe gebruik je Triangle of Wellness Xtreme?
          </h2>
          <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
            <ol className="space-y-5">
              {[
                {
                  step: 1,
                  title: "Ochtend — Sunrise bij het ontbijt",
                  desc: "Neem Sunrise 's ochtends bij je ontbijt. De 22 superfoods en 9 vitaminen geven je de voedingsstoffen voor een energieke start. De natuurlijke ingrediënten ondersteunen je immuunsysteem en vitaliteit.",
                },
                {
                  step: 2,
                  title: "Middag — Nitro Xtreme voor focus",
                  desc: "Neem Nitro Xtreme in de (na)middag. Het nonivruchtenconcentraat helpt je lichaam de voedingsstoffen uit Sunrise optimaal te benutten en ondersteunt je middagfocus — geen cafeïnecrash.",
                },
                {
                  step: 3,
                  title: "Avond — Sunset bij de avondmaaltijd",
                  desc: "Neem Sunset 's avonds bij je maaltijd. De omega 3-vetzuren en vitamine E ondersteunen je hart, hersenen en nachtelijk celherstel. Sunset helpt je lichaam tot rust te komen en bereidt je voor op diepe slaap.",
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <div>
                    <strong className="text-sm text-[var(--color-text)]">{item.title}</strong>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)] space-y-1">
              <p><strong>⏰ Tijdsinvestering:</strong> Minder dan 2 minuten per dag.</p>
              <p><strong>📦 Inhoud:</strong> 1 maandvoorraad (3 producten).</p>
              <p><strong>🔄 Abonnement:</strong> Bespaar 10% + gratis verzending, elke maand automatisch geleverd.</p>
              <p><strong>🛡️ Garantie:</strong> 30 dagen geld-terug — zelfs als de verpakking leeg is.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wat kun je verwachten? */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat kun je verwachten?
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">
            Iedereen is anders, maar dit is wat gebruikers doorgaans rapporteren:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                week: "Week 1-2",
                title: "Meer ochtendenergie",
                items: ["Makkelijker opstaan", "Minder behoefte aan koffie", "Stabielere energie overdag"],
              },
              {
                week: "Week 3-4",
                title: "Betere focus & slaap",
                items: ["Minder middagdips", "Betere concentratie", "Sneller in slaap vallen"],
              },
              {
                week: "Maand 2-3",
                title: "Consistente vitaliteit",
                items: ["Stabiel dag-nachtritme", "Betere sportprestaties", "Algeheel welzijn verbeterd"],
              },
            ].map((phase, i) => (
              <div key={i} className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]">
                <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">
                  {phase.week}
                </div>
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
        </div>
      </section>

      {/* MID CTA */}
      <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">
            Eén pakket, je hele dag geregeld
          </h2>
          <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">
            Probeer Triangle of Wellness Xtreme 30 dagen risicovrij. Niet tevreden? Geld terug — zelfs als de verpakking leeg is.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <AffiliateCTA
              label="Bestel nu — Abonnement €123,55/maand"
              product="triangle-of-wellness-xtreme"
              variant="urgency"
            />
          </div>
          <p className="mt-4 text-[10px] text-white/60">
            🛡️ 30 dagen geld-terug-garantie &middot; 🚚 Gratis verzending vanaf €175 &middot; 📦 Direct van Amare
          </p>
        </div>
      </section>

      {/* Prijzen */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Prijzen — voordeliger dan los kopen
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[var(--color-bg-soft)] rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">
                Aanbevolen
              </div>
              <h3 className="font-bold text-lg text-[var(--color-text)] mb-1">Abonnement</h3>
              <p className="text-3xl font-bold text-[var(--color-primary)]">€123,55<span className="text-base font-normal text-[var(--color-text-muted)]">/maand</span></p>
              <ul className="mt-3 space-y-1 text-xs text-[var(--color-text-muted)]">
                <li>✓ 10% korting op elke levering</li>
                <li>✓ Gratis verzending</li>
                <li>✓ Automatisch geleverd — nooit zonder</li>
                <li>✓ Op elk moment opzegbaar</li>
                <li>✓ Verdien beloningspunten</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Flexibel
              </div>
              <h3 className="font-bold text-lg text-[var(--color-text)] mb-1">Eenmalig</h3>
              <p className="text-3xl font-bold text-[var(--color-text)]">€137,27</p>
              <ul className="mt-3 space-y-1 text-xs text-[var(--color-text-muted)]">
                <li>✓ Eenmalige aankoop</li>
                <li>✓ Geen verplichtingen</li>
                <li>✓ Zelfde premium kwaliteit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group">
                <summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-12 bg-white">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-xl md:text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3">
            Klaar voor een compleet dag-nacht systeem?
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-lg mx-auto">
            Triangle of Wellness Xtreme — Sunrise, Nitro en Sunset in één pakket. Energie overdag, herstel 's nachts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <AffiliateCTA
              label="Bestel Triangle of Wellness Xtreme →"
              product="triangle-of-wellness-xtreme"
              variant="primary"
            />
          </div>
          <p className="mt-4 text-[9px] text-[var(--color-text-muted)]">
            * Deze uitspraken zijn niet beoordeeld door de NVWA. Supplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.
          </p>
        </div>
      </section>
    </>
  );
}
