import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Images, LayoutDashboard, LogOut, Settings, Sparkles } from 'lucide-react';
import { Logo, Avatar } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/store';
import { planById } from '@/lib/plans';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/Toast';

const nav = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/app/collections', label: 'Collections', icon: Images, end: false },
  { to: '/app/settings', label: 'Settings', icon: Settings, end: false },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const plan = user ? planById(user.plan) : undefined;

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-white/10 bg-ink-900/40 p-5 lg:flex">
        <Logo to="/app" />

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-white/10 text-white shadow-inner'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                )
              }
            >
              <n.icon className="h-[18px] w-[18px]" />
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Plan card */}
        <div className="mb-3 rounded-2xl border border-white/10 bg-gradient-to-br from-brand-500/15 to-fuchsia-500/10 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Sparkles className="h-4 w-4 text-brand-300" />
            {plan?.name} plan
          </div>
          <p className="mt-1 text-xs text-zinc-400">{plan?.storage}</p>
          <Link
            to="/app/settings"
            className="mt-3 inline-block text-xs font-medium text-brand-300 hover:text-brand-200"
          >
            Manage subscription →
          </Link>
        </div>

        <button
          onClick={() => {
            signOut();
            toast.info('Signed out');
            navigate('/');
          }}
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px]" /> Sign out
        </button>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-col">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-ink-900/40 px-5 py-3 lg:hidden">
          <Logo to="/app" />
          <div className="flex items-center gap-2">
            {user && <Avatar seed={user.avatarSeed} name={user.name} size={32} />}
          </div>
        </div>

        {/* Desktop header */}
        <header className="hidden items-center justify-between border-b border-white/10 px-8 py-4 lg:flex">
          <div />
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={() => navigate('/app/collections/new')}>
              + New collection
            </Button>
            {user && (
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3">
                <Avatar seed={user.avatarSeed} name={user.name} size={28} />
                <span className="text-sm text-zinc-300">{user.studioName}</span>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>

        {/* Mobile bottom nav */}
        <div className="sticky bottom-0 z-30 grid grid-cols-3 border-t border-white/10 bg-ink-950/90 backdrop-blur lg:hidden">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[11px]',
                  isActive ? 'text-brand-300' : 'text-zinc-500',
                )
              }
            >
              <n.icon className="h-5 w-5" />
              {n.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
