import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sanne de Vries",
    role: "Geverifieerde Klant",
    text: "Sinds ik het Happy Juice Pack gebruik, voel ik me zoveel energieker. De mist in mijn hoofd is weg en ik kan me veel beter focussen op mijn werk.",
    rating: 5,
  },
  {
    name: "Mark Jansen",
    role: "Geverifieerde Klant",
    text: "Ik was sceptisch over de gut-brain connectie, maar MentaBiotics heeft mijn spijsvertering en mijn humeur enorm verbeterd. Een aanrader!",
    rating: 5,
  },
  {
    name: "Linda Bakker",
    role: "Geverifieerde Klant",
    text: "De klantenservice is top en de levering was supersnel. De 30 dagen garantie gaf me het vertrouwen om het te proberen, amaar ik stuur het zeker niet terug!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-6">
            Wat onze klanten zeggen
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg">
            Honderden mensen in Nederland hebben hun mentale en fysieke welzijn al verbeterd met Amare.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-[var(--color-bg-soft)] border border-[var(--color-border)] relative">
              <Quote className="absolute top-6 right-8 text-[var(--color-primary)] opacity-10" size={40} />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
                ))}
              </div>
              <p className="text-[var(--color-text)] leading-relaxed mb-8 italic">
                &quot;{t.text}&quot;
              </p>
              <div>
                <p className="font-bold text-[var(--color-text)]">{t.name}</p>
                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
