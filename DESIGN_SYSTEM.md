# Skolapp Design System

**Version**: 2025 Foundation  
**Status**: Baseline Implementation  
**Scope**: Core components, design tokens, motion system

## Overview

The Skolapp Design System provides a unified foundation for building consistent, accessible, and modern user interfaces across all platforms. This system enforces 2025 UI/UX best practices and ensures every component meets WCAG 2.1 AA standards.

## 🎨 Design Tokens

### Core Philosophy
- **Semantic naming**: Colors, spacing, and typography use meaningful names
- **Cross-platform compatibility**: Works on iOS Safari, Android Chrome, and desktop browsers
- **Theme support**: Built-in light/dark mode with automatic switching
- **Accessibility first**: All tokens meet WCAG AA contrast requirements (≥4.5:1)

### Color System

```typescript
import { colors } from './src/design-tokens';

// Usage in components
const primaryColor = colors.light.primary; // #1E90FF
const darkPrimary = colors.dark.primary;   // #60A5FA
```

**Color Palette:**
- **Primary**: Interactive elements, CTAs, links
- **Text**: Hierarchical text colors (primary, secondary, muted)
- **Surface**: Background and elevated surface colors
- **Status**: Success, error, warning indicators
- **Border**: Subtle to strong border variations

### Typography Scale

```typescript
import { typography } from './src/design-tokens';

// Fluid typography using clamp()
const headingSize = typography.fontSize['3xl']; // clamp(1.875rem, 1.6rem + 1vw, 2.25rem)
```

**Features:**
- **Fluid scaling**: Responsive typography using CSS `clamp()`
- **Font families**: Inter (body), Montserrat (headings), Fira Code (code)
- **Weight scale**: Light (300) → Extrabold (800)
- **Line height**: Optimized for readability

### Spacing System

```typescript
import { spacing } from './src/design-tokens';

// 8px grid system
const padding = spacing[4]; // 1rem (16px)
const margin = spacing[6];  // 1.5rem (24px)
```

**Grid System:**
- **Base unit**: 8px
- **Touch targets**: Minimum 44px (spacing[11])
- **Semantic sizing**: From 2px (0.5) to 384px (96)

### Motion System

```typescript
import { motion } from './src/design-tokens';

// 2025 motion standards
const duration = motion.duration.fast;     // 120ms
const easing = motion.easing['swift-in-out']; // cubic-bezier(0.4, 0, 0.2, 1)
```

**Motion Guidelines:**
- **Fast**: 120ms for micro-interactions
- **Base**: 200ms for standard transitions  
- **Slow**: 300ms for complex animations
- **Accessibility**: Respects `prefers-reduced-motion`

## 🧩 Core Components

### Button

Modern button component with motion variants and accessibility features.

```tsx
import { Button } from './components/Button';

// Primary action
<Button variant="primary" size="md">
  Submit Form
</Button>

// With loading state
<Button variant="primary" loading>
  Processing...
</Button>

// Icon button (requires srLabel for accessibility)
<Button variant="icon" srLabel="Close dialog">
  ✕
</Button>
```

**Features:**
- 6 variants: primary, secondary, danger, ghost, link, icon
- 3 sizes: sm (36px), md (44px), lg (52px)
- Motion presets: gentle, bounce, none
- Loading states with spinner
- Accessibility: ARIA labels, focus management

### Card

Interactive card component with hover effects and content composition.

```tsx
import { Card } from './components/Card';

<Card 
  interactive
  title="Quiz Results"
  meta="Completed 2 hours ago"
  badge="Passed"
  footer={<Button variant="secondary">View Details</Button>}
  motionPreset="lift"
>
  Score: 85/100
</Card>
```

**Features:**
- Interactive and static variants
- Density options: compact, default, spacious
- Motion presets: gentle, lift, none
- Composition: title, meta, badge, footer slots

### Input & Textarea

Form components with validation states and modern interactions.

```tsx
import { Input, Textarea } from './components/Input';

<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
  required
  startIcon={<MailIcon />}
/>

<Textarea
  label="Message"
  rows={4}
  errorMessage="Please enter a valid message"
  isInvalid
/>
```

**Features:**
- Validation states: valid, invalid, disabled
- Icons: start and end icon support
- Variants: default, filled, minimal
- Accessibility: ARIA labels, error announcements

### Typography

Semantic typography components with consistent styling.

