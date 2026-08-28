'use client';

import { useCallback, type CSSProperties, type MouseEvent, type ReactNode } from 'react';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  accent?: string;
};

export function SpotlightCard({ children, className = '', accent }: SpotlightCardProps) {
  const handlePointerMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
  }, []);

  return (
    <div
      className={`spotlight-card glass-card ${className}`}
      onMouseMove={handlePointerMove}
      style={accent ? ({ '--pillar-accent': accent } as CSSProperties) : undefined}
    >
      <div className="relative z-[2] flex h-full flex-col">{children}</div>
    </div>
  );
}
