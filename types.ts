import type { ReactElement } from 'react';

export type Page = 'home' | 'booking';

export interface AddOn {
  name: string;
  description: string;
}

export interface Service {
  // FIX: Explicitly type icon props as `any` to allow cloning with new props.
  icon: ReactElement<any>;
  title: string;
  description: string;
  duration: string;
  pricing: string;
  addOns: AddOn[];
}
