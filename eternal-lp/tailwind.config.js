/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#0F0507",
        "bg-card": "#1A0B0E",
        "bg-card-hover": "#2D1318",
        "bg-section": "#1A0B0E",
        primary: "#FF3366",
        "primary-hover": "#FF4D7D",
        "primary-dark": "#E91E63",
        accent: "#FDA4AF",
        "text-primary": "#FFF8F9",
        "text-secondary": "rgba(255, 248, 249, 0.6)",
        "text-muted": "rgba(255, 248, 249, 0.45)",
        border: "#2D1318",
        "border-hover": "rgba(255, 51, 102, 0.3)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
