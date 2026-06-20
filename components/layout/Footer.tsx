import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--color-border)] mt-auto pt-16 pb-8">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold font-cormorant text-[var(--color-primary)]">
              AmareNL
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Jouw gids naar natuurlijke mentale wellness en darmgezondheid. Onafhankelijke partner van Amare Global in Nederland.
            </p>
            <div className="flex items-center gap-4 text-xs font-bold text-[var(--color-primary)]">
              <a href="https://amarereview.nl" className="hover:underline" target="_blank">AMAREREVIEW.NL</a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-6">Producten</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/supplementen/" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Mentale Wellness</Link></li>
              <li><Link href="/darmgezondheid/" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Darmgezondheid</Link></li>
              <li><Link href="/schoonheid/" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Schoonheid & Collageen</Link></li>
              <li><Link href="/essentials/" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Dagelijkse Essentials</Link></li>
              <li><Link href="/pakketten/" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Pakketten & Bundels</Link></li>
              <li><Link href="/gewichtsbeheer/" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Gewichtsbeheer</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-[var(--color-text)] mb-6">Informatie</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/over-ons/" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Over AmareNL</Link></li>
              <li><Link href="/blogs/nieuws/supplementen-wijzer-gratis" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Gratis Wijzer</Link></li>
              <li><Link href="/blogs/nieuws/ervaringen-gebruikers-amare-supplementen" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Ervaringen</Link></li>
              <li><Link href="/contact/" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Klantenservice</Link></li>
              <li><Link href="/privacy-beleid/" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Privacy & Cookies</Link></li>
            </ul>
          </div>

          {/* Trust Column */}
          <div className="space-y-6">
            <h4 className="font-bold text-[var(--color-text)] mb-6">Veilig Winkelen</h4>
            <div className="p-4 rounded-2xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
              <p className="text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">✓ Gecertificeerde Partner</p>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-1">Officieel Amare Global distributeur in Nederland.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
              <p className="text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">📦 Snelle Levering</p>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-1">Vanuit Nederlands magazijn. 1-2 werkdagen bezorgd door Amare Global.</p>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed">
              Referentie: <a href="https://www.amare.com/2075008/nl-NL" className="underline hover:text-[var(--color-primary)]" target="_blank">Amare Global officiële website</a> — Partner ID 2075008
            </p>
            <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed">
              * Voedingssupplementen. Geen geneesmiddel. Deze producten zijn niet bedoeld om ziekten te diagnosticeren, behandelen, genezen of voorkomen. Lees voor gebruik de verpakking en raadpleeg bij twijfel een arts.
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} AmareNL — Onafhankelijke Affiliate Partner</p>
        </div>
      </div>
    </footer>
  );
}
