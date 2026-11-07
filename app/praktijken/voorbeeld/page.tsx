import type { Metadata } from "next";
import Link from "next/link";

/**
 * Voorbeeldpagina — laat zien hoe een praktijkvermelding eruitziet.
 * Bewust noindex: dit is geen echte praktijk en hoort niet in Google of de sitemap.
 */
export const metadata: Metadata = {
  title: "Voorbeeld van een praktijkvermelding | VitaalRoute",
  description: "Zo ziet een gratis praktijkvermelding op VitaalRoute eruit.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://vitaalroute.nl/praktijken" },
};

export default function VoorbeeldPraktijk() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <div className="rounded-lg bg-[var(--color-accent)]/20 border border-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-[var(--color-text)] mb-6">
        VOORBEELD — dit is een voorbeeldpagina, geen bestaande praktijk
      </div>

      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/praktijken" className="hover:underline">
          Praktijken
        </Link>{" "}
        / <span className="text-[var(--color-primary)]">Voorbeeldpraktijk</span>
      </nav>

      <header className="rounded-2xl border border-[var(--color-primary-light)]/40 p-8 flex flex-col sm:flex-row gap-6 items-start">
        <div className="h-[76px] w-[76px] shrink-0 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-cormorant text-2xl">
          VP
        </div>
        <div>
          <h1 className="text-4xl font-cormorant font-bold text-[var(--color-primary)] leading-tight">
            Voorbeeldpraktijk
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Leefstijlcoach · Voorbeeldpraktijk · Zaltbommel
          </p>
          <p className="mt-4 inline-block rounded-full border border-[var(--color-primary-light)]/50 px-3 py-1 text-sm text-[var(--color-primary)]">
            Leefstijlverandering en gewoonten
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.55fr_.95fr] mt-6">
        <section className="rounded-2xl border border-[var(--color-primary-light)]/40 p-8">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-primary)] mb-3">
            Over deze praktijk
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Hier komt de tekst die de praktijk zelf aanlevert — of die ik van de eigen website haal
            en eerst ter goedkeuring voorleg. Geen verzonnen teksten, geen claims die de praktijk
            niet doet.
          </p>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="w-28 text-[var(--color-text-muted)]">Praktijk</dt>
              <dd>Voorbeeldpraktijk</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 text-[var(--color-text-muted)]">Locatie</dt>
              <dd>Zaltbommel e.o.</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 text-[var(--color-text-muted)]">Specialisatie</dt>
              <dd>Leefstijl, gedrag, gewoonten</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 text-[var(--color-text-muted)]">Website</dt>
              <dd className="text-[var(--color-primary)]">voorbeeldpraktijk.nl</dd>
            </div>
          </dl>
          <h3 className="text-xl font-cormorant font-bold text-[var(--color-primary)] mt-8 mb-2">
            Waarom deze praktijk op VitaalRoute staat
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--color-text-muted)]">
            <li>Vermelding is gratis — geen abonnement, geen commissie, geen verplichting.</li>
            <li>
              Amare geeft cliënten van deze praktijk €8 korting en 30 dagen geld-terug-garantie bij
              een bestelling via deze pagina.
            </li>
            <li>De praktijk houdt de regie over het eigen advies.</li>
          </ul>
        </section>

        <aside className="rounded-2xl border border-[var(--color-primary-light)]/40 bg-[var(--color-bg-soft)] p-7 text-center">
          <p className="text-5xl font-cormorant font-bold text-[var(--color-primary)]">€8</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">
            korting van Amare op je eerste bestelling
            <br />
            + 30 dagen geld-terug-garantie
          </p>
          <Link
            href="/collections/amare-wellness-essentials-2"
            className="mt-5 block rounded-lg bg-[var(--color-primary)] px-5 py-3 text-white font-semibold"
          >
            Bekijk de producten
          </Link>
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            Je bestelt bij Amare; Amare geeft de korting en de garantie. VitaalRoute is onafhankelijk
            Amare-partner.
          </p>
        </aside>
      </div>
    </div>
  );
}
