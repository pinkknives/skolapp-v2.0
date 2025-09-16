import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizzes } from '../hooks/useQuizzes';
import { Button } from '../components/Button';

export const StudentDashboard: React.FC = () => {
  const { quizzes, loading, error, lastSynced, offline } = useQuizzes();
  const navigate = useNavigate();
  const [quizCode, setQuizCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [joining, setJoining] = useState(false);

  const handleJoinQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quizCode.trim()) {
      setJoinError('Quizkod krävs');
      return;
    }
    
    if (quizCode.length !== 6) {
      setJoinError('Quizkod måste vara 6 tecken');
      return;
    }
    
    setJoining(true);
    setJoinError('');
    
    try {
      // Mock API call for quiz code validation using static file
      const response = await fetch('/quiz-codes.json');
      
      if (!response.ok) {
        throw new Error('Kunde inte validera quizkod');
      }
      
      const quizCodes = await response.json();
      const quizData = quizCodes[quizCode];
      
      if (!quizData) {
        throw new Error('Ogiltig quizkod');
      }
      
      if (quizData.status === 'closed') {
        throw new Error('Quiz är stängt');
      }
      
      // Success - redirect to quiz start
      console.log('Joining quiz:', quizData);
      setQuizCode('');
      navigate(`/quiz/${quizData.id}`);
      
    } catch (err: any) {
      setJoinError(err.message || 'Ett fel uppstod');
    } finally {
      setJoining(false);
    }
  };

  return (
    <section>
      <h2>Student Dashboard</h2>
      <p>Här visas elevens quiz och status.</p>
      
      {/* Quiz Join Section */}
      <div style={{marginBottom: '2rem', border:'1px solid var(--border)', padding:'1rem', borderRadius:4}}>
        <h3>Anslut till quiz</h3>
        <form onSubmit={handleJoinQuiz} style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
          <label>
            Quizkod (6 tecken)
            <input
              type="text"
              value={quizCode}
              onChange={(e) => {
                const value = e.target.value.toUpperCase().slice(0, 6);
                setQuizCode(value);
                if (joinError) setJoinError('');
              }}
              placeholder="ABC123"
              maxLength={6}
              pattern="[A-Z0-9]{6}"
              style={{textTransform: 'uppercase'}}
              disabled={joining}
            />
          </label>
          {joinError && (
            <div style={{color: 'red', fontSize: '0.9rem'}} role="alert">
              {joinError}
            </div>
          )}
          <Button 
            type="submit" 
            disabled={!quizCode || quizCode.length !== 6 || joining}
            loading={joining}
          >
            {joining ? 'Ansluter...' : 'Anslut till quiz'}
          </Button>
        </form>
      </div>

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
