import { ShieldCheck, Truck, RefreshCcw, Star } from "lucide-react";

const trustItems = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Snelle Levering",
    desc: "Direct vanuit Amare Global",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Gecertificeerd",
    desc: "Natuurlijke Ingrediënten",
  },
  {
    icon: <RefreshCcw className="w-6 h-6" />,
    title: "30 Dagen Garantie",
    desc: "Niet goed? Geld terug",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Premium Kwaliteit",
    desc: "Wetenschappelijk getest",
  },
];

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-[var(--color-border)] py-8 relative z-30">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left group"
            >
              <div className="p-3 rounded-full bg-[var(--color-bg-soft)] text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-[var(--color-text)] text-sm md:text-base">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
