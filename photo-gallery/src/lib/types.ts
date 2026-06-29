export type PlanId = 'starter' | 'pro' | 'studio';

export interface User {
  id: string;
  name: string;
  email: string;
  studioName: string;
  avatarSeed: string;
  plan: PlanId;
  createdAt: string;
}

export type GalleryStatus = 'published' | 'draft' | 'archived';
export type GalleryLayout = 'grid' | 'masonry' | 'columns';

export interface Photo {
  id: string;
  seed: string;
  width: number;
  height: number;
  filename: string;
  favorite?: boolean;
  /** Client favorites keyed by email address. */
  favoritedBy?: string[];
}

export interface Collection {
  id: string;
  title: string;
  /** URL-safe slug used for the public client link. */
  slug: string;
  coverSeed: string;
  description: string;
  eventDate: string;
  status: GalleryStatus;
  layout: GalleryLayout;
  /** Optional PIN to protect the public gallery. */
  pin?: string;
  allowDownloads: boolean;
  allowFavorites: boolean;
  storeEnabled: boolean;
  photos: Photo[];
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  tagline: string;
  storage: string;
  highlight?: boolean;
  features: string[];
  cta: string;
}
