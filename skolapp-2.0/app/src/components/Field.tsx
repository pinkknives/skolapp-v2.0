import React, { useId } from 'react';
import clsx from 'clsx';
import { designTokens } from '../design-tokens';

export interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  help?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  icon?: React.ReactNode;
  autoComplete?: string;
  onBlur?: () => void;
  as?: 'input' | 'textarea';
}

export const Field: React.FC<FieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  help,
  error,
  required,
  disabled,
  type = 'text',
  icon,
  autoComplete,
  onBlur,
  as = 'input'
}) => {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;
  const helpId = help ? `${id}-help` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(' ') || undefined;
  const Control: any = as;
  
  return (
    <div className={clsx(
      'ds-field',
      error && 'ds-field--error',
      disabled && 'ds-field--disabled',
      icon && 'ds-field--with-icon'
    )}>
      <label className="ds-field__label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true" className="ds-field__required"> *</span>}
      </label>
      {icon && <span className="ds-field__icon" aria-hidden="true">{icon}</span>}
      <Control
        id={id}
        name={name}
        className={clsx(
          'ds-input',
          as === 'textarea' && 'ds-textarea',
          error && 'ds-input--error'
        )}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        type={as === 'input' ? type : undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        autoComplete={autoComplete}
        onBlur={onBlur}
      />
      {help && <div className="ds-field__help" id={helpId}>{help}</div>}
      {error && <div className="ds-field__error" id={errorId}>{error}</div>}
    </div>
  );
};
