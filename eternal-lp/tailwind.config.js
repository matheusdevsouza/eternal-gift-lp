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
        "bg-deep": "#FFF8F9",
        "bg-card": "#FFFFFF",
        "bg-card-hover": "#FFF0F2",
        "bg-section": "#FFF0F2",
        primary: "#FF3366",
        "primary-hover": "#FF4D7D",
        "primary-dark": "#E91E63",
        accent: "#FDA4AF",
        "text-primary": "#2D1318",
        "text-secondary": "rgba(45, 19, 24, 0.68)",
        "text-muted": "rgba(45, 19, 24, 0.45)",
        border: "#F2DCDD",
        "border-hover": "rgba(255, 51, 102, 0.2)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
