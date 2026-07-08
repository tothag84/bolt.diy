# FPG — Free Photo Gallery for Photographers

A modern, Pixieset-style photo gallery sharing platform — **free forever**, with a paid upgrade
only when you need more storage. Photographers deliver beautiful client galleries; clients favorite,
download and **tip the photographer** directly; and the whole studio runs from a clean dashboard.

Designed in the **light, monochrome "Supabase remix" aesthetic** from
[21st.dev](https://21st.dev): white surfaces, hairline neutral borders, the **Outfit** typeface,
a bold **green** main accent (Supabase green) with a **brick-red** secondary accent for
destructive actions, and 0.5rem radius. No gradients, no glow.

> **Note:** This is a self-contained product living inside the repo at `photo-gallery/`.
> It is independent of the surrounding bolt.diy application and has its own toolchain.

## 💸 Business model

Free forever, with a simple storage-based upgrade:

| Plan | Price | Galleries | Storage |
| ---- | ----- | --------- | ------- |
| **Free** | $0 | 5 | 500 MB |
| **Plus** | $5/mo or $50/yr | 25 | 2 GB |

Photographers can also receive optional **client tips** directly inside a gallery.

## ✨ Features

### For photographers (studio dashboard)
- **Overview dashboard** — live stats (collections, views, client favorites, **tips received**) and recent work.
- **Plan & storage usage** — gallery count and storage meters in the sidebar and Settings, with an upgrade path.
- **Collections** — searchable, filterable grid with status badges, quick actions (copy client link, open, delete).
- **Collection editor** with three tabs:
  - **Photos** — drag-and-drop upload zone, grid management, per-photo remove.
  - **Settings** — description, event date, status, layout (masonry / grid / columns), client favorites, download controls, **tips toggle**, and 4-digit PIN protection.
  - **Share** — one-click copy of the private client link, plus publish/unpublish.
- **Preview drafts** before publishing.
- **Profile** — name, studio name, avatar, account details.

### For clients (public gallery)
- **Cinematic cover hero** with event title, date and welcome note.
- **PIN-protected access** for private galleries.
- **Three gallery layouts** (masonry, grid, columns) with lazy-loaded, shimmering image loads.
- **Favorites / proofing** — clients mark selects (email-gated) and filter to "favorites only".
- **Full-screen lightbox** with keyboard navigation, filmstrip, slideshow autoplay, favorite & download.
- **Controlled downloads** — per-photo or "download all" (honors the photographer's settings).
- **Tip the photographer** — optional tip with preset/custom amounts.

### Marketing site
- Animated hero, feature bento grid, showcase.
- **Pricing** (Free vs Plus, monthly/yearly toggle) and an animated FAQ accordion.
- Responsive navigation with sign-up / sign-in flows.

## 🧱 Tech stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | React 18 + TypeScript                               |
| Build tool     | Vite 5                                              |
| Styling        | Tailwind CSS 3 (custom design tokens)               |
| Animation      | Framer Motion                                       |
| Routing        | React Router 6                                      |
| State          | Zustand (persisted to `localStorage`)               |
| Icons          | lucide-react                                        |

Demo images are served from `picsum.photos`, so a network connection is needed for
thumbnails. Auth and data are **client-side only** (persisted in `localStorage`) — this
is a high-fidelity product prototype ready to be wired to a real backend.

## 🚀 Getting started

```bash
cd photo-gallery
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5180`).

### Scripts
- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run typecheck` — type-check only

## 🗺️ Try it out

1. **Landing page** (`/`) — scroll through features, showcase and the "free forever" section.
2. **Sign up** (`/signup`) — free, no card; you land in the dashboard.
3. **Dashboard** (`/app`) — explore stats and create a collection.
4. **Client gallery** (`/g/elena-james-wedding`) — the public experience.
   PIN for the demo wedding gallery is **`1224`**. Try favoriting photos, the
   slideshow, and the **Tip** button.

## 📁 Project structure

```
photo-gallery/
├── src/
│   ├── components/
│   │   ├── ui/          # Button, Input, Modal, Toast, Badge, Logo, Reveal…
│   │   ├── layout/      # SiteNav/Footer, DashboardLayout
│   │   ├── marketing/   # PricingTiers, FaqAccordion
│   │   └── gallery/     # PhotoGrid, PhotoImage, Lightbox
│   ├── pages/
│   │   ├── Landing.tsx, Pricing.tsx, Auth.tsx, ClientGallery.tsx
│   │   └── dashboard/   # Overview, Collections, CollectionEditor, Settings
│   ├── lib/             # store (zustand), types, plans, donations, seed data, utils
│   ├── App.tsx          # routes + auth guard
│   └── main.tsx
└── …config (vite, tailwind, tsconfig)
```

## 🔌 Where a backend would plug in

The Zustand stores in `src/lib/store.ts` are the single source of truth and map 1:1 to
the API you'd build:
- `useAuth` → authentication and **plan upgrades** (e.g. Stripe Billing).
- `useGalleries` → collections CRUD, photo uploads (object storage + CDN), client favorites, view tracking, and **client tips** (e.g. Stripe payments).

Swap the persisted store actions for API calls and the UI works unchanged.
