import React from 'react';
import { clsx } from 'clsx';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption';
type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'warning'
  | 'inherit';
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: TypographyElement;
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  truncate?: boolean;
  noWrap?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
};

const colorStyles: Record<TypographyColor, string> = {
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  error: 'text-red-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  inherit: 'text-inherit',
};

const alignStyles: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const getElementFromVariant = (
  variant: TypographyVariant
): TypographyElement => {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'body1':
    case 'body2':
      return 'p';
    case 'caption':
      return 'span';
    default:
      return 'p';
  }
};

export const Typography: React.FC<TypographyProps> = ({
  as,
  variant = 'body1',
  color = variant === 'caption' ? 'secondary' : 'inherit',
  align = 'left',
  truncate = false,
  noWrap = false,
  className,
  children,
  ...rest
}) => {
  const Component = as || getElementFromVariant(variant);

  const classes = clsx(
    variantStyles[variant],
    colorStyles[color],
    align !== 'left' && alignStyles[align],
    truncate && 'truncate',
    noWrap && 'whitespace-nowrap',
    className
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};
