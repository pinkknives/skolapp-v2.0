import React from 'react';
import { useNavigate } from 'react-router-dom';

function isValidEmail(v: string) {
  return /.+@.+\..+/.test(v);
}

export const Newsletter: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Ogiltig e‑postadress');
      return;
    }
    setError(null);
    try { localStorage.setItem('newsletter-pending', email); } catch {}
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div role="status" aria-live="polite" className="mk-card p-6 border border-[var(--sa-border)]">
        <p>Tack! Bekräfta din prenumeration via länken vi skickat till din e‑post.</p>
        <p className="text-sm text-[var(--sa-muted)]">(Demo) Du kan också bekräfta här: <button className="btn btn--link" onClick={() => navigate('/confirm-newsletter')}>Bekräfta nu</button></p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mk-card p-6 border border-[var(--sa-border)]" aria-labelledby="newsletter-heading">
      <h3 id="newsletter-heading" className="text-lg font-heading m-0 text-[var(--sa-text)]">Nyhetsbrev</h3>
      <p className="text-sm text-[var(--sa-muted)] mt-1">Tips, uppdateringar och mallar. Double opt‑in enligt GDPR.</p>
      <div className="mt-3 flex flex-col sm:flex-row gap-2">
        <div className="field grow">
          <label htmlFor="nl-email" className="field__label">E‑post</label>
          <input
            id="nl-email"
            className="field__control"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!error}
            aria-describedby={error ? 'nl-error' : undefined}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="namn@example.com"
          />
          {error && <div id="nl-error" className="field__error">{error}</div>}
        </div>
        <div className="self-end">
          <button type="submit" className="btn">Prenumerera</button>
        </div>
      </div>
      <p className="text-xs text-[var(--sa-muted)] mt-2">Genom att skicka godkänner du vår integritetspolicy. Du kan avsluta när som helst.</p>
    </form>
  );
};
