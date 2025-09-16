import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoleProvider } from '../auth/role-context';
import { AuthProvider } from '../auth/auth-context';
import { ThemeProvider } from '../theme/theme-context';
import { App } from '../App';

describe('Protected routes', () => {
  it('denies access to teacher dashboard as guest', () => {
    render(
      <ThemeProvider>
        <AuthProvider>
          <RoleProvider>
            <MemoryRouter initialEntries={['/teacher']}>
              <App />
            </MemoryRouter>
          </RoleProvider>
        </AuthProvider>
      </ThemeProvider>
    );
    expect(screen.getByText(/Åtkomst nekad/i)).toBeTruthy();
  });
});
