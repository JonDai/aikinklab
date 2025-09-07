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
        // Intimate Aurora Color System - designed for 18-35 target audience
        primary: {
          50: '#faf8ff',
          100: '#f3f0ff',
          200: '#e9e5ff', 
          300: '#d6cdff',
          400: '#b8a6ff',
          500: '#9b7fff', // deep-violet (main brand color)
          600: '#8b5cf6', 
          700: '#7c3aed',
          800: '#6d28d9',
          900: '#5b21b6',
          950: '#3f1695',
        },
        secondary: {
          50: '#fff7f5',
          100: '#ffede8',
          200: '#ffdbd1',
          300: '#ffc0ae',
          400: '#ff9a7f',
          500: '#ff6b47', // warm-coral (friendly accent)
          600: '#f04e23',
          700: '#dc2626',
          800: '#b91c1c',
          900: '#991b1b',
          950: '#7f1d1d',
        },
        accent: {
          50: '#f0fdff',
          100: '#ccfbff',
          200: '#99f6ff',
          300: '#4df2ff',
          400: '#06e6ff',
          500: '#00d4ff', // cyber-cyan (tech highlight)
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        surface: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa', // neutral-gray (readable text)
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#1e1b2e', // deep-space-blue (main background)
          900: '#0f0b1a', // midnight-depth (darkest)
          950: '#080510',
        },
        // Enhanced Legacy Support with New Names
        'deep-violet': '#9b7fff',
        'warm-coral': '#ff6b47',  
        'cyber-cyan': '#00d4ff',
        'deep-space-blue': '#1e1b2e',
        'midnight-depth': '#0f0b1a',
        'aurora-white': '#fafafa',
        'soft-gray': '#a1a1aa',
        // Legacy colors (maintaining compatibility)
        'warm-charcoal': '#1e1b2e', // redirected to deep-space-blue
        'layered-charcoal': '#3f3f46',
        'neon-magenta': '#9b7fff', // redirected to deep-violet
        'hover-magenta': '#b8a6ff',
        'matte-gold': '#ff6b47', // redirected to warm-coral
        'warm-off-white': '#fafafa',
        'neutral-gray': '#a1a1aa',
        // Enhanced Status Colors (more vibrant and modern)
        success: '#16a34a', // enhanced green
        warning: '#f59e0b', // warm amber
        error: '#dc2626',   // clear red
        info: '#0ea5e9',    // modern blue
        // Special Effect Colors
        glow: {
          primary: 'rgba(155, 127, 255, 0.5)',
          secondary: 'rgba(255, 107, 71, 0.5)',
          accent: 'rgba(0, 212, 255, 0.5)',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        // Modern type scale
        'display-2xl': ['72px', { lineHeight: '90px', fontWeight: '800', letterSpacing: '-0.025em' }],
        'display-xl': ['60px', { lineHeight: '72px', fontWeight: '800', letterSpacing: '-0.025em' }],
        'display-lg': ['48px', { lineHeight: '60px', fontWeight: '800', letterSpacing: '-0.025em' }],
        'display-md': ['36px', { lineHeight: '44px', fontWeight: '700', letterSpacing: '-0.025em' }],
        'display-sm': ['30px', { lineHeight: '38px', fontWeight: '700', letterSpacing: '-0.025em' }],
        'display-xs': ['24px', { lineHeight: '32px', fontWeight: '700', letterSpacing: '-0.025em' }],
        'text-xl': ['20px', { lineHeight: '30px', fontWeight: '600' }],
        'text-lg': ['18px', { lineHeight: '28px', fontWeight: '600' }],
        'text-md': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'text-sm': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'text-xs': ['12px', { lineHeight: '18px', fontWeight: '500' }],
        // Legacy font sizes
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.7', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '1.5', fontWeight: '500' }],
      },
      spacing: {
        // Enhanced 4px grid system
        '0.5': '2px',
        '1.5': '6px',
        '2.5': '10px',
        '3.5': '14px',
        '4.5': '18px',
        '5.5': '22px',
        '6.5': '26px',
        '7.5': '30px',
        '8.5': '34px',
        '9.5': '38px',
        '11': '44px',
        '13': '52px',
        '15': '60px',
        '17': '68px',
        '18': '72px',
        '19': '76px',
        '21': '84px',
        '22': '88px',
        '23': '92px',
        '25': '100px',
        '26': '104px',
        '28': '112px',
        '30': '120px',
        // Legacy 8px grid
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
        'none': '0px',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        // Legacy
        'card': '12px',
        'pill': '9999px',
      },
      boxShadow: {
        // Modern shadow system
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        // Enhanced Intimate Aurora Glow Effects
        'glow-primary': '0 0 20px 5px rgba(155, 127, 255, 0.6)',
        'glow-primary-lg': '0 0 40px 10px rgba(155, 127, 255, 0.4)',
        'glow-primary-xl': '0 0 60px 15px rgba(155, 127, 255, 0.3)',
        'glow-secondary': '0 0 20px 5px rgba(255, 107, 71, 0.6)',
        'glow-secondary-lg': '0 0 30px 8px rgba(255, 107, 71, 0.4)',
        'glow-accent': '0 0 20px 5px rgba(0, 212, 255, 0.6)',
        'glow-accent-lg': '0 0 30px 8px rgba(0, 212, 255, 0.4)',
        'glow-inset': 'inset 0 0 15px 2px rgba(155, 127, 255, 0.5)',
        'glow-inset-secondary': 'inset 0 0 15px 2px rgba(255, 107, 71, 0.3)',
        'glow-inset-accent': 'inset 0 0 15px 2px rgba(0, 212, 255, 0.3)',
        'glow-soft': '0 0 30px 8px rgba(155, 127, 255, 0.2), 0 0 60px 20px rgba(255, 107, 71, 0.1)',
        'glow-aurora': '0 0 40px 12px rgba(155, 127, 255, 0.3), 0 0 80px 25px rgba(0, 212, 255, 0.2)',
        // Glassmorphism shadows
        'glass-subtle': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-prominent': '0 16px 40px 0 rgba(0, 0, 0, 0.45)',
        'glass-intense': '0 24px 48px 0 rgba(0, 0, 0, 0.55)',
        // Legacy
        'glow': '0 0 20px 5px rgba(155, 127, 255, 0.6)',
      },
      transitionDuration: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-in-back': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
        'ease-in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },
      animation: {
        'fade-in': 'fadeIn 500ms ease-out forwards',
        'fade-in-up': 'fadeInUp 600ms ease-out forwards',
        'fade-in-down': 'fadeInDown 600ms ease-out forwards',
        'slide-up': 'slideUp 600ms ease-out forwards',
        'slide-down': 'slideDown 600ms ease-out forwards',
        'slide-in-left': 'slideInLeft 500ms ease-out forwards',
        'slide-in-right': 'slideInRight 500ms ease-out forwards',
        'scale-in': 'scaleIn 400ms ease-out forwards',
        'scale-bounce': 'scaleBounce 600ms ease-out-back forwards',
        'rotate-in': 'rotateIn 500ms ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-subtle': 'floatSubtle 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'shimmer-slow': 'shimmer 4s linear infinite',
        'gradient-shift': 'gradientShift 6s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
    },
  },
  plugins: [],
};

export default config;