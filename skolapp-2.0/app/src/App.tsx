import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { RoleProvider, useRole } from './auth/role-context';
import { ThemeProvider, useTheme } from './theme/theme-context';
import { LanguageProvider } from './i18n/lang-context';
import { NavBar } from './components/layout/NavBar';
import { Footer } from './components/layout/Footer';
import { ConsentBanner } from './components/layout/ConsentBanner';
import { Home } from './routes/Home';
import { TeacherDashboard } from './routes/TeacherDashboard';
import { StudentDashboard } from './routes/StudentDashboard';
import { ConfirmNewsletter } from './routes/ConfirmNewsletter';

// App (test-friendly) expects to be rendered inside a Router + RoleProvider.
export const App: React.FC = () => <Shell />;

// RootApp used by production entrypoint: wraps providers + router.
export const RootApp: React.FC = () => (
  <ThemeProvider>
    <LanguageProvider>
      <RoleProvider>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </RoleProvider>
    </LanguageProvider>
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
  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">Hoppa till innehåll</a>
      <NavBar />
      <OfflineBanner />
      <main id="main" tabIndex={-1} className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacher" element={<ProtectedRoute allow={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
            <Route path="/student" element={<ProtectedRoute allow={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/confirm-newsletter" element={<ConfirmNewsletter />} />
          <Route path="/imprint" element={<Imprint />} />
        </Routes>
      </main>
      <Footer />
      <ConsentBanner />
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

const Imprint: React.FC = () => (
  <section className="prose prose-slate max-w-none">
    <h2>Impressum</h2>
    <p>Organisationsuppgifter och kontaktinformation. Uppdatera med verkliga uppgifter vid lansering.</p>
  </section>
);
