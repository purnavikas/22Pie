'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { navItems } from '@/data/site';
import { Logo } from './logo';

export function SiteHeader() {
  const [expanded, setExpanded] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 text-white md:pt-4">
      <div
        className="nav-island pointer-events-auto overflow-hidden border border-white/15 bg-graphite/90 shadow-2xl backdrop-blur-xl"
        data-expanded={expanded}
        onFocus={() => setExpanded(true)}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="flex h-14 items-center justify-between gap-5 px-3 pl-4">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
          <button
            aria-expanded={expanded}
            aria-label={expanded ? 'Close navigation menu' : 'Open navigation menu'}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-graphite transition hover:scale-105"
            onClick={() => setExpanded((current) => !current)}
            type="button"
          >
            {expanded ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className="nav-island-content px-3">
          <div className="border-t border-white/10 px-1 pb-4 pt-3 md:flex md:items-center md:justify-between md:gap-5">
            <nav className="grid gap-1 text-sm font-medium text-white/70 md:flex md:flex-wrap md:items-center md:gap-1" aria-label="Primary navigation">
              {navItems.map(([label, href]) => (
                <Link key={label} className="rounded-full px-4 py-2.5 transition hover:bg-white/10 hover:text-white" href={href}>
                  {label}
                </Link>
              ))}
            </nav>
            <Link className="mt-3 inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-graphite transition hover:bg-aqua md:mt-0 md:w-auto" href="/course-enquiry">
              Start learning <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
