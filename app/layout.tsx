import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import CampaignBanner from "@/components/layout/CampaignBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReturnVisitorBanner from "@/components/layout/ReturnVisitorBanner";
import VisitTracker from "@/components/layout/VisitTracker";
import FloatingMobileCTA from "@/components/ui/FloatingMobileCTA";
import SchemaMarkup from "@/components/ui/SchemaMarkup";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
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
  title: "AmareNL — Ontdek Natuurlijke Wellness Supplementen",
  description: "Ontdek de beste natuurlijke supplementen van Amare.",
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
            generateWebSiteSchema()
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
