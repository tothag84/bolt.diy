import { SiteNav, SiteFooter } from '@/components/layout/SiteNav';
import { PricingTiers } from '@/components/marketing/PricingTiers';
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
          title="Free forever. Pay only for more storage."
          subtitle="Start free with 5 galleries and 500 MB. Upgrade to 25 galleries and 2 GB any time."
        />
        <div className="mt-14">
          <PricingTiers />
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
