"use client";

import { useState, useEffect } from "react";
import { isReturnVisitor, getAmareUrl, storeAffiliateVisit } from "@/lib/affiliate";
import { ArrowRight, X } from "lucide-react";

/**
 * Geri Dönen Ziyaretçi Banner'ı (Katman 3)
 *
 * Daha önce amarenl.com'u ziyaret etmiş kullanıcılara
 * sayfanın üstünde özel bir karşılama banner'ı gösterir.
 * "Amare'ye devam et →" butonuyla hızlı yönlendirme.
 */
export default function ReturnVisitorBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isReturnVisitor()) {
      setVisible(true);
    }
  }, []);

  const handleGo = () => {
    storeAffiliateVisit();
    window.open(getAmareUrl(), "_blank", "noopener noreferrer");
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white py-3 px-4 font-nunito animate-slide-up">
      <div className="container-page flex items-center justify-between gap-4">
        <p className="text-sm font-medium flex-1 text-center sm:text-left">
          Welkom terug! Verder winkelen bij Amare?
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleGo}
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-5 py-1.5 rounded-full text-sm font-bold hover:opacity-90 transition-all whitespace-nowrap"
          >
            Ja, ga naar Amare
            <ArrowRight size={14} />
          </button>
          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white transition-colors flex-shrink-0"
            aria-label="Sluiten"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
