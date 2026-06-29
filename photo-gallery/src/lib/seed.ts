import type { Collection, Photo } from './types';
import { uid } from './utils';

function makePhotos(prefix: string, count: number): Photo[] {
  return Array.from({ length: count }, (_, i) => {
    // Mix landscape & portrait orientations so masonry looks natural.
    const portrait = i % 3 === 0;
    return {
      id: uid('ph'),
      seed: `${prefix}-${i}`,
      width: portrait ? 800 : 1200,
      height: portrait ? 1200 : 800,
      filename: `${prefix.toUpperCase()}_${String(i + 1).padStart(4, '0')}.jpg`,
      favoritedBy: [],
    } satisfies Photo;
  });
}

const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * 86400000).toISOString();

export const SEED_COLLECTIONS: Collection[] = [
  {
    id: uid('col'),
    title: 'Elena & James — Wedding',
    slug: 'elena-james-wedding',
    coverSeed: 'wedding-cover',
    description: 'A golden-hour celebration at Vine & Stone Vineyard.',
    eventDate: daysAgo(12),
    status: 'published',
    layout: 'masonry',
    pin: '1224',
    allowDownloads: true,
    allowFavorites: true,
    storeEnabled: true,
    photos: makePhotos('wed', 24),
    views: 1284,
    createdAt: daysAgo(14),
    updatedAt: daysAgo(2),
  },
  {
    id: uid('col'),
    title: 'The Hart Family',
    slug: 'hart-family-autumn',
    coverSeed: 'family-cover',
    description: 'Autumn portraits in Maple Grove Park.',
    eventDate: daysAgo(5),
    status: 'published',
    layout: 'grid',
    allowDownloads: true,
    allowFavorites: true,
    storeEnabled: false,
    photos: makePhotos('fam', 18),
    views: 412,
    createdAt: daysAgo(6),
    updatedAt: daysAgo(1),
  },
  {
    id: uid('col'),
    title: 'Aria — Brand Shoot',
    slug: 'aria-brand-shoot',
    coverSeed: 'brand-cover',
    description: 'Editorial product & lifestyle set for Aria Skincare.',
    eventDate: daysAgo(1),
    status: 'draft',
    layout: 'columns',
    allowDownloads: false,
    allowFavorites: true,
    storeEnabled: false,
    photos: makePhotos('brand', 12),
    views: 0,
    createdAt: daysAgo(1),
    updatedAt: daysAgo(0),
  },
  {
    id: uid('col'),
    title: 'Coastal Engagement',
    slug: 'coastal-engagement',
    coverSeed: 'engage-cover',
    description: 'Sunset engagement session on the Amalfi cliffs.',
    eventDate: daysAgo(30),
    status: 'archived',
    layout: 'masonry',
    allowDownloads: true,
    allowFavorites: true,
    storeEnabled: true,
    photos: makePhotos('eng', 16),
    views: 906,
    createdAt: daysAgo(32),
    updatedAt: daysAgo(20),
  },
];
