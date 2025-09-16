import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AIQuizDraft } from './useAIQuizGeneration';

export interface LocalQuestion { id: string; text: string }
export interface LocalQuiz { id: string; title: string; questions: LocalQuestion[]; createdAt: string; local: true; isAIDraft?: boolean; aiMetadata?: { topic: string; sources: string[]; originalGeneratedAt: string } }

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

export function validateQuiz(title: string, question: string): string[] {
  const e: string[] = [];
  if (!title.trim()) e.push('Titel krävs');
  if (title.length > 120) e.push('Titel får max vara 120 tecken');
  if (!question.trim()) e.push('Minst en fråga krävs');
  return e;
}

export interface UseLocalQuizResult {
  localQuizzes: LocalQuiz[];
  addQuiz: (title: string, question: string) => { quiz?: LocalQuiz; error?: string };
  addAIDraft: (draft: AIQuizDraft) => { quiz?: LocalQuiz; error?: string };
  acceptAIDraft: (draft: AIQuizDraft) => { quiz?: LocalQuiz; error?: string };
  discardAIDraft: (draftId: string) => void;
  merged: (remote: { id: string; title: string; updatedAt: string }[]) => { id: string; title: string; updatedAt: string; _local?: boolean; _aiDraft?: boolean }[];
}

let FORCE_QUOTA_ERROR = false;
export function __forceQuotaError(v: boolean) { FORCE_QUOTA_ERROR = v; }

export function useLocalQuizzes(): UseLocalQuizResult {
  const [localQuizzes, setLocalQuizzes] = useState<LocalQuiz[]>(() => loadLocal());

  useEffect(() => {
    try { persistLocal(localQuizzes); } catch { /* swallow, handled on add */ }
  }, [localQuizzes]);

  const addQuiz = useCallback((title: string, question: string) => {
    const quiz: LocalQuiz = {
      id: uuidv4(),
      title: title.trim(),
      questions: [{ id: uuidv4(), text: question.trim() }],
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
      // Still keep in memory for this session
      setLocalQuizzes(qs => [quiz, ...qs]);
    }
    return quotaError ? { quiz, error: quotaError } : { quiz };
  }, [localQuizzes]);

  const addAIDraft = useCallback((draft: AIQuizDraft) => {
    const quiz: LocalQuiz = {
      id: draft.id,
      title: draft.title,
      questions: draft.questions.map(q => ({ id: q.id, text: q.text })),
      createdAt: draft.generatedAt,
      local: true,
      isAIDraft: true,
      aiMetadata: {
        topic: draft.topic,
        sources: draft.sources,
        originalGeneratedAt: draft.generatedAt
      }
    };
    
    let quotaError: string | undefined;
    try {
      const next = [quiz, ...localQuizzes];
      if (FORCE_QUOTA_ERROR) throw new Error('ForcedQuota');
      persistLocal(next);
      setLocalQuizzes(next);
    } catch {
      quotaError = 'Kunde inte spara AI-utkast lokalt';
      setLocalQuizzes(qs => [quiz, ...qs]);
    }
    return quotaError ? { quiz, error: quotaError } : { quiz };
  }, [localQuizzes]);

  const acceptAIDraft = useCallback((draft: AIQuizDraft) => {
    const acceptedQuiz: LocalQuiz = {
      id: uuidv4(), // New ID for the accepted quiz
      title: draft.title.replace('AI-utkast: ', ''), // Remove AI prefix
      questions: draft.questions.map(q => ({ id: q.id, text: q.text })),
      createdAt: new Date().toISOString(),
      local: true,
      isAIDraft: false // No longer a draft
    };

    let quotaError: string | undefined;
    try {
      // Remove the original draft and add the accepted quiz
      const withoutDraft = localQuizzes.filter(q => q.id !== draft.id);
      const next = [acceptedQuiz, ...withoutDraft];
      if (FORCE_QUOTA_ERROR) throw new Error('ForcedQuota');
      persistLocal(next);
      setLocalQuizzes(next);
    } catch {
      quotaError = 'Kunde inte spara godkänt quiz lokalt';
      setLocalQuizzes(qs => [acceptedQuiz, ...qs.filter(q => q.id !== draft.id)]);
    }
    return quotaError ? { quiz: acceptedQuiz, error: quotaError } : { quiz: acceptedQuiz };
  }, [localQuizzes]);

  const discardAIDraft = useCallback((draftId: string) => {
    const next = localQuizzes.filter(q => q.id !== draftId);
    try {
      persistLocal(next);
      setLocalQuizzes(next);
    } catch {
      // Still remove from memory even if persistence fails
      setLocalQuizzes(next);
    }
  }, [localQuizzes]);

  const merged = useCallback((remote: { id: string; title: string; updatedAt: string }[]) => {
    return [
      ...localQuizzes.map(l => ({ 
        id: l.id, 
        title: l.title + (l.isAIDraft ? ' (AI-utkast)' : ' (lokal)'), 
        updatedAt: l.createdAt, 
        _local: true,
        _aiDraft: l.isAIDraft
      })),
      ...remote
    ].sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
  }, [localQuizzes]);

  return { 
    localQuizzes, 
    addQuiz, 
    addAIDraft,
    acceptAIDraft,
    discardAIDraft,
    merged 
  };
}
