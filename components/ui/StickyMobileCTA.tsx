"use client";

import { useState, useEffect } from "react";
import AffiliateCTA from "./AffiliateCTA";

interface StickyMobileCTAProps {
  product: string;
  subscriptionPrice: string;
  oneTimePrice?: string;
}

export default function StickyMobileCTA({ product, subscriptionPrice, oneTimePrice }: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    // Show sticky bar after scrolling past hero
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Fake social proof counter
    const base = Math.floor(Math.random() * 8) + 3;
    setViewers(base);
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.6 ? 1 : -1;
        return Math.max(2, Math.min(15, prev + change));
      });
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Social proof badge */}
      <div className="bg-[var(--color-accent)] text-[var(--color-text)] text-[10px] font-bold text-center py-1">
        🔥 {viewers} mensen bekijken dit product nu — nog {Math.floor(Math.random() * 3) + 1} beschikbaar met korting
      </div>

      {/* Sticky CTA bar */}
      <div className="bg-white border-t border-[var(--color-border)] px-4 py-3 flex items-center gap-3 shadow-lg">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
            {subscriptionPrice}/maand
          </div>
          <div className="text-[9px] text-[var(--color-text-muted)]">
            30 dagen geld-terug garantie
          </div>
        </div>
        <AffiliateCTA
          label="Bestel nu →"
          product={product}
          variant="primary"
          className="!px-6 !py-3 !text-sm whitespace-nowrap"
        />
      </div>
    </div>
  );
}
