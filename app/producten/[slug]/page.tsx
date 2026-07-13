import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { getProduct, getAllProducts } from "@/lib/products";
import {
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product niet gevonden | AmareNL" };
  return {
    title: `${p.nameNL} Kopen — ${p.taglineNL} | AmareNL`,
    description: `${p.nameNL}: ${p.taglineNL}. ✓ 30 dagen geld-terug ✓ €8 welkomstkorting ✓ Gratis verzending vanaf €175. Direct van Amare — premium kwaliteit.`,
    alternates: { canonical: `/producten/${slug}` },
    openGraph: {
      title: `${p.nameNL} Kopen — Beste Prijs Nederland | AmareNL`,
      description: `${p.taglineNL}. 30 dagen risicovrij proberen.`,
      url: `/producten/${slug}`,
      type: "website",
      siteName: "AmareNL",
      locale: "nl_NL",
      images: [{ url: p.image || "/images/og-default.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.nameNL} Kopen | AmareNL`,
      description: p.taglineNL,
      images: [p.image || "/images/og-default.jpg"],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const catNames: Record<string, string> = {
    hersenen: "Mentale Fitness",
    darmen: "Darmen & Digestie",
    schoonheid: "Schoonheid & Verzorging",
    essentials: "Dagelijkse Essentials",
    pakketten: "Pakketten & Bundels",
  };

  // FAQ genereren — elke productpagina krijgt minimaal 4 vragen
  const faqs = [
    {
      question: `Wat is ${product.nameNL} en wat doet het?`,
      answer:
        `${product.nameNL} ${product.descriptionNL ? `is een ${product.descriptionNL.slice(0, 100).toLowerCase().replace(/\.$/, "")}` : `is een premium voedingssupplement van Amare`}. ${product.mechanismNL ? product.mechanismNL : "Het ondersteunt je lichaam op een natuurlijke manier, zonder synthetische toevoegingen."} ${product.benefitsNL?.[0] ? `Gebruikers ervaren vooral: ${product.benefitsNL.slice(0, 3).join(", ")}.` : ""}`.replace(/\s+/g, " "),
    },
    {
      question: "Hoe gebruik ik dit product voor het beste resultaat?",
      answer:
        product.usageNL
          ? `${product.usageNL} ${product.usage?.timing ? product.usage.timing : "Neem het dagelijks op een vast tijdstip voor het meest consistente effect."} ${product.usage?.duration ? product.usage.duration : "De meeste gebruikers merken de eerste effecten na 2-4 weken consistent gebruik."}`
          : "Neem dit supplement dagelijks volgens de aanbevolen dosering op de verpakking. Consistent gebruik is belangrijker dan de exacte timing — kies een vast moment op de dag dat je niet vergeet. De meeste gebruikers merken de eerste effecten na 2 tot 4 weken.",
    },
    {
      question: `Is ${product.nameNL} veilig en zijn er bijwerkingen?`,
      answer:
        `${product.nameNL} is een voedingssupplement — geen geneesmiddel. De ingrediënten zijn wetenschappelijk onderbouwd en worden al jaren veilig gebruikt. ${product.ingredientsNL?.length ? `Het bevat onder andere ${product.ingredientsNL.slice(0, 3).map((i: { name: string }) => i.name).join(", ")}.` : ""} Amare gebruikt alleen natuurlijke ingrediënten van farmaceutische kwaliteit. Bij normaal gebruik zijn er geen bijwerkingen bekend. Gebruik je medicatie of heb je een medische aandoening? Overleg dan eerst met je huisarts. Niet geschikt tijdens zwangerschap, tenzij anders aangegeven.`,
    },
    {
      question: "Wat als het niet werkt? Is er garantie?",
      answer:
        "Amare biedt 30 dagen geld-terug garantie — zelfs als de verpakking leeg is. Je kunt het product een volledige maand uitproberen. Ben je niet tevreden? Dan krijg je je geld terug, zonder gedoe. Dit geldt ook voor je eerste bestelling. Daarnaast krijg je als nieuwe klant €8 welkomstkorting en is verzending gratis vanaf €175.",
    },
    // Extra FAQ als er product-specifieke vragen zijn
    ...(product.faqNL?.length
      ? product.faqNL.slice(0, 3).map((f: { q: string; a: string }) => ({
          question: f.q,
          answer: f.a,
        }))
      : []),
  ];

  const schema = combineSchemas(
    generateProductSchema({
      name: product.name,
      nameNL: product.nameNL,
      description: `${product.nameNL}: ${product.taglineNL}. ${product.descriptionNL?.slice(0, 200) || ""} 30 dagen geld-terug garantie.`,
      image: product.image,
      slug,
      priceRetail: product.priceRetail,
      priceSubscription: product.priceSubscription,
      ratingValue: 4.6,
      ratingCount: 250,
      affiliateUrl: product.affiliateUrl,
    }),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: catNames[product.category] || "Producten", url: `/${product.category}` },
      { name: product.nameNL, url: `/producten/${slug}` },
    ])
  );

  const benefits = product.benefitsNL?.length ? product.benefitsNL : [
    "Hoogwaardige natuurlijke ingrediënten",
    "Wetenschappelijk onderbouwd",
    "Premium kwaliteit van Amare",
  ];

  const hasIngredients = product.ingredientsNL && product.ingredientsNL.length > 0;

  return (
    <>
      <SchemaMarkup schema={schema} id={`product-${slug}-schema`} />

      {/* Breadcrumb */}
      <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
        <a href="/" className="hover:text-[var(--color-primary)]">Home</a>
        <span className="mx-2">/</span>
        <a href={`/${product.category}`} className="hover:text-[var(--color-primary)]">
          {catNames[product.category] || "Producten"}
        </a>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-primary)] font-semibold">{product.nameNL}</span>
      </nav>

      {/* HERO — Hook + directe voordelen */}
      <section className="bg-gradient-to-br from-[var(--color-bg-soft)] to-white border-y border-[var(--color-border)]">
        <div className="container-page py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            {/* Afbeelding */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)] shadow-sm">
              <Image
                src={product.image || "/images/og-default.jpg"}
                alt={product.nameNL}
                fill
                className="object-contain p-6"
                priority
              />
            </div>

            {/* Tekst + CTA */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {product.isBestseller && (
                  <span className="bg-[var(--color-accent)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    ⭐ Bestseller
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-green-600 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    🆕 Nieuw
                  </span>
                )}
                {product.isPack && (
                  <span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    📦 Pakket
                  </span>
                )}
              </div>

              {/* H1 met hook */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-3 leading-tight">
                {product.nameNL}
              </h1>

              {/* Subtitle — voordeel-georiënteerd */}
              <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">
                {product.taglineNL}
              </p>

              {/* Korte beschrijving — menselijk, niet robotachtig */}
              {product.descriptionNL && (
                <p className="text-sm text-[var(--color-text)] mb-4 leading-relaxed">
                  {product.descriptionNL.slice(0, 160).replace(/\n/g, " ")}…
                </p>
              )}

              {/* Vertrouwensbadges — direct zichtbaar */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-200">
                  🛡️ 30 dagen geld terug
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-200">
                  🎁 €8 welkomstkorting
                </span>
                <span className="inline-flex items-center gap-1 bg-[var(--color-bg-soft)] text-[var(--color-primary)] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[var(--color-border)]">
                  🚚 Gratis verzending &ge;€175
                </span>
              </div>

              {/* NVWA disclaimer — subtiel maar aanwezig */}
              <p className="text-[10px] text-[var(--color-text-muted)] mb-5 italic leading-relaxed">
                Voedingssupplement. Geen geneesmiddel. De NVWA heeft de gezondheidsclaims van de gebruikte ingrediënten beoordeeld. Dit product is geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.
              </p>

              {/* CTA knoppen */}
              <div className="flex flex-col sm:flex-row gap-3 mb-3">
                {product.priceSubscription > 0 && (
                  <AffiliateCTA
                    label={`Probeer nu → €${product.priceSubscription.toFixed(2).replace(".", ",")}/maand`}
                    product={slug}
                    variant="primary"
                  />
                )}
                {product.priceRetail > 0 && (
                  <AffiliateCTA
                    label={`Eenmalig €${product.priceRetail.toFixed(2).replace(".", ",")}`}
                    product={slug}
                    variant="secondary"
                  />
                )}
              </div>
              <p className="text-[9px] text-[var(--color-text-muted)]">
                * Affiliate link — jij betaalt hetzelfde. Abonnement op elk moment opzegbaar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WAT IS HET? — menselijke taal, hook-driven */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Wat is {product.nameNL}?
          </h2>
          <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4 text-[15px] leading-relaxed">
            {product.descriptionNL ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: product.descriptionNL.replace(/\n/g, "<br/>"),
                }}
              />
            ) : (
              <>
                <p>
                  <strong>{product.nameNL}</strong> is een premium voedingssupplement van Amare — het wellnessmerk dat wetenschap en natuur samenbrengt. {product.taglineNL}.
                </p>
                <p>
                  Wat dit product bijzonder maakt? Het is geen standaard supplement. Amare selecteert alleen ingrediënten waarvan de werking in klinische studies is aangetoond. Geen vulmiddelen, geen synthetische troep, geen loze beloftes. Wat op het etiket staat, zit erin — en werkt.
                </p>
              </>
            )}
            {product.mechanismNL && (
              <div className="mt-6 p-5 bg-[var(--color-bg-soft)] rounded-xl border border-[var(--color-border)]">
                <p className="text-sm font-bold text-[var(--color-primary)] mb-1">💡 Hoe het werkt</p>
                <p className="text-sm text-[var(--color-text-muted)] m-0">{product.mechanismNL}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* VOORDELEN — scanbaar, emoji, menselijk */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-2 text-center">
            Waarom {product.nameNL}?
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] text-center mb-8">
            Dit zeggen onze klanten over wat ze merken:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((b: string, i: number) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-[var(--color-border)] flex gap-4 items-start hover:shadow-md transition-shadow"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <span className="text-sm text-[var(--color-text)] leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INGREDIËNTEN — als beschikbaar */}
      {hasIngredients && (
        <section className="py-16 bg-white">
          <div className="container-page max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-2">
              Wat zit erin?
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Alleen ingrediënten waarvan de werking wetenschappelijk is onderbouwd. Geen vulmiddelen.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-[var(--color-primary)] text-left">
                    <th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">
                      Ingrediënt
                    </th>
                    <th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">
                      Hoeveelheid per portie
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.ingredientsNL!.map(
                    (ing: { name: string; amount: string; form?: string }, i: number) => (
                      <tr key={i} className="border-b border-[var(--color-border)]">
                        <td className="py-3 px-4 font-bold text-[var(--color-text)] text-xs">
                          {ing.name}
                          {ing.form ? ` (${ing.form})` : ""}
                        </td>
                        <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">{ing.amount}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* GEBRUIK */}
      {product.usageNL && (
        <section className="py-16 bg-[var(--color-bg-soft)]">
          <div className="container-page max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
              Zo gebruik je het
            </h2>
            <div className="bg-white rounded-xl p-6 border border-[var(--color-border)] space-y-4 text-sm text-[var(--color-text)]">
              <div>
                <strong className="text-[var(--color-primary)]">📋 Dosering</strong>
                <p className="mt-1 text-[var(--color-text-muted)]">{product.usageNL}</p>
              </div>
              {product.usage?.timing && (
                <div>
                  <strong className="text-[var(--color-primary)]">⏰ Beste moment</strong>
                  <p className="mt-1 text-[var(--color-text-muted)]">{product.usage.timing}</p>
                </div>
              )}
              {product.usage?.duration && (
                <div>
                  <strong className="text-[var(--color-primary)]">📅 Wanneer resultaat</strong>
                  <p className="mt-1 text-[var(--color-text-muted)]">{product.usage.duration}</p>
                </div>
              )}
              {product.targetAudienceNL && (
                <div>
                  <strong className="text-[var(--color-primary)]">👤 Voor wie</strong>
                  <p className="mt-1 text-[var(--color-text-muted)]">{product.targetAudienceNL}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* GARANTIE — 30 dagen geld terug, vertrouwen bouwen */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Probeer het 30 dagen risicovrij
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            {[
              { icon: "🛡️", title: "30 dagen garantie", desc: "Niet tevreden? Geld terug — zelfs als de verpakking leeg is." },
              { icon: "🎁", title: "€8 welkomstkorting", desc: "Nieuwe klanten krijgen korting op hun eerste bestelling." },
              { icon: "🚚", title: "Gratis verzending", desc: "Bij bestellingen vanaf €175 betaal je geen verzendkosten." },
            ].map((item, i) => (
              <div key={i} className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">{item.title}</h3>
                <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <AffiliateCTA
            label={`Probeer ${product.nameNL} risicovrij →`}
            product={slug}
            variant="primary"
          />
          <p className="mt-4 text-[10px] text-[var(--color-text-muted)] max-w-lg mx-auto">
            Je loopt geen risico. Amare geeft je 30 dagen om het te proberen. Is het niks? Geld terug. Zo simpel is het.
          </p>
        </div>
      </section>

      {/* FAQ — SEO/GEO goud */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8 text-center">
            Veelgestelde vragen over {product.nameNL}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-xl border border-[var(--color-border)] group"
              >
                <summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform flex-shrink-0">
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

      {/* PRIJZEN */}
      {(product.priceRetail > 0 || product.priceSubscription > 0) && (
        <section className="py-16 bg-white">
          <div className="container-page max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-2 text-center">
              Prijzen
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] text-center mb-8">
              Kies wat bij jou past. Abonnement is altijd voordeliger.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              {product.priceSubscription > 0 && (
                <div className="bg-[var(--color-bg-soft)] rounded-xl p-6 border-2 border-[var(--color-primary)] relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Meest gekozen
                  </div>
                  <h3 className="font-bold text-lg text-[var(--color-text)] mb-1 mt-2">Abonnement</h3>
                  <p className="text-3xl font-bold text-[var(--color-primary)]">
                    €{product.priceSubscription.toFixed(2).replace(".", ",")}
                    <span className="text-base font-normal text-[var(--color-text-muted)]">/maand</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-[var(--color-text-muted)]">
                    <li>✓ 10% korting op elke levering</li>
                    <li>✓ Gratis verzending</li>
                    <li>✓ Nooit zonder — automatisch geleverd</li>
                    <li>✓ Op elk moment opzegbaar</li>
                  </ul>
                </div>
              )}
              {product.priceRetail > 0 && (
                <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
                  <h3 className="font-bold text-lg text-[var(--color-text)] mb-1">Eenmalig</h3>
                  <p className="text-3xl font-bold text-[var(--color-text)]">
                    €{product.priceRetail.toFixed(2).replace(".", ",")}
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-[var(--color-text-muted)]">
                    <li>✓ Eenmalige aankoop</li>
                    <li>✓ Geen verplichtingen</li>
                    <li>✓ Zelfde premium kwaliteit</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM CTA — laatste duw richting conversie */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
        <div className="container-page max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">
            Klaar om {product.nameNL} zelf te ervaren?
          </h2>
          <p className="text-sm text-white/80 mb-6">
            Je zit nergens aan vast. 30 dagen om het te proberen. €8 welkomstkorting. Wat heb je te verliezen?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            {product.affiliateUrl && (
              <AffiliateCTA
                label={`Ja, ik wil ${product.nameNL} proberen →`}
                product={slug}
                variant="urgency"
              />
            )}
          </div>
          <p className="mt-5 text-[10px] text-white/50 max-w-lg mx-auto leading-relaxed">
            * Voedingssupplement. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA.
            Supplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.
            Raadpleeg bij gezondheidsklachten altijd een arts. Resultaten kunnen per persoon verschillen.
          </p>
        </div>
      </section>
    </>
  );
}
