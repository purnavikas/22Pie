import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://22pie.com'),
  title: {
    default: 'Pie Learning System - Learn, Build, and Grow Together',
    template: '%s | Pie Learning System'
  },
  description:
    'Developer-led IT training, career guidance, community support, consulting, and project delivery across Salesforce, Java, DevOps, CRM, cloud, and integrations.',
  openGraph: {
    title: 'Pie Learning System',
    description: 'Developers helping developers learn, build, and grow together.',
    url: 'https://22pie.com',
    siteName: 'Pie Learning System',
    type: 'website'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#17212B'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link rounded bg-graphite px-4 py-2 text-sm font-semibold text-white" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
