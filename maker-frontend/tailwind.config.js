/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{html,js,ts,jsx,tsx}",
      "./index.html",
  ],
  theme: {
    extend: {
        spacing: {
            '11': '2.75rem',
        }
    },
  },
  plugins: [],
}