import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';
import { PhotoImage } from '@/components/gallery/PhotoImage';
import { useAuth } from '@/lib/store';
import { toast } from '@/components/ui/Toast';
import { planById } from '@/lib/plans';

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
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <blockquote className="max-w-md font-display text-2xl font-semibold leading-snug text-white">
            “Free, gorgeous galleries my clients love — and the tips are a lovely bonus.”
          </blockquote>
          <p className="mt-4 text-sm text-white/70">Sofia Marchetti — Wedding Photographer</p>
        </div>
      </div>
    </div>
  );
}

export function SignUp() {
  const navigate = useNavigate();
  const signUp = useAuth((s) => s.signUp);
  const [form, setForm] = useState({ name: '', email: '', studioName: '', password: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Please add your name and email');
      return;
    }
    signUp({ name: form.name, email: form.email, studioName: form.studioName });
    toast.success(`Welcome to FPG, ${form.name.split(' ')[0]}!`);
    navigate('/app');
  };

  return (
    <AuthShell>
      <span className="pill mb-4">100% free — no card required</span>
      <h1 className="font-display text-3xl font-bold text-neutral-950">Create your studio</h1>
      <p className="mt-2 text-sm text-neutral-600">Start sharing beautiful galleries in minutes.</p>

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

        <Button type="submit" className="w-full" size="lg">
          Create free account <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <ul className="mt-6 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {planById('free').features.slice(0, 4).map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-neutral-500">
            <Check className="h-3.5 w-3.5 text-accent-600" /> {f}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Already have an account?{' '}
        <Link to="/signin" className="font-medium text-accent-700 hover:text-accent-800">
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
      <h1 className="font-display text-3xl font-bold text-neutral-950">Welcome back</h1>
      <p className="mt-2 text-sm text-neutral-600">Sign in to manage your galleries.</p>

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

      <p className="mt-3 text-center text-xs text-neutral-400">Demo mode — any email signs you in.</p>

      <p className="mt-6 text-center text-sm text-neutral-500">
        New to FPG?{' '}
        <Link to="/signup" className="font-medium text-accent-700 hover:text-accent-800">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
