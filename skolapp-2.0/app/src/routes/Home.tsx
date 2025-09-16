import React from 'react';
import { Hero } from '../components/marketing/Hero';
import { FeatureGrid } from '../components/marketing/FeatureGrid';
import { ProgramCards } from '../components/marketing/ProgramCards';
import { Testimonials } from '../components/marketing/Testimonials';
import { CTABand } from '../components/marketing/CTABand';
import { Newsletter } from '../components/marketing/Newsletter';
import { Pricing } from '../components/marketing/Pricing';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <div id="features">
        <FeatureGrid />
      </div>
      <ProgramCards />
  <Testimonials />
      <CTABand />
      <section className="section">
        <div className="container-narrow">
          <Newsletter />
        </div>
      </section>
      <Pricing />
    </>
  );
};
