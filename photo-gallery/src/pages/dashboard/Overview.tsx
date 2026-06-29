import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Eye, Heart, Images, Plus, DollarSign } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PhotoImage } from '@/components/gallery/PhotoImage';
import { useAuth, useGalleries } from '@/lib/store';
import { classByStatus, pluralize, relativeTime } from '@/lib/utils';

export function Overview() {
  const user = useAuth((s) => s.user)!;
  const collections = useGalleries((s) => s.collections);
  const navigate = useNavigate();

  const totalViews = collections.reduce((n, c) => n + c.views, 0);
  const totalFavs = collections.reduce(
    (n, c) => n + c.photos.reduce((m, p) => m + (p.favoritedBy?.length ?? 0), 0),
    0,
  );
  const totalTips = collections.reduce((n, c) => n + c.tipTotal, 0);

  const stats = [
    { label: 'Collections', value: collections.length, icon: Images, trend: '+2 this month' },
    { label: 'Gallery views', value: totalViews.toLocaleString(), icon: Eye, trend: '+18% vs last month' },
    { label: 'Client favorites', value: totalFavs, icon: Heart, trend: 'selects received' },
    { label: 'Tips received', value: `$${totalTips}`, icon: DollarSign, trend: 'from happy clients' },
  ];

  const recent = [...collections].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).slice(0, 3);

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-950 sm:text-3xl">
            Good to see you, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-neutral-600">Here's how your studio is doing today.</p>
        </div>
        <Button onClick={() => navigate('/app/collections/new')}>
          <Plus className="h-4 w-4" /> New collection
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">{s.label}</span>
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-accent-200 bg-accent-50 text-accent-700">
                <s.icon className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 font-display text-3xl font-bold text-neutral-950">{s.value}</div>
            <div className="mt-1 text-xs text-neutral-500">{s.trend}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent collections */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-neutral-950">Recent collections</h2>
        <Link
          to="/app/collections"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent-700 hover:text-accent-800"
        >
          View all <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recent.map((c) => (
          <Link key={c.id} to={`/app/collections/${c.id}`} className="group card overflow-hidden hover:shadow-soft">
            <PhotoImage
              seed={c.coverSeed}
              w={600}
              h={400}
              className="aspect-[16/10] w-full"
              imgClassName="group-hover:scale-105"
            />
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate font-medium text-neutral-950">{c.title}</h3>
                <Badge className={classByStatus(c.status)}>{c.status}</Badge>
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                {pluralize(c.photos.length, 'photo')} · updated {relativeTime(c.updatedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
}
