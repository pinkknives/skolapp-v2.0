import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/lang-context';

export const Footer: React.FC = () => {
  const { t } = useLang();
  return (
    <footer role="contentinfo" className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon" aria-hidden="true" /> 
              Skolapp
            </div>
            <p className="footer__tagline">
              GDPR-ready. Offline-first. Tillgänglig från start.
            </p>
            <ul className="footer__badges" aria-label="Trust">
              <li className="footer__badge" aria-label="WCAG 2.1 AA">
                <span>WCAG AA</span>
              </li>
              <li className="footer__badge" aria-label="PWA">
                <span>PWA</span>
              </li>
              <li className="footer__badge" aria-label="GDPR">
                <span>GDPR</span>
              </li>
            </ul>
          </div>
          
          <nav aria-label="Legal" className="footer__nav">
            <ul className="footer__nav-list">
              <li>
                <Link to="/imprint" className="footer__link">
                  {t('imprint')}
                </Link>
              </li>
              <li>
                <a href="#privacy" className="footer__link">
                  {t('privacy')}
                </a>
              </li>
              <li>
                <a href="#terms" className="footer__link">
                  {t('terms')}
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="footer__copyright">
            © {new Date().getFullYear()} Skolapp
          </div>
        </div>
      </div>
    </footer>
  );
};
