import { useEffect, useState } from 'react';

export interface QuizSummary {
  id: string;
  title: string;
  updatedAt: string;
}

interface State {
  quizzes: QuizSummary[];
  loading: boolean;
  error: string | null;
  lastSynced: Date | null;
  offline: boolean;
}

export function useQuizzes(): State {
  const [state, setState] = useState<State>({
    quizzes: [],
    loading: true,
    error: null,
    lastSynced: null,
    offline: false
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/quizzes.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data: QuizSummary[] = await res.json();
        if (cancelled) return;
        setState(s => ({ ...s, quizzes: data, loading: false, lastSynced: new Date(), error: null, offline: false }));
        localStorage.setItem('quizzes-cache', JSON.stringify({ data, ts: Date.now() }));
      } catch (e: any) {
        const cachedRaw = localStorage.getItem('quizzes-cache');
        if (cachedRaw) {
          try {
            const parsed = JSON.parse(cachedRaw);
            if (!cancelled) {
              setState(s => ({ ...s, quizzes: parsed.data, loading: false, lastSynced: new Date(parsed.ts), error: null, offline: true }));
            }
            return;
          } catch {}
        }
        if (!cancelled) setState(s => ({ ...s, loading: false, error: e.message || 'Failed to load quizzes', offline: true }));
      }
    }
    load();
    const id = setInterval(load, 60_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  return state;
}
