import React, { useState } from 'react';
import { SERVICES } from '../../constants';
import type { Service, Page } from '../../types';
import ServiceModal from './ServiceModal';

const ServiceCard: React.FC<{ service: Service; onClick: () => void }> = ({ service, onClick }) => {
  let priceDisplay = '';
  if (service.pricing.type === 'fixed' || service.pricing.type === 'quote') {
    priceDisplay = service.pricing.priceText;
  } else if (service.pricing.type === 'packages') {
    const sedanPrice = service.pricing.vehicleTypes['Sedan / Sports Car']['Silver'];
    priceDisplay = `Starts at AED ${sedanPrice}`;
  } else if (service.pricing.type === 'tiered') {
     priceDisplay = `Starts at AED ${service.pricing.basePrice}`;
  }


  return (
    <button
      onClick={onClick}
      className="bg-white p-8 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-white"
      aria-label={`View details for ${service.title}`}
    >
      <div className="text-brand-cyan mb-4">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold text-brand-dark mb-2">{service.title}</h3>
      <p className="text-brand-gray text-sm flex-grow">{service.description.split('.')[0]}.</p>
      <span className="mt-4 text-brand-cyan font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        View Details &rarr;
      </span>
    </button>
  );
};

interface ServicesProps {
    navigateTo: (page: Page) => void;
}

const Services: React.FC<ServicesProps> = ({ navigateTo }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const openModal = (service: Service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <section id="services" className="py-20 bg-brand-light-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark">Our Premium Services</h2>
            <p className="mt-4 text-lg text-brand-gray max-w-2xl mx-auto">
              We offer a comprehensive range of detailing services to meet your vehicle's specific needs. Click a service for more details.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} onClick={() => openModal(service)} />
            ))}
          </div>
        </div>
      </section>
      
      {selectedService && (
        <ServiceModal service={selectedService} onClose={closeModal} navigateTo={navigateTo} />
      )}
    </>
  );
};

export default Services;