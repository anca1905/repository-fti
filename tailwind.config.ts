import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        fti: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Main FTI Vibrant Orange
          600: '#ea580c', // Deep FTI Orange
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        si: {
          light: '#eff6ff',
          badge: '#dbeafe',
          text: '#1e40af',
          accent: '#2563eb', // Blue accent for Sistem Informasi
        },
        ilkom: {
          light: '#f0fdf4',
          badge: '#dcfce7',
          text: '#166534',
          accent: '#16a34a', // Emerald/green accent for Ilmu Komputer
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
