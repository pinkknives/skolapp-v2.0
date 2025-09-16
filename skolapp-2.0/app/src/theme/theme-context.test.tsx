import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from './theme-context';

const Probe: React.FC = () => {
  const { theme, toggle } = useTheme();
  return <button onClick={toggle}>current:{theme}</button>;
};

describe('ThemeContext', () => {
  it('toggles theme', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>
    );
    const btn = screen.getByText(/current:/);
    const initial = btn.textContent;
    fireEvent.click(btn);
    expect(btn.textContent).not.toBe(initial);
  });
});
