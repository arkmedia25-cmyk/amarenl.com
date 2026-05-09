"use client";

import { useEffect } from "react";
import { getAmareUrl, storeAffiliateVisit } from "@/lib/affiliate";

/**
 * Akıllı Yönlendirme Sayfası (Katman 2)
 *
 * Ziyaretçi /go adresine her geldiğinde:
 * 1. localStorage'a affiliate visit kaydı atılır
 * 2. Otomatik amare.com'a affiliate linkle yönlendirilir
 *
 * Kullanım: amarenl.com/go → otomatik amare.com/2075008/nl-nl/
 * Bookmark için ideal: "Amare'ye gitmek için bu sayfayı favorilere ekleyin"
 */
export default function GoPage() {
  useEffect(() => {
    storeAffiliateVisit();
    const url = getAmareUrl();
    // Kısa bir gecikme — localStorage yazılsın diye
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
