import React from 'react';
import { useQuizzes } from '../hooks/useQuizzes';
import { Card } from '../components/Card';

export const StudentDashboard: React.FC = () => {
  const { quizzes, loading, error, lastSynced, offline } = useQuizzes();
  
  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Student Dashboard</h2>
        <p className="text-muted">Här visas elevens quiz och status.</p>
      </div>
      
      <div className="student-dashboard">
        <div className="card">
          <div className="card__header">
            <h3 className="card__title">
              Mina Quiz
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
          
          {!loading && !error && (
            <div className="quiz-list">
              {quizzes.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📚</div>
                  <h4>Inga quiz tillgängliga</h4>
                  <p className="text-muted">Be din lärare att skapa quiz för dig.</p>
                </div>
              ) : (
                quizzes.map(q => (
                  <Card
                    key={q.id}
                    title={q.title}
                    className="quiz-card"
                  >
                    <div className="quiz-card__actions">
                      <button className="btn btn--primary btn--sm">
                        Starta Quiz
                      </button>
                      <button className="btn btn--ghost btn--sm">
                        Se resultat
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
          
          <div className="sync-status">
            <span className="text-sm text-muted">
              Senast synkad: {lastSynced ? lastSynced.toLocaleTimeString() : '–'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
