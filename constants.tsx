import React from 'react';
import type { Service } from './types';

export const SERVICES: Service[] = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9v6h16V9" /></svg>,
    title: 'Interior Detailing',
    description: 'A deep clean of your vehicle\'s interior. We vacuum, shampoo, and condition every surface to restore its pristine look and feel.',
    duration: '4-6 Hours',
    pricing: { type: 'fixed', priceText: 'Starts at AED 250' },
    addOns: [
      { name: 'Ozone Treatment', description: 'Eliminates stubborn odors from smoke, pets, and mildew.' },
      { name: 'Premium Leather Conditioning', description: 'Nourishes and protects leather surfaces to prevent cracking.' },
    ],
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l-3 3m0 0l-3 3m3-3l3 3m-3-3v12" /></svg>,
    title: 'Exterior Detailing',
    description: 'Comprehensive exterior wash, clay bar treatment, and sealant application to protect your paint and bring out a brilliant shine.',
    duration: '3-5 Hours',
    pricing: { type: 'fixed', priceText: 'Starts at AED 200' },
    addOns: [
      { name: 'Engine Bay Detailing', description: 'Safely cleans and protects the engine compartment.' },
      { name: 'Headlight Restoration', description: 'Restores clarity to foggy or yellowed headlights.' },
    ],
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Paint Correction & Polishing',
    description: 'Removal of swirls, scratches, and imperfections from your paintwork, restoring a flawless, mirror-like finish.',
    duration: '8-16 Hours',
    pricing: { type: 'fixed', priceText: 'Starts at AED 600' },
    addOns: [
      { name: 'Glass Polishing', description: 'Removes water spots and minor scratches from glass.' },
      { name: 'Exterior Trim Restoration', description: 'Brings faded plastic trim back to a deep, black finish.' },
    ],
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    title: 'Ceramic Coating',
    description: 'Protect your vehicle with a durable, high-gloss ceramic layer. Our packages offer varying levels of longevity and protection, including paint polishing and clay bar treatment as standard. Choose the right package for your needs.',
    duration: '1-4 Days',
    pricing: {
      type: 'packages',
      vehicleTypes: {
        'Sedan / Sports Car': {
          'Silver': 1000,
          'Gold': 1500,
          'Platinum': 2200,
        },
        'SUV': {
          'Silver': 1200,
          'Gold': 1800,
          'Platinum': 2500,
        },
      },
    },
    addOns: [],
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m4 0h1" /></svg>,
    title: 'Paint Protection Film (PPF)',
    description: 'A transparent, self-healing film to protect from rock chips and scratches. All prices include surface preparation, professional installation, up to 10 years warranty, and optional ceramic coating. Prices may vary based on finish, brand, and vehicle condition.',
    duration: '2-4 Days',
    pricing: {
        type: 'tiered',
        description: `**Standard Vehicles**\n- Sedan (e.g., BMW 5 Series): Starts at AED 8,000\n- SUV (e.g., Range Rover Sport): Starts at AED 10,000\n\n**Premium Vehicles**\n- Mercedes G-Class: AED 12,000\n- BMW 7 Series (LWB): AED 11,000\n- Rolls-Royce Cullinan: AED 14,000\n- Ferrari / Lamborghini: AED 13,000–15,000`,
        basePrice: 8000,
    },
    addOns: [
      { name: 'Full Front Coverage', description: 'Includes full hood, fenders, bumper, and mirrors.' },
      { name: 'Track Package', description: 'Adds coverage for rocker panels and rear impact areas.' },
    ],
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4H7zm0 0a4 4 0 004-4V5a2 2 0 00-2-2H7a2 2 0 00-2 2v12a4 4 0 004 4zm0 0l-1-1" /></svg>,
    title: 'Color Change Wrapping',
    description: 'Change your car\'s appearance with a custom vinyl wrap. All prices include surface preparation and professional installation. Prices may vary based on finish (gloss/matte), brand, and vehicle condition.',
    duration: '3-5 Days',
    pricing: {
        type: 'tiered',
        description: `**Standard Vehicles**\n- Sedan (e.g., BMW 5 Series): Starts at AED 8,000\n- SUV (e.g., Porsche Cayenne): Starts at AED 10,000\n\n**Premium Vehicles**\n- Mercedes G-Class: AED 12,000\n- BMW 7 Series (LWB): AED 11,000\n- Rolls-Royce Cullinan: AED 14,000\n- Ferrari / Lamborghini: AED 13,000–15,000`,
        basePrice: 8000,
    },
    addOns: [
      { name: 'Chrome Delete', description: 'Covers all chrome trim in black or another color.' },
      { name: 'Custom Graphics & Livery', description: 'Add a personal touch with custom-designed graphics.' },
    ],
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2.031c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path></svg>,
    title: 'Window Tint',
    description: 'Professional window tinting for enhanced privacy, UV protection, and a sleek, custom look.',
    duration: '2-4 Hours',
    pricing: { type: 'fixed', priceText: 'Starts at AED 350' },
    addOns: [
      { name: 'Ceramic Tint Upgrade', description: 'Superior heat rejection and clarity compared to standard tint.' },
      { name: 'Windshield Tint', description: 'A nearly clear film that blocks UV rays and heat.' },
    ],
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>,
    title: 'Paintless Dent Repair (PDR)',
    description: 'An innovative process to remove minor dents and dings from your vehicle\'s body panels without affecting the original paint.',
    duration: '1-4 Hours',
    pricing: { type: 'quote', priceText: 'Quote Per Dent' },
    addOns: [
      { name: 'Minor Scratch Touch-up', description: 'Conceal small scratches in the affected area.' },
      { name: 'Panel Polish', description: 'Polish the repaired panel to ensure a perfect finish.' },
    ],
  },
   {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a2 2 0 100-4 2 2 0 000 4z" /></svg>,
    title: 'Face Lift',
    description: 'Upgrade your vehicle\'s look with modern body kits, lighting, and accessories for a complete aesthetic transformation.',
    duration: 'Project Dependant',
    pricing: { type: 'quote', priceText: 'Quote-Based' },
    addOns: [
      { name: 'Interior Customization', description: 'Custom upholstery, lighting, and trim.' },
      { name: 'Performance Upgrades', description: 'Enhancements for exhaust, suspension, and more.' },
    ],
  },
];

export const CERAMIC_PACKAGES = {
    'Silver': { warranty: '2-Year', features: ['Ceramic Coating', 'Clay Bar', 'Car Polishing'] },
    'Gold': { warranty: '5-Year', features: ['Everything in Silver', 'Steam Cleaner', 'Wheels Detailing & Coating', 'Engine Detailing', 'Interior Detailing & Coating'] },
    'Platinum': { warranty: '10-Year', features: ['Everything in Gold', 'Highest-grade coating'] }
};