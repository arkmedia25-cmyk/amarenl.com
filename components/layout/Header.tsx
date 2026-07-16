"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";

const categoryLinks = [
  ["🚀 Startpakketten", "/pakketten/"],
  ["🧠 Mentale Wellness", "/supplementen/"],
  ["💧 Collageen", "/hl5"],
  ["🦠 Darmgezondheid", "/darmgezondheid/"],
  ["✨ Schoonheid", "/schoonheid/"],
  ["🌿 Essentials", "/essentials/"],
];

const productLinks = [
  { label: "⭐ Bestsellers", items: [
    ["Happy Juice Pack", "/happy-juice-pack"],
    ["HL5 Collageen", "/hl5"],
    ["Triangle of Wellness Xtreme", "/triangle-of-wellness-xtreme"],
    ["MentaBiotics", "/mentabiotics"],
  ]},
  { label: "Mentale Wellness", items: [
    ["EDGE+", "/edge-plus"],
    ["Energy+", "/energy"],
    ["Amare ON", "/on"],
    ["Nitro Xtreme", "/nitro-xtreme"],
  ]},
  { label: "Darmen & Digestie", items: [
    ["Restore", "/restore"],
    ["MentaBiotics", "/mentabiotics"],
  ]},
  { label: "Schoonheid", items: [
    ["HL5 Collageen", "/hl5"],
    ["Ignite for HER", "/ignite-for-her"],
  ]},
  { label: "Dagelijkse Essentials", items: [
    ["Sunrise", "/sunrise"],
    ["Sunset", "/sunset"],
    ["Origin", "/origin"],
    ["FIT20", "/fit20"],
  ]},
  { label: "🚀 Startpakketten", items: [
    ["Happy Lifestyle Pack Pro ⭐", "/happy-lifestyle-pack-pro"],
    ["Triangle Marketing Pack", "/triangle-marketing-pack"],
    ["Happy Lifestyle Pack Basic", "/happy-lifestyle-pack-basic"],
    ["→ Meer info & advies", "/pakketten/"],
  ]},
  { label: "Alle Producten", items: [
    ["→ Bekijk alle producten", "/essentials/"],
  ]},
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
    <header className={`sticky top-0 z-[60] transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md py-2" : "bg-white py-4"}`}>
      <div className="container-page flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold font-cormorant text-[var(--color-primary)]">AmareNL</Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {categoryLinks.map(([label, href]) => (
            <Link key={label} href={href} className="text-xs font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
              {label}
            </Link>
          ))}

          {/* Product Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-1 text-xs font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
              Producten <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-[var(--color-border)] rounded-xl shadow-lg py-3 min-w-[600px] z-50 grid grid-cols-3 gap-4 px-4">
                {productLinks.map((group) => (
                  <div key={group.label}>
                    <span className="block px-2 py-1 text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{group.label}</span>
                    {group.items.map(([label, href]) => (
                      <Link key={label} href={href} onClick={() => setIsDropdownOpen(false)} className="block px-2 py-1.5 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-primary)] rounded transition-colors">
                        {label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/blogs/nieuws" className="text-xs font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">Blog</Link>
          <Link href="/gratis-gut-brain-gids" className="text-xs font-bold text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors">🎁 Gratis Gids</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://www.amare.com/2075008/nl-nl" target="_blank" rel="nofollow noopener noreferrer" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-md">
            Bestel bij Amare <ArrowRight size={16} />
          </a>
          <button className="lg:hidden p-2 text-[var(--color-text)]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] bg-white z-[70] overflow-y-auto">
          <nav className="flex flex-col p-6 space-y-6">
            {categoryLinks.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-4">
                {label}
              </Link>
            ))}
            <div className="border-b border-[var(--color-border)] pb-4">
              <span className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Populaire Producten</span>
              <div className="mt-3 space-y-3">
                {["Happy Juice Pack","MentaBiotics","EDGE+","Energy+","HL5 Collageen","Triangle of Wellness Xtreme","Ignite for HER","Amare ON","Restore","Sunrise"].map(name => (
                  <Link key={name} href={productLinks.flatMap(g => g.items).find(([l]) => l === name)?.[1] || "/"} onClick={() => setIsMenuOpen(false)} className="block text-md font-bold text-[var(--color-text)] hover:text-[var(--color-primary)]">
                    {name}
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
              <Link key={label} href={href} onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-[var(--color-text)] border-b border-[var(--color-border)] pb-4">{label}</Link>
            ))}
            <a href="https://www.amare.com/2075008/nl-nl" target="_blank" rel="nofollow noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--color-accent)] text-white rounded-xl font-bold text-lg shadow-lg">
              Bestel bij Amare → <ArrowRight size={20} />
            </a>
            <a href="/gratis-gut-brain-gids" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-primary)] text-white rounded-xl font-bold">
              📖 Gratis Gut-Brain Gids
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
