import type { Metadata } from "next";
import Image from "next/image";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { getProduct } from "@/lib/products";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Amare Nitro Xtreme Kopen — Noni + B-Vitamines Middagboost | AmareNL",
  description: "Nitro Xtreme: nonivruchtenconcentraat met B1, B3, zink, chroom en CoQ10. De middagboost binnen de Triangle of Wellness. Direct van Amare.",
  alternates: { canonical: "/nitro-xtreme" },
  openGraph: { title: "Amare Nitro Xtreme Kopen — Noni Middagboost | AmareNL", description: "Noni + B-vitamines + zink + chroom + CoQ10 voor je middagboost.", url: "/nitro-xtreme", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Amare Nitro Xtreme Kopen — Noni Middagboost | AmareNL", description: "Noni + B-vitamines + zink + chroom + CoQ10.", images: ["/images/og-default.jpg"] },
};

const faqs = [
  { question: "Wat is de Triangle of Wellness?", answer: "De Triangle of Wellness is Amare's complete 3-stappen systeem: Sunrise (ochtend — 22 superfoods + 9 vitaminen), Nitro Xtreme (middag — noni + B-vitamines + mineralen) en Sunset (avond — omega-3 + vitamine D3/A/E). Samen bieden ze 24-uurs voedingsondersteuning die je natuurlijke dagritme volgt." },
  { question: "Waarom noni als hoofdingrediënt?", answer: "De nonivrucht (Morinda citrifolia) groeit in de tropische Stille Oceaan en wordt al generaties gewaardeerd om zijn natuurlijke fytonutriënten. Amare gebruikt een geconcentreerd noni-extract — 240 mg per dagdosering in Nitro Xtreme." },
  { question: "Kan ik Nitro ook 's avonds innemen?", answer: "Nitro is ontworpen voor overdag. De B-vitamines ondersteunen het energiemetabolisme — dat wil je niet vlak voor het slapengaan. Voor de avond is Sunset specifiek ontwikkeld met omega-3 en vitamine E voor herstel en nachtrust." },
  { question: "Hoe neem ik Nitro Xtreme in?", answer: "Met het pipetje: 3x per dag 1 ml (20 druppels), totaal 3 ml per dag. Direct onder de tong voor snelle opname, of mengen met water. Eén flesje (56 ml) gaat een maand mee." },
];

const ingredients = [
  { g: "Noni-vruchtenconcentraat", a: "240 mg (per 3 ml)", p: "Traditioneel Polynesisch superfruit, fytonutriënten" },
  { g: "Thiamine (Vitamine B1)", a: "1,5 mg (136% RI)", p: "Energiestofwisseling, hartfunctie" },
  { g: "Niacine (Vitamine B3)", a: "3,6 mg NE (23% RI)", p: "Huid, zenuwstelsel, vermoeidheid verminderen" },
  { g: "Zink(sulfaat)", a: "3,45 mg (35% RI)", p: "Immuunsysteem, huid, haar, nagels, testosteron" },
  { g: "Chroom", a: "14,5 µg (36% RI)", p: "Behoud normale bloedsuikerspiegel" },
  { g: "CoQ10 (Ubiquinon)", a: "750 µg", p: "Mitochondriale energieproductie" },
];

