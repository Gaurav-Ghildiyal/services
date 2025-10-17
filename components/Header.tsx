import React, { useState } from 'react';
import type { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  navigateTo: (page: Page, sectionId?: string) => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  navigateTo: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, navigateTo, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => navigateTo(page)}
      className={`px-3 py-2 text-md font-medium transition-colors duration-300 ${
        isActive
          ? 'text-brand-cyan'
          : 'text-white hover:text-brand-cyan'
      }`}
    >
      {children}
    </button>
  );
};

const ScrollLink: React.FC<{
  sectionId: string;
  navigateTo: (page: Page, sectionId?: string) => void;
  children: React.ReactNode;
}> = ({ sectionId, navigateTo, children }) => {
  return (
    <button
      onClick={() => navigateTo('home', sectionId)}
      className="px-3 py-2 text-md font-medium text-white hover:text-brand-cyan transition-colors duration-300"
    >
      {children}
    </button>
  );
};


const Header: React.FC<HeaderProps> = ({ currentPage, navigateTo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMobileLinkClick = (page: Page, sectionId?: string) => {
    navigateTo(page, sectionId);
    setIsOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-dark bg-opacity-80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white cursor-pointer" onClick={() => navigateTo('home')}>
          GULF <span className="text-brand-cyan">DETAILING CUSTOMS</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavLink page="home" currentPage={currentPage} navigateTo={navigateTo}>Home</NavLink>
          <ScrollLink sectionId="services" navigateTo={navigateTo}>Services</ScrollLink>
          <ScrollLink sectionId="gallery" navigateTo={navigateTo}>Gallery</ScrollLink>
          <NavLink page="location" currentPage={currentPage} navigateTo={navigateTo}>Location</NavLink>
          <button
            onClick={() => navigateTo('booking')}
            className="ml-4 px-5 py-2 bg-brand-cyan text-white font-bold text-sm rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Nav Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark">
          <nav className="flex flex-col items-center pt-4 pb-6">
            <button onClick={() => handleMobileLinkClick('home')} className={`w-full py-3 ${currentPage === 'home' ? 'text-brand-cyan' : 'text-white'}`}>Home</button>
            <button onClick={() => handleMobileLinkClick('home', 'services')} className="w-full py-3 text-white">Services</button>
            <button onClick={() => handleMobileLinkClick('home', 'gallery')} className="w-full py-3 text-white">Gallery</button>
            <button onClick={() => handleMobileLinkClick('location')} className={`w-full py-3 ${currentPage === 'location' ? 'text-brand-cyan' : 'text-white'}`}>Location</button>
            <div className="mt-4 w-full px-6">
                 <button 
                    onClick={() => handleMobileLinkClick('booking')} 
                    className="w-full px-6 py-3 bg-brand-cyan text-white font-bold rounded-lg hover:opacity-90 transition-all duration-300"
                >
                    Book Now
                </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;