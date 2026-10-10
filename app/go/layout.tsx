import type { Metadata } from "next";

/**
 * /go is een affiliate-redirectpagina (zie app/go/page.tsx) — geen content.
 * Zonder deze layout erfde de pagina de metadata van de root layout, waardoor
 * Google een indexeerbare, canonieke-loze pagina zag.
 */
export const metadata: Metadata = {
  title: "Doorsturen naar Amare…",
  robots: { index: false, follow: false },
};

export default function GoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
