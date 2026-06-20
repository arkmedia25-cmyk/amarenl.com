import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { getProduct, getAllProducts } from "@/lib/products";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/schema";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product niet gevonden | AmareNL" };
  return {
    title: `${p.nameNL} Kopen — ${p.taglineNL} | AmareNL`,
    description: p.descriptionNL?.slice(0, 155) || p.taglineNL,
    alternates: { canonical: `/producten/${slug}` },
    openGraph: { title: `${p.nameNL} Kopen | AmareNL`, description: p.taglineNL, url: `/producten/${slug}`, type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: p.image || "/images/og-default.jpg", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: `${p.nameNL} Kopen | AmareNL`, description: p.taglineNL, images: [p.image || "/images/og-default.jpg"] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const catSlug = product.category;
  const catNames: Record<string, string> = { hersenen: "Mentale Fitness", darmen: "Darmen & Digestie", schoonheid: "Schoonheid & Verzorging", essentials: "Dagelijkse Essentials", pakketten: "Pakketten & Bundels" };

  const schema = combineSchemas(
    generateProductSchema({ name: product.name, nameNL: product.nameNL, description: product.descriptionNL?.slice(0, 300) || product.taglineNL, image: product.image, slug, priceRetail: product.priceRetail, priceSubscription: product.priceSubscription, ratingValue: 4.5, ratingCount: 200, affiliateUrl: product.affiliateUrl }),
    generateFAQSchema((product.faqNL || []).map((f: {q: string, a: string}) => ({ question: f.q, answer: f.a }))),
    generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: catNames[catSlug] || "Producten", url: `/${catSlug}` }, { name: product.nameNL, url: `/producten/${slug}` }])
  );

  const hasIngredients = product.ingredientsNL && product.ingredientsNL.length > 0;
  const hasFaqs = product.faqNL && product.faqNL.length > 0;
  const benefits = product.benefitsNL?.length ? product.benefitsNL : [product.taglineNL];

  return (<>
    <SchemaMarkup schema={schema} id={`product-${slug}-schema`} />

    <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]">
      <a href="/" className="hover:text-[var(--color-primary)]">Home</a>
      <span className="mx-2">/</span>
      <a href={`/${catSlug}`} className="hover:text-[var(--color-primary)]">{catNames[catSlug] || "Producten"}</a>
      <span className="mx-2">/</span>
      <span className="text-[var(--color-primary)] font-semibold">{product.nameNL}</span>
    </nav>

    {/* HERO */}
    <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
      <div className="container-page py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]">
            <Image src={product.image || "/images/og-default.jpg"} alt={product.images?.alt || product.nameNL} fill className="object-contain p-6" priority />
          </div>
          <div>
            <div className="inline-flex flex-wrap items-center gap-2 mb-4">
              {product.isBestseller && <span className="bg-[var(--color-accent)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Bestseller</span>}
              {product.isNew && <span className="bg-green-600 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Nieuw</span>}
              {product.isPack && <span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Pakket</span>}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
              {product.nameNL}
            </h1>
            <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">{product.taglineNL}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-200">🎁 €8 welkomstkorting</span>
              <span className="inline-flex items-center gap-1 bg-[var(--color-bg-soft)] text-[var(--color-primary)] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[var(--color-border)]">🛡️ 30 dagen geld terug</span>
              <span className="inline-flex items-center gap-1 bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] text-[10px] px-3 py-1.5 rounded-full border border-[var(--color-border)]">🚚 Gratis verzending vanaf €175</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mb-2"><strong>Voedingssupplement — direct van Amare. Geen geneesmiddel.</strong></p>
            <p className="text-xs text-[var(--color-text-muted)] mb-6 italic">* De NVWA heeft de gezondheidsclaims van de gebruikte ingrediënten beoordeeld. Dit product is een voedingssupplement en geen vervanging voor een gevarieerd dieet.</p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {product.priceSubscription > 0 && (
                <AffiliateCTA label={`Bestel bij Amare → €${product.priceSubscription.toFixed(2)}/maand`} product={slug} variant="primary" />
              )}
              {product.priceRetail > 0 && (
                <AffiliateCTA label={`Of eenmalig €${product.priceRetail.toFixed(2)}`} product={slug} variant="secondary" />
              )}
            </div>
            <p className="text-[9px] text-[var(--color-text-muted)]">* Affiliate link — je betaalt hetzelfde bedrag. Abonnement op elk moment opzegbaar. Geen geneesmiddel — een voedingssupplement.</p>
          </div>
        </div>
      </div>
    </section>

    {/* BESCHRIJVING */}
    {product.descriptionNL && (
      <section className="py-16 bg-white"><div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat is {product.nameNL}?</h2>
        <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4" dangerouslySetInnerHTML={{ __html: product.descriptionNL.replace(/\n/g, '<br/>') }} />
        {product.mechanismNL && <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]"><strong>Hoe het werkt:</strong> {product.mechanismNL}</div>}
      </div></section>
    )}

    {/* VOORDELEN */}
    {benefits.length > 0 && (
      <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Voordelen</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {benefits.map((b, i) => (<div key={i} className="bg-white rounded-xl p-4 border border-[var(--color-border)] flex gap-3 items-start"><span className="text-[var(--color-primary)] font-bold text-lg">✓</span><span className="text-sm text-[var(--color-text)]">{b}</span></div>))}
        </div>
      </div></section>
    )}

    {/* INGREDIËNTEN */}
    {hasIngredients && (
      <section className="py-16 bg-white"><div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Ingrediënten</h2>
        <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2 border-[var(--color-primary)] text-left"><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Ingrediënt</th><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Hoeveelheid</th></tr></thead><tbody>{product.ingredientsNL!.map((ing: {name: string, amount: string, form?: string}, i: number) => (<tr key={i} className="border-b border-[var(--color-border)]"><td className="py-3 px-4 font-bold text-[var(--color-text)] text-xs">{ing.name}{ing.form ? ` (${ing.form})` : ""}</td><td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">{ing.amount}</td></tr>))}</tbody></table></div>
      </div></section>
    )}

    {/* GEBRUIK */}
    {product.usageNL && (
      <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Gebruik</h2>
        <div className="bg-white rounded-xl p-6 border border-[var(--color-border)] space-y-3 text-sm text-[var(--color-text)]">
          <p><strong>Dosering:</strong> {product.usageNL}</p>
          {product.usage?.timing && <p><strong>Timing:</strong> {product.usage.timing}</p>}
          {product.usage?.duration && <p><strong>Duur:</strong> {product.usage.duration}</p>}
          {product.targetAudienceNL && <p><strong>Voor wie:</strong> {product.targetAudienceNL}</p>}
        </div>
      </div></section>
    )}

    {/* MID CTA */}
    <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]"><div className="container-page max-w-3xl text-center">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">Klaar om {product.nameNL} te proberen?</h2>
      <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">30 dagen risicovrij proberen. Eerste bestelling? Claim je <strong>€8 welkomstkorting</strong>. Niet tevreden? Geld terug — zelfs als de verpakking leeg is.</p>
      {product.affiliateUrl && <AffiliateCTA label={`Bestel nu — Abonnement €${product.priceSubscription.toFixed(2)}/maand`} product={slug} variant="urgency" />}
      <p className="mt-4 text-[10px] text-white/60">🛡️ 30 dagen geld-terug-garantie &middot; 🚚 Gratis verzending vanaf €175 &middot; 📦 Direct van Amare</p>
    </div></section>

    {/* PRIJZEN */}
    {(product.priceRetail > 0 || product.priceSubscription > 0) && (
      <section className="py-16 bg-white"><div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Prijzen</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {product.priceSubscription > 0 && (
            <div className="bg-[var(--color-bg-soft)] rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">Aanbevolen</div>
              <h3 className="font-bold text-lg text-[var(--color-text)] mb-1">Abonnement</h3>
              <p className="text-3xl font-bold text-[var(--color-primary)]">€{product.priceSubscription.toFixed(2)}<span className="text-base text-[var(--color-text-muted)]">/maand</span></p>
              <ul className="mt-3 space-y-1 text-xs text-[var(--color-text-muted)]"><li>✓ 10% korting</li><li>✓ Gratis verzending</li><li>✓ Op elk moment opzegbaar</li></ul>
            </div>
          )}
          {product.priceRetail > 0 && (
            <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Flexibel</div>
              <h3 className="font-bold text-lg text-[var(--color-text)] mb-1">Eenmalig</h3>
              <p className="text-3xl font-bold text-[var(--color-text)]">€{product.priceRetail.toFixed(2)}</p>
              <ul className="mt-3 space-y-1 text-xs text-[var(--color-text-muted)]"><li>✓ Eenmalige aankoop</li><li>✓ Geen verplichtingen</li></ul>
            </div>
          )}
        </div>
      </div></section>
    )}

    {/* FAQ */}
    {hasFaqs && (
      <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
        <div className="space-y-4">{product.faqNL!.map((faq: {q: string, a: string}, i: number) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.q}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.a}</div></details>))}</div>
      </div></section>
    )}

    {/* BOTTOM CTA */}
    <section className="py-12 bg-white"><div className="container-page max-w-3xl text-center">
      <h2 className="text-xl md:text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3">{product.nameNL} — {product.taglineNL}</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
        {product.affiliateUrl && <AffiliateCTA label={`Bestel bij Amare →`} product={slug} variant="primary" />}
      </div>
      <p className="mt-4 text-[9px] text-[var(--color-text-muted)]">* Voedingssupplement. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA. Supplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl. Raadpleeg een arts bij gezondheidsklachten.</p>
    </div></section>
  </>);
}
