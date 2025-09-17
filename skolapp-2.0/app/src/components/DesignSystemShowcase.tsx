import React from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Input, Textarea } from './Input';
import { H1, H2, H3, Text, Lead, Code } from './Typography';
import { SkeletonCard, SkeletonList } from './Skeleton';
import { EmptyState, ErrorState, LoadingState, SuccessState } from './States';

/**
 * Design System Showcase
 * Demonstrates all core components and design tokens
 */
export const DesignSystemShowcase: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <H1>Skolapp Design System</H1>
        <Lead>
          2025 Foundation - Modern, accessible, and consistent UI components
        </Lead>
      </div>

      {/* Typography Section */}
      <section className="space-y-6">
        <H2>Typography</H2>
        <div className="space-y-4">
          <div>
            <H1 size="3xl">Heading Level 1</H1>
            <H2>Heading Level 2</H2>
            <H3>Heading Level 3</H3>
          </div>
          <Text>
            This is body text with normal weight and relaxed line height for optimal readability.
          </Text>
          <Text variant="muted">
            This is muted text for secondary information.
          </Text>
          <Lead>
            This is lead text, perfect for introductory paragraphs that need emphasis.
          </Lead>
          <Code inline>const example = 'inline code';</Code>
          <Code>
{`// Block code example
function greet(name: string) {
  return \`Hello, \${name}!\`;
}`}
          </Code>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="space-y-6">
        <H2>Buttons</H2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" loading={loading} onClick={() => setLoading(!loading)}>
              {loading ? 'Loading...' : 'Toggle Loading'}
            </Button>
            <Button variant="secondary" disabled>Disabled</Button>
            <Button variant="primary" icon="+" srLabel="Add item">
              With Icon
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" motionPreset="gentle">Gentle Motion</Button>
            <Button variant="secondary" motionPreset="bounce">Bounce Motion</Button>
            <Button variant="ghost" motionPreset="none">No Motion</Button>
          </div>
        </div>
      </section>

      {/* Form Components */}
      <section className="space-y-6">
        <H2>Form Components</H2>
        <div className="max-w-md space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            helperText="We'll never share your email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            startIcon="📧"
          />
          
          <Input
            label="Required Field"
            placeholder="Enter something..."
            required
            errorMessage={inputValue.length < 3 && inputValue.length > 0 ? 'Too short' : undefined}
            isInvalid={inputValue.length < 3 && inputValue.length > 0}
            isValid={inputValue.length >= 3}
          />

          <Textarea
            label="Message"
            placeholder="Type your message here..."
            rows={4}
            helperText="Maximum 500 characters"
          />

          <Input
            label="Disabled Input"
            placeholder="Cannot edit"
            disabled
            value="Disabled value"
          />
        </div>
      </section>

      {/* Cards Section */}
      <section className="space-y-6">
        <H2>Cards</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Static Card"
            meta="Card subtitle"
            badge="New"
          >
            This is a static card with title, meta information, and content.
          </Card>

          <Card
            interactive
            title="Interactive Card"
            meta="Clickable"
            badge="Active"
            onClick={() => alert('Card clicked!')}
            motionPreset="lift"
            footer={
              <div className="flex gap-2">
                <Button variant="primary" size="sm">Action</Button>
                <Button variant="secondary" size="sm">Cancel</Button>
              </div>
            }
          >
            This card responds to hover and click interactions.
          </Card>

          <Card density="compact" title="Compact Card">
            Reduced padding for dense layouts.
          </Card>

          <Card density="spacious" title="Spacious Card">
            Increased padding for emphasis.
          </Card>
        </div>
      </section>

      {/* Loading States */}
      <section className="space-y-6">
        <H2>Loading States</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <H3>Skeleton Card</H3>
            <SkeletonCard />
          </div>
          
          <div>
            <H3>Skeleton List</H3>
            <SkeletonList items={3} showAvatar />
          </div>
        </div>
      </section>

      {/* State Components */}
      <section className="space-y-6">
        <H2>State Components</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface border border-border rounded-lg">
            <EmptyState
              size="sm"
              title="No items found"
              description="Try creating a new item to get started"
              action={{
                label: "Create Item",
                onClick: () => alert('Create action')
              }}
            />
          </div>

          <div className="bg-surface border border-border rounded-lg">
            <ErrorState
              size="sm"
              message="Something went wrong while loading data"
              retry={{
                label: "Try Again",
                onClick: () => alert('Retry action')
              }}
            />
          </div>

          <div className="bg-surface border border-border rounded-lg">
            <LoadingState
              size="sm"
              title="Loading content..."
              message="Please wait while we fetch your data"
            />
          </div>

          <div className="bg-surface border border-border rounded-lg">
            <SuccessState
              size="sm"
              title="Success!"
              message="Your action was completed successfully"
              action={{
                label: "Continue",
                onClick: () => alert('Continue action')
              }}
            />
          </div>
        </div>
      </section>

      {/* Color Tokens */}
      <section className="space-y-6">
        <H2>Color Tokens</H2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Text variant="caption" className="font-medium">Primary</Text>
            <div className="h-16 bg-primary rounded-md"></div>
          </div>
          <div className="space-y-2">
            <Text variant="caption" className="font-medium">Success</Text>
            <div className="h-16 bg-success rounded-md"></div>
          </div>
          <div className="space-y-2">
            <Text variant="caption" className="font-medium">Error</Text>
            <div className="h-16 bg-error rounded-md"></div>
          </div>
          <div className="space-y-2">
            <Text variant="caption" className="font-medium">Warning</Text>
            <div className="h-16 bg-warning rounded-md"></div>
          </div>
        </div>
      </section>

      {/* Spacing Scale */}
      <section className="space-y-6">
        <H2>Spacing Scale</H2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 6, 8, 12, 16].map(size => (
            <div key={size} className="flex items-center gap-4">
              <Text variant="caption" className="w-12 font-mono">{size}</Text>
              <div 
                className="bg-primary rounded"
                style={{ 
                  width: `${size * 4}px`, 
                  height: '16px' 
                }}
              ></div>
              <Text variant="caption" className="text-text-muted">
                {size * 4}px / {size * 0.25}rem
              </Text>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="pt-8 border-t border-border">
        <Text variant="muted" className="text-center">
          Skolapp Design System - 2025 Foundation
        </Text>
      </section>
    </div>
  );
};