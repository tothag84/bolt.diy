import { useState } from 'react';
import { DollarSign, Heart } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Logo';
import { DonateModal } from '@/components/ui/Donate';
import { useAuth, useGalleries } from '@/lib/store';
import { toast } from '@/components/ui/Toast';

export function Settings() {
  const { user, updateUser } = useAuth();
  const collections = useGalleries((s) => s.collections);
  const [donate, setDonate] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    studioName: user?.studioName ?? '',
  });
  if (!user) return null;

  const totalTips = collections.reduce((n, c) => n + c.tipTotal, 0);
  const tipCount = collections.reduce((n, c) => n + c.tipCount, 0);

  return (
    <DashboardLayout>
      <h1 className="font-display text-2xl font-bold text-neutral-950 sm:text-3xl">Settings</h1>
      <p className="mt-1 text-sm text-neutral-600">Manage your profile and support the project.</p>

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
          <p className="mt-4 text-xs text-neutral-400">
            Connect a payout method to withdraw tips. Payments are a demo in this prototype.
          </p>
        </section>

        {/* Support Lumière */}
        <section className="rounded-xl border border-accent-200 bg-accent-50 p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-lg font-semibold text-neutral-950">Lumière is free — forever</h2>
              <p className="mt-1 text-sm text-neutral-600">
                No subscription, ever. If Lumière helps your studio, a small donation keeps it running for everyone.
              </p>
            </div>
            <Button className="shrink-0" onClick={() => setDonate(true)}>
              <Heart className="h-4 w-4" /> Support Lumière
            </Button>
          </div>
        </section>
      </div>

      <DonateModal
        open={donate}
        onClose={() => setDonate(false)}
        recipient="Lumière"
        subtitle="Thanks for considering a donation — it covers hosting and keeps Lumière free for all photographers."
      />
    </DashboardLayout>
  );
}
