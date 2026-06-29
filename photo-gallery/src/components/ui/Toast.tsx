import { create } from 'zustand';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, XCircle } from 'lucide-react';
import { uid } from '@/lib/utils';

type ToastKind = 'success' | 'error' | 'info';
interface Toast {
  id: string;
  message: string;
  kind: ToastKind;
}

interface ToastState {
  toasts: Toast[];
  push: (message: string, kind?: ToastKind) => void;
  remove: (id: string) => void;
}

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  push: (message, kind = 'success') => {
    const id = uid('toast');
    set((s) => ({ toasts: [...s.toasts, { id, message, kind }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3200);
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

/** Convenience helper for non-component callers. */
export const toast = {
  success: (m: string) => useToast.getState().push(m, 'success'),
  error: (m: string) => useToast.getState().push(m, 'error'),
  info: (m: string) => useToast.getState().push(m, 'info'),
};

const icons = {
  success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
  error: <XCircle className="h-5 w-5 text-red-400" />,
  info: <Info className="h-5 w-5 text-brand-300" />,
};

export function ToastViewport() {
  const { toasts, remove } = useToast();
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-full max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            onClick={() => remove(t.id)}
            className="pointer-events-auto flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-ink-800/90 px-4 py-3 text-sm text-white shadow-card backdrop-blur-xl"
          >
            {icons[t.kind]}
            <span className="flex-1">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
