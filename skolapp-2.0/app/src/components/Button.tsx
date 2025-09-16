import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link' | 'icon';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  srLabel?: string; // krävs vid icon-only
  spinnerPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  fullWidth,
  icon,
  iconRight,
  srLabel,
  className,
  children,
  spinnerPosition = 'left',
  ...rest
}) => {
  const isIconOnly = variant === 'icon' && !children;
  if (isIconOnly && !srLabel) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Icon button utan srLabel');
    }
  }
  const label = isIconOnly ? srLabel : undefined;
  const ariaDisabled = loading || disabled ? true : undefined;
  return (
    <button
      className={clsx(
        'btn', 
        `btn--${variant}`, 
        `btn--${size}`,
        fullWidth && 'btn--full', 
        loading && 'is-loading', 
        className
      )}
      disabled={disabled || loading}
      aria-disabled={ariaDisabled}
      aria-busy={loading || undefined}
      aria-label={label}
      {...rest}
    >
      {loading && spinnerPosition === 'left' && <span className="btn__spinner" aria-hidden="true" />}
      {icon && <span className="btn__icon" aria-hidden="true">{icon}</span>}
      {children && <span className="btn__label">{children}</span>}
      {iconRight && <span className="btn__icon btn__icon--right" aria-hidden="true">{iconRight}</span>}
      {loading && spinnerPosition === 'right' && <span className="btn__spinner" aria-hidden="true" />}
    </button>
  );
};
