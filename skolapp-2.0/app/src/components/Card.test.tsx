import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders title and meta', () => {
    render(<Card title="Titel" meta="Meta info">Body</Card>);
    expect(screen.getByText('Titel')).toBeTruthy();
    expect(screen.getByText('Meta info')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
  });

  it('shows badge when provided', () => {
    render(<Card title="T" badge="B">Body</Card>);
    expect(screen.getByText('B')).toBeTruthy();
  });

  it('applies density classes', () => {
    const { rerender } = render(<Card title="T" density="compact" />);
    const card = screen.getByText('T').closest('.card');
    expect(card?.className).toMatch(/card--compact/);
    rerender(<Card title="T" density="spacious" />);
    const card2 = screen.getByText('T').closest('.card');
    expect(card2?.className).toMatch(/card--spacious/);
  });

  it('handles interactive click', () => {
    const fn = vi.fn();
    render(<Card title="Clickable" interactive onClick={fn} />);
    const card = screen.getByText('Clickable').closest('.card');
    if (!card) throw new Error('Card not found');
    fireEvent.click(card);
    expect(fn).toHaveBeenCalled();
  });
});
