import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'How do clients access their gallery?',
    a: 'You share a single private link. Clients can browse on any device, optionally protected by a PIN, with no account required. Branded emails are available on Pro and Studio.',
  },
  {
    q: 'Can clients favorite and download photos?',
    a: 'Yes. Clients can mark favorites to share their selects with you, leave comments, and download in the resolutions you allow — per photo or the whole gallery as a zip.',
  },
  {
    q: 'Do you sell prints and digital downloads?',
    a: 'The Studio plan includes a built-in store with automated lab fulfillment for prints, plus digital download products with your own pricing, coupons and sales tax.',
  },
  {
    q: 'Can I use my own branding and domain?',
    a: 'Absolutely. Add your logo, colors, custom welcome screens and connect a custom domain so every gallery feels unmistakably yours.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes — Starter is free forever with 3 active galleries. Upgrade any time; paid plans include a 14-day trial with no card required.',
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-white/10">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="py-1">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-medium text-white">{f.q}</span>
              <Plus
                className={cn('h-5 w-5 shrink-0 text-brand-300 transition-transform duration-300', isOpen && 'rotate-45')}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-10 text-sm leading-relaxed text-zinc-400">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
