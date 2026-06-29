/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Bold main accent — Supabase-style green.
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#3ecf8e', // Supabase brand green — bright fill for primary buttons
          500: '#10b981',
          600: '#059669',
          700: '#047857', // readable green for links/text on white
          800: '#065f46',
          900: '#064e3b',
        },
        // Secondary accent — brick-red destructive (matches Supabase theme).
        danger: {
          50: '#fef3f0',
          100: '#fde0d8',
          200: '#f9c0b0',
          500: '#c0341d',
          600: '#a52a16',
          700: '#882213',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(16,24,40,0.05)',
        soft: '0 1px 2px rgba(16,24,40,0.04), 0 8px 24px -12px rgba(16,24,40,0.12)',
        card: '0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)',
        lift: '0 10px 40px -12px rgba(16,24,40,0.18)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(16,24,40,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,24,40,0.045) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        shimmer: 'shimmer 2s infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
