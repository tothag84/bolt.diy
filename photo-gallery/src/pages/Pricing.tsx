import { SiteNav, SiteFooter } from '@/components/layout/SiteNav';
import { PricingTable } from '@/components/marketing/PricingTable';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { SectionHeading } from '@/pages/Landing';

export function Pricing() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />
      </div>
      <SiteNav />
      <section className="container-px pt-36 pb-20">
        <SectionHeading
          eyebrow="Pricing"
          title="Plans for every photographer"
          subtitle="Start free, upgrade as you grow. All paid plans include a 14-day trial."
        />
        <div className="mt-14">
          <PricingTable />
        </div>
      </section>
      <section className="container-px pb-24">
        <SectionHeading eyebrow="FAQ" title="Pricing questions" />
        <div className="mt-12">
          <FaqAccordion />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
