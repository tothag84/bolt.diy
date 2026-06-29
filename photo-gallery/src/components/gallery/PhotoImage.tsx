import { useState } from 'react';
import { cn } from '@/lib/utils';
import { photoUrl } from '@/lib/utils';

/** Image with skeleton shimmer + lazy fade-in. */
export function PhotoImage({
  seed,
  w = 800,
  h = 600,
  alt = '',
  className,
  imgClassName,
  priority = false,
}: {
  seed: string | number;
  w?: number;
  h?: number;
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn('relative overflow-hidden bg-ink-800', className)}>
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
      )}
      <img
        src={photoUrl(seed, w, h)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-all duration-700',
          loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-md',
          imgClassName,
        )}
      />
    </div>
  );
}
