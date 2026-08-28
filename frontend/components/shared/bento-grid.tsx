import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

type BentoSpan = 'sm' | 'md' | 'lg' | 'wide';

const SPAN_CLASSES: Record<BentoSpan, string> = {
  sm: '',
  md: 'sm:col-span-2',
  lg: 'sm:col-span-2 xl:col-span-2 xl:row-span-2',
  wide: 'sm:col-span-2 xl:col-span-4'
};

export function BentoGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid auto-rows-[300px] grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 ${className}`}>
      {children}
    </div>
  );
}

type BentoTileProps = {
  children: ReactNode;
  span?: BentoSpan;
  className?: string;
  accent?: string;
  href?: string;
};

export function BentoTile({ children, span = 'sm', className = '', accent, href }: BentoTileProps) {
  const tileClassName = `group glass-card flex flex-col justify-between overflow-hidden p-6 ${SPAN_CLASSES[span]} ${className}`;
  const style = accent ? ({ '--pillar-accent': accent } as CSSProperties) : undefined;

  if (href) {
    return (
      <Link className={tileClassName} href={href} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <div className={tileClassName} style={style}>
      {children}
    </div>
  );
}
