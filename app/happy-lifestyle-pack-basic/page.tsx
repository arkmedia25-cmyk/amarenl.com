import type { Metadata } from "next";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/schema";
import { ShoppingCart, CheckCircle2, TrendingUp, BookOpen, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Happy Lifestyle Pack Basic — Voordelig Amare Brand Partner Worden | AmareNL",
  description: "Start als Amare Brand Partner met het voordeligste pakket. Essentiële producten, training & tools. €277,68/maand. Direct bestellen bij Amare.",
  alternates: { canonical: "/happy-lifestyle-pack-basic" },
  openGraph: { title: "Happy Lifestyle Pack Basic — Voordelige Start | AmareNL", description: "De voordeligste manier om Amare Brand Partner te worden. Essentiële producten + platform toegang.", url: "/happy-lifestyle-pack-basic", siteName: "AmareNL", locale: "nl_NL" },
};

const faqs = [
  { question: "Wat zit er in het Happy Lifestyle Pack Basic?", answer: "Het Basic pack bevat de essentiële Amare producten om te starten: de Happy Juice Pack (Energy+ + MentaBiotics + MentaFocus) voor de gut-brain connectie, plus basis dagelijkse supplementen. Je krijgt ook direct toegang tot het Brand Partner platform met je persoonlijke affiliate link, training en marketingmateriaal." },
  { question: "Is het Basic pack genoeg om te starten?", answer: "Ja, absoluut. Het Basic pack geeft je alles wat je nodig hebt om te beginnen als Brand Partner. Je kunt de producten zelf ervaren, je verhaal delen, en commissie verdienen. Veel succesvolle Brand Partners zijn met Basic gestart en later gegroeid." },
  { question: "Wat is het verschil met het Pro pack?", answer: "Het Pro pack (€649,64/maand) bevat het volledige Amare assortiment, hogere commissiepercentages, exclusieve events en persoonlijke coaching. Basic is de voordeligere instap — perfect als je het eerst wilt uitproberen. Je kunt later altijd upgraden." },
  { question: "Kan ik later upgraden naar Pro?", answer: "Ja, je kunt op elk moment upgraden van Basic naar Pro. Veel partners starten met Basic, bouwen hun netwerk op, en upgraden zodra ze klaar zijn voor de volgende stap." },
];

export default function HappyLifestyleBasicPage() {
  return (
    <div className="bg-white min-h-screen font-nunito">
      <SchemaMarkup schema={combineSchemas(
        generateProductSchema({ name: "Happy Lifestyle Pack Basic", nameNL: "Happy Lifestyle Pack — Basic", description: "De voordeligste start als Amare Brand Partner. Essentiële producten + platform toegang.", image: "https://amarecdn.azureedge.net/webassets/web/prod/products/Happy-Lifestyle-Pack-Basic-EU-new-800.jpg", slug: "happy-lifestyle-pack-basic", priceRetail: 308.22, priceSubscription: 277.68, ratingValue: 4.7, ratingCount: 156, affiliateUrl: "https://www.amare.com/2075008/nl-nl/shop-all?category=Launch%20Packs" }),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Startpakketten", url: "/startpakketten" }, { name: "Happy Lifestyle Pack Basic", url: "/happy-lifestyle-pack-basic" }])
      )} id="basic-schema" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-teal-700 text-white py-16">
        <div className="container-page max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 mb-4 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">💰 Voordeligste Instap</span>
              <h1 className="text-3xl md:text-4xl font-cormorant font-bold mb-4">Happy Lifestyle Pack — Basic</h1>
              <p className="text-lg text-white/80 mb-6">De meest toegankelijke manier om Amare Brand Partner te worden. Essentiële producten, volledige training, direct starten.</p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">🚀 Direct Brand Partner</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">📦 Essentiële producten</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">📚 Training inbegrepen</span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 inline-block">
                <p className="text-sm text-white/70">Abonnement</p>
                <p className="text-3xl font-bold">€277,68<span className="text-lg font-normal text-white/70">/maand</span></p>
                <p className="text-xs text-white/50">Eenmalig: €308,22</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wat zit erin */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat zit er in het Basic Pack?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "Happy Juice Pack", desc: "De #1 bestseller: Energy+ voor energie, MentaBiotics voor stemming, MentaFocus voor helderheid." },
              { name: "Dagelijkse Essentials", desc: "Basis dagelijkse supplementen voor algehele wellness ondersteuning." },
              { name: "Brand Partner Platform", desc: "Direct toegang tot je persoonlijke dashboard, affiliate link en alle tools." },
              { name: "Training & Support", desc: "Online training, handleidingen en toegang tot de Brand Partner community." },
            ].map((item) => (
              <div key={item.name} className="flex gap-3 p-4 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                <div><strong className="text-sm text-[var(--color-text)]">{item.name}</strong><p className="text-xs text-[var(--color-text-muted)] mt-1">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voordelen */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-8 text-center">Waarom Basic?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <TrendingUp size={20} />, title: "Laagste instapdrempel", desc: "Voor minder dan €300/maand start je je eigen wellness business. Minder risico, alle kansen." },
              { icon: <Rocket size={20} />, title: "Direct starten", desc: "Geen ervaring nodig. Je krijgt alle tools en training om meteen te beginnen met delen en verdienen." },
              { icon: <BookOpen size={20} />, title: "Leer terwijl je verdient", desc: "Start met de essentiële producten, leer de kunst van het delen, en groei op je eigen tempo." },
              { icon: <CheckCircle2 size={20} />, title: "Later upgraden", desc: "Basic is je start — niet je eindpunt. Upgrade naar Pro wanneer je er klaar voor bent." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 bg-white rounded-xl border border-[var(--color-border)]">
                <div className="text-green-600 shrink-0">{item.icon}</div>
                <div><h3 className="font-bold text-sm text-[var(--color-text)] mb-1">{item.title}</h3><p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-teal-700 text-white text-center">
        <div className="container-page max-w-2xl">
          <h2 className="text-2xl font-cormorant font-bold mb-4">Klaar om te starten?</h2>
          <p className="text-white/80 mb-6">Begin je reis als Amare Brand Partner met het voordeligste pakket.</p>
          <a href="https://www.amare.com/2075008/nl-nl/shop-all?category=Launch%20Packs" target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 rounded-full text-lg font-bold hover:opacity-90 shadow-lg">
            <ShoppingCart size={20} /> Bekijk Launch Packs bij Amare →
          </a>
          <p className="text-white/40 text-xs mt-4">* Je wordt doorgestuurd naar de officiële Amare Launch Packs pagina.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-8 text-center">Veelgestelde Vragen</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group">
                <summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg group-open:rotate-45 transition-transform">+</span></summary>
                <div className="px-5 pb-5 text-sm text-[var(--color-text-muted)]">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">* Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA.</p>
    </div>
  );
}
