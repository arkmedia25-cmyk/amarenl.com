"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AMARE_BASE, storeAffiliateVisit } from "@/lib/affiliate";

const messages = [
  { text: "🎁 Nieuwe klant? Claim je €8 welkomstkorting op je eerste bestelling!", link: "#newsletter" },
  { text: "🚚 Gratis verzending vanaf €175 + 10% korting op abonnementen!", link: AMARE_BASE },
  { text: "🛡️ 30 dagen geld-terug-garantie — zelfs als de verpakking leeg is!", link: AMARE_BASE },
];

export default function CampaignBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % messages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const isExternal = messages[current].link?.startsWith("http");

  return (
    <div
      className="text-white text-center text-xs sm:text-sm py-2 px-4 font-medium flex items-center justify-center gap-2 sm:gap-4"
      style={{ background: "linear-gradient(135deg, var(--color-primary), #4a3070)" }}
    >
      <button onClick={() => setCurrent((prev) => (prev - 1 + messages.length) % messages.length)} className="text-white/60 hover:text-white text-lg leading-none shrink-0" aria-label="Vorige">‹</button>

      {isExternal ? (
        <a href={messages[current].link} target="_blank" rel="nofollow noopener noreferrer" onClick={storeAffiliateVisit} className="hover:underline underline-offset-2">
          {messages[current].text}
        </a>
      ) : (
        <Link href={messages[current].link!} className="hover:underline underline-offset-2">
          {messages[current].text}
        </Link>
      )}

      <button onClick={next} className="text-white/60 hover:text-white text-lg leading-none shrink-0" aria-label="Volgende">›</button>
    </div>
  );
}
