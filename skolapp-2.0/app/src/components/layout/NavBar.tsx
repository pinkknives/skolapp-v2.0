import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../theme/theme-context';
import { useLang } from '../../i18n/lang-context';
import { Button } from '../Button';

export const NavBar: React.FC = () => {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useLang();
  const loc = useLocation();

  return (
    <div role="banner" className="sticky top-0 z-50 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/75 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-text font-semibold" aria-label="Skolapp Home">
          <span aria-hidden className="inline-block w-6 h-6 rounded bg-primary" />
          <span>Skolapp</span>
        </Link>
        <nav aria-label="Huvudnavigation" className="ml-4 flex items-center gap-3">
          <NavLink to="/" current={loc.pathname === '/'}>{t('home')}</NavLink>
          <NavLink to="/teacher" current={loc.pathname.startsWith('/teacher')}>{t('teacher')}</NavLink>
          <NavLink to="/student" current={loc.pathname.startsWith('/student')}>{t('student')}</NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <label className="sr-only" htmlFor="lang-select">{t('language')}</label>
          <select 
            id="lang-select" 
            className="input-base text-sm py-1 px-2 min-h-0" 
            aria-label={t('language')} 
            value={lang} 
            onChange={e => setLang(e.target.value as any)}
          >
            <option value="sv">SV</option>
            <option value="en">EN</option>
          </select>
          <Button 
            variant="icon" 
            onClick={toggle} 
            srLabel="Toggle theme"
            motionPreset="gentle"
          >
            {theme === 'light' ? '🌞' : '🌙'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const NavLink: React.FC<{ to: string; current?: boolean; children: React.ReactNode }> = ({ to, current, children }) => (
  <Link 
    to={to} 
    aria-current={current ? 'page' : undefined} 
    className={`px-2 py-1 rounded transition-colors duration-base ${
      current 
        ? 'text-primary font-medium' 
        : 'text-text/80 hover:text-primary'
    } sa-focus`}
  >
    {children}
  </Link>
);
