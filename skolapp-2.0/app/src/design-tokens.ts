/**
 * Skolapp Design Tokens
 * Unified design system foundation with light/dark mode support
 * WCAG AA compliant colors (4.5:1 text contrast, 3:1 for large text)
 */

// Color Tokens
export const colors = {
  light: {
    // Brand
    primary: '#1E90FF',     // CTA accent - WCAG AA on white
    primaryHover: '#1d4ed8',
    primaryActive: '#1e40af',
    
    // Surfaces
    background: '#F8FAFC',  // Page background
    surface: '#FFFFFF',     // Card/modal backgrounds
    overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlays
    
    // Text
    text: '#1A1A1A',        // Primary text - WCAG AAA
    textMuted: '#6B7280',   // Secondary text - WCAG AA
    textInverse: '#FFFFFF', // Text on dark backgrounds
    
    // Borders & Dividers
    border: '#E5E7EB',      // Default borders
    borderMuted: '#F3F4F6', // Subtle dividers
    
    // Status
    success: '#16A34A',     // Success states
    successBg: '#F0FDF4',   // Success backgrounds
    warning: '#D97706',     // Warning states
    warningBg: '#FFFBEB',   // Warning backgrounds
    error: '#DC2626',       // Error states
    errorBg: '#FEF2F2',     // Error backgrounds
    info: '#0284C7',        // Info states
    infoBg: '#F0F9FF',      // Info backgrounds
  },
  dark: {
    // Brand
    primary: '#60A5FA',     // CTA accent - WCAG AA on dark
    primaryHover: '#3B82F6',
    primaryActive: '#2563EB',
    
    // Surfaces
    background: '#0F172A',  // Page background
    surface: '#1E293B',     // Card/modal backgrounds
    overlay: 'rgba(0, 0, 0, 0.7)', // Modal overlays
    
    // Text
    text: '#F3F4F6',        // Primary text - WCAG AAA
    textMuted: '#9CA3AF',   // Secondary text - WCAG AA
    textInverse: '#1A1A1A', // Text on light backgrounds
    
    // Borders & Dividers
    border: '#374151',      // Default borders
    borderMuted: '#4B5563', // Subtle dividers
    
    // Status
    success: '#4ADE80',     // Success states
    successBg: '#022C22',   // Success backgrounds
    warning: '#FBBF24',     // Warning states
    warningBg: '#451A03',   // Warning backgrounds
    error: '#F87171',       // Error states
    errorBg: '#450A0A',     // Error backgrounds
    info: '#38BDF8',        // Info states
    infoBg: '#0C4A6E',      // Info backgrounds
  }
} as const;

// Spacing Tokens (based on 0.25rem = 4px)
export const spacing = {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  32: '8rem',      // 128px
  40: '10rem',     // 160px
  48: '12rem',     // 192px
  56: '14rem',     // 224px
  64: '16rem',     // 256px
} as const;

// Typography Tokens
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    heading: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],     // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem', fontWeight: '500' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],   // 36px
    '5xl': ['3rem', { lineHeight: '1', fontWeight: '700' }],           // 48px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

// Border Radius Tokens
export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',    // Pill shape
} as const;

// Shadow Tokens
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  // Special shadows
  focus: '0 0 0 2px rgba(30, 144, 255, 0.5)',
  card: '0 2px 8px 0 rgba(30, 144, 255, 0.08)',
} as const;

// Motion Tokens
export const motion = {
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Breakpoint Tokens
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-Index Tokens
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

// Component-specific Tokens
export const components = {
  button: {
    height: {
      sm: '2rem',      // 32px
      base: '2.5rem',  // 40px  
      lg: '3rem',      // 48px
    },
    padding: {
      sm: { x: '0.75rem', y: '0.5rem' },
      base: { x: '1rem', y: '0.6rem' },
      lg: { x: '1.5rem', y: '0.75rem' },
    },
    borderRadius: borderRadius.md,
    fontWeight: typography.fontWeight.semibold,
  },
  card: {
    padding: spacing[6],
    borderRadius: borderRadius.lg,
    shadow: shadows.card,
    border: '1px solid',
  },
  input: {
    height: '2.5rem',      // 40px
    padding: { x: '0.75rem', y: '0.5rem' },
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base,
    border: '1px solid',
  },
} as const;

// Export unified design tokens
export const designTokens = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  motion,
  breakpoints,
  zIndex,
  components,
} as const;

export default designTokens;