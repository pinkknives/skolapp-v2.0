import React, { useState } from 'react';
import { useAuth } from '../auth/auth-context';
import { Button } from '../components/Button';

interface StudentAccessFormProps {
  onSuccess?: () => void;
}

export const StudentAccessForm: React.FC<StudentAccessFormProps> = ({ onSuccess }) => {
  const { loginStudent, isLoading } = useAuth();
  const [classCode, setClassCode] = useState('');
  const [pseudonym, setPseudonym] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!classCode) {
      setError('Vänligen ange klasskoden');
      return;
    }

    if (classCode.length < 4) {
      setError('Klasskoden måste vara minst 4 tecken lång');
      return;
    }

    try {
      await loginStudent({ classCode, pseudonym: pseudonym || undefined });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kunde inte ansluta till klassen');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Anslut som elev</h2>
      <p>Ange klasskoden som du fått av din lärare för att komma åt klassens aktiviteter.</p>
      
      {error && <div className="error-message" role="alert">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="classCode">Klasskod</label>
        <input
          id="classCode"
          type="text"
          value={classCode}
          onChange={(e) => setClassCode(e.target.value.toUpperCase())}
          required
          disabled={isLoading}
          placeholder="t.ex. ABC123"
          maxLength={10}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="pseudonym">Smeknamn (valfritt)</label>
        <input
          id="pseudonym"
          type="text"
          value={pseudonym}
          onChange={(e) => setPseudonym(e.target.value)}
          disabled={isLoading}
          placeholder="Ditt namn eller smeknamn"
          maxLength={30}
        />
        <small>Detta namn visas endast för dig och din lärare</small>
      </div>
      
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Ansluter...' : 'Anslut till klass'}
      </Button>
      
      <p className="privacy-note">
        <small>
          Som elev behöver du inte skapa något konto. Din aktivitet sparas anonymt 
          och kan bara kopplas till dig via den kod din lärare ger dig.
        </small>
      </p>
    </form>
  );
};