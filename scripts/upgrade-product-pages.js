/**
 * Batch-upgrade thin product pages with:
 * - Trust badges (30 dagen, €8 korting, gratis verzending)
 * - NVWA disclaimer
 * - 30-day guarantee section
 * - Human Dutch language improvements
 */
const fs = require('fs');
const path = require('path');

const pages = [
  'nitro-xtreme',
  'edge-plus',
  'magnesium-supplement',
  'omega-3-supplement',
  'vitamine-d-supplement',
];

// Trust badges HTML to insert after the subtitle paragraph
const TRUST_BADGES = `
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-200">🛡️ 30 dagen geld terug</span>
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-200">🎁 €8 welkomstkorting</span>
              <span className="inline-flex items-center gap-1 bg-[var(--color-bg-soft)] text-[var(--color-primary)] text-[10px] font-bold px-3 py-1.5 rounded-full border border-[var(--color-border)]">🚚 Gratis verzending &ge;€175</span>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] mb-5 italic">Voedingssupplement. Geen geneesmiddel. De NVWA heeft de gezondheidsclaims van de gebruikte ingrediënten beoordeeld.</p>`;

const GUARANTEE_SECTION = `
      {/* GARANTIE — 30 dagen risicovrij proberen */}
      <section className="py-16 bg-white">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Probeer het 30 dagen risicovrij
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">30 dagen garantie</h3>
              <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">Niet tevreden? Geld terug — zelfs als de verpakking leeg is.</p>
            </div>
            <div className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]">
              <div className="text-2xl mb-2">🎁</div>
              <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">€8 welkomstkorting</h3>
              <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">Nieuwe klanten krijgen korting op hun eerste bestelling.</p>
            </div>
            <div className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]">
              <div className="text-2xl mb-2">🚚</div>
              <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">Gratis verzending</h3>
              <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">Bij bestellingen vanaf €175.</p>
            </div>
          </div>
        </div>
      </section>`;

const NVWA_FOOTER = `
          <p className="mt-4 text-[9px] text-[var(--color-text-muted)] max-w-lg mx-auto">* Voedingssupplement. Geen geneesmiddel. Deze uitspraken zijn niet beoordeeld door de NVWA. Supplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.</p>`;

let updated = 0;

for (const pageName of pages) {
  const filePath = path.join(__dirname, '..', 'app', pageName, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️ ${pageName} — niet gevonden`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add trust badges after subtitle (before first AffiliateCTA)
  // Pattern: the text right before the first AffiliateCTA in hero
  if (!content.includes('30 dagen geld terug')) {
    // Find "mb-6">...<strong>Direct van Amare</strong> pattern and add badges after
    content = content.replace(
      /(<p className="text-sm text-\[var\(--color-text-muted\)\] mb-6">[\s\S]*?<\/p>)/,
      `$1${TRUST_BADGES}`
    );
  }

  // 2. Replace "Bestel bij Amare →" with "Probeer nu →" for better hook
  content = content.replace(
    /label="Bestel bij Amare →/g,
    'label="Probeer nu →'
  );

  // 3. Add guarantee section before FAQ if missing
  if (!content.includes('Probeer het 30 dagen risicovrij')) {
    // Insert before the FAQ section
    content = content.replace(
      /(\s*<section className="py-16 bg-\[var\(--color-bg-soft\)\]"><div className="container-page max-w-3xl">\s*<h2 className="text-2xl[^"]*">Veelgestelde vragen)/,
      `${GUARANTEE_SECTION}$1`
    );
  }

  // 4. Add NVWA disclaimer at bottom CTA
  if (!content.includes('geen vervanging voor een gevarieerd')) {
    content = content.replace(
      /(<p className="mt-4 text-\[9px\][^"]*">\* Affiliate link[\s\S]*?<\/p>)/,
      `$1${NVWA_FOOTER}`
    );
  }

  // 5. Make bottom CTA more hook-driven
  content = content.replace(
    /Klaar voor/g,
    'Klaar om te'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ ${pageName}`);
  updated++;
}

console.log(`\n✅ ${updated} pagina's geüpdatet`);
