"use client";

import { useState, useEffect } from "react";
import { X, Gift, ArrowRight, Download } from "lucide-react";

interface LeadPopupProps {
  /** Which trigger to use */
  trigger: "timed" | "scroll" | "exit";
  /** Delay in ms for timed trigger */
  delay?: number;
  /** Scroll percentage for scroll trigger (0-100) */
  scrollPercent?: number;
}

export default function LeadPopup({ trigger, delay = 10000, scrollPercent = 50 }: LeadPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("lead-popup-dismissed");
    if (dismissed) return;

    if (trigger === "timed") {
      const timer = setTimeout(() => {
        if (!hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
        }
      }, delay);
      return () => clearTimeout(timer);
    }

    if (trigger === "scroll") {
      const handleScroll = () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrolled >= scrollPercent && !hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
        }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    if (trigger === "exit") {
      const handleMouseOut = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
        }
      };
      document.addEventListener("mouseout", handleMouseOut);
      return () => document.removeEventListener("mouseout", handleMouseOut);
    }
  }, [trigger, delay, scrollPercent, hasTriggered]);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("lead-popup-dismissed", "true");
  };

  const handleSubmit = async () => {
    if (!email.includes("@")) return;
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `popup-${trigger}` }),
      });
      setSubmitted(true);
    } catch {}
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
        <button onClick={closePopup} className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--color-primary)]/10 rounded-full mb-4">
                {trigger === "exit" ? <Gift size={28} className="text-[var(--color-primary)]" /> : <Download size={28} className="text-[var(--color-primary)]" />}
              </div>
              <h2 className="text-xl font-cormorant font-bold text-[var(--color-text)] mb-2">
                {trigger === "exit" ? "Wacht! Claim je €8 korting" : "Gratis Supplementen Gids"}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                {trigger === "exit"
                  ? "Ontvang €8 korting op je eerste bestelling + gratis supplementen advies per e-mail."
                  : "Ontdek welke supplementen écht bij jou passen. Direct in je inbox."}
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.nl"
                className="flex-1 px-4 py-3 rounded-lg border border-[var(--color-border)] text-sm focus:outline-none focus:border-[var(--color-primary)]"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                {trigger === "exit" ? "Claim €8" : "Ontvang"} <ArrowRight size={16} />
              </button>
            </div>
            <p className="text-[9px] text-[var(--color-text-muted)] text-center mt-3">
              Geen spam. Je e-mail wordt alleen gebruikt voor je kortingscode en advies.
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">Gelukt!</h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Check je e-mail voor je kortingscode. 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
