import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const fieldCls =
  'w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 transition-colors focus-ring focus-visible:border-brand-400/50 hover:border-white/20';

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(fieldCls, className)} {...props} />,
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldCls, 'resize-none', className)} {...props} />
  ),
);
Textarea.displayName = 'Textarea';

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(fieldCls, 'appearance-none cursor-pointer', className)} {...props}>
      {children}
    </select>
  ),
);
Select.displayName = 'Select';

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      {children}
      {hint && <span className="block text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}
