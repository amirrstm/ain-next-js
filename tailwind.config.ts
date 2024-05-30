import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        ring: 'hsl(var(--ring))',
        input: 'hsl(var(--input))',
        border: 'hsl(var(--border))',
        black: 'hsl(var(--background-light))',

        textWhite: 'hsl(var(--text-white))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        cobalt: {
          DEFAULT: 'hsl(var(--cobalt))',
          foreground: 'hsl(var(--cobalt-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },

        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in-bottom': {
          from: { transform: 'translateY(50px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-out-bottom': {
          from: { transform: 'translateY(0)', opacity: '1' },
          to: { transform: 'translateY(50px)', opacity: '0', display: 'none' },
        },
      },
      animation: {
        marquee: 'marquee 100s linear infinite',
        marquee2: 'marquee2 100s linear infinite',

        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-bottom': 'fade-in-bottom 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'fade-out-bottom': 'fade-out-bottom 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
