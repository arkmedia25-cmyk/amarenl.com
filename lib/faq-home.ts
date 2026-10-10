import { SITE_NAME } from "./site-config";

/**
 * Homepage-FAQ — één bron voor zowel de zichtbare FAQ-sectie (FAQSection.tsx) als
 * de FAQPage JSON-LD op de homepage.
 *
 * Waarom apart bestand: FAQSection is een client component. Een server component
 * die `faqs` daaruit importeert krijgt een client-reference proxy in plaats van de
 * array (`H.faqs.map is not a function` tijdens de build). Data hoort dus in een
 * gedeelde, framework-onafhankelijke module.
 *
 * Regel: schema en zichtbare tekst moeten identiek zijn (schema voor verborgen
 * content geldt als misleiding).
 */
export interface HomeFaq {
  question: string;
  answer: string;
}

export const homeFaqs: HomeFaq[] = [
  {
    question: "Zijn de producten van Amare origineel?",
    answer: `Ja, absoluut. ${SITE_NAME} is een onafhankelijke partner van Amare Global. Wanneer je op de bestelknop klikt, word je rechtstreeks naar de officiële Amare.com website geleid om je aankoop veilig te voltooien.`,
  },
  {
    question: "Hoe werkt de 30-dagen 'lege verpakking' garantie?",
    answer:
      "Amare gelooft zo sterk in hun producten dat ze een unieke garantie bieden: als je na 30 dagen geen resultaat ziet, kun je de verpakking (zelfs als deze leeg is) terugsturen en je geld terugkrijgen. Geen vragen gesteld.",
  },
  {
    question: "Hoe claim ik mijn €8 welkomstkorting?",
    answer:
      "Heel eenvoudig! Schrijf je in via ons nieuwsbriefformulier op deze pagina. Je ontvangt dan direct een persoonlijke kortingscode in je e-mail die je kunt gebruiken bij je eerste bestelling op de Amare website.",
  },
  {
    question: "Wat zijn de verzendkosten naar Nederland?",
    answer:
      "Bij bestellingen boven de €175 geniet je van gratis verzending binnen Nederland. Voor kleinere bestellingen worden de standaard verzendtarieven van Amare toegepast tijdens het afrekenen.",
  },
  {
    question: "Hoe lang duurt de levering?",
    answer:
      "Omdat de producten rechtstreeks vanuit het Amare magazijn in Europa worden verzonden, kun je rekenen op een levertijd van 3 tot 5 werkdagen.",
  },
];
