/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4555d2",
        secondary: "#cc2973",
        dbg: '#050618',
        dcard: '#070E27'
      }
    },
  },
  plugins: [],
}

