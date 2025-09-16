import React, { useState } from 'react';
import { useAuth } from '../auth/auth-context';
import { Button } from '../components/Button';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  const { register, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Vänligen fyll i alla fält');
      return false;
    }

    if (password.length < 6) {
      setError('Lösenordet måste vara minst 6 tecken långt');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Lösenorden matchar inte');
      return false;
    }

    if (!email.includes('@')) {
      setError('Vänligen ange en giltig e-postadress');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    try {
      await register({ name, email, password });
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registrering misslyckades');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Registrera lärarkonto</h2>
      
      {error && <div className="error-message" role="alert">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Namn</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="name"
        />
      </div>
      
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
          autoComplete="new-password"
          minLength={6}
        />
        <small>Minst 6 tecken</small>
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Bekräfta lösenord</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="new-password"
        />
      </div>
      
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Registrerar...' : 'Registrera konto'}
      </Button>
      
      {onSwitchToLogin && (
        <p>
          Har du redan ett konto?{' '}
          <button 
            type="button" 
            className="link-button" 
            onClick={onSwitchToLogin}
            disabled={isLoading}
          >
            Logga in här
          </button>
        </p>
      )}
    </form>
  );
};