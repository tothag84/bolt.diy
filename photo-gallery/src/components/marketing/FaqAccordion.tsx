import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'Is Lumière really free?',
    a: 'Yes — completely free for every photographer, with unlimited galleries and photos. There are no paywalls or per-gallery fees. Lumière is supported by optional donations.',
  },
  {
    q: 'How do donations and tips work?',
    a: "If Lumière helps you, you can chip in any amount to keep it running. Clients can also leave a tip for the photographer right inside a gallery — a simple way to say thank you. Tipping is always optional.",
  },
  {
    q: 'How do clients access their gallery?',
    a: 'You share a single private link. Clients browse on any device — optionally protected by a PIN — with no account required.',
  },
  {
    q: 'Can clients favorite and download photos?',
    a: 'Yes. Clients can mark favorites to share their selects with you and download in the resolutions you allow — per photo or the whole gallery.',
  },
  {
    q: "What's the catch if it's free?",
    a: "No catch. We keep costs low and rely on community donations instead of subscriptions. Use it as much as you like, and support the project only if you want to.",
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
