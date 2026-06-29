import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button, LinkButton } from '@/components/ui/Button';
import { useAuth } from '@/lib/store';
import { cn, scrollToId } from '@/lib/utils';

const links = [
  { label: 'Features', id: 'features' },
  { label: 'Showcase', id: 'showcase' },
  { label: 'Why free', id: 'support' },
  { label: 'FAQ', id: 'faq' },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled ? 'border-b border-neutral-200 bg-white/80 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="rounded-lg px-3.5 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <LinkButton to="/app" size="sm">
              Dashboard
            </LinkButton>
          ) : (
            <>
              <LinkButton to="/signin" variant="ghost" size="sm">
                Sign in
              </LinkButton>
              <LinkButton to="/signup" size="sm">
                Start free
              </LinkButton>
            </>
          )}
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-neutral-900 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-neutral-200 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  scrollToId(l.id);
                  setOpen(false);
                }}
                className="rounded-lg px-3 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-100"
              >
                {l.label}
              </button>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2">
              {user ? (
                <Button className="col-span-2" onClick={() => navigate('/app')}>
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => navigate('/signin')}>
                    Sign in
                  </Button>
                  <Button onClick={() => navigate('/signup')}>Start free</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const cols = [
    { title: 'Product', items: ['Features', 'Showcase', 'Why it’s free', 'Mobile'] },
    { title: 'Company', items: ['About', 'Blog', 'Careers', 'Contact'] },
    { title: 'Resources', items: ['Help center', 'Photographer guides', 'Status', 'Changelog'] },
    { title: 'Legal', items: ['Privacy', 'Terms', 'Cookies', 'Licenses'] },
  ];
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-neutral-500">
              Free, beautiful client galleries for photographers — supported by tips, not paywalls.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-3 text-sm font-semibold text-neutral-900">{c.title}</h4>
              <ul className="space-y-2">
                {c.items.map((it) => (
                  <li key={it}>
                    <Link to="/" className="text-sm text-neutral-500 transition hover:text-neutral-900">
                      {it}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-400 sm:flex-row">
          <span>© {new Date().getFullYear()} Lumière. Made for photographers.</span>
          <span>Free forever · Powered by community donations.</span>
        </div>
      </div>
    </footer>
  );
}
