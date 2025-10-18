import React from 'react';
import type { Page } from '../../types';

interface HeroProps {
  navigateTo: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ navigateTo }) => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>
      <img 
        src="/images/hero-background.jpg" 
        alt="Sleek red sports car after a premium detailing service"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-wider leading-tight">
          Perfection in Every Detail
        </h1>
        <p className="mt-4 mb-8 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
          Experience the ultimate in automotive care. We treat every vehicle like our own, delivering unparalleled quality and shine.
        </p>
        <button
          onClick={() => navigateTo('booking')}
          className="px-8 py-4 bg-brand-cyan text-white font-bold text-lg rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Schedule a Service
        </button>
      </div>
    </section>
  );
};

export default Hero;