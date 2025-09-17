import React from 'react';
import clsx from 'clsx';

export interface TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label';
  color?: 'default' | 'muted' | 'inverse' | 'primary' | 'success' | 'warning' | 'error';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  className?: string;
  children: React.ReactNode;
}

const variantMapping = {
  h1: 'h1',
  h2: 'h2', 
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  caption: 'span',
  label: 'label',
} as const;

export const Typography: React.FC<TypographyProps> = ({
  as,
  variant = 'body',
  color = 'default',
  weight,
  align,
  className,
  children,
  ...rest
}) => {
  // Determine the HTML element to render
  const Component = as || variantMapping[variant] || 'p';
  
  // Determine if this is a heading variant
  const isHeading = variant.startsWith('h');
  
  const classes = clsx(
    // Base typography class
    isHeading ? 'ds-heading' : 'ds-text',
    
    // Variant-specific styles
    isHeading && `ds-heading--${variant}`,
    !isHeading && variant === 'body' && 'ds-text--base',
    !isHeading && variant === 'caption' && 'ds-text--sm',
    !isHeading && variant === 'label' && ['ds-text--sm', 'ds-font-medium'],
    
    // Color variants
    color === 'muted' && 'ds-text--muted',
    color === 'inverse' && 'ds-text--inverse',
    color === 'primary' && 'text-primary',
    color === 'success' && 'text-success',
    color === 'warning' && 'text-warning',
    color === 'error' && 'text-error',
    
    // Weight override
    weight === 'normal' && 'ds-font-normal',
    weight === 'medium' && 'ds-font-medium',
    weight === 'semibold' && 'ds-font-semibold',
    weight === 'bold' && 'ds-font-bold',
    
    // Text alignment
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    
    className
  );

  return React.createElement(Component, { className: classes, ...rest }, children);
};