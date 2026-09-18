import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Supplementenwijzer — Ontdek Jouw Ideale Supplementen | ${SITE_NAME}`,
  description:
    "Beantwoord 5 vragen en ontvang een persoonlijk supplementenadvies. Volledig gratis, wetenschappelijk onderbouwd. Ontdek welke Amare supplementen bij jou passen.",
  alternates: {
    canonical: "/supplementenwijzer",
  },
  openGraph: {
    title: `Supplementenwijzer — Ontdek Jouw Ideale Supplementen | ${SITE_NAME}`,
    description:
      "Beantwoord 5 vragen en ontvang een persoonlijk supplementenadvies. Volledig gratis, wetenschappelijk onderbouwd.",
    url: `${SITE_URL}/supplementenwijzer`,
  },
};

export default function SupplementenWijzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
