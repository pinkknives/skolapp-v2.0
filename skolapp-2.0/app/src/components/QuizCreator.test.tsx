import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizCreator } from '../components/QuizCreator';
import { ThemeProvider } from '../theme/theme-context';
import type { LocalQuestion } from '../hooks/useLocalQuizzes';

describe('QuizCreator Advanced', () => {
  function setup(onSave = vi.fn()) {
    return render(
      <ThemeProvider>
        <QuizCreator onSave={onSave} />
      </ThemeProvider>
    );
  }

  it('displays quiz creation form with basic fields', () => {
    setup();
    expect(screen.getByLabelText(/Titel/)).toBeTruthy();
    expect(screen.getByLabelText(/Beskrivning/)).toBeTruthy();
    expect(screen.getByText(/Lägg till fråga/)).toBeTruthy();
  });

  it('can add and configure MCQ questions', () => {
    setup();
    
    // Add title
    fireEvent.change(screen.getByLabelText(/Titel/), { target: { value: 'Test Quiz' } });
    
    // Add question
    fireEvent.click(screen.getByText(/Lägg till fråga/));
    
    // Should have one question now
    expect(screen.getByText(/Fråga 1/)).toBeTruthy();
    
    // Fill question text
    const questionInput = screen.getByPlaceholderText(/Skriv din fråga här/);
    fireEvent.change(questionInput, { target: { value: 'Vad är 2+2?' } });
    
    // Should default to MCQ type
    const typeSelect = screen.getByDisplayValue(/Flerval/);
    expect(typeSelect).toBeTruthy();
    
    // Should have default answer options
    expect(screen.getByText(/Svarsalternativ/)).toBeTruthy();
    
    // Fill answer options
    const optionInputs = screen.getAllByPlaceholderText(/Alternativ/);
    expect(optionInputs.length).toBe(2); // Default 2 options
    
    fireEvent.change(optionInputs[0], { target: { value: '4' } });
    fireEvent.change(optionInputs[1], { target: { value: '5' } });
    
    // First option should be marked as correct by default
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons[0]).toBeChecked();
  });

  it('can switch question types and handles true/false correctly', () => {
    setup();
    
    // Add title and question
    fireEvent.change(screen.getByLabelText(/Titel/), { target: { value: 'Test Quiz' } });
    fireEvent.click(screen.getByText(/Lägg till fråga/));
    
    const questionInput = screen.getByPlaceholderText(/Skriv din fråga här/);
    fireEvent.change(questionInput, { target: { value: 'Jorden är rund' } });
    
    // Switch to true/false
    const typeSelect = screen.getByDisplayValue(/Flerval/);
    fireEvent.change(typeSelect, { target: { value: 'true-false' } });
    
    // Should show Sant/Falskt options
    const santElements = screen.getAllByText(/Sant/);
    expect(santElements.length).toBeGreaterThan(0);
    const falsktElements = screen.getAllByText(/Falskt/);
    expect(falsktElements.length).toBeGreaterThan(0);
    
    // Should have radio buttons for correct answer
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons.length).toBe(2);
  });

  it('can handle short text questions', () => {
    setup();
    
    // Add title and question
    fireEvent.change(screen.getByLabelText(/Titel/), { target: { value: 'Test Quiz' } });
    fireEvent.click(screen.getByText(/Lägg till fråga/));
    
    const questionInput = screen.getByPlaceholderText(/Skriv din fråga här/);
    fireEvent.change(questionInput, { target: { value: 'Vad heter huvudstaden i Sverige?' } });
    
    // Switch to short text
    const typeSelect = screen.getByDisplayValue(/Flerval/);
    fireEvent.change(typeSelect, { target: { value: 'short-text' } });
    
    // Should show correct answer field
    expect(screen.getByLabelText(/Korrekt svar/)).toBeTruthy();
    
    // Fill correct answer
    const correctAnswerInput = screen.getByPlaceholderText(/Skriv det korrekta svaret/);
    fireEvent.change(correctAnswerInput, { target: { value: 'Stockholm' } });
  });

  it('validates required fields before saving', () => {
    const onSave = vi.fn();
    setup(onSave);
    
    // Try to save without title or questions
    fireEvent.click(screen.getByText(/Spara quiz/));
    
    // Should show validation errors (currently button is disabled, so no save happens)
    expect(onSave).not.toHaveBeenCalled();
    
    // Add title but no questions
    fireEvent.change(screen.getByLabelText(/Titel/), { target: { value: 'Test' } });
    
    // Button should still be disabled without questions
    const saveButton = screen.getByText(/Spara quiz/);
    expect(saveButton.closest('button')).toBeDisabled();
  });

  it('can add time limits to questions', () => {
    setup();
    
    // Add title and question
    fireEvent.change(screen.getByLabelText(/Titel/), { target: { value: 'Test Quiz' } });
    fireEvent.click(screen.getByText(/Lägg till fråga/));
    
    // Set time limit
    const timeLimitInput = screen.getByPlaceholderText('30');
    fireEvent.change(timeLimitInput, { target: { value: '60' } });
    
    expect(timeLimitInput.value).toBe('60');
  });

  it('shows preview mode with correct formatting', async () => {
    setup();
    
    // Create a complete quiz
    fireEvent.change(screen.getByLabelText(/Titel/), { target: { value: 'Preview Test' } });
    fireEvent.change(screen.getByLabelText(/Beskrivning/), { target: { value: 'Test description' } });
    
    // Add question
    fireEvent.click(screen.getByText(/Lägg till fråga/));
    
    const questionInput = screen.getByPlaceholderText(/Skriv din fråga här/);
    fireEvent.change(questionInput, { target: { value: 'Test question' } });
    
    // Fill answer options
    const optionInputs = screen.getAllByPlaceholderText(/Alternativ/);
    fireEvent.change(optionInputs[0], { target: { value: 'Correct answer' } });
    fireEvent.change(optionInputs[1], { target: { value: 'Wrong answer' } });
    
    // Go to preview
    fireEvent.click(screen.getByText(/Förhandsgranska/));
    
    // Should show preview content
    expect(screen.getByText('Preview Test')).toBeTruthy();
    expect(screen.getByText('Test description')).toBeTruthy();
    expect(screen.getByText('Test question')).toBeTruthy();
    // Check for "Correct answer" text within the list item
    expect(screen.getByText(/Correct answer/)).toBeTruthy();
    expect(screen.getByText(/\(Korrekt\)/)).toBeTruthy();
    
    // Should have edit and save buttons
    expect(screen.getByText(/Redigera/)).toBeTruthy();
    expect(screen.getByText(/Spara quiz/)).toBeTruthy();
  });

  it('successfully saves complete quiz and calls onSave', () => {
    const onSave = vi.fn().mockReturnValue({ quiz: { id: 'test-id' } });
    setup(onSave);
    
    // Create complete quiz
    fireEvent.change(screen.getByLabelText(/Titel/), { target: { value: 'Complete Quiz' } });
    
    // Add MCQ question
    fireEvent.click(screen.getByText(/Lägg till fråga/));
    const questionInput = screen.getByPlaceholderText(/Skriv din fråga här/);
    fireEvent.change(questionInput, { target: { value: 'What is 2+2?' } });
    
    const optionInputs = screen.getAllByPlaceholderText(/Alternativ/);
    fireEvent.change(optionInputs[0], { target: { value: '4' } });
    fireEvent.change(optionInputs[1], { target: { value: '3' } });
    
    // Save quiz
    fireEvent.click(screen.getByText(/Spara quiz/));
    
    // Should call onSave with correct parameters
    expect(onSave).toHaveBeenCalledWith(
      'Complete Quiz',
      expect.arrayContaining([
        expect.objectContaining({
          text: 'What is 2+2?',
          type: 'mcq',
          timeLimit: 30,
          options: expect.arrayContaining([
            expect.objectContaining({ text: '4', isCorrect: true }),
            expect.objectContaining({ text: '3', isCorrect: false })
          ])
        })
      ]),
      '' // empty description
    );
  });

  it('can delete questions', () => {
    setup();
    
    // Add title and two questions
    fireEvent.change(screen.getByLabelText(/Titel/), { target: { value: 'Test Quiz' } });
    fireEvent.click(screen.getByText(/Lägg till fråga/));
    fireEvent.click(screen.getByText(/Lägg till fråga/));
    
    // Should have 2 questions
    expect(screen.getByText(/Fråga 1/)).toBeTruthy();
    expect(screen.getByText(/Fråga 2/)).toBeTruthy();
    
    // Delete first question
    const deleteButtons = screen.getAllByText(/Ta bort/);
    fireEvent.click(deleteButtons[0]);
    
    // Should now only have 1 question (renumbered as Fråga 1)
    expect(screen.getByText(/Fråga 1/)).toBeTruthy();
    expect(screen.queryByText(/Fråga 2/)).toBeFalsy();
  });
});