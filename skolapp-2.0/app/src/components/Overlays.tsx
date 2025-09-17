import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

export interface DialogProps extends Omit<ModalProps, 'children'> {
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ToastProps {
  id: string;
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss: (id: string) => void;
}

// Modal Component
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  footer,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      // Focus first focusable element or modal itself
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements?.[0] as HTMLElement;
      
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        modalRef.current?.focus();
      }
    } else {
      // Restore focus when modal closes
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Trap focus within modal
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements?.length) return;
      
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  };

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg', 
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full m-4',
  };

  const content = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-text/50 backdrop-blur-sm z-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
            onClick={closeOnBackdropClick ? onClose : undefined}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-modal">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'modal-title' : undefined}
              tabIndex={-1}
              className={clsx(
                'relative bg-surface rounded-xl shadow-xl border border-border',
                'flex flex-col max-h-full',
                sizeClasses[size],
                className
              )}
              initial={{ 
                opacity: 0, 
                scale: shouldReduceMotion ? 1 : 0.9,
                y: shouldReduceMotion ? 0 : 20 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0 
              }}
              exit={{ 
                opacity: 0, 
                scale: shouldReduceMotion ? 1 : 0.9,
                y: shouldReduceMotion ? 0 : 20 
              }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
              onKeyDown={handleKeyDown}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 border-b border-border">
                  {title && (
                    <h2 id="modal-title" className="text-xl font-semibold text-text">
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <Button
                      variant="icon"
                      onClick={onClose}
                      srLabel="Close modal"
                      className="ml-auto"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1 overflow-auto p-6">
                {children}
              </div>
              
              {/* Footer */}
              {footer && (
                <div className="flex gap-3 p-6 border-t border-border">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
};

// Dialog Component (Alert/Confirm)
export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  ...modalProps
}) => {
  const iconMap = {
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌',
    success: '✅',
  };

  const colorMap = {
    info: 'text-primary',
    warning: 'text-warning',
    error: 'text-error',
    success: 'text-success',
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex gap-3 w-full">
          {onCancel && (
            <Button 
              variant="secondary" 
              onClick={handleCancel}
              className="flex-1"
            >
              {cancelText}
            </Button>
          )}
          <Button 
            variant={type === 'error' ? 'danger' : 'primary'} 
            onClick={handleConfirm}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      }
      {...modalProps}
    >
      <div className="flex items-start gap-4">
        <div className={clsx('text-2xl', colorMap[type])}>
          {iconMap[type]}
        </div>
        <div className="flex-1">
          <p className="text-text leading-relaxed">{message}</p>
        </div>
      </div>
    </Modal>
  );
};

// Toast Component
export const Toast: React.FC<ToastProps> = ({
  id,
  title,
  message,
  type = 'info',
  duration = 5000,
  action,
  onDismiss,
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  const bgColorMap = {
    info: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };

  const iconMap = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <motion.div
      className="bg-surface border border-border rounded-lg shadow-lg p-4 mb-3 max-w-sm"
      initial={{ 
        opacity: 0, 
        x: shouldReduceMotion ? 0 : 300,
        scale: shouldReduceMotion ? 1 : 0.9 
      }}
      animate={{ 
        opacity: 1, 
        x: 0,
        scale: 1 
      }}
      exit={{ 
        opacity: 0, 
        x: shouldReduceMotion ? 0 : 300,
        scale: shouldReduceMotion ? 1 : 0.9 
      }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
      layout
    >
      <div className="flex items-start gap-3">
        {/* Status indicator */}
        <div className={clsx(
          'w-1 h-full rounded-full flex-shrink-0',
          bgColorMap[type]
        )} />
        
        {/* Icon */}
        <div className="text-lg flex-shrink-0">
          {iconMap[type]}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-medium text-text text-sm mb-1">
              {title}
            </div>
          )}
          <div className="text-text-muted text-sm">
            {message}
          </div>
          
          {action && (
            <Button
              variant="link"
              size="sm"
              onClick={action.onClick}
              className="mt-2 p-0 h-auto text-primary"
            >
              {action.label}
            </Button>
          )}
        </div>
        
        {/* Close button */}
        <Button
          variant="icon"
          size="sm"
          onClick={() => onDismiss(id)}
          srLabel="Dismiss notification"
          className="text-text-muted hover:text-text"
        >
          ✕
        </Button>
      </div>
    </motion.div>
  );
};

// Toast Container (manages multiple toasts)
export const ToastContainer: React.FC<{
  toasts: ToastProps[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}> = ({ 
  toasts, 
  position = 'top-right' 
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4', 
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const content = (
    <div className={clsx(
      'fixed z-toast pointer-events-none',
      positionClasses[position]
    )}>
      <div className="flex flex-col gap-2 pointer-events-auto">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

// Hooks for managing toasts
export const useToasts = () => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, 'id' | 'onDismiss'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id, onDismiss: removeToast }]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
  };
};