import React, { useEffect } from 'react';
import type { Service, Page } from '../../types';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
  navigateTo: (page: Page, sectionId?: string, service?: Service) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, navigateTo }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleGenerateInvoice = () => {
    onClose(); // Close modal before navigating
    navigateTo('invoice', undefined, service);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 animate-scale-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-brand-dark transition-colors z-10"
          aria-label="Close service details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-6 mb-6">
          <div className="text-brand-cyan flex-shrink-0 pt-1">
            {React.cloneElement(service.icon, { className: "h-12 w-12" })}
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-brand-dark">{service.title}</h2>
            <p className="mt-2 text-brand-gray">{service.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6 mb-6">
          <div>
            <h4 className="font-semibold text-brand-cyan mb-2 uppercase tracking-wider text-sm">Estimated Duration</h4>
            <p className="text-brand-dark text-lg">{service.duration}</p>
          </div>
          <div>
            <h4 className="font-semibold text-brand-cyan mb-2 uppercase tracking-wider text-sm">Pricing</h4>
            <p className="text-brand-dark text-lg">{service.pricing}</p>
          </div>
        </div>
        
        {service.addOns && service.addOns.length > 0 && (
          <div>
            <h4 className="font-semibold text-brand-cyan mb-3 uppercase tracking-wider text-sm">Popular Add-Ons</h4>
            <ul className="space-y-3">
              {service.addOns.map(addon => (
                <li key={addon.name} className="bg-brand-light-bg p-4 rounded-lg border border-gray-200">
                  <p className="font-semibold text-brand-dark">{addon.name}</p>
                  <p className="text-sm text-brand-gray">{addon.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-right">
          <button
            onClick={handleGenerateInvoice}
            className="px-6 py-3 bg-brand-dark text-white font-bold text-sm rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
