import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LocalQuiz } from './useLocalQuizzes';

export interface SharedQuizComment {
  id: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface SharedQuizRating {
  userId: string;
  rating: number; // 1-5 stars
  createdAt: string;
}

export interface SharedQuiz {
  id: string;
  originalQuizId: string;
  title: string;
  authorName: string;
  publishedAt: string;
  tags: string[];
  comments: SharedQuizComment[];
  ratings: SharedQuizRating[];
  averageRating: number;
  totalRatings: number;
  isReported: boolean;
  questionCount: number;
}

interface State {
  sharedQuizzes: SharedQuiz[];
  loading: boolean;
  error: string | null;
}

export interface UseSharedQuizzesResult extends State {
  shareQuiz: (quiz: LocalQuiz, authorName: string, tags: string[]) => void;
  addComment: (quizId: string, authorName: string, text: string) => void;
  addRating: (quizId: string, userId: string, rating: number) => void;
  reportQuiz: (quizId: string) => void;
  searchQuizzes: (query: string) => SharedQuiz[];
  filterByTags: (tags: string[]) => SharedQuiz[];
}

// Load shared quizzes from localStorage
function loadSharedQuizzes(): SharedQuiz[] {
  try {
    const raw = localStorage.getItem('shared-quizzes');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // ignore
  }
  return [];
}

// Persist shared quizzes to localStorage
function persistSharedQuizzes(quizzes: SharedQuiz[]): void {
  try {
    localStorage.setItem('shared-quizzes', JSON.stringify(quizzes));
  } catch {
    // ignore storage errors
  }
}

export function useSharedQuizzes(): UseSharedQuizzesResult {
  const [state, setState] = useState<State>(() => ({
    sharedQuizzes: loadSharedQuizzes(),
    loading: false,
    error: null,
  }));

  useEffect(() => {
    persistSharedQuizzes(state.sharedQuizzes);
  }, [state.sharedQuizzes]);

  const shareQuiz = useCallback((quiz: LocalQuiz, authorName: string, tags: string[] = []) => {
    const sharedQuiz: SharedQuiz = {
      id: uuidv4(),
      originalQuizId: quiz.id,
      title: quiz.title,
      authorName,
      publishedAt: new Date().toISOString(),
      tags,
      comments: [],
      ratings: [],
      averageRating: 0,
      totalRatings: 0,
      isReported: false,
      questionCount: quiz.questions.length,
    };

    setState(prev => ({
      ...prev,
      sharedQuizzes: [sharedQuiz, ...prev.sharedQuizzes],
    }));
  }, []);

  const addComment = useCallback((quizId: string, authorName: string, text: string) => {
    const comment: SharedQuizComment = {
      id: uuidv4(),
      authorName,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      sharedQuizzes: prev.sharedQuizzes.map(quiz =>
        quiz.id === quizId
          ? { ...quiz, comments: [comment, ...quiz.comments] }
          : quiz
      ),
    }));
  }, []);

  const addRating = useCallback((quizId: string, userId: string, rating: number) => {
    setState(prev => ({
      ...prev,
      sharedQuizzes: prev.sharedQuizzes.map(quiz => {
        if (quiz.id !== quizId) return quiz;

        // Remove existing rating from same user
        const filteredRatings = quiz.ratings.filter(r => r.userId !== userId);
        const newRating: SharedQuizRating = {
          userId,
          rating: Math.max(1, Math.min(5, rating)), // Clamp to 1-5
          createdAt: new Date().toISOString(),
        };
        const updatedRatings = [...filteredRatings, newRating];
        
        const averageRating = updatedRatings.length > 0
          ? updatedRatings.reduce((sum, r) => sum + r.rating, 0) / updatedRatings.length
          : 0;

        return {
          ...quiz,
          ratings: updatedRatings,
          averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
          totalRatings: updatedRatings.length,
        };
      }),
    }));
  }, []);

  const reportQuiz = useCallback((quizId: string) => {
    setState(prev => ({
      ...prev,
      sharedQuizzes: prev.sharedQuizzes.map(quiz =>
        quiz.id === quizId ? { ...quiz, isReported: true } : quiz
      ),
    }));
  }, []);

  const searchQuizzes = useCallback((query: string): SharedQuiz[] => {
    if (!query.trim()) return state.sharedQuizzes;
    
    const lowercaseQuery = query.toLowerCase();
    return state.sharedQuizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(lowercaseQuery) ||
      quiz.authorName.toLowerCase().includes(lowercaseQuery) ||
      quiz.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }, [state.sharedQuizzes]);

  const filterByTags = useCallback((tags: string[]): SharedQuiz[] => {
    if (tags.length === 0) return state.sharedQuizzes;
    
    return state.sharedQuizzes.filter(quiz =>
      tags.some(tag => quiz.tags.includes(tag))
    );
  }, [state.sharedQuizzes]);

  return {
    ...state,
    shareQuiz,
    addComment,
    addRating,
    reportQuiz,
    searchQuizzes,
    filterByTags,
  };
}