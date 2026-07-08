import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'Is FPG really free?',
    a: 'Yes. The Free plan gives you up to 5 galleries and 500 MB of storage, forever — no credit card needed. You only pay if you want more room.',
  },
  {
    q: 'What does upgrading get me?',
    a: 'The Plus plan is $5/month (or $50/year) and raises your limits to 25 galleries and 2 GB of total storage. Everything else works the same.',
  },
  {
    q: 'How do client tips work?',
    a: 'Clients can leave an optional tip for the photographer right inside a gallery — a simple way to say thank you. Tipping is always optional and 100% goes to you.',
  },
  {
    q: 'How do clients access their gallery?',
    a: 'You share a single private link. Clients browse on any device — optionally protected by a PIN — with no account required.',
  },
  {
    q: 'Can clients favorite and download photos?',
    a: 'Yes. Clients can mark favorites to share their selects with you and download in the resolutions you allow — per photo or the whole gallery.',
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white px-5 sm:px-7">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-medium text-neutral-950">{f.q}</span>
              <Plus
                className={cn(
                  'h-5 w-5 shrink-0 text-accent-600 transition-transform duration-300',
                  isOpen && 'rotate-45',
                )}
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
                  <p className="pb-5 pr-10 text-sm leading-relaxed text-neutral-600">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
