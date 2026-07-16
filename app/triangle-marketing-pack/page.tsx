import type { Metadata } from "next";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/schema";
import { ShoppingCart, CheckCircle2, Share2, Gift, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Triangle Marketing Pack — 3x Triangle of Wellness | Word Brand Partner | AmareNL",
  description: "Start als Amare Brand Partner met 3 complete Triangle of Wellness Xtreme sets. Ervaar zelf, deel met klanten, verdien commissie. €399/maand.",
  alternates: { canonical: "/triangle-marketing-pack" },
  openGraph: { title: "Triangle Marketing Pack — 3x Set | AmareNL", description: "3x Triangle of Wellness Xtreme — jouw Brand Partner startkit. Ervaar, deel & verdien.", url: "/triangle-marketing-pack", siteName: "AmareNL", locale: "nl_NL" },
};

const faqs = [
  { q: "Wat zit er in het Triangle Marketing Pack?", a: "Je ontvangt 3 complete Triangle of Wellness Xtreme sets. Elke set bevat Sunrise (ochtendenergie), Nitro Xtreme (middagfocus) en Sunset (avondherstel). In totaal 90 porties van elk product — genoeg voor 3 maanden. Plus marketingmateriaal en toegang tot het Brand Partner platform." },
  { q: "Waarom 3 sets?", a: "Het idee is simpel: gebruik 1 set zelf om de producten te ervaren, en gebruik de andere 2 sets om samples te delen met potentiële klanten. Mensen die de producten zelf proberen, worden veel sneller klant. Dit is de meest effectieve manier om te starten als Brand Partner." },
  { q: "Hoe verdien ik met het Triangle Marketing Pack?", a: "Je deelt jouw persoonlijke Amare link met mensen die de producten willen proberen. Elke aankoop via jouw link levert commissie op — zowel eenmalig als terugkerend op abonnementen. De Triangle of Wellness is Amare's #1 bestseller — makkelijk te verkopen omdat het resultaat merkbaar is." },
  { q: "Is dit pakket geschikt voor social media?", a: "Absoluut. De Triangle of Wellness is visueel aantrekkelijk (ochtend-middag-avond verhaal) en leent zich perfect voor Instagram, TikTok en Facebook. Veel Brand Partners gebruiken de extra sets om unboxing video's, before/after content en sample weggeefacties te doen." },
];

export default function TriangleMarketingPage() {
  return (
    <div className="bg-white min-h-screen font-nunito">
      <SchemaMarkup schema={combineSchemas(
        generateProductSchema({ name: "Triangle Marketing Pack", nameNL: "Triangle Marketing Pack — 3x Set", description: "3 complete Triangle of Wellness Xtreme sets. Brand Partner startkit om te delen en verdienen.", image: "https://amarecdn.azureedge.net/webassets/web/prod/products/Triangle-of-Wellness-Xtreme2-EU-800.jpg", slug: "triangle-marketing-pack", priceRetail: 443.00, priceSubscription: 399.00, ratingValue: 4.8, ratingCount: 189 }),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Startpakketten", url: "/startpakketten" }, { name: "Triangle Marketing Pack", url: "/triangle-marketing-pack" }])
      )} id="triangle-schema" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-600 to-orange-700 text-white py-16">
        <div className="container-page max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 mb-4 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">🔥 Beste voor Delen</span>
              <h1 className="text-3xl md:text-4xl font-cormorant font-bold mb-4">Triangle Marketing Pack</h1>
              <p className="text-lg text-white/80 mb-6">3 complete Triangle of Wellness Xtreme sets. Gebruik, ervaar, deel & verdien als Amare Brand Partner.</p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">☀️ 3x Sunrise</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">⚡ 3x Nitro Xtreme</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">🌙 3x Sunset</span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 inline-block">
                <p className="text-sm text-white/70">Abonnement</p>
                <p className="text-3xl font-bold">€399,00<span className="text-lg font-normal text-white/70">/maand</span></p>
                <p className="text-xs text-white/50">Eenmalig: €443,00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hoe werkt het */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-8 text-center">Hoe gebruik je de 3 sets?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <CheckCircle2 size={24} />, title: "Set 1 — Voor Jezelf", desc: "Gebruik de eerste set zelf. Ervaar hoe Sunrise je ochtendenergie geeft, Nitro je middagfocus scherp houdt, en Sunset je nachtrust verbetert. Authenticiteit begint bij eigen ervaring." },
              { icon: <Share2 size={24} />, title: "Set 2 & 3 — Om te Delen", desc: "Geef samples aan vrienden, familie of volgers. Laat ze de producten zelf proberen. Iemand die het zelf heeft gevoeld, wordt veel sneller klant dan iemand die alleen een advertentie ziet." },
              { icon: <Users size={24} />, title: "Verdien Commissie", desc: "Deel je persoonlijke affiliate link. Elke aankoop via jouw link — van de mensen die je samples hebt gegeven — levert commissie op. Ook terugkerend op abonnementen." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                <div className="text-[var(--color-primary)] flex justify-center mb-3">{item.icon}</div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-2">{item.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat zit erin */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat zit er in het pakket?</h2>
          <div className="space-y-4">
            {[
              { name: "3x Sunrise ☀️", desc: "De ochtendformule met 22 superfoods, 9 vitamines en mineralen voor natuurlijke energie. 30 porties per set — totaal 90 porties." },
              { name: "3x Nitro Xtreme ⚡", desc: "De middagfocus-formule met natuurlijke cafeïne, L-theanine en adaptogenen. Voor scherpe focus zonder crash. 30 porties per set — totaal 90 porties." },
              { name: "3x Sunset 🌙", desc: "De avondformule met omega-3, magnesium en adaptogenen voor diepe slaap en nachtelijk herstel. 30 porties per set — totaal 90 porties." },
              { name: "Brand Partner Toegang 🚀", desc: "Direct toegang tot het Brand Partner platform met jouw persoonlijke affiliate link, marketingmateriaal, training en community." },
              { name: "Marketingmateriaal 📱", desc: "Kant-en-klare social media content, productafbeeldingen, video's en scripts om direct te kunnen delen." },
            ].map((item) => (
              <div key={item.name} className="flex gap-3 p-4 rounded-xl bg-white border border-[var(--color-border)]">
                <Gift size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                <div><strong className="text-sm text-[var(--color-text)]">{item.name}</strong><p className="text-xs text-[var(--color-text-muted)] mt-1">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-700 text-white text-center">
        <div className="container-page max-w-2xl">
          <h2 className="text-2xl font-cormorant font-bold mb-4">Klaar om te starten met delen & verdienen?</h2>
          <p className="text-white/80 mb-6">Bestel het Triangle Marketing Pack en start vandaag nog als Amare Brand Partner.</p>
          <a href="https://www.amare.com/2075008/nl-nl/triangle-marketing-pack" target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-700 rounded-full text-lg font-bold hover:opacity-90 shadow-lg">
            <ShoppingCart size={20} /> Bestel Triangle Pack bij Amare →
          </a>
          <p className="text-white/40 text-xs mt-4">* Je wordt doorgestuurd naar de officiële Amare productpagina.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-8 text-center">Veelgestelde Vragen</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group">
                <summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.q}<span className="text-[var(--color-primary)] text-lg group-open:rotate-45 transition-transform">+</span></summary>
                <div className="px-5 pb-5 text-sm text-[var(--color-text-muted)]">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">* Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA.</p>
    </div>
  );
}
