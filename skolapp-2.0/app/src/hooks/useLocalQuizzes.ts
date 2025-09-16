import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type QuestionType = 'mcq' | 'true-false' | 'short-text';

export interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface LocalQuestion { 
  id: string; 
  text: string;
  type: QuestionType;
  timeLimit?: number; // in seconds
  options?: AnswerOption[]; // for MCQ and true/false
  correctAnswer?: string; // for short-text questions
}

export interface LocalQuiz { 
  id: string; 
  title: string; 
  questions: LocalQuestion[]; 
  createdAt: string; 
  local: true;
  description?: string;
}

function loadLocal(): LocalQuiz[] {
  try {
    const raw = localStorage.getItem('quizzes-local');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return [];
}

function persistLocal(arr: LocalQuiz[]) {
  localStorage.setItem('quizzes-local', JSON.stringify(arr));
}

export function validateQuiz(title: string, questions: LocalQuestion[]): string[] {
  const e: string[] = [];
  if (!title.trim()) e.push('Titel krävs');
  if (title.length > 120) e.push('Titel får max vara 120 tecken');
  if (!questions.length) e.push('Minst en fråga krävs');
  
  questions.forEach((question, index) => {
    if (!question.text.trim()) {
      e.push(`Fråga ${index + 1}: Text krävs`);
    }
    
    if (question.type === 'mcq') {
      if (!question.options || question.options.length < 2) {
        e.push(`Fråga ${index + 1}: MCQ måste ha minst 2 svarsalternativ`);
      } else if (!question.options.some(opt => opt.isCorrect)) {
        e.push(`Fråga ${index + 1}: MCQ måste ha ett korrekt svar`);
      }
    }
    
    if (question.type === 'true-false') {
      if (!question.options || question.options.length !== 2) {
        e.push(`Fråga ${index + 1}: Sant/falskt måste ha exakt 2 alternativ`);
      } else if (!question.options.some(opt => opt.isCorrect)) {
        e.push(`Fråga ${index + 1}: Sant/falskt måste ha ett korrekt svar`);
      }
    }
    
    if (question.type === 'short-text') {
      if (!question.correctAnswer?.trim()) {
        e.push(`Fråga ${index + 1}: Kort text måste ha ett korrekt svar`);
      }
    }
    
    if (question.timeLimit && (question.timeLimit < 5 || question.timeLimit > 300)) {
      e.push(`Fråga ${index + 1}: Tidsgräns måste vara mellan 5-300 sekunder`);
    }
  });
  
  return e;
}

// Legacy validation for backward compatibility
export function validateQuizLegacy(title: string, question: string): string[] {
  const e: string[] = [];
  if (!title.trim()) e.push('Titel krävs');
  if (title.length > 120) e.push('Titel får max vara 120 tecken');
  if (!question.trim()) e.push('Minst en fråga krävs');
  return e;
}

export interface UseLocalQuizResult {
  localQuizzes: LocalQuiz[];
  addQuiz: (title: string, question: string) => { quiz?: LocalQuiz; error?: string }; // legacy
  createQuiz: (title: string, questions: LocalQuestion[], description?: string) => { quiz?: LocalQuiz; error?: string };
  merged: (remote: { id: string; title: string; updatedAt: string }[]) => { id: string; title: string; updatedAt: string; _local?: boolean }[];
}

let FORCE_QUOTA_ERROR = false;
export function __forceQuotaError(v: boolean) { FORCE_QUOTA_ERROR = v; }

export function useLocalQuizzes(): UseLocalQuizResult {
  const [localQuizzes, setLocalQuizzes] = useState<LocalQuiz[]>(() => loadLocal());

  useEffect(() => {
    try { persistLocal(localQuizzes); } catch { /* swallow, handled on add */ }
  }, [localQuizzes]);

  const addQuiz = useCallback((title: string, question: string) => {
    // Legacy method - converts simple question to new format
    const legacyQuestion: LocalQuestion = {
      id: uuidv4(),
      text: question.trim(),
      type: 'short-text',
      correctAnswer: '' // Will need to be filled manually
    };
    
    const quiz: LocalQuiz = {
      id: uuidv4(),
      title: title.trim(),
      questions: [legacyQuestion],
      createdAt: new Date().toISOString(),
      local: true
    };
    
    let quotaError: string | undefined;
    try {
      const next = [quiz, ...localQuizzes];
      if (FORCE_QUOTA_ERROR) throw new Error('ForcedQuota');
      persistLocal(next);
      setLocalQuizzes(next);
    } catch {
      quotaError = 'Kunde inte spara lokalt';
      setLocalQuizzes(qs => [quiz, ...qs]);
    }
    return quotaError ? { quiz, error: quotaError } : { quiz };
  }, [localQuizzes]);

  const createQuiz = useCallback((title: string, questions: LocalQuestion[], description?: string) => {
    const quiz: LocalQuiz = {
      id: uuidv4(),
      title: title.trim(),
      description: description?.trim(),
      questions,
      createdAt: new Date().toISOString(),
      local: true
    };
    
    let quotaError: string | undefined;
    try {
      const next = [quiz, ...localQuizzes];
      if (FORCE_QUOTA_ERROR) throw new Error('ForcedQuota');
      persistLocal(next);
      setLocalQuizzes(next);
    } catch {
      quotaError = 'Kunde inte spara lokalt';
      setLocalQuizzes(qs => [quiz, ...qs]);
    }
    return quotaError ? { quiz, error: quotaError } : { quiz };
  }, [localQuizzes]);

  const merged = useCallback((remote: { id: string; title: string; updatedAt: string }[]) => {
    return [
      ...localQuizzes.map(l => ({ id: l.id, title: l.title + ' (lokal)', updatedAt: l.createdAt, _local: true })),
      ...remote
    ].sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
  }, [localQuizzes]);

  return { localQuizzes, addQuiz, createQuiz, merged };
}
