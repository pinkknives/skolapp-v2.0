import { useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface LocalQuestion { id: string; text: string }
export interface LocalQuiz { id: string; title: string; questions: LocalQuestion[]; createdAt: string; local: true }

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

  const merged = useCallback((remote: { id: string; title: string; updatedAt: string }[]) => {
    return [
      ...localQuizzes.map(l => ({ id: l.id, title: l.title + ' (lokal)', updatedAt: l.createdAt, _local: true })),
      ...remote
    ].sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
  }, [localQuizzes]);

  return { localQuizzes, addQuiz, merged };
}
