/**
 * Skolapp Design Tokens - 2025 Design System
 * Semantic tokens for consistent UI across all platforms
 * Supports light/dark themes with WCAG AA contrast ratios
 */

// Core color palette
const colorPalette = {
  // Primary brand colors
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#1E90FF', // Primary brand
    600: '#1d4ed8',
    700: '#1e3a8a',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  // Grayscale
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  // Status colors
  green: {
    50: '#ecfdf5',
    500: '#16A34A',
    600: '#059669',
    700: '#047857',
  },
  red: {
    50: '#fef2f2',
    500: '#DC2626',
    600: '#dc2626',
    700: '#b91c1c',
  },
  yellow: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
  },
} as const;

// Semantic color tokens
export const colors = {
  light: {
    // Surface colors
    background: colorPalette.gray[50],
    surface: '#FFFFFF',
    surfaceElevated: colorPalette.gray[100],
    
    // Text colors
    text: '#1A1A1A',
    textSecondary: colorPalette.gray[600],
    textMuted: colorPalette.gray[500],
    
    // Interactive colors
    primary: colorPalette.blue[500],
    primaryHover: colorPalette.blue[600],
    primaryActive: colorPalette.blue[700],
    
    // Border colors
    border: colorPalette.gray[200],
    borderSubtle: colorPalette.gray[100],
    borderStrong: colorPalette.gray[300],
    
    // Status colors
    success: colorPalette.green[500],
    successBg: colorPalette.green[50],
    error: colorPalette.red[500],
    errorBg: colorPalette.red[50],
    warning: colorPalette.yellow[500],
    warningBg: colorPalette.yellow[50],
    
    // Focus states
    focusRing: colorPalette.blue[500],
  },
  dark: {
    // Surface colors
    background: '#0f172a',
    surface: '#1e293b',
    surfaceElevated: '#334155',
    
    // Text colors
    text: '#f1f5f9',
    textSecondary: colorPalette.gray[300],
    textMuted: colorPalette.gray[400],
    
    // Interactive colors
    primary: colorPalette.blue[400],
    primaryHover: colorPalette.blue[300],
    primaryActive: colorPalette.blue[200],
    
    // Border colors
    border: colorPalette.gray[700],
    borderSubtle: colorPalette.gray[800],
    borderStrong: colorPalette.gray[600],
    
    // Status colors
    success: colorPalette.green[500],
    successBg: colorPalette.green[700],
    error: colorPalette.red[500],
    errorBg: colorPalette.red[700],
    warning: colorPalette.yellow[500],
    warningBg: colorPalette.yellow[600],
    
    // Focus states
    focusRing: colorPalette.blue[400],
  },
} as const;

// Typography tokens with fluid scaling
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    heading: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'ui-monospace', 'monospace'],
  },
  
  fontSize: {
    // Fluid typography using clamp()
    xs: 'clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)',
    sm: 'clamp(0.875rem, 0.8rem + 0.3vw, 1rem)',
    base: 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)',
    lg: 'clamp(1.125rem, 1rem + 0.5vw, 1.25rem)',
    xl: 'clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)',
    '2xl': 'clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem)',
    '3xl': 'clamp(1.875rem, 1.6rem + 1vw, 2.25rem)',
    '4xl': 'clamp(2.25rem, 1.9rem + 1.4vw, 3rem)',
    '5xl': 'clamp(3rem, 2.5rem + 2vw, 3.75rem)',
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  lineHeight: {
    tight: '1.1',
    snug: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;

// Spacing tokens (8px grid system)
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px (minimum touch target)
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
} as const;

// Border radius tokens
export const borderRadius = {
  none: '0',
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  full: '9999px',
} as const;

// Shadow tokens
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Specific component shadows
  card: '0 2px 8px 0 rgba(30, 144, 255, 0.08)',
  cardHover: '0 8px 25px -8px rgba(30, 144, 255, 0.2)',
  focus: '0 0 0 3px rgba(30, 144, 255, 0.3)',
  
  // Dark mode shadows
  dark: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
    card: '0 4px 12px 0 rgba(0, 0, 0, 0.5)',
    cardHover: '0 8px 25px -8px rgba(0, 0, 0, 0.6)',
  },
} as const;

