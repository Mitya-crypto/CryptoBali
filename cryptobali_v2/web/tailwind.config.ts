import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './styles/**/*.{css}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter','ui-sans-serif','system-ui'] },
      colors: { brand: { DEFAULT: '#14b8a6' } }
    }
  },
  plugins: [require('@tailwindcss/forms')]
} satisfies Config