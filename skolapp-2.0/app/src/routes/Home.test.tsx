import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';

describe('Home Landing Page', () => {
  const renderHome = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  };

  it('renders hero section with title and subtitle', () => {
    renderHome();
    
    const title = screen.getByRole('heading', { level: 1, name: /skolapp/i });
    expect(title).toBeTruthy();
    
    const subtitle = screen.getByText(/modern och intuitive plattform/i);
    expect(subtitle).toBeTruthy();
  });

  it('renders primary and secondary CTA buttons', () => {
    renderHome();
    
    const primaryButton = screen.getByRole('button', { name: /kom igång/i });
    const secondaryButton = screen.getByRole('button', { name: /läs mer/i });
    
    expect(primaryButton).toBeTruthy();
    expect(secondaryButton).toBeTruthy();
  });

  it('renders feature cards section', () => {
    renderHome();
    
    const featuresTitle = screen.getByRole('heading', { level: 2, name: /funktioner/i });
    expect(featuresTitle).toBeTruthy();
    
    const quizFeature = screen.getByRole('heading', { level: 3, name: /skapa quiz/i });
    const trackingFeature = screen.getByRole('heading', { level: 3, name: /spåra framsteg/i });
    const engagementFeature = screen.getByRole('heading', { level: 3, name: /engagerande innehåll/i });
    
    expect(quizFeature).toBeTruthy();
    expect(trackingFeature).toBeTruthy();
    expect(engagementFeature).toBeTruthy();
  });

  it('renders CTA section with role selection links', () => {
    renderHome();
    
    const ctaTitle = screen.getByRole('heading', { level: 2, name: /redo att börja/i });
    expect(ctaTitle).toBeTruthy();
    
    const teacherLink = screen.getByRole('link', { name: /jag är lärare/i });
    const studentLink = screen.getByRole('link', { name: /jag är elev/i });
    
    expect(teacherLink).toBeTruthy();
    expect(studentLink).toBeTruthy();
    expect(teacherLink.getAttribute('href')).toBe('/teacher');
    expect(studentLink.getAttribute('href')).toBe('/student');
  });

  it('has proper accessibility structure with semantic headings', () => {
    renderHome();
    
    // Check heading hierarchy: h1 -> h2 -> h3
    const headings = screen.getAllByRole('heading');
    const h1 = headings.filter(h => h.tagName === 'H1');
    const h2 = headings.filter(h => h.tagName === 'H2');
    const h3 = headings.filter(h => h.tagName === 'H3');
    
    expect(h1).toHaveLength(1); // Main title
    expect(h2).toHaveLength(2); // Features title + CTA title
    expect(h3).toHaveLength(3); // Three feature cards
  });
});