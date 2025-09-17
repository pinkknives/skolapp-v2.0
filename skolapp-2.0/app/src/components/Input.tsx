import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'minimal';
  isValid?: boolean;
  isInvalid?: boolean;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  variant?: 'default' | 'filled' | 'minimal';
  isValid?: boolean;
  isInvalid?: boolean;
  rows?: number;
}

// Input component
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  errorMessage,
  startIcon,
  endIcon,
  variant = 'default',
  isValid,
  isInvalid,
  className,
  id,
  required,
  disabled,
  ...rest
}, ref) => {
  const shouldReduceMotion = useReducedMotion();
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = helperText || errorMessage ? `${inputId}-helper` : undefined;
  
  const hasError = isInvalid || !!errorMessage;
  const hasSuccess = isValid && !hasError;
  
  const containerClasses = clsx(
    'relative flex flex-col gap-2'
  );
  
  const inputClasses = clsx(
    // Base input styles using design tokens
    'input-base',
    'relative z-10',
    
    // Variant styles
    {
      'bg-surface border-border': variant === 'default',
      'bg-surface-elevated border-border-subtle': variant === 'filled',
      'bg-transparent border-0 border-b-2 border-border rounded-none px-0': variant === 'minimal',
    },
    
    // State styles
    {
      'border-error focus:border-error focus:shadow-red-500/30': hasError,
      'border-success focus:border-success focus:shadow-green-500/30': hasSuccess,
      'opacity-60 cursor-not-allowed': disabled,
    },
    
    // Icon spacing
    {
      'pl-10': startIcon,
      'pr-10': endIcon,
    },
    
    className
  );

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <motion.label
          htmlFor={inputId}
          className={clsx(
            'text-sm font-medium text-text select-none cursor-pointer',
            { 'text-error': hasError },
            { 'text-success': hasSuccess }
          )}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {label}
          {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
        </motion.label>
      )}
      
      {/* Input container */}
      <div className="relative">
        {/* Start icon */}
        {startIcon && (
          <motion.div
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15, delay: 0.05 }}
          >
            {startIcon}
          </motion.div>
        )}
        
        {/* Input field */}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          required={required}
          aria-describedby={helperId}
          aria-invalid={hasError}
          {...rest}
        />
        
        {/* End icon */}
        {endIcon && (
          <motion.div
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15, delay: 0.1 }}
          >
            {endIcon}
          </motion.div>
        )}
        
        {/* Focus ring animation */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-md border-2 border-primary opacity-0 pointer-events-none"
            whileFocus={{ opacity: 0.3 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </div>
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <motion.div
          id={helperId}
          className={clsx(
            'text-sm',
            {
              'text-text-muted': !hasError,
              'text-error': hasError,
            }
          )}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          role={hasError ? 'alert' : undefined}
        >
          {errorMessage || helperText}
        </motion.div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Textarea component
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  helperText,
  errorMessage,
  variant = 'default',
  isValid,
  isInvalid,
  className,
  id,
  required,
  disabled,
  rows = 4,
  ...rest
}, ref) => {
  const shouldReduceMotion = useReducedMotion();
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = helperText || errorMessage ? `${textareaId}-helper` : undefined;
  
  const hasError = isInvalid || !!errorMessage;
  const hasSuccess = isValid && !hasError;
  
  const containerClasses = clsx(
    'relative flex flex-col gap-2'
  );
  
  const textareaClasses = clsx(
    // Base textarea styles
    'input-base',
    'resize-vertical',
    
    // Variant styles
    {
      'bg-surface border-border': variant === 'default',
      'bg-surface-elevated border-border-subtle': variant === 'filled',
      'bg-transparent border-0 border-b-2 border-border rounded-none px-0': variant === 'minimal',
    },
    
    // State styles
    {
      'border-error focus:border-error focus:shadow-red-500/30': hasError,
      'border-success focus:border-success focus:shadow-green-500/30': hasSuccess,
      'opacity-60 cursor-not-allowed': disabled,
    },
    
    className
  );

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <motion.label
          htmlFor={textareaId}
          className={clsx(
            'text-sm font-medium text-text select-none cursor-pointer',
            { 'text-error': hasError },
            { 'text-success': hasSuccess }
          )}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {label}
          {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
        </motion.label>
      )}
      
      {/* Textarea field */}
      <textarea
        ref={ref}
        id={textareaId}
        className={textareaClasses}
        disabled={disabled}
        required={required}
        rows={rows}
        aria-describedby={helperId}
        aria-invalid={hasError}
        {...rest}
      />
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <motion.div
          id={helperId}
          className={clsx(
            'text-sm',
            {
              'text-text-muted': !hasError,
              'text-error': hasError,
            }
          )}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          role={hasError ? 'alert' : undefined}
        >
          {errorMessage || helperText}
        </motion.div>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';