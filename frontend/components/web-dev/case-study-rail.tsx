'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { caseStudies } from '@/data/site';
import { CaseStudyCard } from './case-study-card';

const ACCENT = '#2261BC';

function RailHeading() {
  return (
    <div className="px-4 md:px-8">
      <p className="pillar-eyebrow text-xs font-semibold uppercase tracking-[0.18em]" style={{ '--pillar-accent': ACCENT } as CSSProperties}>
        Selected work
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.03em] text-white md:text-5xl">Recent builds, start to shipped.</h2>
    </div>
  );
}

export function CaseStudyRail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setUseFallback(query.matches || window.innerWidth < 768);
    update();
    query.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      query.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (useFallback) return undefined;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [useFallback]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  if (useFallback) {
    return (
      <section className="bg-midnight px-4 py-24 md:px-8 md:py-32">
        <RailHeading />
        <div className="scroll-rail mt-10 px-4 md:px-8">
          {caseStudies.map((project) => (
            <CaseStudyCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-midnight" ref={sectionRef} style={{ height: '340vh' }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <RailHeading />
        <motion.div className="mt-10 flex gap-6 px-4 md:px-8" ref={trackRef} style={{ x }}>
          {caseStudies.map((project) => (
            <CaseStudyCard key={project.slug} project={project} />
          ))}
          <div className="w-4 shrink-0 md:w-8" />
        </motion.div>
      </div>
    </section>
  );
}
