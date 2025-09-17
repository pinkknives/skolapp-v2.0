// Design System Component Index
// Exports all components from the Skolapp 2025 Design System

// Core Components
export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Card } from './Card';
export type { CardProps } from './Card';

export { Input, Textarea } from './Input';
export type { InputProps, TextareaProps } from './Input';

// Typography Components
export { 
  Heading, 
  Text, 
  Lead, 
  Code,
  H1, 
  H2, 
  H3, 
  H4, 
  H5, 
  H6,
  Small,
  Caption,
  Muted 
} from './Typography';

// Form Controls
export { Select, RadioGroup, Checkbox } from './FormControls';
export type { 
  SelectProps, 
  SelectOption,
  RadioGroupProps, 
  CheckboxProps 
} from './FormControls';

// Loading & States
export { 
  Skeleton,
  SkeletonContainer,
  SkeletonCard,
  SkeletonList,
  SkeletonForm,
  SkeletonTable,
  SkeletonNav,
  SkeletonAvatar,
  SkeletonText,
  SkeletonButton
} from './Skeleton';

export {
  EmptyState,
  ErrorState,
  LoadingState,
  SuccessState
} from './States';

// Overlays & Modals
export { 
  Modal,
  Dialog,
  Toast,
  ToastContainer,
  useToasts
} from './Overlays';
export type { 
  ModalProps,
  DialogProps,
  ToastProps
} from './Overlays';

// Navigation Components
export {
  Breadcrumbs,
  MobileTabBar,
  FAB,
  CommandPalette,
  useCommandPalette
} from './Navigation';
export type {
  BreadcrumbsProps,
  BreadcrumbItem,
  MobileTabBarProps,
  FABProps,
  CommandPaletteProps,
  CommandItem
} from './Navigation';

// Layout Components
export { NavBar } from './layout/NavBar';
export { Footer } from './layout/Footer';
export { ConsentBanner } from './layout/ConsentBanner';

// Component Showcase
export { DesignSystemShowcase } from './DesignSystemShowcase';

// Design Tokens (re-export from tokens file)
export { default as designTokens } from '../design-tokens';
export * from '../design-tokens';