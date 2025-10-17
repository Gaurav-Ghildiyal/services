import React from 'react';

export interface AddOn {
  name: string;
  description: string;
}

export interface Service {
  // FIX: Updated the type for `icon` to be more specific. This allows `React.cloneElement` to pass a `className` prop without a TypeScript error.
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
  duration: string;
  pricing: string;
  addOns: AddOn[];
}

export type Page = 'home' | 'booking' | 'location' | 'invoice';
