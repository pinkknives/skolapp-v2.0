import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const QuizStart: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  
  if (!quizId) {
    return <Navigate to="/student" replace />;
  }

  return (
    <section>
      <h2>Quiz Start</h2>
      <div style={{
        border: '1px solid var(--border)', 
        padding: '2rem', 
        borderRadius: 8, 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h3>Redo att starta?</h3>
        <p style={{marginBottom: '2rem', color: 'var(--text-secondary)'}}>
          Du är nu ansluten till quiz: <strong>{quizId}</strong>
        </p>
        
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
          <Button
            variant="primary"
            onClick={() => {
              // GDPR: Start of quiz participation - this is where we would begin logging student data
              console.log('Quiz started for quiz:', quizId);
              alert('Quiz startar! (Implementation kommer i nästa steg)');
            }}
          >
            Starta Quiz
          </Button>
          
          <Button 
            variant="secondary"
            onClick={() => window.history.back()}
          >
            Tillbaka
          </Button>
        </div>
        
        <p style={{
          marginTop: '1.5rem', 
          fontSize: '0.9rem', 
          color: 'var(--text-secondary)',
          fontStyle: 'italic'
        }}>
          GDPR: Ingen elevdata loggas innan du startar quizet.
        </p>
      </div>
    </section>
  );
};