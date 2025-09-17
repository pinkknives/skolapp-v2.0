import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureGrid } from '../components/marketing/FeatureGrid';
import { CTABand } from '../components/marketing/CTABand';

export const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="hero"
      >
        <div className="container">
          <div className="hero__content">
            <div className="hero__text">
              <p className="hero__eyebrow">Enkel. Tillgänglig. PWA.</p>
              <h1 id="hero-heading" className="hero__title">
                Skolapp – undervisning som flyter
              </h1>
              <p className="hero__subtitle">
                Planera lektioner, dela quiz och följ progression. Snabbt, tillgängligt och GDPR‑redo.
              </p>
              <div className="hero__actions">
                <Link to="/teacher" className="btn btn--lg" aria-label="Kom igång som lärare">
                  Kom igång som lärare
                </Link>
                <Link to="/student" className="btn btn--secondary btn--lg" aria-label="Gå med som elev">
                  Gå med som elev
                </Link>
              </div>
            </div>
            <div className="hero__visual">
              <div className="hero__graphic" aria-hidden="true">
                📚
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureGrid />

      {/* CTA Section */}
      <CTABand />

      {/* Getting Started Section */}
      <section className="section" aria-labelledby="getting-started-heading">
        <div className="container">
          <div className="text-center mb-12">
            <h2 id="getting-started-heading" className="section__title">
              Kom igång på tre enkla steg
            </h2>
            <p className="section__subtitle">
              Ingen installation eller komplicerad setup krävs
            </p>
          </div>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-card__number" aria-hidden="true">1</div>
              <h3 className="step-card__title">Välj din roll</h3>
              <p className="step-card__description">
                Lärare eller elev – båda rollerna har skräddarsydda upplevelser
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-card__number" aria-hidden="true">2</div>
              <h3 className="step-card__title">Skapa eller gå med</h3>
              <p className="step-card__description">
                Lärare skapar quiz, elever går med via enkel kod
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-card__number" aria-hidden="true">3</div>
              <h3 className="step-card__title">Börja lära</h3>
              <p className="step-card__description">
                Allt fungerar offline och synkas automatiskt när du är online
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