// Motion tokens (2025 standards)
export const motion = {
  duration: {
    instant: '0ms',
    fast: '120ms',     // Micro-interactions
    base: '200ms',     // Standard transitions
    slow: '300ms',     // Complex animations
    slower: '500ms',   // Page transitions
  },
  
  easing: {
    // 2025 modern easing curves
    'swift-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',     // Standard
    'swift-in': 'cubic-bezier(0.4, 0, 1, 1)',           // Enter
    'swift-out': 'cubic-bezier(0, 0, 0.2, 1)',          // Exit
    bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',  // Playful
    elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',     // Strong emphasis
  },
  
  // Prefers-reduced-motion respect
  reduced: {
    duration: '0.01ms',
    easing: 'linear',
  },
} as const;

// Breakpoints for responsive design
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-index scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Component-specific tokens
export const components = {
  button: {
    height: {
      sm: spacing[9],    // 36px
      md: spacing[11],   // 44px (touch target)
      lg: spacing[12],   // 48px
    },
    padding: {
      sm: `${spacing[2]} ${spacing[4]}`,
      md: `${spacing[3]} ${spacing[6]}`,
      lg: `${spacing[4]} ${spacing[8]}`,
    },
    borderRadius: {
      sm: borderRadius.md,
      md: borderRadius.lg,
      lg: borderRadius.xl,
    },
  },
  
  card: {
    padding: {
      sm: spacing[4],
      md: spacing[6],
      lg: spacing[8],
    },
    borderRadius: borderRadius.lg,
    shadow: shadows.card,
    shadowHover: shadows.cardHover,
  },
  
  input: {
    height: spacing[11], // 44px touch target
    padding: `${spacing[3]} ${spacing[4]}`,
    borderRadius: borderRadius.md,
    borderWidth: '2px',
  },
} as const;

// Export helper functions
export const getColorValue = (theme: 'light' | 'dark', colorPath: string) => {
  const [category, variant] = colorPath.split('.');
  return colors[theme][category as keyof typeof colors.light]?.[variant as any] || 
         colors[theme][category as keyof typeof colors.light];
};

export const getSpacingValue = (size: keyof typeof spacing) => spacing[size];

export const getMotionProps = (reducedMotion = false) => ({
  duration: reducedMotion ? motion.reduced.duration : motion.duration.base,
  easing: reducedMotion ? motion.reduced.easing : motion.easing['swift-in-out'],
});

// CSS custom properties generator
export const generateCSSVariables = (theme: 'light' | 'dark') => {
  const themeColors = colors[theme];
  
  return {
    // Colors
    '--sa-background': themeColors.background,
    '--sa-surface': themeColors.surface,
    '--sa-surface-elevated': themeColors.surfaceElevated,
    '--sa-text': themeColors.text,
    '--sa-text-secondary': themeColors.textSecondary,
    '--sa-text-muted': themeColors.textMuted,
    '--sa-primary': themeColors.primary,
    '--sa-primary-hover': themeColors.primaryHover,
    '--sa-primary-active': themeColors.primaryActive,
    '--sa-border': themeColors.border,
    '--sa-border-subtle': themeColors.borderSubtle,
    '--sa-border-strong': themeColors.borderStrong,
    '--sa-success': themeColors.success,
    '--sa-success-bg': themeColors.successBg,
    '--sa-error': themeColors.error,
    '--sa-error-bg': themeColors.errorBg,
    '--sa-warning': themeColors.warning,
    '--sa-warning-bg': themeColors.warningBg,
    '--sa-focus-ring': themeColors.focusRing,
    
    // Motion
    '--sa-duration-fast': motion.duration.fast,
    '--sa-duration-base': motion.duration.base,
    '--sa-duration-slow': motion.duration.slow,
    '--sa-easing-swift': motion.easing['swift-in-out'],
    '--sa-easing-bounce': motion.easing.bounce,
    
    // Shadows
    '--sa-shadow-sm': theme === 'dark' ? shadows.dark.sm : shadows.sm,
    '--sa-shadow-md': theme === 'dark' ? shadows.dark.md : shadows.md,
    '--sa-shadow-lg': theme === 'dark' ? shadows.dark.lg : shadows.lg,
    '--sa-shadow-card': theme === 'dark' ? shadows.dark.card : shadows.card,
    '--sa-shadow-card-hover': theme === 'dark' ? shadows.dark.cardHover : shadows.cardHover,
    '--sa-shadow-focus': shadows.focus,
  };
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  motion,
  breakpoints,
  zIndex,
  components,
  getColorValue,
  getSpacingValue,
  getMotionProps,
  generateCSSVariables,
};