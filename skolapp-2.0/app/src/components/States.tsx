import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { H3, Text } from './Typography';

// Empty State Component
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  illustration?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
  size = 'md',
  illustration,
}) => {
  const containerClasses = clsx(
    'flex flex-col items-center justify-center text-center',
    {
      'py-8 px-4': size === 'sm',
      'py-12 px-6': size === 'md', 
      'py-20 px-8': size === 'lg',
    },
    className
  );

  const iconSizes = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl',
  };

  return (
    <motion.div 
      className={containerClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Illustration or Icon */}
      {illustration ? (
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {illustration}
        </motion.div>
      ) : icon ? (
        <motion.div 
          className={clsx(
            'mb-6 text-text-muted',
            iconSizes[size]
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {icon}
        </motion.div>
      ) : (
        <motion.div 
          className={clsx(
            'mb-6 text-text-muted',
            iconSizes[size]
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          📭
        </motion.div>
      )}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <H3 className="mb-2 text-text">
          {title}
        </H3>
      </motion.div>

      {/* Description */}
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="max-w-md"
        >
          <Text variant="muted" className="mb-6">
            {description}
          </Text>
        </motion.div>
      )}

      {/* Action Button */}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Button 
            variant={action.variant || 'primary'}
            onClick={action.onClick}
            motionPreset="bounce"
          >
            {action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

// Error State Component
interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: {
    label: string;
    onClick: () => void;
  };
  support?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
  variant?: 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  details?: string;
  showDetails?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  retry,
  support,
  icon,
  className,
  variant = 'error',
  size = 'md',
  details,
  showDetails = false,
}) => {
  const [detailsOpen, setDetailsOpen] = React.useState(showDetails);

  const containerClasses = clsx(
    'flex flex-col items-center justify-center text-center',
    {
      'py-8 px-4': size === 'sm',
      'py-12 px-6': size === 'md',
      'py-20 px-8': size === 'lg',
    },
    className
  );

  const iconSizes = {
    sm: 'text-4xl',
    md: 'text-6xl', 
    lg: 'text-8xl',
  };

  const variantStyles = {
    error: 'text-error',
    warning: 'text-warning',
    info: 'text-primary',
  };

  const defaultIcons = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <motion.div 
      className={containerClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Icon */}
      <motion.div 
        className={clsx(
          'mb-6',
          iconSizes[size],
          variantStyles[variant]
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {icon || defaultIcons[variant]}
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <H3 className="mb-2 text-text">
          {title}
        </H3>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="max-w-md mb-6"
      >
        <Text variant="muted">
          {message}
        </Text>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 mb-4"
      >
        {retry && (
          <Button 
            variant="primary"
            onClick={retry.onClick}
            motionPreset="bounce"
          >
            {retry.label}
          </Button>
        )}
        {support && (
          <Button 
            variant="secondary"
            onClick={support.onClick}
            motionPreset="gentle"
          >
            {support.label}
          </Button>
        )}
      </motion.div>

      {/* Error Details */}
      {details && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="w-full max-w-lg"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="text-text-muted"
          >
            {detailsOpen ? 'Hide Details' : 'Show Details'}
          </Button>
          
          {detailsOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-surface-elevated border border-border rounded-md overflow-hidden"
            >
              <Text 
                size="sm" 
                variant="muted" 
                as="pre" 
                className="text-left whitespace-pre-wrap font-mono"
               
              >
                {details}
              </Text>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

// Loading State Component
interface LoadingStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpinner?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = 'Loading...',
  message,
  icon,
  className,
  size = 'md',
  showSpinner = true,
}) => {
  const containerClasses = clsx(
    'flex flex-col items-center justify-center text-center',
    {
      'py-8 px-4': size === 'sm',
      'py-12 px-6': size === 'md',
      'py-20 px-8': size === 'lg',
    },
    className
  );

  const spinnerSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.div 
      className={containerClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Loading Spinner or Icon */}
      {showSpinner ? (
        <motion.div 
          className={clsx(
            'mb-6 border-4 border-border border-t-primary rounded-full animate-spin',
            spinnerSizes[size]
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      ) : icon ? (
        <motion.div 
          className="mb-6 text-6xl text-text-muted"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {icon}
        </motion.div>
      ) : null}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <H3 className="mb-2 text-text">
          {title}
        </H3>
      </motion.div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="max-w-md"
        >
          <Text variant="muted">
            {message}
          </Text>
        </motion.div>
      )}
    </motion.div>
  );
};

// Success State Component
interface SuccessStateProps {
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title,
  message,
  action,
  icon = '✅',
  className,
  size = 'md',
}) => {
  const containerClasses = clsx(
    'flex flex-col items-center justify-center text-center',
    {
      'py-8 px-4': size === 'sm',
      'py-12 px-6': size === 'md',
      'py-20 px-8': size === 'lg',
    },
    className
  );

  const iconSizes = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl',
  };

  return (
    <motion.div 
      className={containerClasses}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
    >
      {/* Success Icon */}
      <motion.div 
        className={clsx(
          'mb-6 text-success',
          iconSizes[size]
        )}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.1,
          ease: [0.175, 0.885, 0.32, 1.275]
        }}
      >
        {icon}
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <H3 className="mb-2 text-success">
          {title}
        </H3>
      </motion.div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="max-w-md mb-6"
        >
          <Text variant="muted">
            {message}
          </Text>
        </motion.div>
      )}

      {/* Action Button */}
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Button 
            variant="primary"
            onClick={action.onClick}
            motionPreset="bounce"
          >
            {action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};