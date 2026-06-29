import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { toast } from './Toast';
import { TIP_PRESETS } from '@/lib/donations';
import { cn } from '@/lib/utils';

export function DonateModal({
  open,
  onClose,
  recipient,
  subtitle,
  onDonate,
}: {
  open: boolean;
  onClose: () => void;
  /** Who is being supported, e.g. a photographer name or "Lumière". */
  recipient: string;
  subtitle?: string;
  onDonate?: (amount: number) => void;
}) {
  const [amount, setAmount] = useState<number>(TIP_PRESETS[1]);
  const [custom, setCustom] = useState('');

  const value = custom ? Math.max(1, Math.round(Number(custom) || 0)) : amount;

  const confirm = () => {
    if (!value || value < 1) {
      toast.error('Pick an amount first');
      return;
    }
    onDonate?.(value);
    onClose();
    toast.success(`Thank you! Your $${value} tip means a lot 💚`);
    setCustom('');
    setAmount(TIP_PRESETS[1]);
  };

  return (
    <Modal open={open} onClose={onClose} title={`Support ${recipient}`}>
      <p className="mb-5 text-sm text-neutral-600">
        {subtitle ?? 'Every tip is optional and helps keep beautiful galleries free. Choose an amount:'}
      </p>

      <div className="grid grid-cols-4 gap-2">
        {TIP_PRESETS.map((p) => {
          const active = !custom && amount === p;
          return (
            <button
              key={p}
              onClick={() => {
                setAmount(p);
                setCustom('');
              }}
              className={cn(
                'rounded-lg border py-2.5 text-sm font-semibold transition',
                active
                  ? 'border-accent-400 bg-accent-50 text-accent-700'
                  : 'border-neutral-300 text-neutral-700 hover:border-neutral-400',
              )}
            >
              ${p}
            </button>
          );
        })}
      </div>

      <div className="mt-3">
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
            $
          </span>
          <Input
            type="number"
            min={1}
            placeholder="Custom amount"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="pl-7"
          />
        </div>
      </div>

      <Button className="mt-5 w-full" size="lg" onClick={confirm}>
        <Heart className="h-4 w-4" /> Send ${value || 0} tip
      </Button>
      <p className="mt-3 text-center text-xs text-neutral-400">Demo only — no real payment is processed.</p>
    </Modal>
  );
}
