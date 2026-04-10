import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(99, 102, 241, 0.18), transparent 34%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.12), transparent 28%)',
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          500: '#6366f1',
          600: '#4f46e5',
        },
      },
      borderRadius: {
        xl: '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
