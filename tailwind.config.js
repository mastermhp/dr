/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      "./pages/**/*.{js,jsx}",
      "./components/**/*.{js,jsx}",
      "./app/**/*.{js,jsx}",
      "./src/**/*.{js,jsx}",
      "*.{js,jsx}",
    ],
    theme: {
      extend: {
        colors: {
          deepPink: "oklch(0.65 0.3 0)",
          hotPink: "oklch(0.75 0.25 0)",
          electricPurple: "oklch(0.55 0.3 300)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
          float: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-20px)" },
          },
          pulse: {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.5 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          float: "float 3s ease-in-out infinite",
          pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }