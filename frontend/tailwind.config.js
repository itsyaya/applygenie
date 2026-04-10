/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#6366F1',
        ink: '#0F172A',
        surface: '#F8FAFC',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'grid-pan': 'gridPan 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gridPan: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(40px, 40px, 0)' },
        },
      },
      boxShadow: {
        glow: '0 0 30px rgba(79, 70, 229, 0.2)',
        soft: '0 20px 60px rgba(15, 23, 42, 0.08)',
        panel: '0 18px 50px rgba(15, 23, 42, 0.10)',
      },
      backgroundImage: {
        'hero-grid': 'linear-gradient(to right, rgba(148, 163, 184, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.14) 1px, transparent 1px)',
        'brand-radial': 'radial-gradient(circle at top left, rgba(79, 70, 229, 0.22), transparent 30%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.18), transparent 30%)',
      },
    },
  },
  plugins: [],
}

