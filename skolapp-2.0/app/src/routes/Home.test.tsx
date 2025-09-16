import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoleProvider } from '../auth/role-context';
import { ThemeProvider } from '../theme/theme-context';
import { Home } from './Home';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <RoleProvider>
        <MemoryRouter>
          {component}
        </MemoryRouter>
      </RoleProvider>
    </ThemeProvider>
  );
};

describe('Home Component', () => {
  it('renders hero section with title and subtitle', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByRole('heading', { name: /välkommen till skolapp/i })).toBeTruthy();
    expect(screen.getByText(/en modern och tillgänglig plattform/i)).toBeTruthy();
  });

  it('renders CTA buttons', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByRole('button', { name: /kom igång som lärare/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /kom igång som elev/i })).toBeTruthy();
  });

  it('renders feature cards', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByRole('heading', { name: /för lärare/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /för elever/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /fungerar offline/i })).toBeTruthy();
  });

  it('renders CTA band', () => {
    renderWithProviders(<Home />);
    
    expect(screen.getByRole('heading', { name: /redo att börja/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /starta nu/i })).toBeTruthy();
  });

  it('feature cards are keyboard accessible', () => {
    renderWithProviders(<Home />);
    
    const featureCard = screen.getByRole('button', { name: /för lärare:/i });
    expect(featureCard).toBeTruthy();
    expect(featureCard.tabIndex).toBe(0);
  });

  it('feature cards respond to Enter key', () => {
    renderWithProviders(<Home />);
    
    const featureCard = screen.getByRole('button', { name: /för lärare:/i });
    fireEvent.keyDown(featureCard, { key: 'Enter', code: 'Enter' });
    // The component doesn't throw errors when keyboard interaction happens
    expect(featureCard).toBeTruthy();
  });
});