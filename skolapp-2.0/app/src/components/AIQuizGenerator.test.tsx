import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AIQuizGenerator } from './AIQuizGenerator';

const mockOnDraftGenerated = vi.fn();

describe('AIQuizGenerator', () => {
  beforeEach(() => {
    mockOnDraftGenerated.mockClear();
  });

  it('renders AI quiz generator form', () => {
    render(<AIQuizGenerator onDraftGenerated={mockOnDraftGenerated} />);
    
    expect(screen.getByText('🤖 AI Quiz-generator')).toBeInTheDocument();
    expect(screen.getByText(/Allt innehåll markeras som AI-utkast/)).toBeInTheDocument();
    expect(screen.getByLabelText('Ämne eller tema')).toBeInTheDocument();
    expect(screen.getByLabelText('Antal frågor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generera utkast/ })).toBeInTheDocument();
  });

  it('disables submit button when topic is too short', () => {
    render(<AIQuizGenerator onDraftGenerated={mockOnDraftGenerated} />);
    
    const submitButton = screen.getByRole('button', { name: /Generera utkast/ });
    const topicInput = screen.getByLabelText('Ämne eller tema');
    
    expect(submitButton).toBeDisabled();
    
    fireEvent.change(topicInput, { target: { value: 'ab' } });
    expect(submitButton).toBeDisabled();
    
    fireEvent.change(topicInput, { target: { value: 'abc' } });
    expect(submitButton).not.toBeDisabled();
  });

  it('shows loading state and completes generation', async () => {
    render(<AIQuizGenerator onDraftGenerated={mockOnDraftGenerated} />);
    
    const topicInput = screen.getByLabelText('Ämne eller tema');
    const submitButton = screen.getByRole('button', { name: /Generera utkast/ });
    
    fireEvent.change(topicInput, { target: { value: 'Andra världskriget' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText('Genererar utkast...')).toBeInTheDocument();
    expect(screen.getByText('🔍 Söker i säkra kunskapsbaser...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    
    // Wait for generation to complete (mock has 2s delay)
    await waitFor(() => {
      expect(mockOnDraftGenerated).toHaveBeenCalled();
    }, { timeout: 3000 });
    
    expect(topicInput.value).toBe('');
  });

  it('validates topic length and shows error styling', () => {
    render(<AIQuizGenerator onDraftGenerated={mockOnDraftGenerated} />);
    
    const topicInput = screen.getByLabelText('Ämne eller tema');
    
    // Should not show error initially
    expect(topicInput).not.toHaveStyle({ borderColor: 'var(--error-color, #dc3545)' });
    
    fireEvent.change(topicInput, { target: { value: 'ab' } });
    fireEvent.blur(topicInput);
    
    // Should show error for short input when form is submitted
    const submitButton = screen.getByRole('button', { name: /Generera utkast/ });
    fireEvent.click(submitButton);
  });

  it('allows selecting different question counts', () => {
    render(<AIQuizGenerator onDraftGenerated={mockOnDraftGenerated} />);
    
    const questionCountSelect = screen.getByLabelText('Antal frågor');
    
    expect(questionCountSelect.value).toBe('5');
    
    fireEvent.change(questionCountSelect, { target: { value: '8' } });
    expect(questionCountSelect.value).toBe('8');
    
    fireEvent.change(questionCountSelect, { target: { value: '10' } });
    expect(questionCountSelect.value).toBe('10');
  });

  it('respects maxLength for topic input', () => {
    render(<AIQuizGenerator onDraftGenerated={mockOnDraftGenerated} />);
    
    const topicInput = screen.getByLabelText('Ämne eller tema');
    expect(topicInput.getAttribute('maxLength')).toBe('100');
  });

  it('shows appropriate placeholder text', () => {
    render(<AIQuizGenerator onDraftGenerated={mockOnDraftGenerated} />);
    
    const topicInput = screen.getByLabelText('Ämne eller tema');
    expect(topicInput.getAttribute('placeholder')).toBe('Ex: Andra världskriget, Ekosystem, Algebra');
  });
});