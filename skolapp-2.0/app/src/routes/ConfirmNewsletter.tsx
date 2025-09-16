import React from 'react';
import { Link } from 'react-router-dom';

export const ConfirmNewsletter: React.FC = () => {
  const [email, setEmail] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    try { 
      setEmail(localStorage.getItem('newsletter-pending')); 
      localStorage.removeItem('newsletter-pending'); 
    } catch {}
  }, []);
  
  return (
    <div className="container">
      <div className="confirmation-page">
        <div className="confirmation-card">
          <div className="confirmation-icon" aria-hidden="true">
            ✅
          </div>
          
          <h2 className="confirmation-title">Bekräftat!</h2>
          
          <p className="confirmation-message">
            Din prenumeration {email ? (
              <>för <strong>{email}</strong> </>
            ) : ''}är nu bekräftad.
          </p>
          
          <div className="confirmation-note">
            <p className="text-sm text-muted">
              (Demo) I produktion skulle detta verifieras via e‑postlänk.
            </p>
          </div>
          
          <div className="confirmation-actions">
            <Link to="/" className="btn btn--primary">
              Tillbaka till start
            </Link>
            <Link to="/teacher" className="btn btn--secondary">
              Gå till lärardashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
