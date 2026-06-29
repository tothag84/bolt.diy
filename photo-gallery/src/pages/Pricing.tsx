import { SiteNav, SiteFooter } from '@/components/layout/SiteNav';
import { SupportSection } from '@/components/marketing/SupportSection';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { SectionHeading } from '@/pages/Landing';

export function Pricing() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]">
        <div className="absolute left-1/2 top-[-10%] h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-accent-200/40 blur-[120px]" />
      </div>
      <SiteNav />
      <section className="container-px pt-36 pb-20">
        <SectionHeading
          eyebrow="Pricing"
          title="It's free. Really."
          subtitle="Every feature, free for every photographer — supported by optional donations."
        />
        <div className="mt-14">
          <SupportSection />
        </div>
      </section>
      <section className="container-px pb-24">
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <div className="mt-12">
          <FaqAccordion />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
