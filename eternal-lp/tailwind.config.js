/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens (driven by CSS variables; see globals.css :root / [data-theme="dark"])
        "bg-deep": "rgb(var(--c-bg-deep) / <alpha-value>)",
        "bg-card": "rgb(var(--c-bg-card) / <alpha-value>)",
        "bg-card-hover": "rgb(var(--c-bg-card-hover) / <alpha-value>)",
        "bg-section": "rgb(var(--c-bg-section) / <alpha-value>)",
        primary: "rgb(var(--c-primary) / <alpha-value>)",
        "primary-hover": "rgb(var(--c-primary-hover) / <alpha-value>)",
        "primary-dark": "rgb(var(--c-primary-dark) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        "text-primary": "rgb(var(--c-text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--c-text-primary) / 0.68)",
        "text-muted": "rgb(var(--c-text-primary) / 0.45)",
        border: "var(--border)",
        "border-hover": "rgb(var(--c-primary) / 0.2)",
        sky: "var(--sky)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
