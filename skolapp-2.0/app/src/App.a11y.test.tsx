import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoleProvider } from './auth/role-context';
import { ThemeProvider } from './theme/theme-context';
import { App } from './App';

// Basic a11y smoke tests (not full axe scan, just presence & behavior).

describe('App a11y landmarks', () => {
  it('renders main landmark for guest landing page', () => {
    render(
      <ThemeProvider>
        <RoleProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </RoleProvider>
      </ThemeProvider>
    );
    
    // Should have main landmark
    const main = screen.getByRole('main');
    expect(main).toBeTruthy();
    
    // Should have at least one navigation (could be multiple)
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBeGreaterThan(0);
    
    // Should have hero heading 
    const heading = screen.getByText(/Modernisera din skolas digitala miljö/i);
    expect(heading).toBeTruthy();
  });
});
