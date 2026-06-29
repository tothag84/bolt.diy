import { motion } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Download,
  Lock,
  Palette,
  Globe,
  Images,
  Sparkles,
  Star,
  Play,
} from 'lucide-react';
import { SiteNav, SiteFooter } from '@/components/layout/SiteNav';
import { Button, LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { PricingTable } from '@/components/marketing/PricingTable';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { PhotoImage } from '@/components/gallery/PhotoImage';
import { scrollToId } from '@/lib/utils';

export function Landing() {
  return (
    <div className="relative overflow-hidden">
      <BackgroundFX />
      <SiteNav />
      <Hero />
      <TrustBar />
      <Features />
      <Showcase />
      <ProofingHighlight />
      <section id="pricing" className="container-px scroll-mt-24 py-24">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing that scales with you"
          subtitle="Start free. Upgrade when your studio grows. Cancel anytime."
        />
        <div className="mt-12">
          <PricingTable />
        </div>
      </section>
      <Testimonials />
      <section id="faq" className="container-px scroll-mt-24 py-24">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-12">
          <FaqAccordion />
        </div>
      </section>
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

/* ----------------------------------- FX ----------------------------------- */

function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-grid-faint bg-[size:64px_64px] mask-fade-b opacity-40" />
      <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />
      <div className="absolute right-[-10%] top-[30%] h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[120px]" />
    </div>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section className="container-px relative pt-36 pb-20 text-center sm:pt-44">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl"
      >
        <button
          onClick={() => scrollToId('features')}
          className="group mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur transition hover:border-white/20"
        >
          <Sparkles className="h-3.5 w-3.5 text-brand-300" />
          New — built-in print store & client proofing
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>

        <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl">
          Client galleries your
          <br />
          <span className="bg-gradient-to-r from-brand-300 via-fuchsia-300 to-brand-200 bg-clip-text text-transparent">
            photos deserve
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Deliver stunning, on-brand galleries your clients love. Let them favorite, download and buy prints — while
          you look effortlessly professional and get paid faster.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton to="/signup" size="lg" className="w-full sm:w-auto">
            Start free — no card needed
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
          <LinkButton to="/g/elena-james-wedding" variant="outline" size="lg" className="w-full sm:w-auto">
            <Play className="h-4 w-4" /> View a live gallery
          </LinkButton>
        </div>
        <p className="mt-4 text-xs text-zinc-500">Loved by 40,000+ photographers worldwide</p>
      </motion.div>

      {/* Hero showcase image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-16 max-w-5xl"
      >
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-card">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-800/60 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/70" />
            <span className="h-3 w-3 rounded-full bg-amber-400/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
            <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-xs text-zinc-400">
              lumiere.studio/g/elena-james-wedding
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-2 sm:grid-cols-4 sm:gap-3 sm:p-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <PhotoImage
                key={i}
                seed={`hero-${i}`}
                w={400}
                h={i % 3 === 0 ? 520 : 300}
                priority={i < 4}
                className={`rounded-xl ${i % 3 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-[4/3]'}`}
              />
            ))}
          </div>
        </div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-ink-800/90 px-5 py-2.5 text-sm text-zinc-300 shadow-card backdrop-blur">
          <span className="inline-flex items-center gap-2">
            <Heart className="h-4 w-4 fill-fuchsia-500 text-fuchsia-500" /> 38 favorites · 1,284 views
          </span>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------- Trust bar ------------------------------- */

function TrustBar() {
  const names = ['VOGUE', 'Aperture', 'StudioMag', 'FRAME', 'Exposé', 'Lensly'];
  return (
    <section className="container-px py-10">
      <p className="mb-6 text-center text-xs uppercase tracking-widest text-zinc-600">
        Trusted by studios featured in
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
        {names.map((n) => (
          <span key={n} className="font-display text-lg font-bold tracking-wide text-zinc-400">
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Features -------------------------------- */

const features = [
  {
    icon: Images,
    title: 'Gorgeous galleries',
    desc: 'Masonry, grid and column layouts with cinematic full-screen viewing. Your work, front and center.',
    span: 'sm:col-span-2',
  },
  {
    icon: Heart,
    title: 'Client proofing',
    desc: 'Clients favorite and comment to send you their selects in one tap.',
    span: '',
  },
  {
    icon: Lock,
    title: 'Private & secure',
    desc: 'PIN-protected galleries and expiring links keep delivery private.',
    span: '',
  },
  {
    icon: Download,
    title: 'Controlled downloads',
    desc: 'Set resolutions, per-photo or full-gallery zip, with download pins.',
    span: '',
  },
  {
    icon: ShoppingBag,
    title: 'Sell prints & digitals',
    desc: 'A built-in store with automated lab fulfillment turns galleries into revenue.',
    span: 'sm:col-span-2',
  },
  {
    icon: Palette,
    title: 'Your brand',
    desc: 'Logo, colors, fonts and welcome screens — galleries that feel like you.',
    span: '',
  },
  {
    icon: Globe,
    title: 'Custom domain',
    desc: 'Host galleries on your own domain for a seamless client experience.',
    span: '',
  },
];

function Features() {
  return (
    <section id="features" className="container-px scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="Everything you need"
        title="From shoot to sale, in one place"
        subtitle="A complete toolkit for delivering, proofing and selling your photography."
      />
      <div className="mt-12 grid auto-rows-fr gap-4 sm:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i} className={f.span}>
            <FeatureCard {...f} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: typeof Heart; title: string; desc: string }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900/50 p-6 transition-all duration-300 hover:border-white/20 hover:bg-ink-900">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-brand-500/20 to-fuchsia-500/10 text-brand-200">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
    </div>
  );
}

/* -------------------------------- Showcase -------------------------------- */

function Showcase() {
  return (
    <section id="showcase" className="container-px scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="Showcase"
        title="Galleries that feel like an experience"
        subtitle="Smooth, immersive and effortless on every device."
      />
      <Reveal className="mt-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {['show-1', 'show-2', 'show-3', 'show-4', 'show-5', 'show-6', 'show-7', 'show-8'].map((s, i) => (
            <PhotoImage
              key={s}
              seed={s}
              w={500}
              h={i % 2 === 0 ? 650 : 500}
              className={`rounded-2xl ${i % 2 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}
              imgClassName="hover:scale-105"
            />
          ))}
        </div>
      </Reveal>
      <div className="mt-10 text-center">
        <LinkButton to="/g/coastal-engagement" variant="outline">
          Explore a sample gallery <ArrowRight className="h-4 w-4" />
        </LinkButton>
      </div>
    </section>
  );
}

/* ---------------------------- Proofing highlight -------------------------- */

function ProofingHighlight() {
  const stats = [
    { value: '40k+', label: 'photographers' },
    { value: '12M', label: 'galleries delivered' },
    { value: '$48M', label: 'earned in sales' },
    { value: '4.9★', label: 'average rating' },
  ];
  return (
    <section className="container-px py-12">
      <div className="grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-ink-900/40 p-8 sm:grid-cols-4 sm:p-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i} className="text-center">
            <div className="font-display text-3xl font-extrabold text-white sm:text-4xl">{s.value}</div>
            <div className="mt-1 text-sm text-zinc-500">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Testimonials ------------------------------ */

const testimonials = [
  {
    quote:
      'My clients constantly tell me the galleries feel like a luxury experience. Lumière made my delivery look 10× more professional overnight.',
    name: 'Sofia Marchetti',
    role: 'Wedding Photographer',
    seed: 'tst-1',
  },
  {
    quote:
      'The print store paid for my subscription in the first week. I just deliver the gallery and the sales roll in.',
    name: 'Marcus Hale',
    role: 'Portrait Studio Owner',
    seed: 'tst-2',
  },
  {
    quote:
      'Client favoriting changed my workflow. I know exactly which shots to retouch before I even talk to the couple.',
    name: 'Aria Chen',
    role: 'Brand & Editorial',
    seed: 'tst-3',
  },
];

function Testimonials() {
  return (
    <section className="container-px py-24">
      <SectionHeading eyebrow="Loved by photographers" title="Don't just take our word for it" />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i}>
            <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-900/50 p-6">
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-zinc-300">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <PhotoImage seed={t.seed} w={80} h={80} className="h-10 w-10 rounded-full" />
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Final CTA -------------------------------- */

function FinalCTA() {
  return (
    <section className="container-px py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-brand-600/20 via-ink-900 to-fuchsia-600/10 px-8 py-16 text-center sm:px-16">
          <div className="absolute inset-0 bg-grid-faint bg-[size:48px_48px] opacity-30" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-white sm:text-5xl">
              Ready to wow your clients?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-300">
              Join thousands of photographers delivering galleries that sell. Get started free in under two minutes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton to="/signup" size="lg" variant="secondary">
                Create your first gallery <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <Button size="lg" variant="ghost" onClick={() => scrollToId('pricing')}>
                Compare plans
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Shared bits ------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-semibold uppercase tracking-widest text-brand-300">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-zinc-400">{subtitle}</p>}
    </Reveal>
  );
}
