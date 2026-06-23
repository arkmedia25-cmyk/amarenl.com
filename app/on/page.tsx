import type { Metadata } from "next";
import Image from "next/image";
import AffiliateCTA from "@/components/ui/AffiliateCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import { getProduct } from "@/lib/products";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema, combineSchemas } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Amare ON Kopen — Natuurlijke Energie Shot met B-Vitamines | AmareNL",
  description: "Amare ON: compacte energie shot met guarana-cafeïne en gepatenteerd B-vitaminecomplex. Geen crash, geen nervositeit. Direct van Amare — beste prijs.",
  alternates: { canonical: "/on" },
  openGraph: { title: "Amare ON Kopen — Natuurlijke Energie Shot | AmareNL", description: "Compacte energie shot met B-vitamines — geen crash.", url: "/on", type: "website", siteName: "AmareNL", locale: "nl_NL", images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Amare ON Kopen — Natuurlijke Energie Shot | AmareNL", description: "Compacte energie shot met B-vitamines — geen crash.", images: ["/images/og-default.jpg"] },
};

const faqs = [
  { question: "Wat is het verschil tussen Amare ON en Energy+?", answer: "Amare ON is een vloeibare shot met guarana-cafeïne en een gepatenteerde B-vitaminemix — ontworpen voor snelle, drinkbare energie. Energy+ is een capsule met groene koffieboon en L-glycine — meer geschikt voor aanhoudende energie gedurende de dag. ON werkt sneller (vloeibaar), Energy+ werkt langer (capsule)." },
  { question: "Bevat Amare ON veel cafeïne?", answer: "ON bevat natuurlijke cafeïne uit guarana — vergelijkbaar met een kop groene thee (25-30 mg). Dat is aanzienlijk minder dan een kop koffie (80-100 mg) of een standaard energiedrank (80 mg). Geen hartkloppingen, geen crash — gewoon milde, natuurlijke alertheid." },
  { question: "Wanneer neem ik Amare ON het beste?", answer: "'s Ochtends of vroeg in de middag als je een dip voelt aankomen. Neem het niet te laat op de dag — de cafeïne kan je slaap verstoren. Ideaal voor vóór het sporten, een lange vergadering, of die beruchte 15:00-dip." },
  { question: "Is ON geschikt voor dagelijks gebruik?", answer: "Ja, ON is ontworpen voor dagelijks gebruik. De B-vitamines ondersteunen je natuurlijke energiemetabolisme — geen gewenning of afhankelijkheid zoals bij hoge doseringen synthetische cafeïne." },
  { question: "Welke smaak heeft ON?", answer: "Framboos-grapefruit — fris, fruitig, niet te zoet. De vloeibare formule maakt het makkelijk om snel in te nemen zonder water." },
];

