import svgToDataUri from 'mini-svg-data-uri'

import type { Config } from 'tailwindcss'

const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class'],
  mode: 'jit',
  plugins: [
    require('tailwindcss-animate'),
    addVariablesForColors,
    ({
      theme,
      matchUtilities
    }: {
      theme: (rule: string) => unknown
      matchUtilities: (utilities: unknown, options: unknown) => void
    }) => {
      matchUtilities(
        {
          'bg-dot': (value: unknown) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`
          }),
          'bg-grid': (value: unknown) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`
          }),
          'bg-grid-small': (value: unknown) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`
          })
        },
        { type: 'color', values: flattenColorPalette(theme('backgroundColor')) }
      )
    }
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',

        'blur-image': '1.67s ease 0.2s 1 normal forwards running blur-image',
        'fade-in-bottom': 'fade-in-bottom 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'fade-out-bottom': 'fade-out-bottom 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        marquee: 'marquee 100s linear infinite',
        marquee2: 'marquee2 100s linear infinite',
        'slide-in-blurred-bottom': 'slide-in-blurred-bottom 0.8s cubic-bezier(0.230, 1.000, 0.320, 1.000) both'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        background: 'hsl(var(--background))',
        black: 'hsl(var(--background-light))',
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        cobalt: {
          DEFAULT: 'hsl(var(--cobalt))',
          foreground: 'hsl(var(--cobalt-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))'
        },

        textWhite: 'hsl(var(--text-white))'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },

        'blur-image': {
          '0%': { filter: 'blur(0)' },
          '100%': { filter: 'blur(32px)' }
        },
        'fade-in-bottom': {
          from: { opacity: '0', transform: 'translateY(50px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out-bottom': {
          from: { opacity: '1', transform: 'translateY(0)' },
          to: { display: 'none', opacity: '0', transform: 'translateY(50px)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        },

        'slide-in-blurred-bottom': {
          '0%': {
            filter: 'blur(40px)',
            opacity: '0',
            transform: 'translateY(100px)'
          },
          '100%': {
            filter: 'blur(0)',
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      }
    }
  }
}
export default config

function addVariablesForColors({
  addBase,
  theme
}: {
  addBase: (styles: Record<string, Record<string, string>>) => void
  theme: (path: string) => unknown
}) {
  const allColors = flattenColorPalette(theme('colors'))
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({ ':root': newVars })
}
