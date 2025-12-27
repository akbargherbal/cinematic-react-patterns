/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Crimson Pro"', "serif"], // Dr. Frank
        mono: ['"JetBrains Mono"', "monospace"], // Dr. Frank & Fight Club
        sans: ["Inter", "sans-serif"], // Mean Girls & Default
      },
      animation: {
        "spin-slow": "spin 12s linear infinite", // Fight Club
      },
      colors: {
        // Custom colors if needed beyond Tailwind defaults
      },
    },
  },
  plugins: [],
  // Ensure specificity for module-scoped styles
  important: false,
};
