/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#11100e",
        "ink-soft": "#171511",
        paper: "#fff6e5",
        "paper-soft": "#f3ead7",
        mint: "#69d6a9",
        teal: "#26c6da",
        coral: "#ff735c",
        amber: "#ffc857",
      },
      boxShadow: {
        lab: "0 28px 80px rgba(0, 0, 0, 0.35)",
        "lab-soft": "0 16px 40px rgba(17, 16, 14, 0.08)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
