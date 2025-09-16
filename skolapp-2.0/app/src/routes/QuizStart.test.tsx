import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoleProvider } from '../auth/role-context';
import { ThemeProvider } from '../theme/theme-context';
import { QuizStart } from './QuizStart';

// Mock useParams and Navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    Navigate: ({ to, replace }: any) => <div data-testid="navigate" data-to={to} data-replace={replace} />,
  };
});

import { useParams } from 'react-router-dom';

describe('QuizStart', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  function setup(quizId?: string) {
    (useParams as any).mockReturnValue({ quizId });
    return render(
      <ThemeProvider>
        <RoleProvider>
          <MemoryRouter>
            <QuizStart />
          </MemoryRouter>
        </RoleProvider>
      </ThemeProvider>
    );
  }

  it('R1: redirects to student dashboard when no quizId', () => {
    setup(); // No quizId
    
    const navigate = screen.getByTestId('navigate');
    expect(navigate).toBeTruthy();
    expect(navigate.getAttribute('data-to')).toBe('/student');
    expect(navigate.getAttribute('data-replace')).toBe('true');
  });

  it('R2: displays quiz start page with correct quiz ID', () => {
    setup('quiz-123');
    
    expect(screen.getByText('Quiz Start')).toBeTruthy();
    expect(screen.getByText('Redo att starta?')).toBeTruthy();
    expect(screen.getByText('quiz-123')).toBeTruthy();
    expect(screen.getByRole('button', { name: /starta quiz/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /tillbaka/i })).toBeTruthy();
  });

  it('R3: displays GDPR compliance message', () => {
    setup('quiz-123');
    
    expect(screen.getByText(/GDPR: Ingen elevdata loggas innan du startar quizet/i)).toBeTruthy();
  });

  it('R4: starts quiz and logs action when start button clicked', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    setup('quiz-456');
    
    const startButton = screen.getByRole('button', { name: /starta quiz/i });
    fireEvent.click(startButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Quiz started for quiz:', 'quiz-456');
    expect(alertSpy).toHaveBeenCalledWith('Quiz startar! (Implementation kommer i nästa steg)');
    
    alertSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it('R5: back button navigates to previous page', () => {
    const historySpy = vi.spyOn(window.history, 'back').mockImplementation(() => {});
    
    setup('quiz-789');
    
    const backButton = screen.getByRole('button', { name: /tillbaka/i });
    fireEvent.click(backButton);
    
    expect(historySpy).toHaveBeenCalled();
    
    historySpy.mockRestore();
  });

  it('R6: has proper styling and layout', () => {
    setup('quiz-test');
    
    // Check that the main content is properly styled
    const quizIdElement = screen.getByText('quiz-test');
    expect(quizIdElement.tagName).toBe('STRONG');
    
    // Check buttons exist
    expect(screen.getByRole('button', { name: /starta quiz/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /tillbaka/i })).toBeTruthy();
  });
});