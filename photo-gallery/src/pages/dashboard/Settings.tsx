import { useState } from 'react';
import { Check, CreditCard } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Logo';
import { useAuth } from '@/lib/store';
import { PLANS, planById } from '@/lib/plans';
import { toast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import type { PlanId } from '@/lib/types';

export function Settings() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    studioName: user?.studioName ?? '',
  });
  if (!user) return null;
  const currentPlan = planById(user.plan);

  return (
    <DashboardLayout>
      <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">Settings</h1>
      <p className="mt-1 text-sm text-zinc-400">Manage your profile, branding and subscription.</p>

      <div className="mt-8 space-y-8">
        {/* Profile */}
        <section className="card p-6">
          <h2 className="font-display text-lg font-semibold text-white">Profile</h2>
          <div className="mt-5 flex items-center gap-4">
            <Avatar seed={user.avatarSeed} name={user.name} size={64} />
            <div>
              <p className="text-sm font-medium text-white">{user.studioName}</p>
              <p className="text-xs text-zinc-500">Member since {new Date(user.createdAt).getFullYear()}</p>
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

        {/* Subscription */}
        <section className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-white">Subscription</h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/15 px-3 py-1 text-xs font-medium text-brand-200">
              <CreditCard className="h-3.5 w-3.5" /> {currentPlan?.name} plan
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-400">
            You're on the <span className="text-white">{currentPlan?.name}</span> plan — {currentPlan?.storage}.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {PLANS.map((p) => {
              const active = p.id === user.plan;
              return (
                <div
                  key={p.id}
                  className={cn(
                    'rounded-2xl border p-5 transition',
                    active ? 'border-brand-400/60 bg-brand-500/10' : 'border-white/10 bg-white/[0.02]',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{p.name}</span>
                    {active && <Check className="h-4 w-4 text-brand-300" />}
                  </div>
                  <div className="mt-2 font-display text-2xl font-bold text-white">
                    {p.priceMonthly === 0 ? 'Free' : `$${p.priceMonthly}`}
                    {p.priceMonthly > 0 && <span className="text-sm font-normal text-zinc-500">/mo</span>}
                  </div>
                  <Button
                    variant={active ? 'outline' : 'primary'}
                    size="sm"
                    className="mt-4 w-full"
                    disabled={active}
                    onClick={() => {
                      updateUser({ plan: p.id as PlanId });
                      toast.success(`Switched to the ${p.name} plan`);
                    }}
                  >
                    {active ? 'Current plan' : `Switch to ${p.name}`}
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
