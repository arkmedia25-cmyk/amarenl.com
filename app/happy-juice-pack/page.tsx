import AffiliateCTA from "@/components/ui/AffiliateCTA";

export const metadata = {
  title: "Happy Juice Pack — Energie, Stemming & Focus | AmareNL",
  description:
    "Het Happy Juice Pack van Amare is het meest populaire pakket voor meer energie, een betere stemming en verbeterde focus. Bestel met €8 korting via AmareNL.",
};

export default function HappyJuicePack() {
  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-cormorant font-bold mb-4">
        Happy Juice Pack
      </h1>
      <p className="text-lg text-[var(--color-text-muted)] mb-6">
        Het meest populaire pakket van Amare — speciaal ontwikkeld voor meer energie,
        een betere stemming en optimale focus.
      </p>

      <div className="bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
        <h2 className="text-xl font-cormorant font-bold mb-3">Wat zit erin?</h2>
        <ul className="space-y-2 text-[var(--color-text)]">
          <li>&#10003; MentaBiotics&reg; — Probiotica voor stemming en mentale veerkracht</li>
          <li>&#10003; MentaFocus&reg; — Meer focus en mentale helderheid</li>
          <li>&#10003; Energy+ — Natuurlijke energie zonder crash</li>
        </ul>
      </div>

      <div className="bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
        <h2 className="text-xl font-cormorant font-bold mb-3">Voordelen</h2>
        <ul className="space-y-2 text-[var(--color-text)]">
          <li>&#10003; Meer energie gedurende de dag</li>
          <li>&#10003; Betere stemming en minder stress</li>
          <li>&#10003; Verbeterde focus en concentratie</li>
          <li>&#10003; Ondersteunt de gut-brain axis</li>
          <li>&#10003; 100% natuurlijke ingrediënten</li>
        </ul>
      </div>

      <AffiliateCTA
        label="Bestel Happy Juice Pack bij Amare"
        product="happy-juice-pack"
        variant="primary"
      />

      <p className="mt-3 text-xs text-[var(--color-text-muted)]">
        * Affiliate link — je betaalt hetzelfde bedrag.
        Deze uitspraken zijn niet beoordeeld door de NVWA.
      </p>
    </div>
  );
}
