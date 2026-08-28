import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { PillarHero } from '@/components/shared/pillar-hero';
import { GlassCard } from '@/components/shared/glass-card';
import { AgentChatWidget } from '@/components/agents/agent-chat-widget';
import { pillarAccents } from '@/data/site';

export const metadata: Metadata = {
  title: 'Agents',
  description: 'AI agents that resolve support tickets, qualify leads, and answer internal ops questions — designed and deployed by 22Pie.'
};

const ACCENT = pillarAccents.agents;

const principles = [
  {
    title: 'Scoped to one job',
    copy: 'Every agent has one clear job — resolve a ticket, qualify a lead, answer an ops question — with a defined handoff for when it is out of depth.'
  },
  {
    title: 'Wired to real systems',
    copy: 'Order systems, CRMs, ticket queues, and internal docs — not a static prompt with no access to the truth.'
  },
  {
    title: 'Measured, not assumed',
    copy: 'We track resolution rate, handoff rate, and time saved from week one, and tune the agent against those numbers.'
  }
];

export default function AgentsPage() {
  return (
    <>
      <PillarHero
        accent={ACCENT}
        description="We design, build, and deploy AI agents wired into your real systems — support, sales, and internal ops — not a chat widget bolted onto an FAQ page. Pick a scenario below and watch one work."
        eyebrow="Agents"
        primaryCta={{ label: 'Discuss an agent build', href: '/project-enquiry' }}
        secondaryCta={{ label: 'See integrations', href: '/integrations' }}
        title="Agents that actually finish the job."
      >
        <AgentChatWidget />
      </PillarHero>

      <section className="bg-midnight px-4 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <p className="pillar-eyebrow text-xs font-semibold uppercase tracking-[0.18em]" style={{ '--pillar-accent': ACCENT } as CSSProperties}>
            How we build them
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1] tracking-[-0.04em] md:text-6xl">
            Grounded in your data. Accountable for the outcome.
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
