"use client";

import { useState } from "react";
import { Mail, ArrowRight, User, CheckCircle2 } from "lucide-react";

export default function LeadForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setIsLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          source: "brand-partner-lead",
          phone: phone || undefined,
        }),
      });
      setSubmitted(true);
    } catch {}
    setIsLoading(false);
  };

  return (
    <>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-xl max-w-md mx-auto space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Je naam"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
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
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📱</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefoonnummer (optioneel)"
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--color-accent)] text-white rounded-xl font-bold hover:opacity-90 transition-all text-lg shadow-lg"
          >
            {isLoading ? "Even wachten..." : "Stuur mij alle info →"}
            {!isLoading && <ArrowRight size={20} />}
          </button>
          <p className="text-[10px] text-gray-400 text-center">
            🔒 Vrijblijvend. We delen je gegevens nooit met derden.
          </p>
        </form>
      ) : (
        <div className="bg-white rounded-2xl p-10 shadow-xl max-w-md mx-auto text-center animate-fade-in">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-xl font-bold font-cormorant text-gray-800 mb-2">Bedankt! 🎉</h3>
          <p className="text-sm text-gray-500">
            We sturen alle info over het Brand Partner programma naar <strong>{email}</strong>. Houd je inbox in de gaten!
          </p>
        </div>
      )}
    </>
  );
}
