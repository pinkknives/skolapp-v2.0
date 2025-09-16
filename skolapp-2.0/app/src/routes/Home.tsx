import React from 'react';
import { useRole } from '../auth/role-context';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  const { setRole } = useRole();

  const features = [
    {
      icon: '👨‍🏫',
      title: 'För Lärare',
      description: 'Skapa och hantera quiz, följ elevernas framsteg och få detaljerade resultat.',
      action: () => setRole('teacher')
    },
    {
      icon: '👩‍🎓',
      title: 'För Elever',
      description: 'Gör quiz, öva på svåra frågor och förbättra dina kunskaper.',
      action: () => setRole('student')
    },
    {
      icon: '📱',
      title: 'Fungerar Offline',
      description: 'Arbetar även utan internetanslutning. Synkroniseras automatiskt när du är online.',
      action: () => console.log('PWA info')
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero__title">Välkommen till Skolapp</h1>
        <p className="hero__subtitle">
          En modern och tillgänglig plattform för quiz och lärande. 
          Skapa, dela och genomför quiz enkelt - både online och offline.
        </p>
        <div className="hero__cta">
          <Button 
            variant="primary" 
            onClick={() => setRole('teacher')}
            aria-label="Kom igång som lärare"
          >
            Kom igång som Lärare
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => setRole('student')}
            aria-label="Kom igång som elev"
          >
            Kom igång som Elev
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="features__title">Funktioner</h2>
        <div className="features__grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              onClick={feature.action}
              role="button"
              tabIndex={0}
              aria-label={`${feature.title}: ${feature.description}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  feature.action();
                }
              }}
            >
              <div className="feature-card__icon" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <h2 className="cta-band__title">Redo att börja?</h2>
        <p className="cta-band__subtitle">
          Välj din roll och utforska allt som Skolapp har att erbjuda.
        </p>
        <Button 
          variant="secondary"
          onClick={() => setRole('teacher')}
          aria-label="Starta nu som lärare"
        >
          Starta nu
        </Button>
      </section>
    </>
  );
};