export default function OnPage() {
  const product = getProduct("on");
  const img = product?.images?.primary || "https://amarecdn.azureedge.net/webassets/web/prod/products/ON-Raspberry-Grapefruit-EU-800.jpg";

  const schema = combineSchemas(
    generateProductSchema({ name: "Amare ON", nameNL: "Amare ON", description: "Amare ON combineert guarana-cafeïne met een gepatenteerde mix van B-vitamines (B1, B2, B3, B6, B12) voor snelle, natuurlijke energie zonder crash. Vloeibare framboos-grapefruit shot.", image: img, slug: "on", priceRetail: 30.45, priceSubscription: 27.41, ratingValue: 4.5, ratingCount: 500, affiliateUrl: "https://www.amare.com/2075008/nl-nl/on" }),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Amare ON", url: "/on" }])
  );

  return (<>
    <SchemaMarkup schema={schema} id="on-schema" />
    <nav className="container-page py-3 text-[10px] text-[var(--color-text-muted)]"><a href="/" className="hover:text-[var(--color-primary)]">Home</a><span className="mx-2">/</span><span className="text-[var(--color-primary)] font-semibold">Amare ON</span></nav>

    <section className="bg-[var(--color-bg-soft)] border-y border-[var(--color-border)]">
      <div className="container-page py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[var(--color-border)]"><Image src={img} alt="Amare ON — framboos-grapefruit energie shot" fill className="object-contain p-6" priority /></div>
          <div>
            <div className="inline-flex items-center gap-2 mb-4"><span className="bg-[var(--color-primary)] text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Bestseller</span><span className="text-[9px] text-[var(--color-text-muted)]">⭐ 4.5/5 (500+ reviews)</span></div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-bold text-[var(--color-text)] mb-4 leading-tight">Amare <span className="text-[var(--color-primary)]">ON</span></h1>
            <p className="text-lg text-[var(--color-text-muted)] mb-2 leading-relaxed">De energie shot die wél werkt — guarana-cafeïne en gepatenteerde B-vitamines, geen crash.</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">Framboos-grapefruit smaak. <strong>Direct van Amare.</strong></p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <AffiliateCTA label="Bestel bij Amare → €27,41/maand" product="on" variant="primary" />
              <AffiliateCTA label="Of eenmalig €30,45" product="on" variant="secondary" />
            </div>
            <p className="text-[9px] text-[var(--color-text-muted)]">* Affiliate link — je betaalt hetzelfde bedrag. Abonnement op elk moment opzegbaar.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat is Amare ON?</h2>
      <div className="prose prose-sm max-w-none text-[var(--color-text)] space-y-4">
        <p><strong>Amare ON</strong> is geen standaard energiedrank en geen cafeïnepil. Het is een doordachte combinatie van natuurlijke cafeïne uit guarana en een gepatenteerd B-vitaminecomplex (B1, B2, B3, B6, B12) in een handige vloeibare shot. Framboos-grapefruit smaak — geen chemische nasmaak.</p>
        <p>Wat ON anders maakt: de cafeïne is gebufferd door B-vitamines die je lichaam helpen de energie daadwerkelijk vrij te maken. Het is niet alleen een 'wakker-worden' signaal — het geeft je cellen de co-enzymen die ze nodig hebben om voeding om te zetten in bruikbare energie.</p>
        <p>Perfect voor vóór het sporten, die beruchte middagdip, of gewoon als je 's ochtends moeite hebt met opstarten.</p>
      </div>
    </div></section>

    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Voor wie is ON?</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {[{ icon: "☕", title: "Mensen die koffie willen minderen", desc: "Een ON shot geeft je de alertheid van koffie zonder de maagklachten en het jittery gevoel. Minder cafeïne, meer focus." }, { icon: "💪", title: "Sporters voor de training", desc: "Vloeibare energie die snel werkt — neem ON 15 minuten voor je workout. B-vitamines ondersteunen het energiemetabolisme tijdens inspanning." }, { icon: "📊", title: "Kantoormedewerkers met middagdip", desc: "Die beruchte 15:00-dip? ON geeft je helderheid zonder dat je 's avonds wakker ligt." }, { icon: "🎓", title: "Studenten in tentamenperiode", desc: "Focus en energie voor lange studiesessies — zonder de crash van energiedrankjes uit blik." }].map((item, i) => (<div key={i} className="bg-white rounded-xl p-5 border border-[var(--color-border)]"><div className="text-2xl mb-2">{item.icon}</div><h3 className="font-bold text-sm text-[var(--color-text)] mb-1">{item.title}</h3><p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p></div>))}
      </div>
    </div></section>

    <section className="py-16 bg-white"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat zit erin?</h2>
      <div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2 border-[var(--color-primary)] text-left"><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Ingrediënt</th><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Hoeveelheid</th><th className="py-3 px-4 text-[10px] font-bold uppercase text-[var(--color-primary)]">Functie</th></tr></thead><tbody>{[{ g: "Guarana-extract (natuurlijke cafeïne)", a: "~25-30 mg cafeïne", p: "Milde energieboost, vergelijkbaar met groene thee" }, { g: "Vitamine B1 (Thiamine)", a: "0,55 mg (50% RI)", p: "Energiestofwisseling, hartfunctie" }, { g: "Vitamine B2 (Riboflavine)", a: "0,7 mg (50% RI)", p: "Vrijmaken energie uit voeding" }, { g: "Vitamine B3 (Niacine)", a: "8 mg NE (50% RI)", p: "Huid, zenuwstelsel, vermoeidheid verminderen" }, { g: "Vitamine B6", a: "0,7 mg (50% RI)", p: "Eiwitstofwisseling, neurotransmitterproductie" }, { g: "Vitamine B12", a: "1,25 µg (50% RI)", p: "Rode bloedcellen, zenuwstelsel" }].map((r, i) => (<tr key={i} className="border-b border-[var(--color-border)]"><td className="py-3 px-4 font-bold text-[var(--color-text)] align-top text-xs">{r.g}</td><td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">{r.a}</td><td className="py-3 px-4 text-[var(--color-text-muted)] text-xs align-top">{r.p}</td></tr>))}</tbody></table></div>
    </div></section>

    {/* ── Hoe gebruik je het? ── */}
    <section className="py-16 bg-[var(--color-bg-soft)]">
      <div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Hoe gebruik je Amare ON?</h2>
        <div className="bg-white rounded-xl p-6 border border-[var(--color-border)]">
          <ol className="space-y-4">
            <li className="flex gap-4"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">1</span><div><strong className="text-sm text-[var(--color-text)]">Schud het flesje en neem 1 shot (30 ml)</strong><p className="text-xs text-[var(--color-text-muted)] mt-1">Drink direct uit het flesje — geen water nodig. De framboos-grapefruit smaak maakt het een aangename, snelle energieboost.</p></div></li>
            <li className="flex gap-4"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">2</span><div><strong className="text-sm text-[var(--color-text)]">Neem 's ochtends of bij de middagdip</strong><p className="text-xs text-[var(--color-text-muted)] mt-1">Ideaal vóór het sporten, bij het ontbijt, of rond 15:00 uur wanneer je energie wegzakt. Neem niet te laat op de dag — de cafeïne kan je slaap verstoren.</p></div></li>
            <li className="flex gap-4"><span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center">3</span><div><strong className="text-sm text-[var(--color-text)]">Maximaal 1 shot per dag — consistent gebruiken</strong><p className="text-xs text-[var(--color-text-muted)] mt-1">ON is ontworpen voor dagelijkse inname. De B-vitamines ondersteunen je energiemetabolisme continu — geen gewenning zoals bij synthetische cafeïne.</p></div></li>
          </ol>
          <div className="mt-6 p-4 bg-[var(--color-bg-soft)] rounded-lg text-xs text-[var(--color-text-muted)]">
            <strong>⏰ Tijdsinvestering:</strong> 10 seconden — schudden, openen, drinken.<br />
            <strong>👤 Geschikt voor:</strong> Volwassenen en jongeren vanaf 12 jaar.<br />
            <strong>⚠ Let op:</strong> Bevat cafeïne uit guarana (~25-30 mg). Niet combineren met andere cafeïnesupplementen op dezelfde dag.
          </div>
        </div>
      </div>
    </section>

    {/* ── Wat kun je verwachten? ── */}
    <section className="py-16 bg-white">
      <div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Wat kun je verwachten?</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">Resultaten verschillen per persoon, maar dit is wat veel gebruikers rapporteren:</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { week: "Direct", title: "Binnen 15 minuten", items: ["Lichte, natuurlijke alertheid", "Geen hartkloppingen of nervositeit", "Frisse framboos-grapefruit smaak"] },
            { week: "Week 1-2", title: "Duidelijke energie", items: ["Minder behoefte aan koffie", "Betere focus in de middag", "Geen energiedip om 15:00"] },
            { week: "Week 4+", title: "Optimale resultaten", items: ["Stabiele energie gedurende de dag", "Natuurlijke alertheid", "Betere trainingsprestaties"] },
          ].map((phase, i) => (
            <div key={i} className="bg-[var(--color-bg-soft)] rounded-xl p-5 border border-[var(--color-border)]">
              <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">{phase.week}</div>
              <h3 className="font-bold text-sm text-[var(--color-text)] mb-2">{phase.title}</h3>
              <ul className="space-y-1">{phase.items.map((item, j) => (<li key={j} className="text-xs text-[var(--color-text-muted)] flex gap-2"><span className="text-[var(--color-primary)]">✓</span> {item}</li>))}</ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-[var(--color-text-muted)] italic">* Deze ervaringen zijn gebaseerd op gebruikersrapportages en zijn niet beoordeeld door de NVWA. Individuele resultaten kunnen variëren. Voedingssupplementen zijn geen vervanging voor een gevarieerd dieet en gezonde levensstijl.</p>
      </div>
    </section>
    {/* ── CTA #2 (Midden) ── */}
    <section className="py-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]">
      <div className="container-page max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-white mb-3">Klaar met die middagdip?</h2>
        <p className="text-sm text-white/80 mb-6 max-w-lg mx-auto">Probeer Amare ON 30 dagen risicovrij. Niet tevreden? Geld terug.</p>
        <AffiliateCTA label="Bestel ON nu → €27,41/maand" product="on" variant="urgency" />
        <p className="mt-4 text-[10px] text-white/60">🛡️ 30 dagen geld-terug-garantie &middot; 🚚 Gratis verzending vanaf €175 &middot; 📦 Direct van Amare</p>
      </div>
    </section>

    {/* ── Prijzen ── */}
    <section className="py-16 bg-white">
      <div className="container-page max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-6">Prijzen en besparingen</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-[var(--color-bg-soft)] rounded-xl p-6 border border-[var(--color-border)]">
            <div className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">Abonnement — Bespaar 10%</div>
            <div className="text-3xl font-bold text-[var(--color-text)] mb-1">€27,41<span className="text-sm font-normal text-[var(--color-text-muted)]">/maand</span></div>
            <p className="text-xs text-[var(--color-text-muted)] mb-4">Elke maand automatisch geleverd. Op elk moment opzegbaar.</p>
            <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]"><li>✓ €3,04 goedkoper per maand</li><li>✓ Nooit zonder voorraad</li><li>✓ Gratis verzending</li></ul>
            <AffiliateCTA label="Start abonnement →" product="on" variant="primary" />
          </div>
          <div className="rounded-xl p-6 border border-[var(--color-border)]">
            <div className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Eenmalige aankoop</div>
            <div className="text-3xl font-bold text-[var(--color-text)] mb-1">€30,45</div>
            <p className="text-xs text-[var(--color-text-muted)] mb-4">Eenmalig bestellen, geen verplichtingen.</p>
            <ul className="space-y-1 mb-4 text-xs text-[var(--color-text-muted)]"><li>✓ Vrijblijvend</li><li>✓ 30 shots per verpakking</li><li>✓ Verzending €4,95</li></ul>
            <AffiliateCTA label="Eenmalig bestellen →" product="on" variant="secondary" />
          </div>
        </div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="py-16 bg-[var(--color-bg-soft)]"><div className="container-page max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-cormorant font-bold text-[var(--color-text)] mb-8">Veelgestelde vragen</h2>
      <div className="space-y-4">{faqs.map((faq, i) => (<details key={i} className="bg-white rounded-xl border border-[var(--color-border)] group"><summary className="p-5 cursor-pointer font-bold text-sm text-[var(--color-text)] list-none flex justify-between items-center">{faq.question}<span className="text-[var(--color-primary)] text-lg ml-2 group-open:rotate-45 transition-transform">+</span></summary><div className="px-5 pb-5 text-xs text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</div></details>))}</div>
    </div></section>

    {/* ── CTA #3 (Onderaan) ── */}
    <section className="py-16 bg-white">
      <div className="container-page max-w-2xl text-center">
        <div className="bg-[var(--color-bg-soft)] rounded-2xl p-8 border border-[var(--color-border)]">
          <h2 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3">Je dagelijkse energie, zonder de crash</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">Amare ON — framboos-grapefruit shot met guarana en B-vitamines. 30 dagen risicovrij proberen.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
            <AffiliateCTA label="Bestel Amare ON →" product="on" variant="primary" />
            <AffiliateCTA label="Of bekijk alle producten" product="" variant="secondary" />
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
            <span>🛡️ 30 dagen garantie</span><span className="text-[var(--color-border)]">|</span>
            <span>⚡ Snelle energie</span><span className="text-[var(--color-border)]">|</span>
            <span>🌿 Natuurlijke cafeïne</span><span className="text-[var(--color-border)]">|</span>
            <span>⭐ 10.000+ klanten</span>
          </div>
          <p className="mt-6 text-[9px] text-[var(--color-text-muted)]">
            * Affiliate link — je betaalt hetzelfde bedrag, wij ontvangen een commissie.<br />
            * Deze uitspraken zijn niet beoordeeld door de NVWA. Voedingssupplementen zijn geen vervanging voor een gevarieerd voedingspatroon en een gezonde levensstijl.<br />
            * Raadpleeg bij aanhoudende klachten altijd een arts. Niet geschikt voor zwangere vrouwen, borstvoeding gevende vrouwen en kinderen jonger dan 18 jaar.
          </p>
        </div>
      </div>
    </section>
  </>);
}
