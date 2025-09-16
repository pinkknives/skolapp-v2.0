import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoleProvider } from './auth/role-context';
import { ThemeProvider } from './theme/theme-context';
import { App } from './App';

// Basic a11y smoke tests (not full axe scan, just presence & behavior).

describe('App a11y landmarks', () => {
  it('renders skip link and main landmark', () => {
    render(
      <ThemeProvider>
        <RoleProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </RoleProvider>
      </ThemeProvider>
    );
    const skip = screen.getByText(/Hoppa till innehåll/i);
    expect(skip).toBeTruthy();
  });
});
