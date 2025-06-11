'use client';

import React, { useEffect, useId } from 'react';
import { clsx } from 'clsx';

type ModalSize = 'small' | 'medium' | 'large' | 'full';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
  children: React.ReactNode;
}

const sizeStyles: Record<ModalSize, string> = {
  small: 'max-w-sm',
  medium: 'max-w-md',
  large: 'max-w-2xl',
  full: 'max-w-full m-4',
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  size = 'medium',
  showCloseButton = true,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  className,
  children,
}) => {
  const titleId = useId();

  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';

      const firstFocusableElement = document.querySelector(
        '[data-testid="modal-content"] button, [data-testid="modal-content"] [href], [data-testid="modal-content"] input, [data-testid="modal-content"] select, [data-testid="modal-content"] textarea, [data-testid="modal-content"] [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;

      firstFocusableElement?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const modalClasses = clsx(
    'bg-white rounded-lg shadow-xl w-full mx-4',
    sizeStyles[size],
    className
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      data-testid="modal-overlay"
    >
      <div
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        data-testid="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            className="flex items-center justify-between px-6 py-4 border-b border-gray-200"
            data-testid="modal-header"
          >
            <h2 id={titleId} className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
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
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};
