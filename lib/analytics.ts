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

/** Track blog article views for content performance */
export function articleView(slug: string, title: string, category: string) {
  trackEvent("article_view", {
    article_slug: slug,
    article_title: title,
    article_category: category,
    event_category: "content",
  });
}

/** Track affiliate outbound clicks (Amare.com redirects) */
export function affiliateConversion(productId: string, productName: string, clickLocation: string) {
  trackEvent("affiliate_conversion", {
    product_id: productId,
    product_name: productName,
    click_location: clickLocation,
    event_category: "conversion",
    event_label: productName,
  });
}

/** Track how far users scroll on content pages */
export function scrollDepth(depth: 25 | 50 | 75 | 100, slug: string) {
  trackEvent("scroll_depth", {
    scroll_depth: depth,
    article_slug: slug,
    event_category: "engagement",
  });
}

/** Track external outbound links */
export function outboundLink(url: string, label: string) {
  trackEvent("outbound_link", {
    outbound_url: url,
    link_label: label,
    event_category: "navigation",
  });
}
