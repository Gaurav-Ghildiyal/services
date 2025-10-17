import React from 'react';

const LocationPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-16 bg-white text-brand-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Visit Our <span className="text-brand-cyan">State-of-the-Art Facility</span>
            </h1>
            <p className="mt-4 text-lg text-brand-gray">
              Experience the pinnacle of automotive care in a facility designed for perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Map */}
            <div className="w-full h-80 md:h-full bg-gray-200 rounded-2xl shadow-lg">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178650344409!2d55.27078231500966!3d25.19719698389622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a6e45b1%3A0x34241e7a5c4e7b8c!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1617260559661!5m2!1sen!2sae" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false}
                loading="lazy"
                title="Google Map of Gulf Detailing Customs Location"
                className="rounded-2xl"
              ></iframe>
            </div>

            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-brand-cyan mb-2">Address</h3>
                <p className="text-lg text-brand-gray">123 Luxury Lane, Dubai, UAE</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-cyan mb-2">Contact</h3>
                <p className="text-lg text-brand-gray">
                  Email: <a href="mailto:contact@gulfcustoms.com" className="hover:underline">contact@gulfcustoms.com</a>
                </p>
                <p className="text-lg text-brand-gray">
                  Phone: <a href="tel:+1234567890" className="hover:underline">(123) 456-7890</a>
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-cyan mb-2">Business Hours</h3>
                <ul className="text-lg text-brand-gray space-y-1">
                  <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
                  <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
                  <li><strong>Sunday:</strong> Closed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
