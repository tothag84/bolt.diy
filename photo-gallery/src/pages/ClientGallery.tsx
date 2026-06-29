import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Download, Heart, Lock, Play, Share2, ShoppingBag } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { PhotoGrid } from '@/components/gallery/PhotoGrid';
import { PhotoImage } from '@/components/gallery/PhotoImage';
import { Lightbox } from '@/components/gallery/Lightbox';
import { useGalleries } from '@/lib/store';
import { toast } from '@/components/ui/Toast';
import { cn, formatDate } from '@/lib/utils';
import type { Photo } from '@/lib/types';

const CLIENT_KEY = 'lumiere-client-email';

export function ClientGallery() {
  const { slug = '' } = useParams();
  const collection = useGalleries((s) => s.bySlug(slug));
  const toggleClientFavorite = useGalleries((s) => s.toggleClientFavorite);
  const incrementViews = useGalleries((s) => s.incrementViews);

  const [unlocked, setUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [clientEmail, setClientEmail] = useState<string>(() => localStorage.getItem(CLIENT_KEY) ?? '');
  const [emailModal, setEmailModal] = useState(false);
  const [pendingFav, setPendingFav] = useState<Photo | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const viewed = useRef(false);

  const needsPin = !!collection?.pin && !unlocked;

  useEffect(() => {
    if (collection && !needsPin && !viewed.current) {
      viewed.current = true;
      incrementViews(collection.slug);
    }
  }, [collection, needsPin, incrementViews]);

  const isFavorite = useMemo(
    () => (p: Photo) => !!clientEmail && (p.favoritedBy?.includes(clientEmail) ?? false),
    [clientEmail],
  );

  if (!collection) return <NotFound />;

  if (collection.status === 'draft') {
    return (
      <CenteredNote
        title="This gallery isn't published yet"
        body="The photographer is still putting the finishing touches on it. Check back soon."
      />
    );
  }

  const photos = showFavoritesOnly ? collection.photos.filter(isFavorite) : collection.photos;
  const favCount = collection.photos.filter(isFavorite).length;

  const requireEmailThen = (action: () => void) => {
    if (clientEmail) action();
    else setEmailModal(true);
  };

  const toggleFav = (p: Photo) => {
    if (!clientEmail) {
      setPendingFav(p);
      setEmailModal(true);
      return;
    }
    toggleClientFavorite(collection.slug, p.id, clientEmail);
  };

  const onEmailSubmit = (email: string) => {
    if (!email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    localStorage.setItem(CLIENT_KEY, email);
    setClientEmail(email);
    setEmailModal(false);
    if (pendingFav) {
      toggleClientFavorite(collection.slug, pendingFav.id, email);
      setPendingFav(null);
      toast.success('Added to your favorites');
    }
  };

  if (needsPin) {
    return (
      <PinGate
        title={collection.title}
        onSubmit={() => {
          if (pinInput === collection.pin) {
            setUnlocked(true);
            toast.success('Welcome — enjoy your gallery');
          } else toast.error('Incorrect PIN');
        }}
        pin={pinInput}
        setPin={setPinInput}
      />
    );
  }

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Cover hero */}
      <header className="relative h-[68vh] min-h-[420px] w-full overflow-hidden">
        <PhotoImage seed={collection.coverSeed} w={1800} h={1200} priority className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/20 to-ink-950" />

        <div className="absolute inset-x-0 top-0 z-10">
          <div className="container-px flex h-16 items-center justify-between">
            <Logo to="/" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href).catch(() => {});
                toast.success('Gallery link copied');
              }}
            >
              <Share2 className="h-4 w-4" /> Share
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-x-0 bottom-0 pb-14 text-center"
        >
          <p className="text-sm uppercase tracking-widest text-zinc-300">{formatDate(collection.eventDate)}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-6xl">{collection.title}</h1>
          {collection.description && (
            <p className="mx-auto mt-4 max-w-xl px-6 text-zinc-300">{collection.description}</p>
          )}
          <button
            onClick={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="mx-auto mt-8 grid h-11 w-11 animate-float place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
            aria-label="View photos"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </motion.div>
      </header>

      {/* Sticky action bar */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-ink-950/85 backdrop-blur-xl">
        <div className="container-px flex h-14 items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span>{collection.photos.length} photos</span>
            {collection.allowFavorites && favCount > 0 && (
              <button
                onClick={() => setShowFavoritesOnly((v) => !v)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition',
                  showFavoritesOnly
                    ? 'border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-200'
                    : 'border-white/10 text-zinc-300 hover:border-white/20',
                )}
              >
                <Heart className={cn('h-3.5 w-3.5', showFavoritesOnly && 'fill-current')} /> {favCount} favorite
                {favCount === 1 ? '' : 's'}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setLightbox(0)}>
              <Play className="h-4 w-4" /> Slideshow
            </Button>
            {collection.storeEnabled && (
              <Button variant="outline" size="sm" onClick={() => toast.info('Store checkout is a demo')}>
                <ShoppingBag className="h-4 w-4" /> Shop prints
              </Button>
            )}
            {collection.allowDownloads && (
              <Button
                size="sm"
                onClick={() =>
                  requireEmailThen(() => toast.success('Preparing your download — check your email shortly'))
                }
              >
                <Download className="h-4 w-4" /> Download all
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main ref={gridRef} className="container-px scroll-mt-14 py-10">
        {photos.length === 0 ? (
          <p className="py-20 text-center text-zinc-500">No favorites yet — tap the heart on photos you love.</p>
        ) : (
          <PhotoGrid
            photos={photos}
            layout={collection.layout}
            onOpen={(i) => setLightbox(i)}
            isFavorite={isFavorite}
            onToggleFavorite={collection.allowFavorites ? toggleFav : undefined}
            allowFavorites={collection.allowFavorites}
            allowDownloads={collection.allowDownloads}
          />
        )}
      </main>

      <footer className="border-t border-white/10 py-10 text-center">
        <Logo to="/" className="justify-center" />
        <p className="mt-3 text-sm text-zinc-500">
          Delivered with Lumière ·{' '}
          <Link to="/signup" className="text-brand-300 hover:text-brand-200">
            Create your own galleries
          </Link>
        </p>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && photos[lightbox] && (
          <Lightbox
            photos={photos}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onIndexChange={setLightbox}
            allowDownloads={collection.allowDownloads}
            allowFavorites={collection.allowFavorites}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFav}
          />
        )}
      </AnimatePresence>

      {/* Email capture modal */}
      <Modal open={emailModal} onClose={() => setEmailModal(false)} title="Save your favorites">
        <p className="mb-4 text-sm text-zinc-400">
          Enter your email so your photographer knows which photos you love. We'll keep it on this device.
        </p>
        <EmailForm onSubmit={onEmailSubmit} initial={clientEmail} />
      </Modal>
    </div>
  );
}

