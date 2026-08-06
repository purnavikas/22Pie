import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { learningPaths, resources, services } from '@/data/site';

const pages = {
  courses: ['Courses', 'Explore upcoming and available technology classes. Course details are pulled from the PHP API when connected.'],
  'learning-paths': ['Learning Paths', 'Structured tracks for Salesforce, Java, DevOps, CRM, cloud, integration, interview preparation, and certification readiness.'],
  services: ['Services', 'Training, mentoring, consulting, freelance delivery, corporate enablement, and application support.'],
  'career-guidance': ['Career Guidance', 'Resume review, roadmap planning, profile optimisation, and practical interview preparation for technology roles.'],
  'interview-training': ['Interview Training', 'Mock interviews, scenario practice, communication feedback, and role-specific preparation.'],
  'certification-guidance': ['Certification Guidance', 'Study planning and practical support for certifications across Salesforce, CRM, cloud, and developer technologies.'],
  projects: ['Projects', 'Project delivery services for websites, CRM implementation, automation, integrations, internal tools, and support.'],
  community: ['Community', 'Developers helping developers move forward through mentoring, peer learning, and shared project exposure.'],
  mentors: ['Mentors', 'Published mentor and instructor profiles will appear here after they are created in the admin panel.'],
  resources: ['Resources', 'Articles, interview questions, certification guides, roadmaps, and practical career resources.'],
  about: ['About the Pie System', 'A developer-led technology community and consulting team built around practical learning and collaborative execution.'],
  contact: ['Contact', 'Send a general enquiry, ask about a course, or begin a project discussion.'],
  'project-enquiry': ['Project Enquiry', 'Tell us about your business application, CRM, integration, automation, website, or support requirement.'],
  'course-enquiry': ['Course Enquiry', 'Share your learning goal, current experience, preferred schedule, and technology interest.'],
  'privacy-policy': ['Privacy Policy', 'Privacy content is editable through admin settings. This starter includes the required page route.'],
  terms: ['Terms', 'Terms content is editable through admin settings. This starter includes the required page route.'],
  'refund-policy': ['Refund Policy', 'Refund policy content is editable through admin settings. This starter includes the required page route.'],
  'cookie-policy': ['Cookie Policy', 'Cookie policy content is editable through admin settings. This starter includes the required page route.'],
  '404': ['Page Not Found', 'The requested page could not be found.']
} as const;

const serviceDetailContent = Object.fromEntries(
  services.map(([name, copy]) => [`services/${name.toLowerCase().replaceAll(' ', '-')}`, [name, copy]])
) as Record<string, readonly [string, string]>;

const nestedContent = {
  'learning-paths/salesforce': ['Salesforce Learning Path', 'A practical Salesforce route covering platform fundamentals, Flow, Apex, LWC, integration, interview scenarios, and certification planning.'],
  'learning-paths/java': ['Java Learning Path', 'A backend-focused route covering core Java, OOP, collections, debugging, APIs, and Spring fundamentals.'],
  'learning-paths/devops': ['DevOps Learning Path', 'A delivery-focused route covering Git, CI/CD, Docker, cloud deployments, observability, and practical release habits.'],
  'learning-paths/interview-preparation': ['Interview Preparation Path', 'Role-specific interview readiness with scenario practice, resume review, and clear feedback.'],
  'courses/salesforce-foundation': ['Salesforce Foundation', 'Course details are API-ready and should be managed through the admin panel before publishing.'],
  'services/technical-consulting': ['Technical Consulting', 'Architecture, CRM, integration, automation, and delivery support for small and medium projects.'],
  'projects/crm-implementation': ['CRM Implementation', 'Case-study content can hide client identity and should never expose confidential details.'],
  'resources/salesforce-developer-roadmap': ['Salesforce Developer Roadmap', resources[0].summary],
  'resources/java-interview-scenario-practice': ['Java Interview Scenario Practice', resources[1].summary],
  'resources/devops-starter-checklist': ['DevOps Starter Checklist', resources[2].summary]
} as const satisfies Record<string, readonly [string, string]>;

