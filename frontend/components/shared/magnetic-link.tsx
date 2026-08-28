'use client';

import Link from 'next/link';
import { useCallback, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';

const PULL_RADIUS = 90;
const PULL_STRENGTH = 0.35;

export function MagneticLink({
  href,
  children,
  className = '',
  ariaLabel
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const bounds = el.getBoundingClientRect();
    const relX = event.clientX - (bounds.left + bounds.width / 2);
    const relY = event.clientY - (bounds.top + bounds.height / 2);
    if (Math.hypot(relX, relY) > PULL_RADIUS) {
      el.style.transform = '';
      return;
    }
    el.style.transform = `translate3d(${relX * PULL_STRENGTH}px, ${relY * PULL_STRENGTH}px, 0)`;
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return (
    <Link
      aria-label={ariaLabel}
      className={`magnetic-button ${className}`}
      href={href}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={ref}
    >
      {children}
    </Link>
  );
}
