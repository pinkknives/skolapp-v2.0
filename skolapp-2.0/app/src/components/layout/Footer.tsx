import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/lang-context';

export const Footer: React.FC = () => {
  const { t } = useLang();
  return (
    <footer role="contentinfo" className="mt-16 border-t border-[var(--sa-border)] bg-[var(--sa-surface)]">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 font-semibold text-[var(--sa-text)]">
            <span aria-hidden className="inline-block w-5 h-5 rounded bg-[var(--sa-primary)]" /> Skolapp
          </div>
          <p className="text-sm text-[var(--sa-muted)] mt-2">GDPR-ready. Offline-first. Tillgänglig från start.</p>
          <ul className="flex gap-4 mt-3" aria-label="Trust">
            <li aria-label="WCAG 2.1 AA"><span className="text-xs">WCAG AA</span></li>
            <li aria-label="PWA"><span className="text-xs">PWA</span></li>
            <li aria-label="GDPR"><span className="text-xs">GDPR</span></li>
          </ul>
        </div>
        <nav aria-label="Legal" className="text-sm">
          <ul className="space-y-2">
            <li><Link to="/imprint" className="hover:underline">{t('imprint')}</Link></li>
            <li><a href="#privacy" className="hover:underline">{t('privacy')}</a></li>
            <li><a href="#terms" className="hover:underline">{t('terms')}</a></li>
          </ul>
        </nav>
        <div className="text-sm text-[var(--sa-muted)]">© {new Date().getFullYear()} Skolapp</div>
      </div>
    </footer>
  );
};
