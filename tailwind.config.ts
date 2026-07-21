import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7fc',
          100: '#e8eef8',
          200: '#d5dff2',
          300: '#b8c7e6',
          400: '#95abd6',
          500: '#7a8fc8',
          600: '#5e72b8',
          700: '#4a5ba4',
          800: '#3d4a89',
          900: '#34406f'
        },
        accent: {
          50: '#fff8f3',
          100: '#feeee5',
          200: '#fdd9cc',
          300: '#fbb7a0',
          400: '#f7956e',
          500: '#f17d4f',
          600: '#df5f2e',
          700: '#c94b24',
          800: '#a63d1f',
          900: '#88321c'
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716b',
          600: '#57534e',
          700: '#44403c',
          800: '#292824',
          900: '#1c1917'
        }
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif']
      }
    }
  },
  plugins: []
};

export default config;
