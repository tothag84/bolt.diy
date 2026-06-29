import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Copy, Eye, Heart, Images, MoreVertical, Plus, Search, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { PhotoImage } from '@/components/gallery/PhotoImage';
import { useGalleries } from '@/lib/store';
import { toast } from '@/components/ui/Toast';
import { classByStatus, cn, formatDate, pluralize } from '@/lib/utils';
import type { GalleryStatus } from '@/lib/types';

const filters: (GalleryStatus | 'all')[] = ['all', 'published', 'draft', 'archived'];

export function Collections() {
  const collections = useGalleries((s) => s.collections);
  const deleteCollection = useGalleries((s) => s.deleteCollection);
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<GalleryStatus | 'all'>('all');
  const [menu, setMenu] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      collections.filter(
        (c) =>
          (filter === 'all' || c.status === filter) && c.title.toLowerCase().includes(q.toLowerCase().trim()),
      ),
    [collections, q, filter],
  );

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/g/${slug}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    toast.success('Gallery link copied to clipboard');
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Collections</h1>
          <p className="mt-1 text-sm text-zinc-400">{pluralize(collections.length, 'gallery', 'galleries')} total</p>
        </div>
        <Button onClick={() => navigate('/app/collections/new')}>
          <Plus className="h-4 w-4" /> New collection
        </Button>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Search collections..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm capitalize transition',
                filter === f ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState onCreate={() => navigate('/app/collections/new')} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c) => {
            const favs = c.photos.reduce((m, p) => m + (p.favoritedBy?.length ?? 0), 0);
            return (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group card relative overflow-hidden"
              >
                <Link to={`/app/collections/${c.id}`}>
                  <PhotoImage
                    seed={c.coverSeed}
                    w={700}
                    h={450}
                    className="aspect-[16/10] w-full"
                    imgClassName="group-hover:scale-105"
                  />
                </Link>

                {/* Menu */}
                <div className="absolute right-3 top-3">
                  <button
                    onClick={() => setMenu(menu === c.id ? null : c.id)}
                    className="grid h-8 w-8 place-items-center rounded-lg bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
                    aria-label="Options"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {menu === c.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setMenu(null)} />
                      <div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-xl border border-white/10 bg-ink-800 py-1 shadow-card">
                        <MenuItem
                          icon={Copy}
                          label="Copy client link"
                          onClick={() => {
                            copyLink(c.slug);
                            setMenu(null);
                          }}
                        />
                        <MenuItem
                          icon={Eye}
                          label="Open gallery"
                          onClick={() => window.open(`/g/${c.slug}`, '_blank')}
                        />
                        <MenuItem
                          icon={Trash2}
                          label="Delete"
                          danger
                          onClick={() => {
                            deleteCollection(c.id);
                            toast.success('Collection deleted');
                            setMenu(null);
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/app/collections/${c.id}`} className="truncate font-medium text-white hover:text-brand-200">
                      {c.title}
                    </Link>
                    <Badge className={classByStatus(c.status)}>{c.status}</Badge>
                  </div>
                  <p className="mt-1 truncate text-xs text-zinc-500">{formatDate(c.eventDate)}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-zinc-400">
                    <span className="inline-flex items-center gap-1">
                      <Images className="h-3.5 w-3.5" /> {c.photos.length}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" /> {c.views.toLocaleString()}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" /> {favs}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: typeof Copy;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:bg-white/5',
        danger ? 'text-red-300 hover:bg-red-500/10' : 'text-zinc-300',
      )}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="grid place-items-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] py-20 text-center">
      <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-brand-300">
        <Images className="h-7 w-7" />
      </div>
      <h3 className="font-display text-lg font-semibold text-white">No collections yet</h3>
      <p className="mt-1 max-w-sm text-sm text-zinc-500">
        Create your first collection to start delivering beautiful galleries to your clients.
      </p>
      <Button className="mt-6" onClick={onCreate}>
        <Plus className="h-4 w-4" /> Create collection
      </Button>
    </div>
  );
}
