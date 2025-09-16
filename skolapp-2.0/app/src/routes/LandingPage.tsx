import React from 'react';

export const LandingPage: React.FC = () => {
  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="nav-bar" role="navigation" aria-label="Huvudnavigation">
        <div className="nav-container">
          <a href="/" className="nav-logo" aria-label="Skolapp startsida">
            Skolapp
          </a>
          
          <ul className="nav-links">
            <li><a href="#features" className="nav-link">Funktioner</a></li>
            <li><a href="#programs" className="nav-link">Program</a></li>
            <li><a href="#pricing" className="nav-link">Priser</a></li>
            <li><a href="#contact" className="nav-link">Kontakt</a></li>
          </ul>
          
          <div className="nav-actions">
            <button className="btn btn--secondary" aria-label="Byt språk">
              SV
            </button>
            <button className="btn btn--primary">
              Logga in
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-container">
          <h1 id="hero-title" className="hero-title">
            Modernisera din skolas digitala miljö
          </h1>
          <p className="hero-subtitle">
            Skolapp hjälper dig att skapa en engagerande och tillgänglig lärplattform 
            som både lärare och elever älskar att använda.
          </p>
          <div className="hero-cta">
            <button className="btn btn--primary btn--full">
              Prova gratis
            </button>
            <button className="btn btn--secondary btn--full">
              Se demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section" aria-labelledby="features-title">
        <div className="section-container">
          <h2 id="features-title" className="section-title">
            Allt du behöver för modern undervisning
          </h2>
          
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                📚
              </div>
              <h3 className="feature-title">Interaktiva Quiz</h3>
              <p className="feature-description">
                Skapa engagerande quiz och utvärderingar som gör lärandet roligt och mätbart.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                ⚡
              </div>
              <h3 className="feature-title">Realtidsdata</h3>
              <p className="feature-description">
                Få omedelbar feedback och analys av elevernas framsteg och prestation.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                📱
              </div>
              <h3 className="feature-title">Mobilvänlig</h3>
              <p className="feature-description">
                Fungerar perfekt på alla enheter - surfplatta, telefon eller dator.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                🔒
              </div>
              <h3 className="feature-title">GDPR-säker</h3>
              <p className="feature-description">
                Fullständigt GDPR-kompatibel med säker datahantering och integritet.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                ♿
              </div>
              <h3 className="feature-title">Tillgänglig</h3>
              <p className="feature-description">
                Byggd med tillgänglighet i fokus för att inkludera alla elever.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">
                🎯
              </div>
              <h3 className="feature-title">Resultatfokus</h3>
              <p className="feature-description">
                Verktyg som hjälper både lärare och elever att nå sina lärandemål.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="section" aria-labelledby="programs-title">
        <div className="section-container">
          <h2 id="programs-title" className="section-title">
            Lämplig för alla utbildningsnivåer
          </h2>
          
          <div className="program-grid">
            <div className="program-card">
              <div className="program-image" aria-hidden="true">
                📖
              </div>
              <div className="program-content">
                <h3 className="program-title">Grundskola</h3>
                <p className="program-description">
                  Anpassad för yngre elever med lekfulla och pedagogiska funktioner 
                  som gör lärandet naturligt och roligt.
                </p>
                <button className="btn btn--primary">
                  Läs mer
                </button>
              </div>
            </div>
            
            <div className="program-card">
              <div className="program-image" aria-hidden="true">
                🎓
              </div>
              <div className="program-content">
                <h3 className="program-title">Gymnasium</h3>
                <p className="program-description">
                  Avancerade verktyg för äldre elever med fokus på självständighet 
                  och förberedelse inför högre studier.
                </p>
                <button className="btn btn--primary">
                  Läs mer
                </button>
              </div>
            </div>
            
            <div className="program-card">
              <div className="program-image" aria-hidden="true">
                🏫
              </div>
              <div className="program-content">
                <h3 className="program-title">Komvux</h3>
                <p className="program-description">
                  Flexibla lösningar för vuxenutbildning med stöd för distanslärande 
                  och individuella studietakt.
                </p>
                <button className="btn btn--primary">
                  Läs mer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band" aria-labelledby="cta-title">
        <div className="section-container">
          <h2 id="cta-title" className="cta-band-title">
            Redo att förbättra din undervisning?
          </h2>
          <p className="cta-band-description">
            Börja med en kostnadsfri testperiod och se skillnaden redan idag.
          </p>
          <button className="btn btn--secondary" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>
            Starta gratis testperiod
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="footer-content">
          <h3 className="footer-title">Skolapp</h3>
          <nav className="footer-links" aria-label="Foterlänkar">
            <a href="/privacy" className="footer-link">Integritetspolicy</a>
            <a href="/terms" className="footer-link">Användarvillkor</a>
            <a href="/support" className="footer-link">Support</a>
            <a href="/about" className="footer-link">Om oss</a>
          </nav>
          <p className="footer-copy">
            © 2024 Skolapp. Alla rättigheter förbehållna.
          </p>
        </div>
      </footer>
    </div>
  );
};