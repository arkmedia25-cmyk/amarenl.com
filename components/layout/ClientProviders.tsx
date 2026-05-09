"use client";

import dynamic from "next/dynamic";

const ExitIntentPopup = dynamic(() => import("@/components/ui/ExitIntentPopup"), {
  ssr: false,
});

export default function ClientProviders() {
  return <ExitIntentPopup />;
}
