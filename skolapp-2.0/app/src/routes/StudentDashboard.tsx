import React from 'react';
import { useQuizzes } from '../hooks/useQuizzes';

export const StudentDashboard: React.FC = () => {
  const { quizzes, loading, error, lastSynced, offline } = useQuizzes();
  return (
    <section>
      <h2>Student Dashboard</h2>
      <p>Här visas elevens quiz och status.</p>
      <div>
        <h3>Mina Quiz {offline && <span style={{color: 'orange'}}>(offline)</span>}</h3>
        {loading && <p>Laddar...</p>}
        {error && <p style={{color: 'red'}}>Fel: {error}</p>}
        <ul>
          {quizzes.map(q => (
            <li key={q.id}>{q.title}</li>
          ))}
        </ul>
        <small>Senast synkad: {lastSynced ? lastSynced.toLocaleTimeString() : '–'}</small>
      </div>
    </section>
  );
};
