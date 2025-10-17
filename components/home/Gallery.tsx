import React from 'react';

const GalleryImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="mb-4 break-inside-avoid overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

const Gallery: React.FC = () => {
  const images = [
    { src: '/images/gallery-1.jpg', alt: 'Close-up of a glossy red sports car with perfect paint' },
    { src: '/images/gallery-2.jpg', alt: 'Immaculate luxury car interior with clean leather seats and dashboard' },
    { src: '/images/gallery-3.jpg', alt: 'Water beading on a car with hydrophobic ceramic coating' },
    { src: '/images/gallery-4.jpg', alt: 'Close-up of a perfectly clean and detailed alloy wheel and tire' },
    { src: '/images/gallery-5.jpg', alt: 'Rear view of a gleaming black sports car after detailing' },
    { src: '/images/gallery-6.jpg', alt: 'White luxury sedan with a brilliant shine' },
    { src: '/images/gallery-7.jpg', alt: 'Side profile of a red sports car, showcasing its sleek lines' },
    { src: '/images/gallery-8.jpg', alt: 'Crystal clear headlight on a modern car after restoration' },
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark">Our Masterpieces</h2>
          <p className="mt-4 text-lg text-brand-gray max-w-2xl mx-auto">
            A glimpse into the transformations we perform daily. The results speak for themselves.
          </p>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.map((image, index) => (
            <GalleryImage key={index} src={image.src} alt={image.alt} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;