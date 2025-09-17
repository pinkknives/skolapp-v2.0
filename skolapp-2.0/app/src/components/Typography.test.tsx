import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';

describe('Typography Component', () => {
  it('renders heading variants correctly', () => {
    render(<Typography variant="h1">Test Heading</Typography>);
    const heading = screen.getByText('Test Heading');
    expect(heading).toBeTruthy();
    expect(heading.tagName).toBe('H1');
  });

  it('renders body text correctly', () => {
    render(<Typography variant="body">Test body text</Typography>);
    const text = screen.getByText('Test body text');
    expect(text).toBeTruthy();
    expect(text.tagName).toBe('P');
  });

  it('applies custom element with as prop', () => {
    render(<Typography as="span" variant="h2">Custom element</Typography>);
    const element = screen.getByText('Custom element');
    expect(element.tagName).toBe('SPAN');
  });

  it('applies color variants', () => {
    render(<Typography color="muted">Muted text</Typography>);
    const text = screen.getByText('Muted text');
    expect(text.className).toContain('ds-text--muted');
  });

  it('applies weight variants', () => {
    render(<Typography weight="bold">Bold text</Typography>);
    const text = screen.getByText('Bold text');
    expect(text.className).toContain('ds-font-bold');
  });
});