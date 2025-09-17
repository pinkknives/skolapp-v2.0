import React from 'react';
import clsx from 'clsx';
import { designTokens } from '../design-tokens';

export interface CardProps {
  interactive?: boolean;
  as?: 'div' | 'button' | 'a';
  href?: string;
  density?: 'default' | 'compact' | 'spacious';
  title?: React.ReactNode;
  meta?: React.ReactNode;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  className?: string;
  role?: string;
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
  role
}) => {
  const Component: any = interactive ? (as === 'a' ? 'a' : as === 'button' ? 'button' : 'button') : as;
  const isButtonLike = interactive && Component === 'button';
  
  return (
    <Component
      className={clsx(
        'ds-card',
        interactive && 'ds-card--interactive',
        density === 'compact' && 'ds-card--compact',
        density === 'spacious' && 'ds-card--spacious',
        className
      )}
      onClick={onClick}
      {...(href && Component === 'a' ? { href } : {})}
      {...(interactive ? { tabIndex: 0 } : {})}
      {...(isButtonLike ? { type: 'button' } : {})}
      {...(role ? { role } : {})}
    >
      {(title || meta || badge) && (
        <div className="ds-card__header">
          <div className="ds-flex ds-flex-col ds-gap-1">
            {title && <h3 className="ds-card__title">{title}</h3>}
            {meta && <div className="ds-card__meta">{meta}</div>}
          </div>
          {badge && <span className="ds-card__badge">{badge}</span>}
        </div>
      )}
      {children && <div className="ds-card__body">{children}</div>}
      {footer && <div className="ds-card__footer">{footer}</div>}
    </Component>
  );
};
