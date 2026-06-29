import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary:
    'text-white brand-gradient shadow-[0_8px_30px_-8px_rgba(139,92,246,0.6)] hover:shadow-[0_10px_40px_-8px_rgba(139,92,246,0.8)] hover:brightness-110',
  secondary: 'bg-white text-ink-950 hover:bg-zinc-200',
  outline: 'border border-white/15 text-white hover:bg-white/5 hover:border-white/25',
  ghost: 'text-zinc-300 hover:text-white hover:bg-white/5',
  danger: 'bg-red-500/90 text-white hover:bg-red-500',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-3.5 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-7 py-3.5',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  ),
);
Button.displayName = 'Button';

type LinkButtonProps = BaseProps & {
  to: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export function LinkButton({ variant = 'primary', size = 'md', className, to, ...props }: LinkButtonProps) {
  const external = /^https?:\/\//.test(to);
  if (external) {
    return <a href={to} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
  }
  return <Link to={to} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
