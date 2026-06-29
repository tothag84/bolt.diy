import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Heart, Play, Pause, X } from 'lucide-react';
import type { Photo } from '@/lib/types';
import { cn, photoUrl } from '@/lib/utils';

export function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
  allowDownloads,
  allowFavorites,
  isFavorite,
  onToggleFavorite,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  allowDownloads: boolean;
  allowFavorites: boolean;
  isFavorite: (p: Photo) => boolean;
  onToggleFavorite: (p: Photo) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const photo = photos[index];

  const next = useCallback(() => onIndexChange((index + 1) % photos.length), [index, photos.length, onIndexChange]);
  const prev = useCallback(
    () => onIndexChange((index - 1 + photos.length) % photos.length),
    [index, photos.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') onClose();
      else if (e.key === ' ') {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key.toLowerCase() === 'f' && allowFavorites) onToggleFavorite(photo);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, onClose, photo, allowFavorites, onToggleFavorite]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [playing, next]);

  if (!photo) return null;
  const fav = isFavorite(photo);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col bg-ink-950/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 text-zinc-300">
        <span className="text-sm tabular-nums">
          {index + 1} <span className="text-zinc-600">/ {photos.length}</span>
        </span>
        <div className="flex items-center gap-1">
          <IconBtn label={playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </IconBtn>
          {allowFavorites && (
            <IconBtn label="Favorite" onClick={() => onToggleFavorite(photo)}>
              <Heart className={cn('h-5 w-5 transition', fav && 'fill-fuchsia-500 text-fuchsia-500')} />
            </IconBtn>
          )}
          {allowDownloads && (
            <IconBtn label="Download" asLink href={photoUrl(photo.seed, photo.width, photo.height)}>
              <Download className="h-5 w-5" />
            </IconBtn>
          )}
          <IconBtn label="Close" onClick={onClose}>
            <X className="h-5 w-5" />
          </IconBtn>
        </div>
      </div>

      {/* Stage */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4">
        <NavArrow side="left" onClick={prev} />
        <AnimatePresence mode="wait">
          <motion.img
            key={photo.id}
            src={photoUrl(photo.seed, 1600, 1066)}
            alt={photo.filename}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
        <NavArrow side="right" onClick={next} />
      </div>

      {/* Filmstrip */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-5 pt-1">
        {photos.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onIndexChange(i)}
            className={cn(
              'relative h-14 w-20 shrink-0 overflow-hidden rounded-md ring-2 transition',
              i === index ? 'ring-brand-400' : 'ring-transparent opacity-50 hover:opacity-100',
            )}
          >
            <img src={photoUrl(p.seed, 160, 112)} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  asLink,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  label: string;
  asLink?: boolean;
  href?: string;
}) {
  const cls =
    'grid h-10 w-10 place-items-center rounded-lg text-zinc-300 transition hover:bg-white/10 hover:text-white focus-ring';
  if (asLink)
    return (
      <a href={href} target="_blank" rel="noreferrer" download className={cls} aria-label={label} title={label}>
        {children}
      </a>
    );
  return (
    <button onClick={onClick} className={cls} aria-label={label} title={label}>
      {children}
    </button>
  );
}

function NavArrow({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === 'left' ? 'Previous' : 'Next'}
      className={cn(
        'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/5 text-white backdrop-blur transition hover:bg-white/15 focus-ring',
        side === 'left' ? 'left-4' : 'right-4',
      )}
    >
      {side === 'left' ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
    </button>
  );
}
