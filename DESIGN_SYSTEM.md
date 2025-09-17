# Skolapp Design System

The Skolapp Design System is a comprehensive foundation for building consistent, accessible, and scalable user interfaces. It includes design tokens, core components, and usage guidelines to ensure a unified experience across all Skolapp products.

## 🎯 Design Principles

1. **Accessibility First**: WCAG AA compliant (4.5:1 contrast for text, 3:1 for large text)
2. **Consistency**: Every component follows the same design language
3. **Scalability**: Design tokens ensure maintainable design at scale
4. **Performance**: Optimized CSS and minimal runtime overhead
5. **Responsiveness**: Mobile-first approach with fluid typography
6. **Theme Support**: Comprehensive light/dark theme implementation

## 📦 Installation & Setup

```tsx
// Import design tokens (TypeScript)
import { designTokens } from './design-tokens';

// Import design system CSS
import './design-system.css';

// Import components
import { Button, Card, Field, Typography } from './components';
```

## 🎨 Design Tokens

Design tokens are the foundational building blocks of the design system. They ensure consistency across all components and make theme changes effortless.

### Colors

```tsx
// Accessing color tokens
import { designTokens } from './design-tokens';

const primaryColor = designTokens.colors.light.primary; // #1E90FF
const darkPrimary = designTokens.colors.dark.primary; // #60A5FA
```

#### Light Theme
- **Primary**: `#1E90FF` (CTA accent, WCAG AA compliant)
- **Background**: `#F8FAFC` (Page background)
- **Surface**: `#FFFFFF` (Card/modal backgrounds)
- **Text**: `#1A1A1A` (Primary text, WCAG AAA compliant)
- **Text Muted**: `#6B7280` (Secondary text, WCAG AA compliant)

#### Dark Theme
- **Primary**: `#60A5FA` (CTA accent, WCAG AA compliant)
- **Background**: `#0F172A` (Page background)
- **Surface**: `#1E293B` (Card/modal backgrounds)
- **Text**: `#F3F4F6` (Primary text, WCAG AAA compliant)
- **Text Muted**: `#9CA3AF` (Secondary text, WCAG AA compliant)

### Spacing

Based on 0.25rem (4px) increments for consistent spacing:

```tsx
// Available spacing tokens
spacing: {
  0: '0',
  1: '0.25rem',    // 4px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  // ... up to 64: '16rem'
}
```

### Typography

```tsx
// Font families
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  heading: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
  mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
}

// Font sizes with line heights and weights
fontSize: {
  xs: ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
  sm: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
  base: ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
  // ... up to 5xl
}
```

## 🧩 Core Components

### Button

The Button component provides consistent styling and behavior for all interactive elements.

```tsx
import { Button } from './components/Button';

// Basic usage
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="danger">Delete</Button>

// With icons and loading states
<Button 
  variant="primary" 
  icon={<PlusIcon />}
  loading={isSubmitting}
  size="lg"
>
  Create Quiz
</Button>

// Icon-only button (requires srLabel for accessibility)
<Button 
  variant="icon" 
  icon={<EditIcon />}
  srLabel="Edit quiz"
/>
```

#### Props
- `variant`: `'primary' | 'secondary' | 'danger' | 'ghost' | 'link' | 'icon'`
- `size`: `'sm' | 'base' | 'lg'`
- `loading`: boolean - Shows spinner and disables interaction
- `fullWidth`: boolean - Makes button full width
- `icon`, `iconRight`: React.ReactNode - Adds icons
- `srLabel`: string - Required for icon-only buttons (accessibility)

### Card

Cards display content in a contained, structured format.

```tsx
import { Card } from './components/Card';

// Basic card
<Card 
  title="Geography Quiz"
  meta="3 questions"
  badge="Local"
>
  Quick review of world capitals.
</Card>

// Interactive card
<Card 
  interactive
  title="English Vocabulary"
  onClick={() => openQuiz(quiz.id)}
  footer={
    <Button variant="link">Open Quiz</Button>
  }
>
  5 new words from this week.
</Card>

// Different densities
<Card density="compact">Compact card</Card>
<Card density="spacious">Spacious card</Card>
```

#### Props
- `interactive`: boolean - Makes card clickable with hover effects
- `as`: `'div' | 'button' | 'a'` - Changes underlying HTML element
- `density`: `'default' | 'compact' | 'spacious'` - Controls padding
- `title`, `meta`, `badge`, `footer`: React.ReactNode - Structured content

### Field

Form input component with label, help text, and error states.

```tsx
import { Field } from './components/Field';

// Basic input
<Field
  label="Quiz Title"
  name="title"
  value={title}
  onChange={setTitle}
  placeholder="Enter quiz title..."
  required
/>

// With help text and error
<Field
  label="Description"
  name="description"
  value={description}
  onChange={setDescription}
  help="Briefly describe what this quiz covers"
  error={errors.description}
  as="textarea"
/>

// With icon
<Field
  label="Search"
  name="search"
  value={searchTerm}
  onChange={setSearchTerm}
  icon={<SearchIcon />}
/>
```

#### Props
- `label`: string - Field label (required)
- `name`: string - Input name attribute
- `value`, `onChange`: Controlled input pattern
- `as`: `'input' | 'textarea'` - Input type
- `type`: string - HTML input type
- `required`: boolean - Shows required indicator
- `error`: string - Error message
- `help`: string - Help text
- `icon`: React.ReactNode - Leading icon

