import React, { useState } from 'react';
import { Button, Card, Field, Typography } from '../components';

export const DesignSystemDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="ds-container" style={{ padding: '2rem', background: 'var(--color-background)', minHeight: '100vh' }}>
      <Typography variant="h1" align="center" style={{ marginBottom: '2rem' }}>
        Skolapp Design System Demo
      </Typography>
      
      <div className="ds-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Typography Examples */}
        <Card title="Typography" meta="Design system typography">
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="body">This is body text using the design system typography scale.</Typography>
          <Typography variant="caption" color="muted">This is caption text in muted color.</Typography>
        </Card>

        {/* Button Examples */}
        <Card title="Buttons" meta="All button variants">
          <div className="ds-flex ds-flex-col ds-gap-3">
            <Button variant="primary" loading={loading} onClick={handleSubmit}>
              Primary Button
            </Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="danger" size="sm">Danger Small</Button>
            <Button variant="ghost" size="lg">Ghost Large</Button>
            <Button variant="link">Link Button</Button>
            <Button variant="icon" srLabel="Settings">⚙️</Button>
          </div>
        </Card>

        {/* Form Examples */}
        <Card title="Form Elements" meta="Input fields and validation">
          <div className="ds-flex ds-flex-col ds-gap-4">
            <Field
              label="Your Name"
              name="name"
              value={inputValue}
              onChange={setInputValue}
              placeholder="Enter your name..."
              help="This will be displayed on your profile"
              required
            />
            <Field
              label="Description"
              name="description"
              value=""
              onChange={() => {}}
              placeholder="Tell us about yourself..."
              as="textarea"
            />
            <Field
              label="Email"
              name="email"
              value=""
              onChange={() => {}}
              error="Please enter a valid email address"
              type="email"
            />
          </div>
        </Card>

        {/* Card Variants */}
        <Card 
          title="Interactive Card" 
          meta="Click me!" 
          badge="New"
          interactive
          onClick={() => alert('Card clicked!')}
          footer={<Button variant="link">Learn More</Button>}
        >
          This is an interactive card that responds to clicks and shows hover effects.
        </Card>

        <Card title="Compact Card" density="compact">
          This card uses compact density for tighter spacing.
        </Card>

        <Card title="Spacious Card" density="spacious">
          This card uses spacious density for more breathing room.
        </Card>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Typography variant="caption" color="muted">
          All components use design system tokens for consistent spacing, colors, and typography.
        </Typography>
      </div>
    </div>
  );
};