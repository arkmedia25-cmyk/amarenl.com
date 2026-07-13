import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export const metadata = {
  title: "Pagina niet gevonden | AmareNL",
  description: "De pagina die je zoekt bestaat niet. Ga terug naar de homepage of zoek verder op AmareNL.",
};

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--color-bg-soft)]">
      <div className="container-page max-w-lg text-center py-20">
        <h1 className="text-8xl font-cormorant font-bold text-[var(--color-primary)] mb-4">404</h1>
        <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-6">
          Pagina niet gevonden
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed mb-10">
          De pagina die je zoekt bestaat niet of is verplaatst. Misschien vind je wat je zoekt op één van deze pagina&apos;s:
        </p>
        <div className="grid grid-cols-2 gap-4 text-left mb-10">
          <Link href="/supplementen" className="text-sm text-[var(--color-primary)] hover:underline">
            Supplementen
          </Link>
          <Link href="/blogs/nieuws" className="text-sm text-[var(--color-primary)] hover:underline">
            Blog &amp; Artikelen
          </Link>
          <Link href="/darmgezondheid" className="text-sm text-[var(--color-primary)] hover:underline">
            Darmgezondheid
          </Link>
          <Link href="/schoonheid" className="text-sm text-[var(--color-primary)] hover:underline">
            Schoonheid
          </Link>
          <Link href="/gewichtsbeheer" className="text-sm text-[var(--color-primary)] hover:underline">
            Gewichtsbeheer
          </Link>
          <Link href="/pakketten" className="text-sm text-[var(--color-primary)] hover:underline">
            Pakketten
          </Link>
          <Link href="/gut-brain-axis" className="text-sm text-[var(--color-primary)] hover:underline">
            Gut-Brain Axis
          </Link>
          <Link href="/contact" className="text-sm text-[var(--color-primary)] hover:underline">
            Contact
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-bold hover:bg-[var(--color-primary-light)] transition-colors"
          >
            <Home size={16} />
            Terug naar Home
          </Link>
          <Link
            href="/blogs/nieuws"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg font-bold hover:bg-[var(--color-bg-soft)] transition-colors"
          >
            <Search size={16} />
            Blog doorzoeken
          </Link>
        </div>
      </div>
    </div>
  );
}
