import { Menu, Moon, Search } from 'lucide-react';
import Link from 'next/link';
import { navItems } from '@/data/site';
import { Logo } from './logo';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-graphite/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link href="/" aria-label="Home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-ink/75 lg:flex" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <Link key={label} className="transition hover:text-graphite" href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="grid size-10 place-items-center rounded-full border border-graphite/10 bg-white" aria-label="Search">
            <Search size={18} />
          </button>
          <button className="grid size-10 place-items-center rounded-full border border-graphite/10 bg-white" aria-label="Toggle theme">
            <Moon size={18} />
          </button>
          <Link className="hidden rounded-full bg-graphite px-4 py-2 text-sm font-semibold text-paper md:inline-flex" href="/courses">
            Explore Courses
          </Link>
          <Link className="hidden rounded-full border border-graphite/15 px-4 py-2 text-sm font-semibold md:inline-flex" href="/project-enquiry">
            Discuss a Project
          </Link>
          <button className="grid size-10 place-items-center rounded-full border border-graphite/10 bg-white lg:hidden" aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
