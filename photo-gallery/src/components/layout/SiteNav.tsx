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
  { label: 'Pricing', id: 'pricing' },
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
        scrolled ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="rounded-lg px-3.5 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
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
          className="grid h-10 w-10 place-items-center rounded-lg text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink-950/95 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  scrollToId(l.id);
                  setOpen(false);
                }}
                className="rounded-lg px-3 py-2.5 text-left text-sm text-zinc-300 hover:bg-white/5"
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
    { title: 'Product', items: ['Features', 'Pricing', 'Showcase', 'Mobile apps'] },
    { title: 'Company', items: ['About', 'Blog', 'Careers', 'Contact'] },
    { title: 'Resources', items: ['Help center', 'Photographer guides', 'API', 'Status'] },
    { title: 'Legal', items: ['Privacy', 'Terms', 'Cookies', 'Licenses'] },
  ];
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              Beautiful client galleries, proofing and print sales for modern photographers.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-3 text-sm font-semibold text-white">{c.title}</h4>
              <ul className="space-y-2">
                {c.items.map((it) => (
                  <li key={it}>
                    <Link to="/" className="text-sm text-zinc-500 transition hover:text-white">
                      {it}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-zinc-600 sm:flex-row">
          <span>© {new Date().getFullYear()} Lumière Studio Inc. All rights reserved.</span>
          <span>Crafted for photographers who care about the details.</span>
        </div>
      </div>
    </footer>
  );
}
