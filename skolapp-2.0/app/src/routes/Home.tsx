import React from 'react';
import { useRole } from '../auth/role-context';
import { LandingPage } from './LandingPage';

export const Home: React.FC = () => {
  const { role } = useRole();
  
  // Show landing page for guests, dashboard for authenticated users
  if (role === 'guest') {
    return <LandingPage />;
  }
  
  return (
    <section>
      <h2>Välkommen tillbaka!</h2>
      <p>Du är inloggad som {role}. Navigera till din dashboard för att komma igång.</p>
    </section>
  );
};