### Typography

Consistent text styling across the application.

```tsx
import { Typography } from './components/Typography';

// Headings
<Typography variant="h1">Main Heading</Typography>
<Typography variant="h2" color="primary">Section Title</Typography>

// Body text
<Typography variant="body">Regular paragraph text</Typography>
<Typography variant="caption" color="muted">Small caption text</Typography>

// Custom element with typography styling
<Typography as="span" variant="h3" weight="medium">
  Custom styled text
</Typography>
```

#### Props
- `as`: HTML element to render
- `variant`: `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'label'`
- `color`: `'default' | 'muted' | 'inverse' | 'primary' | 'success' | 'warning' | 'error'`
- `weight`: `'normal' | 'medium' | 'semibold' | 'bold'`
- `align`: `'left' | 'center' | 'right'`

## 🎭 Theming

The design system supports comprehensive light/dark theming through CSS variables.

### Switching Themes

```tsx
// Toggle theme
const toggleTheme = () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
};
```

### Custom Theme Colors

```css
/* Override theme colors */
:root {
  --color-primary: #your-brand-color;
  --color-primary-hover: #your-brand-hover;
}

html[data-theme='dark'] {
  --color-primary: #your-dark-brand-color;
}
```

## 📐 Layout Utilities

The design system includes utility classes for common layout patterns:

```tsx
// Flexbox utilities
<div className="ds-flex ds-items-center ds-gap-4">
  <Button>Cancel</Button>
  <Button variant="primary">Save</Button>
</div>

// Spacing utilities
<div className="ds-p-6 ds-m-4">
  Content with padding and margin
</div>

// Container for max-width layouts
<div className="ds-container">
  Centered content with max-width
</div>
```

## ♿ Accessibility Features

The design system is built with accessibility in mind:

1. **WCAG AA Compliance**: All color combinations meet contrast requirements
2. **Focus Management**: Visible focus indicators for keyboard navigation
3. **Screen Reader Support**: Proper ARIA labels and semantic HTML
4. **Touch Targets**: Minimum 44px touch targets for mobile
5. **Motion Respect**: Respects `prefers-reduced-motion`

### Accessibility Utilities

```tsx
// Screen reader only text
<span className="ds-sr-only">Additional context for screen readers</span>

// Focus visible indicator
<button className="ds-focus-visible">Accessible button</button>
```

## 🚫 Restrictions & Rules

To maintain design system consistency, the following are **prohibited**:

### ❌ Don't Use

1. **Inline styles**: Use design tokens and CSS classes instead
2. **Direct hex colors**: Use color tokens (`var(--color-primary)`)
3. **Hardcoded spacing**: Use spacing tokens (`var(--space-4)`)
4. **Custom fonts**: Stick to the typography scale
5. **Ad-hoc borders/shadows**: Use design token variants

### ✅ Do Use

1. **Design tokens**: Always reference tokens for colors, spacing, typography
2. **Component variants**: Use existing variants before creating new ones
3. **CSS custom properties**: For component-specific customization
4. **Utility classes**: For common layout patterns

## 🔧 Development Workflow

### Adding New Components

1. **Design tokens first**: Define any new tokens needed
2. **Component creation**: Build using existing tokens
3. **Documentation**: Add usage examples and props
4. **Testing**: Verify accessibility and responsive behavior
5. **Integration**: Update this documentation

### Making Changes

1. **Token updates**: Change design tokens, not individual component styles
2. **Backward compatibility**: Ensure changes don't break existing usage
3. **Testing**: Test across light/dark themes and responsive breakpoints

## 📱 Responsive Design

The design system uses a mobile-first approach:

```css
/* Breakpoint tokens */
breakpoints: {
  sm: '640px',   // Small devices
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px' // Large screens
}
```

### Responsive Utilities

```tsx
// Responsive visibility
<div className="ds-hidden-mobile">Desktop only</div>
<div className="ds-hidden-desktop">Mobile only</div>
```

## 🧪 Testing

Test your components against the design system:

1. **Visual testing**: Check light/dark themes
2. **Accessibility testing**: Use screen readers and keyboard navigation
3. **Responsive testing**: Verify behavior across breakpoints
4. **Token usage**: Ensure only design tokens are used

## 📋 Migration Guide

### From Legacy Styles to Design System

1. **Audit existing components**: Identify custom styles
2. **Replace inline styles**: Use utility classes or design tokens
3. **Update color usage**: Replace hex codes with color tokens
4. **Standardize spacing**: Use spacing tokens instead of hardcoded values
5. **Test accessibility**: Verify WCAG compliance

### Example Migration

```tsx
// Before (❌)
<button 
  style={{
    backgroundColor: '#1E90FF',
    padding: '12px 24px',
    borderRadius: '6px',
    fontSize: '14px'
  }}
>
  Submit
</button>

// After (✅)
<Button variant="primary" size="base">
  Submit
</Button>
```

## 🤝 Contributing

When contributing to the design system:

1. **Follow design principles**: Maintain consistency and accessibility
2. **Use existing tokens**: Don't create new tokens without discussion
3. **Document changes**: Update this guide with new components or changes
4. **Test thoroughly**: Verify across themes and devices

## 📚 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design Tokens W3C Standard](https://www.w3.org/community/design-tokens/)
- [Accessible Components Patterns](https://www.a11yproject.com/patterns/)

---

**Remember**: The design system is a living document. When in doubt, prioritize accessibility and consistency over visual flair.