```tsx
import { H1, H2, Text, Lead, Code } from './components/Typography';

<H1 size="4xl" weight="extrabold">Page Title</H1>
<Lead>Introductory paragraph with larger text</Lead>
<Text variant="body">Regular paragraph text</Text>
<Code inline>const example = 'inline code';</Code>
```

**Components:**
- **Headings**: H1-H6 with customizable sizes and weights
- **Text**: Body text with variants (body, caption, muted)
- **Lead**: Introductory text styling
- **Code**: Inline and block code with syntax highlighting

### Loading States

Skeleton loaders and state components for better UX.

```tsx
import { 
  Skeleton, 
  SkeletonCard, 
  EmptyState, 
  ErrorState 
} from './components/Skeleton';
import './components/States';

// Loading skeleton
<SkeletonCard />

// Empty state
<EmptyState
  title="No quizzes yet"
  description="Create your first quiz to get started"
  action={{
    label: "Create Quiz",
    onClick: () => navigate('/create')
  }}
/>

// Error state
<ErrorState
  message="Failed to load quiz data"
  retry={{
    label: "Try Again",
    onClick: refetch
  }}
/>
```

## 🎯 Usage Guidelines

### Component Composition

Components are designed to work together seamlessly:

```tsx
<Card interactive motionPreset="gentle">
  <H3>Quiz Statistics</H3>
  <Text variant="muted">Last updated 5 minutes ago</Text>
  
  <div className="mt-4 space-y-2">
    <Skeleton lines={3} />
  </div>
  
  <Button variant="primary" fullWidth>
    View Full Report
  </Button>
</Card>
```

### Color Usage

Always use semantic color tokens:

```tsx
// ✅ Good - semantic colors
className="bg-surface text-text border-border"

// ❌ Bad - direct hex values
style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A' }}
```

### Spacing Consistency

Use the spacing scale for consistency:

```tsx
// ✅ Good - design tokens
className="p-6 mb-4 gap-3"

// ❌ Bad - arbitrary values
className="p-[24px] mb-[16px] gap-[12px]"
```

## 🔧 Integration

### Tailwind Configuration

The design tokens are integrated into Tailwind CSS:

```typescript
// tailwind.config.ts
import { colors, spacing, typography } from './src/design-tokens';

export default {
  theme: {
    extend: {
      colors,
      spacing,
      fontSize: typography.fontSize,
      // ... other tokens
    }
  }
}
```

### CSS Custom Properties

For runtime theme switching:

```typescript
import { generateCSSVariables } from './src/design-tokens';

// Apply theme
const themeVars = generateCSSVariables('dark');
Object.assign(document.documentElement.style, themeVars);
```

## 📱 Responsive Design

### Breakpoint System

```typescript
import { breakpoints } from './src/design-tokens';

// Mobile-first approach
const breakpoints = {
  sm: '640px',   // Small tablets
  md: '768px',   // Tablets  
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
}
```

### Touch Targets

All interactive elements meet minimum 44px touch target requirements:

```tsx
// Buttons automatically meet touch target requirements
<Button size="sm">Still 44px minimum height</Button>

// Custom components should use touch-target classes
<div className="min-h-touch-target">Custom interactive element</div>
```

## ♿ Accessibility

### WCAG 2.1 AA Compliance

- **Color contrast**: ≥4.5:1 for normal text, ≥3:1 for large text
- **Focus management**: Clear focus indicators on all interactive elements
- **ARIA labels**: Required for icon-only buttons and complex components
- **Keyboard navigation**: Full keyboard accessibility

### Motion Considerations

```tsx
// Components respect prefers-reduced-motion
<Button motionPreset="none">No animations</Button>

// Motion can be globally disabled
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

## 🚫 Enforcement Rules

### Linting Rules

The following patterns are **forbidden**:

```tsx
// ❌ Inline hex colors
style={{ color: '#FF0000' }}

// ❌ Arbitrary Tailwind values for core tokens
className="text-[#FF0000] p-[23px]"

// ❌ Direct CSS without design tokens
.custom-button {
  background-color: blue;
  padding: 15px;
}
```

### Required Patterns

```tsx
// ✅ Use design system components
<Button variant="primary">Action</Button>

// ✅ Use semantic color classes
className="text-error bg-error-bg"

