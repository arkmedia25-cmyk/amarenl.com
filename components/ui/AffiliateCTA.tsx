"use client";

import { ArrowRight } from "lucide-react";
import { getAffiliateUrl } from "@/lib/products";
import { storeAffiliateVisit } from "@/lib/affiliate";

type Variant = "primary" | "secondary" | "urgency";

interface Props {
  label: string;
  product: string;
  variant?: Variant;
  className?: string;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white hover:opacity-90",
  secondary:
    "bg-transparent text-[var(--color-primary)] border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
  urgency:
    "bg-[var(--color-primary)] text-white hover:opacity-90 shadow-lg",
};

export default function AffiliateCTA({
  label,
  product,
  variant = "primary",
  className = "",
}: Props) {
  const url = getAffiliateUrl(product);

  const handleClick = () => {
    storeAffiliateVisit();
    window.open(url, "_blank", "noopener noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all font-nunito text-sm px-6 py-3 ${styles[variant]} ${className}`}
    >
      {label}
      <ArrowRight size={16} />
    </button>
  );
}
