import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PLANS } from '@/lib/plans';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function PricingTable() {
  const [yearly, setYearly] = useState(true);
  const navigate = useNavigate();

  return (
    <div>
      {/* Billing toggle */}
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className={cn('text-sm', !yearly ? 'text-white' : 'text-zinc-500')}>Monthly</span>
        <button
          onClick={() => setYearly((y) => !y)}
          className="relative h-7 w-12 rounded-full bg-white/10 transition focus-ring"
          aria-label="Toggle billing period"
        >
          <span
            className={cn(
              'absolute top-1 h-5 w-5 rounded-full brand-gradient transition-all duration-300',
              yearly ? 'left-6' : 'left-1',
            )}
          />
        </button>
        <span className={cn('text-sm', yearly ? 'text-white' : 'text-zinc-500')}>
          Yearly <span className="ml-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-300">Save 20%</span>
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const price = yearly ? Math.round(plan.priceYearly / 12) : plan.priceMonthly;
          return (
            <div
              key={plan.id}
              className={cn(
                'relative flex flex-col rounded-3xl border p-7 transition-transform duration-300 hover:-translate-y-1',
                plan.highlight
                  ? 'border-brand-400/40 bg-gradient-to-b from-brand-500/10 to-transparent shadow-glow'
                  : 'border-white/10 bg-ink-900/50',
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full brand-gradient px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-1.5 text-sm text-zinc-400">{plan.tagline}</p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-4xl font-extrabold text-white">${price}</span>
                <span className="mb-1 text-sm text-zinc-500">/mo</span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                {plan.priceMonthly === 0 ? 'Free forever' : yearly ? 'billed annually' : 'billed monthly'}
              </p>

              <Button
                variant={plan.highlight ? 'primary' : 'outline'}
                className="mt-6 w-full"
                onClick={() => navigate(`/signup?plan=${plan.id}`)}
              >
                {plan.cta}
              </Button>

              <ul className="mt-7 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
