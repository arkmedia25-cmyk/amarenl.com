"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Paginafout:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[var(--color-bg-soft)]">
      <div className="container-page max-w-lg text-center py-20">
        <h1 className="text-8xl font-cormorant font-bold text-[var(--color-primary)] mb-4">Oeps!</h1>
        <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-6">
          Er is iets misgegaan
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed mb-10">
          Onze excuses voor het ongemak. De pagina kon niet worden geladen. Probeer het opnieuw of ga terug naar de homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            <RefreshCw size={16} />
            Opnieuw proberen
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-bold hover:bg-[var(--color-primary-light)] transition-colors"
          >
            <Home size={16} />
            Terug naar Home
          </Link>
        </div>
      </div>
    </div>
  );
}
