import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { PillarHero } from '@/components/shared/pillar-hero';
import { GlassCard } from '@/components/shared/glass-card';
import { NodeGraph } from '@/components/integrations/node-graph';
import { pillarAccents } from '@/data/site';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Connect Salesforce, Slack, Stripe, your data warehouse, and internal systems into one working pipeline.'
};

const ACCENT = pillarAccents.integrations;

const approach = [
  {
    title: 'Map before you build',
    copy: 'We diagram the real data flow first — what moves where, on what trigger — before writing a single connector.'
  },
  {
    title: 'Own the failure modes',
    copy: 'Retries, dead-letter queues, and alerting are part of the build, not an afterthought when something silently drops.'
  },
  {
    title: 'Documented handover',
    copy: 'Every integration ships with a plain-language map of what connects to what, so your team is never locked out.'
  }
];

export default function IntegrationsPage() {
  return (
    <>
      <PillarHero
        accent={ACCENT}
        description="Salesforce, Slack, Stripe, your data warehouse, and the internal tools nobody else wants to touch — wired into one working pipeline. Hover a node to see the connection."
        eyebrow="Integrations"
        primaryCta={{ label: 'Map your integration', href: '/project-enquiry' }}
        secondaryCta={{ label: 'See agents', href: '/agents' }}
        title="Everything you run, actually talking to each other."
      >
        <NodeGraph />
      </PillarHero>

      <section className="bg-midnight px-4 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <p className="pillar-eyebrow text-xs font-semibold uppercase tracking-[0.18em]" style={{ '--pillar-accent': ACCENT } as CSSProperties}>
            How we build them
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1] tracking-[-0.04em] md:text-6xl">
            Reliable pipelines, not brittle one-off scripts.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {approach.map((item) => (
              <GlassCard accent={ACCENT} className="p-6" key={item.title}>
                <h3 className="text-xl font-medium tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{item.copy}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
