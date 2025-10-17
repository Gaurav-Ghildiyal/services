import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="/images/about-us.jpg" 
              alt="Detailing technician carefully polishing a luxury car"
              className="rounded-2xl shadow-2xl object-cover w-full h-full"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-brand-dark mb-4">
              Our Passion, Your <span className="text-brand-cyan">Perfection</span>
            </h2>
            <p className="text-brand-gray mb-4 leading-relaxed">
              At Gulf Detailing Customs, we are more than just detailers; we are automotive enthusiasts dedicated to the art of vehicle perfection. Founded on a passion for cars and an obsession with detail, our mission is to provide an unmatched level of service that protects your investment and rekindles your love for your vehicle.
            </p>
            <p className="text-brand-gray leading-relaxed">
              Using only the finest products and most advanced techniques, our certified technicians ensure every inch of your car receives the meticulous care it deserves. From daily drivers to exotic supercars, we guarantee a finish that will exceed your expectations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;