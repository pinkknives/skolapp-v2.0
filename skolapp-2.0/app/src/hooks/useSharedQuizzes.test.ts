import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSharedQuizzes } from './useSharedQuizzes';
import { LocalQuiz } from './useLocalQuizzes';

describe('useSharedQuizzes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with empty shared quizzes', () => {
    const { result } = renderHook(() => useSharedQuizzes());
    expect(result.current.sharedQuizzes).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should share a quiz', () => {
    const { result } = renderHook(() => useSharedQuizzes());
    
    const mockQuiz: LocalQuiz = {
      id: 'test-quiz-1',
      title: 'Test Quiz',
      questions: [
        { id: 'q1', text: 'What is 2+2?' },
        { id: 'q2', text: 'What is the capital of Sweden?' }
      ],
      createdAt: '2025-01-01T00:00:00Z',
      local: true
    };

    act(() => {
      result.current.shareQuiz(mockQuiz, 'Test Teacher', ['matematik', 'åk3']);
    });

    expect(result.current.sharedQuizzes).toHaveLength(1);
    const sharedQuiz = result.current.sharedQuizzes[0];
    expect(sharedQuiz.title).toBe('Test Quiz');
    expect(sharedQuiz.authorName).toBe('Test Teacher');
    expect(sharedQuiz.tags).toEqual(['matematik', 'åk3']);
    expect(sharedQuiz.questionCount).toBe(2);
    expect(sharedQuiz.comments).toEqual([]);
    expect(sharedQuiz.ratings).toEqual([]);
    expect(sharedQuiz.averageRating).toBe(0);
    expect(sharedQuiz.totalRatings).toBe(0);
    expect(sharedQuiz.isReported).toBe(false);
  });

  it('should add a rating to a quiz', () => {
    const { result } = renderHook(() => useSharedQuizzes());
    
    const mockQuiz: LocalQuiz = {
      id: 'test-quiz-1',
      title: 'Test Quiz',
      questions: [{ id: 'q1', text: 'Test question' }],
      createdAt: '2025-01-01T00:00:00Z',
      local: true
    };

    act(() => {
      result.current.shareQuiz(mockQuiz, 'Test Teacher', []);
    });

    const quizId = result.current.sharedQuizzes[0].id;

    act(() => {
      result.current.addRating(quizId, 'user1', 4);
    });

    const updatedQuiz = result.current.sharedQuizzes[0];
    expect(updatedQuiz.totalRatings).toBe(1);
    expect(updatedQuiz.averageRating).toBe(4);
    expect(updatedQuiz.ratings[0].rating).toBe(4);
    expect(updatedQuiz.ratings[0].userId).toBe('user1');
  });

  it('should update rating from same user', () => {
    const { result } = renderHook(() => useSharedQuizzes());
    
    const mockQuiz: LocalQuiz = {
      id: 'test-quiz-1',
      title: 'Test Quiz',
      questions: [{ id: 'q1', text: 'Test question' }],
      createdAt: '2025-01-01T00:00:00Z',
      local: true
    };

    act(() => {
      result.current.shareQuiz(mockQuiz, 'Test Teacher', []);
    });

    const quizId = result.current.sharedQuizzes[0].id;

    act(() => {
      result.current.addRating(quizId, 'user1', 3);
    });

    act(() => {
      result.current.addRating(quizId, 'user1', 5);
    });

    const updatedQuiz = result.current.sharedQuizzes[0];
    expect(updatedQuiz.totalRatings).toBe(1);
    expect(updatedQuiz.averageRating).toBe(5);
    expect(updatedQuiz.ratings).toHaveLength(1);
  });

  it('should calculate average rating correctly', () => {
    const { result } = renderHook(() => useSharedQuizzes());
    
    const mockQuiz: LocalQuiz = {
      id: 'test-quiz-1',
      title: 'Test Quiz',
      questions: [{ id: 'q1', text: 'Test question' }],
      createdAt: '2025-01-01T00:00:00Z',
      local: true
    };

    act(() => {
      result.current.shareQuiz(mockQuiz, 'Test Teacher', []);
    });

    const quizId = result.current.sharedQuizzes[0].id;

    act(() => {
      result.current.addRating(quizId, 'user1', 4);
      result.current.addRating(quizId, 'user2', 2);
      result.current.addRating(quizId, 'user3', 5);
    });

    const updatedQuiz = result.current.sharedQuizzes[0];
    expect(updatedQuiz.totalRatings).toBe(3);
    expect(updatedQuiz.averageRating).toBe(3.7); // (4+2+5)/3 = 3.66... rounded to 3.7
  });

  it('should add comments to a quiz', () => {
    const { result } = renderHook(() => useSharedQuizzes());
    
    const mockQuiz: LocalQuiz = {
      id: 'test-quiz-1',
      title: 'Test Quiz',
      questions: [{ id: 'q1', text: 'Test question' }],
      createdAt: '2025-01-01T00:00:00Z',
      local: true
    };

    act(() => {
      result.current.shareQuiz(mockQuiz, 'Test Teacher', []);
    });

    const quizId = result.current.sharedQuizzes[0].id;

    act(() => {
      result.current.addComment(quizId, 'Commenter', 'Great quiz!');
    });

    const updatedQuiz = result.current.sharedQuizzes[0];
    expect(updatedQuiz.comments).toHaveLength(1);
    expect(updatedQuiz.comments[0].text).toBe('Great quiz!');
    expect(updatedQuiz.comments[0].authorName).toBe('Commenter');
  });

  it('should report a quiz', () => {
    const { result } = renderHook(() => useSharedQuizzes());
    
    const mockQuiz: LocalQuiz = {
      id: 'test-quiz-1',
      title: 'Test Quiz',
      questions: [{ id: 'q1', text: 'Test question' }],
      createdAt: '2025-01-01T00:00:00Z',
      local: true
    };

    act(() => {
      result.current.shareQuiz(mockQuiz, 'Test Teacher', []);
    });

    const quizId = result.current.sharedQuizzes[0].id;

    act(() => {
      result.current.reportQuiz(quizId);
    });

    const updatedQuiz = result.current.sharedQuizzes[0];
    expect(updatedQuiz.isReported).toBe(true);
  });

  it('should search quizzes by title', () => {
    const { result } = renderHook(() => useSharedQuizzes());
    
    const quiz1: LocalQuiz = {
      id: 'quiz-1',
      title: 'Math Quiz',
      questions: [{ id: 'q1', text: 'Test question' }],
      createdAt: '2025-01-01T00:00:00Z',
      local: true
    };

    const quiz2: LocalQuiz = {
      id: 'quiz-2',
      title: 'Science Quiz',
      questions: [{ id: 'q1', text: 'Test question' }],
      createdAt: '2025-01-01T00:00:00Z',
      local: true
    };

    act(() => {
      result.current.shareQuiz(quiz1, 'Teacher A', ['math']);
      result.current.shareQuiz(quiz2, 'Teacher B', ['science']);
    });

    const searchResults = result.current.searchQuizzes('math');
    expect(searchResults).toHaveLength(1);
    expect(searchResults[0].title).toBe('Math Quiz');
  });

  it('should filter quizzes by tags', () => {
    const { result } = renderHook(() => useSharedQuizzes());
    
    const quiz1: LocalQuiz = {
      id: 'quiz-1',
      title: 'Math Quiz',
      questions: [{ id: 'q1', text: 'Test question' }],
      createdAt: '2025-01-01T00:00:00Z',
      local: true
    };

    const quiz2: LocalQuiz = {
      id: 'quiz-2',
      title: 'Science Quiz',
      questions: [{ id: 'q1', text: 'Test question' }],
      createdAt: '2025-01-01T00:00:00Z',
      local: true
    };

    act(() => {
      result.current.shareQuiz(quiz1, 'Teacher A', ['math', 'åk3']);
      result.current.shareQuiz(quiz2, 'Teacher B', ['science', 'åk4']);
    });

    const filteredResults = result.current.filterByTags(['math']);
    expect(filteredResults).toHaveLength(1);
    expect(filteredResults[0].title).toBe('Math Quiz');
  });

  it('should persist shared quizzes to localStorage', () => {
    const { result } = renderHook(() => useSharedQuizzes());
    
    const mockQuiz: LocalQuiz = {
      id: 'test-quiz-1',
      title: 'Test Quiz',
      questions: [{ id: 'q1', text: 'Test question' }],
      createdAt: '2025-01-01T00:00:00Z',
      local: true
    };

    act(() => {
      result.current.shareQuiz(mockQuiz, 'Test Teacher', ['test']);
    });

    // Check localStorage
    const stored = localStorage.getItem('shared-quizzes');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].title).toBe('Test Quiz');
  });
});