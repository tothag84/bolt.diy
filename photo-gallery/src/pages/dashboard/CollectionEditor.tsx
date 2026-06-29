import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  ExternalLink,
  Heart,
  ImagePlus,
  Layout,
  Lock,
  Settings as SettingsIcon,
  Share2,
  Trash2,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Field, Input, Select, Textarea } from '@/components/ui/Input';
import { PhotoGrid } from '@/components/gallery/PhotoGrid';
import { useGalleries } from '@/lib/store';
import { toast } from '@/components/ui/Toast';
import { classByStatus, cn } from '@/lib/utils';
import type { Collection, GalleryLayout, GalleryStatus } from '@/lib/types';

type Tab = 'photos' | 'settings' | 'share';

export function CollectionEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new' || !id;

  const byId = useGalleries((s) => s.byId);
  const createCollection = useGalleries((s) => s.createCollection);
  const updateCollection = useGalleries((s) => s.updateCollection);
  const deleteCollection = useGalleries((s) => s.deleteCollection);
  const addPhotos = useGalleries((s) => s.addPhotos);
  const removePhoto = useGalleries((s) => s.removePhoto);

  // Resolve / bootstrap the working collection.
  const [workingId, setWorkingId] = useState<string | null>(isNew ? null : id ?? null);
  useEffect(() => {
    if (isNew && !workingId) {
      const c = createCollection({ title: 'Untitled Collection', status: 'draft' });
      setWorkingId(c.id);
      navigate(`/app/collections/${c.id}`, { replace: true });
    }
  }, [isNew, workingId, createCollection, navigate]);

  const collection = byId(workingId ?? id ?? '');
  const [tab, setTab] = useState<Tab>('photos');

  if (!collection) {
    return (
      <DashboardLayout>
        <div className="grid place-items-center py-32 text-center">
          <p className="text-zinc-400">Collection not found.</p>
          <Button className="mt-4" variant="outline" onClick={() => navigate('/app/collections')}>
            Back to collections
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const patch = (p: Partial<Collection>) => updateCollection(collection.id, p);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/app/collections')}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Collections
        </button>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <input
              value={collection.title}
              onChange={(e) => patch({ title: e.target.value })}
              className="w-full max-w-xl truncate bg-transparent font-display text-2xl font-bold text-white outline-none focus:text-brand-100 sm:text-3xl"
            />
            <div className="mt-2 flex items-center gap-3">
              <Badge className={classByStatus(collection.status)}>{collection.status}</Badge>
              <span className="text-sm text-zinc-500">{collection.photos.length} photos</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open(`/g/${collection.slug}`, '_blank')}>
              <ExternalLink className="h-4 w-4" /> Preview
            </Button>
            {collection.status !== 'published' ? (
              <Button
                size="sm"
                onClick={() => {
                  patch({ status: 'published' });
                  toast.success('Gallery published — share the link with your client!');
                  setTab('share');
                }}
              >
                Publish
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => patch({ status: 'draft' })}>
                Unpublish
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 border-b border-white/10">
        {(
          [
            ['photos', 'Photos', ImagePlus],
            ['settings', 'Settings', SettingsIcon],
            ['share', 'Share', Share2],
          ] as [Tab, string, typeof ImagePlus][]
        ).map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition',
              tab === key ? 'text-white' : 'text-zinc-400 hover:text-white',
            )}
          >
            <Icon className="h-4 w-4" /> {label}
            {tab === key && (
              <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 brand-gradient" />
            )}
          </button>
        ))}
      </div>

      {tab === 'photos' && (
        <PhotosTab
          collection={collection}
          onAdd={() => {
            addPhotos(collection.id, 6);
            toast.success('6 photos uploaded');
          }}
          onRemove={(pid) => removePhoto(collection.id, pid)}
        />
      )}
      {tab === 'settings' && <SettingsTab collection={collection} patch={patch} onDelete={() => {
        deleteCollection(collection.id);
        toast.success('Collection deleted');
        navigate('/app/collections');
      }} />}
      {tab === 'share' && <ShareTab collection={collection} />}
    </DashboardLayout>
  );
}

/* -------------------------------- Photos tab ------------------------------ */

function PhotosTab({
  collection,
  onAdd,
  onRemove,
}: {
  collection: Collection;
  onAdd: () => void;
  onRemove: (photoId: string) => void;
}) {
  const [drag, setDrag] = useState(false);
  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          onAdd();
        }}
        onClick={onAdd}
        className={cn(
          'mb-6 grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed py-12 text-center transition',
          drag ? 'border-brand-400 bg-brand-500/10' : 'border-white/15 bg-white/[0.02] hover:border-white/30',
        )}
      >
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-brand-300">
          <ImagePlus className="h-6 w-6" />
        </div>
        <p className="mt-3 font-medium text-white">Drop photos here or click to upload</p>
        <p className="mt-1 text-sm text-zinc-500">JPG, PNG, HEIC up to 100MB each · demo adds sample photos</p>
      </div>

      {collection.photos.length > 0 ? (
        <PhotoGrid
          photos={collection.photos}
          layout="grid"
          onOpen={() => {}}
          onRemove={(p) => onRemove(p.id)}
        />
      ) : (
        <p className="py-12 text-center text-sm text-zinc-500">No photos yet — upload some to get started.</p>
      )}
    </div>
  );
}

