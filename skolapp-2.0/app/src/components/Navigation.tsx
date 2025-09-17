import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Button } from './Button';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export interface MobileTabBarProps {
  variant: 'student' | 'teacher';
  currentPath: string;
  className?: string;
}

export interface FABProps {
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  className?: string;
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: CommandItem) => void;
  placeholder?: string;
}

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  group?: string;
  keywords?: string[];
  action: () => void;
}

// Breadcrumbs Component
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  className,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={clsx('flex items-center gap-2', className)}>
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.current || isLast;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-text-muted" aria-hidden="true">
                  {separator}
                </span>
              )}
              
              {isCurrent ? (
                <span 
                  className="text-text font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href || '#'}
                  className="text-text-muted hover:text-primary transition-colors duration-base"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Mobile Tab Bar Component
export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  variant,
  currentPath,
  className,
}) => {
  const studentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', href: '/student' },
    { id: 'quizzes', label: 'Quizzes', icon: '📝', href: '/student/quizzes' },
    { id: 'progress', label: 'Progress', icon: '📊', href: '/student/progress' },
    { id: 'profile', label: 'Profile', icon: '👤', href: '/student/profile' },
  ];

  const teacherTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', href: '/teacher' },
    { id: 'quizzes', label: 'Quizzes', icon: '📝', href: '/teacher/quizzes' },
    { id: 'students', label: 'Students', icon: '👥', href: '/teacher/students' },
    { id: 'analytics', label: 'Analytics', icon: '📊', href: '/teacher/analytics' },
    { id: 'settings', label: 'Settings', icon: '⚙️', href: '/teacher/settings' },
  ];

  const tabs = variant === 'student' ? studentTabs : teacherTabs;

  return (
    <nav 
      className={clsx(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-surface/95 backdrop-blur border-t border-border',
        'md:hidden', // Only show on mobile
        className
      )}
    >
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.href || currentPath.startsWith(tab.href + '/');
          
          return (
            <Link
              key={tab.id}
              to={tab.href}
              className={clsx(
                'flex-1 flex flex-col items-center gap-1 py-2 px-1',
                'min-h-touch-target transition-colors duration-base',
                {
                  'text-primary': isActive,
                  'text-text-muted': !isActive,
                }
              )}
            >
              <span className="text-lg" aria-hidden="true">
                {tab.icon}
              </span>
              <span className="text-xs font-medium truncate">
                {tab.label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-1/2 w-8 h-0.5 bg-primary rounded-full"
                  initial={{ scaleX: 0, x: '-50%' }}
                  animate={{ scaleX: 1, x: '-50%' }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

// Floating Action Button (FAB)
export const FAB: React.FC<FABProps> = ({
  onClick,
  icon = '+',
  label,
  variant = 'primary',
  size = 'lg',
  position = 'bottom-right',
  className,
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-20 right-4 md:bottom-6 md:right-6',
    'bottom-left': 'bottom-20 left-4 md:bottom-6 md:left-6',
    'bottom-center': 'bottom-20 left-1/2 -translate-x-1/2 md:bottom-6',
  };

  const sizeClasses = {
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  };

  const iconSizeClasses = {
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <motion.button
      onClick={onClick}
      className={clsx(
        'fixed z-40 rounded-full shadow-lg',
        'flex items-center justify-center',
        'transition-all duration-base',
        positionClasses[position],
        sizeClasses[size],
        {
          'bg-primary text-white hover:bg-primary-hover': variant === 'primary',
          'bg-surface text-text border border-border hover:border-primary': variant === 'secondary',
        },
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
    >
      <span className={iconSizeClasses[size]} aria-hidden="true">
        {icon}
      </span>
    </motion.button>
  );
};

// Command Palette Component
export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelect,
  placeholder = 'Search for commands...',
}) => {
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Sample commands - in real app this would come from props or context
  const allCommands: CommandItem[] = [
    {
      id: 'create-quiz',
      label: 'Create Quiz',
      description: 'Create a new quiz',
      icon: '📝',
      group: 'Actions',
      keywords: ['new', 'quiz', 'create'],
      action: () => console.log('Create quiz'),
    },
    {
      id: 'view-students',
      label: 'View Students',
      description: 'See all students',
      icon: '👥',
      group: 'Navigation',
      keywords: ['students', 'view', 'list'],
      action: () => console.log('View students'),
    },
    {
      id: 'analytics',
      label: 'Analytics',
      description: 'View analytics dashboard',
      icon: '📊',
      group: 'Navigation',
      keywords: ['analytics', 'stats', 'dashboard'],
      action: () => console.log('Analytics'),
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Manage app settings',
      icon: '⚙️',
      group: 'Navigation',
      keywords: ['settings', 'preferences', 'config'],
      action: () => console.log('Settings'),
    },
  ];

  // Filter commands based on query
  const filteredCommands = React.useMemo(() => {
    if (!query) return allCommands;
    
    return allCommands.filter(command => {
      const searchText = `${command.label} ${command.description} ${command.keywords?.join(' ')}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
  }, [query]);

  // Group commands
  const groupedCommands = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    
    filteredCommands.forEach(command => {
      const group = command.group || 'Other';
      if (!groups[group]) groups[group] = [];
      groups[group].push(command);
    });
    
    return groups;
  }, [filteredCommands]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        const selectedCommand = filteredCommands[selectedIndex];
        if (selectedCommand) {
          onSelect(selectedCommand);
          onClose();
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset selection when query changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-text/20 backdrop-blur-sm">
      <div className="flex items-start justify-center pt-20 px-4">
        <motion.div
          className="w-full max-w-2xl bg-surface rounded-xl shadow-xl border border-border overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Search input */}
          <div className="p-4 border-b border-border">
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-lg bg-transparent text-text placeholder-text-muted outline-none"
            />
          </div>
          
          {/* Results */}
          <div className="max-h-80 overflow-auto">
            {Object.keys(groupedCommands).length === 0 ? (
              <div className="p-8 text-center text-text-muted">
                No commands found for "{query}"
              </div>
            ) : (
              Object.entries(groupedCommands).map(([group, commands]) => (
                <div key={group}>
                  <div className="px-4 py-2 text-xs font-medium text-text-muted uppercase tracking-wide bg-surface-elevated">
                    {group}
                  </div>
                  {commands.map((command, index) => {
                    const globalIndex = filteredCommands.indexOf(command);
                    const isSelected = globalIndex === selectedIndex;
                    
                    return (
                      <motion.button
                        key={command.id}
                        onClick={() => {
                          onSelect(command);
                          onClose();
                        }}
                        className={clsx(
                          'w-full text-left px-4 py-3 flex items-center gap-3',
                          'transition-colors duration-fast',
                          {
                            'bg-primary/10 text-primary': isSelected,
                            'hover:bg-surface-elevated': !isSelected,
                          }
                        )}
                        whileHover={{ backgroundColor: 'rgba(30, 144, 255, 0.05)' }}
                      >
                        {command.icon && (
                          <span className="text-lg" aria-hidden="true">
                            {command.icon}
                          </span>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-text">
                            {command.label}
                          </div>
                          {command.description && (
                            <div className="text-sm text-text-muted truncate">
                              {command.description}
                            </div>
                          )}
                        </div>
                        {isSelected && (
                          <div className="text-xs text-text-muted">
                            ↵
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
          
          {/* Footer */}
          <div className="px-4 py-2 text-xs text-text-muted bg-surface-elevated border-t border-border">
            Navigate with ↑↓ • Select with ↵ • Close with Esc
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Hook for command palette with Cmd/Ctrl+K
export const useCommandPalette = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};