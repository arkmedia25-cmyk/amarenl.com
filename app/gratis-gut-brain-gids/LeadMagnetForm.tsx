"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, User } from "lucide-react";

export default function LeadMagnetForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdpr, setGdpr] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    if (!gdpr) {
      alert("Je moet akkoord gaan met het privacybeleid om verder te gaan.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source: "gut-brain-gids" }),
      });
      if (res.ok) setSubmitted(true);
    } catch {}
    setIsLoading(false);
  };

  return (
    <>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl border border-[var(--color-border)] space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Je voornaam"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouw@email.nl"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>

          {/* GDPR Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer text-left">
            <input
              type="checkbox"
              checked={gdpr}
              onChange={(e) => setGdpr(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] shrink-0"
            />
            <span className="text-xs text-gray-500 leading-relaxed">
              Ik ga akkoord met het{" "}
              <a href="/privacy-beleid" className="text-[var(--color-primary)] underline">
                privacybeleid
              </a>{" "}
              en ontvang de gratis Gut-Brain Gids + optionele wellness tips per e-mail. Ik kan me op elk moment uitschrijven.
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--color-accent)] text-white rounded-xl font-bold hover:opacity-90 transition-all text-lg shadow-lg shadow-[var(--color-accent)]/25"
          >
            {isLoading ? "Even wachten..." : "Download de gratis gids →"}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-2xl p-10 shadow-xl border border-[var(--color-border)] text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h3 className="text-2xl font-bold font-cormorant text-[var(--color-text)] mb-3">
            Check je inbox! 📧
          </h3>
          <p className="text-[var(--color-text-muted)] mb-6">
            Je Gut-Brain Gids is onderweg naar <strong>{email}</strong>.
            Binnen een paar minuten staat hij in je inbox.
          </p>
          <p className="text-xs text-gray-400">
            Niets ontvangen? Check je spam-folder of probeer een ander e-mailadres.
          </p>
        </div>
      )}
    </>
  );
}
