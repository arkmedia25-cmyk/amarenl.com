import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";
import praktijken from "@/data/praktijken.json";

type Praktijk = {
  slug: string;
  name: string;
  practice: string;
  specialty: string;
  website?: string;
  email?: string;
  status: string;
  consent: boolean;
};

export const metadata: Metadata = {
  title: `Praktijken — therapeuten en leefstijlcoaches | ${SITE_NAME}`,
  description:
    "Therapeuten en leefstijlcoaches die op VitaalRoute staan. Vermelding is gratis: geen abonnement, geen commissie, geen verplichting.",
  alternates: { canonical: `${SITE_URL}/praktijken` },
};

export default function PraktijkenPage() {
  const published = (praktijken as Praktijk[]).filter(
    (p) => p.status === "gepubliceerd" && p.consent
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-cormorant font-bold text-[var(--color-text)] mb-4">
        Praktijken
      </h1>
      <p className="text-[var(--color-text-muted)] max-w-2xl mb-10">
        Therapeuten en leefstijlcoaches die op VitaalRoute staan. Een vermelding is gratis:
        geen abonnement, geen commissie en geen verplichting om iets aan te bevelen. Cliënten
        van een vermelde praktijk bestellen bij Amare met €8 korting en 30 dagen
        geld-terug-garantie — dat is een voorwaarde van Amare, niet van de praktijk.
      </p>

      {published.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {published.map((p) => (
            <Link
              key={p.slug}
              href={`/praktijken/${p.slug}`}
              className="block rounded-2xl border border-[var(--color-primary-light)]/40 p-6 hover:border-[var(--color-primary)] transition-colors"
            >
              <h2 className="text-2xl font-cormorant font-bold text-[var(--color-primary)]">
                {p.name}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{p.practice}</p>
              <p className="text-sm mt-3 inline-block rounded-full border border-[var(--color-primary-light)]/50 px-3 py-1 text-[var(--color-primary)]">
                {p.specialty}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--color-primary-light)] bg-[var(--color-bg-soft)] p-8">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-primary)] mb-2">
            Nog geen vermeldingen
          </h2>
          <p className="text-[var(--color-text-muted)] mb-6 max-w-xl">
            De eerste praktijkpagina&apos;s worden nu gemaakt, één per praktijk en pas online na
            akkoord van de praktijk zelf. Wil je erbij? Stuur een bericht, dan zet ik een pagina
            voor je klaar die je eerst kunt bekijken.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-[var(--color-primary)] px-6 py-3 text-white font-semibold"
          >
            Vermelding aanvragen
          </Link>
        </div>
      )}
    </div>
  );
}
