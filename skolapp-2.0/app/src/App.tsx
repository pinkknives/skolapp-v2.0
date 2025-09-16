import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { RoleProvider, useRole } from './auth/role-context';
import { AuthProvider, useAuth } from './auth/auth-context';
import { ThemeProvider, useTheme } from './theme/theme-context';
import { Home } from './routes/Home';
import { AuthPage } from './routes/AuthPage';
import { TeacherDashboard } from './routes/TeacherDashboard';
import { StudentDashboard } from './routes/StudentDashboard';

// App (test-friendly) expects to be rendered inside a Router + RoleProvider.
export const App: React.FC = () => <Shell />;

// RootApp used by production entrypoint: wraps providers + router.
export const RootApp: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <RoleProvider>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </RoleProvider>
    </AuthProvider>
  </ThemeProvider>
);

const ProtectedRoute: React.FC<{ allow: ('teacher' | 'student')[]; children: React.ReactNode }> = ({ allow, children }) => {
  const { user } = useAuth();
  const { role } = useRole();
  
  // Check if user is authenticated and has correct role
  if (user?.isAuthenticated && allow.includes(user.role as any)) {
    return <>{children}</>;
  }
  
  // Fallback to role-based access for backward compatibility
  if (!user?.isAuthenticated && allow.includes(role as any)) {
    return <>{children}</>;
  }
  
  return <p>Åtkomst nekad. Vänligen logga in.</p>;
};

const Shell: React.FC = () => {
  const { user, logout } = useAuth();
  const { role, setRole } = useRole();
  const { theme, toggle } = useTheme();
  
  const handleLogout = () => {
    logout();
    setRole('guest');
  };

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">Hoppa till innehåll</a>
      <header>
        <h1>Skolapp</h1>
        <nav aria-label="Huvudnavigation" style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/">Hem</Link>
          <Link to="/auth">Logga in</Link>
          <Link to="/teacher">Teacher</Link>
          <Link to="/student">Student</Link>
          
          <span style={{ marginLeft: 'auto' }}>
            {user?.isAuthenticated ? (
              <>
                {user.name && <span>Välkommen, {user.name}!</span>}
                <span>Roll: {user.role}</span>
                <button onClick={handleLogout}>Logga ut</button>
              </>
            ) : (
              <>
                <span>Roll: {role}</span>
                <button onClick={() => setRole('guest')}>Guest</button>
                <button onClick={() => setRole('teacher')}>Teacher</button>
                <button onClick={() => setRole('student')}>Student</button>
              </>
            )}
          </span>
          
          <button onClick={toggle} aria-label="Byt tema">Tema: {theme === 'light' ? '🌞' : '🌙'}</button>
        </nav>
      </header>
      <OfflineBanner />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/teacher" element={<ProtectedRoute allow={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute allow={['student']}><StudentDashboard /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
};

// Simple offline banner using navigator.onLine and event listeners.
const OfflineBanner: React.FC = () => {
  const [offline, setOffline] = React.useState(!navigator.onLine);
  React.useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); };
  }, []);
  if (!offline) return null;
  return (
    <div role="status" aria-live="polite" style={{ background:'#f59e0b', color:'#000', padding:'0.5rem', fontSize:'0.9rem' }}>
      Offline-läge: visar cachelagrat innehåll
    </div>
  );
};
