import type { CSSProperties, ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  accent?: string;
};

export function GlassCard({ children, className = '', accent }: GlassCardProps) {
  return (
    <div
      className={`glass-card ${className}`}
      style={accent ? ({ '--pillar-accent': accent } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
