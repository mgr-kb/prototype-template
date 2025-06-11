import React, { useId } from 'react';
import { clsx } from 'clsx';

type InputSize = 'small' | 'medium' | 'large';
type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  type?: InputType;
  size?: InputSize;
  fullWidth?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
}

const sizeStyles: Record<InputSize, string> = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-3 py-2 text-base',
  large: 'px-4 py-3 text-lg',
};

export const Input: React.FC<InputProps> = ({
  type = 'text',
  size = 'medium',
  fullWidth = false,
  error = false,
  errorMessage,
  helperText,
  label,
  className,
  required,
  id,
  ...rest
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const baseClasses =
    'rounded border transition-colors focus:outline-none focus:ring-2';

  const stateClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200';

  const inputClasses = clsx(
    baseClasses,
    sizeStyles[size],
    stateClasses,
    fullWidth && 'w-full',
    'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
    className
  );

  const labelClasses = clsx(
    'block mb-1 font-medium',
    size === 'small' && 'text-sm',
    size === 'large' && 'text-lg',
    error && 'text-red-600'
  );

  const helperClasses = clsx(
    'mt-1',
    size === 'small' && 'text-xs',
    size === 'medium' && 'text-sm',
    size === 'large' && 'text-base',
    error ? 'text-red-600' : 'text-gray-600'
  );

  const showHelperText = errorMessage || helperText;
  const helperTextContent = error && errorMessage ? errorMessage : helperText;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={inputClasses}
        aria-invalid={error}
        aria-required={required}
        aria-describedby={showHelperText ? `${inputId}-helper` : undefined}
        required={required}
        data-testid={type === 'password' ? 'input' : undefined}
        {...rest}
      />
      {showHelperText && (
        <p id={`${inputId}-helper`} className={helperClasses}>
          {helperTextContent}
        </p>
      )}
    </div>
  );
};
