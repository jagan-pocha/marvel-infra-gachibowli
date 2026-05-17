/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
        },
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          raised: 'var(--surface-raised)',
        },
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-subtle': 'var(--border-subtle)',
        'border-gold': 'var(--border-gold)',
        'glass-bg': 'var(--glass-bg)',
      },
      fontFamily: {
        display: ["'Playfair Display'", 'serif'],
        body: ["'Inter'", 'sans-serif'],
        accent: ["'Cormorant Garamond'", 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'var(--gold-gradient)',
        'hero-overlay': 'var(--hero-overlay)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'glow-gold': 'var(--glow-gold)',
        'glow-gold-strong': 'var(--glow-gold-strong)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'count-up': 'countUp 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
}
