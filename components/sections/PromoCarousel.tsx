"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Flame, Droplets, Leaf } from "lucide-react";
import { AMARE_BASE, getAmareUrl, storeAffiliateVisit } from "@/lib/affiliate";

interface Slide {
  id: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  isExternal: boolean;
  bgFrom: string;
  bgTo: string;
}

const slides: Slide[] = [
  {
    id: "mei-verzending",
    icon: <Flame size={18} />,
    badge: "MEI 2026",
    title: "Gratis verzending vanaf €175 + 10% abonnementskorting",
    subtitle: "Schrijf je in en ontvang elke maand extra voordeel",
    cta: "Bekijk aanbieding",
    href: AMARE_BASE,
    isExternal: true,
    bgFrom: "#6B4C8C",
    bgTo: "#C8A951",
  },
  {
    id: "sunset-omega",
    icon: <Droplets size={18} />,
    badge: "NIEUW — OMEGA-3",
    title: "Amare Sunset: dagelijkse omega-3 druppels",
    subtitle: "Vloeibare omega-3 voor hart, hersenen en gewrichten",
    cta: "Bestel Sunset",
    href: getAmareUrl("sunset"),
    isExternal: true,
    bgFrom: "#C8A951",
    bgTo: "#C88040",
  },
  {
    id: "rootist",
    icon: <Leaf size={18} />,
    badge: "NIEUW — HAARVERZORGING",
    title: "The Rootist: Roots Transformation Pack",
    subtitle: "Complete biotische haarverzorging voor sterker en voller haar",
    cta: "Bestel Rootist",
    href: getAmareUrl("roots-transformation-pack"),
    isExternal: true,
    bgFrom: "#6B8C6B",
    bgTo: "#4A7C4F",
  },
];

export default function PromoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const handleClick = () => {
    if (slide.isExternal) {
      storeAffiliateVisit();
    }
  };

  return (
    <section className="bg-white py-4 md:py-6 font-nunito overflow-hidden">
      <div className="container-page max-w-5xl">
        <div
          className="relative rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${slide.bgFrom}, ${slide.bgTo})`,
            transition: "background 0.7s ease-in-out",
            boxShadow: "0 4px 24px rgba(107, 76, 140, 0.12)",
          }}
        >
          <div className="relative z-10 px-6 py-8 md:px-12 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[120px] md:min-h-[100px]">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full mb-3">
                {slide.icon}
                {slide.badge}
              </span>
              <h3 className="text-lg md:text-xl font-cormorant font-bold text-white mb-1 leading-tight">
                {slide.title}
              </h3>
              <p className="text-xs md:text-sm text-white/80">
                {slide.subtitle}
              </p>
            </div>

            {slide.isExternal ? (
              <a
                href={slide.href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                onClick={handleClick}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-sm font-bold hover:bg-white/90 transition-all shadow-lg"
                style={{ color: "#6B4C8C" }}
              >
                {slide.cta}
                <ArrowRight size={16} />
              </a>
            ) : (
              <Link
                href={slide.href}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-sm font-bold hover:bg-white/90 transition-all shadow-lg"
                style={{ color: "#6B4C8C" }}
              >
                {slide.cta}
                <ArrowRight size={16} />
              </Link>
            )}
          </div>

          <button
            onClick={prev}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white items-center justify-center transition-all"
            aria-label="Vorige"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white items-center justify-center transition-all"
            aria-label="Volgende"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
