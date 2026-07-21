import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  Users,
  Share2,
  Sprout,
  ShieldCheck,
  ArrowRight,
  Check,
  Rocket,
  Banknote,
  Clock,
  Heart,
} from "lucide-react";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import {
  generateFAQSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Word Amare Brand Partner — Start je Eigen Wellness Business | AmareNL",
  description:
    "Word Brand Partner bij Amare. Kies je startpakket, ervaar de producten zelf, en verdien commissie door premium supplementen te delen. Start vandaag.",
  alternates: { canonical: "https://amarenl.com/partner-worden" },
  openGraph: {
    title: "Word Amare Brand Partner — Start je Eigen Wellness Business | AmareNL",
    description:
      "Word Brand Partner bij Amare. Kies je startpakket, ervaar de producten zelf, en verdien commissie door premium supplementen te delen.",
    type: "website",
    url: "https://amarenl.com/partner-worden",
    siteName: "AmareNL",
    locale: "nl_NL",
  },
};

const faqItems = [
  {
    question: "Wat is een Amare Brand Partner?",
    answer:
      "Als Brand Partner deel je premium supplementen met je netwerk en verdien je commissie op elke verkoop. Je krijgt een persoonlijke webshop, training, marketingmateriaal en toegang tot de community. Amare regelt productie, verzending en klantenservice — jij deelt, zij doen de rest.",
  },
  {
    question: "Moet ik voorraad aanhouden of pakketten versturen?",
    answer:
      "Nee. Amare handelt alle logistiek af: productie, opslag, verzending, betalingen en klantenservice. Jij concentreert je op delen en relaties opbouwen. Het is een écht hands-off verdienmodel.",
  },
  {
    question: "Welk Launch Pack past bij mij?",
    answer:
      "Pro (€649,64/maand) = volledig assortiment, hoogste commissiepercentage, toegang tot premium events en persoonlijke coaching. Triangle (€511,21/maand) = 3x Triangle of Wellness sets — één voor jezelf, twee om weg te geven aan potentiële klanten. Zelf Samenstellen = kies je eigen producten + €35 licentiekosten voor toegang tot het partnerprogramma.",
  },
  {
    question: "Hoeveel kan ik verdienen?",
    answer:
      "Commissie varieert per product en pakket — Pro partners krijgen het hoogste percentage. Je verdient op zowel eenmalige aankopen als terugkerende abonnementen. Veel partners bouwen binnen 3-6 maanden een stabiel maandelijks inkomen op. Met 20 actieve klanten die gemiddeld €150/maand besteden, praat je serieus over een mooi extra inkomen.",
  },
  {
    question: "Geldt de 30-dagen garantie ook voor Launch Packs?",
    answer:
      "Launch Packs zijn business starter kits — een investering in je eigen Brand Partner business. De standaard 30-dagen geld-terug garantie geldt hier niet voor. Twijfel je welk pakket het beste bij je past? Laat je gegevens achter en we helpen je persoonlijk met je keuze.",
  },
];

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://amarenl.com" },
  { name: "Partner Worden", url: "https://amarenl.com/partner-worden" },
]);
const combinedSchema = combineSchemas(
  breadcrumbSchema,
  generateFAQSchema(faqItems)
);

