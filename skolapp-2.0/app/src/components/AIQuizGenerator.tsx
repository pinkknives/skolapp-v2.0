import React, { useState } from 'react';
import { Button } from './Button';
import { useAIQuizGeneration, AIQuizDraft } from '../hooks/useAIQuizGeneration';

interface AIQuizGeneratorProps {
  onDraftGenerated: (draft: AIQuizDraft) => void;
}

export const AIQuizGenerator: React.FC<AIQuizGeneratorProps> = ({ onDraftGenerated }) => {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const { generateQuiz, loading, error } = useAIQuizGeneration();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const draft = await generateQuiz({ topic: topic.trim(), questionCount });
      onDraftGenerated(draft);
      setTopic(''); // Clear form on success
    } catch (err) {
      // Error is handled by the hook
    }
  };

  const isFormValid = topic.trim().length >= 3;

  return (
    <form 
      onSubmit={handleGenerate} 
      aria-labelledby="ai-generator-h" 
      style={{
        marginBottom: '1rem', 
        border: '1px solid var(--border)', 
        padding: '1rem', 
        borderRadius: 4,
        backgroundColor: 'var(--surface-variant, #f8f9fa)'
      }}
    >
      <h3 id="ai-generator-h">🤖 AI Quiz-generator</h3>
      <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 1rem 0'}}>
        Generera quizförslag baserat på säkra kunskapsbaser. 
        <strong> Allt innehåll markeras som AI-utkast</strong> tills du granskar och godkänner det.
      </p>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        <label>
          Ämne eller tema
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: Andra världskriget, Ekosystem, Algebra"
            maxLength={100}
            aria-required="true"
            aria-describedby={error ? "ai-error" : undefined}
            style={{
              borderColor: error?.code === 'INVALID_INPUT' ? 'var(--error-color, #dc3545)' : undefined
            }}
          />
        </label>

        <label>
          Antal frågor
          <select 
            value={questionCount} 
            onChange={(e) => setQuestionCount(Number(e.target.value))}
          >
            <option value={5}>5 frågor</option>
            <option value={8}>8 frågor</option>
            <option value={10}>10 frågor</option>
          </select>
        </label>

        {error && (
          <div 
            id="ai-error"
            aria-live="assertive" 
            style={{
              color: 'var(--error-color, #dc3545)', 
              fontSize: '0.9rem',
              padding: '0.5rem',
              backgroundColor: 'var(--error-bg, #fdf2f2)',
              border: '1px solid var(--error-color, #dc3545)',
              borderRadius: 4
            }}
          >
            <strong>Fel:</strong> {error.message}
          </div>
        )}

        <Button
          type="submit"
          variant="secondary"
          loading={loading}
          disabled={!isFormValid || loading}
          style={{
            backgroundColor: 'var(--ai-color, #6366f1)',
            color: 'white'
          }}
        >
          {loading ? 'Genererar utkast...' : '🚀 Generera utkast'}
        </Button>
      </div>

      {loading && (
        <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem'}}>
          🔍 Söker i säkra kunskapsbaser...
        </div>
      )}
    </form>
  );
};