import type { Metadata } from "next";
import { Mail, MessageCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Klantenservice — AmareNL",
  description:
    "Heb je vragen over Amare producten, je bestelling of wil je persoonlijk advies? Neem contact op met AmareNL. Wij helpen je graag verder.",
};

export default function Contact() {
  return (
    <div className="bg-white min-h-screen font-nunito">
      {/* Hero */}
      <section className="bg-[var(--color-bg-soft)] py-16 md:py-24 border-b border-[var(--color-border)]">
        <div className="container-page max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Contact & Klantenservice
          </h1>
          <p className="text-sm md:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-xl mx-auto">
            Heb je een vraag? Wij helpen je graag. Of het nu gaat om productadvies, bestelinformatie of algemene vragen — stuur ons een bericht.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
                Stuur ons een bericht
              </h2>
              <form className="space-y-5" name="contact" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-[var(--color-text)] mb-1.5">
                    Naam *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                    placeholder="Jouw naam"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-[var(--color-text)] mb-1.5">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                    placeholder="jouw@email.nl"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-[var(--color-text)] mb-1.5">
                    Onderwerp
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                  >
                    <option value="">Kies een onderwerp</option>
                    <option value="productadvies">Productadvies</option>
                    <option value="bestelling">Vraag over bestellen</option>
                    <option value="samenwerking">Samenwerking</option>
                    <option value="algemeen">Algemene vraag</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-[var(--color-text)] mb-1.5">
                    Bericht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all resize-none"
                    placeholder="Waar kunnen wij je mee helpen?"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="mt-1 accent-[var(--color-primary)]"
                  />
                  <label htmlFor="privacy" className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    Ik ga akkoord met het{" "}
                    <a href="/privacy-beleid/" className="text-[var(--color-primary)] hover:underline">
                      privacybeleid
                    </a>{" "}
                    en begrijp dat mijn gegevens worden gebruikt om mijn vraag te beantwoorden.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[var(--color-primary)] text-white rounded-full text-sm font-bold hover:opacity-90 transition-all"
                >
                  Verstuur bericht
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">
                  Contactgegevens
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                  Wij streven ernaar om binnen 24 uur te reageren op werkdagen.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-[var(--color-primary)]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text)] text-sm mb-1">E-mail</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Stuur ons een e-mail via het contactformulier of direct op{" "}
                      <a href="mailto:info@amarenl.com" className="text-[var(--color-primary)] hover:underline">
                        info@amarenl.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-[var(--color-primary)]">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text)] text-sm mb-1">Social media</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Volg ons op Instagram en Facebook voor tips, aanbiedingen en het laatste nieuws over Amare producten.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 text-[var(--color-primary)]">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--color-text)] text-sm mb-1">Responstijd</h3>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Wij reageren doorgaans binnen 24 uur op werkdagen. In het weekend kan het iets langer duren.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ quick links */}
              <div className="p-6 rounded-3xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
                <h3 className="font-bold text-[var(--color-text)] mb-3">Veelgestelde vragen</h3>
                <ul className="space-y-2 text-xs text-[var(--color-text-muted)]">
                  <li>
                    <span className="font-bold text-[var(--color-text)]">Bestellen:</span> Je bestelt via de officiële Amare.com website. Klik op &quot;Bestel bij Amare&quot; bij een product.
                  </li>
                  <li>
                    <span className="font-bold text-[var(--color-text)]">Verzending:</span> Gratis verzending vanaf €175. Levering binnen 3-5 werkdagen in Nederland.
                  </li>
                  <li>
                    <span className="font-bold text-[var(--color-text)]">Retourneren:</span> 30 dagen geld-terug-garantie via Amare Global.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