// ✅ Use spacing scale
className="p-6 gap-4 mb-8"
```

## 📚 Migration Guide

### From Legacy Components

1. **Replace custom buttons**:
   ```tsx
   // Before
   <button className="custom-btn-primary">Submit</button>
   
   // After
   <Button variant="primary">Submit</Button>
   ```

2. **Update color usage**:
   ```tsx
   // Before
   className="bg-blue-500 text-white"
   
   // After
   className="bg-primary text-white"
   ```

3. **Standardize spacing**:
   ```tsx
   // Before
   className="p-5 m-3"
   
   // After  
   className="p-6 m-4"
   ```

## 🏗️ Implementation Status

### ✅ Phase 1: Design Tokens & Core Components (COMPLETE)
- [x] **Design Tokens**: Comprehensive token system with semantic colors, fluid typography, motion
- [x] **Button Component**: 6 variants, 3 sizes, motion presets, loading states, accessibility
- [x] **Card Component**: Interactive/static, hover effects, density options, composition slots
- [x] **Input/Textarea**: Validation states, icons, accessibility, multiple variants
- [x] **Typography**: H1-H6, Text, Lead, Code with semantic variants
- [x] **Loading States**: 8+ skeleton patterns for different contexts
- [x] **State Components**: Empty, error, loading, success with consistent patterns

### ✅ Phase 2: Navigation & Advanced Components (COMPLETE)
- [x] **Desktop navigation** with updated design tokens
- [x] **Breadcrumbs** component with proper accessibility
- [x] **Mobile bottom tab bar** (Student/Teacher variants)
- [x] **Command palette** (Cmd/Ctrl+K) with keyboard navigation
- [x] **FAB** (Floating Action Button) for primary actions
- [x] **Form components** (Select, Radio, Checkbox) with modern styling
- [x] **Modal system** with focus management and accessibility
- [x] **Dialog components** for alerts and confirmations
- [x] **Toast notifications** with animation and positioning

### 🎯 Design System Features

**Complete Component Library:**
- **Core**: Button, Card, Input, Textarea, Typography
- **Forms**: Select, RadioGroup, Checkbox with validation
- **Navigation**: Breadcrumbs, Mobile TabBar, FAB, Command Palette
- **Feedback**: Skeleton loaders, Empty/Error/Loading/Success states
- **Overlays**: Modal, Dialog, Toast with proper focus management
- **Layout**: Updated NavBar with design system tokens

**Advanced Features:**
- **Motion System**: 2025 standards with `prefers-reduced-motion` support
- **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation, ARIA labels
- **Responsive Design**: Mobile-first approach with touch target compliance
- **Theme Support**: Light/dark modes with semantic tokens

### 📱 Navigation Architecture

```tsx
// Desktop Navigation (updated)
<NavBar /> // Uses design system tokens and Button component

// Breadcrumbs
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Current Page', current: true }
]} />

// Mobile Navigation
<MobileTabBar variant="student" currentPath="/student/quizzes" />
<MobileTabBar variant="teacher" currentPath="/teacher/analytics" />

// Command Palette (Global)
const { isOpen, open, close } = useCommandPalette();
<CommandPalette 
  isOpen={isOpen} 
  onClose={close}
  onSelect={(item) => item.action()}
/>

// Floating Action Button
<FAB 
  onClick={() => createNewQuiz()}
  label="Create Quiz"
  position="bottom-right"
/>
```

### 🔧 Advanced Form Components

```tsx
// Select with options
<Select
  label="Choose Category"
  options={[
    { value: 'math', label: 'Mathematics' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' }
  ]}
  placeholder="Select a category..."
/>

// Radio group with orientation
<RadioGroup
  name="difficulty"
  label="Quiz Difficulty"
  options={[
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ]}
  orientation="horizontal"
/>

// Checkbox variants
<Checkbox label="I agree to terms" />
<Checkbox label="Premium feature" variant="card" />
```

### 🎭 Overlay System

```tsx
// Modal with focus management
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Edit Quiz"
  footer={
    <>
      <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
      <Button variant="primary" onClick={handleSave}>Save</Button>
    </>
  }
>
  <QuizEditForm />
</Modal>

// Dialog for confirmations
<Dialog
  isOpen={showDeleteDialog}
  onClose={() => setShowDeleteDialog(false)}
  title="Delete Quiz"
  message="Are you sure? This action cannot be undone."
  type="error"
  onConfirm={handleDelete}
/>

// Toast notifications
const { addToast } = useToasts();
addToast({
  title: 'Success!',
  message: 'Quiz saved successfully',
  type: 'success',
  action: { label: 'View', onClick: () => navigate('/quiz') }
});
```

---

**Remember**: Every new component or feature must declare: *"Uses Skolapp design system tokens & components."*

For questions or contributions, see the component source files in `/src/components/` and token definitions in `/src/design-tokens.ts`.