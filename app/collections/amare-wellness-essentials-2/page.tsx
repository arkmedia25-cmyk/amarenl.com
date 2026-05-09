import AffiliateCTA from "@/components/ui/AffiliateCTA";

export const metadata = {
  title: "Amare Wellness Essentials — Complete Gezondheid Collectie | AmareNL",
  description:
    "Ontdek de Amare Wellness Essentials collectie. Een zorgvuldig samengestelde bundel voor complete gut-brain ondersteuning. Bestel met korting via AmareNL.",
};

export default function WellnessEssentials() {
  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-cormorant font-bold mb-4">
        Amare Wellness Essentials
      </h1>
      <p className="text-lg text-[var(--color-text-muted)] mb-6">
        Een zorgvuldig samengestelde collectie voor complete gut-brain ondersteuning —
        jouw basis voor optimale gezondheid.
      </p>

      <div className="bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
        <h2 className="text-xl font-cormorant font-bold mb-3">In deze collectie</h2>
        <ul className="space-y-2 text-[var(--color-text)]">
          <li>&#10003; FundaMentals Pack&reg; — Complete gut-brain ondersteuning</li>
          <li>&#10003; VitaGBX&trade; — Multivitamine met 50+ voedingsstoffen</li>
          <li>&#10003; OmMega — Omega-3 voor hart, brein en gewrichten</li>
        </ul>
      </div>

      <AffiliateCTA
        label="Bekijk collectie bij Amare"
        product="mentabiotics"
        variant="primary"
      />

      <p className="mt-3 text-xs text-[var(--color-text-muted)]">
        * Affiliate link — je betaalt hetzelfde bedrag.
        Deze uitspraken zijn niet beoordeeld door de NVWA.
      </p>
    </div>
  );
}
