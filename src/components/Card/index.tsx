import React from 'react';
import { clsx } from 'clsx';

type CardVariant = 'elevated' | 'outlined' | 'flat';
type CardPadding = 'none' | 'small' | 'medium' | 'large';
type CardElement = 'article' | 'section' | 'div';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: CardElement;
  variant?: CardVariant;
  padding?: CardPadding;
  noPadding?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hoverable?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  elevated: 'bg-white shadow-md',
  outlined: 'bg-white border border-gray-200',
  flat: 'bg-gray-50',
};

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  small: 'p-2',
  medium: 'p-4',
  large: 'p-6',
};

export const Card: React.FC<CardProps> = ({
  as: Component = 'article',
  variant = 'elevated',
  padding = 'medium',
  noPadding = false,
  header,
  footer,
  hoverable = false,
  fullWidth = false,
  fullHeight = false,
  onClick,
  className,
  children,
  ...rest
}) => {
  const cardClasses = clsx(
    'rounded-lg overflow-hidden',
    variantStyles[variant],
    hoverable && 'hover:shadow-lg transition-shadow duration-200',
    onClick && 'cursor-pointer',
    fullWidth && 'w-full',
    fullHeight && 'h-full',
    className
  );

  const contentClasses = clsx(!noPadding && paddingStyles[padding]);

  const headerClasses = clsx(
    'border-b border-gray-200',
    paddingStyles[padding]
  );

  const footerClasses = clsx(
    'border-t border-gray-200 bg-gray-50',
    paddingStyles[padding]
  );

  return (
    <Component className={cardClasses} onClick={onClick} {...rest}>
      {header && <div className={headerClasses}>{header}</div>}
      <div className={contentClasses} data-testid="card-content">
        {children}
      </div>
      {footer && <div className={footerClasses}>{footer}</div>}
    </Component>
  );
};
