import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';

export const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <div className="hero__text">
            <h1 id="hero-title" className="hero__title">
              Välkommen till Skolapp
            </h1>
            <p className="hero__subtitle">
              En modern plattform för digitalt lärande som förenar lärare och elever. 
              Skapa engagerande quiz, följ framsteg och förbättra utbildningsupplevelsen.
            </p>
            <div className="hero__actions">
              <Link to="/teacher" className="btn btn--lg" aria-describedby="hero-title">
                Börja som lärare
              </Link>
              <Link to="/student" className="btn btn--secondary btn--lg" aria-describedby="hero-title">
                Logga in som elev
              </Link>
            </div>
          </div>
          <div className="hero__visual" role="img" aria-label="Böcker som representerar lärande">
            <div className="hero__graphic">
              📚
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" aria-labelledby="features-title">
        <div className="container">
          <div className="features__header">
            <h2 id="features-title" className="features__title">Kraftfulla funktioner för modern utbildning</h2>
            <p className="features__subtitle">
              Allt du behöver för att skapa engagerande lärupplevelser
            </p>
          </div>
          <div className="features__grid" role="list" aria-label="Funktioner">
            <Card 
              title="Interaktiva Quiz"
              className="feature-card"
              role="listitem"
            >
              <div className="feature-card__icon" role="img" aria-label="Måltavla-ikon">🎯</div>
              <p>Skapa och hantera quiz med flera frågetyper. Få omedelbar feedback och detaljerad statistik över elevernas prestationer.</p>
            </Card>
            
            <Card 
              title="Realtidsuppföljning"
              className="feature-card"
              role="listitem"
            >
              <div className="feature-card__icon" role="img" aria-label="Diagram-ikon">📊</div>
              <p>Följ elevernas framsteg i realtid. Identifiera kunskapsluckor och anpassa undervisningen efter behov.</p>
            </Card>
            
            <Card 
              title="Offline-stöd"
              className="feature-card"
              role="listitem"
            >
              <div className="feature-card__icon" role="img" aria-label="Mobiltelefon-ikon">📱</div>
              <p>Fungerar även utan internetanslutning. Elever kan ta quiz offline och synkronisera när de kommer online igen.</p>
            </Card>
            
            <Card 
              title="Tillgänglighet"
              className="feature-card"
              role="listitem"
            >
              <div className="feature-card__icon" role="img" aria-label="Tillgänglighets-ikon">♿</div>
              <p>Byggd med tillgänglighet i fokus. Stödjer skärmläsare och tangentbordsnavigation för alla användare.</p>
            </Card>
            
            <Card 
              title="GDPR-säker"
              className="feature-card"
              role="listitem"
            >
              <div className="feature-card__icon" role="img" aria-label="Lås-ikon">🔒</div>
              <p>Fullständig efterlevnad av GDPR och svenska dataskyddsregler. Elevernas integritet är vår prioritet.</p>
            </Card>
            
            <Card 
              title="Progressiv webbapp"
              className="feature-card"
              role="listitem"
            >
              <div className="feature-card__icon" role="img" aria-label="Blixt-ikon">⚡</div>
              <p>Snabb, responsiv och kan installeras på alla enheter. Native app-känsla direkt i webbläsaren.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta__content">
            <h2 id="cta-title" className="cta__title">Redo att förbättra din undervisning?</h2>
            <p className="cta__subtitle">
              Gå med i tusentals lärare som redan använder Skolapp för att skapa engagerande lärupplevelser.
            </p>
            <div className="cta__actions">
              <Link to="/teacher" className="btn btn--lg" aria-describedby="cta-title">
                Kom igång idag
              </Link>
              <Link to="/student" className="btn btn--secondary btn--lg" aria-describedby="cta-title">
                Läs mer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
