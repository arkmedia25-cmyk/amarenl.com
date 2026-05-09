"use client";

import Link from "next/link";
import { AMARE_BASE, storeAffiliateVisit } from "@/lib/affiliate";

export default function CampaignBanner() {
  return (
    <div
      className="text-white text-center text-sm py-2.5 px-4 font-medium"
      style={{
        background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
      }}
    >
      <span>&#128640; MEI 2026 &nbsp;|&nbsp;</span>
      <span>Gratis verzending vanaf €175 + 10% korting op abonnementen!</span>
      <Link
        href={AMARE_BASE}
        target="_blank"
        rel="nofollow noopener noreferrer"
        onClick={storeAffiliateVisit}
        className="ml-3 underline underline-offset-2 hover:no-underline font-semibold"
      >
        Bekijk aanbieding →
      </Link>
    </div>
  );
}
