import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RoleProvider } from '../auth/role-context';
import { ThemeProvider } from '../theme/theme-context';
import { StudentDashboard } from './StudentDashboard';

// Mock fetch for quiz codes API
const mockQuizCodes = {
  'ABC123': {
    id: 'quiz-1',
    title: 'Matematik Quiz',
    status: 'active',
    questions: 10
  },
  'XYZ789': {
    id: 'quiz-2',
    title: 'Historia Quiz',
    status: 'active',
    questions: 15
  },
  'DEF456': {
    id: 'quiz-3',
    title: 'Stängt Quiz',
    status: 'closed',
    questions: 8
  }
};

describe('Quiz Join via Code', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
    
    // Mock fetch for quiz codes and quizzes
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('quiz-codes.json')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockQuizCodes)
        });
      }
      // Default mock for quizzes.json
      if (url.includes('quizzes.json')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            { id: 'q1', title: 'Test Quiz 1', updatedAt: '2025-01-01T10:00:00Z' },
            { id: 'q2', title: 'Test Quiz 2', updatedAt: '2025-01-01T10:00:00Z' }
          ])
        });
      }
      // Fallback
      return Promise.resolve({
        ok: false,
        status: 404
      });
    });
  });

  function setup() {
    return render(
      <ThemeProvider>
        <RoleProvider>
          <MemoryRouter>
            <StudentDashboard />
          </MemoryRouter>
        </RoleProvider>
      </ThemeProvider>
    );
  }

  it('R1: displays quiz code input field with correct attributes', () => {
    setup();
    
    const input = screen.getByLabelText(/Quizkod \(6 tecken\)/i);
    expect(input).toBeTruthy();
    expect(input.getAttribute('maxLength')).toBe('6');
    expect(input.getAttribute('placeholder')).toBe('ABC123');
    expect(input.getAttribute('pattern')).toBe('[A-Z0-9]{6}');
    
    const submitButton = screen.getByRole('button', { name: /anslut till quiz/i });
    expect(submitButton).toBeTruthy();
    expect(submitButton.disabled).toBe(true);
  });

  it('R2: enables submit button only when 6 characters entered', async () => {
    setup();
    
    const input = screen.getByLabelText(/Quizkod \(6 tecken\)/i);
    const submitButton = screen.getByRole('button', { name: /anslut till quiz/i });
    
    // Initially disabled
    expect(submitButton.disabled).toBe(true);
    
    // Still disabled with less than 6 characters
    fireEvent.change(input, { target: { value: 'ABC12' } });
    expect(submitButton.disabled).toBe(true);
    
    // Enabled with exactly 6 characters
    fireEvent.change(input, { target: { value: 'ABC123' } });
    expect(submitButton.disabled).toBe(false);
  });

  it('R3: converts input to uppercase and limits to 6 characters', () => {
    setup();
    
    const input = screen.getByLabelText(/Quizkod \(6 tecken\)/i);
    
    fireEvent.change(input, { target: { value: 'abc123def' } });
    expect(input.value).toBe('ABC123');
  });

  it('R4: successfully joins quiz with valid code', async () => {
    // Mock alert to capture success message
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    setup();
    
    const input = screen.getByLabelText(/Quizkod \(6 tecken\)/i);
    const submitButton = screen.getByRole('button', { name: /anslut till quiz/i });
    
    fireEvent.change(input, { target: { value: 'ABC123' } });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Ansluter till quiz: Matematik Quiz (10 frågor)');
      expect(consoleSpy).toHaveBeenCalledWith('Joining quiz:', mockQuizCodes.ABC123);
      expect(input.value).toBe(''); // Input should be cleared
    });
    
    alertSpy.mockRestore();
    consoleSpy.mockRestore();
  });

  it('R5: shows error for invalid quiz code', async () => {
    setup();
    
    const input = screen.getByLabelText(/Quizkod \(6 tecken\)/i);
    const submitButton = screen.getByRole('button', { name: /anslut till quiz/i });
    
    fireEvent.change(input, { target: { value: 'INVALID' } });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Ogiltig quizkod');
    });
  });

  it('R6: shows error for closed quiz', async () => {
    setup();
    
    const input = screen.getByLabelText(/Quizkod \(6 tecken\)/i);
    const submitButton = screen.getByRole('button', { name: /anslut till quiz/i });
    
    fireEvent.change(input, { target: { value: 'DEF456' } });
    
    await act(async () => {
      fireEvent.click(submitButton);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Quiz är stängt');
    });
  });

  it('R7: clears error when user starts typing', async () => {
    setup();
    
    const input = screen.getByLabelText(/Quizkod \(6 tecken\)/i);
    const submitButton = screen.getByRole('button', { name: /anslut till quiz/i });
    
    // Generate error first
    fireEvent.change(input, { target: { value: 'INVALID' } });
    await act(async () => {
      fireEvent.click(submitButton);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Ogiltig quizkod');
    });
    
    // Error should clear when typing
    fireEvent.change(input, { target: { value: 'ABC' } });
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('R8: validates empty input', async () => {
    setup();
    
    const input = screen.getByLabelText(/Quizkod \(6 tecken\)/i);
    const submitButton = screen.getByRole('button', { name: /anslut till quiz/i });
    
    // Try to submit empty form
    fireEvent.change(input, { target: { value: '' } });
    
    const form = input.closest('form');
    await act(async () => {
      fireEvent.submit(form!);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Quizkod krävs');
    });
  });

  it('R9: validates code length', async () => {
    setup();
    
    const input = screen.getByLabelText(/Quizkod \(6 tecken\)/i);
    const submitButton = screen.getByRole('button', { name: /anslut till quiz/i });
    
    fireEvent.change(input, { target: { value: 'ABC12' } }); // Only 5 characters
    
    const form = input.closest('form');
    await act(async () => {
      fireEvent.submit(form!);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Quizkod måste vara 6 tecken');
    });
  });

  it('R10: shows loading state during submission', async () => {
    // Mock slow network for quiz codes
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.includes('quiz-codes.json')) {
        return new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          json: () => Promise.resolve(mockQuizCodes)
        }), 100));
      }
      if (url.includes('quizzes.json')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            { id: 'q1', title: 'Test Quiz 1', updatedAt: '2025-01-01T10:00:00Z' }
          ])
        });
      }
      return Promise.resolve({ ok: false, status: 404 });
    });
    
    setup();
    
    const input = screen.getByLabelText(/Quizkod \(6 tecken\)/i);
    const submitButton = screen.getByRole('button', { name: /anslut till quiz/i });
    
    fireEvent.change(input, { target: { value: 'ABC123' } });
    
    act(() => {
      fireEvent.click(submitButton);
    });
    
    // Should show loading state
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ansluter\.\.\./i })).toBeTruthy();
    });
    expect(input.disabled).toBe(true);
    
    // Wait for completion
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /anslut till quiz/i })).toBeTruthy();
    }, { timeout: 300 });
  });
});