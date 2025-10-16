
import React from 'react';

const GalleryImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <div className="overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

const Gallery: React.FC = () => {
  const images = [
    { src: 'https://picsum.photos/600/800?random=10', alt: 'Red sports car' },
    { src: 'https://picsum.photos/800/600?random=11', alt: 'Close-up of a detailed wheel' },
    { src: 'https://picsum.photos/600/800?random=12', alt: 'Blue luxury car' },
    { src: 'https://picsum.photos/600/400?random=13', alt: 'Shiny car hood' },
    { src: 'https://picsum.photos/600/400?random=14', alt: 'Pristine car interior' },
    { src: 'https://picsum.photos/800/600?random=15', alt: 'White supercar' },
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="col-span-2 row-span-2">
            <GalleryImage src={images[0].src} alt={images[0].alt} />
          </div>
          <div>
            <GalleryImage src={images[1].src} alt={images[1].alt} />
          </div>
          <div className="col-span-2 md:col-span-1">
            <GalleryImage src={images[2].src} alt={images[2].alt} />
          </div>
          <div>
            <GalleryImage src={images[3].src} alt={images[3].alt} />
          </div>
          <div>
            <GalleryImage src={images[4].src} alt={images[4].alt} />
          </div>
           <div className="col-span-2">
            <GalleryImage src={images[5].src} alt={images[5].alt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;