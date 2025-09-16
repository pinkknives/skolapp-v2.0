import React, { useState } from 'react';
import { useAuth } from '../auth/auth-context';
import { Button } from '../components/Button';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Vänligen fyll i alla fält');
      return;
    }

    try {
      await login({ email, password });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Inloggning misslyckades');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Logga in som lärare</h2>
      
      {error && <div className="error-message" role="alert">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="email">E-postadress</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="email"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Lösenord</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="current-password"
        />
      </div>
      
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Loggar in...' : 'Logga in'}
      </Button>
      
      {onSwitchToRegister && (
        <p>
          Har du inget konto?{' '}
          <button 
            type="button" 
            className="link-button" 
            onClick={onSwitchToRegister}
            disabled={isLoading}
          >
            Registrera dig här
          </button>
        </p>
      )}
    </form>
  );
};