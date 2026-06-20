"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/schema";

interface Question {
  q: string;
  options: { label: string; points: Record<string, number> }[];
}

const questions: Question[] = [
  {
    q: "Wat is je grootste uitdaging op dit moment?",
    options: [
      { label: "😴 Altijd moe, weinig energie", points: { energy: 3, essentials: 2 } },
      { label: "😰 Stress, piekeren, slecht slapen", points: { mentaal: 3, darmen: 1 } },
      { label: "🫃 Opgeblazen buik, spijsverteringsklachten", points: { darmen: 3, essentials: 1 } },
      { label: "💇 Dunner wordend haar, broze nagels, huid", points: { schoonheid: 3, essentials: 1 } },
      { label: "⚖️ Moeite met gewicht/afvallen", points: { gewicht: 3, energy: 1 } },
    ],
  },
  {
    q: "Hoe ziet je dagelijkse voeding eruit?",
    options: [
      { label: "🍎 Gevarieerd, veel groenten en fruit", points: { essentials: 1, energy: 1 } },
      { label: "🥪 Redelijk, maar kan beter", points: { essentials: 2, darmen: 1 } },
      { label: "🍕 Onregelmatig, vaak bewerkt voedsel", points: { essentials: 3, darmen: 2, energy: 1 } },
      { label: "🌱 Plantaardig/veganistisch", points: { essentials: 3, energy: 1, schoonheid: 1 } },
    ],
  },
  {
    q: "Hoeveel stress ervaar je in je dagelijkse leven?",
    options: [
      { label: "😊 Weinig — ik kan goed ontspannen", points: { essentials: 1 } },
      { label: "😐 Gemiddeld — soms lastig loslaten", points: { mentaal: 2, darmen: 1 } },
      { label: "😰 Veel — voel me vaak opgejaagd", points: { mentaal: 3, darmen: 2, energy: 1 } },
      { label: "🔥 Extreem — sta onder hoogspanning", points: { mentaal: 3, darmen: 3, energy: 2 } },
    ],
  },
  {
    q: "Gebruik je al supplementen?",
    options: [
      { label: "❌ Nee, nooit", points: { essentials: 3 } },
      { label: "🌿 Af en toe een multivitamine", points: { essentials: 2 } },
      { label: "💊 Ja, meerdere supplementen dagelijks", points: { mentaal: 1, energy: 1 } },
      { label: "🏋️ Vooral sportsupplementen", points: { energy: 2, essentials: 1 } },
    ],
  },
  {
    q: "Wat merk je aan je lichaam sinds je ouder wordt (of door levensstijl)?",
    options: [
      { label: "🔋 Minder energie dan vroeger", points: { energy: 2, essentials: 2 } },
      { label: "🪞 Huid, haar of nagels veranderen zichtbaar", points: { schoonheid: 3 } },
      { label: "🧠 Minder scherp, vergeetachtiger", points: { mentaal: 2, darmen: 1 } },
      { label: "💪 Minder spierkracht, sneller blessures", points: { essentials: 2, schoonheid: 1 } },
    ],
  },
];

const recommendations: Record<string, { name: string; slug: string; desc: string; url: string }> = {
  energy: { name: "Energy+", slug: "energy", desc: "Natuurlijke energie zonder cafeïnecrash — ondersteunt je mitochondriën voor de hele dag.", url: "/energy" },
  mentaal: { name: "Happy Juice Pack", slug: "happy-juice-pack", desc: "De #1 bestseller: energie, focus en stemming in één pakket via de gut-brain connectie.", url: "/happy-juice-pack" },
  darmen: { name: "MentaBiotics + Restore", slug: "mentabiotics", desc: "Probiotica voor de darm-hersen-as en spijsverteringsenzymen — de basis van je welzijn.", url: "/darmgezondheid" },
  schoonheid: { name: "HL5 Collageen", slug: "hl5", desc: "5g gehydrolyseerd collageen per dag voor huid, haar en nagels — van binnenuit stralen.", url: "/hl5" },
  essentials: { name: "Sunrise", slug: "sunrise", desc: "22 superfoods + 9 vitaminen — jouw complete dagelijkse basis in één drankje.", url: "/sunrise" },
  gewicht: { name: "Origin + FIT20", slug: "origin", desc: "Plantaardige eiwitshake en metabolisme-ondersteuning voor gezond gewichtsbeheer.", url: "/gewichtsbeheer" },
};

