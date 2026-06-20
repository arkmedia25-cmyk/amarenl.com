import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import CampaignBanner from "@/components/layout/CampaignBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReturnVisitorBanner from "@/components/layout/ReturnVisitorBanner";
import VisitTracker from "@/components/layout/VisitTracker";
import FloatingMobileCTA from "@/components/ui/FloatingMobileCTA";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generatePersonSchema,
  combineSchemas,
} from "@/lib/schema";
import { GA_ID } from "@/lib/analytics";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amarenl.com"),
  title: "AmareNL — Ontdek Natuurlijke Wellness Supplementen",
  description:
    "Ontdek de beste natuurlijke supplementen van Amare voor energie, focus, slaap en welzijn. Gratis advies + €8 korting op je eerste bestelling.",
  verification: {
    other: { "p:domain_verify": "f1dafe74931e565325530d7434f9fddf" },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "Ss_zLWuGuXmzgf5vuuOzoIE4PEAGskWPIlWwuYgloHE",
  },
  openGraph: {
    siteName: "AmareNL",
    locale: "nl_NL",
    type: "website",
    title: "AmareNL — Ontdek Natuurlijke Wellness Supplementen",
    description:
      "Ontdek de beste natuurlijke supplementen van Amare voor energie, focus, slaap en welzijn. Gratis advies + €8 korting op je eerste bestelling.",
    url: "https://amarenl.com",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "AmareNL — Natuurlijke Wellness Supplementen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AmareNL — Ontdek Natuurlijke Wellness Supplementen",
    description:
      "Ontdek de beste natuurlijke supplementen van Amare voor energie, focus, slaap en welzijn.",
    images: ["/images/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${cormorant.variable} ${nunito.variable}`}>
      <head>
        <SchemaMarkup
          schema={combineSchemas(
            generateOrganizationSchema(),
            generateWebSiteSchema(),
            generatePersonSchema()
          )}
          id="default-schema"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-nunito">
        <VisitTracker />
        <CampaignBanner />
        <ReturnVisitorBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ExitIntentPopup />
        <FloatingMobileCTA />

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
