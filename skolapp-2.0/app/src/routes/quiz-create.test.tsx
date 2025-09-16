import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoleProvider } from '../auth/role-context';
import { ThemeProvider } from '../theme/theme-context';
import { TeacherDashboard } from './TeacherDashboard';
import { __forceQuotaError } from '../hooks/useLocalQuizzes';

// Implementerar R1-R8

describe('Quiz Create (TeacherDashboard integration)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function setup() {
    return render(
      <ThemeProvider>
        <RoleProvider>
          <MemoryRouter>
            <TeacherDashboard />
          </MemoryRouter>
        </RoleProvider>
      </ThemeProvider>
    );
  }

  it('R1: submit disabled innan titel & fråga', () => {
    setup();
    const btn = screen.getByRole('button', { name: /skapa/i });
  expect((btn as HTMLButtonElement).disabled).toBe(true);
    // Fyll endast titel
    fireEvent.change(screen.getByLabelText(/Titel/i), { target: { value: 'Mitt quiz' } });
  expect((btn as HTMLButtonElement).disabled).toBe(true);
    // Fyll fråga
    fireEvent.change(screen.getByLabelText(/Första fråga/i), { target: { value: 'Vad är 2+2?' } });
  expect((btn as HTMLButtonElement).disabled).toBe(false);
  });

  it('R2: optimistisk render efter submit', () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Titel/i), { target: { value: 'Optimistiskt quiz' } });
    fireEvent.change(screen.getByLabelText(/Första fråga/i), { target: { value: 'Fråga?' } });
    const btn = screen.getByRole('button', { name: /skapa/i });
    fireEvent.click(btn);
    // Direkt ska quizet synas i listan
    expect(screen.getByText(/Optimistiskt quiz \(lokal\)/)).toBeTruthy();
  });

  it('R3: quiz kvar efter reload', () => {
    const first = setup();
    fireEvent.change(screen.getByLabelText(/Titel/i), { target: { value: 'Persistens quiz' } });
    fireEvent.change(screen.getByLabelText(/Första fråga/i), { target: { value: 'Fråga?' } });
    fireEvent.click(screen.getByRole('button', { name: /skapa/i }));
    expect(screen.getByText(/Persistens quiz \(lokal\)/)).toBeTruthy();
    // Simulera reload
    first.unmount();
    const second = setup();
    expect(screen.getByText(/Persistens quiz \(lokal\)/)).toBeTruthy();
    second.unmount();
  });

  it('R4: offline skapande fungerar', () => {
    // Mock offline
    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });
    setup();
    fireEvent.change(screen.getByLabelText(/Titel/i), { target: { value: 'Offline quiz' } });
    fireEvent.change(screen.getByLabelText(/Första fråga/i), { target: { value: 'Fråga offline?' } });
    fireEvent.click(screen.getByRole('button', { name: /skapa/i }));
    expect(screen.getByText(/Offline quiz \(lokal\)/)).toBeTruthy();
  });

  it('R5: valideringsfel vid tom titel', () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Första fråga/i), { target: { value: 'Fråga?' } });
    const btn = screen.getByRole('button', { name: /skapa/i });
    fireEvent.click(btn);
    expect(screen.getByText(/Titel krävs/)).toBeTruthy();
  });

  it('R6: dubbel submit skapar bara ett quiz', () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Titel/i), { target: { value: 'Dubbel' } });
    fireEvent.change(screen.getByLabelText(/Första fråga/i), { target: { value: 'Fråga' } });
    const btn = screen.getByRole('button', { name: /skapa/i });
    fireEvent.click(btn);
    fireEvent.click(btn); // andra klicket ska ignoreras pga disabled direkt efter state validering
    const matches = screen.getAllByText(/Dubbel \(lokal\)/);
    expect(matches.length).toBe(1);
  });

  it('R7: lång titel stoppas', () => {
    setup();
    const longTitle = 'a'.repeat(130);
    fireEvent.change(screen.getByLabelText(/Titel/i), { target: { value: longTitle } });
    fireEvent.change(screen.getByLabelText(/Första fråga/i), { target: { value: 'Fråga' } });
    const btn = screen.getByRole('button', { name: /skapa/i });
    fireEvent.click(btn);
    expect(screen.getByText(/Titel får max vara 120 tecken/)).toBeTruthy();
  });

  it('R8: quota-fel i localStorage hanteras med felmeddelande', async () => {
    __forceQuotaError(true);
    setup();
    fireEvent.change(screen.getByLabelText(/Titel/i), { target: { value: 'Quota test' } });
    fireEvent.change(screen.getByLabelText(/Första fråga/i), { target: { value: 'Fråga' } });
    fireEvent.click(screen.getByRole('button', { name: /skapa/i }));
    // Vänta på felmeddelande
    expect(await screen.findByText(/Kunde inte spara lokalt/)).toBeTruthy();
    __forceQuotaError(false);
  });
});
