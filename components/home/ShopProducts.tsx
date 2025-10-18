import React from 'react';

const ShopProducts: React.FC = () => {
  return (
    <section id="shop" className="relative py-20 text-center text-white bg-brand-dark">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/shop-products-background.jpg')" }}
      ></div>
      <div className="relative z-10 container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Use What the <span className="text-brand-cyan">Pros</span> Use
        </h2>
        <p className="mt-4 mb-8 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
          Achieve a professional finish at home. We offer the same premium, high-performance detailing products that our expert technicians trust every day.
        </p>
        <a
          href="https://gulfdetailing.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-brand-cyan text-white font-bold text-lg rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Shop Our Products
        </a>
      </div>
    </section>
  );
};

export default ShopProducts;