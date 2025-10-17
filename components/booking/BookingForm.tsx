import React, { useState } from 'react';
import { SERVICES } from '../../constants';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    services: [] as string[],
    date: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, services: [...prev.services, value] };
      } else {
        return { ...prev, services: prev.services.filter(service => service !== value) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      alert('Please select at least one service.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionStatus(null);

    const formspreeEndpoint = 'https://formspree.io/f/mjkajlny';

    const dataToSend = {
      ...formData,
      services: formData.services.join(', '),
    };

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          vehicle: '',
          services: [],
          date: '',
          message: '',
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:bg-white transition-all duration-300 text-brand-dark placeholder-brand-gray";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submissionStatus === 'success' && (
        <div className="p-4 bg-green-100 text-green-800 border border-green-200 rounded-lg text-center">
            Thank you! Your request has been sent successfully. We will get back to you shortly.
        </div>
      )}
      {submissionStatus === 'error' && (
        <div className="p-4 bg-red-100 text-red-800 border border-red-200 rounded-lg text-center">
            Sorry, there was an error submitting your request. Please try again later or contact us directly.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-dark mb-2">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-2">Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder="john.doe@example.com" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-dark mb-2">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className={inputClasses} placeholder="(123) 456-7890" />
        </div>
        <div>
          <label htmlFor="vehicle" className="block text-sm font-medium text-brand-dark mb-2">Vehicle Make &amp; Model</label>
          <input type="text" id="vehicle" name="vehicle" value={formData.vehicle} onChange={handleChange} required className={inputClasses} placeholder="e.g., Porsche 911 GT3" />
        </div>
      </div>
       <div className="space-y-3">
        <label className="block text-sm font-medium text-brand-dark">Select Service(s)</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SERVICES.map(service => (
            <div key={service.title} className="flex items-center">
              <input
                type="checkbox"
                id={service.title}
                name="services"
                value={service.title}
                checked={formData.services.includes(service.title)}
                onChange={handleServiceChange}
                className="h-4 w-4 text-brand-cyan border-gray-300 rounded focus:ring-brand-cyan"
              />
              <label htmlFor={service.title} className="ml-2 block text-sm text-brand-dark">
                {service.title}
              </label>
            </div>
          ))}
        </div>
       </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-brand-dark mb-2">Preferred Date</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className={inputClasses} min={new Date().toISOString().split('T')[0]}/>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-dark mb-2">Additional Message (Optional)</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className={inputClasses} placeholder="Let us know about any specific requests or questions..."></textarea>
      </div>
      <div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-brand-cyan text-white font-bold text-lg rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Request Appointment'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;