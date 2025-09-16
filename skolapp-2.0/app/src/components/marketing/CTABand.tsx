import React from 'react';
import { Link } from 'react-router-dom';

export const CTABand: React.FC = () => {
  return (
    <section className="section-lg" aria-label="Call to action">
      <div className="container-narrow mk-card p-6 md:p-8 bg-[var(--sa-surface)] border border-[var(--sa-border)]">
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <h2 className="m-0 font-heading text-2xl md:text-3xl text-[var(--sa-text)]">Prova Skolapp gratis</h2>
            <p className="m-0 mt-2 text-[var(--sa-muted)]">Kom igång på minuter. Inget kreditkort behövs.</p>
          </div>
          <div className="flex md:justify-end">
            <Link to="/teacher" className="btn" aria-label="Prova gratis">Prova gratis</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
