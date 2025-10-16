
import React from 'react';
import type { Page } from '../types';

import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import Gallery from '../components/home/Gallery';

interface HomePageProps {
  navigateTo: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  return (
    <>
      <Hero navigateTo={navigateTo} />
      <About />
      <Services />
      <Gallery />
    </>
  );
};

export default HomePage;
