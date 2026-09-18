/**
 * Centrale site-configuratie — domein en merknaam op één plek.
 * Bij een toekomstige domein-/merkwissel hoeft alleen dit bestand aangepast te worden
 * (plus NEXT_PUBLIC_SITE_URL in de Vercel environment variables).
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amarenl.com";
export const SITE_NAME = "AmareNL";
