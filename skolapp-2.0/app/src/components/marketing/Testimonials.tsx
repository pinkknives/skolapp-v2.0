import React from 'react';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  org: string;
};

const data: Testimonial[] = [
  {
    quote: 'Det tog oss en förmiddag att komma igång och nu sparar vi tid varje vecka.',
    name: 'Anna Svensson',
    role: 'Lärare i matematik',
    org: 'Lundaskolan',
  },
  {
    quote: 'Quiz och uppgifter funkar offline – perfekt när uppkopplingen svajar.',
    name: 'Johan Ek',
    role: 'IT‑pedagog',
    org: 'Norra Gymnasiet',
  },
  {
    quote: 'Tillgängligheten är på riktigt: bra kontrast, tangentbordsstöd och tydligt fokus.',
    name: 'Sara Ali',
    role: 'Specialpedagog',
    org: 'Södra Skolan',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase() ?? '')
    .join('');
}

export const Testimonials: React.FC = () => {
  return (
    <section aria-labelledby="testimonials-heading" className="section">
      <div className="container-narrow">
        <h2 id="testimonials-heading" className="text-2xl md:text-3xl font-heading font-bold text-[var(--sa-text)] mb-6">Vad säger lärare och elever?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((t, idx) => (
            <figure key={idx} className="mk-card p-5 border border-[var(--sa-border)]" aria-label={`Citat från ${t.name}, ${t.role} på ${t.org}`}>
              <blockquote className="m-0">
                <p className="text-[var(--sa-text)]">“{t.quote}”</p>
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div aria-hidden className="w-10 h-10 rounded-full bg-[var(--sa-primary)]/15 text-[var(--sa-primary)] flex items-center justify-center font-semibold">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[var(--sa-text)]">{t.name}</div>
                  <div className="text-xs text-[var(--sa-muted)]">{t.role} · {t.org}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10" aria-label="Partners">
          <p className="text-sm text-[var(--sa-muted)] mb-3">Tillit från skolor och partners</p>
          <ul className="flex flex-wrap gap-3">
            {['Lundaskolan', 'Norra Gymnasiet', 'Södra Skolan', 'EduPartner', 'SkolTech'].map((name) => (
              <li key={name}>
                <span className="inline-flex items-center rounded-full border border-[var(--sa-border)] px-3 py-1 text-xs text-[var(--sa-text)]/80 bg-[var(--sa-surface)]">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
