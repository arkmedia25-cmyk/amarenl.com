"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";

const productLinks = [
  ["Happy Juice Pack", "/happy-juice-pack"],
  ["MentaBiotics", "/mentabiotics"],
  ["Energy+", "/energy"],
  ["HL5 Collageen", "/hl5"],
  ["Restore", "/restore"],
  ["Origin", "/origin"],
  ["Sunrise", "/sunrise"],
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            >
              {label}
            </Link>
          ))}

          {/* Product Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-sm font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            >
              Producten
              <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-[var(--color-border)] rounded-xl shadow-lg py-2 min-w-[200px] z-50">
                {productLinks.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blogs/nieuws"
            className="text-sm font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/blogs/nieuws/supplementen-wijzer-gratis"
            className="text-sm font-bold text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors"
          >
            Gratis Wijzer
          </Link>
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
        <div className="lg:hidden fixed inset-0 top-[70px] bg-white z-[70] animate-fade-in overflow-y-auto">
          <nav className="flex flex-col p-6 space-y-6">
            {[
              ["Mentale Wellness", "/supplementen/"],
              ["Gewichtsbeheer", "/gewichtsbeheer/"],
              ["Schoonheid", "/schoonheid/"],
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

            {/* Mobile Product Links */}
            <div className="border-b border-[var(--color-border)] pb-4">
              <span className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Populaire Producten</span>
              <div className="mt-3 space-y-3">
                {productLinks.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-md font-bold text-[var(--color-text)] hover:text-[var(--color-primary)]"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {[
              ["Blog", "/blogs/nieuws"],
              ["Over AmareNL", "/over-ons/"],
              ["Gratis Supplementen Wijzer", "/blogs/nieuws/supplementen-wijzer-gratis"],
              ["Ervaringen", "/blogs/nieuws/ervaringen-gebruikers-amare-supplementen"],
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
