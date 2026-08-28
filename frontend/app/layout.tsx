import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { MotionProvider } from '@/components/shared/motion-provider';
import { GuideButterfly } from '@/components/shared/guide-butterfly';

export const metadata: Metadata = {
  metadataBase: new URL('https://22pie.com'),
  title: {
    default: '22Pie - Web & App Development, AI Agents, Learning, and Career Growth',
    template: '%s | 22Pie'
  },
  description:
    'Developer-led web and app development, AI agents, integrations, learning, and career guidance — built and taught by people who ship.',
  openGraph: {
    title: '22Pie',
    description: 'Web & app development, AI agents, integrations, learning, and career guidance from working developers.',
    url: 'https://22pie.com',
    siteName: '22Pie',
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
        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <GuideButterfly />
        </MotionProvider>
      </body>
    </html>
  );
}
