import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
  lines?: number; // For text skeletons
}

interface SkeletonContainerProps {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

// Base Skeleton component
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  variant = 'rectangular',
  animation = 'pulse',
  lines = 1,
}) => {
  const baseClasses = clsx(
    'bg-surface-elevated',
    'relative',
    'overflow-hidden',
    
    // Animation classes
    {
      'animate-pulse': animation === 'pulse',
      'before:animate-wave': animation === 'wave',
    },
    
    // Variant classes
    {
      'h-4 rounded-sm': variant === 'text',
      'rounded-full': variant === 'circular',
      'rounded-md': variant === 'rounded',
      'rounded-none': variant === 'rectangular',
    },
    
    className
  );

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  // Wave animation overlay
  const waveOverlay = animation === 'wave' && (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    />
  );

  // Render multiple lines for text skeletons
  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={clsx(
              baseClasses,
              i === lines - 1 && 'w-3/4' // Last line is shorter
            )}
            style={i === lines - 1 ? { ...style, width: '75%' } : style}
          >
            {waveOverlay}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={baseClasses} style={style}>
      {waveOverlay}
    </div>
  );
};

// Skeleton container for conditional loading
export const SkeletonContainer: React.FC<SkeletonContainerProps> = ({
  children,
  className,
  loading = false,
}) => {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <div className={clsx('animate-pulse', className)}>
      {children}
    </div>
  );
};

// Pre-built skeleton patterns for common UI elements

// Card skeleton
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx('card-base p-6 space-y-4', className)}>
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={16} />
      </div>
      <Skeleton variant="rectangular" width={60} height={24} />
    </div>
    <Skeleton variant="text" lines={3} />
    <div className="flex gap-2 pt-2">
      <Skeleton variant="rounded" width={80} height={32} />
      <Skeleton variant="rounded" width={100} height={32} />
    </div>
  </div>
);

// List skeleton
export const SkeletonList: React.FC<{ 
  items?: number; 
  className?: string;
  showAvatar?: boolean;
}> = ({ 
  items = 3, 
  className,
  showAvatar = false 
}) => (
  <div className={clsx('space-y-3', className)}>
    {Array.from({ length: items }, (_, i) => (
      <div key={i} className="flex items-center space-x-3 p-3">
        {showAvatar && (
          <Skeleton variant="circular" width={40} height={40} />
        )}
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="30%" height={16} />
          <Skeleton variant="text" width="80%" height={14} />
        </div>
        <Skeleton variant="rectangular" width={60} height={20} />
      </div>
    ))}
  </div>
);

// Form skeleton
export const SkeletonForm: React.FC<{ 
  fields?: number; 
  className?: string;
}> = ({ 
  fields = 4, 
  className 
}) => (
  <div className={clsx('space-y-6', className)}>
    {Array.from({ length: fields }, (_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton variant="text" width="25%" height={16} />
        <Skeleton variant="rounded" width="100%" height={44} />
        <Skeleton variant="text" width="40%" height={14} />
      </div>
    ))}
    <div className="flex gap-3 pt-4">
      <Skeleton variant="rounded" width={120} height={44} />
      <Skeleton variant="rounded" width={100} height={44} />
    </div>
  </div>
);

// Table skeleton
export const SkeletonTable: React.FC<{ 
  rows?: number; 
  columns?: number;
  className?: string;
}> = ({ 
  rows = 5, 
  columns = 4,
  className 
}) => (
  <div className={clsx('space-y-2', className)}>
    {/* Header */}
    <div className="flex gap-4 p-3 border-b border-border">
      {Array.from({ length: columns }, (_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          width={i === 0 ? '30%' : '20%'} 
          height={16} 
        />
      ))}
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={rowIndex} className="flex gap-4 p-3">
        {Array.from({ length: columns }, (_, colIndex) => (
          <Skeleton 
            key={colIndex} 
            variant="text" 
            width={colIndex === 0 ? '30%' : '20%'} 
            height={14} 
          />
        ))}
      </div>
    ))}
  </div>
);

// Navigation skeleton
export const SkeletonNav: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx('flex items-center justify-between p-4', className)}>
    <div className="flex items-center space-x-6">
      <Skeleton variant="rectangular" width={120} height={32} />
      <div className="hidden md:flex space-x-4">
        <Skeleton variant="text" width={60} height={16} />
        <Skeleton variant="text" width={80} height={16} />
        <Skeleton variant="text" width={70} height={16} />
      </div>
    </div>
    <div className="flex items-center space-x-3">
      <Skeleton variant="circular" width={32} height={32} />
      <Skeleton variant="rounded" width={80} height={32} />
    </div>
  </div>
);

// Avatar skeleton
export const SkeletonAvatar: React.FC<{ 
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeMap = {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  };

  return (
    <Skeleton 
      variant="circular" 
      width={sizeMap[size]} 
      height={sizeMap[size]}
      className={className}
    />
  );
};

// Text block skeleton
export const SkeletonText: React.FC<{ 
  lines?: number;
  className?: string;
  variant?: 'paragraph' | 'heading' | 'caption';
}> = ({ 
  lines = 3, 
  className,
  variant = 'paragraph'
}) => {
  const heights = {
    paragraph: 16,
    heading: 24,
    caption: 14,
  };

  return (
    <div className={clsx('space-y-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton 
          key={i}
          variant="text" 
          width={i === lines - 1 ? '75%' : '100%'}
          height={heights[variant]}
        />
      ))}
    </div>
  );
};

// Button skeleton
export const SkeletonButton: React.FC<{ 
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  className?: string;
}> = ({ 
  size = 'md',
  width = 120,
  className 
}) => {
  const heights = {
    sm: 36,
    md: 44,
    lg: 52,
  };

  return (
    <Skeleton 
      variant="rounded" 
      width={width}
      height={heights[size]}
      className={className}
    />
  );
};