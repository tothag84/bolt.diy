import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Collection, Photo, User } from './types';
import { SEED_COLLECTIONS } from './seed';
import { uid } from './utils';

/* -------------------------------------------------------------------------- */
/*  Auth store                                                                 */
/* -------------------------------------------------------------------------- */

interface AuthState {
  user: User | null;
  signUp: (data: { name: string; email: string; studioName: string }) => User;
  signIn: (email: string) => User;
  signOut: () => void;
  updateUser: (patch: Partial<User>) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      signUp: ({ name, email, studioName }) => {
        const user: User = {
          id: uid('usr'),
          name,
          email,
          studioName: studioName || `${name.split(' ')[0]}'s Studio`,
          avatarSeed: email,
          createdAt: new Date().toISOString(),
        };
        set({ user });
        return user;
      },
      signIn: (email) => {
        const existing = get().user;
        const user: User =
          existing && existing.email === email
            ? existing
            : {
                id: uid('usr'),
                name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
                email,
                studioName: 'My Studio',
                avatarSeed: email,
                createdAt: new Date().toISOString(),
              };
        set({ user });
        return user;
      },
      signOut: () => set({ user: null }),
      updateUser: (patch) => set((s) => (s.user ? { user: { ...s.user, ...patch } } : s)),
    }),
    { name: 'lumiere-auth' },
  ),
);

/* -------------------------------------------------------------------------- */
/*  Galleries store                                                            */
/* -------------------------------------------------------------------------- */

interface GalleryState {
  collections: Collection[];
  createCollection: (data: Partial<Collection>) => Collection;
  updateCollection: (id: string, patch: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  addPhotos: (id: string, count: number) => void;
  removePhoto: (collectionId: string, photoId: string) => void;
  /** Toggle a client favorite (keyed by client email) on the public gallery. */
  toggleClientFavorite: (slug: string, photoId: string, clientEmail: string) => void;
  /** Record a tip / donation on a gallery (demo). */
  addTip: (slug: string, amount: number) => void;
  incrementViews: (slug: string) => void;
  bySlug: (slug: string) => Collection | undefined;
  byId: (id: string) => Collection | undefined;
  reset: () => void;
}

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `gallery-${uid('s').slice(-4)}`
  );
}

function newPhotos(count: number): Photo[] {
  return Array.from({ length: count }, () => {
    const portrait = Math.random() > 0.66;
    const s = uid('seed');
    return {
      id: uid('ph'),
      seed: s,
      width: portrait ? 800 : 1200,
      height: portrait ? 1200 : 800,
      filename: `IMG_${String(Math.floor(1000 + Math.random() * 8999))}.jpg`,
      favoritedBy: [],
    };
  });
}

export const useGalleries = create<GalleryState>()(
  persist(
    (set, get) => ({
      collections: SEED_COLLECTIONS,
      createCollection: (data) => {
        const title = data.title || 'Untitled Collection';
        const col: Collection = {
          id: uid('col'),
          title,
          slug: data.slug || slugify(title),
          coverSeed: data.coverSeed || uid('cover'),
          description: data.description || '',
          eventDate: data.eventDate || new Date().toISOString(),
          status: data.status || 'draft',
          layout: data.layout || 'masonry',
          pin: data.pin,
          allowDownloads: data.allowDownloads ?? true,
          allowFavorites: data.allowFavorites ?? true,
          tipsEnabled: data.tipsEnabled ?? true,
          photos: data.photos || newPhotos(9),
          views: 0,
          tipCount: 0,
          tipTotal: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((s) => ({ collections: [col, ...s.collections] }));
        return col;
      },
      updateCollection: (id, patch) =>
        set((s) => ({
          collections: s.collections.map((c) =>
            c.id === id ? { ...c, ...patch, updatedAt: new Date().toISOString() } : c,
          ),
        })),
      deleteCollection: (id) => set((s) => ({ collections: s.collections.filter((c) => c.id !== id) })),
      addPhotos: (id, count) =>
        set((s) => ({
          collections: s.collections.map((c) =>
            c.id === id ? { ...c, photos: [...c.photos, ...newPhotos(count)], updatedAt: new Date().toISOString() } : c,
          ),
        })),
      removePhoto: (collectionId, photoId) =>
        set((s) => ({
          collections: s.collections.map((c) =>
            c.id === collectionId ? { ...c, photos: c.photos.filter((p) => p.id !== photoId) } : c,
          ),
        })),
      toggleClientFavorite: (slug, photoId, clientEmail) =>
        set((s) => ({
          collections: s.collections.map((c) => {
            if (c.slug !== slug) return c;
            return {
              ...c,
              photos: c.photos.map((p) => {
                if (p.id !== photoId) return p;
                const set0 = new Set(p.favoritedBy ?? []);
                if (set0.has(clientEmail)) set0.delete(clientEmail);
                else set0.add(clientEmail);
                return { ...p, favoritedBy: Array.from(set0) };
              }),
            };
          }),
        })),
      addTip: (slug, amount) =>
        set((s) => ({
          collections: s.collections.map((c) =>
            c.slug === slug ? { ...c, tipCount: c.tipCount + 1, tipTotal: c.tipTotal + amount } : c,
          ),
        })),
      incrementViews: (slug) =>
        set((s) => ({
          collections: s.collections.map((c) => (c.slug === slug ? { ...c, views: c.views + 1 } : c)),
        })),
      bySlug: (slug) => get().collections.find((c) => c.slug === slug),
      byId: (id) => get().collections.find((c) => c.id === id),
      reset: () => set({ collections: SEED_COLLECTIONS }),
    }),
    { name: 'lumiere-galleries-v2' },
  ),
);