function EmailForm({ onSubmit, initial }: { onSubmit: (email: string) => void; initial: string }) {
  const [email, setEmail] = useState(initial);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email);
      }}
      className="space-y-3"
    >
      <Input
        autoFocus
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
}

function PinGate({
  title,
  pin,
  setPin,
  onSubmit,
}: {
  title: string;
  pin: string;
  setPin: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-950 px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center"
      >
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-brand-300">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-sm text-zinc-400">This gallery is private. Enter the PIN to continue.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="mt-6 space-y-3"
        >
          <Input
            autoFocus
            inputMode="numeric"
            maxLength={4}
            placeholder="••••"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            className="text-center text-2xl tracking-[0.5em]"
          />
          <Button type="submit" className="w-full" size="lg">
            Unlock gallery
          </Button>
        </form>
        <p className="mt-4 text-xs text-zinc-600">Hint: try 1224 for the demo wedding gallery.</p>
      </motion.div>
    </div>
  );
}

function CenteredNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-950 px-6 text-center">
      <div className="max-w-md">
        <Logo to="/" className="justify-center" />
        <h1 className="mt-6 font-display text-2xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-zinc-400">{body}</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink-950 px-6 text-center">
      <div>
        <Logo to="/" className="justify-center" />
        <h1 className="mt-6 font-display text-3xl font-bold text-white">Gallery not found</h1>
        <p className="mt-2 text-zinc-400">This link may have expired or been removed.</p>
        <Button className="mt-6" onClick={() => (window.location.href = '/')}>
          Back to home
        </Button>
      </div>
    </div>
  );
}
