import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  backgroundImageUrl?: string; // optional image variant, we still add gradient overlay
}

export const Hero: React.FC<HeroProps> = ({
  title = 'Skolapp – undervisning som flyter',
  subtitle = 'Planera lektioner, dela quiz och följ progression. Snabbt, tillgängligt och GDPR‑redo.',
  primaryHref = '/teacher',
  primaryLabel = 'Prova gratis',
  secondaryHref = '#features',
  secondaryLabel = 'Läs mer',
  backgroundImageUrl,
}) => {
  return (
    <section
      aria-labelledby="hero-heading"
      className={`section-lg hero-gradient relative isolate overflow-hidden`}
      style={backgroundImageUrl ? {
        backgroundImage: `linear-gradient(rgba(248,250,252,0.85), rgba(248,250,252,0.85)), url('${backgroundImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      <div className="container-narrow min-h-[70vh] md:min-h-[75vh] grid items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-[var(--sa-primary)] mb-3">Enkel. Tillgänglig. PWA.</p>
          <h1 id="hero-heading" className="font-heading font-bold leading-tight text-[var(--sa-text)] text-4xl sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-[var(--sa-muted)]">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to={primaryHref} className="btn" aria-label={primaryLabel}>
              {primaryLabel}
            </Link>
            <Link to={secondaryHref} className="btn btn--secondary" aria-label={secondaryLabel}>
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
