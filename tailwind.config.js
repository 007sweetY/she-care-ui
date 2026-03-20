/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B81",
        secondary: "#6C5CE7",
        bgSoft: "#FFF5F7",
        card: "#FFFFFF",
        textPrimary: "#2D3436",
        textSecondary: "#636E72",
      },
      backgroundImage: {
        "pink-purple": "linear-gradient(135deg, #FF6B81, #6C5CE7)",
      },
      boxShadow: {
        "soft-card": "0 18px 40px rgba(255, 107, 129, 0.15)",
      },
    },
  },
  plugins: [],
}
