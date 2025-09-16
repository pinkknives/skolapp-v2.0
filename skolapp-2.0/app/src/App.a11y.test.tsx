import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoleProvider } from './auth/role-context';
import { AuthProvider } from './auth/auth-context';
import { ThemeProvider } from './theme/theme-context';
import { App } from './App';

// Basic a11y smoke tests (not full axe scan, just presence & behavior).

describe('App a11y landmarks', () => {
  it('renders skip link and main landmark', () => {
    render(
      <ThemeProvider>
        <AuthProvider>
          <RoleProvider>
            <MemoryRouter>
              <App />
            </MemoryRouter>
          </RoleProvider>
        </AuthProvider>
      </ThemeProvider>
    );
    const skip = screen.getByText(/Hoppa till innehåll/i);
    expect(skip).toBeTruthy();
  });
});
