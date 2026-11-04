/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#674BBE',
          'purple-dark': '#4D3499',
          'purple-light': '#8A70D6',
          teal: '#14AC94',
          'teal-light': '#1AD1B5',
          charcoal: '#242730',
          lavender: '#F4F0FC',
          cosmic: '#080314',
          'cosmic-card': '#110726',
        },
      },
      fontFamily: {
        heading: ['Nunito Sans', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'orbit-spin': 'orbit 25s linear infinite',
        'orbit-spin-reverse': 'orbit 30s linear infinite reverse',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'streak': 'streak 6s ease-in-out infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        streak: {
          '0%': { opacity: '0.2', transform: 'translateX(-10%) scaleX(0.8)' },
          '50%': { opacity: '0.6', transform: 'translateX(10%) scaleX(1.1)' },
          '100%': { opacity: '0.2', transform: 'translateX(-10%) scaleX(0.8)' },
        },
      },
      boxShadow: {
        'glow-purple': '0 0 35px -5px rgba(103, 75, 190, 0.5)',
        'glow-teal': '0 0 35px -5px rgba(20, 172, 148, 0.5)',
        'glow-pink': '0 0 35px -5px rgba(236, 72, 153, 0.5)',
        'glow-card': '0 20px 40px -15px rgba(103, 75, 190, 0.25)',
      },
    },
  },
  plugins: [],
};
