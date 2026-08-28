import type { CSSProperties } from 'react';
import type { caseStudies } from '@/data/site';

type CaseStudy = (typeof caseStudies)[number];

const ACCENT = '#2261BC';

export function CaseStudyCard({ project }: { project: CaseStudy }) {
  return (
    <article
      className="glass-card flex w-[85vw] max-w-[420px] shrink-0 flex-col justify-between p-6 md:w-[420px]"
      style={{ '--pillar-accent': ACCENT } as CSSProperties}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">{project.client}</span>
      <div className="mt-14">
        <h3 className="text-2xl font-medium tracking-[-0.03em] text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/60">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/70" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <p className="mt-5 text-sm font-semibold" style={{ color: '#6FA1FF' }}>
          {project.metric}
        </p>
      </div>
    </article>
  );
}
