import React from 'react';
import { Button } from '../components/Button';
import { useRole } from '../auth/role-context';

export const Home: React.FC = () => {
  const { setRole } = useRole();

  const handleGetStarted = () => {
    setRole('teacher');
  };

  const handleLearnMore = () => {
    document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Modernt digitalt lärande för alla</h1>
            <p className="hero-subtitle">
              Skolapp gör det enkelt att skapa, hantera och genomföra quiz och uppgifter. 
              En intuitiv plattform som hjälper lärare att engagera elever och följa upp lärande.
            </p>
            <div className="hero-actions">
              <Button variant="primary" onClick={handleGetStarted}>
                Kom igång
              </Button>
              <Button variant="secondary" onClick={handleLearnMore}>
                Läs mer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Kraftfulla funktioner för modernt lärande</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3 className="feature-title">Enkla Quiz</h3>
              <p className="feature-text">
                Skapa och hantera quiz med intuitiva verktyg. Få direkta resultat och följ elevernas framsteg.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">Klasshantering</h3>
              <p className="feature-text">
                Organisera elever, tilldela uppgifter och få överblick över klassens prestationer.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Analys & Rapporter</h3>
              <p className="feature-text">
                Detaljerade analyser hjälper dig förstå elevernas kunskapsutveckling och behov.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">Fungerar Överallt</h3>
              <p className="feature-text">
                Tillgänglig på alla enheter - dator, surfplatta eller mobil. Fungerar även offline.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Säker & Privat</h3>
              <p className="feature-text">
                GDPR-kompatibel med fokus på datasäkerhet och elevernas integritet.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Snabb & Responsiv</h3>
              <p className="feature-text">
                Optimerad prestanda ger snabba svar och smidig användarupplevelse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Redo att börja?</h2>
            <p className="cta-text">
              Välj din roll för att komma igång med Skolapp och upptäck hur enkelt digitalt lärande kan vara.
            </p>
            <div className="cta-actions">
              <Button variant="primary" onClick={() => setRole('teacher')}>
                Jag är lärare
              </Button>
              <Button variant="secondary" onClick={() => setRole('student')}>
                Jag är elev
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
