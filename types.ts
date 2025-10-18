import React from 'react';

export interface AddOn {
  name: string;
  description: string;
}

export type VehicleType = 'Sedan / Sports Car' | 'SUV';

export interface Package {
  name: 'Silver' | 'Gold' | 'Platinum';
  price: number;
  warranty: string;
  features: string[];
}

export interface PackagePricing {
  type: 'packages';
  vehicleTypes: {
    // Using a mapped type to ensure both vehicle types are present
    [key in VehicleType]: {
      'Silver': number;
      'Gold': number;
      'Platinum': number;
    }
  };
}

export interface TieredPricing {
    type: 'tiered';
    description: string;
    basePrice: number;
}

export interface FixedPricing {
    type: 'fixed';
    priceText: string;
}

export interface QuotePricing {
    type: 'quote';
    priceText: string;
}

export type PricingStructure = PackagePricing | TieredPricing | FixedPricing | QuotePricing;

export interface Service {
  icon: React.ReactElement<{ className?: string }>;
  title: string;
  description: string;
  duration: string;
  pricing: PricingStructure;
  addOns: AddOn[];
}

export type Page = 'home' | 'booking' | 'location' | 'invoiceGenerator';