/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'custom-white': '0px 3px 8px rgba(255,255,255,0.08), 0px -3px 8px rgba(255,255,255,0.08), 3px 0px 8px rgba(255,255,255,0.08), -3px 0px 8px rgba(255,255,255,0.08)',
      },
      colors: {
        primary: "#4555d2",
        secondary: "#cc2973",
        dbg: '#050618',
        dcard: '#070E27',
        dark: "#191e47",
        light: '#f9fafe',
        black: '#1d1d21',
        shadow: "#6a77db",
        lightBlue: '#2887ff'
      },
      borderRadius: {
        'custom': 'calc(1rem - 6px)',
      },
    },
  },
  plugins: [],
}

