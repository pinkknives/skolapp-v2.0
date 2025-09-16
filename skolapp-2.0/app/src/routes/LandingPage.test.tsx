import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('renders hero section with proper accessibility', () => {
    render(<LandingPage />);
    
    // Hero heading should be present and visible
    const heroHeading = screen.getByRole('heading', { 
      level: 1, 
      name: /Modernisera din skolas digitala miljö/i 
    });
    expect(heroHeading).toBeTruthy();
    
    // Should have main navigation
    const nav = screen.getByRole('navigation', { name: /Huvudnavigation/i });
    expect(nav).toBeTruthy();
    
    // Should have footer
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
    
    // CTAs should be present
    const tryFreeBtn = screen.getByRole('button', { name: /Prova gratis/i });
    const demoBtn = screen.getByRole('button', { name: /Se demo/i });
    expect(tryFreeBtn).toBeTruthy();
    expect(demoBtn).toBeTruthy();
  });

  it('renders all feature cards', () => {
    render(<LandingPage />);
    
    // Check for feature headings
    expect(screen.getByRole('heading', { name: /Interaktiva Quiz/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Realtidsdata/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Mobilvänlig/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /GDPR-säker/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Tillgänglig/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Resultatfokus/i })).toBeTruthy();
  });

  it('renders program cards for different education levels', () => {
    render(<LandingPage />);
    
    expect(screen.getByRole('heading', { name: /Grundskola/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Gymnasium/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /Komvux/i })).toBeTruthy();
  });

  it('has proper semantic structure', () => {
    render(<LandingPage />);
    
    // Check for landmark elements - these are within the landing div
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBeGreaterThan(0);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
    
    // Check for hero section by its heading
    const heroHeading = screen.getByText(/Modernisera din skolas digitala miljö/i);
    expect(heroHeading).toBeTruthy();
  });
});