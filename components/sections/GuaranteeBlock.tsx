import { Gift, RotateCcw, Truck } from "lucide-react";

export default function GuaranteeBlock() {
  return (
    <section className="py-12 bg-[var(--color-primary)] text-white">
      <div className="container-page">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Money Back */}
          <div className="flex items-start gap-5 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="p-3 bg-[var(--color-accent)] rounded-xl">
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-cormorant mb-2">30 Dagen Garantie</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Niet tevreden? Zelfs als de verpakking <strong>leeg</strong> is, krijg je je geld terug. Stuur simpelweg de lege verpakking retour.
              </p>
            </div>
          </div>

          {/* Discount */}
          <div className="flex items-start gap-5 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="p-3 bg-[var(--color-accent)] rounded-xl">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-cormorant mb-2">€8 Welkomstkorting</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Nieuwe klant? Gebruik je kortingscode bij je eerste bestelling en ontvang direct <strong>€8 korting</strong> op je aankoop.
              </p>
            </div>
          </div>

          {/* Shipping */}
          <div className="flex items-start gap-5 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="p-3 bg-[var(--color-accent)] rounded-xl">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-cormorant mb-2">Gratis Verzending</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Bestel voor meer dan <strong>€175</strong> en wij betalen de verzendkosten. Je pakket wordt direct vanuit Amare geleverd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
