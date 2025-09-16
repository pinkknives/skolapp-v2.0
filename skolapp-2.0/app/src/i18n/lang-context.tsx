import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'sv' | 'en';

type Dictionary = Record<string, Record<Lang, string>>;

const DICT: Dictionary = {
  home: { sv: 'Hem', en: 'Home' },
  teacher: { sv: 'Lärare', en: 'Teacher' },
  student: { sv: 'Elev', en: 'Student' },
  language: { sv: 'Språk', en: 'Language' },
  imprint: { sv: 'Impressum', en: 'Imprint' },
  privacy: { sv: 'Integritet', en: 'Privacy' },
  terms: { sv: 'Villkor', en: 'Terms' },
  cookies: { sv: 'Cookie‑inställningar', en: 'Cookie Settings' },
  consent_text: {
    sv: 'Vi använder endast nödvändiga cookies. Med ditt samtycke kan vi använda analyscookies för att förbättra upplevelsen.',
    en: 'We use essential cookies only. With your consent, we may use analytics cookies to improve your experience.',
  },
  accept: { sv: 'Acceptera', en: 'Accept' },
  decline: { sv: 'Avböj', en: 'Decline' },
};

interface LangValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof DICT) => string;
}

const LangContext = createContext<LangValue | undefined>(undefined);

function detectInitialLang(): Lang {
  try {
    const stored = localStorage.getItem('lang');
    if (stored === 'sv' || stored === 'en') return stored;
  } catch {}
  const nav = navigator?.language?.toLowerCase() ?? 'sv';
  if (nav.startsWith('sv')) return 'sv';
  return 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(detectInitialLang);
  useEffect(() => { try { localStorage.setItem('lang', lang); } catch {} }, [lang]);
  const t = useMemo(() => (key: keyof typeof DICT) => DICT[key][lang], [lang]);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
