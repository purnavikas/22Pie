import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const routes = [
  '',
  'courses',
  'learning-paths',
  'services',
  'career-guidance',
  'interview-training',
  'certification-guidance',
  'projects',
  'community',
  'mentors',
  'resources',
  'about',
  'contact',
  'project-enquiry',
  'course-enquiry',
  'privacy-policy',
  'terms',
  'refund-policy',
  'cookie-policy'
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://22pie.com/${route}`,
    lastModified: new Date('2026-08-06'),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7
  }));
}