/* ------------------------------- Settings tab ----------------------------- */

function SettingsTab({
  collection,
  patch,
  onDelete,
}: {
  collection: Collection;
  patch: (p: Partial<Collection>) => void;
  onDelete: () => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5">
        <Field label="Description">
          <Textarea
            rows={3}
            value={collection.description}
            placeholder="A short welcome note for your client..."
            onChange={(e) => patch({ description: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Event date">
            <Input
              type="date"
              value={collection.eventDate.slice(0, 10)}
              onChange={(e) => patch({ eventDate: new Date(e.target.value).toISOString() })}
            />
          </Field>
          <Field label="Status">
            <Select
              value={collection.status}
              onChange={(e) => patch({ status: e.target.value as GalleryStatus })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </Select>
          </Field>
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-zinc-300">Gallery layout</span>
          <div className="grid grid-cols-3 gap-2">
            {(['masonry', 'grid', 'columns'] as GalleryLayout[]).map((l) => (
              <button
                key={l}
                onClick={() => patch({ layout: l })}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border p-3 text-xs capitalize transition',
                  collection.layout === l
                    ? 'border-brand-400/60 bg-brand-500/10 text-white'
                    : 'border-white/10 text-zinc-400 hover:border-white/20',
                )}
              >
                <Layout className="h-4 w-4" />
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Toggle
          icon={Heart}
          label="Allow client favorites"
          desc="Let clients mark their selects."
          checked={collection.allowFavorites}
          onChange={(v) => patch({ allowFavorites: v })}
        />
        <Toggle
          icon={Download}
          label="Allow downloads"
          desc="Clients can download high-res photos."
          checked={collection.allowDownloads}
          onChange={(v) => patch({ allowDownloads: v })}
        />
        <Toggle
          icon={SettingsIcon}
          label="Enable print & download store"
          desc="Sell prints and digital files."
          checked={collection.storeEnabled}
          onChange={(v) => patch({ storeEnabled: v })}
        />

        <div className="card p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-brand-300">
              <Lock className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">PIN protection</p>
              <p className="text-xs text-zinc-500">Require a 4-digit PIN to view.</p>
            </div>
          </div>
          <Input
            className="mt-3"
            maxLength={4}
            inputMode="numeric"
            placeholder="e.g. 1224 (leave blank for none)"
            value={collection.pin ?? ''}
            onChange={(e) => patch({ pin: e.target.value.replace(/\D/g, '') || undefined })}
          />
        </div>

        <button
          onClick={onDelete}
          className="mt-2 inline-flex items-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-sm text-red-300 transition hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" /> Delete this collection
        </button>
      </div>
    </div>
  );
}

function Toggle({
  icon: Icon,
  label,
  desc,
  checked,
  onChange,
}: {
  icon: typeof Heart;
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left transition hover:border-white/20"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-brand-300">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium text-white">{label}</span>
        <span className="block text-xs text-zinc-500">{desc}</span>
      </span>
      <span
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition',
          checked ? 'brand-gradient' : 'bg-white/10',
        )}
      >
        <span
          className={cn(
            'absolute top-1 h-4 w-4 rounded-full bg-white transition-all',
            checked ? 'left-6' : 'left-1',
          )}
        />
      </span>
    </button>
  );
}

/* -------------------------------- Share tab ------------------------------- */

function ShareTab({ collection }: { collection: Collection }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/g/${collection.slug}`;
  const copy = () => {
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    toast.success('Link copied');
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="max-w-2xl space-y-6">
      {collection.status !== 'published' && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          This gallery is a {collection.status}. Publish it so clients can open the link.
        </div>
      )}

      <div className="card p-6">
        <h3 className="font-display text-lg font-semibold text-white">Client gallery link</h3>
        <p className="mt-1 text-sm text-zinc-400">Share this private link with your client.</p>
        <div className="mt-4 flex gap-2">
          <Input readOnly value={url} className="font-mono text-xs" />
          <Button onClick={copy} className="shrink-0">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>
        {collection.pin && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-zinc-400">
            <Lock className="h-3.5 w-3.5" /> Protected with PIN <span className="font-mono text-white">{collection.pin}</span>
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Email to client', desc: 'Branded delivery email' },
          { label: 'Share to social', desc: 'Instagram & Facebook' },
          { label: 'Embed on site', desc: 'Copy an iframe snippet' },
        ].map((a) => (
          <button
            key={a.label}
            onClick={() => toast.info('Available on Pro & Studio plans')}
            className="card p-4 text-left transition hover:border-white/20"
          >
            <p className="text-sm font-medium text-white">{a.label}</p>
            <p className="mt-1 text-xs text-zinc-500">{a.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
