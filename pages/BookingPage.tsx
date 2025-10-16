
import React from 'react';
import BookingForm from '../components/booking/BookingForm';

const BookingPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight">Book Your <span className="text-brand-cyan">Transformation</span></h1>
            <p className="mt-4 text-lg text-brand-gray">Fill out the form below to schedule your appointment or request a quote. We'll get back to you shortly.</p>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-200">
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;