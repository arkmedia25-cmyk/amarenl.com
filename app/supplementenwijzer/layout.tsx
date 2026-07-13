import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supplementenwijzer — Ontdek Jouw Ideale Supplementen | AmareNL",
  description:
    "Beantwoord 5 vragen en ontvang een persoonlijk supplementenadvies. Volledig gratis, wetenschappelijk onderbouwd. Ontdek welke Amare supplementen bij jou passen.",
  alternates: {
    canonical: "/supplementenwijzer",
  },
  openGraph: {
    title: "Supplementenwijzer — Ontdek Jouw Ideale Supplementen | AmareNL",
    description:
      "Beantwoord 5 vragen en ontvang een persoonlijk supplementenadvies. Volledig gratis, wetenschappelijk onderbouwd.",
    url: "https://amarenl.com/supplementenwijzer",
  },
};

export default function SupplementenWijzerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
