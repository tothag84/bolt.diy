import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Logo({ className, to = '/' }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn('group inline-flex items-center gap-2.5', className)}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-neutral-900 transition-colors group-hover:bg-neutral-800">
        <svg viewBox="0 0 32 32" className="h-5 w-5">
          <circle cx="16" cy="16" r="9" fill="none" stroke="white" strokeWidth="2.25" />
          <circle cx="16" cy="16" r="3.25" fill="#2563eb" />
        </svg>
      </span>
      <span className="font-display text-[19px] font-bold tracking-tight text-neutral-950">Lumière</span>
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
      className="grid place-items-center rounded-full bg-neutral-900 text-xs font-semibold text-white ring-2 ring-white"
      style={{ width: size, height: size }}
      title={name}
      aria-hidden={!name}
    >
      {initials || seed.slice(0, 2).toUpperCase()}
    </span>
  );
}
