import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Logo({ className, to = '/' }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn('group inline-flex items-center gap-2.5', className)}>
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-ink-900 ring-1 ring-white/10">
        <span className="absolute inset-0 rounded-lg brand-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
        <svg viewBox="0 0 32 32" className="h-5 w-5">
          <defs>
            <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a78bfa" />
              <stop offset="1" stopColor="#e879f9" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="9" fill="none" stroke="url(#logo-g)" strokeWidth="2.5" />
          <circle cx="16" cy="16" r="3.5" fill="url(#logo-g)" />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-white">
        Lumière
      </span>
    </Link>
  );
}

export function Avatar({ seed, name, size = 36 }: { seed: string; name: string; size?: number }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span
      className="grid place-items-center rounded-full bg-gradient-to-br from-brand-500 to-fuchsia-500 text-xs font-semibold text-white ring-2 ring-white/10"
      style={{ width: size, height: size }}
      title={name}
      aria-hidden={!name}
    >
      {initials || seed.slice(0, 2).toUpperCase()}
    </span>
  );
}
