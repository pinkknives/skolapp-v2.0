/**
 * Skolapp Tailwind config - 2025 Design System
 * Integrated with centralized design tokens
 */
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import {
  colors,
  typography as typographyTokens,
  spacing,
  borderRadius,
  shadows,
  motion,
  breakpoints,
  components,
} from './src/design-tokens';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        background: colors.light.background,
        surface: colors.light.surface,
        'surface-elevated': colors.light.surfaceElevated,
        text: colors.light.text,
        'text-secondary': colors.light.textSecondary,
        'text-muted': colors.light.textMuted,
        primary: colors.light.primary,
        'primary-hover': colors.light.primaryHover,
        'primary-active': colors.light.primaryActive,
        border: colors.light.border,
        'border-subtle': colors.light.borderSubtle,
        'border-strong': colors.light.borderStrong,
        success: colors.light.success,
        'success-bg': colors.light.successBg,
        error: colors.light.error,
        'error-bg': colors.light.errorBg,
        warning: colors.light.warning,
        'warning-bg': colors.light.warningBg,
        'focus-ring': colors.light.focusRing,
        
        // Dark theme colors (with dark- prefix)
        'dark-background': colors.dark.background,
        'dark-surface': colors.dark.surface,
        'dark-surface-elevated': colors.dark.surfaceElevated,
        'dark-text': colors.dark.text,
        'dark-text-secondary': colors.dark.textSecondary,
        'dark-text-muted': colors.dark.textMuted,
        'dark-primary': colors.dark.primary,
        'dark-primary-hover': colors.dark.primaryHover,
        'dark-primary-active': colors.dark.primaryActive,
        'dark-border': colors.dark.border,
        'dark-border-subtle': colors.dark.borderSubtle,
        'dark-border-strong': colors.dark.borderStrong,
        'dark-success': colors.dark.success,
        'dark-success-bg': colors.dark.successBg,
        'dark-error': colors.dark.error,
        'dark-error-bg': colors.dark.errorBg,
        'dark-warning': colors.dark.warning,
        'dark-warning-bg': colors.dark.warningBg,
        'dark-focus-ring': colors.dark.focusRing,
      },
      
      fontFamily: typographyTokens.fontFamily,
      
      fontSize: typographyTokens.fontSize,
      
      fontWeight: typographyTokens.fontWeight,
      
      lineHeight: typographyTokens.lineHeight,
      
      letterSpacing: typographyTokens.letterSpacing,
      
      spacing: spacing,
      
      borderRadius: borderRadius,
      
      boxShadow: {
        ...shadows,
        // Component-specific shadows
        'card': shadows.card,
        'card-hover': shadows.cardHover,
        'focus': shadows.focus,
        // Dark mode shadows
        'dark-sm': shadows.dark.sm,
        'dark-md': shadows.dark.md,
        'dark-lg': shadows.dark.lg,
        'dark-card': shadows.dark.card,
        'dark-card-hover': shadows.dark.cardHover,
      },
      
      transitionDuration: motion.duration,
      
      transitionTimingFunction: motion.easing,
      
      screens: breakpoints,
      
      container: {
        center: true,
        padding: spacing[4],
        screens: breakpoints,
      },
      
      // Component-specific utilities
      height: {
        'btn-sm': components.button.height.sm,
        'btn-md': components.button.height.md,
        'btn-lg': components.button.height.lg,
        'input': components.input.height,
        'touch-target': spacing[11], // 44px minimum touch target
      },
      
      minHeight: {
        'touch-target': spacing[11], // 44px minimum touch target
      },
      
      // Animation utilities
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 120ms cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-gentle': 'bounceGentle 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
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
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
          '40%, 43%': { transform: 'translateY(-5px)' },
          '70%': { transform: 'translateY(-2px)' },
          '90%': { transform: 'translateY(-1px)' },
        },
      },
    },
  },
  plugins: [
    forms,
    typography,
    // Custom plugin for design system utilities
    function({ addUtilities, theme, addComponents }) {
      // Add focus utilities that respect design tokens
      addUtilities({
        '.sa-focus': {
          '&:focus-visible': {
            outline: 'none',
            boxShadow: theme('boxShadow.focus'),
            borderRadius: theme('borderRadius.md'),
          },
        },
        '.sa-focus-ring': {
          '&:focus-visible': {
            outline: `2px solid ${theme('colors.focus-ring')}`,
            outlineOffset: '2px',
          },
        },
      });

      // Add component base styles
      addComponents({
        '.btn-base': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme('spacing.2'),
          borderRadius: theme('borderRadius.lg'),
          fontWeight: theme('fontWeight.semibold'),
          fontSize: theme('fontSize.sm'),
          lineHeight: theme('lineHeight.snug'),
          transition: `all ${theme('transitionDuration.base')} ${theme('transitionTimingFunction.swift-in-out')}`,
          cursor: 'pointer',
          border: 'none',
          minHeight: theme('height.touch-target'),
          '&:disabled': {
            opacity: '0.6',
            cursor: 'not-allowed',
          },
        },
        '.card-base': {
          backgroundColor: theme('colors.surface'),
          border: `1px solid ${theme('colors.border')}`,
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.card'),
          transition: `all ${theme('transitionDuration.base')} ${theme('transitionTimingFunction.swift-in-out')}`,
        },
        '.input-base': {
          width: '100%',
          padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
          border: `2px solid ${theme('colors.border')}`,
          borderRadius: theme('borderRadius.md'),
          backgroundColor: theme('colors.surface'),
          color: theme('colors.text'),
          fontSize: theme('fontSize.base'),
          lineHeight: theme('lineHeight.snug'),
          transition: `all ${theme('transitionDuration.base')} ${theme('transitionTimingFunction.swift-in-out')}`,
          minHeight: theme('height.touch-target'),
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.primary'),
            boxShadow: theme('boxShadow.focus'),
          },
        },
      });
    },
  ],
};

export default config;
