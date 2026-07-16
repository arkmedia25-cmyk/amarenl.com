import type { Metadata } from "next";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/schema";
import { ShoppingCart, CheckCircle2, Rocket, Users, BookOpen, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Happy Lifestyle Pack Pro — Volledig Amare Brand Partner Pakket | AmareNL",
  description: "Start als Premium Amare Brand Partner met het Pro pakket. Volledig assortiment, hoogste commissie, exclusieve events. €649,64/maand. Direct bestellen bij Amare.",
  alternates: { canonical: "/happy-lifestyle-pack-pro" },
  openGraph: { title: "Happy Lifestyle Pack Pro — Premium Brand Partner | AmareNL", description: "Het meest complete Amare startpakket. Volledig assortiment + hoogste commissie.", url: "/happy-lifestyle-pack-pro", siteName: "AmareNL", locale: "nl_NL" },
};

const faqs = [
  { q: "Wat zit er in het Happy Lifestyle Pack Pro?", a: "Het Pro pack bevat het volledige Amare assortiment: Happy Juice Pack (Energy+ + MentaBiotics + MentaFocus), Triangle of Wellness Xtreme (Sunrise + Nitro + Sunset), HL5 Collageen, en alle essentiële supplementen. Dit is het meest complete pakket dat Amare aanbiedt." },
  { q: "Wat is het verschil tussen Basic en Pro?", a: "Pro geeft je het volledige assortiment (niet slechts een selectie), het hoogste commissiepercentage, toegang tot exclusieve Brand Partner events, persoonlijke coaching, en premium marketingmateriaal. Basic is de voordeligere instap met een selectie van de belangrijkste producten." },
  { q: "Hoeveel commissie verdien ik met het Pro pack?", a: "Met het Pro pack krijg je het hoogste commissiepercentage op al je verkopen — zowel eenmalige aankopen als terugkerende abonnementen. Hoe meer je deelt, hoe meer je verdient. Veel Pro partners bouwen een stabiel maandelijks inkomen op." },
  { q: "Kan ik later upgraden van Basic naar Pro?", a: "Ja, je kunt op elk moment upgraden. Neem contact op met Amare of je sponsor voor de upgrade mogelijkheden." },
  { q: "Is er een geld-terug garantie op het Pro pack?", a: "Launch Packs zijn business starter kits. Dit is een investering in je eigen Brand Partner business. Twijfel je? Begin met het Basic pack (€277,68/maand) als voordeligere instap." },
];

export default function HappyLifestyleProPage() {
  return (
    <div className="bg-white min-h-screen font-nunito">
      <SchemaMarkup schema={combineSchemas(
        generateProductSchema({ name: "Happy Lifestyle Pack Pro", nameNL: "Happy Lifestyle Pack — Pro", description: "Het meest complete Amare Brand Partner startpakket. Volledig assortiment + hoogste commissie.", image: "https://amarecdn.azureedge.net/webassets/web/prod/products/Happy-Lifestyle-Pack-Pro-EU-new-800.jpg", slug: "happy-lifestyle-pack-pro", priceRetail: 721.10, priceSubscription: 649.64, ratingValue: 4.9, ratingCount: 234 }),
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Startpakketten", url: "/startpakketten" }, { name: "Happy Lifestyle Pack Pro", url: "/happy-lifestyle-pack-pro" }])
      )} id="pro-schema" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[#4a3070] text-white py-16">
        <div className="container-page max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 mb-4 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">⭐ Meest Gekozen</span>
              <h1 className="text-3xl md:text-4xl font-cormorant font-bold mb-4">Happy Lifestyle Pack — Pro</h1>
              <p className="text-lg text-white/80 mb-6">Het meest complete Amare Brand Partner pakket. Volledig assortiment, hoogste commissie, premium ondersteuning.</p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">🚀 Direct Brand Partner</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">💰 Hoogste commissie</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs">📦 Volledig assortiment</span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 inline-block">
                <p className="text-sm text-white/70">Abonnement</p>
                <p className="text-3xl font-bold">€649,64<span className="text-lg font-normal text-white/70">/maand</span></p>
                <p className="text-xs text-white/50">Eenmalig: €721,10</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wat zit erin */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat zit er in het Pro Pack?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "Happy Juice Pack", desc: "Energy+ + MentaBiotics + MentaFocus — de complete gut-brain bundel" },
              { name: "Triangle of Wellness Xtreme", desc: "Sunrise ☀️ + Nitro ⚡ + Sunset 🌙 — het dag-nacht systeem" },
              { name: "HL5 Vloeibare Collageen", desc: "5g gehydrolyseerd collageen Type 1&3 voor huid, haar & nagels" },
              { name: "Volledige Essentials", desc: "Alle dagelijkse supplementen voor complete ondersteuning" },
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
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-8 text-center">Waarom het Pro Pack?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Rocket size={20} />, title: "Direct als Premium Partner", desc: "Je start op het hoogste niveau met volledige toegang tot alle tools en features." },
              { icon: <Users size={20} />, title: "Exclusieve Events", desc: "Toegang tot Brand Partner events, webinars en de jaarlijkse Amare conferentie." },
              { icon: <BookOpen size={20} />, title: "Premium Training", desc: "Uitgebreide training over producten, marketing en het bouwen van je team." },
              { icon: <Headphones size={20} />, title: "Persoonlijke Coaching", desc: "1-op-1 begeleiding van ervaren Brand Partners om je snel op weg te helpen." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 bg-white rounded-xl border border-[var(--color-border)]">
                <div className="text-[var(--color-primary)] shrink-0">{item.icon}</div>
                <div><h3 className="font-bold text-sm text-[var(--color-text)] mb-1">{item.title}</h3><p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white text-center">
        <div className="container-page max-w-2xl">
          <h2 className="text-2xl font-cormorant font-bold mb-4">Klaar om Premium Brand Partner te worden?</h2>
          <p className="text-white/80 mb-6">Klik hieronder om het Pro Pack te bestellen bij Amare en direct te starten.</p>
          <a href="https://www.amare.com/2075008/nl-nl/happy-lifestyle-pack-pro" target="_blank" rel="nofollow noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-accent)] text-white rounded-full text-lg font-bold hover:opacity-90 shadow-lg">
            <ShoppingCart size={20} /> Bestel Pro Pack bij Amare →
          </a>
          <p className="text-white/50 text-xs mt-4">* Je wordt doorgestuurd naar de officiële Amare pagina.</p>
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

      <p className="text-center text-[9px] text-[var(--color-text-muted)] py-8">* Voedingssupplementen. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA. Resultaten als Brand Partner kunnen per persoon verschillen.</p>
    </div>
  );
}