export default function PartnerWordenPage() {
  return (
    <>
      <SchemaMarkup schema={combinedSchema} id="partner-worden-schema" />

      {/* Banner — uitsluitend voor deze pagina, apart van de klant-banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white text-center py-3 px-4">
        <p className="text-sm font-bold tracking-wide">
          🚀 Geen voorraad, geen verzending — start vandaag je eigen wellness business
        </p>
      </div>

      <main className="bg-white min-h-screen font-nunito">
        {/* HERO */}
        <section className="relative bg-[var(--color-bg-soft)] border-b border-[var(--color-border)] overflow-hidden">
          <div className="container-page max-w-6xl py-24 md:py-32 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full mb-6">
                Amare Brand Partner Programma
              </span>
              <h1 className="text-4xl md:text-6xl font-cormorant font-bold text-[var(--color-text)] leading-tight mb-6">
                Bouw je eigen{" "}
                <span className="text-emerald-700">wellness business</span>
              </h1>
              <p className="text-xl text-[var(--color-text-muted)] leading-relaxed mb-10 max-w-2xl">
                Deel premium supplementen waar je zélf in gelooft. Verdien commissie op elke verkoop — ook terugkerend op abonnementen. Zonder voorraad, zonder verzending, zonder gedoe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#startpakketten"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 text-white rounded-full font-bold hover:bg-emerald-800 transition-all shadow-lg text-lg justify-center"
                >
                  Bekijk Startpakketten <ArrowRight size={20} />
                </a>
                <a
                  href="#info"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-emerald-700 text-emerald-700 rounded-full font-bold hover:bg-emerald-50 transition-all text-lg justify-center"
                >
                  Gratis Info Aanvragen
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* HOE HET WERKT */}
        <section className="py-24">
          <div className="container-page max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Zo simpel is het
              </span>
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] mt-3">
                Hoe werkt het?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  step: "1",
                  icon: <Sprout size={28} />,
                  title: "Ervaar het eerst zelf",
                  desc: "Kies je Launch Pack — een eenmalige aankoop, geen maandelijkse verplichtingen. Gebruik de producten zelf, voel het verschil in je energie en focus. Jouw échte ervaring is je sterkste verkoopargument — klanten voelen haarfijn aan of je achter een product staat of alleen een commissie najaagt.",
                },
                {
                  step: "2",
                  icon: <Share2 size={28} />,
                  title: "Deel je verhaal",
                  desc: "Vertel je netwerk over je ervaring. Via social media, WhatsApp, face-to-face — op jouw manier. Amare geeft je kant-en-klaar marketingmateriaal, een persoonlijke webshop en training om je op weg te helpen.",
                },
                {
                  step: "3",
                  icon: <Banknote size={28} />,
                  title: "Verdien commissie",
                  desc: "Elke bestelling via jouw link levert commissie op — ook terugkerend op abonnementen. Amare regelt verzending, betaling en klantenservice. Jij ontvangt je commissie, maand na maand.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[var(--color-bg-soft)] rounded-3xl p-8 relative border border-[var(--color-border)] hover:shadow-lg transition-all"
                >
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {item.step}
                  </div>
                  <div className="text-emerald-700 mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* START PAKKETTEN */}
        <section id="startpakketten" className="py-24 bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
          <div className="container-page max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Kies je startpunt
              </span>
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] mt-3">
                Launch Packs
              </h2>
              <p className="text-[var(--color-text-muted)] mt-4 max-w-xl mx-auto">
                Elk pakket is een investering in je business én je gezondheid. Je ervaart de producten uit eerste hand — zodat je ze met overtuiging kunt aanbevelen.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Pro Pack */}
              <div className="bg-white rounded-3xl border-2 border-emerald-700 p-8 relative shadow-xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-700 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  ⭐ Meest Gekozen
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-text)] mt-4 mb-1">
                  Happy Lifestyle Pack — Pro
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">
                  Volledig assortiment — hoogste commissie
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-[var(--color-text)]">€649,64</span>
                  <span className="text-[var(--color-text-muted)]"> eenmalig</span>
                </div>
                <p className="text-xs text-emerald-700 mb-6 bg-emerald-50 rounded-lg px-3 py-2">
                  💡 Eenmalige aankoop — na activatie geen verplichte maandelijkse kosten
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Volledige productlijn in huis",
                    "Hoogste commissiepercentage",
                    "Toegang tot premium events",
                    "Persoonlijke coaching",
                    "Kant-en-klaar marketingmateriaal",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <Check size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.amare.com/2075008/nl-nl/happy-lifestyle-pack-pro"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="block w-full text-center py-4 bg-emerald-700 text-white rounded-full font-bold hover:bg-emerald-800 transition-all shadow-md"
                >
                  Kies Pro Pack →
                </a>
              </div>

              {/* Triangle Pack */}
              <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-1">
                  Triangle Marketing Pack
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">
                  3x Triangle of Wellness — deel & verdien
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-[var(--color-text)]">€511,21</span>
                  <span className="text-[var(--color-text-muted)]"> eenmalig</span>
                </div>
                <p className="text-xs text-emerald-700 mb-6 bg-emerald-50 rounded-lg px-3 py-2">
                  💡 Eenmalige aankoop — 1 set voor jezelf, 2 om te delen
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "3 complete Triangle sets",
                    "1 voor jezelf — ervaar het resultaat",
                    "2 om weg te geven aan prospects",
                    "Inclusief marketingmateriaal",
                    "Perfect om snel te starten met delen",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <Check size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.amare.com/2075008/nl-nl/triangle-marketing-pack"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="block w-full text-center py-4 border-2 border-emerald-700 text-emerald-700 rounded-full font-bold hover:bg-emerald-50 transition-all"
                >
                  Kies Triangle Pack →
                </a>
              </div>

              {/* Zelf Samenstellen */}
              <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-1">
                  Zelf Samenstellen
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">
                  Kies je eigen producten + €35 licentiekosten
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-[var(--color-text)]">€35</span>
                  <span className="text-[var(--color-text-muted)]"> licentie + eigen productkeuze</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Kies zelf welke producten je wilt",
                    "€35 eenmalige licentiekosten",
                    "Bouw je eigen pakket op maat",
                    "Maximale flexibiliteit",
                    "Ideaal om klein te beginnen",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <Check size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.amare.com/2075008/nl-nl/share"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="block w-full text-center py-4 border-2 border-[var(--color-border)] text-[var(--color-text)] rounded-full font-bold hover:border-emerald-700 hover:text-emerald-700 transition-all"
                >
                  Stel zelf samen →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* WAAROM AMARE */}
        <section className="py-24">
          <div className="container-page max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Jouw voordeel als partner
              </span>
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] mt-3">
                Waarom Amare?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Package size={24} />,
                  title: "Premium Producten",
                  desc: "Wetenschappelijk onderbouwde formules met gepatenteerde ingrediënten. Geen standaard supplementen — dit is next-level wellness.",
                },
                {
                  icon: <ShieldCheck size={24} />,
                  title: "30 Dagen Garantie",
                  desc: "Zelfs lege verpakkingen mogen retour. Je klanten kopen zonder risico — dat maakt verkopen makkelijker.",
                },
                {
                  icon: <TrendingUp size={24} />,
                  title: "Terugkerende Inkomsten",
                  desc: "Abonnementen = voorspelbaar maandinkomen. Één klant die blijft, betaalt je elke maand opnieuw.",
                },
                {
                  icon: <Users size={24} />,
                  title: "Community & Training",
                  desc: "Je staat er niet alleen voor. Krijg toegang tot de Amare community, trainingen en evenementen.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="text-center p-6"
                >
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-700">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-[var(--color-text)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VERDIENPOTENTIEEL */}
        <section className="py-24 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white">
          <div className="container-page max-w-4xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
              Verdienpotentieel
            </span>
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold mt-3 mb-6">
              Wat kun je verdienen?
            </h2>
            <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
              Een realistisch rekenvoorbeeld — gebaseerd op wat actieve Brand Partners gemiddeld opbouwen.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { klanten: "10", omzet: "€1.500", commissie: "€300-375" },
                { klanten: "20", omzet: "€3.000", commissie: "€600-750" },
                { klanten: "50", omzet: "€7.500", commissie: "€1.500-1.875" },
              ].map((tier) => (
                <div
                  key={tier.klanten}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="text-4xl font-bold mb-1">{tier.klanten}</div>
                  <div className="text-sm text-emerald-200 mb-4">actieve klanten</div>
                  <div className="text-white/60 text-sm">± {tier.omzet} omzet/maand</div>
                  <div className="text-2xl font-bold text-emerald-200 mt-2">
                    {tier.commissie}/maand
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-xs">
              * Dit is een indicatie. Je werkelijke inkomsten hangen af van je inzet, netwerk en gekozen pakket.
            </p>
          </div>
        </section>

        {/* VOOR WIE */}
        <section className="py-24">
          <div className="container-page max-w-6xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Is dit iets voor jou?
              </span>
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] mt-3">
                Voor wie is Brand Partner worden geschikt?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Heart size={24} />,
                  title: "Zorgprofessional",
                  desc: "Fysiotherapeut, diëtist, coach of therapeut? Je hebt al een netwerk dat je vertrouwt. Voeg premium supplementen toe aan je aanbod en creëer een extra inkomstenstroom naast je praktijk.",
                },
                {
                  icon: <Share2 size={24} />,
                  title: "Content Creator",
                  desc: "Actief op Instagram, TikTok of YouTube? Je deelt toch al over gezondheid en wellness. Met Amare verdien je aan wat je toch al doet — en je publiek waardeert eerlijke aanbevelingen van producten die je zelf gebruikt.",
                },
                {
                  icon: <Clock size={24} />,
                  title: "Extra Inkomen Zoeker",
                  desc: "Wil je een flexibele bijverdienste naast je baan? Als Brand Partner bepaal je zelf hoeveel tijd je erin steekt. Een paar uur per week kan al een betekenisvol verschil maken op je bankrekening.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[var(--color-bg-soft)] rounded-3xl p-8 border border-[var(--color-border)] hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-5 text-emerald-700">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TWIJFELS */}
        <section className="py-24 bg-white">
          <div className="container-page max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                Eerlijk is eerlijk
              </span>
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] mt-3">
                "Maar ik ben niet zo'n verkoper..."
              </h2>
              <p className="text-[var(--color-text-muted)] mt-4 max-w-2xl mx-auto">
                De twee meest gehoorde twijfels — en waarom ze je niet hoeven tegen te houden.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-[var(--color-bg-soft)] rounded-3xl p-10 border border-[var(--color-border)]">
                <div className="text-4xl mb-4">🤐</div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">
                  "Ik ben helemaal niet zo sociaal"
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                  Je hoeft geen netwerker te zijn die op feestjes producten staat aan te prijzen. De meeste succesvolle Brand Partners zijn juist <strong>introvert</strong> — ze bouwen rustig een website, schrijven blogs, delen op Instagram of sturen af en toe een appje naar iemand die toch al om advies vroeg.
                </p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  Deze site — amarenl.com — is daar het bewijs van. Geen verkoopgesprekken, geen DM's sturen naar vreemden. Gewoon content maken die mensen zélf vinden via Google. Jij deelt je kennis, Amare handelt de rest af.
                </p>
              </div>

              <div className="bg-[var(--color-bg-soft)] rounded-3xl p-10 border border-[var(--color-border)]">
                <div className="text-4xl mb-4">😬</div>
                <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">
                  "Mijn vrienden vinden het vast vervelend als ik ze iets 'verkoop'"
                </h3>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                  Logisch. Niemand houdt van opdringerige verkopers. Daarom is de Amare-aanpak fundamenteel anders: <strong>je verkoopt niet — je deelt wat je zelf gebruikt.</strong>
                </p>
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                  Denk aan de laatste keer dat jij een goed restaurant, een fijne kapper of een serie aanraadde aan een vriend. Dat voelde niet als verkopen, toch? Dat voelde als helpen. Precies zo werkt het met Amare: jij gebruikt de producten, jij merkt resultaat, en als iemand vraagt "wat gebruik jij eigenlijk?" — dan heb je een eerlijk antwoord én een link.
                </p>
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  <strong>Je bent gebruiker eerst, partner tweede.</strong> Mensen prikken feilloos door neppe verkooppraatjes heen. Maar oprechte ervaring? Dat voelt voor niemand als "verkopen".
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-[var(--color-bg-soft)] border-t border-[var(--color-border)]">
          <div className="container-page max-w-3xl">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Veelgestelde vragen
              </span>
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] mt-3">
                Alles wat je wilt weten
              </h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="bg-white rounded-2xl border border-[var(--color-border)] group"
                >
                  <summary className="p-6 font-bold text-[var(--color-text)] cursor-pointer flex justify-between items-center list-none">
                    {item.question}
                    <span className="text-emerald-700 group-open:rotate-45 transition-transform text-lg ml-4 shrink-0">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-[var(--color-text-muted)] leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="info" className="py-24 bg-white">
          <div className="container-page max-w-3xl text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full mb-6">
              Klaar om te starten?
            </span>
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-[var(--color-text)] mb-6">
              Jouw wellness business begint vandaag
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto">
              Kies je Launch Pack, ervaar de producten zelf, en begin met delen. Alles wat je nodig hebt — producten, training, marketingmateriaal — krijg je van Amare. Het enige dat ontbreekt, ben jij.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#startpakketten"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 text-white rounded-full font-bold hover:bg-emerald-800 transition-all shadow-lg text-lg"
              >
                Bekijk Startpakketten <ArrowRight size={20} />
              </a>
              <Link
                href="/pakketten"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-emerald-700 text-emerald-700 rounded-full font-bold hover:bg-emerald-50 transition-all text-lg"
              >
                Gratis Info Aanvragen
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
