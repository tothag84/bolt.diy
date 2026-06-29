import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Heart, Images, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { Logo, Avatar } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { DonateModal } from '@/components/ui/Donate';
import { useAuth } from '@/lib/store';
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
  const [donate, setDonate] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-neutral-200 bg-white p-5 lg:flex">
        <Logo to="/app" />

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition',
                  isActive ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950',
                )
              }
            >
              <n.icon className="h-[18px] w-[18px]" />
              {n.label}
            </NavLink>
          ))}
        </nav>

        {/* Support card */}
        <div className="mb-3 rounded-xl border border-accent-200 bg-accent-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
            <Heart className="h-4 w-4 text-accent-600" /> Lumière is free
          </div>
          <p className="mt-1 text-xs text-neutral-600">Donations keep galleries free for everyone.</p>
          <Button size="sm" className="mt-3 w-full" onClick={() => setDonate(true)}>
            Support us
          </Button>
        </div>

        <button
          onClick={() => {
            signOut();
            toast.info('Signed out');
            navigate('/');
          }}
          className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
        >
          <LogOut className="h-[18px] w-[18px]" /> Sign out
        </button>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-col">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-3 lg:hidden">
          <Logo to="/app" />
          {user && <Avatar seed={user.avatarSeed} name={user.name} size={32} />}
        </div>

        {/* Desktop header */}
        <header className="hidden items-center justify-between border-b border-neutral-200 bg-white px-8 py-4 lg:flex">
          <div />
          <div className="flex items-center gap-3">
            <Button size="sm" onClick={() => navigate('/app/collections/new')}>
              + New collection
            </Button>
            {user && (
              <div className="flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white py-1 pl-1 pr-3">
                <Avatar seed={user.avatarSeed} name={user.name} size={28} />
                <span className="text-sm text-neutral-700">{user.studioName}</span>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>

        {/* Mobile bottom nav */}
        <div className="sticky bottom-0 z-30 grid grid-cols-3 border-t border-neutral-200 bg-white/90 backdrop-blur lg:hidden">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn('flex flex-col items-center gap-1 py-2.5 text-[11px]', isActive ? 'text-accent-700' : 'text-neutral-500')
              }
            >
              <n.icon className="h-5 w-5" />
              {n.label}
            </NavLink>
          ))}
        </div>
      </div>

      <DonateModal
        open={donate}
        onClose={() => setDonate(false)}
        recipient="Lumière"
        subtitle="Lumière is free for every photographer. If it helps you, a small tip keeps it running."
      />
    </div>
  );
}
