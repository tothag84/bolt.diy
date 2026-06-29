import type { Plan } from './types';

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 0,
    priceYearly: 0,
    tagline: 'For hobbyists sharing their first galleries.',
    storage: '3 GB storage',
    cta: 'Start free',
    features: [
      '3 active client galleries',
      'Up to 200 photos / gallery',
      'Client favorites & comments',
      'Mobile-friendly slideshow',
      'Lumière branding',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 19,
    priceYearly: 180,
    tagline: 'Everything a working photographer needs.',
    storage: '500 GB storage',
    highlight: true,
    cta: 'Start 14-day trial',
    features: [
      'Unlimited galleries & photos',
      'Custom branding & logo',
      'PIN-protected private galleries',
      'High-res downloads with controls',
      'Digital download store',
      'Custom domain',
    ],
  },
  {
    id: 'studio',
    name: 'Studio',
    priceMonthly: 39,
    priceYearly: 372,
    tagline: 'Scale your studio with sales & automation.',
    storage: 'Unlimited storage',
    cta: 'Start 14-day trial',
    features: [
      'Everything in Pro',
      'Print store with lab fulfillment',
      'Automated client emails',
      'Multiple team seats',
      'Sales tax & coupon tools',
      'Priority support',
    ],
  },
];

export function planById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}
