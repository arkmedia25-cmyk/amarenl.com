"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { getAmareUrl, storeAffiliateVisit } from "@/lib/affiliate";

/**
 * Ürüne özel akıllı yönlendirme (Katman 2 — genişletilmiş)
 *
 * Kullanım:
 *   amarenl.com/go/mentabiotics  → amare.com/2075008/nl-nl/mentabiotics
 *   amarenl.com/go/sunset        → amare.com/2075008/nl-nl/sunset
 *
 * Sosyal medya, e-posta, WhatsApp için ideal.
 */
export default function ProductRedirectPage() {
  const params = useParams<{ product: string }>();
  const product = params?.product || "";

  useEffect(() => {
    storeAffiliateVisit();
    const url = getAmareUrl(product);
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 100);
    return () => clearTimeout(timer);
  }, [product]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-soft)] flex items-center justify-center font-nunito">
      <div className="text-center px-6">
        <div className="inline-block w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-6" />
        <h1 className="text-2xl font-cormorant font-bold text-[var(--color-text)] mb-3">
          Je wordt doorgestuurd naar Amare...
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Even geduld — je ontvangt automatisch €8 korting.
        </p>
      </div>
    </div>
  );
}