export default function NitroXtremePage() {
  const product = getProduct("nitro-xtreme-56ml");
  const img = product?.images?.primary || "https://amarecdn.azureedge.net/webassets/web/prod/products/Nitro-Xtreme-56ml-EU-800.jpg";

  const schema = combineSchemas(
    generateProductSchema({ name: "Amare Nitro Xtreme 56ml", nameNL: "Amare Nitro Xtreme 56ml", description: "Nitro Xtreme is Amare's vloeibare noni-concentraat verrijkt met B-vitamines (B1, B3), zink, chroom en CoQ10. De middagboost binnen de Triangle of Wellness: Sunrise → Nitro → Sunset.", image: img, slug: "nitro-xtreme", priceRetail: 59.71, priceSubscription: 53.74, ratingValue: 4.5, ratingCount: 250, affiliateUrl: "https://www.amare.com/2075008/nl-nl/nitro-xtreme" }),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Nitro Xtreme", url: "/nitro-xtreme" }])
  );

  return (<>
    <SchemaMarkup schema={schema} id="nitro-schema" />
    <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]"><a href="/" className="hover:text-[var(--color-primary)]">Home</a><span className="mx-2">/</span><span className="text-[var(--color-primary)] font-semibold">Nitro Xtreme</span></nav>

    <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
      <div className="container-page py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]"><Image src={img} alt="Amare Nitro Xtreme — noni vruchtenconcentraat" fill className="object-contain p-6" priority /></div>
          <div>
            <div className="inline-flex items-center gap-2 mb-4"><span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Triangle of Wellness</span><span className="text-[9px] text-[var(--color-text-muted)]">⭐ 4.5/5 (250+ reviews)</span></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">Amare <span className="text-[var(--color-primary)]">Nitro Xtreme</span></h1>
            <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">De middagboost van de Triangle of Wellness — noni, B-vitamines, zink en CoQ10.</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">Vloeibaar concentraat, 1 maand per flesje. <strong>Direct van Amare.</strong></p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-200">🛡️ 30 dagen geld terug</span>
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-200">🎁 €8 welkomstkorting</span>
              <span className="inline-flex items-center gap-1 bg-[var(--color-bg-soft)] text-[var(--color-primary)] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[var(--color-border)]">🚚 Gratis verzending &ge;€175</span>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] mb-5 italic">Voedingssupplement. Geen geneesmiddel. De NVWA heeft de gezondheidsclaims van de gebruikte ingrediënten beoordeeld.</p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <AffiliateCTA label="Probeer nu → €53,74/maand" product="nitro-xtreme-56ml" variant="primary" />
              <AffiliateCTA label="Of eenmalig €59,71" product="nitro-xtreme-56ml" variant="secondary" />
            </div>
            <p className="text-[9px] text-[var(--color-text-muted)]">* Ook onderdeel van Triangle of Wellness Xtreme bundel. Abonnement opzegbaar.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">De brug tussen ochtend en avond</h2>
      <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
        <p><strong>Nitro Xtreme</strong> is het middelste stuk van Amare's Triangle of Wellness. Waar Sunrise je ochtend start en Sunset je avond afsluit, zorgt Nitro voor de overdag-ondersteuning — het helpt je lichaam de voedingsstoffen uit Sunrise optimaal te benutten en bereidt je voor op het herstel van Sunset.</p>
        <p>Het hoofdingrediënt is nonivruchtenconcentraat (Morinda citrifolia, 240 mg), een tropisch superfruit uit de Stille Oceaan. Daaraan toegevoegd: thiamine (Vit B1, 136% RI) voor je energiestofwisseling, niacine (Vit B3) voor huid en zenuwen, zink (35% RI) voor je immuunsysteem, chroom (36% RI) voor je bloedsuikerspiegel, en CoQ10 voor je mitochondriale energieproductie.</p>
        <p>Geen cafeïne, geen stimulanten — gewoon gerichte nutritionele ondersteuning voor het actieve deel van je dag.</p>
      </div>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Ingrediënten per dagdosering (3 ml)</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2 border-[var(--color-primary)] text-left"><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Ingrediënt</th><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Hoeveelheid</th><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Wat het doet</th></tr></thead><tbody>{ingredients.map((r, i) => (<tr key={i} className="border-b border-[var(--color-border)]"><td className="py-3 px-4 font-bold text-[var(--color-text)] align-top text-xs">{r.g}</td><td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">{r.a}</td><td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">{r.p}</td></tr>))}</tbody></table></div>
    </div></section>

    <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]"><div className="container-page max-w-3xl text-center">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">Geen middagdip meer</h2>
      <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">Probeer Nitro Xtreme 30 dagen risicovrij. Of bestel de complete Triangle of Wellness.</p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <AffiliateCTA label="Nitro Xtreme → €53,74/maand" product="nitro-xtreme-56ml" variant="urgency" />
      </div>
      <p className="mt-4 text-[10px] text-white/60">🛡️ 30 dagen geld-terug &middot; 📦 Direct van Amare</p>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
      <div className="space-y-4">{faqs.map((faq, i) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div></details>))}</div>
    </div></section>

    <section className="py-12 bg-white"><div className="container-page max-w-3xl text-center">
      <h2 className="text-xl md:text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3">Compleet dag-nacht systeem</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-lg mx-auto">Nitro Xtreme — de essentiële schakel in je Triangle of Wellness.</p>
      <AffiliateCTA label="Bestel Nitro Xtreme →" product="nitro-xtreme-56ml" variant="primary" />
      <p className="mt-4 text-[9px] text-[var(--color-text-muted)]">* Deze uitspraken zijn niet beoordeeld door de NVWA. Supplementen zijn geen vervanging voor een gevarieerd voedingspatroon.</p>
    </div></section>
  </>);
}
