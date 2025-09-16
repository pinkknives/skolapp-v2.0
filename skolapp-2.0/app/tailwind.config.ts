/**
 * Skolapp Tailwind config (design tokens)
 * Scope: marketing/landing layer utilities
 */
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand tokens (align with existing CSS variables where possible)
        brand: {
          primary: '#1E90FF', // CTA accent
          primaryDark: '#1d4ed8',
          surface: '#ffffff',
          bg: '#F8FAFC',
          text: '#1A1A1A',
          muted: '#6B7280',
          border: '#E5E7EB',
          success: '#16A34A',
          error: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        h2: ['2rem', { lineHeight: '1.15', fontWeight: '700' }],
        h3: ['1.5rem', { lineHeight: '1.2', fontWeight: '600' }],
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(30, 144, 255, 0.08)',
        focus: '0 0 0 2px #1E90FF',
      },
      spacing: {
        section: '6rem',
        grid: '2rem',
      },
      container: {
        center: true,
        padding: '1rem',
        screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
