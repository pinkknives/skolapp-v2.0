import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth-context';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { StudentAccessForm } from '../components/StudentAccessForm';
import { Button } from '../components/Button';

type AuthMode = 'choose' | 'teacher-login' | 'teacher-register' | 'student-access';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('choose');
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (user?.isAuthenticated) {
      if (user.role === 'teacher') {
        navigate('/teacher');
      } else if (user.role === 'student') {
        navigate('/student');
      }
    }
  }, [user, navigate]);

  const handleAuthSuccess = () => {
    // Navigation will happen automatically via useEffect above
  };

  if (mode === 'choose') {
    return (
      <section className="auth-page">
        <h2>Välj hur du vill logga in</h2>
        
        <div className="auth-options">
          <div className="auth-option">
            <h3>För lärare</h3>
            <p>Skapa och hantera klasser, quiz och se elevers resultat.</p>
            <div className="auth-buttons">
              <Button onClick={() => setMode('teacher-login')}>
                Logga in
              </Button>
              <Button variant="secondary" onClick={() => setMode('teacher-register')}>
                Skapa konto
              </Button>
            </div>
          </div>
          
          <div className="auth-option">
            <h3>För elever</h3>
            <p>Anslut till din klass med en kod från din lärare.</p>
            <Button onClick={() => setMode('student-access')}>
              Anslut med klasskod
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <button 
        className="back-button" 
        onClick={() => setMode('choose')}
        aria-label="Tillbaka till val av inloggning"
      >
        ← Tillbaka
      </button>
      
      {mode === 'teacher-login' && (
        <LoginForm 
          onSuccess={handleAuthSuccess}
          onSwitchToRegister={() => setMode('teacher-register')}
        />
      )}
      
      {mode === 'teacher-register' && (
        <RegisterForm 
          onSuccess={handleAuthSuccess}
          onSwitchToLogin={() => setMode('teacher-login')}
        />
      )}
      
      {mode === 'student-access' && (
        <StudentAccessForm onSuccess={handleAuthSuccess} />
      )}
    </section>
  );
};