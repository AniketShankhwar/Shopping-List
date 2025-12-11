/** @type {import('tailwindcss').Config} */
export default {
  // CRITICAL: This is the mandatory line to make dark mode toggle work.
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}