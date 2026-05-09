/**
 * Google Analytics 4 event helpers voor amarenl.com
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function pageview(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: url,
    });
  }
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, params);
  }
}

export function affiliateClick(productId: string, productName: string) {
  trackEvent("affiliate_click", {
    product_id: productId,
    product_name: productName,
    event_category: "affiliate",
  });
}

export function formSubmit(formType: "newsletter" | "contact" | "exit-popup") {
  trackEvent("form_submit", {
    form_type: formType,
    event_category: "conversion",
  });
}

export function popupView() {
  trackEvent("popup_view", {
    popup_type: "exit-intent",
    event_category: "engagement",
  });
}

export function ctaClick(label: string, location: string) {
  trackEvent("cta_click", {
    cta_label: label,
    cta_location: location,
    event_category: "engagement",
  });
}
