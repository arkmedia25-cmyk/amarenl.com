import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

const all = praktijken as Praktijk[];
const published = all.filter((p) => p.status === "gepubliceerd" && p.consent);

/** Alleen praktijken mét akkoord krijgen een pagina. Concepten bestaan niet als route. */
export function generateStaticParams() {
  return published.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = published.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.practice} | ${SITE_NAME}`,
    description: `${p.name} (${p.practice}) richt zich op ${p.specialty}. Bekijk de praktijk op VitaalRoute.`,
    alternates: { canonical: `${SITE_URL}/praktijken/${p.slug}` },
  };
}

export default async function PraktijkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = published.find((x) => x.slug === slug);
  if (!p) notFound();

  const initials =
    p.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "VR";

  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <nav className="text-sm text-[var(--color-text-muted)] mb-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/praktijken" className="hover:underline">
          Praktijken
        </Link>{" "}
        / <span className="text-[var(--color-primary)]">{p.practice}</span>
      </nav>

      <header className="rounded-2xl border border-[var(--color-primary-light)]/40 p-8 flex flex-col sm:flex-row gap-6 items-start">
        <div className="h-[76px] w-[76px] shrink-0 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-cormorant text-2xl">
          {initials}
        </div>
        <div>
          <h1 className="text-4xl font-cormorant font-bold text-[var(--color-primary)] leading-tight">
            {p.name}
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">{p.practice}</p>
          <p className="mt-4 inline-block rounded-full border border-[var(--color-primary-light)]/50 px-3 py-1 text-sm text-[var(--color-primary)]">
            {p.specialty}
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.55fr_.95fr] mt-6">
        <section className="rounded-2xl border border-[var(--color-primary-light)]/40 p-8">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-primary)] mb-3">
            Over deze praktijk
          </h2>
          <p className="text-[var(--color-text-muted)]">
            {p.practice} begeleidt mensen op het gebied van {p.specialty.toLowerCase()}.
          </p>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="w-28 text-[var(--color-text-muted)]">Praktijk</dt>
              <dd>{p.practice}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 text-[var(--color-text-muted)]">Specialisatie</dt>
              <dd>{p.specialty}</dd>
            </div>
            {p.website ? (
              <div className="flex gap-3">
                <dt className="w-28 text-[var(--color-text-muted)]">Website</dt>
                <dd>
                  <a href={p.website} className="text-[var(--color-primary)] hover:underline" rel="noopener">
                    {p.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </dd>
              </div>
            ) : null}
            {p.email ? (
              <div className="flex gap-3">
                <dt className="w-28 text-[var(--color-text-muted)]">Contact</dt>
                <dd>
                  <a href={`mailto:${p.email}`} className="text-[var(--color-primary)] hover:underline">
                    {p.email}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
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
            Je bestelt bij Amare; Amare geeft de korting en de garantie. VitaalRoute is
            onafhankelijk Amare-partner.
          </p>
        </aside>
      </div>

      <p className="text-xs text-[var(--color-text-muted)] mt-10">
        Deze vermelding is gratis en komt tot stand met instemming van de praktijk. Klopt er iets
        niet? Mail info@vitaalroute.nl en het wordt aangepast of verwijderd.
      </p>
    </div>
  );
}
