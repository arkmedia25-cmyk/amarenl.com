"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  image: string;
  imageAlt: string;
  badge: string;
  title: string;
  subtitle: string;
  price: string;
  cta: string;
  href: string;
  bgFrom: string;
  bgTo: string;
}

// Belangrijkste producten — zie CLAUDE.md sectie 27: Triangle of Wellness Xtreme stond
// ondervertegenwoordigd op de site en moet hier prominent (als eerste slide) meedraaien.
const slides: Slide[] = [
  {
    id: "triangle-of-wellness",
    image:
      "https://amarecdn.azureedge.net/webassets/web/prod/products/Triangle-of-Wellness-Xtreme2-EU-800_25.jpg",
    imageAlt: "Amare Triangle of Wellness Xtreme — Sunrise, Nitro Xtreme en Sunset dag-nacht pakket",
    badge: "🔥 MEEST COMPLEET",
    title: "Triangle of Wellness Xtreme",
    subtitle: "Sunrise ☀️ + Nitro Xtreme ⚡ + Sunset 🌙 — compleet dag-nacht systeem",
    price: "vanaf €123,55/maand",
    cta: "Bekijk het pakket",
    href: "/triangle-of-wellness-xtreme",
    bgFrom: "#6B4C8C",
    bgTo: "#C8A951",
  },
  {
    id: "happy-juice-pack",
    image: "https://amarecdn.azureedge.net/webassets/web/prod/products/HJ_mango-EU-800_25.jpg",
    imageAlt: "Amare Happy Juice Pack",
    badge: "⭐ MEEST POPULAIR",
    title: "Happy Juice Pack®",
    subtitle: "Complete gut-brain ondersteuning — energie, stemming & focus in één pakket",
    price: "vanaf €155,33/maand",
    cta: "Ontdek Happy Juice",
    href: "/happy-juice-pack",
    bgFrom: "#9B7FBE",
    bgTo: "#6B4C8C",
  },
  {
    id: "hl5-collageen",
    image: "/images/products/hl5-2pack.jpg",
    imageAlt: "Amare HL5 vloeibare collageen",
    badge: "💧 BESTE COLLAGEEN",
    title: "HL5™ Vloeibare Collageen",
    subtitle: "3x betere opname dan poeder — huid, haar, nagels & gewrichten",
    price: "vanaf €77,28/maand",
    cta: "Bestel HL5",
    href: "/hl5",
    bgFrom: "#C88080",
    bgTo: "#C8A951",
  },
  {
    id: "mentabiotics",
    image: "https://amarecdn.azureedge.net/webassets/web/prod/products/Amare-Mentabiotics-EU-800.jpg",
    imageAlt: "Amare MentaBiotics",
    badge: "🧠 DARM-BREIN AS",
    title: "MentaBiotics®",
    subtitle: "Cerebiome® probiotica voor stemming, stress en mentale veerkracht",
    price: "vanaf €71,83/maand",
    cta: "Ontdek MentaBiotics",
    href: "/mentabiotics",
    bgFrom: "#4C8C6B",
    bgTo: "#9B7FBE",
  },
  {
    id: "sunset-omega",
    image: "https://amarecdn.azureedge.net/webassets/web/prod/products/Sunset-EU-800.jpg",
    imageAlt: "Amare Sunset omega-3 avondformule",
    badge: "🌙 AVONDHERSTEL",
    title: "Amare Sunset",
    subtitle: "Vloeibare omega-3 druppels voor hart, hersenen en gewrichten",
    price: "vanaf €67,50/maand",
    cta: "Bestel Sunset",
    href: "/sunset",
    bgFrom: "#C8A951",
    bgTo: "#C88040",
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
          {/* Enkel de actieve slide staat in de DOM — geen extra netwerk/laadwerk voor de
              overige slides totdat de bezoeker (of de auto-advance timer) ze bereikt. */}
          <div className="relative z-10 px-5 py-6 md:px-10 md:py-8 flex flex-col md:flex-row items-center gap-5 md:gap-8 min-h-[160px] md:min-h-[120px]">
            <Link
              href={slide.href}
              className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-2xl bg-white/95 shadow-lg overflow-hidden"
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                sizes="96px"
                className="object-contain p-2"
              />
            </Link>

            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-full mb-2">
                {slide.badge}
              </span>
              <h3 className="text-lg md:text-xl font-cormorant font-bold text-white mb-1 leading-tight">
                {slide.title}
              </h3>
              <p className="text-xs md:text-sm text-white/80 mb-1">{slide.subtitle}</p>
              <p className="text-xs md:text-sm text-white font-semibold">{slide.price}</p>
            </div>

            <Link
              href={slide.href}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full text-sm font-bold hover:bg-white/90 transition-all shadow-lg"
              style={{ color: "#6B4C8C" }}
            >
              {slide.cta}
              <ArrowRight size={16} />
            </Link>
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
