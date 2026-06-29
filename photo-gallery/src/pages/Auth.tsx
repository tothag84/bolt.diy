import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';
import { PhotoImage } from '@/components/gallery/PhotoImage';
import { useAuth } from '@/lib/store';
import { PLANS, planById } from '@/lib/plans';
import { toast } from '@/components/ui/Toast';
import type { PlanId } from '@/lib/types';
import { cn } from '@/lib/utils';

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Logo />
        <div className="flex flex-1 items-center justify-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm"
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Visual side */}
      <div className="relative hidden overflow-hidden lg:block">
        <PhotoImage seed="auth-cover" w={1200} h={1600} priority className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-brand-900/30" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <blockquote className="max-w-md font-display text-2xl font-semibold leading-snug text-white">
            “Lumière turned my gallery delivery into the best part of the client experience.”
          </blockquote>
          <p className="mt-4 text-sm text-zinc-300">Sofia Marchetti — Wedding Photographer</p>
        </div>
      </div>
    </div>
  );
}

export function SignUp() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const signUp = useAuth((s) => s.signUp);
  const initialPlan = (params.get('plan') as PlanId) || 'pro';
  const [plan, setPlan] = useState<PlanId>(planById(initialPlan) ? initialPlan : 'pro');
  const [form, setForm] = useState({ name: '', email: '', studioName: '', password: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Please add your name and email');
      return;
    }
    signUp({ name: form.name, email: form.email, studioName: form.studioName, plan });
    toast.success(`Welcome to Lumière, ${form.name.split(' ')[0]}!`);
    navigate('/app');
  };

  return (
    <AuthShell>
      <h1 className="font-display text-3xl font-bold text-white">Create your studio</h1>
      <p className="mt-2 text-sm text-zinc-400">Start free — no credit card required.</p>

      <form onSubmit={submit} className="mt-7 space-y-4">
        <Field label="Full name">
          <Input
            placeholder="Alex Rivera"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            autoComplete="name"
          />
        </Field>
        <Field label="Studio name" hint="You can change this later.">
          <Input
            placeholder="Rivera Photography"
            value={form.studioName}
            onChange={(e) => setForm({ ...form, studioName: e.target.value })}
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            placeholder="you@studio.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="new-password"
          />
        </Field>

        <div>
          <span className="mb-2 block text-sm font-medium text-zinc-300">Choose a plan</span>
          <div className="grid grid-cols-3 gap-2">
            {PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlan(p.id)}
                className={cn(
                  'rounded-xl border p-3 text-left transition',
                  plan === p.id
                    ? 'border-brand-400/60 bg-brand-500/10'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20',
                )}
              >
                <span className="flex items-center justify-between text-sm font-semibold text-white">
                  {p.name}
                  {plan === p.id && <Check className="h-3.5 w-3.5 text-brand-300" />}
                </span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                  {p.priceMonthly === 0 ? 'Free' : `$${p.priceMonthly}/mo`}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Create account <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{' '}
        <Link to="/signin" className="font-medium text-brand-300 hover:text-brand-200">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}

export function SignIn() {
  const navigate = useNavigate();
  const signIn = useAuth((s) => s.signIn);
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) {
      toast.error('Please enter your email');
      return;
    }
    const u = signIn(form.email);
    toast.success(`Welcome back, ${u.name.split(' ')[0]}!`);
    navigate('/app');
  };

  return (
    <AuthShell>
      <h1 className="font-display text-3xl font-bold text-white">Welcome back</h1>
      <p className="mt-2 text-sm text-zinc-400">Sign in to manage your galleries.</p>

      <form onSubmit={submit} className="mt-7 space-y-4">
        <Field label="Email">
          <Input
            type="email"
            placeholder="you@studio.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="current-password"
          />
        </Field>
        <Button type="submit" className="w-full" size="lg">
          Sign in <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-3 text-center text-xs text-zinc-600">
        Demo mode — any email signs you in.
      </p>

      <p className="mt-6 text-center text-sm text-zinc-500">
        New to Lumière?{' '}
        <Link to="/signup" className="font-medium text-brand-300 hover:text-brand-200">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
