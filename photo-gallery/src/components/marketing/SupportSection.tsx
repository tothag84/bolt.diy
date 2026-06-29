import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DonateModal } from '@/components/ui/Donate';
import { FREE_FEATURES, SUPPORT_POINTS } from '@/lib/donations';

export function SupportSection() {
  const navigate = useNavigate();
  const [donate, setDonate] = useState(false);

  return (
    <div>
      {/* Free callout */}
      <div className="mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-card sm:p-10">
          <span className="pill">
            <Heart className="h-3.5 w-3.5 text-accent-600" /> Free forever
          </span>
          <div className="mt-5 flex items-end gap-2">
            <span className="font-display text-6xl font-extrabold tracking-tight text-neutral-950">$0</span>
            <span className="mb-2 text-neutral-500">/ forever</span>
          </div>
          <p className="mt-2 text-neutral-600">
            Every feature, free for every photographer. No paywalls, no per-gallery fees, no credit card.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FREE_FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-2.5 text-sm text-neutral-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                {f}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="sm:flex-1" onClick={() => navigate('/signup')}>
              Get started free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="sm:flex-1" onClick={() => setDonate(true)}>
              <Heart className="h-4 w-4 text-accent-600" /> Support the project
            </Button>
          </div>
        </div>
      </div>

      {/* Why it's free */}
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
        {SUPPORT_POINTS.map((p) => (
          <div key={p.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <h3 className="font-display text-base font-semibold text-neutral-950">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{p.body}</p>
          </div>
        ))}
      </div>

      <DonateModal
        open={donate}
        onClose={() => setDonate(false)}
        recipient="Lumière"
        subtitle="Lumière is free for everyone. Donations cover hosting and keep it that way — thank you!"
      />
    </div>
  );
}
