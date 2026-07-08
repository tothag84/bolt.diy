import { useState } from 'react';
import { Check, DollarSign, Heart } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Logo';
import { useAuth, useGalleries } from '@/lib/store';
import { PLANS, formatStorage, planById, storageUsedMb } from '@/lib/plans';
import { toast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import type { PlanId } from '@/lib/types';

export function Settings() {
  const { user, updateUser } = useAuth();
  const collections = useGalleries((s) => s.collections);
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    studioName: user?.studioName ?? '',
  });
  if (!user) return null;

  const plan = planById(user.plan);
  const usedMb = storageUsedMb(collections);
  const totalTips = collections.reduce((n, c) => n + c.tipTotal, 0);
  const tipCount = collections.reduce((n, c) => n + c.tipCount, 0);

  return (
    <DashboardLayout>
      <h1 className="font-display text-2xl font-bold text-neutral-950 sm:text-3xl">Settings</h1>
      <p className="mt-1 text-sm text-neutral-600">Manage your profile, plan and storage.</p>

      <div className="mt-8 space-y-8">
        {/* Profile */}
        <section className="card p-6">
          <h2 className="font-display text-lg font-semibold text-neutral-950">Profile</h2>
          <div className="mt-5 flex items-center gap-4">
            <Avatar seed={user.avatarSeed} name={user.name} size={64} />
            <div>
              <p className="text-sm font-medium text-neutral-950">{user.studioName}</p>
              <p className="text-xs text-neutral-500">Member since {new Date(user.createdAt).getFullYear()}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Studio name">
              <Input value={form.studioName} onChange={(e) => setForm({ ...form, studioName: e.target.value })} />
            </Field>
            <Field label="Email">
              <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
          </div>
          <Button
            className="mt-5"
            onClick={() => {
              updateUser({ name: form.name, email: form.email, studioName: form.studioName });
              toast.success('Profile updated');
            }}
          >
            Save changes
          </Button>
        </section>

        {/* Plan & storage */}
        <section className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-neutral-950">Plan & storage</h2>
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
              {plan.name} plan
            </span>
          </div>

          {/* Usage */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Usage label="Galleries used" value={`${collections.length} / ${plan.galleries}`} pct={(collections.length / plan.galleries) * 100} />
            <Usage
              label="Storage used"
              value={`${formatStorage(usedMb)} / ${formatStorage(plan.storageMb)}`}
              pct={(usedMb / plan.storageMb) * 100}
            />
          </div>

          {/* Plan options */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {PLANS.map((p) => {
              const active = p.id === user.plan;
              return (
                <div
                  key={p.id}
                  className={cn(
                    'rounded-2xl border p-5',
                    active ? 'border-accent-400 bg-accent-50' : 'border-neutral-200 bg-white',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-950">{p.name}</span>
                    {active && <Check className="h-4 w-4 text-accent-600" />}
                  </div>
                  <div className="mt-2 font-display text-2xl font-bold text-neutral-950">
                    {p.priceMonthly === 0 ? 'Free' : `$${p.priceMonthly}`}
                    {p.priceMonthly > 0 && <span className="text-sm font-normal text-neutral-500">/mo</span>}
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    {p.galleries} galleries · {formatStorage(p.storageMb)}
                  </p>
                  <Button
                    variant={active ? 'outline' : 'primary'}
                    size="sm"
                    className="mt-4 w-full"
                    disabled={active}
                    onClick={() => {
                      updateUser({ plan: p.id as PlanId });
                      toast.success(p.id === 'free' ? 'Switched to the Free plan' : 'Upgraded to Plus — enjoy the extra room!');
                    }}
                  >
                    {active ? 'Current plan' : p.id === 'free' ? 'Switch to Free' : 'Upgrade to Plus'}
                  </Button>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-neutral-400">Payments are a demo in this prototype — no card is charged.</p>
        </section>

        {/* Tips received */}
        <section className="card p-6">
          <h2 className="font-display text-lg font-semibold text-neutral-950">Tips received</h2>
          <p className="mt-1 text-sm text-neutral-600">What your clients have tipped you across all galleries.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <DollarSign className="h-4 w-4 text-accent-600" /> Total tips
              </div>
              <div className="mt-2 font-display text-3xl font-bold text-neutral-950">${totalTips}</div>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Heart className="h-4 w-4 text-accent-600" /> Number of tips
              </div>
              <div className="mt-2 font-display text-3xl font-bold text-neutral-950">{tipCount}</div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function Usage({ label, value, pct }: { label: string; value: string; pct: number }) {
  const clamped = Math.min(100, Math.round(pct));
  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-600">{label}</span>
        <span className="font-medium tabular-nums text-neutral-950">{value}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-200">
        <div
          className={cn('h-full rounded-full', clamped >= 100 ? 'bg-danger-500' : 'bg-accent-500')}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
