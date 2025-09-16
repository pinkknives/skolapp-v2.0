import React from 'react';

export const ConfirmNewsletter: React.FC = () => {
  const [email, setEmail] = React.useState<string | null>(null);
  React.useEffect(() => {
    try { setEmail(localStorage.getItem('newsletter-pending')); localStorage.removeItem('newsletter-pending'); } catch {}
  }, []);
  return (
    <section className="section container-narrow">
      <h2>Bekräftat!</h2>
      <p>Din prenumeration {email ? `för ${email} ` : ''}är nu bekräftad.</p>
      <p className="text-sm text-[var(--sa-muted)]">(Demo) I produktion skulle detta verifieras via e‑postlänk.</p>
    </section>
  );
};
