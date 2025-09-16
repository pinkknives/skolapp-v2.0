import React from 'react';
import { Link } from 'react-router-dom';

type Tier = {
  name: string;
  price: string;
  period?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    name: 'Free',
    price: '0 kr',
    period: '/ månad',
    features: [
      'Obegränsade quiz lokalt',
      'Grundläggande statistik',
      'PWA offline‑stöd',
    ],
    ctaLabel: 'Kom igång',
    ctaHref: '/teacher',
  },
  {
    name: 'Premium',
    price: '79 kr',
    period: '/ användare / månad',
    features: [
      'Delade klassrum och samarbete',
      'Export och integrationer',
      'Prioriterad support',
    ],
    ctaLabel: 'Starta provperiod',
    ctaHref: '/teacher',
    highlighted: true,
  },
];

export const Pricing: React.FC = () => {
  return (
    <section aria-labelledby="pricing-heading" className="section">
      <div className="container-narrow">
        <h2 id="pricing-heading" className="text-2xl md:text-3xl font-heading font-bold text-[var(--sa-text)] mb-6">Enkelt och transparent</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((t) => (
            <article key={t.name} className={`mk-card p-6 border ${t.highlighted ? 'border-[var(--sa-primary)]' : 'border-[var(--sa-border)]'}`} aria-label={`Prisplan ${t.name}`}>
              <h3 className="text-xl font-heading m-0 text-[var(--sa-text)]">{t.name}</h3>
              <div className="mt-2 text-3xl font-bold text-[var(--sa-text)]">{t.price} <span className="text-base font-normal text-[var(--sa-muted)]">{t.period}</span></div>
              <ul className="mt-4 space-y-2 text-sm text-[var(--sa-text)]">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 inline-block w-2 h-2 rounded-full bg-[var(--sa-primary)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Link to={t.ctaHref} className={`btn ${t.highlighted ? '' : 'btn--secondary'}`}>{t.ctaLabel}</Link>
              </div>
            </article>
          ))}
        </div>
        <p className="text-xs text-[var(--sa-muted)] mt-3">(Demo) Stripe‑hook kommer här: knappen pekar mot flödet för Premium‑provperiod.</p>
      </div>
    </section>
  );
};
