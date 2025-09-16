import React, { useMemo, useState } from 'react';
import { useQuizzes } from '../hooks/useQuizzes';
import { useLocalQuizzes, validateQuiz } from '../hooks/useLocalQuizzes';
import { useSharedQuizzes } from '../hooks/useSharedQuizzes';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const TeacherDashboard: React.FC = () => {
  const { quizzes, loading, error, lastSynced, offline } = useQuizzes();
  const { localQuizzes, addQuiz, merged } = useLocalQuizzes();
  const { shareQuiz } = useSharedQuizzes();
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [shareDialogQuiz, setShareDialogQuiz] = useState<{id: string; title: string} | null>(null);
  const [shareAuthor, setShareAuthor] = useState('');
  const [shareTags, setShareTags] = useState('');
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

  function handleShareQuiz(quiz: {id: string; title: string}) {
    setShareDialogQuiz(quiz);
    setShareAuthor('');
    setShareTags('');
  }

  function handleShareSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!shareDialogQuiz || !shareAuthor.trim()) return;

    const localQuiz = localQuizzes.find(q => q.id === shareDialogQuiz.id);
    if (!localQuiz) return;

    const tags = shareTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    shareQuiz(localQuiz, shareAuthor.trim(), tags);
    
    setShareDialogQuiz(null);
    setShareAuthor('');
    setShareTags('');
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
              {q._local && (
                <div style={{marginTop: '0.5rem'}}>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => handleShareQuiz({id: q.id, title: q.title})}
                  >
                    Dela till Community
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
        <small>Senast synkad: {lastSynced ? lastSynced.toLocaleTimeString() : '–'}</small>
      </div>

      {/* Share Quiz Dialog */}
      {shareDialogQuiz && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShareDialogQuiz(null)}
        >
          <div
            style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Dela quiz till Community</h3>
            <p>Dela "{shareDialogQuiz.title}" med andra lärare i community hub.</p>
            
            <form onSubmit={handleShareSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label>
                  Författarnamn *
                  <input
                    type="text"
                    value={shareAuthor}
                    onChange={(e) => setShareAuthor(e.target.value)}
                    placeholder="Ditt namn som kommer att visas"
                    required
                    maxLength={50}
                  />
                </label>
                
                <label>
                  Taggar (valfritt)
                  <input
                    type="text"
                    value={shareTags}
                    onChange={(e) => setShareTags(e.target.value)}
                    placeholder="Ex: matematik, åk7, geometri (separera med komma)"
                    maxLength={200}
                  />
                  <small style={{ color: 'var(--muted)' }}>
                    Taggar hjälper andra att hitta ditt quiz
                  </small>
                </label>
                
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShareDialogQuiz(null)}
                  >
                    Avbryt
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!shareAuthor.trim()}
                  >
                    Dela Quiz
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
