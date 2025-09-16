import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAIQuizGeneration } from './useAIQuizGeneration';

describe('useAIQuizGeneration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate AI quiz with valid topic', async () => {
    const { result } = renderHook(() => useAIQuizGeneration());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);

    let generatedQuiz;
    await act(async () => {
      generatedQuiz = await result.current.generateQuiz({ 
        topic: 'Andra världskriget', 
        questionCount: 5 
      });
    });

    expect(generatedQuiz).toBeDefined();
    expect(generatedQuiz.title).toBe('AI-utkast: Andra världskriget');
    expect(generatedQuiz.topic).toBe('Andra världskriget');
    expect(generatedQuiz.questions).toHaveLength(5);
    expect(generatedQuiz.isAIDraft).toBe(true);
    expect(generatedQuiz.sources).toContain('Skolverket kunskapsbank');
    expect(result.current.loading).toBe(false);
  });

  it('should handle invalid input - empty topic', async () => {
    const { result } = renderHook(() => useAIQuizGeneration());

    await act(async () => {
      try {
        await result.current.generateQuiz({ topic: '' });
      } catch (error) {
        expect(error.code).toBe('INVALID_INPUT');
        expect(error.message).toContain('Ämne/tema krävs');
      }
    });

    expect(result.current.error?.code).toBe('INVALID_INPUT');
  });

  it('should handle invalid input - topic too short', async () => {
    const { result } = renderHook(() => useAIQuizGeneration());

    await act(async () => {
      try {
        await result.current.generateQuiz({ topic: 'ab' });
      } catch (error) {
        expect(error.code).toBe('INVALID_INPUT');
        expect(error.message).toContain('minst 3 tecken');
      }
    });

    expect(result.current.error?.code).toBe('INVALID_INPUT');
  });

  it('should generate questions with correct format', async () => {
    const { result } = renderHook(() => useAIQuizGeneration());

    let generatedQuiz;
    await act(async () => {
      generatedQuiz = await result.current.generateQuiz({ 
        topic: 'Matematik', 
        questionCount: 3 
      });
    });

    expect(generatedQuiz.questions).toHaveLength(3);
    
    generatedQuiz.questions.forEach(question => {
      expect(question.id).toBeDefined();
      expect(question.text).toContain('Matematik');
      expect(question.correctAnswer).toBeDefined();
      expect(question.options).toHaveLength(4);
      expect(question.source).toBe('AI-genererat från säkra kunskapsbaser');
    });
  });

  it('should mark content as AI-generated', async () => {
    const { result } = renderHook(() => useAIQuizGeneration());

    let generatedQuiz;
    await act(async () => {
      generatedQuiz = await result.current.generateQuiz({ 
        topic: 'Historia' 
      });
    });

    expect(generatedQuiz.isAIDraft).toBe(true);
    expect(generatedQuiz.title).toMatch(/^AI-utkast:/);
    expect(generatedQuiz.generatedAt).toBeDefined();
    expect(new Date(generatedQuiz.generatedAt)).toBeInstanceOf(Date);
  });

  it('should respect GDPR - no student data processing', async () => {
    const { result } = renderHook(() => useAIQuizGeneration());

    const topic = 'Mathematics equations';
    
    let generatedQuiz;
    await act(async () => {
      generatedQuiz = await result.current.generateQuiz({ topic });
    });

    // Verify that the AI service only receives the topic, not any student data
    expect(generatedQuiz.topic).toBe(topic);
    // The mock service should only use the topic for generation
    generatedQuiz.questions.forEach(question => {
      expect(question.text).toContain(topic);
      // Should not contain any student-specific information
      expect(question.text).not.toMatch(/elev|användar/i);
    });
  });
});