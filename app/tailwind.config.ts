/**
 * Skolapp Tailwind config
 * Design tokens: light/dark ready, WCAG AA contrast
 */
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const skolappColors = {
  light: {
    background: '#F8FAFC', // Ljus bas
    surface: '#FFFFFF',
    accent: '#1E90FF', // CTA accent
    text: '#1A1A1A', // Hög kontrast
    muted: '#6B7280',
    border: '#E5E7EB',
    error: '#DC2626',
    success: '#16A34A',
  },
  dark: {
    background: '#18181B',
    surface: '#23272F',
    accent: '#60A5FA',
    text: '#F3F4F6',
    muted: '#9CA3AF',
    border: '#374151',
    error: '#F87171',
    success: '#4ADE80',
  },
};

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        background: skolappColors.light.background,
        surface: skolappColors.light.surface,
        accent: skolappColors.light.accent,
        text: skolappColors.light.text,
        muted: skolappColors.light.muted,
        border: skolappColors.light.border,
        error: skolappColors.light.error,
        success: skolappColors.light.success,
        // dark mode tokens
        'dark-background': skolappColors.dark.background,
        'dark-surface': skolappColors.dark.surface,
        'dark-accent': skolappColors.dark.accent,
        'dark-text': skolappColors.dark.text,
        'dark-muted': skolappColors.dark.muted,
        'dark-border': skolappColors.dark.border,
        'dark-error': skolappColors.dark.error,
        'dark-success': skolappColors.dark.success,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Inter', 'sans-serif'],
      },
      fontSize: {
        h1: ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        h2: ['2rem', { lineHeight: '1.15', fontWeight: '700' }],
        h3: ['1.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        base: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(30, 144, 255, 0.08)',
        focus: '0 0 0 2px #1E90FF',
      },
      spacing: {
        section: '6rem',
        grid: '2rem',
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
