import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Midnight Radio Color Palette
        'warm-charcoal': '#1A1A1A',
        'layered-charcoal': '#2C2C2C',
        'neon-magenta': '#D946EF',
        'hover-magenta': '#E879F9',
        'matte-gold': '#C0A062',
        'warm-off-white': '#F5F5F5',
        'neutral-gray': '#A3A3A3',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.7', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '1.5', fontWeight: '500' }],
      },
      spacing: {
        // 8px grid system
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
        '16': '128px',
        '20': '160px',
        '24': '192px',
      },
      borderRadius: {
        'card': '12px',
        'pill': '9999px',
      },
      transitionDuration: {
        '200': '200ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(217, 70, 239, 0.3)',
        'glow-inset': 'inset 0 0 10px rgba(217, 70, 239, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;