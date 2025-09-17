import React from 'react';
import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';

export interface CardProps {
  interactive?: boolean;
  as?: 'div' | 'button' | 'a';
  href?: string;
  density?: 'compact' | 'default' | 'spacious';
  title?: React.ReactNode;
  meta?: React.ReactNode;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  className?: string;
  role?: string;
  motionPreset?: 'gentle' | 'lift' | 'none';
}

export const Card: React.FC<CardProps> = ({
  interactive = false,
  as = 'div',
  href,
  density = 'default',
  title,
  meta,
  badge,
  footer,
  onClick,
  children,
  className,
  role,
  motionPreset = 'gentle'
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Component: any = interactive ? (as === 'a' ? 'a' : as === 'button' ? 'button' : 'button') : as;
  const isButtonLike = interactive && Component === 'button';
  
  // Motion variants for 2025 card interactions
  const motionVariants = {
    gentle: {
      scale: shouldReduceMotion ? 1 : 0.98,
      transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
    },
    lift: {
      y: shouldReduceMotion ? 0 : 2,
      scale: shouldReduceMotion ? 1 : 0.99,
      transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
    },
    none: {}
  };
  
  const hoverVariants = {
    gentle: {
      y: shouldReduceMotion ? 0 : -2,
      scale: shouldReduceMotion ? 1 : 1.01,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
    },
    lift: {
      y: shouldReduceMotion ? 0 : -4,
      scale: shouldReduceMotion ? 1 : 1.02,
      transition: { duration: 0.2, ease: [0.175, 0.885, 0.32, 1.275] }
    },
    none: {}
  };

  const baseClasses = clsx(
    // Base card styles using design tokens
    'card-base',
    'relative',
    
    // Density variants
    {
      'p-4': density === 'compact',
      'p-6': density === 'default', 
      'p-8': density === 'spacious',
    },
    
    // Interactive states
    {
      'cursor-pointer focus-visible:sa-focus': interactive,
      'hover:shadow-card-hover hover:border-border-strong': interactive && !shouldReduceMotion,
    },
    
    className
  );

  const MotionCard = motionPreset !== 'none' ? motion.create(Component) : Component;
  const motionProps = motionPreset !== 'none' && interactive ? {
    whileTap: motionVariants[motionPreset],
    whileHover: hoverVariants[motionPreset],
    layout: true,
  } : {};

  return (
    <MotionCard
      className={baseClasses}
      onClick={onClick}
      {...(href && Component === 'a' ? { href } : {})}
      {...(interactive ? { tabIndex: 0 } : {})}
      {...(isButtonLike ? { type: 'button' } : {})}
      {...(role ? { role } : {})}
      {...motionProps}
    >
      {/* Card header with title, meta, and badge */}
      {(title || meta || badge) && (
        <motion.div 
          className="flex items-start justify-between gap-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            {title && (
              <motion.h3 
                className="text-lg font-semibold text-text line-clamp-2 m-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {title}
              </motion.h3>
            )}
            {meta && (
              <motion.div 
                className="text-sm text-text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.15 }}
              >
                {meta}
              </motion.div>
            )}
          </div>
          {badge && (
            <motion.span 
              className="inline-flex items-center px-2 py-1 text-xs font-medium uppercase tracking-wide bg-success-bg text-success rounded-sm flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              {badge}
            </motion.span>
          )}
        </motion.div>
      )}
      
      {/* Card body content */}
      {children && (
        <motion.div 
          className="text-base leading-relaxed text-text"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          {children}
        </motion.div>
      )}
      
      {/* Card footer */}
      {footer && (
        <motion.div 
          className="mt-auto pt-4 flex gap-3 flex-wrap"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
        >
          {footer}
        </motion.div>
      )}
      
      {/* Subtle shine effect for interactive cards */}
      {interactive && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 pointer-events-none"
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '200%', opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
      )}
    </MotionCard>
  );
};
