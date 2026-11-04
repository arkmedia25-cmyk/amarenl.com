"use client";

import { useEffect } from "react";

/**
 * Amare affiliate tıklama ölçümü (Cited).
 *
 * Neden global dinleyici: affiliate linkleri 40+ yerde geçiyor (elle yazılmış
 * sayfalar, ürün kartları, makale HTML'i). Her linke tek tek `data-cited-event`
 * eklemek yerine document üzerinde yakalama fazında tek dinleyici kuruyoruz;
 * böylece sonradan eklenen linkler ve dangerouslySetInnerHTML içindeki linkler
 * de ölçülür.
 *
 * Olay: `amare_klik`
 *   page   → tıklamanın yapıldığı vitaalroute.nl sayfası
 *   target → amare.com hedef yolu (hangi ürün)
 *   label  → link metni (hangi buton)
 *
 * Amare sipariş e-postası saat damgası + bu olay = birebir atıf.
 */
const AFFILIATE_HOST = "amare.com";

type CitedWindow = Window & {
  cited?: { track?: (name: string, props?: Record<string, string>, value?: number) => void };
};

export default function CitedAffiliateTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.('a[href*="amare.com"]') as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      let host = "";
      let path = "";
      try {
        const url = new URL(anchor.href, window.location.href);
        host = url.hostname.replace(/^www\./, "");
        path = url.pathname;
      } catch {
        return;
      }
      if (host !== AFFILIATE_HOST && !host.endsWith(`.${AFFILIATE_HOST}`)) return;

      const cited = (window as CitedWindow).cited;
      if (!cited || typeof cited.track !== "function") return;

      cited.track("amare_klik", {
        page: window.location.pathname.slice(0, 90),
        target: path.slice(0, 90) || "/",
        label: (anchor.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60),
      });
    };

    // Yakalama fazı: link başka bir katmanda durdurulsa bile olay yazılır.
    // `click` orta tuşu/ctrl+tıklamayı kapsamaz, `auxclick` onları kapsar.
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}
