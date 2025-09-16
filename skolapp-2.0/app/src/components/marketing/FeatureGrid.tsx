import React from 'react';

type Feature = {
  title: string;
  text: string;
  icon: React.ReactNode;
};

const IconWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-10 h-10 rounded-md flex items-center justify-center bg-[var(--sa-primary)]/10 text-[var(--sa-primary)]" aria-hidden>
    {children}
  </div>
);

const features: Feature[] = [
  {
    title: 'Snabb onboarding',
    text: 'Kom igång på minuter – ingen IT krävs.',
    icon: (
      <IconWrap>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3l3 6 6 .9-4.5 4.3L17 21l-5-2.7L7 21l1.5-6.8L4 9.9 10 9l2-6z"/>
        </svg>
      </IconWrap>
    ),
  },
  {
    title: 'Quiz & uppgifter',
    text: 'Skapa, dela och följ progression på ett ställe.',
    icon: (
      <IconWrap>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4 5h16v2H4zm0 6h10v2H4zm0 6h16v2H4z"/>
        </svg>
      </IconWrap>
    ),
  },
  {
    title: 'Offline‑first',
    text: 'Fortsätt arbeta utan nät. Synkas när du är online.',
    icon: (
      <IconWrap>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 4a8 8 0 00-8 8h3l-4 4-4-4h3a10 10 0 0110-10v2z"/>
        </svg>
      </IconWrap>
    ),
  },
  {
    title: 'Tillgänglighet',
    text: 'WCAG 2.1 AA: kontrast, tangentbord, ARIA.',
    icon: (
      <IconWrap>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a3 3 0 110 6 3 3 0 010-6zm-7 9h6v11h2V11h6v-2H5v2z"/>
        </svg>
      </IconWrap>
    ),
  },
  {
    title: 'GDPR som standard',
    text: 'Minimera data, transparens och samtycke inbyggt.',
    icon: (
      <IconWrap>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3l7 4v6c0 5-3.5 7.5-7 8-3.5-.5-7-3-7-8V7l7-4zm0 6a3 3 0 00-3 3v1h6v-1a3 3 0 00-3-3z"/>
        </svg>
      </IconWrap>
    ),
  },
  {
    title: 'PWA & prestanda',
    text: 'Snabb på mobil och desktop. Lighthouse i grönt.',
    icon: (
      <IconWrap>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 13h8l-2 8 12-12h-8l2-8z"/>
        </svg>
      </IconWrap>
    ),
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <section aria-labelledby="features-heading" className="section">
      <div className="container-narrow">
        <h2 id="features-heading" className="text-2xl md:text-3xl font-heading font-bold text-[var(--sa-text)] mb-6">Varför Skolapp?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <article key={i} className="mk-card p-5 border border-[var(--sa-border)] focus-within:shadow-md" aria-label={f.title}>
              <div className="flex items-start gap-3">
                {f.icon}
                <div>
                  <h3 className="text-base font-semibold text-[var(--sa-text)] m-0">{f.title}</h3>
                  <p className="text-sm text-[var(--sa-muted)] m-0 mt-1">{f.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
