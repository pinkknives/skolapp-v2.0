import React, { useMemo, useState } from 'react';
import { useQuizzes } from '../hooks/useQuizzes';
import { useLocalQuizzes, validateQuiz } from '../hooks/useLocalQuizzes';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const TeacherDashboard: React.FC = () => {
  const { quizzes, loading, error, lastSynced, offline } = useQuizzes();
  const { localQuizzes, addQuiz, merged } = useLocalQuizzes();
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const online = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const currentErrors = validateQuiz(title, question);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return; // R6 guard
    const v = currentErrors;
    setTouched(true);
    setErrors(v);
    if (v.length) return; // R5
    setSaving(true);
    const { error: quotaError } = addQuiz(title, question); // R2 optimistisk
    setTitle('');
    setQuestion('');
    setErrors(quotaError ? [quotaError] : []);
    setTouched(false);
    setSaving(false);
  }

  return (
    <section>
      <h2>Teacher Dashboard</h2>
      <p>Skapa och hantera quiz.</p>
      <form onSubmit={handleSubmit} aria-labelledby="create-quiz-h" style={{marginBottom: '1rem', border:'1px solid var(--border)', padding:'1rem', borderRadius:4}}>
        <h3 id="create-quiz-h">Skapa nytt quiz</h3>
        {!online && <div style={{color:'orange'}}>Offline-läge: sparas lokalt (R4)</div>}
        <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
          <label>
            Titel
            <input
              aria-required="true"
              value={title}
              onChange={e => { setTitle(e.target.value); setTouched(true); }}
              maxLength={140}
              placeholder="Ex: Glosor vecka 40"
            />
          </label>
          <label>
            Första fråga
            <input
              aria-required="true"
              value={question}
              onChange={e => { setQuestion(e.target.value); setTouched(true); }}
              placeholder="Ex: Vad betyder ...?"
            />
          </label>
          {(touched && currentErrors.length > 0) || errors.length > 0 ? (
            <ul aria-live="assertive" style={{color:'red', margin:0, paddingLeft:'1.2rem'}}>
              {(errors.length ? errors : currentErrors).map(er => <li key={er}>{er}</li>)}
            </ul>
          ) : null}
          <Button
            type="submit"
            variant="primary"
            loading={saving}
            disabled={currentErrors.length > 0}
          >
            {saving ? 'Sparar…' : 'Skapa'}
          </Button>
        </div>
      </form>
      <div>
        <h3>Quiz-lista {offline && <span style={{color: 'orange'}}>(offline)</span>}</h3>
        {loading && <p>Laddar...</p>}
        {error && <p style={{color: 'red'}}>Fel: {error}</p>}
        <div style={{display:'grid', gap:'0.75rem'}}>
          {merged(quizzes).map(q => (
            <Card
              key={q.id}
              density="compact"
              title={q.title}
              badge={q._local ? 'Lokal' : undefined}
              meta={q._local ? 'Ej synkad' : undefined}
            >
              {q._local && (
                <span style={{fontSize:'.7rem', opacity:.8}}>
                  Skapad lokalt {new Date((q as any).createdAt || q.updatedAt || Date.now()).toLocaleTimeString()}
                </span>
              )}
            </Card>
          ))}
        </div>
        <small>Senast synkad: {lastSynced ? lastSynced.toLocaleTimeString() : '–'}</small>
      </div>
    </section>
  );
};
