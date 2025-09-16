import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Skolapp</h1>
          <p className="hero__subtitle">
            Modern och intuitive plattform för digitala quiz och inlärning. 
            Skapa engagerande upplevelser för elever och lärare.
          </p>
          <div className="hero__actions">
            <Button variant="primary" fullWidth={false}>
              Kom igång
            </Button>
            <Button variant="secondary" fullWidth={false}>
              Läs mer
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features__container">
          <h2 className="features__title">Funktioner</h2>
          <div className="features__grid">
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">📝</div>
              <h3 className="feature-card__title">Skapa Quiz</h3>
              <p className="feature-card__description">
                Bygg interaktiva quiz snabbt och enkelt med vår intuitiva editor.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">📊</div>
              <h3 className="feature-card__title">Spåra Framsteg</h3>
              <p className="feature-card__description">
                Följ elevernas utveckling med detaljerade analyser och rapporter.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">🎯</div>
              <h3 className="feature-card__title">Engagerande Innehåll</h3>
              <p className="feature-card__description">
                Öka elevernas motivation med gamifierade inlärningsupplevelser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta__content">
          <h2 className="cta__title">Redo att börja?</h2>
          <p className="cta__subtitle">
            Välj din roll och upptäck vad Skolapp kan göra för dig.
          </p>
          <div className="cta__actions">
            <Link to="/teacher" className="btn btn--primary">
              Jag är lärare
            </Link>
            <Link to="/student" className="btn btn--secondary">
              Jag är elev
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
