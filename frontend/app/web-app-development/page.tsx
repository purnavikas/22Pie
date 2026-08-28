import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { PillarHero } from '@/components/shared/pillar-hero';
import { GlassCard } from '@/components/shared/glass-card';
import { CaseStudyRail } from '@/components/web-dev/case-study-rail';
import { pillarAccents } from '@/data/site';

export const metadata: Metadata = {
  title: 'Web & App Development',
  description: 'Requirement-led web and app builds across the stack, delivered by developers who ship — see recent work below.'
};

const ACCENT = pillarAccents['web-app-development'];

const principles = [
  {
    title: 'Requirement-led, not template-led',
    copy: 'We pick the stack after understanding the problem — Next.js, Salesforce, a PHP/MySQL API, or a mix — not before.'
  },
  {
    title: 'Built for low-maintenance hosting',
    copy: 'Static-export frontends, lean APIs, and clear deployment docs, so you are never locked into an expensive hosting bill.'
  },
  {
    title: 'Shipped with a handover',
    copy: 'Documentation, admin access, and a walkthrough on delivery — no black boxes only we can touch.'
  }
];

export default function WebAppDevelopmentPage() {
  return (
    <>
      <PillarHero
        accent={ACCENT}
        description="From marketing sites to CRM-integrated internal tools, we scope, build, and ship — with the same care whether the client is a two-person startup or a distribution company running 40 seats."
        eyebrow="Web & App Development"
        primaryCta={{ label: 'Discuss your project', href: '/project-enquiry' }}
        secondaryCta={{ label: 'See integrations', href: '/integrations' }}
        title="Requirement-led builds, shipped by developers."
      />

      <CaseStudyRail />

      <section className="bg-graphite px-4 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <p className="pillar-eyebrow text-xs font-semibold uppercase tracking-[0.18em]" style={{ '--pillar-accent': ACCENT } as CSSProperties}>
            How we build
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1] tracking-[-0.04em] md:text-6xl">
            Practical decisions, not portfolio-driven ones.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {principles.map((principle) => (
              <GlassCard accent={ACCENT} className="p-6" key={principle.title}>
                <h3 className="text-xl font-medium tracking-[-0.02em]">{principle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{principle.copy}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
