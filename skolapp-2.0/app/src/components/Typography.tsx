import React from 'react';
import clsx from 'clsx';

// Common typography props
interface TypographyBaseProps {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

// Heading component for H1-H6
interface HeadingProps extends TypographyBaseProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  tracking?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider';
  balance?: boolean; // CSS text-wrap: balance for better headings
}

// Text component for paragraphs and spans
interface TextProps extends TypographyBaseProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  variant?: 'body' | 'caption' | 'lead' | 'muted';
  truncate?: boolean;
  lineClamp?: number;
}

// Lead text for introductory paragraphs
interface LeadProps extends TypographyBaseProps {
  size?: 'sm' | 'md' | 'lg';
}

// Code component for inline and block code
interface CodeProps extends TypographyBaseProps {
  inline?: boolean;
  language?: string;
}

// Heading Component
export const Heading: React.FC<HeadingProps> = ({
  level,
  size,
  weight = 'bold',
  tracking = 'tight',
  balance = true,
  className,
  children,
  as,
  ...rest
}) => {
  // Default sizes for each heading level
  const defaultSizes = {
    1: '4xl',
    2: '3xl', 
    3: '2xl',
    4: 'xl',
    5: 'lg',
    6: 'base',
  } as const;
  
  const Component = as || `h${level}` as keyof JSX.IntrinsicElements;
  const finalSize = size || defaultSizes[level];
  
  const classes = clsx(
    // Base heading styles
    'font-heading',
    'leading-tight',
    'm-0',
    
    // Size classes
    {
      'text-xs': finalSize === 'xs',
      'text-sm': finalSize === 'sm',
      'text-base': finalSize === 'md',
      'text-lg': finalSize === 'lg',
      'text-xl': finalSize === 'xl',
      'text-2xl': finalSize === '2xl',
      'text-3xl': finalSize === '3xl',
      'text-4xl': finalSize === '4xl',
      'text-5xl': finalSize === '5xl',
    },
    
    // Weight classes
    {
      'font-light': weight === 'light',
      'font-normal': weight === 'normal',
      'font-medium': weight === 'medium',
      'font-semibold': weight === 'semibold',
      'font-bold': weight === 'bold',
      'font-extrabold': weight === 'extrabold',
    },
    
    // Letter spacing
    {
      'tracking-tighter': tracking === 'tighter',
      'tracking-tight': tracking === 'tight',
      'tracking-normal': tracking === 'normal',
      'tracking-wide': tracking === 'wide',
      'tracking-wider': tracking === 'wider',
    },
    
    // Text balance for better line breaks
    balance && 'text-balance',
    
    // Color
    'text-text',
    
    className
  );

  return (
    <Component 
      className={classes} 
      {...rest}
    >
      {children}
    </Component>
  );
};

// Text Component
export const Text: React.FC<TextProps> = ({
  size = 'base',
  weight = 'normal',
  variant = 'body',
  truncate = false,
  lineClamp,
  className,
  children,
  as = 'p',
  ...rest
}) => {
  const Component = as;
  
  const classes = clsx(
    // Base text styles
    'font-sans',
    
    // Size classes
    {
      'text-xs': size === 'xs',
      'text-sm': size === 'sm',
      'text-base': size === 'base',
      'text-lg': size === 'lg',
      'text-xl': size === 'xl',
    },
    
    // Weight classes
    {
      'font-light': weight === 'light',
      'font-normal': weight === 'normal',
      'font-medium': weight === 'medium',
      'font-semibold': weight === 'semibold',
      'font-bold': weight === 'bold',
    },
    
    // Variant styles
    {
      'text-text leading-relaxed': variant === 'body',
      'text-text-muted text-sm leading-normal': variant === 'caption',
      'text-text text-lg leading-relaxed font-light': variant === 'lead',
      'text-text-muted': variant === 'muted',
    },
    
    // Text utilities
    {
      'truncate': truncate,
      [`line-clamp-${lineClamp}`]: lineClamp,
    },
    
    // Default margins for paragraphs
    as === 'p' && 'm-0 mb-4',
    
    className
  );

  return (
    <Component 
      className={classes} 
      {...rest}
    >
      {children}
    </Component>
  );
};

// Lead Component
export const Lead: React.FC<LeadProps> = ({
  size = 'md',
  className,
  children,
  as = 'p',
  ...rest
}) => {
  const Component = as;
  
  const classes = clsx(
    'font-light text-text leading-relaxed',
    {
      'text-lg': size === 'sm',
      'text-xl': size === 'md',
      'text-2xl': size === 'lg',
    },
    'mb-6',
    className
  );

  return (
    <Component 
      className={classes} 
      {...rest}
    >
      {children}
    </Component>
  );
};

// Code Component
export const Code: React.FC<CodeProps> = ({
  inline = false,
  language,
  className,
  children,
  as,
  ...rest
}) => {
  const Component = as || (inline ? 'code' : 'pre');
  
  const classes = clsx(
    'font-mono',
    {
      // Inline code
      'px-1.5 py-0.5 text-sm bg-surface-elevated text-text rounded-sm border border-border': inline,
      // Block code
      'p-4 text-sm bg-surface-elevated text-text rounded-lg border border-border overflow-x-auto': !inline,
    },
    className
  );

  return (
    <Component 
      className={classes} 
      {...rest}
    >
      {!inline && language && (
        <div className="text-xs text-text-muted mb-2 font-sans">
          {language}
        </div>
      )}
      {inline ? children : <code>{children}</code>}
    </Component>
  );
};

// Convenience components for common heading levels
export const H1: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={1} {...props} />
);

export const H2: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={2} {...props} />
);

export const H3: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={3} {...props} />
);

export const H4: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={4} {...props} />
);

export const H5: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={5} {...props} />
);

export const H6: React.FC<Omit<HeadingProps, 'level'>> = (props) => (
  <Heading level={6} {...props} />
);

// Small text component
export const Small: React.FC<Omit<TextProps, 'size'>> = (props) => (
  <Text size="sm" variant="muted" as="small" {...props} />
);

// Caption component
export const Caption: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="caption" as="span" {...props} />
);

// Muted text component  
export const Muted: React.FC<Omit<TextProps, 'variant'>> = (props) => (
  <Text variant="muted" as="span" {...props} />
);