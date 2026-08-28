'use client';

import { useState, type CSSProperties } from 'react';
import { careerStages } from '@/data/site';

const ACCENT = '#8F7CFF';

export function RoadmapTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = careerStages[activeIndex];
  const fill = (activeIndex / (careerStages.length - 1)) * 100;

  return (
    <div className="glass-card p-6 md:p-8" style={{ '--pillar-accent': ACCENT } as CSSProperties}>
      <input
        aria-label="Career roadmap stage"
        className="roadmap-range"
        max={careerStages.length - 1}
        min={0}
        onChange={(event) => setActiveIndex(Number(event.target.value))}
        style={{ '--fill': `${fill}%` } as CSSProperties}
        type="range"
        value={activeIndex}
      />
      <div className="mt-5 flex flex-wrap justify-between gap-x-3 gap-y-2">
        {careerStages.map((stage, index) => (
          <button
            className={`text-left text-xs font-semibold uppercase tracking-[0.08em] transition ${
              index === activeIndex ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
            key={stage.label}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            {stage.label}
          </button>
        ))}
      </div>
      <div className="mt-10 border-t border-white/10 pt-8">
        <span className="pillar-eyebrow text-xs font-semibold uppercase tracking-[0.16em]">{active.duration}</span>
        <h3 className="mt-3 text-3xl font-medium tracking-[-0.03em] md:text-4xl">{active.label}</h3>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">{active.description}</p>
      </div>
    </div>
  );
}
