import { motion } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Download,
  Lock,
  Images,
  Star,
  Play,
  Share2,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { SiteNav, SiteFooter } from '@/components/layout/SiteNav';
import { LinkButton } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SupportSection } from '@/components/marketing/SupportSection';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { PhotoImage } from '@/components/gallery/PhotoImage';

export function Landing() {
  return (
    <div className="relative overflow-hidden bg-white">
      <BackgroundFX />
      <SiteNav />
      <Hero />
      <TrustBar />
      <Features />
      <Showcase />
      <section id="support" className="scroll-mt-24 bg-neutral-50 py-24">
        <div className="container-px">
          <SectionHeading
            eyebrow="Free + supported by you"
            title="Free for everyone, forever"
            subtitle="No subscriptions. No paywalls. Lumière stays free thanks to optional donations."
          />
          <div className="mt-12">
            <SupportSection />
          </div>
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
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px]">
      <div className="absolute inset-0 bg-grid-faint bg-[size:64px_64px] mask-fade-b opacity-70" />
      <div className="absolute left-1/2 top-[-12%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent-200/40 blur-[120px]" />
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
        <span className="pill mx-auto mb-7">
          <Sparkles className="h-3.5 w-3.5 text-accent-600" />
          100% free · supported by tips
        </span>

        <h1 className="font-display text-5xl font-extrabold leading-[1.04] tracking-tight text-neutral-950 sm:text-7xl">
          Beautiful photo galleries,
          <br />
          <span className="text-accent-600">free for everyone</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
          Share stunning, on-brand galleries your clients love. They favorite, download and tip you directly — and
          Lumière stays completely free, supported by donations.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton to="/signup" size="lg" className="w-full sm:w-auto">
            Create your free gallery
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
          <LinkButton to="/g/elena-james-wedding" variant="outline" size="lg" className="w-full sm:w-auto">
            <Play className="h-4 w-4" /> View a live gallery
          </LinkButton>
        </div>
        <p className="mt-4 text-xs text-neutral-500">No credit card · Loved by 40,000+ photographers</p>
      </motion.div>

      {/* Hero showcase */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-16 max-w-5xl"
      >
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lift">
          <div className="flex items-center gap-1.5 border-b border-neutral-200 bg-neutral-50 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-neutral-300" />
            <span className="h-3 w-3 rounded-full bg-neutral-300" />
            <span className="h-3 w-3 rounded-full bg-neutral-300" />
            <span className="ml-3 rounded-md border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-500">
              lumiere.photo/g/elena-james-wedding
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
                className={`rounded-lg ${i % 3 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-[4/3]'}`}
              />
            ))}
          </div>
        </div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm text-neutral-700 shadow-lift">
          <span className="inline-flex items-center gap-2">
            <Heart className="h-4 w-4 fill-accent-500 text-accent-500" /> 38 favorites · $182 in tips
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
    <section className="container-px py-12">
      <p className="mb-6 text-center text-xs uppercase tracking-widest text-neutral-400">
        Trusted by studios featured in
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {names.map((n) => (
          <span key={n} className="font-display text-lg font-bold tracking-wide text-neutral-400">
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
    desc: 'PIN-protected galleries and private links keep delivery safe.',
    span: '',
  },
  {
    icon: Download,
    title: 'Controlled downloads',
    desc: 'Set resolutions, per-photo or full-gallery, with download controls.',
    span: '',
  },
  {
    icon: Heart,
    title: 'Tips & donations',
    desc: 'Clients can tip you directly from a gallery — a delightful, no-fuss way to get paid for your work.',
    span: 'sm:col-span-2',
  },
  {
    icon: Share2,
    title: 'One-link sharing',
    desc: 'Share a single private link — works instantly on any device.',
    span: '',
  },
  {
    icon: Smartphone,
    title: 'Beautiful on mobile',
    desc: 'Every gallery is fast and flawless on phones and tablets.',
    span: '',
  },
];

function Features() {
  return (
    <section id="features" className="container-px scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="Everything you need"
        title="From shoot to share, in one place"
        subtitle="A complete toolkit for delivering and proofing your photography — all free."
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
    <div className="group h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-neutral-300 hover:shadow-soft">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-accent-200 bg-accent-50 text-accent-700">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display text-lg font-semibold text-neutral-950">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{desc}</p>
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

/* ------------------------------ Testimonials ------------------------------ */

const testimonials = [
  {
    quote:
      'My clients constantly tell me the galleries feel like a luxury experience — and it costs me nothing. Incredible.',
    name: 'Sofia Marchetti',
    role: 'Wedding Photographer',
    seed: 'tst-1',
  },
  {
    quote: 'The tip feature is genius. Happy clients leave a little something and it adds up — no awkward invoicing.',
    name: 'Marcus Hale',
    role: 'Portrait Studio Owner',
    seed: 'tst-2',
  },
  {
    quote: 'Client favoriting changed my workflow. I know exactly which shots to retouch before our call.',
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
            <figure className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-neutral-700">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <PhotoImage seed={t.seed} w={80} h={80} className="h-10 w-10 rounded-full" />
                <div>
                  <div className="text-sm font-semibold text-neutral-950">{t.name}</div>
                  <div className="text-xs text-neutral-500">{t.role}</div>
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
        <div className="relative overflow-hidden rounded-4xl border border-neutral-200 bg-neutral-950 px-8 py-16 text-center sm:px-16">
          <div className="absolute inset-0 bg-grid-faint bg-[size:48px_48px] opacity-[0.15]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold text-white sm:text-5xl">
              Start sharing today — it's free
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-300">
              Join thousands of photographers delivering galleries their clients adore. Set up in under two minutes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <LinkButton to="/signup" size="lg">
                Create your first gallery <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton to="/g/elena-james-wedding" size="lg" variant="secondary">
                See it in action
              </LinkButton>
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
      <span className="text-sm font-semibold uppercase tracking-widest text-accent-700">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-neutral-600">{subtitle}</p>}
    </Reveal>
  );
}
