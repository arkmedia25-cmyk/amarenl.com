"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { homeFaqs } from "@/lib/faq-home";

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
          {homeFaqs.map((faq, index) => (
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
