import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        accent: "var(--color-accent)",
        "bg-soft": "var(--color-bg-soft)",
        "text-muted": "var(--color-text-muted)",
        success: "var(--color-success)",
        border: "var(--color-border)",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        nunito: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      animation: {
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        "bounce-slow": "bounceSlow 3s infinite",
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
