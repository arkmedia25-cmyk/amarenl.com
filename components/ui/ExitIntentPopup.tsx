"use client";

import { useState, useEffect } from "react";
import { X, Gift, ArrowRight } from "lucide-react";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Daha önce gösterildiyse tekrar gösterme
    const dismissed = localStorage.getItem("exit-popup-dismissed");
    if (dismissed) return;

    const handleMouseOut = (e: MouseEvent) => {
      // Fare sayfanın üst sınırını geçtiğinde (çıkış niyeti)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseout", handleMouseOut);
    return () => document.removeEventListener("mouseout", handleMouseOut);
  }, [hasShown]);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("exit-popup-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl animate-slide-up">
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X size={20} className="text-gray-400" />
        </button>

        <div className="grid md:grid-cols-5">
          {/* Accent Side */}
          <div className="hidden md:flex md:col-span-2 bg-[var(--color-primary)] items-center justify-center p-8">
            <Gift size={80} className="text-white opacity-20" />
          </div>

          {/* Content Side */}
          <div className="md:col-span-3 p-8 md:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full text-[10px] font-bold uppercase tracking-widest">
              Wacht even!
            </div>
            <h2 className="text-3xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">
              Je laat <span className="text-[var(--color-primary)]">€8 korting</span> liggen...
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-8">
              Meld je aan voor onze nieuwsbrief en ontvang direct je persoonlijke kortingscode voor je eerste bestelling.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                // Burada newsletter form mantığı çalışacak
                closePopup();
                window.location.href = "#newsletter";
              }}
              className="space-y-4"
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
                Claim mijn korting
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={closePopup}
                className="w-full text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors underline underline-offset-4"
              >
                Nee bedankt, ik betaal liever de volle prijs
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
