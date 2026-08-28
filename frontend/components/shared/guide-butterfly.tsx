'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const ARRIVE_DELAY_MS = 900;
const FLIGHT_TRANSITION = 'transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease';
const TRACK_TRANSITION = 'transform 120ms linear, opacity 400ms ease';

export function GuideButterfly() {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasPositionedRef = useRef(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;

    if (pathname === '/') {
      el.style.opacity = '0';
      return undefined;
    }

    let cancelled = false;

    const place = (flight: boolean) => {
      const target = document.querySelector<HTMLElement>('[data-guide-target]');
      if (!target) {
        el.style.opacity = '0';
        hasPositionedRef.current = false;
        return;
      }

      const rect = target.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      el.style.transition = reduced || !flight ? TRACK_TRANSITION : FLIGHT_TRANSITION;
      el.style.transform = `translate3d(${rect.right - 12}px, ${rect.top - 28}px, 0)`;
      el.style.opacity = inView ? '1' : '0';
    };

    const timer = window.setTimeout(() => {
      if (cancelled) return;
      place(hasPositionedRef.current);
      hasPositionedRef.current = true;
    }, ARRIVE_DELAY_MS);

    const handleTrack = () => place(false);
    window.addEventListener('scroll', handleTrack, { passive: true });
    window.addEventListener('resize', handleTrack);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener('scroll', handleTrack);
      window.removeEventListener('resize', handleTrack);
    };
  }, [pathname]);

  return (
    <div aria-hidden="true" className="guide-butterfly" ref={wrapperRef}>
      <div className="guide-butterfly-bob">
        <Image alt="" className="guide-butterfly-image" height={44} src="/images/butterfly-cursor.png" width={44} />
      </div>
    </div>
  );
}
