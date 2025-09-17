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
    <div className="container">
      <div className="dashboard-header">
        <h2>Teacher Dashboard</h2>
        <p className="text-muted">Skapa och hantera quiz.</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <div className="card">
            <div className="card__header">
              <h3 className="card__title">Skapa nytt quiz</h3>
              {!online && (
                <div className="status-badge status-badge--warning">
                  Offline-läge: sparas lokalt
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="quiz-form">
              <div className="form-group">
                <label htmlFor="quiz-title" className="form-label">
                  Titel <span className="required">*</span>
                </label>
                <input
                  id="quiz-title"
                  className="form-input"
                  aria-required="true"
                  value={title}
                  onChange={e => { setTitle(e.target.value); setTouched(true); }}
                  maxLength={140}
                  placeholder="Ex: Glosor vecka 40"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="quiz-question" className="form-label">
                  Första fråga <span className="required">*</span>
                </label>
                <input
                  id="quiz-question"
                  className="form-input"
                  aria-required="true"
                  value={question}
                  onChange={e => { setQuestion(e.target.value); setTouched(true); }}
                  placeholder="Ex: Vad betyder ...?"
                />
              </div>
              
              {(touched && currentErrors.length > 0) || errors.length > 0 ? (
                <div className="form-errors" aria-live="assertive">
                  {(errors.length ? errors : currentErrors).map(er => (
                    <div key={er} className="form-error">{er}</div>
                  ))}
                </div>
              ) : null}
              
              <Button
                type="submit"
                variant="primary"
                loading={saving}
                disabled={currentErrors.length > 0}
                className="btn--lg"
              >
                {saving ? 'Sparar…' : 'Skapa'}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="dashboard-sidebar">
          <div className="card">
            <div className="card__header">
              <h3 className="card__title">
                Quiz-lista
                {offline && (
                  <span className="status-badge status-badge--warning">offline</span>
                )}
              </h3>
            </div>
            
            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <span>Laddar...</span>
              </div>
            )}
            
            {error && (
              <div className="error-state">
                <span className="error-icon">⚠️</span>
                <span>Fel: {error}</span>
              </div>
            )}
            
            <div className="quiz-list">
              {merged(quizzes).map(q => (
                <Card
                  key={q.id}
                  density="compact"
                  title={q.title}
                  badge={q._local ? 'Lokal' : undefined}
                  meta={q._local ? 'Ej synkad' : undefined}
                  className="quiz-card"
                >
                  {q._local && (
                    <span className="text-sm text-muted">
                      Skapad lokalt {new Date((q as any).createdAt || q.updatedAt || Date.now()).toLocaleTimeString()}
                    </span>
                  )}
                </Card>
              ))}
            </div>
            
            <div className="sync-status">
              <span className="text-sm text-muted">
                Senast synkad: {lastSynced ? lastSynced.toLocaleTimeString() : '–'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
