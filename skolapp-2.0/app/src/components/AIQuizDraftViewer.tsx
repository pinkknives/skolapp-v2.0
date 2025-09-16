import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { AIQuizDraft, AIGeneratedQuestion } from '../hooks/useAIQuizGeneration';

interface AIQuizDraftViewerProps {
  draft: AIQuizDraft;
  onAccept: (draft: AIQuizDraft) => void;
  onDiscard: (draftId: string) => void;
}

export const AIQuizDraftViewer: React.FC<AIQuizDraftViewerProps> = ({ 
  draft, 
  onAccept, 
  onDiscard 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [editedQuestions, setEditedQuestions] = useState<AIGeneratedQuestion[]>(draft.questions);

  const handleQuestionEdit = (questionId: string, newText: string) => {
    setEditedQuestions(prev => 
      prev.map(q => q.id === questionId ? { ...q, text: newText } : q)
    );
  };

  const handleAccept = () => {
    const updatedDraft = {
      ...draft,
      questions: editedQuestions
    };
    onAccept(updatedDraft);
  };

  return (
    <Card
      density="comfortable"
      title={draft.title}
      badge="AI-UTKAST"
      meta={`${draft.questions.length} frågor • Genererat ${new Date(draft.generatedAt).toLocaleString()}`}
      style={{
        border: '2px solid var(--ai-border, #6366f1)',
        backgroundColor: 'var(--ai-bg, #f8faff)'
      }}
    >
      <div style={{marginTop: '0.75rem'}}>
        <div style={{
          backgroundColor: 'var(--warning-bg, #fff3cd)',
          border: '1px solid var(--warning-border, #ffc107)',
          padding: '0.75rem',
          borderRadius: 4,
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          <strong>⚠️ AI-genererat innehåll</strong><br/>
          Detta innehåll är genererat av AI och behöver granskas av dig innan publicering. 
          Kontrollera att frågorna är korrekta och relevanta för din undervisning.
        </div>

        <div style={{marginBottom: '1rem'}}>
          <strong>Ämne:</strong> {draft.topic}<br/>
          <strong>Källor:</strong> {draft.sources.join(', ')}
        </div>

        <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1rem'}}>
          <Button
            variant="secondary"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? '🔽 Dölj frågor' : '▶️ Visa frågor'} ({draft.questions.length})
          </Button>
          <Button
            variant="primary"
            onClick={handleAccept}
          >
            ✅ Godkänn och spara
          </Button>
          <Button
            variant="destructive"
            onClick={() => onDiscard(draft.id)}
          >
            🗑️ Kassera
          </Button>
        </div>

        {expanded && (
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 4,
            padding: '1rem',
            backgroundColor: 'white'
          }}>
            <h4 style={{margin: '0 0 1rem 0'}}>Frågor (redigerbara)</h4>
            {editedQuestions.map((question, index) => (
              <div key={question.id} style={{
                marginBottom: '1rem',
                padding: '0.75rem',
                border: '1px solid var(--border-light)',
                borderRadius: 4,
                backgroundColor: 'var(--surface-variant, #f8f9fa)'
              }}>
                <label style={{display: 'block', marginBottom: '0.5rem'}}>
                  <strong>Fråga {index + 1}:</strong>
                  <textarea
                    value={question.text}
                    onChange={(e) => handleQuestionEdit(question.id, e.target.value)}
                    rows={2}
                    style={{
                      width: '100%',
                      marginTop: '0.25rem',
                      minHeight: '60px',
                      resize: 'vertical'
                    }}
                  />
                </label>
                <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>
                  <strong>Rätt svar:</strong> {question.correctAnswer}<br/>
                  <strong>Källa:</strong> {question.source}
                </div>
              </div>
            ))}
            
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: 'var(--info-bg, #e3f2fd)',
              border: '1px solid var(--info-border, #2196f3)',
              borderRadius: 4,
              fontSize: '0.9rem'
            }}>
              💡 <strong>Tips:</strong> Du kan redigera frågorna innan du godkänner. 
              Efter godkännande blir detta ett vanligt quiz som du kan hantera som vanligt.
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};