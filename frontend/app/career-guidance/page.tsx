import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { PillarHero } from '@/components/shared/pillar-hero';
import { RoadmapTimeline } from '@/components/career/roadmap-timeline';
import { TestimonialCard } from '@/components/career/testimonial-card';
import { pillarAccents, testimonials } from '@/data/site';

export const metadata: Metadata = {
  title: 'Career Guidance',
  description: 'A real roadmap from skill audit to placement, with mock interviews, resume review, and honest feedback from working developers.'
};

const ACCENT = pillarAccents['career-guidance'];

export default function CareerGuidancePage() {
  return (
    <>
      <PillarHero
        accent={ACCENT}
        description="Drag the slider through the roadmap below — it is the same stage-by-stage plan we run with every candidate, not a generic checklist."
        eyebrow="Career Guidance"
        primaryCta={{ label: 'Start your roadmap', href: '/contact' }}
        secondaryCta={{ label: 'See learning paths', href: '/learning' }}
        title="A real roadmap from skill audit to placement."
      >
        <RoadmapTimeline />
      </PillarHero>

      <section className="bg-midnight px-4 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <p className="pillar-eyebrow text-xs font-semibold uppercase tracking-[0.18em]" style={{ '--pillar-accent': ACCENT } as CSSProperties}>
            What people say
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1] tracking-[-0.04em] md:text-6xl">
            Honest feedback, from people who went through it.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard accent={ACCENT} key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
