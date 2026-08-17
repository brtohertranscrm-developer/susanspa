import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          deep: "#10241F",
          DEFAULT: "#19372F",
          muted: "#23493F",
          light: "#2C574B",
        },
        botanical: {
          DEFAULT: "#607B69",
          soft: "#7E9987",
          light: "#9CB5A5",
        },
        mist: {
          DEFAULT: "#E6EBE7",
          light: "#F0F4F1",
        },
        ivory: {
          DEFAULT: "#F5F1E8",
          warm: "#FAF7F2",
        },
        stone: {
          DEFAULT: "#B8B0A2",
          dark: "#8C8375",
        },
        champagne: {
          DEFAULT: "#B59A63",
          light: "#C7AF7B",
          dark: "#967C48",
        },
        charcoal: {
          DEFAULT: "#252A28",
          soft: "#3A403D",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
        wide: "1440px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulseSubtle 3s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
