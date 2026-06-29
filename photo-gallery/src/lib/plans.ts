import type { Collection, PlanId } from './types';

/** Rough average size used to estimate storage in the demo. */
export const PER_PHOTO_MB = 2.5;

export interface Plan {
  id: PlanId;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  galleries: number;
  storageMb: number;
  blurb: string;
  cta: string;
  highlight?: boolean;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    priceMonthly: 0,
    priceYearly: 0,
    galleries: 5,
    storageMb: 500,
    blurb: 'Everything you need to start sharing — free forever.',
    cta: 'Get started',
    features: [
      'Up to 5 galleries',
      '500 MB total storage',
      'Client favorites & downloads',
      'PIN-protected galleries',
      'Tips from clients',
    ],
  },
  {
    id: 'pro',
    name: 'Plus',
    priceMonthly: 5,
    priceYearly: 50,
    galleries: 25,
    storageMb: 2048,
    blurb: 'More room as your work grows.',
    cta: 'Upgrade',
    highlight: true,
    features: ['Up to 25 galleries', '2 GB total storage', 'Everything in Free'],
  },
];

export function planById(id: PlanId): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}

/** Estimated storage used (MB) across all collections. */
export function storageUsedMb(collections: Collection[]): number {
  const photos = collections.reduce((n, c) => n + c.photos.length, 0);
  return Math.round(photos * PER_PHOTO_MB);
}

export function formatStorage(mb: number): string {
  if (mb >= 1024) {
    const gb = mb / 1024;
    return `${Number.isInteger(gb) ? gb : gb.toFixed(1)} GB`;
  }
  return `${Math.round(mb)} MB`;
}
