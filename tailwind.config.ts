import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37",
        "primary-dark": "#B08D26",
        "background-light": "#F9FAFB",
        "background-dark": "#1a237e",
        "surface-dark": "#0d1b4e",
        "surface-light": "#FFFFFF",
        "gold-accent": "#FFD700",
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["Lato", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #D4AF37 0%, #F5DE7A 50%, #D4AF37 100%)",
        "blue-gradient": "linear-gradient(to bottom, #1a237e, #000051)",
      },
    },
  },
  plugins: [forms],
} satisfies Config;

