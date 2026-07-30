/**
 * Meta Pixel + Conversions API (CAPI) helpers voor amarenl.com
 *
 * SETUP:
 * 1. Maak een Meta Pixel aan in Events Manager (business.facebook.com)
 * 2. Zet PIXEL_ID in .env.local: NEXT_PUBLIC_META_PIXEL_ID=123456789
 * 3. Genereer een CAPI access token in Events Manager → Settings → Conversions API
 * 4. Zet CAPI_ACCESS_TOKEN in .env.local: META_CAPI_TOKEN=EAA...
 * 5. Deploy naar Vercel en test met Meta Pixel Helper Chrome extensie
 *
 * Event mapping voor Meta Ads:
 * - ViewContent → product/supplement pagina bekeken
 * - Lead → partner formulier ingevuld
 * - Subscribe → email nieuwsbrief ingeschreven
 * - Contact → contact formulier
 * - InitiateCheckout → affiliate link klik (gaat naar amare.com)
 * - Purchase → terugkerend van amare.com met UTM (server-side via CAPI)
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

/** Meta requires em/ph as SHA-256 hex hashes of the *normalized* (trimmed,
 *  lowercase) value — never send raw PII. Node's `crypto` is only available
 *  server-side, so these must stay out of any client bundle. */
function sha256Hex(value: string): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createHash } = require("crypto") as typeof import("crypto");
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

/** NL-biased phone normalization: strip everything but digits, swap a
 *  leading trunk "0" for the "31" country code Meta expects. */
function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "31" + digits.slice(1);
  return digits;
}

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq: unknown;
  }
}

// --- Client-side Meta Pixel (browser-only) ---

export function pageView() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
}

/** Track product/bundle page views */
export function viewContent(
  contentName: string,
  contentType: string = "product",
  value?: number,
  currency: string = "EUR"
) {
  if (typeof window !== "undefined" && window.fbq) {
    const params: Record<string, unknown> = {
      content_name: contentName,
      content_type: contentType,
      currency,
    };
    if (value) params.value = value;
    window.fbq("track", "ViewContent", params);
  }
}

/** Track lead form submissions (partner worden, gratis gids) */
export function lead(formType: string, source: string = "web") {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: formType,
      source,
    });
  }
}

/** Track email/newsletter subscriptions */
export function subscribe(source: string = "web") {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Subscribe", { source });
  }
}

/** Track affiliate link clicks (outbound to amare.com) */
export function initiateCheckout(
  productName: string,
  productId: string,
  value?: number,
  currency: string = "EUR"
) {
  if (typeof window !== "undefined" && window.fbq) {
    const params: Record<string, unknown> = {
      content_name: productName,
      content_ids: [productId],
      currency,
    };
    if (value) params.value = value;
    window.fbq("track", "InitiateCheckout", params);
  }
}

/** Track contact form submissions */
export function contact() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact");
  }
}

/**
 * Fire a Lead+Subscribe conversion on both the browser pixel and the server
 * (CAPI mirror) in one call. Use this from any lead-capture form (newsletter,
 * lead magnet, quiz result, brand-partner interest, etc.) right after a
 * successful submission.
 */
export function trackLeadConversion(
  contentName: string,
  source: string,
  contact?: { email?: string; phone?: string }
) {
  subscribe(source);
  lead(contentName, source);

  if (typeof window === "undefined") return;
  const eventSourceUrl = window.location.href;
  for (const eventName of ["Subscribe", "Lead"]) {
    fetch("/api/capi-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        event_source_url: eventSourceUrl,
        custom_data: { content_name: contentName, source },
        email: contact?.email || undefined,
        phone: contact?.phone || undefined,
      }),
      keepalive: true,
    }).catch(() => {});
  }
}

// --- Server-side Conversions API (CAPI) ---

interface CAPIServerEvent {
  event_name: string;
  event_time: number;
  event_source_url: string;
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
    /** Raw email/phone — hashed in sendCAPIEvent() right before sending, never logged or forwarded as-is. */
    email?: string;
    phone?: string;
  };
  custom_data: Record<string, unknown>;
}

/**
 * Stuur een server-side conversie event naar Meta CAPI.
 * Gebruik dit voor events die client-side gemist kunnen worden
 * (affiliate outbound clicks, ad-blocker gevallen).
 *
 * IMPORTANT: Dit endpoint stuurt GEEN rauwe persoonlijke data naar Meta —
 * email/telefoon worden hier ge-SHA-256-hasht (Meta's vereiste formaat)
 * vlak voordat het request de deur uit gaat.
 */
export async function sendCAPIEvent(event: CAPIServerEvent): Promise<boolean> {
  const PIXEL_ID = META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn("[Meta CAPI] Missing PIXEL_ID or META_CAPI_TOKEN");
    return false;
  }

  const { email, phone, ...restUserData } = event.user_data;
  const user_data: Record<string, unknown> = { ...restUserData };
  if (email) user_data.em = [sha256Hex(email)];
  if (phone) user_data.ph = [sha256Hex(normalizePhone(phone))];

  try {
    const url = `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{ ...event, user_data }],
        test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("[Meta CAPI] Error:", result);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[Meta CAPI] Network error:", error);
    return false;
  }
}

/**
 * Helper: stuur een Purchase event via CAPI wanneer een gebruiker
 * terugkeert van amare.com met een UTM parameter die wijst op conversie.
 * Roep dit aan vanuit een API route of middleware.
 */
export async function trackCAPIConversion(
  eventName: string,
  eventSourceUrl: string,
  customData: Record<string, unknown>,
  fbp?: string,
  fbc?: string,
  userAgent?: string
) {
  return sendCAPIEvent({
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: eventSourceUrl,
    user_data: {
      fbp: fbp || undefined,
      fbc: fbc || undefined,
      client_user_agent: userAgent,
    },
    custom_data: customData,
  });
}
