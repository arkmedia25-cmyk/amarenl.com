"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Zijn de producten van Amare origineel?",
    answer: "Ja, absoluut. AmareNL is een onafhankelijke partner van Amare Global. Wanneer je op de bestelknop klikt, word je rechtstreeks naar de officiële Amare.com website geleid om je aankoop veilig te voltooien."
  },
  {
    question: "Hoe werkt de 30-dagen 'lege verpakking' garantie?",
    answer: "Amare gelooft zo sterk in hun producten dat ze een unieke garantie bieden: als je na 30 dagen geen resultaat ziet, kun je de verpakking (zelfs als deze leeg is) terugsturen en je geld terugkrijgen. Geen vragen gesteld."
  },
  {
    question: "Hoe claim ik mijn €8 welkomstkorting?",
    answer: "Heel eenvoudig! Schrijf je in via ons nieuwsbriefformulier op deze pagina. Je ontvangt dan direct een persoonlijke kortingscode in je e-mail die je kunt gebruiken bij je eerste bestelling op de Amare website."
  },
  {
    question: "Wat zijn de verzendkosten naar Nederland?",
    answer: "Bij bestellingen boven de €175 geniet je van gratis verzending binnen Nederland. Voor kleinere bestellingen worden de standaard verzendtarieven van Amare toegepast tijdens het afrekenen."
  },
  {
    question: "Hoe lang duurt de levering?",
    answer: "Omdat de producten rechtstreeks vanuit het Amare magazijn in Europa worden verzonden, kun je rekenen op een levertijd van 3 tot 5 werkdagen."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="container-page max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Veelgestelde Vragen
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Alles wat je moet weten over bestellen, garantie en levering.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--color-bg-soft)] transition-colors"
              >
                <span className="font-bold text-[var(--color-text)] pr-8">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-[var(--color-primary)] shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-[var(--color-text-muted)] shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-6 pt-0 text-[var(--color-text-muted)] text-sm leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
