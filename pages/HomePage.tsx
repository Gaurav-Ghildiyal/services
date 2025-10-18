

import React from 'react';
import type { Page, Service } from '../types';

import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Services from '../components/home/Services';
import ShopProducts from '../components/home/ShopProducts';
import Gallery from '../components/home/Gallery';

interface HomePageProps {
  navigateTo: (page: Page, sectionId?: string, service?: Service) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  return (
    <>
      <Hero navigateTo={navigateTo} />
      <About />
      <Services navigateTo={navigateTo} />
      <ShopProducts />
      <Gallery />
    </>
  );
};

export default HomePage;