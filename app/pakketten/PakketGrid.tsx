import { products, getAffiliateUrl } from "@/lib/products";

const PACK_SLUGS = ["happy-lifestyle-pack-pro", "triangle-marketing-pack", "happy-lifestyle-pack-basic"];

export default function PakketGrid() {
  const packs = PACK_SLUGS
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {packs.map((pack) => {
        const href = getAffiliateUrl(pack!.id);
        const isPro = pack!.slug === "happy-lifestyle-pack-pro";

        return (
          <a
            key={pack!.slug}
            href={href}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className={`group bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-xl flex flex-col overflow-hidden ${
              isPro ? "border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/10" : "border-[var(--color-border)] hover:border-[var(--color-primary)]"
            }`}
          >
            {isPro && (
              <div className="bg-[var(--color-primary)] text-white text-center text-xs font-bold py-2 uppercase tracking-wider">
                ⭐ Meest Gekozen
              </div>
            )}

            <div className="p-6 flex flex-col flex-1">
              {/* Name + Badge */}
              <div className="mb-4">
                <h3 className="text-lg font-cormorant font-bold text-[var(--color-text)] mb-1">
                  {pack!.nameNL}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {pack!.taglineNL}
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 p-4 bg-[var(--color-bg-soft)] rounded-xl text-center">
                <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Abonnement</p>
                <p className="text-2xl font-bold text-[var(--color-primary)]">
                  €{pack!.priceSubscription.toFixed(2).replace(".", ",")}
                  <span className="text-sm font-normal text-[var(--color-text-muted)]">/maand</span>
                </p>
                {pack!.priceRetail > 0 && (
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
                    Eenmalig: €{pack!.priceRetail.toFixed(2).replace(".", ",")}
                  </p>
                )}
              </div>

              {/* Benefits */}
              <ul className="space-y-2 mb-6 flex-1">
                {pack!.benefits.slice(0, 4).map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                    <span className="text-green-500 font-bold shrink-0 mt-0.5">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className={`py-3 rounded-xl text-center text-sm font-bold transition-all ${
                isPro
                  ? "bg-[var(--color-accent)] text-white group-hover:opacity-90 shadow-md"
                  : "bg-[var(--color-primary)] text-white group-hover:opacity-90"
              }`}>
                Start als Brand Partner →
              </div>

              {/* Note */}
              <p className="text-[9px] text-[var(--color-text-muted)] text-center mt-3">
                🚀 Direct toegang tot Brand Partner platform
              </p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
