import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacybeleid — AmareNL",
  description:
    "Privacybeleid van AmareNL. Lees hoe wij omgaan met jouw persoonsgegevens conform de AVG/GDPR.",
  alternates: { canonical: "/privacy-beleid" },
  openGraph: {
    title: "Privacybeleid — AmareNL",
    description: "Privacybeleid van AmareNL. Lees hoe wij omgaan met jouw persoonsgegevens conform de AVG/GDPR.",
    url: "/privacy-beleid",
    type: "website",
    siteName: "AmareNL",
    locale: "nl_NL",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacybeleid — AmareNL",
    description: "Privacybeleid van AmareNL. Lees hoe wij omgaan met jouw persoonsgegevens conform de AVG/GDPR.",
    images: ["/images/og-default.jpg"],
  },
}

export default function PrivacyBeleid() {
  return (
    <div className="bg-white min-h-screen font-nunito">
      <section className="bg-[var(--color-bg-soft)] py-16 border-b border-[var(--color-border)]">
        <div className="container-page max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4">
            Privacybeleid
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">Laatst bijgewerkt: mei 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl prose prose-sm md:prose-base text-[var(--color-text)] leading-relaxed
          prose-headings:font-cormorant prose-headings:text-[var(--color-text)]
          prose-p:text-[var(--color-text-muted)]
          prose-li:text-[var(--color-text-muted)]
          prose-a:text-[var(--color-primary)]">

          <h2>1. Inleiding</h2>
          <p>
            AmareNL respecteert jouw privacy en verwerkt persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR). In dit privacybeleid leggen wij uit welke gegevens wij verzamelen, waarom wij dit doen en wat jouw rechten zijn.
          </p>

          <h2>2. Wie zijn wij</h2>
          <p>
            AmareNL is een onafhankelijke affiliate partner van Amare Global. Wij zijn geen onderdeel van Amare Global zelf. Contactgegevens vind je op onze contactpagina.
          </p>

          <h2>3. Welke gegevens verzamelen wij</h2>
          <ul>
            <li><strong>Nieuwsbrief:</strong> voornaam en e-mailadres bij aanmelding voor onze nieuwsbrief</li>
            <li><strong>Contactformulier:</strong> naam, e-mailadres en bericht bij gebruik van het contactformulier</li>
            <li><strong>Analytics:</strong> geanonimiseerde bezoekgegevens via Google Analytics 4 (paginaweergaven, sessieduur, herkomst)</li>
            <li><strong>Cookies:</strong> essentiële cookies voor websitefunctie en optionele analytics cookies</li>
          </ul>

          <h2>4. Doeleinden van verwerking</h2>
          <ul>
            <li>Versturen van nieuwsbrieven en aanbiedingen (alleen met toestemming)</li>
            <li>Beantwoorden van contactverzoeken</li>
            <li>Analyseren van websitebezoek voor verbetering van gebruikerservaring</li>
            <li>Naleving van wettelijke verplichtingen</li>
          </ul>

          <h2>5. Rechtsgrond</h2>
          <p>
            Wij verwerken persoonsgegevens op basis van: (a) jouw uitdrukkelijke toestemming, (b) gerechtvaardigd belang voor analytische doeleinden, en (c) wettelijke verplichtingen.
          </p>

          <h2>6. Bewaartermijn</h2>
          <p>
            Persoonsgegevens worden niet langer bewaard dan noodzakelijk. Nieuwsbriefgegevens bewaren wij totdat jij je uitschrijft. Contactformuliergegevens maximaal 1 jaar.
          </p>

          <h2>7. Delen met derden</h2>
          <p>
            Wij delen jouw gegevens niet met derden, behalve: (a) onze e-mailserviceprovider voor nieuwsbrieven, (b) Google voor analytics (geanonimiseerd), (c) indien wettelijk verplicht.
          </p>

          <h2>8. Cookies</h2>
          <p>
            Deze website gebruikt cookies. Essentiële cookies zijn nodig voor de werking van de site. Analytics cookies worden alleen geplaatst na jouw toestemming. Je kunt cookies beheren via je browserinstellingen.
          </p>

          <h2>9. Jouw rechten</h2>
          <ul>
            <li><strong>Inzage:</strong> je mag altijd opvragen welke gegevens wij van jou hebben</li>
            <li><strong>Correctie:</strong> onjuiste gegevens laten corrigeren</li>
            <li><strong>Verwijdering:</strong> verzoeken om jouw gegevens te verwijderen</li>
            <li><strong>Bezwaar:</strong> bezwaar maken tegen verwerking</li>
            <li><strong>Overdracht:</strong> jouw gegevens in een gestructureerd formaat ontvangen</li>
            <li><strong>Klacht:</strong> een klacht indienen bij de Autoriteit Persoonsgegevens</li>
          </ul>

          <h2>10. Affiliate Disclosure</h2>
          <p>
            AmareNL ontvangt een commissie bij aankopen via onze affiliate links naar Amare.com. Dit heeft geen invloed op de prijs die jij betaalt. Wij zijn een onafhankelijke partner en onze content, reviews en aanbevelingen zijn gebaseerd op eigen onderzoek en ervaring.
          </p>

          <h2>11. Contact</h2>
          <p>
            Voor vragen over dit privacybeleid of om je rechten uit te oefenen, neem contact met ons op via de contactpagina.
          </p>
        </div>
      </section>
    </div>
  );
}
