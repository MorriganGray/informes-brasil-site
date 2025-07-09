import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'lato': ['var(--font-lato)', 'sans-serif'],
      },
      colors: {
        'brand-blue': '#00529B',
        'brand-blue-dark': '#003d73',
        'brand-light': '#f0f2f5',
        'brand-white': '#ffffff',
        'brand-dark': '#1F2937',
        'brand-gray': '#6B7280',
      }
    },
  },
  plugins: [],
}
export default config