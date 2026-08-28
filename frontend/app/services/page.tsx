import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { PillarHero } from '@/components/shared/pillar-hero';
import { BentoGrid, BentoTile } from '@/components/shared/bento-grid';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { TileArt } from '@/components/shared/tile-art';
import { flagshipPillars, pillarAccents, services, spotlightAccents, spotlightArt } from '@/data/site';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Every way to work with 22Pie — from flagship agent, integration, and development builds to training, mentoring, and consulting.'
};

const HUB_ACCENT = '#3157D5';

export default function ServicesPage() {
  return (
    <>
      <PillarHero
        accent={HUB_ACCENT}
        description="Five flagship tracks, each worth its own page — plus the smaller, still-real ways we help teams train, hire, and ship."
        eyebrow="Services"
        primaryCta={{ label: 'Talk to the team', href: '/contact' }}
        title="Everything we do, in one place."
      />

      <section className="bg-graphite px-4 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <p className="max-w-xs text-xs font-semibold uppercase tracking-[0.18em] text-white/60">01 — Flagship tracks</p>
          <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-[0.98] tracking-[-0.045em] md:text-6xl">
            The five things we build a whole page around.
          </h2>

          <BentoGrid className="mt-16">
            {flagshipPillars.map((pillar) => {
              const Icon = pillar.icon;
              const accent = pillarAccents[pillar.slug];
              return (
                <BentoTile accent={accent} href={`/${pillar.slug}`} key={pillar.slug} span={pillar.featured ? 'lg' : 'sm'}>
                  <div>
                    <div className="flex items-start justify-between">
                      <span
                        className="grid size-11 place-items-center rounded-full"
                        style={{ background: `color-mix(in srgb, ${accent} 22%, transparent)`, color: accent }}
                      >
                        <Icon size={20} />
                      </span>
                    </div>
                    <TileArt accent={accent} className={pillar.featured ? 'mt-6 h-28 opacity-90 md:h-36' : 'mt-4 h-16 opacity-80'} variant={pillar.art} />
                  </div>
                  <div>
                    <h3 className={pillar.featured ? 'text-3xl font-medium tracking-[-0.035em] md:text-4xl' : 'text-2xl font-medium tracking-[-0.03em]'}>
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/60">{pillar.copy}</p>
                  </div>
                </BentoTile>
              );
            })}
          </BentoGrid>
        </div>
      </section>

      <section className="bg-midnight px-4 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <p className="pillar-eyebrow text-xs font-semibold uppercase tracking-[0.18em]" style={{ '--pillar-accent': HUB_ACCENT } as CSSProperties}>
            02 — Everything else we help with
          </p>
          <h2 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] md:text-7xl">
            Smaller asks. Still real work.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map(([title, copy, Icon], index) => (
              <SpotlightCard accent={spotlightAccents[index % spotlightAccents.length]} className="flex min-h-[300px] flex-col p-6" key={title}>
                <div className="flex items-center justify-between">
                  <Icon size={23} />
                  <span className="text-xs text-white/40">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <TileArt accent={spotlightAccents[index % spotlightAccents.length]} className="mt-6 h-20 opacity-80" variant={spotlightArt[index % spotlightArt.length]} />
                <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{copy}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
