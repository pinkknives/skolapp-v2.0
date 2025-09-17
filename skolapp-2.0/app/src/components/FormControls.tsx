import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: 'default' | 'filled' | 'minimal';
  isValid?: boolean;
  isInvalid?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: SelectOption[];
  orientation?: 'horizontal' | 'vertical';
  isInvalid?: boolean;
  disabled?: boolean;
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  helperText?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
}

// Select Component
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  helperText,
  errorMessage,
  options,
  placeholder,
  variant = 'default',
  isValid,
  isInvalid,
  size = 'md',
  className,
  id,
  required,
  disabled,
  ...rest
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = helperText || errorMessage ? `${selectId}-helper` : undefined;
  
  const hasError = isInvalid || !!errorMessage;
  const hasSuccess = isValid && !hasError;
  
  const containerClasses = clsx(
    'relative flex flex-col gap-2'
  );
  
  const selectClasses = clsx(
    // Base select styles
    'input-base',
    'appearance-none',
    'cursor-pointer',
    
    // Size variants
    {
      'text-sm py-2 px-3 min-h-9': size === 'sm',
      'text-base py-3 px-4 min-h-11': size === 'md',
      'text-lg py-4 px-5 min-h-12': size === 'lg',
    },
    
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
        <label
          htmlFor={selectId}
          className={clsx(
            'text-sm font-medium text-text select-none cursor-pointer',
            { 'text-error': hasError },
            { 'text-success': hasSuccess }
          )}
        >
          {label}
          {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      
      {/* Select container */}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          disabled={disabled}
          required={required}
          aria-describedby={helperId}
          aria-invalid={hasError}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Dropdown icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.427 6.427a.6.6 0 0 1 .849 0L8 9.151l2.724-2.724a.6.6 0 1 1 .849.849l-3.148 3.148a.6.6 0 0 1-.85 0L4.427 7.276a.6.6 0 0 1 0-.849Z"/>
          </svg>
        </div>
      </div>
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <div
          id={helperId}
          className={clsx(
            'text-sm',
            {
              'text-text-muted': !hasError,
              'text-error': hasError,
            }
          )}
          role={hasError ? 'alert' : undefined}
        >
          {errorMessage || helperText}
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

// Radio Group Component
export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  label,
  helperText,
  errorMessage,
  options,
  orientation = 'vertical',
  isInvalid,
  disabled,
}) => {
  const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = helperText || errorMessage ? `${groupId}-helper` : undefined;
  const hasError = isInvalid || !!errorMessage;

  return (
    <div className="flex flex-col gap-3">
      {/* Group label */}
      {label && (
        <div className={clsx(
          'text-sm font-medium text-text',
          { 'text-error': hasError }
        )}>
          {label}
        </div>
      )}
      
      {/* Radio options */}
      <div 
        role="radiogroup"
        aria-labelledby={label ? groupId : undefined}
        aria-describedby={helperId}
        aria-invalid={hasError}
        className={clsx(
          'flex gap-4',
          {
            'flex-col': orientation === 'vertical',
            'flex-row flex-wrap': orientation === 'horizontal',
          }
        )}
      >
        {options.map((option) => (
          <RadioOption
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled || option.disabled}
            hasError={hasError}
          />
        ))}
      </div>
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <div
          id={helperId}
          className={clsx(
            'text-sm',
            {
              'text-text-muted': !hasError,
              'text-error': hasError,
            }
          )}
          role={hasError ? 'alert' : undefined}
        >
          {errorMessage || helperText}
        </div>
      )}
    </div>
  );
};

// Individual Radio Option
const RadioOption: React.FC<{
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  hasError?: boolean;
}> = ({ name, value, label, checked, onChange, disabled, hasError }) => {
  const radioId = `radio-${name}-${value}`;

  return (
    <motion.label
      htmlFor={radioId}
      className={clsx(
        'flex items-center gap-3 cursor-pointer min-h-touch-target',
        {
          'opacity-60 cursor-not-allowed': disabled,
        }
      )}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <div className="relative">
        <input
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <div className={clsx(
          'w-5 h-5 rounded-full border-2 transition-all duration-base flex items-center justify-center',
          {
            'border-primary bg-primary': checked && !hasError,
            'border-error bg-error': checked && hasError,
            'border-border bg-surface': !checked && !hasError,
            'border-error bg-surface': !checked && hasError,
          }
        )}>
          {checked && (
            <motion.div
              className="w-2 h-2 rounded-full bg-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.15 }}
            />
          )}
        </div>
      </div>
      <span className={clsx(
        'text-sm font-medium select-none',
        {
          'text-text': !hasError,
          'text-error': hasError,
        }
      )}>
        {label}
      </span>
    </motion.label>
  );
};

// Checkbox Component
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  helperText,
  errorMessage,
  isInvalid,
  size = 'md',
  variant = 'default',
  className,
  id,
  disabled,
  checked,
  ...rest
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = helperText || errorMessage ? `${checkboxId}-helper` : undefined;
  const hasError = isInvalid || !!errorMessage;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex flex-col gap-2">
      <motion.label
        htmlFor={checkboxId}
        className={clsx(
          'flex items-start gap-3 cursor-pointer min-h-touch-target',
          {
            'opacity-60 cursor-not-allowed': disabled,
            'p-4 border border-border rounded-lg hover:border-primary': variant === 'card',
          },
          className
        )}
        whileHover={!disabled ? { scale: variant === 'card' ? 1.01 : 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            checked={checked}
            disabled={disabled}
            aria-describedby={helperId}
            aria-invalid={hasError}
            className="sr-only"
            {...rest}
          />
          <div className={clsx(
            sizeClasses[size],
            'rounded border-2 transition-all duration-base flex items-center justify-center',
            {
              'border-primary bg-primary': checked && !hasError,
              'border-error bg-error': checked && hasError,
              'border-border bg-surface': !checked && !hasError,
              'border-error bg-surface': !checked && hasError,
            }
          )}>
            {checked && (
              <motion.svg
                width={size === 'sm' ? 12 : size === 'md' ? 14 : 16}
                height={size === 'sm' ? 12 : size === 'md' ? 14 : 16}
                viewBox="0 0 16 16"
                fill="white"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
              </motion.svg>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <span className={clsx(
            'text-sm font-medium select-none',
            {
              'text-text': !hasError,
              'text-error': hasError,
            }
          )}>
            {label}
          </span>
          
          {(helperText || errorMessage) && (
            <div
              id={helperId}
              className={clsx(
                'text-sm mt-1',
                {
                  'text-text-muted': !hasError,
                  'text-error': hasError,
                }
              )}
              role={hasError ? 'alert' : undefined}
            >
              {errorMessage || helperText}
            </div>
          )}
        </div>
      </motion.label>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';