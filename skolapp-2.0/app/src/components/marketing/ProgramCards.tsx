import React from 'react';
import { Link } from 'react-router-dom';

type Card = {
  title: string;
  text: string;
  ctaHref: string;
  ctaLabel: string;
  // Simple illustration color pair
  from: string;
  to: string;
  icon: React.ReactNode;
};

const Illo: React.FC<{ from: string; to: string; icon: React.ReactNode; alt: string }> = ({ from, to, icon, alt }) => (
  <figure className="relative overflow-hidden rounded-lg border border-[var(--sa-border)]" aria-label={alt}>
    <div className={`aspect-[3/2] w-full bg-gradient-to-br ${from} ${to} flex items-center justify-center`}>{icon}</div>
  </figure>
);

const Icon: React.FC<{ path: string }> = ({ path }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d={path} />
  </svg>
);

const cards: Card[] = [
  {
    title: 'Planera lektioner',
    text: 'Samla material, skapa struktur och dela med kollegor och elever.',
    ctaHref: '#',
    ctaLabel: 'Utforska planering',
    from: 'from-[rgba(30,144,255,0.15)]',
    to: 'to-[rgba(99,102,241,0.12)]',
    icon: <Icon path="M4 6h16v2H4zm0 5h10v2H4zm0 5h16v2H4z" />,
  },
  {
    title: 'Delade klassrum',
    text: 'Arbeta tillsammans i realtid och håll alla synkade – även offline.',
    ctaHref: '#',
    ctaLabel: 'Se hur delning funkar',
    from: 'from-[rgba(16,185,129,0.18)]',
    to: 'to-[rgba(59,130,246,0.12)]',
    icon: <Icon path="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9v-1a5 5 0 0110 0v1H5zm9 0v-1a6.97 6.97 0 013-5.74A6.99 6.99 0 0121 20v1h-7z" />,
  },
  {
    title: 'Självtest för elever',
    text: 'Öva i egen takt med feedback direkt – inga onödiga konton.',
    ctaHref: '#',
    ctaLabel: 'Prova elevläge',
    from: 'from-[rgba(245,158,11,0.18)]',
    to: 'to-[rgba(236,72,153,0.13)]',
    icon: <Icon path="M3 5h18v2H3zm0 4h12v2H3zm0 4h18v2H3zm0 4h12v2H3z" />,
  },
  {
    title: 'Resultat och insikter',
    text: 'Följ progression och identifiera var stöd behövs, integritetsvänligt.',
    ctaHref: '#',
    ctaLabel: 'Lär mer om insikter',
    from: 'from-[rgba(99,102,241,0.18)]',
    to: 'to-[rgba(30,144,255,0.13)]',
    icon: <Icon path="M5 12h3v8H5zm5-4h3v12h-3zm5-6h3v18h-3z" />,
  },
];

export const ProgramCards: React.FC = () => {
  return (
    <section aria-labelledby="program-heading" className="section">
      <div className="container-narrow">
        <h2 id="program-heading" className="text-2xl md:text-3xl font-heading font-bold text-[var(--sa-text)] mb-6">Användningsfall</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <article key={i} className="mk-card p-4 transition-transform duration-150 hover:-translate-y-0.5 focus-within:-translate-y-0.5">
              <Illo from={c.from} to={c.to} icon={<div className="text-[var(--sa-primary)]">{c.icon}</div>} alt={c.title} />
              <h3 className="mt-3 text-base font-semibold text-[var(--sa-text)]">{c.title}</h3>
              <p className="mt-1 text-sm text-[var(--sa-muted)]">{c.text}</p>
              <div className="mt-3">
                <Link to={c.ctaHref} className="btn btn--secondary" aria-label={`${c.ctaLabel} – ${c.title}`}>
                  {c.ctaLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