export default function SupplementenWijzerPage() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = useCallback((points: Record<string, number>) => {
    const newScores = { ...scores };
    for (const [k, v] of Object.entries(points)) {
      newScores[k] = (newScores[k] || 0) + v;
    }
    setScores(newScores);
    setStep(step + 1);
  }, [scores, step]);

  const getTopRecommendations = () => {
    const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
    return sorted.slice(0, 3).map(([key]) => recommendations[key]).filter(Boolean);
  };

  const handleSubmit = async () => {
    if (!email || submitted) return;
    setSubmitted(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "supplementenwijzer" }),
      });
    } catch {}
  };

  const top3 = step >= questions.length ? getTopRecommendations() : [];

  return (
    <>
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Supplementenwijzer", url: "/supplementenwijzer" }])} id="wijzer-schema" />

      <section className="py-12 md:py-20 bg-[var(--color-bg-soft)]">
        <div className="container-page max-w-2xl text-center">
          {step === 0 && (
            <>
              <h1 className="text-3xl md:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4">
                Ontdek Jouw <span className="text-[var(--color-primary)]">Ideale Supplementen</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] mb-8">
                Beantwoord 5 vragen en ontvang een persoonlijk advies — volledig gratis.
              </p>
              <div className="flex justify-center gap-4 mb-8 text-sm text-[var(--color-text-muted)]">
                <span>⏱ 2 minuten</span>
                <span>·</span>
                <span>🆓 Gratis</span>
                <span>·</span>
                <span>🔒 Geen verplichtingen</span>
              </div>
              <button
                onClick={() => setStep(1)}
                className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-full text-lg font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                Start de test →
              </button>
              <p className="mt-4 text-xs text-[var(--color-text-muted)]">Al 10.000+ mensen gingen je voor</p>
            </>
          )}

          {step > 0 && step <= questions.length && (
            <div>
              <div className="flex gap-1 mb-8 justify-center">
                {questions.map((_, i) => (
                  <div key={i} className={`h-1.5 w-10 rounded-full transition-colors ${i < step ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"}`} />
                ))}
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-2">Vraag {step} van {questions.length}</p>
              <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">
                {questions[step - 1].q}
              </h2>
              <div className="space-y-3">
                {questions[step - 1].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.points)}
                    className="w-full text-left px-6 py-4 bg-white rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-md transition-all text-[var(--color-text)] font-medium"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step > questions.length && (
            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] mb-2">
                Jouw Persoonlijke Advies
              </h2>
              <p className="text-[var(--color-text-muted)] mb-8">Op basis van jouw antwoorden raden wij deze producten aan:</p>

              <div className="space-y-4 mb-10">
                {top3.map((rec, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-[var(--color-border)] text-left hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</span>
                      <div>
                        <h3 className="font-bold text-lg text-[var(--color-text)]">{rec.name}</h3>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">{rec.desc}</p>
                        <Link href={rec.url} className="inline-block mt-3 text-sm font-bold text-[var(--color-primary)] hover:underline">
                          Bekijk {rec.name} →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!submitted ? (
                <div className="bg-white rounded-xl p-6 border border-[var(--color-accent)] max-w-md mx-auto">
                  <h3 className="font-bold text-[var(--color-text)] mb-2">📩 Ontvang je €8 welkomstkorting</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-4">Laat je e-mail achter en ontvang direct €8 korting op je eerste bestelling.</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jouw@email.nl"
                      className="flex-1 px-4 py-2.5 rounded-lg border border-[var(--color-border)] text-sm"
                    />
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg text-sm font-bold hover:opacity-90"
                    >
                      Claim €8
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 rounded-xl p-6 border border-green-200 max-w-md mx-auto">
                  <p className="text-green-700 font-bold">✅ Gelukt! Check je e-mail voor je €8 kortingscode.</p>
                </div>
              )}

              <button onClick={() => { setStep(0); setScores({}); setSubmitted(false); setEmail(""); }} className="mt-6 text-sm text-[var(--color-primary)] hover:underline">
                ↻ Opnieuw doen
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-xl font-cormorant font-bold text-[var(--color-text)] mb-3">Waarom deze test?</h2>
          <p className="text-sm text-[var(--color-text-muted)] max-w-lg mx-auto">
            Elke persoon is uniek. Wat voor een ander werkt, werkt niet per se voor jou. Met deze korte test helpen we je de supplementen te vinden die aansluiten bij jouw specifieke behoeften — wetenschappelijk onderbouwd, gemaakt met natuurlijke ingrediënten.
          </p>
          <p className="mt-6 text-[9px] text-[var(--color-text-muted)]">
            * Voedingssupplementen. Geen geneesmiddel. Raadpleeg een arts bij gezondheidsklachten. Je e-mail wordt alleen gebruikt voor je kortingscode.
          </p>
        </div>
      </section>
    </>
  );
}
