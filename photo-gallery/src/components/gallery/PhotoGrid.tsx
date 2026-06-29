import { motion } from 'framer-motion';
import { Download, Heart, Trash2 } from 'lucide-react';
import type { GalleryLayout, Photo } from '@/lib/types';
import { cn, photoUrl } from '@/lib/utils';
import { PhotoImage } from './PhotoImage';

export function PhotoGrid({
  photos,
  layout,
  onOpen,
  isFavorite,
  onToggleFavorite,
  onRemove,
  allowDownloads,
  allowFavorites,
}: {
  photos: Photo[];
  layout: GalleryLayout;
  onOpen: (index: number) => void;
  isFavorite?: (p: Photo) => boolean;
  onToggleFavorite?: (p: Photo) => void;
  onRemove?: (p: Photo) => void;
  allowDownloads?: boolean;
  allowFavorites?: boolean;
}) {
  const containerCls =
    layout === 'masonry' || layout === 'columns'
      ? cn('columns-2 gap-4 md:gap-5', layout === 'masonry' ? 'lg:columns-3 xl:columns-4' : 'lg:columns-3')
      : 'grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4';

  return (
    <div className={containerCls}>
      {photos.map((p, i) => {
        const fav = isFavorite?.(p) ?? false;
        const broken = layout === 'grid';
        return (
          <motion.figure
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.03 }}
            className={cn(
              'group relative cursor-pointer overflow-hidden rounded-xl bg-ink-800',
              broken ? 'aspect-[4/3]' : 'mb-4 break-inside-avoid md:mb-5',
            )}
            onClick={() => onOpen(i)}
          >
            <PhotoImage
              seed={p.seed}
              w={p.width > p.height ? 700 : 500}
              h={p.width > p.height ? 500 : 700}
              alt={p.filename}
              className={broken ? 'h-full w-full' : 'w-full'}
              imgClassName="group-hover:scale-[1.04]"
            />

            {/* Gradient + actions overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {fav && (
              <span className="absolute left-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-fuchsia-500/90 text-white shadow-lg">
                <Heart className="h-3.5 w-3.5 fill-current" />
              </span>
            )}

            <div className="absolute right-2.5 top-2.5 flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {allowFavorites && onToggleFavorite && (
                <ActionChip
                  label="Favorite"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(p);
                  }}
                >
                  <Heart className={cn('h-4 w-4', fav && 'fill-fuchsia-400 text-fuchsia-400')} />
                </ActionChip>
              )}
              {allowDownloads && (
                <a
                  href={photoUrl(p.seed, p.width, p.height)}
                  download
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="pointer-events-auto grid h-8 w-8 place-items-center rounded-lg bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
                  aria-label="Download"
                >
                  <Download className="h-4 w-4" />
                </a>
              )}
              {onRemove && (
                <ActionChip
                  label="Remove"
                  danger
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(p);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </ActionChip>
              )}
            </div>

            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 truncate px-3 py-2 text-xs text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {p.filename}
            </figcaption>
          </motion.figure>
        );
      })}
    </div>
  );
}

function ActionChip({
  children,
  onClick,
  label,
  danger,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        'pointer-events-auto grid h-8 w-8 place-items-center rounded-lg bg-black/40 text-white backdrop-blur transition hover:bg-black/60',
        danger && 'hover:bg-red-500/80',
      )}
    >
      {children}
    </button>
  );
}
