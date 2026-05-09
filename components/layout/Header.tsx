"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-[60] transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-md py-2" 
          : "bg-white py-4"
      }`}
    >
      <div className="container-page flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold font-cormorant text-[var(--color-primary)]">
          AmareNL
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            ["Mentale Wellness", "/supplementen/"],
            ["Gewichtsbeheer", "/gewichtsbeheer/"],
            ["Schoonheid", "/schoonheid/"],
            ["Blog", "/blogs/nieuws"],
          ].map(([label, href]) => (
            <Link 
              key={label}
              href={href} 
              className="text-sm font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#newsletter"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-full text-sm font-bold hover:opacity-90 transition-all"
          >
            Claim €8 Korting
            <ArrowRight size={16} />
          </a>
          
          <button 
            className="lg:hidden p-2 text-[var(--color-text)]" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] bg-white z-[70] animate-fade-in">
          <nav className="flex flex-col p-6 space-y-6">
            {[
              ["Mentale Wellness", "/supplementen/"],
              ["Gewichtsbeheer", "/gewichtsbeheer/"],
              ["Schoonheid", "/schoonheid/"],
            ["Blog", "/blogs/nieuws"],
            ["Over AmareNL", "/over-ons/"],
            ].map(([label, href]) => (
              <Link 
                key={label}
                href={href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-4"
              >
                {label}
              </Link>
            ))}
            <a
              href="#newsletter"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold"
            >
              Claim mijn €8 korting
              <ArrowRight size={20} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
