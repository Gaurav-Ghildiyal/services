import React from 'react';

const GalleryImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="mb-4 break-inside-avoid overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

const Gallery: React.FC = () => {
  const images = [
    { src: '/images/gallery-image-01.jpg', alt: 'Side profile of a glossy blue McLaren sports car' },
    { src: '/images/gallery-image-02.jpg', alt: 'Clean, modern white interior of a luxury vehicle' },
    { src: '/images/gallery-image-03.jpg', alt: 'Dynamic shot of a red Ferrari in motion after detailing' },
    { src: '/images/gallery-image-04.jpg', alt: 'Hydrophobic effect showing water beading on a black car hood' },
    { src: '/images/gallery-image-05.jpg', alt: 'Front view of a classic yellow Lamborghini Miura' },
    { src: '/images/gallery-image-06.jpg', alt: 'A perfectly detailed black Mercedes G-Wagon' },
    { src: '/images/gallery-image-07.jpg', alt: 'Close-up of a crystal clear modern headlight' },
    { src: '/images/gallery-image-08.jpg', alt: 'A classic blue Ford Mustang with a flawless finish' },
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