import React from 'react';
import type { Page } from '../types';

interface FooterProps {
  navigateTo: (page: Page) => void;
}

const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-cyan transition-colors duration-300">
    {children}
  </a>
);

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="bg-brand-dark">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">GULF <span className="text-brand-cyan">DETAILING CUSTOMS</span></h3>
            <p className="text-gray-400">Perfection in every detail. Experience the pinnacle of automotive care.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => navigateTo('home')} className="hover:text-brand-cyan">Home</button></li>
              <li><button onClick={() => navigateTo('booking')} className="hover:text-brand-cyan">Book Now</button></li>
              <li><button onClick={() => navigateTo('location')} className="hover:text-brand-cyan">Location</button></li>
              <li><button onClick={() => navigateTo('invoiceGenerator')} className="hover:text-brand-cyan">Invoice Generator</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <SocialIcon href="https://www.instagram.com/gulfdetailingcustoms">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zM12 7.177a4.823 4.823 0 100 9.646 4.823 4.823 0 000-9.646zm0 7.712a2.889 2.889 0 110-5.778 2.889 2.889 0 010 5.778zM16.949 6.864a1.144 1.144 0 100 2.288 1.144 1.144 0 000-2.288z" clipRule="evenodd" /></svg>
              </SocialIcon>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-brand-gray pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Gulf Detailing Customs. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;