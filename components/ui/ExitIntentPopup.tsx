"use client";

import { useState, useEffect } from "react";
import { X, Gift, ArrowRight, BookOpen, Mail, ShieldCheck } from "lucide-react";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("exit-popup-dismissed");
    if (dismissed) return;

    // 10-second minimum delay before activating
    const timer = setTimeout(() => {
      const handleMouseOut = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsVisible(true);
          document.removeEventListener("mouseout", handleMouseOut);
        }
      };
      document.addEventListener("mouseout", handleMouseOut);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("exit-popup-dismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source: "exit-intent" }),
      });
      if (res.ok) setSubmitted(true);
    } catch {}
    setIsLoading(false);
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
          <div className="hidden md:flex md:col-span-2 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-light)] items-center justify-center p-8">
            <div className="text-center text-white">
              <BookOpen size={64} className="mx-auto mb-3 opacity-90" />
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-70">Gratis Gids</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="md:col-span-3 p-8 md:p-10">
            {!submitted ? (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-200">
                  <Gift size={12} /> Wacht — Gratis Download
                </div>
                <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3 leading-tight">
                  Ontdek de <span className="text-[var(--color-primary)]">Gut-Brain Gids</span> + €8 korting
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">
                  ✓ De complete gids over je darm-brein connectie (PDF)
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">
                  ✓ Welk supplement past bij jouw klachten?
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Je voornaam"
                      className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jouw@email.nl"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--color-accent)] text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-[var(--color-accent)]/25"
                  >
                    {isLoading ? "Even wachten..." : "Stuur mij de gratis gids →"}
                    {!isLoading && <ArrowRight size={18} />}
                  </button>
                </form>
                <div className="flex items-center gap-2 mt-3 justify-center">
                  <ShieldCheck size={12} className="text-green-500" />
                  <p className="text-[10px] text-gray-400">Geen spam. Direct downloaden. Altijd afmelden mogelijk.</p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold font-cormorant text-[var(--color-text)] mb-2">Check je inbox! 📧</h2>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Je Gut-Brain Gids is onderweg naar <strong>{email}</strong>
                </p>
                <button onClick={closePopup} className="mt-4 text-xs text-[var(--color-primary)] underline">
                  Sluiten
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
