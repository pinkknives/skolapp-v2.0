import React from 'react';
import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  srLabel?: string; // Required for icon-only buttons
  spinnerPosition?: 'left' | 'right';
  motionPreset?: 'gentle' | 'bounce' | 'none';
}

const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <motion.svg
    className={clsx('animate-spin', className)}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.15 }}
  >
    <circle
      cx="8"
      cy="8"
      r="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="37.7"
      strokeDashoffset="9.425"
    />
  </motion.svg>
);

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  fullWidth,
  icon,
  iconRight,
  srLabel,
  className,
  children,
  spinnerPosition = 'left',
  motionPreset = 'gentle',
  ...rest
}) => {
  const isIconOnly = variant === 'icon' && !children;
  const shouldReduceMotion = useReducedMotion();
  
  // Accessibility validation
  if (isIconOnly && !srLabel) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Icon button requires srLabel for accessibility');
    }
  }
  
  const isDisabled = loading || disabled;
  
  // Motion variants for 2025 micro-interactions  
  const motionVariants = {
    gentle: { scale: shouldReduceMotion ? 1 : 0.98 },
    bounce: { scale: shouldReduceMotion ? 1 : 0.95 },
    none: {}
  };
  
  const hoverVariants = {
    gentle: { scale: shouldReduceMotion ? 1 : 1.02, y: shouldReduceMotion ? 0 : -1 },
    bounce: { scale: shouldReduceMotion ? 1 : 1.05 },
    none: {}
  };

  const baseClasses = clsx(
    // Base button styles using design tokens
    'btn-base',
    'relative overflow-hidden',
    'focus-visible:sa-focus',
    
    // Size variants
    {
      'px-4 py-2 text-sm min-h-btn-sm': size === 'sm',
      'px-6 py-3 text-sm min-h-btn-md': size === 'md', 
      'px-8 py-4 text-base min-h-btn-lg': size === 'lg',
    },
    
    // Variant styles
    {
      // Primary
      'bg-primary text-white shadow-md hover:bg-primary-hover active:bg-primary-active': 
        variant === 'primary',
      
      // Secondary  
      'bg-surface text-text border-2 border-border hover:border-primary hover:text-primary shadow-sm':
        variant === 'secondary',
      
      // Danger
      'bg-error text-white shadow-md hover:bg-red-600 active:bg-red-700':
        variant === 'danger',
      
      // Ghost
      'bg-transparent text-text hover:bg-surface-elevated':
        variant === 'ghost',
      
      // Link
      'bg-transparent text-primary font-medium p-0 min-h-auto shadow-none hover:underline':
        variant === 'link',
      
      // Icon-only
      'w-11 h-11 p-0 justify-center bg-transparent text-text hover:bg-surface-elevated':
        variant === 'icon',
    },
    
    // Full width
    { 'w-full': fullWidth },
    
    // Disabled/loading states
    { 'opacity-60 cursor-not-allowed': isDisabled },
    
    className
  );

  const MotionButton = motionPreset !== 'none' ? motion.button : 'button';
  const motionProps = motionPreset !== 'none' ? {
    whileTap: motionVariants[motionPreset],
    whileHover: !isDisabled ? hoverVariants[motionPreset] : undefined,
    layout: true,
  } : {};

  // Separate motion props from native button props
  const { 
    onDrag, 
    onDragEnd, 
    onDragStart, 
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    ...nativeProps 
  } = rest;

  if (motionPreset === 'none') {
    return (
      <button
        className={baseClasses}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        aria-label={isIconOnly ? srLabel : undefined}
        {...nativeProps}
      >
        {/* Button content */}
        {loading && spinnerPosition === 'left' && (
          <Spinner className="w-4 h-4" />
        )}
        
        {icon && !loading && (
          <span className="inline-flex items-center" aria-hidden="true">
            {icon}
          </span>
        )}
        
        {children && (
          <span className="relative z-10">
            {children}
          </span>
        )}
        
        {iconRight && !loading && (
          <span className="inline-flex items-center" aria-hidden="true">
            {iconRight}
          </span>
        )}
        
        {loading && spinnerPosition === 'right' && (
          <Spinner className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <motion.button
      className={baseClasses}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      aria-label={isIconOnly ? srLabel : undefined}
      whileTap={motionVariants[motionPreset]}
      whileHover={!isDisabled ? hoverVariants[motionPreset] : undefined}
      {...nativeProps}
    >
      {/* Shimmer effect for primary buttons */}
      {variant === 'primary' && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
      
      {/* Loading spinner */}
      {loading && spinnerPosition === 'left' && (
        <Spinner className="w-4 h-4" />
      )}
      
      {/* Left icon */}
      {icon && !loading && (
        <motion.span 
          className="inline-flex items-center" 
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
        >
          {icon}
        </motion.span>
      )}
      
      {/* Button content */}
      {children && (
        <motion.span 
          className="relative z-10"
          layout
        >
          {children}
        </motion.span>
      )}
      
      {/* Right icon */}
      {iconRight && !loading && (
        <motion.span 
          className="inline-flex items-center" 
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15, delay: 0.05 }}
        >
          {iconRight}
        </motion.span>
      )}
      
      {/* Loading spinner - right position */}
      {loading && spinnerPosition === 'right' && (
        <Spinner className="w-4 h-4" />
      )}
    </motion.button>
  );
};
