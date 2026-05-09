"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, Tag } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Vul een geldig e-mailadres in");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <section className="py-24">
      <div className="container-page">
        <div className="relative overflow-hidden bg-[var(--color-bg-soft)] rounded-[40px] p-8 md:p-16 border border-[var(--color-border)]">
          {/* Decorative background circle */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-[var(--color-accent)] opacity-10 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-full text-xs font-bold uppercase tracking-widest">
                <Tag size={14} />
                Bespaar Direct
              </div>
              <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-6 leading-tight">
                Ontvang <span className="text-[var(--color-primary)]">€8 Korting</span> op je eerste bestelling
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg mb-8 max-w-md leading-relaxed">
                Schrijf je in voor onze nieuwsbrief en blijf op de hoogte van nieuwe producten, aanbiedingen en wellness tips.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-[var(--color-text)] font-medium">
                  <CheckCircle2 size={18} className="text-[var(--color-success)]" />
                  Direct je kortingscode in je inbox
                </li>
                <li className="flex items-center gap-3 text-sm text-[var(--color-text)] font-medium">
                  <CheckCircle2 size={18} className="text-[var(--color-success)]" />
                  Exclusieve toegang tot nieuwe productlanceringen
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-[var(--color-primary)]/5 border border-[var(--color-border)]">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-[var(--color-text)]">
                      Email Adres
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={20} />
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="jouw@email.nl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-4 bg-[var(--color-primary)] text-white rounded-xl font-bold hover:opacity-90 transition-opacity text-lg"
                  >
                    Claim mijn €8 korting
                    <ArrowRight size={20} />
                  </button>
                  <p className="text-[10px] text-[var(--color-text-muted)] text-center">
                    Door je in te schrijven ga je akkoord met ons privacybeleid. Je kunt je op elk moment weer uitschrijven.
                  </p>
                </form>
              ) : (
                <div className="text-center py-10 animate-fade-in">
                  <div className="w-20 h-20 bg-[var(--color-success)]/10 text-[var(--color-success)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold font-cormorant text-[var(--color-text)] mb-3">
                    Check je Inbox!
                  </h3>
                  <p className="text-[var(--color-text-muted)]">
                    We hebben je kortingscode naar <strong>{email}</strong> gestuurd. Veel plezier met je eerste bestelling!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

