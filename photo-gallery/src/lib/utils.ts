import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind class names safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Stable-ish unique id for client-side records. */
export function uid(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;
}

/** Deterministic photo URL from a seed (uses picsum for the demo). */
export function photoUrl(seed: string | number, w = 1200, h = 800): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(iso);
}

export function pluralize(n: number, word: string, plural?: string): string {
  return `${n} ${n === 1 ? word : plural ?? word + 's'}`;
}

export function classByStatus(status: string): string {
  switch (status) {
    case 'published':
      return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20';
    case 'draft':
      return 'text-amber-300 bg-amber-500/10 border-amber-500/20';
    case 'archived':
      return 'text-zinc-400 bg-white/5 border-white/10';
    default:
      return 'text-zinc-400 bg-white/5 border-white/10';
  }
}

/** Smooth scroll to an anchor id. */
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
