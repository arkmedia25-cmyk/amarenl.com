"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function FloatingMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Sayfa 500px aşağı kayınca butonu göster
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[90] md:hidden animate-slide-up">
      <a
        href="#products"
        className="flex items-center justify-between w-full p-4 bg-[var(--color-primary)] text-white rounded-2xl shadow-2xl shadow-[var(--color-primary)]/40 font-bold"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <ShoppingBag size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-80 leading-none mb-1">Speciale Aanbieding</span>
            <span className="text-sm">Bekijk Producten (€8 Korting)</span>
          </div>
        </div>
        <ArrowRight size={20} />
      </a>
    </div>
  );
}
