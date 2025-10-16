
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import type { Page } from './types';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentPage === 'booking' && <BookingPage />}
      </main>
      <Footer />
    </div>
  );
};

export default App;