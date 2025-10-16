
import React, { useState, useEffect } from 'react';
import type { Page } from '../types';

interface HeaderProps {
  navigateTo: (page: Page) => void;
  currentPage: Page;
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
      className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
        isActive
          ? 'text-brand-cyan'
          : 'text-brand-gray hover:text-brand-dark'
      }`}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (targetId: string) => {
    navigateTo('home');
    setIsMenuOpen(false);
    setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navLinks = (
    <>
      <NavLink page="home" currentPage={currentPage} navigateTo={() => { navigateTo('home'); setIsMenuOpen(false); }}>Home</NavLink>
      <button onClick={() => handleNavClick('about')} className="px-4 py-2 text-sm font-medium text-brand-gray hover:text-brand-dark transition-colors duration-300">About Us</button>
      <button onClick={() => handleNavClick('services')} className="px-4 py-2 text-sm font-medium text-brand-gray hover:text-brand-dark transition-colors duration-300">Services</button>
      <button onClick={() => handleNavClick('gallery')} className="px-4 py-2 text-sm font-medium text-brand-gray hover:text-brand-dark transition-colors duration-300">Gallery</button>
    </>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-brand-dark tracking-wider cursor-pointer" onClick={() => navigateTo('home')}>
            GULF <span className="text-brand-cyan">DETAILING CUSTOMS</span>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {navLinks}
            <button
              onClick={() => navigateTo('booking')}
              className="ml-4 px-5 py-2 bg-brand-cyan text-white font-semibold rounded-md hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            >
              Book Now
            </button>
          </nav>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand-dark focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg p-4 shadow-lg">
            <nav className="flex flex-col items-center space-y-4">
              {navLinks}
              <button
                onClick={() => {
                  navigateTo('booking');
                  setIsMenuOpen(false);
                }}
                className="w-full mt-2 px-5 py-2 bg-brand-cyan text-white font-semibold rounded-md hover:opacity-90 transition-colors duration-300"
              >
                Book Now
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;