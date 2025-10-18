import React, { useEffect, useState, useMemo } from 'react';
import type { Service, Page, VehicleType, Package } from '../../types';
import { CERAMIC_PACKAGES } from '../../constants';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
  navigateTo: (page: Page) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, navigateTo }) => {
  const [view, setView] = useState<'details' | 'pricing'>('details');
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<'Silver' | 'Gold' | 'Platinum' | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleBookNow = () => {
    onClose();
    navigateTo('booking');
  };

  const calculatedPrice = useMemo(() => {
    if (service.pricing.type !== 'packages' || !selectedVehicleType || !selectedPackage) {
      return null;
    }
    return service.pricing.vehicleTypes[selectedVehicleType][selectedPackage];
  }, [service, selectedVehicleType, selectedPackage]);

  const renderPricing = () => {
    if (service.pricing.type === 'fixed' || service.pricing.type === 'quote') {
        return <p className="text-brand-dark text-lg">{service.pricing.priceText}</p>
    }
    if (service.pricing.type === 'tiered') {
        return <p className="text-brand-dark text-lg">Starts at AED {service.pricing.basePrice}</p>
    }
     if (service.pricing.type === 'packages') {
        const basePrice = service.pricing.vehicleTypes['Sedan / Sports Car']['Silver'];
        return <p className="text-brand-dark text-lg">Starts at AED {basePrice}</p>
    }
    return <p className="text-brand-dark text-lg">Contact for Pricing</p>
  }
  
  const renderDetailsView = () => (
    <>
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
                {renderPricing()}
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

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
           <button onClick={onClose} className="px-6 py-3 bg-gray-200 text-brand-dark font-bold text-sm rounded-lg hover:bg-gray-300 transition-all">
            Close
          </button>
           { (service.pricing.type === 'packages' || service.pricing.type === 'tiered') &&
             <button onClick={() => setView('pricing')} className="px-6 py-3 bg-brand-dark text-white font-bold text-sm rounded-lg hover:bg-gray-700 transition-all">
                Check Pricing
             </button>
           }
           <button onClick={handleBookNow} className="px-6 py-3 bg-brand-cyan text-white font-bold text-sm rounded-lg hover:opacity-90 transition-all">
                Book This Service
           </button>
        </div>
    </>
  );

  const renderPricingView = () => {
    if (service.pricing.type === 'tiered') {
        return (
             <div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">Pricing Information</h3>
                <div className="prose prose-sm max-w-none text-brand-gray bg-gray-50 p-4 rounded-lg">
                    {service.pricing.description.split('\n').map((line, i) => {
                        if (line.startsWith('**')) {
                            return <p key={i} className="font-bold text-brand-dark mt-2">{line.replace(/\*\*/g, '')}</p>
                        }
                        return <p key={i}>{line}</p>
                    })}
                </div>
                 <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
                    <button onClick={() => setView('details')} className="px-6 py-3 bg-gray-200 text-brand-dark font-bold text-sm rounded-lg hover:bg-gray-300">Back</button>
                    <button onClick={handleBookNow} className="px-6 py-3 bg-brand-cyan text-white font-bold text-sm rounded-lg hover:opacity-90">Book Now</button>
                </div>
            </div>
        )
    }

    if (service.pricing.type !== 'packages') return null;
    const vehicleTypes: VehicleType[] = ['Sedan / Sports Car', 'SUV'];
    const packages: ('Silver' | 'Gold' | 'Platinum')[] = ['Silver', 'Gold', 'Platinum'];

    return (
        <div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Calculate Your Price</h3>
            
            {/* Vehicle Type Selection */}
            <div className="mb-6">
                <h4 className="font-semibold text-brand-cyan mb-3 uppercase tracking-wider text-sm">1. Select Vehicle Type</h4>
                <div className="grid grid-cols-2 gap-3">
                    {vehicleTypes.map(type => (
                        <button key={type} onClick={() => setSelectedVehicleType(type)} className={`p-4 rounded-lg border-2 text-center transition-all ${selectedVehicleType === type ? 'bg-brand-cyan text-white border-brand-cyan' : 'bg-white hover:border-brand-cyan border-gray-200'}`}>
                            <span className="font-bold">{type}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Package Selection */}
            {selectedVehicleType && (
                <div className="mb-6 animate-scale-in origin-top">
                    <h4 className="font-semibold text-brand-cyan mb-3 uppercase tracking-wider text-sm">2. Select Package</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {packages.map(pkg => (
                            <button key={pkg} onClick={() => setSelectedPackage(pkg)} className={`p-4 rounded-lg border-2 text-left transition-all flex flex-col justify-between h-full ${selectedPackage === pkg ? 'bg-brand-cyan text-white border-brand-cyan' : 'bg-white hover:border-brand-cyan border-gray-200'}`}>
                               <div>
                                 <h5 className="font-bold text-lg">{pkg}</h5>
                                 <p className="text-xs opacity-80 mb-2">{CERAMIC_PACKAGES[pkg].warranty} Warranty</p>
                                 <ul className="text-xs list-disc list-inside space-y-1 opacity-90">
                                   {CERAMIC_PACKAGES[pkg].features.map(f => <li key={f}>{f}</li>)}
                                 </ul>
                               </div>
                                <p className={`font-bold text-right mt-3 text-lg ${selectedPackage === pkg ? 'text-white' : 'text-brand-dark'}`}>
                                    AED {service.pricing.type === 'packages' && service.pricing.vehicleTypes[selectedVehicleType][pkg]}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Total & Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                     <button onClick={() => setView('details')} className="text-sm font-semibold text-brand-dark hover:text-brand-cyan">&larr; Back to Details</button>
                </div>
                <div className="flex items-center gap-4">
                    {calculatedPrice && (
                         <div className="text-right">
                            <span className="text-sm text-brand-gray">Total Price</span>
                            <p className="font-bold text-2xl text-brand-cyan">AED {calculatedPrice}</p>
                        </div>
                    )}
                    <button onClick={handleBookNow} disabled={!calculatedPrice} className="px-6 py-3 bg-brand-cyan text-white font-bold text-sm rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 animate-scale-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-brand-dark transition-colors z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {view === 'details' ? renderDetailsView() : renderPricingView()}
      </div>
    </div>
  );
};

export default ServiceModal;
