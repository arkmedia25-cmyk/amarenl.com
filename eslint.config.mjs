import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * ESLint 9 flat config — herstelt de lint-poort van dit repo.
 *
 * Waarom deze vorm: Next 16 heeft `next lint` verwijderd en ESLint 9 leest
 * `.eslintrc.json` niet meer. Daardoor deed `npm run lint` het niet meer
 * ("Invalid project directory provided, no such directory: …/lint") en is er
 * nooit gelint. eslint-config-next levert sinds v16 flat-config-arrays.
 *
 * BELANGRIJK — dit is een VASTGELEGD UITGANGSPUNT, geen opruiming:
 * de codes die hieronder op `warn`/`off` staan, zijn bestaande bevindingen die
 * nooit zijn opgelost (het aantal is per regel gemeten op de dag van toevoegen).
 * Ze blijven zichtbaar in de uitvoer en worden als aparte taak afgebouwd.
 */
export default [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // 70 hits: Nederlandse copy staat vol apostrofs ("'s ochtends", "l'Amare").
      // Geen gebruikersimpact; een puur cosmetische regel voor een content-repo.
      "react/no-unescaped-entities": "off",
      // 23 hits: interne <a href> in plaats van <Link>. Werkt, maar verliest
      // prefetch — afbouwen tijdens de volgende contentronde.
      "@next/next/no-html-link-for-pages": "warn",
      // 4 hits: bestaande `any`-types in de app-code.
      "@typescript-eslint/no-explicit-any": "warn",
      // 2 hits: setState in een effect (React 19).
      "react-hooks/set-state-in-effect": "warn",
      // 1 hit: impure render.
      "react-hooks/purity": "warn",
      // 1 hit: require() in een TS-bestand.
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
  {
    // server/publish-groq.ts gebruikt `bodyContent` vóór de declaratie (regel 129/133/138
    // vs. 155). `const` maken geeft TDZ-fouten ("used before its declaration"); de
    // declaratie naar boven verplaatsen vraagt een refactor van die flow. Bewust
    // uitgezonderd, niet stilzwijgend.
    files: ["server/publish-groq.ts"],
    rules: {
      "prefer-const": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      ".claude/**",
      // Ingekochte/meegeleverde scraper-tooling, geen Next-app-code:
      // 187 eigen bevindingen, bewust buiten scope van deze poort.
      "tools/**",
      "next-sitemap.config.js",
    ],
  },
];
