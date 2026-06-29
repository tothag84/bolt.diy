import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PLANS } from '@/lib/plans';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function PricingTiers() {
  const [yearly, setYearly] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {/* Billing toggle */}
      <div className="mb-10 flex items-center justify-center gap-3">
        <span className={cn('text-sm', !yearly ? 'text-neutral-950' : 'text-neutral-500')}>Monthly</span>
        <button
          onClick={() => setYearly((y) => !y)}
          className="relative h-6 w-11 rounded-full bg-neutral-300 transition focus-ring"
          aria-label="Toggle billing period"
        >
          <span
            className={cn(
              'absolute top-1 h-4 w-4 rounded-full bg-accent-500 transition-all duration-300',
              yearly ? 'left-6' : 'left-1',
            )}
          />
        </button>
        <span className={cn('text-sm', yearly ? 'text-neutral-950' : 'text-neutral-500')}>
          Yearly <span className="ml-1 rounded-full bg-accent-50 px-2 py-0.5 text-xs text-accent-700">2 months free</span>
        </span>
      </div>

      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
        {PLANS.map((plan) => {
          const price = plan.priceMonthly === 0 ? 0 : yearly ? plan.priceYearly : plan.priceMonthly;
          const suffix = plan.priceMonthly === 0 ? '' : yearly ? '/yr' : '/mo';
          return (
            <div
              key={plan.id}
              className={cn(
                'flex flex-col rounded-2xl border p-7',
                plan.highlight ? 'border-accent-400 bg-white shadow-card' : 'border-neutral-200 bg-white',
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-neutral-950">{plan.name}</h3>
                {plan.highlight && (
                  <span className="rounded-full bg-accent-400 px-2.5 py-0.5 text-xs font-semibold text-neutral-950">
                    Best value
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-neutral-600">{plan.blurb}</p>

              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-4xl font-extrabold text-neutral-950">${price}</span>
                <span className="mb-1 text-sm text-neutral-500">{suffix}</span>
              </div>

              <Button
                variant={plan.highlight ? 'primary' : 'outline'}
                className="mt-6 w-full"
                onClick={() => navigate(plan.id === 'free' ? '/signup' : '/signup?upgrade=1')}
              >
                {plan.cta}
              </Button>

              <ul className="mt-7 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
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
