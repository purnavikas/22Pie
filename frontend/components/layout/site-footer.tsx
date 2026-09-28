import Link from 'next/link';
import { navItems } from '@/data/site';
import { Logo } from './logo';

const policies = [
  ['Privacy policy', '/privacy-policy'],
  ['Terms', '/terms'],
  ['Refund policy', '/refund-policy'],
  ['Cookie policy', '/cookie-policy'],
  ['Sitemap', '/sitemap.xml']
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer-glass border-t-2 border-aqua bg-graphite text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_2fr_1fr] lg:px-6">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-paper">
            A developer-led learning, career guidance, community, consulting, and project delivery company.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4" aria-label="Footer navigation">
          {navItems.map(([label, href]) => (
            <Link key={label} className="text-paper hover:text-aqua" href={href}>
              {label}
            </Link>
          ))}
          {policies.map(([label, href]) => (
            <Link key={label} className="text-paper hover:text-aqua" href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <form className="space-y-3">
          <label className="text-sm font-semibold" htmlFor="newsletter">Newsletter</label>
          <input id="newsletter" className="glass-input w-full px-3 py-2 text-sm text-graphite placeholder:text-ink" placeholder="email@example.com" type="email" />
          <button className="glass-button w-full px-4 py-2 text-sm font-bold text-graphite" type="button">Subscribe</button>
        </form>
      </div>
    </footer>
  );
}
