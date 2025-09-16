import React from 'react';
import { useLang } from '../../i18n/lang-context';

type ConsentState = 'hidden' | 'prompt' | 'accepted' | 'declined';

const KEY = 'skolapp-consent-v1';

export const ConsentBanner: React.FC = () => {
  const { t } = useLang();
  const [state, setState] = React.useState<ConsentState>('hidden');

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'accepted' || saved === 'declined') setState(saved);
      else setState('prompt');
    } catch { setState('prompt'); }
  }, []);

  React.useEffect(() => {
    if (state === 'accepted' || state === 'declined') {
      try { localStorage.setItem(KEY, state); } catch {}
    }
  }, [state]);

  if (state !== 'prompt') return null;

  return (
    <section
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-40"
    >
      <div className="mx-auto container px-4 py-3 mb-4 mk-card bg-[var(--sa-surface)] border-[var(--sa-border)] shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <p className="text-sm text-[var(--sa-text)]">
            {t('consent_text')}
          </p>
          <div className="md:ml-auto flex gap-2">
            <button className="btn btn--secondary" onClick={() => setState('declined')}>{t('decline')}</button>
            <button className="btn" onClick={() => setState('accepted')}>{t('accept')}</button>
          </div>
        </div>
      </div>
    </section>
  );
};
