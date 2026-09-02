"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: React.ReactNode;
  description: string;
  price: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
}

// 3 vlaggenschip-producten — zie CLAUDE.md sectie 27/28. Elk slide krijgt zijn eigen
// beeld, kop en CTA; de vertrouwenssignalen (garantie/natuurlijk/sinds) en de
// €8-badge blijven bewust merk-breed en veranderen niet mee.
const slides: HeroSlide[] = [
  {
    id: "triangle-of-wellness",
    eyebrow: "🔥 Meest Compleet",
    headline: (
      <>
        Jouw Dag-Nacht <span className="text-[var(--color-primary)]">Systeem.</span>
      </>
    ),
    description:
      "Sunrise, Nitro Xtreme en Sunset — drie formules die je lichaam ondersteunen van je eerste ochtendroutine tot een rustige avond.",
    price: "vanaf €123,55/maand",
    cta: "Ontdek Triangle of Wellness",
    href: "/triangle-of-wellness-xtreme",
    image:
      "https://amarecdn.azureedge.net/webassets/web/prod/products/Triangle-of-Wellness-Xtreme2-EU-800_25.jpg",
    imageAlt: "Amare Triangle of Wellness Xtreme — Sunrise, Nitro Xtreme en Sunset",
  },
  {
    id: "happy-juice-pack",
    eyebrow: "⭐ Meest Populair",
    headline: (
      <>
        Herstel je Balans van <span className="text-[var(--color-primary)]">Binnenuit.</span>
      </>
    ),
    description:
      "Gezondheid begint in je darmen. Amare combineert eeuwenoude wijsheid met moderne wetenschap om je mentale veerkracht, energie en focus te optimaliseren.",
    price: "vanaf €155,33/maand",
    cta: "Ontdek Happy Juice Pack",
    href: "/happy-juice-pack",
    image: "https://amarecdn.azureedge.net/webassets/web/prod/products/HJ_mango-EU-800_25.jpg",
    imageAlt: "Amare Happy Juice Pack — mentale energie, stemming en focus",
  },
  {
    id: "hl5-collageen",
    eyebrow: "💧 Beste Collageen",
    headline: (
      <>
        Stralende Huid, Haar <span className="text-[var(--color-primary)]">& Nagels.</span>
      </>
    ),
    description:
      "Vloeibaar collageen met tot 90% opname binnen 6 uur — 3x beter dan poeder. Voor huid, haar, nagels én gewrichten, van binnenuit.",
    price: "vanaf €77,28/maand",
    cta: "Ontdek HL5",
    href: "/hl5",
    image: "/images/products/hl5-2pack.jpg",
    imageAlt: "Amare HL5 vloeibare collageen 2-pack",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrent(index);
    window.setTimeout(() => setIsTransitioning(false), 400);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = window.setInterval(next, 5000);
    return () => window.clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[var(--color-bg-soft)]">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-primary)] opacity-[0.03] rounded-l-[100px] hidden lg:block" />

      <div className="container-page relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left Content */}
        <div key={slide.id} className="max-w-2xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} />
            {slide.eyebrow}
          </div>

          <h1 className="text-5xl md:text-7xl font-cormorant font-bold text-[var(--color-text)] leading-[1.1] mb-8 min-h-[2.2em] lg:min-h-[2.4em]">
            {slide.headline}
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-4 leading-relaxed max-w-lg min-h-[5.5em] md:min-h-[4.5em]">
            {slide.description}
          </p>

          <p className="text-sm font-bold text-[var(--color-primary)] mb-6">{slide.price}</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href={slide.href}
              className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-lg shadow-xl"
            >
              {slide.cta}
              <ArrowRight size={20} />
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  disabled={isTransitioning}
                  aria-label={`Toon ${s.id}`}
                  aria-current={i === current}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "28px" : "10px",
                    height: "10px",
                    background: i === current ? "var(--color-accent)" : "var(--color-border)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[var(--color-border)]">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold font-cormorant text-[var(--color-primary)]">30 Dagen</span>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold">Geld Terug Garantie</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold font-cormorant text-[var(--color-primary)]">100%</span>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold">Natuurlijke Basis</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold font-cormorant text-[var(--color-primary)]">2016</span>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold">Premium Supplementen</span>
            </div>
          </div>
        </div>

        {/* Right Imagery — rotating */}
        <div className="relative">
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white transform lg:rotate-3 hover:rotate-0 transition-transform duration-1000 aspect-square lg:aspect-auto lg:h-[600px]">
            {slides.map((s, i) => (
              <Link
                key={s.id}
                href={s.href}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
                aria-hidden={i !== current}
                tabIndex={i === current ? 0 : -1}
              >
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </Link>
            ))}
          </div>

          {/* Slide arrows */}
          <button
            onClick={prev}
            aria-label="Vorig product"
            className="hidden lg:flex absolute top-1/2 -left-5 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-bg-soft)] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Volgend product"
            className="hidden lg:flex absolute top-1/2 -right-5 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-bg-soft)] transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          {/* Floating Badge */}
          <div className="absolute -top-10 -right-10 z-20 bg-white p-8 rounded-full shadow-2xl animate-bounce-slow hidden xl:block border border-[var(--color-border)]">
            <div className="text-center">
              <span className="block text-4xl font-bold font-cormorant text-[var(--color-primary)]">€8</span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-muted)]">Korting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
