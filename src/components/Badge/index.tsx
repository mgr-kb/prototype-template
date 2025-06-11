import React from 'react';
import { clsx } from 'clsx';

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';
type BadgeSize = 'small' | 'medium' | 'large';
type BadgeShape = 'rounded' | 'pill' | 'square';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  dot?: boolean;
  outline?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-800',
  primary: 'bg-blue-100 text-blue-800',
  secondary: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-cyan-100 text-cyan-800',
};

const outlineVariantStyles: Record<BadgeVariant, string> = {
  default: 'border-gray-600 text-gray-600',
  primary: 'border-blue-600 text-blue-600',
  secondary: 'border-gray-600 text-gray-600',
  success: 'border-green-600 text-green-600',
  warning: 'border-yellow-600 text-yellow-600',
  error: 'border-red-600 text-red-600',
  info: 'border-cyan-600 text-cyan-600',
};

const dotVariantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-600',
  primary: 'bg-blue-600',
  secondary: 'bg-gray-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  error: 'bg-red-600',
  info: 'bg-cyan-600',
};

const sizeStyles: Record<BadgeSize, string> = {
  small: 'px-1.5 py-0.5 text-xs',
  medium: 'px-2 py-1 text-xs',
  large: 'px-3 py-1.5 text-sm',
};

const shapeStyles: Record<BadgeShape, string> = {
  rounded: 'rounded',
  pill: 'rounded-full',
  square: '',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'medium',
  shape = 'rounded',
  dot = false,
  outline = false,
  dismissible = false,
  onDismiss,
  className,
  children,
  ...rest
}) => {
  const showDismissButton = Boolean(onDismiss ?? dismissible);

  const badgeClasses = clsx(
    'inline-flex items-center gap-1 font-medium transition-colors',
    outline ? 'bg-transparent border' : '',
    outline ? outlineVariantStyles[variant] : variantStyles[variant],
    sizeStyles[size],
    shapeStyles[shape],
    className
  );

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <span className={badgeClasses} {...rest}>
      {dot && (
        <span
          className={clsx('w-2 h-2 rounded-full', dotVariantStyles[variant])}
          data-testid="badge-dot"
        />
      )}
      {children}
      {showDismissButton && (
        <button
          type="button"
          onClick={handleDismiss}
          className="ml-1 hover:opacity-70 focus:outline-none focus:opacity-70"
          aria-label="Remove badge"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
};
