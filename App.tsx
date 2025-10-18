import React, { useState, useEffect } from 'react';
import type { Page, Service } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import LocationPage from './pages/LocationPage';
import InvoiceGeneratorPage from './pages/InvoiceGeneratorPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [sectionToScrollTo, setSectionToScrollTo] = useState<string | null>(null);

  const navigateTo = (page: Page, sectionId?: string) => {
    setCurrentPage(page);
    
    if (sectionId) {
      setSectionToScrollTo(sectionId);
    } else {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    // This effect handles scrolling to a section when the page is 'home'
    if (currentPage === 'home' && sectionToScrollTo) {
      // Use a small timeout to ensure the target component has rendered
      setTimeout(() => {
        const element = document.getElementById(sectionToScrollTo);
        if (element) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 80; // Default height as fallback
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
        setSectionToScrollTo(null); // Reset after scrolling attempt
      }, 100);
    }
  }, [currentPage, sectionToScrollTo]);

  useEffect(() => {
    // This could be expanded to handle routing via URL hash or History API
    // For now, it just sets the document title.
    const pageTitles: Record<Page, string> = {
      home: 'Home | Gulf Detailing Customs',
      booking: 'Booking | Gulf Detailing Customs',
      location: 'Location | Gulf Detailing Customs',
      invoiceGenerator: 'Invoice Generator | Gulf Detailing Customs',
    };
    document.title = pageTitles[currentPage];
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'booking':
        return <BookingPage />;
      case 'location':
        return <LocationPage />;
      case 'invoiceGenerator':
        return <InvoiceGeneratorPage navigateTo={navigateTo} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-light-bg font-sans">
      <Header currentPage={currentPage} navigateTo={navigateTo} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer navigateTo={navigateTo} />
    </div>
  );
};

export default App;