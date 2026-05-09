import { Search, ShoppingBag, Zap } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-10 h-10" />,
    step: "01",
    title: "Kies je Behoefte",
    desc: "Of het nu gaat om meer energie, betere darmgezondheid of mentale focus — kies het product dat bij jou past.",
  },
  {
    icon: <ShoppingBag className="w-10 h-10" />,
    step: "02",
    title: "Bestel bij Amare",
    desc: "Wij sturen je direct naar de officiële Amare Global shop voor de meest verse producten en de beste prijzen.",
  },
  {
    icon: <Zap className="w-10 h-10" />,
    step: "03",
    title: "Voel de Transformatie",
    desc: "Ervaar binnen 30 dagen het verschil in je energie en stemming. Wetenschappelijk bewezen resultaten.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Hoe het Werkt
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            Jouw weg naar een gezonder en energieker leven in drie simpele stappen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-[var(--color-border)] -translate-y-1/2 z-0" />
          
          {steps.map((item, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-white border-2 border-[var(--color-border)] flex items-center justify-center text-[var(--color-primary)] mb-8 group-hover:border-[var(--color-primary)] group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-[var(--color-primary)]/10">
                {item.icon}
              </div>
              <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-4 bg-[var(--color-accent)] text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center">
                {item.step}
              </div>
              <h3 className="text-2xl font-bold font-cormorant text-[var(--color-text)] mb-4">
                {item.title}
              </h3>
              <p className="text-[var(--color-text-muted)] leading-relaxed px-4">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
