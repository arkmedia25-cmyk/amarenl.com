import Link from "next/link";

const PACKS = [
  {
    slug: "happy-lifestyle-pack-pro",
    href: "/happy-lifestyle-pack-pro",
    name: "Happy Lifestyle Pack — Pro ⭐",
    tagline: "Volledig assortiment — hoogste commissie",
    priceSub: "649,64",
    priceOnce: "721,10",
    isPro: true,
    benefits: ["Volledige productlijn", "Hoogste commissie %", "Premium events", "Persoonlijke coaching"],
  },
  {
    slug: "triangle-marketing-pack",
    href: "/triangle-marketing-pack",
    name: "Triangle Marketing Pack",
    tagline: "3x Triangle of Wellness — deel & verdien",
    priceSub: "399,00",
    priceOnce: "443,00",
    isPro: false,
    benefits: ["3x Triangle set", "1 voor jezelf", "2 om te delen", "Marketingmateriaal"],
  },
  {
    slug: "happy-lifestyle-pack-basic",
    href: "/happy-lifestyle-pack-basic",
    name: "Happy Lifestyle Pack — Basic",
    tagline: "Voordelige instap — start vandaag",
    priceSub: "277,68",
    priceOnce: "308,22",
    isPro: false,
    benefits: ["Laagste instap", "Essentiële producten", "Platform toegang", "Training inbegrepen"],
  },
];

export default function PakketGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {PACKS.map((pack) => (
        <Link
          key={pack.slug}
          href={pack.href}
          className={`group bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-xl flex flex-col overflow-hidden ${
            pack.isPro ? "border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/10" : "border-[var(--color-border)] hover:border-[var(--color-primary)]"
          }`}
        >
          {pack.isPro && (
            <div className="bg-[var(--color-primary)] text-white text-center text-xs font-bold py-2 uppercase tracking-wider">
              ⭐ Meest Gekozen
            </div>
          )}

          <div className="p-6 flex flex-col flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-cormorant font-bold text-[var(--color-text)] mb-1">{pack.name}</h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{pack.tagline}</p>
            </div>

            <div className="mb-4 p-4 bg-[var(--color-bg-soft)] rounded-xl text-center">
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Abonnement</p>
              <p className="text-2xl font-bold text-[var(--color-primary)]">
                €{pack.priceSub}<span className="text-sm font-normal text-[var(--color-text-muted)]">/maand</span>
              </p>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-1">Eenmalig: €{pack.priceOnce}</p>
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              {pack.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                  <span className="text-green-500 font-bold shrink-0 mt-0.5">✓</span> {b}
                </li>
              ))}
            </ul>

            <div className={`py-3 rounded-xl text-center text-sm font-bold transition-all ${
              pack.isPro ? "bg-[var(--color-accent)] text-white group-hover:opacity-90 shadow-md" : "bg-[var(--color-primary)] text-white group-hover:opacity-90"
            }`}>
              Bekijk dit pakket →
            </div>

            <p className="text-[9px] text-[var(--color-text-muted)] text-center mt-3">
              🚀 Lees meer & bestel bij Amare
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
