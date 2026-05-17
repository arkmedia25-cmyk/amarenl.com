import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[var(--color-bg-soft)]">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-primary)] opacity-[0.03] rounded-l-[100px] hidden lg:block" />
      
      <div className="container-page relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left Content */}
        <div className="max-w-2xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} />
            Ontdek de Wetenschap van Welzijn
          </div>
          
          <h1 className="text-5xl md:text-7xl font-cormorant font-bold text-[var(--color-text)] leading-[1.1] mb-8">
            Herstel je Balans van <span className="text-[var(--color-primary)]">Binnenuit.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-10 leading-relaxed max-w-lg">
            Gezondheid begint in je darmen. Amare combineert eeuwenoude wijsheid met moderne wetenschap om je mentale veerkracht, energie en focus te optimaliseren.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="#products" className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-lg">
              Bekijk Producten
              <ArrowRight size={20} />
            </Link>
            <Link href="#newsletter" className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 text-lg">
              Ontvang €8 Korting
            </Link>
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
              <span className="text-2xl font-bold font-cormorant text-[var(--color-primary)]">10K+</span>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] font-bold">Tevreden Klanten</span>
            </div>
          </div>
        </div>

        {/* Right Imagery */}
        <div className="relative animate-fade-in delay-200">
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white transform lg:rotate-3 hover:rotate-0 transition-transform duration-1000 aspect-square lg:aspect-auto lg:h-[600px]">
            <Image
              src="/images/hero-wellness.png"
              alt="Amare Wellness Science"
              fill
              priority
              className="object-cover"
            />
          </div>
          
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
