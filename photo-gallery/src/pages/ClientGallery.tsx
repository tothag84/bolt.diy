import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Download, Heart, Lock, Play, Share2 } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { DonateModal } from '@/components/ui/Donate';
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
  const [params] = useSearchParams();
  const isPreview = params.get('preview') === '1';
  const collection = useGalleries((s) => s.bySlug(slug));
  const toggleClientFavorite = useGalleries((s) => s.toggleClientFavorite);
  const incrementViews = useGalleries((s) => s.incrementViews);
  const addTip = useGalleries((s) => s.addTip);

  const [unlocked, setUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [clientEmail, setClientEmail] = useState<string>(() => localStorage.getItem(CLIENT_KEY) ?? '');
  const [emailModal, setEmailModal] = useState(false);
  const [pendingFav, setPendingFav] = useState<Photo | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [tipOpen, setTipOpen] = useState(false);
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

  // Drafts are private to the public, but the photographer can preview via ?preview=1.
  if (collection.status === 'draft' && !isPreview) {
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
    <div className="min-h-screen bg-white">
      {isPreview && collection.status !== 'published' && (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-900">
          Preview mode — this gallery is a {collection.status} and isn't visible to clients yet.
        </div>
      )}

      {/* Cover hero */}
      <header className="relative h-[68vh] min-h-[420px] w-full overflow-hidden">
        <PhotoImage seed={collection.coverSeed} w={1800} h={1200} priority className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/20 to-neutral-950/70" />

        <div className="absolute inset-x-0 top-0 z-10">
          <div className="container-px flex h-16 items-center justify-between">
            <Logo to="/" />
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href).catch(() => {});
                toast.success('Gallery link copied');
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-3.5 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10"
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-x-0 bottom-0 pb-14 text-center"
        >
          <p className="text-sm uppercase tracking-widest text-white/80">{formatDate(collection.eventDate)}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold text-white sm:text-6xl">{collection.title}</h1>
          {collection.description && (
            <p className="mx-auto mt-4 max-w-xl px-6 text-white/85">{collection.description}</p>
          )}
          <button
            onClick={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="mx-auto mt-8 grid h-11 w-11 animate-float place-items-center rounded-full border border-white/40 text-white transition hover:bg-white/10"
            aria-label="View photos"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </motion.div>
      </header>

      {/* Sticky action bar */}
      <div className="sticky top-0 z-30 border-b border-neutral-200 bg-white/85 backdrop-blur-xl">
        <div className="container-px flex h-14 items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <span>{collection.photos.length} photos</span>
            {collection.allowFavorites && favCount > 0 && (
              <button
                onClick={() => setShowFavoritesOnly((v) => !v)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition',
                  showFavoritesOnly
                    ? 'border-accent-400 bg-accent-50 text-accent-700'
                    : 'border-neutral-200 text-neutral-600 hover:border-neutral-300',
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
            {collection.tipsEnabled && (
              <Button variant="outline" size="sm" onClick={() => setTipOpen(true)}>
                <Heart className="h-4 w-4 text-accent-600" /> Tip
              </Button>
            )}
            {collection.allowDownloads && (
              <Button
                size="sm"
                onClick={() => requireEmailThen(() => toast.success('Preparing your download — check your email shortly'))}
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
          <p className="py-20 text-center text-neutral-500">No favorites yet — tap the heart on photos you love.</p>
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

      {/* Tip banner */}
      {collection.tipsEnabled && (
        <section className="container-px pb-10">
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-accent-200 bg-accent-50 px-6 py-7 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="font-display text-lg font-semibold text-neutral-950">Loved your photos?</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Say thanks to your photographer with an optional tip. {collection.tipCount > 0 && `Joined by ${collection.tipCount} others.`}
              </p>
            </div>
            <Button className="shrink-0" onClick={() => setTipOpen(true)}>
              <Heart className="h-4 w-4" /> Leave a tip
            </Button>
          </div>
        </section>
      )}

      <footer className="border-t border-neutral-200 bg-neutral-50 py-10 text-center">
        <Logo to="/" className="justify-center" />
        <p className="mt-3 text-sm text-neutral-500">
          Delivered with FPG ·{' '}
          <Link to="/signup" className="font-medium text-accent-700 hover:text-accent-800">
            Create your own free galleries
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
        <p className="mb-4 text-sm text-neutral-600">
          Enter your email so your photographer knows which photos you love. We'll keep it on this device.
        </p>
        <EmailForm onSubmit={onEmailSubmit} initial={clientEmail} />
      </Modal>

      {/* Tip modal */}
      <DonateModal
        open={tipOpen}
        onClose={() => setTipOpen(false)}
        recipient="the photographer"
        subtitle="A tip is a lovely way to thank your photographer for their work. 100% goes to them."
        onDonate={(amount) => addTip(collection.slug, amount)}
      />
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
      <Input autoFocus type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
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
    <div className="grid min-h-screen place-items-center bg-white px-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-700">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="font-display text-2xl font-bold text-neutral-950">{title}</h1>
        <p className="mt-2 text-sm text-neutral-600">This gallery is private. Enter the PIN to continue.</p>
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
        <p className="mt-4 text-xs text-neutral-400">Hint: try 1224 for the demo wedding gallery.</p>
      </motion.div>
    </div>
  );
}

function CenteredNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-white px-6 text-center">
      <div className="max-w-md">
        <Logo to="/" className="justify-center" />
        <h1 className="mt-6 font-display text-2xl font-bold text-neutral-950">{title}</h1>
        <p className="mt-2 text-neutral-600">{body}</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-white px-6 text-center">
      <div>
        <Logo to="/" className="justify-center" />
        <h1 className="mt-6 font-display text-3xl font-bold text-neutral-950">Gallery not found</h1>
        <p className="mt-2 text-neutral-600">This link may have expired or been removed.</p>
        <Button className="mt-6" onClick={() => (window.location.href = '/')}>
          Back to home
        </Button>
      </div>
    </div>
  );
}
