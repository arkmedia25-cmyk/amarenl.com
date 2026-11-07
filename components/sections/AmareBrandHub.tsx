import Link from "next/link";
import { getAllProducts } from "@/lib/products";

const eur = (n: number) => `€ ${n.toFixed(2).replace(".", ",")}`;

/**
 * Ana sayfa için Amare marka merkezi.
 *
 * Neden: GSC'de son 28 günde 121 marka gösteriminin 95'i ana sayfaya düşüyor
 * ("amare global" ≈ poz 5,8) ama sayfada markayı ve ürün kataloğunu anlatan tek
 * bir blok yoktu; ziyaretçi de Google da ne bulacağını bilmiyordu. Bu blok
 * marka adını doğal biçimde kullanır, 40 ürünün tamamına iç link verir ve
 * fiyatı önden gösterir. "Officiële webshop" gibi bir iddia YOKTUR —
 * bağımsız bilgi + affiliate şeffaflığı korunur.
 */
export default function AmareBrandHub() {
  const all = getAllProducts();
  const top = all
    .filter((p) => p.isPack || p.isBestseller)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 6);

  return (
    <section className="py-12 bg-white" aria-labelledby="amare-hub">
      <div className="container-page max-w-5xl">
        <h2
          id="amare-hub"
          className="text-xl md:text-2xl font-cormorant font-bold text-[var(--color-text)] mb-2 text-center"
        >
          Amare producten in Nederland — het volledige overzicht
        </h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6 text-center max-w-2xl mx-auto">
          Alle {all.length} Amare supplementen met de volledige ingrediëntenlijst, dosering en actuele prijs in
          euro&apos;s. Zo zie je zelf wat er in een product zit voordat je bestelt.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {top.map((p) => (
            <Link
              key={p.slug}
              href={`/producten/${p.slug}`}
              className="bg-[var(--color-bg-soft)] rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all group"
            >
              <p className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                {p.shortNameNL || p.nameNL}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">{p.taglineNL}</p>
              {p.pricing?.oneTime ? (
                <p className="text-xs font-bold text-[var(--color-primary)] mt-2">
                  vanaf {eur(p.pricing.subscription || p.pricing.oneTime)}
                </p>
              ) : null}
            </Link>
          ))}
        </div>

        <div className="text-center mb-8">
          <Link
            href="/supplementen"
            className="inline-block px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Bekijk alle {all.length} Amare producten →
          </Link>
        </div>

        <ul className="grid md:grid-cols-3 gap-3 text-xs text-[var(--color-text-muted)]">
          <li className="bg-[var(--color-bg-soft)] rounded-xl p-4">
            <strong className="text-[var(--color-text)]">Ingrediënten, geen marketingtaal.</strong> Per product de
            hoeveelheden zoals Amare ze publiceert — geen beloftes die we niet kunnen onderbouwen.
          </li>
          <li className="bg-[var(--color-bg-soft)] rounded-xl p-4">
            <strong className="text-[var(--color-text)]">Prijs en abonnement eerlijk naast elkaar.</strong> Eenmalig of
            abonnement, met het verschil in euro&apos;s per maand.
          </li>
          <li className="bg-[var(--color-bg-soft)] rounded-xl p-4">
            <strong className="text-[var(--color-text)]">Eén link naar de Amare-shop.</strong> Bestellen en leveren
            gaan via Amare.
          </li>
        </ul>
      </div>
    </section>
  );
}
