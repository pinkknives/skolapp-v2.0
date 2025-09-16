import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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
  it('renders hero section with main heading and CTA buttons', () => {
    renderWithProviders(<Home />);
    
    // Check hero content
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Modernt digitalt lärande för alla');
    expect(screen.getByText(/Skolapp gör det enkelt att skapa/)).toBeInTheDocument();
    
    // Check CTA buttons
    expect(screen.getByRole('button', { name: 'Kom igång' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Läs mer' })).toBeInTheDocument();
  });

  it('renders features section with all feature cards', () => {
    renderWithProviders(<Home />);
    
    // Check section heading
    expect(screen.getByRole('heading', { level: 2, name: 'Kraftfulla funktioner för modernt lärande' })).toBeInTheDocument();
    
    // Check all feature cards
    expect(screen.getByRole('heading', { level: 3, name: 'Enkla Quiz' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Klasshantering' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Analys & Rapporter' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Fungerar Överallt' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Säker & Privat' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Snabb & Responsiv' })).toBeInTheDocument();
  });

  it('renders CTA section with role selection buttons', () => {
    renderWithProviders(<Home />);
    
    // Check CTA heading
    expect(screen.getByRole('heading', { level: 2, name: 'Redo att börja?' })).toBeInTheDocument();
    
    // Check role selection buttons
    expect(screen.getByRole('button', { name: 'Jag är lärare' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Jag är elev' })).toBeInTheDocument();
  });
});