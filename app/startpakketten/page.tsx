import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Startpakketten — Word Amare Brand Partner | AmareNL",
  description: "Kies je Amare Launch Pack en start als Brand Partner. 3 pakketten: Pro, Triangle Marketing en Basic. Verdien commissie met premium supplementen.",
};

const packs = [
  {
    name: "Happy Lifestyle Pack — Pro ⭐",
    desc: "Het meest complete pakket. Volledig Amare assortiment, hoogste commissie, premium training en exclusieve events.",
    price: "€649,64",
    priceOnce: "€721,10",
    href: "https://www.amare.com/2075008/nl-nl/happy-lifestyle-pack-pro",
    image: "https://amarecdn.azureedge.net/webassets/web/prod/products/Happy-Lifestyle-Pack-Pro-EU-new-800.jpg",
    badge: "Meest gekozen",
    benefits: ["Volledige productlijn", "Hoogste commissie %", "Premium events", "Persoonlijke coaching"],
  },
  {
    name: "Triangle Marketing Pack",
    desc: "3x Triangle of Wellness Xtreme. Gebruik 1 set zelf, deel de andere 2 met klanten. Perfect voor social media marketing.",
    price: "€399,00",
    priceOnce: "€443,00",
    href: "https://www.amare.com/2075008/nl-nl/triangle-marketing-pack",
    image: "https://amarecdn.azureedge.net/webassets/web/prod/products/Triangle-of-Wellness-Xtreme2-EU-800.jpg",
    badge: "Beste voor delen",
    benefits: ["3x Triangle set", "1 voor jezelf", "2 om te delen", "Marketingmateriaal"],
  },
  {
    name: "Happy Lifestyle Pack — Basic",
    desc: "De voordeligste instap. Essentiële Amare producten + toegang tot het Brand Partner platform. Start klein, groei later.",
    price: "€277,68",
    priceOnce: "€308,22",
    href: "https://www.amare.com/2075008/nl-nl/shop-all?category=Launch%20Packs",
    image: "https://amarecdn.azureedge.net/webassets/web/prod/products/Happy-Lifestyle-Pack-Basic-EU-new-800.jpg",
    badge: "Voordeligste",
    benefits: ["Laagste instap", "Essentiële producten", "Platform toegang", "Training inbegrepen"],
  },
];

export default function StartpakkettenPage() {
  return (
    <div className="bg-white min-h-screen font-nunito">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[#4a3070] text-white py-20">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-block px-4 py-1.5 mb-6 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">
            Amare Launch Packs
          </span>
          <h1 className="text-3xl md:text-5xl font-cormorant font-bold mb-4">
            Startpakketten — Word <span className="text-[var(--color-accent)]">Brand Partner</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Kies je Launch Pack, ontvang premium producten, en start met verdienen als Amare Brand Partner. Geen voorraad, geen verzending — jij deelt, Amare regelt de rest.
          </p>
        </div>
      </section>

      {/* Packs */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            {packs.map((pack, i) => (
              <a
                key={pack.name}
                href={pack.href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className={`group bg-white rounded-2xl border-2 overflow-hidden transition-all hover:shadow-xl flex flex-col ${
                  i === 0 ? "border-[var(--color-primary)] shadow-lg" : "border-[var(--color-border)] hover:border-[var(--color-primary)]"
                }`}
              >
                {i === 0 && (
                  <div className="bg-[var(--color-primary)] text-white text-center text-xs font-bold py-2 uppercase tracking-wider">
                    ⭐ {pack.badge}
                  </div>
                )}
                {i === 1 && (
                  <div className="bg-[var(--color-accent)] text-white text-center text-xs font-bold py-2 uppercase tracking-wider">
                    🔥 {pack.badge}
                  </div>
                )}
                {i === 2 && (
                  <div className="bg-gray-400 text-white text-center text-xs font-bold py-2 uppercase tracking-wider">
                    💰 {pack.badge}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-cormorant font-bold text-[var(--color-text)] mb-2">{pack.name}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mb-4 leading-relaxed">{pack.desc}</p>

                  {/* Price */}
                  <div className="bg-[var(--color-bg-soft)] rounded-xl p-4 mb-4 text-center">
                    <p className="text-2xl font-bold text-[var(--color-primary)]">{pack.price}<span className="text-sm font-normal text-[var(--color-text-muted)]">/maand</span></p>
                    <p className="text-[10px] text-[var(--color-text-muted)]">Eenmalig: {pack.priceOnce}</p>
                  </div>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {pack.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                        <span className="text-green-500 font-bold shrink-0">✓</span> {b}
                      </li>
                    ))}
                  </ul>

                  <div className={`py-3 rounded-xl text-center text-sm font-bold transition-all ${
                    i === 0 ? "bg-[var(--color-accent)] text-white group-hover:opacity-90 shadow-md" : "bg-[var(--color-primary)] text-white group-hover:opacity-90"
                  }`}>
                    Bestel bij Amare →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat gebeurt er na je bestelling?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { step: "1", title: "Je ontvangt je pakket", desc: "Binnen enkele dagen heb je je Launch Pack in huis. Alles wat je nodig hebt om te starten." },
              { step: "2", title: "Je krijgt platform toegang", desc: "Direct toegang tot het Brand Partner platform met training, marketingmateriaal en jouw persoonlijke affiliate link." },
              { step: "3", title: "Je start met verdienen", desc: "Deel je link, ervaar de producten, en verdien commissie op elke verkoop. Zo simpel is het." },
            ].map((item) => (
              <div key={item.step} className="p-5 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                <div className="w-8 h-8 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-xs font-bold mb-3">{item.step}</div>
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-2">{item.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-2xl text-center">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-4">Klaar om te starten?</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6">Klik op een pakket hierboven om direct te bestellen bij Amare.</p>
          <Link href="/pakketten" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-full text-sm font-bold hover:opacity-90">
            Meer informatie over Brand Partner worden →
          </Link>
        </div>
      </section>
    </div>
  );
}