type Props = {
  params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...Object.keys(pages).map((slug) => ({ slug: [slug] })),
    ...Object.keys(nestedContent).map((slug) => ({ slug: slug.split('/') })),
    ...Object.keys(serviceDetailContent).map((slug) => ({ slug: slug.split('/') }))
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug.join('/');
  const content = nestedContent[slug as keyof typeof nestedContent] ?? serviceDetailContent[slug] ?? pages[slug as keyof typeof pages];
  return {
    title: content?.[0] ?? 'Page Not Found',
    description: content?.[1] ?? 'The requested page could not be found.'
  };
}

export default async function ContentPage({ params }: Props) {
  const slug = (await params).slug.join('/');
  const content = nestedContent[slug as keyof typeof nestedContent] ?? serviceDetailContent[slug] ?? pages[slug as keyof typeof pages];

  if (!content) {
    return <NotFoundBlock />;
  }

  const [title, description] = content;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
      <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-violet">Pie system</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-black text-graphite md:text-6xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/72">{description}</p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {slug === 'learning-paths' && learningPaths.map((path) => (
          <Link className="rounded border border-graphite/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-soft" href={`/learning-paths/${path.slug}`} key={path.slug}>
            <h2 className="text-xl font-black">{path.title}</h2>
            <p className="mt-2 text-sm text-ink/70">{path.level} / {path.duration}</p>
          </Link>
        ))}
        {slug === 'services' && services.map(([name, copy]) => (
          <Link className="rounded border border-graphite/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-soft" href={`/services/${name.toLowerCase().replaceAll(' ', '-')}`} key={name}>
            <h2 className="text-xl font-black">{name}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{copy}</p>
          </Link>
        ))}
        {slug === 'resources' && resources.map((resource) => (
          <Link className="rounded border border-graphite/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-soft" href={`/resources/${resource.slug}`} key={resource.slug}>
            <span className="font-mono text-xs font-bold text-aqua">{resource.type}</span>
            <h2 className="mt-2 text-xl font-black">{resource.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{resource.summary}</p>
          </Link>
        ))}
      </div>

      {(slug.includes('enquiry') || slug === 'contact' || slug === 'career-guidance') && <EnquiryForm />}

      <div className="mt-12 rounded border border-graphite/10 bg-white p-5">
        <h2 className="text-xl font-black text-graphite">API-ready content</h2>
        <p className="mt-2 text-sm leading-6 text-ink/70">
          This page is static-export compatible. When the PHP API is connected, list and detail data can be fetched from `/api/v1/public/...` without requiring a production Node.js server.
        </p>
        <Link className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-violet" href="/contact">
          Talk to the team <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function EnquiryForm() {
  return (
    <form className="mt-10 grid gap-4 rounded border border-graphite/10 bg-white p-5 md:grid-cols-2" action="/api/v1/public/enquiries" method="post">
      <label className="text-sm font-bold">Name<input className="mt-2 w-full rounded border border-graphite/15 px-3 py-2 font-normal" name="name" required /></label>
      <label className="text-sm font-bold">Email<input className="mt-2 w-full rounded border border-graphite/15 px-3 py-2 font-normal" name="email" type="email" required /></label>
      <label className="text-sm font-bold">Phone<input className="mt-2 w-full rounded border border-graphite/15 px-3 py-2 font-normal" name="phone" /></label>
      <label className="text-sm font-bold">Topic<input className="mt-2 w-full rounded border border-graphite/15 px-3 py-2 font-normal" name="topic" /></label>
      <label className="hidden">Company<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      <label className="text-sm font-bold md:col-span-2">Message<textarea className="mt-2 w-full rounded border border-graphite/15 px-3 py-2 font-normal" name="message" rows={5} required /></label>
      <label className="flex gap-3 text-sm md:col-span-2"><input className="mt-1" name="consent" type="checkbox" required /> I consent to the team contacting me about this enquiry.</label>
      <button className="rounded bg-graphite px-5 py-3 text-sm font-bold text-paper md:w-fit" type="submit">Submit enquiry</button>
    </form>
  );
}

function NotFoundBlock() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-coral">404</p>
      <h1 className="mt-4 text-4xl font-black text-graphite">This piece is missing.</h1>
      <p className="mt-4 text-ink/70">The page route is not part of the current static export.</p>
      <Link className="mt-8 inline-flex rounded-full bg-graphite px-5 py-3 text-sm font-bold text-paper" href="/">Go home</Link>
    </section>
  );
}
