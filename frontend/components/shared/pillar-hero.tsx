import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';

type PillarCta = { label: string; href: string };

type PillarHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  accent: string;
  primaryCta: PillarCta;
  secondaryCta?: PillarCta;
  children?: ReactNode;
};

export function PillarHero({ eyebrow, title, description, accent, primaryCta, secondaryCta, children }: PillarHeroProps) {
  return (
    <section className="pillar-hero px-4 py-24 md:px-8 md:py-32" style={{ '--pillar-accent': accent } as CSSProperties}>
      <div className="relative mx-auto max-w-[1440px]">
        <p className="pillar-eyebrow font-mono text-xs font-semibold uppercase tracking-[0.18em]">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.045em] md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">{description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-graphite transition hover:scale-[1.03]"
            data-guide-target=""
            href={primaryCta.href}
            style={{ background: accent }}
          >
            {primaryCta.label} <ArrowUpRight size={17} />
          </Link>
          {secondaryCta ? (
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              href={secondaryCta.href}
            >
              {secondaryCta.label} <ArrowRight size={17} />
            </Link>
          ) : null}
        </div>
        {children ? <div className="relative mt-16">{children}</div> : null}
      </div>
    </section>
  );
}
