import React from 'react';
import clsx from 'clsx';

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
  className
}) => {
  const Component: any = interactive ? (as === 'a' ? 'a' : as === 'button' ? 'button' : 'button') : as;
  const isButtonLike = interactive && Component === 'button';
  const densityClass = density === 'compact' ? 'card--compact' : density === 'spacious' ? 'card--spacious' : undefined;
  return (
    <Component
      className={clsx('card', interactive && 'card--interactive', densityClass, className)}
      onClick={onClick}
      {...(href && Component === 'a' ? { href } : {})}
      {...(interactive ? { tabIndex: 0 } : {})}
      {...(isButtonLike ? { type: 'button' } : {})}
    >
      {(title || meta || badge) && (
        <div className="card__header">
          <div style={{display:'flex', flexDirection:'column', gap:4}}>
            {title && <h3 className="card__title">{title}</h3>}
            {meta && <div className="card__meta">{meta}</div>}
          </div>
          {badge && <span className="card__badge">{badge}</span>}
        </div>
      )}
      {children && <div className="card__body">{children}</div>}
      {footer && <div className="card__footer">{footer}</div>}
    </Component>
  );
};
