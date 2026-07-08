import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus-ring disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.985]';

const variants: Record<Variant, string> = {
  // Main accent — bright Supabase green with dark text
  primary: 'bg-accent-400 text-neutral-950 shadow-xs hover:bg-accent-500',
  // Secondary — white with border
  secondary: 'border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50',
  // Outline — hairline on white
  outline: 'border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 hover:border-neutral-400',
  ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950',
  // Secondary accent — solid brick-red destructive
  danger: 'bg-danger-500 text-white hover:bg-danger-600',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-3.5 py-2',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-[15px] px-6 py-3',
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
