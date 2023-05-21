/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pale-yellow": "#F5E8B8",
        "nav-green": "#006E5E",
        "nav-text": "#C8CF9B",
      },
    },
  },
  plugins: [],
};
