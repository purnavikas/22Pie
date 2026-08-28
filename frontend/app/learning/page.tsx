import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PillarHero } from '@/components/shared/pillar-hero';
import { KineticIntro } from '@/components/learning/kinetic-intro';
import { PathBentoGrid } from '@/components/learning/path-bento-grid';
import { pillarAccents } from '@/data/site';

export const metadata: Metadata = {
  title: 'Learning',
  description: 'Structured, developer-led learning tracks for Salesforce, Java, DevOps, and interview readiness — taught by people who build for a living.'
};

const ACCENT = pillarAccents.learning;

export default function LearningPage() {
  return (
    <>
      <PillarHero
        accent={ACCENT}
        description="Every track is taught by developers who ship the technology day to day, not a slide deck written once and reused for years."
        eyebrow="Learning"
        primaryCta={{ label: 'Explore learning paths', href: '/learning-paths' }}
        secondaryCta={{ label: 'Talk to a mentor', href: '/course-enquiry' }}
        title="Learn what working developers actually use."
      />

      <section className="bg-midnight px-4 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <KineticIntro />

          <div className="mt-14 flex flex-col justify-between gap-6 border-t border-white/10 pt-10 md:flex-row md:items-end">
            <p className="max-w-xl text-sm leading-6 text-white/60">
              Four tracks, one honest structure: what you will learn, how long it takes, and who it is for. Hover a
              track to see the topics inside it.
            </p>
            <Link className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-graphite transition hover:bg-aqua" href="/learning-paths">
              All learning paths <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="mt-10">
            <PathBentoGrid />
          </div>
        </div>
      </section>
    </>
  );
}
