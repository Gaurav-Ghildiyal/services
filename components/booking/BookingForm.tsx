
import React, { useState } from 'react';
import { SERVICES } from '../../constants';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carModel: '',
    services: [] as string[],
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, services: [...prev.services, value] };
      } else {
        return { ...prev, services: prev.services.filter((service) => service !== value) };
      }
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (formData.services.length === 0) newErrors.services = 'Please select at least one service.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      console.log('Form Submitted:', formData);
      setStatus('success');
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', carModel: '', services: [], message: '' });
        setStatus('idle');
      }, 5000);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="text-center p-8 bg-cyan-50 border border-cyan-200 rounded-lg">
        <h3 className="text-2xl font-bold text-cyan-900 mb-2">Thank You!</h3>
        <p className="text-cyan-800">Your inquiry has been sent successfully. We will contact you within 24 hours to confirm the details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-gray mb-2">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-brand-light-bg border border-gray-300 text-brand-dark rounded-lg p-3 focus:ring-2 focus:ring-brand-cyan focus:outline-none" required />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-gray mb-2">Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-brand-light-bg border border-gray-300 text-brand-dark rounded-lg p-3 focus:ring-2 focus:ring-brand-cyan focus:outline-none" required />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-gray mb-2">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-brand-light-bg border border-gray-300 text-brand-dark rounded-lg p-3 focus:ring-2 focus:ring-brand-cyan focus:outline-none" required />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="carModel" className="block text-sm font-medium text-brand-gray mb-2">Car Make & Model</label>
          <input type="text" id="carModel" name="carModel" value={formData.carModel} onChange={handleInputChange} className="w-full bg-brand-light-bg border border-gray-300 text-brand-dark rounded-lg p-3 focus:ring-2 focus:ring-brand-cyan focus:outline-none" />
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-brand-gray mb-2">Services Interested In</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SERVICES.map(service => (
            <label key={service.title} className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" value={service.title} checked={formData.services.includes(service.title)} onChange={handleCheckboxChange} className="h-5 w-5 rounded bg-gray-100 border-gray-300 text-brand-cyan focus:ring-brand-cyan"/>
              <span className="text-brand-gray">{service.title}</span>
            </label>
          ))}
        </div>
        {errors.services && <p className="text-red-600 text-sm mt-2">{errors.services}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-brand-gray mb-2">Additional Message</label>
        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} className="w-full bg-brand-light-bg border border-gray-300 text-brand-dark rounded-lg p-3 focus:ring-2 focus:ring-brand-cyan focus:outline-none"></textarea>
      </div>

      <button type="submit" disabled={status === 'submitting'} className="w-full bg-brand-cyan text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:bg-gray-400 disabled:cursor-wait">
        {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
      </button>
    </form>
  );
};

export default BookingForm;