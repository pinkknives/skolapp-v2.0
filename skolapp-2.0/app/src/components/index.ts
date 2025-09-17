/**
 * Skolapp Design System - Component Library Exports
 * 
 * This file exports all design system components for easy importing.
 * Use these components instead of custom implementations to ensure
 * consistency and design system compliance.
 */

// Core Components
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Card } from './Card';
export type { CardProps } from './Card';

export { Field } from './Field';
export type { FieldProps } from './Field';

export { Typography } from './Typography';
export type { TypographyProps } from './Typography';

// Design Tokens
export { designTokens } from '../design-tokens';

// Re-export existing components that may be used
// These should eventually be migrated to use design system versions
export { Button as LegacyButton } from './Button';
export { Card as LegacyCard } from './Card';
export { Field as LegacyField } from './Field';