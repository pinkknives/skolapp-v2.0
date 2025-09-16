import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { RoleProvider, useRole } from './auth/role-context';
import { ThemeProvider, useTheme } from './theme/theme-context';
import { Home } from './routes/Home';
import { TeacherDashboard } from './routes/TeacherDashboard';
import { StudentDashboard } from './routes/StudentDashboard';

// App (test-friendly) expects to be rendered inside a Router + RoleProvider.
export const App: React.FC = () => <Shell />;

// RootApp used by production entrypoint: wraps providers + router.
export const RootApp: React.FC = () => (
  <ThemeProvider>
    <RoleProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </RoleProvider>
  </ThemeProvider>
);

const ProtectedRoute: React.FC<{ allow: ('teacher' | 'student')[]; children: React.ReactNode }> = ({ allow, children }) => {
  const { role } = useRole();
  if (!allow.includes(role as any)) {
    return <p>Access denied</p>;
  }
  return <>{children}</>;
};

const Shell: React.FC = () => {
  const { role, setRole } = useRole();
  const { theme, toggle } = useTheme();
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">Hoppa till innehåll</a>
      <header>
        <div className="header-content">
          <Link to="/" className="logo">Skolapp</Link>
          <nav className="main-nav" aria-label="Huvudnavigation">
            <Link to="/">Hem</Link>
            <Link to="/teacher">Lärare</Link>
            <Link to="/student">Elev</Link>
          </nav>
          <div className="nav-controls">
            <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>Roll: {role}</span>
            <button className="btn btn--ghost" onClick={() => setRole('guest')}>Guest</button>
            <button className="btn btn--ghost" onClick={() => setRole('teacher')}>Lärare</button>
            <button className="btn btn--ghost" onClick={() => setRole('student')}>Elev</button>
            <button className="btn btn--icon" onClick={toggle} aria-label="Byt tema">{theme === 'light' ? '🌞' : '🌙'}</button>
          </div>
        </div>
      </header>
      <OfflineBanner />
      <main id="main" tabIndex={-1} className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
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
