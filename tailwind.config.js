/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
        },
        // Secondary colors
        secondary: {
          50: '#F0E6FF',
          100: '#E0CCFF',
          200: '#C299FF',
          300: '#A366FF',
          400: '#8533FF',
          500: '#6600FF',
          600: '#5200CC',
          700: '#3D0099',
          800: '#290066',
          900: '#140033',
        },
        // Accent colors
        accent: {
          50: '#E6FAFF',
          100: '#CCF5FF',
          200: '#99EBFF',
          300: '#66E0FF',
          400: '#33D6FF',
          500: '#00CCFF',
          600: '#00A3CC',
          700: '#007A99',
          800: '#005266',
          900: '#002933',
        },
        // Success colors
        success: {
          50: '#E6FFF0',
          100: '#CCFFE0',
          200: '#99FFC2',
          300: '#66FFA3',
          400: '#33FF85',
          500: '#00FF66',
          600: '#00CC52',
          700: '#00993D',
          800: '#006629',
          900: '#003314',
        },
        // Warning colors
        warning: {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFC300',
          600: '#CC9C00',
          700: '#997500',
          800: '#664E00',
          900: '#332700',
        },
        // Error colors
        error: {
          50: '#FFE6E6',
          100: '#FFCCCC',
          200: '#FF9999',
          300: '#FF6666',
          400: '#FF3333',
          500: '#FF0000',
          600: '#CC0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
        // Neutral colors for dark theme
        dark: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#121212',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url('/images/noise.png')",
      },
      backdropBlur: {
        xs: '2px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.dark.200'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.dark.100'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            h1: {
              color: theme('colors.dark.50'),
            },
            h2: {
              color: theme('colors.dark.100'),
            },
            h3: {
              color: theme('colors.dark.100'),
            },
            h4: {
              color: theme('colors.dark.100'),
            },
            code: {
              color: theme('colors.dark.100'),
            },
            strong: {
              color: theme('colors.dark.100'),
            },
            blockquote: {
              color: theme('colors.dark.100'),
            },
          },
        },
      }),
      boxShadow: {
        'glow': '0 0 15px rgba(0, 102, 255, 0.5)',
        'glow-lg': '0 0 25px rgba(0, 102, 255, 0.5)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};