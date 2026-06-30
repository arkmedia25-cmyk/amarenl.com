import type { Metadata } from "next";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { generateOrganizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Over Ons — Waarom Wij Dit Doen | AmareNL",
  description: "AmareNL is een onafhankelijk platform over supplementen en natuurlijke gezondheid. Lees wie we zijn, wat ons drijft en waarom we begonnen zijn.",
  alternates: { canonical: "https://amarenl.com/over-ons" },
};

export default function OverOns() {
  return (
    <>
      <SchemaMarkup schema={generateOrganizationSchema()} id="about" />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-cormorant font-bold text-[var(--color-text)] mb-8">Waarom wij dit doen</h1>
        
        <div className="prose max-w-none text-[var(--color-text-muted)] space-y-6">
          <p>
            Ik ga eerlijk zijn: AmareNL is begonnen uit frustratie.
          </p>
          <p>
            Een paar jaar terug liep ik vast. Altijd moe. Slecht slapen. Om drie uur 's middags 
            kon ik mijn ogen nauwelijks openhouden. Concentreren op werk? Vergeet het maar. 
            Mijn huisarts zei: "Stress. Rust wat meer." Dat was het.
          </p>
          <p>
            Ik ben mezelf erin gaan verdiepen. Supplementen. Darmgezondheid. De connectie tussen 
            wat je eet en hoe je je voelt. En ik ontdekte dat er een wereld aan kennis is waar 
            de meeste mensen — net als ik toen — helemaal niets vanaf weten.
          </p>
          <p>
            Het probleem? Overal waar ik keek was het hetzelfde verhaal. Websites die één ding 
            willen: verkopen. Geen uitleg. Geen twijfel. Geen "weet je wat, dit product is 
            misschien niet voor jou". Alles was GEWELDIG en FANTASTISCH en je moet het NU kopen.
          </p>
          <p>
            Daar werd ik moe van.
          </p>

          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mt-12 mb-4">Wat wij anders doen</h2>
          <p>
            Wij schrijven geen verkooppraatjes. We leggen uit hoe dingen werken. Wat de 
            wetenschap zegt. Wat wél en niet bewezen is. En ja, we linken naar producten 
            die we zelf gebruiken. Maar we zeggen ook wanneer iets niet voor jou is, of 
            wanneer je beter eerst naar je huisarts kunt gaan.
          </p>
          <p>
            Onze artikelen worden geschreven door mensen die de producten zelf gebruiken. 
            Geen AI-templates. Geen automatisch gegenereerde content. Echte ervaringen, 
            in normaal Nederlands.
          </p>

          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mt-12 mb-4">Hoe we geld verdienen</h2>
          <p>
            Via affiliate links. Dat betekent dat wij een kleine commissie krijgen als je 
            via onze link iets koopt bij Amare. Voor jou verandert er niets aan de prijs. 
            Voor ons betekent het dat we deze site kunnen blijven runnen, zonder dat we 
            afhankelijk zijn van advertenties of gesponsorde content.
          </p>
          <p>
            We zijn onafhankelijk. Geen enkele fabrikant betaalt ons om iets te zeggen. Wat 
            je hier leest, is onze eigen mening — met alle twijfels en kanttekeningen die 
            daarbij horen.
          </p>

          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mt-12 mb-4">Wie er achter zit</h2>
          <p>
            Een klein team van mensen die zelf jarenlang met supplementen werken. 
            Geen artsen — dat zeggen we er meteen bij. We hebben geen witte jassen aan 
            en we spelen geen doktertje.
          </p>
          <p>
            Wat we wél hebben: ervaring. Uren aan onderzoek. Stapels wetenschappelijke 
            papers die we hebben doorgespit. En vooral: we gebruiken de producten waar 
            we over schrijven zelf. Al jaren.
          </p>
          <p>
            Onze hoofdredacteur heeft een achtergrond in voedingswetenschap en volgt 
            sinds 2019 de ontwikkelingen rondom het microbioom, noötropica en 
            adaptogenen. De rest van het team bestaat uit mensen met uiteenlopende 
            expertises — van sportvoeding tot orthomoleculaire therapie.
          </p>

          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mt-12 mb-4">Wat je van ons kunt verwachten</h2>
          <ul className="space-y-2">
            <li>Eerlijke info, geen marketingpraat</li>
            <li>Artikelen op basis van wetenschap en ervaring</li>
            <li>We zeggen het ook als we iets níet weten</li>
            <li>Geen schreeuwerige koppen zoals "DIT MOET JE KOPEN!!"</li>
            <li>Als een product niet voor jou is, vertellen we je dat</li>
          </ul>

          <p className="mt-8 pt-8 border-t border-[var(--color-border)] text-sm">
            Vragen? Opmerkingen? Je mag ons altijd mailen. We lezen alles, 
            we antwoorden bijna altijd — het kan alleen soms een paar dagen duren.
          </p>
          <p className="text-sm">
            <strong>Contact:</strong> info@amarenl.com
          </p>
        </div>
      </div>
    </>
  );
}
