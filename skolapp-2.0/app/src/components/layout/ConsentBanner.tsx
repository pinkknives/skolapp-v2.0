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
      className="consent-banner"
    >
      <div className="consent-banner__content">
        <div className="consent-banner__text">
          <p className="consent-banner__message">
            {t('consent_text')}
          </p>
        </div>
        <div className="consent-banner__actions">
          <button 
            className="btn btn--ghost btn--sm" 
            onClick={() => setState('declined')}
          >
            {t('decline')}
          </button>
          <button 
            className="btn btn--primary btn--sm" 
            onClick={() => setState('accepted')}
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </section>
  );
};
