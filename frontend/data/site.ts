import {
  BookOpenCheck,
  Bot,
  BriefcaseBusiness,
  CircleDot,
  Code2,
  GraduationCap,
  Handshake,
  MessageSquareText,
  Network,
  Puzzle,
  ShieldCheck,
  Sparkles,
  UsersRound
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { TileArtVariant } from '@/components/shared/tile-art';

export const navItems = [
  ['Web & App Dev', '/web-app-development'],
  ['Learning', '/learning'],
  ['Career', '/career-guidance'],
  ['Agents', '/agents'],
  ['Integrations', '/integrations'],
  ['Services', '/services'],
  ['Resources', '/resources'],
  ['Contact', '/contact']
] as const;

export const secondaryNavItems = [
  ['About', '/about'],
  ['Community', '/community'],
  ['Projects', '/projects']
] as const;

export const pillarAccents = {
  'web-app-development': '#2261bc',
  learning: '#b7f06e',
  'career-guidance': '#8f7cff',
  agents: '#c82634',
  integrations: '#f27622'
} as const;

export type FlagshipPillar = {
  slug: keyof typeof pillarAccents;
  title: string;
  copy: string;
  icon: LucideIcon;
  art: TileArtVariant;
  featured?: boolean;
};

export const flagshipPillars: FlagshipPillar[] = [
  {
    slug: 'agents',
    title: 'Agents',
    copy: 'AI agents that resolve tickets, qualify leads, and answer ops questions — not chatbots that just deflect.',
    icon: Bot,
    art: 'pulse',
    featured: true
  },
  {
    slug: 'web-app-development',
    title: 'Web & App Development',
    copy: 'Requirement-led builds across web, mobile, and integrations, delivered by developers who ship.',
    icon: Code2,
    art: 'stack'
  },
  {
    slug: 'learning',
    title: 'Learning',
    copy: 'Structured, developer-led tracks for Salesforce, Java, DevOps, and interview readiness.',
    icon: GraduationCap,
    art: 'ascend'
  },
  {
    slug: 'career-guidance',
    title: 'Career Guidance',
    copy: 'A real roadmap from skill audit to placement, with mock interviews and honest feedback.',
    icon: UsersRound,
    art: 'path'
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    copy: 'Connect Salesforce, Slack, Stripe, and your internal systems into one working pipeline.',
    icon: Puzzle,
    art: 'orbit'
  }
];

export const spotlightAccents = ['#3157D5', '#23864B', '#8F7CFF', '#C82634', '#F27622', '#B7F06E'];
export const spotlightArt: TileArtVariant[] = ['pulse', 'stack', 'ascend', 'path', 'orbit', 'stack'];

export const learningPaths = [
  {
    title: 'Salesforce',
    slug: 'salesforce',
    level: 'Beginner to job-ready',
    mode: 'Live online, mentoring',
    duration: '10-14 weeks',
    status: 'Enquiry open',
    audience: 'Admins, developers, CRM learners',
    topics: ['Platform basics', 'Apex', 'LWC', 'Flows', 'Integration']
  },
  {
    title: 'Java',
    slug: 'java',
    level: 'Foundation to backend',
    mode: 'Live online',
    duration: '8-12 weeks',
    status: 'Upcoming',
    audience: 'Freshers and junior developers',
    topics: ['Core Java', 'OOP', 'Collections', 'Spring basics', 'APIs']
  },
  {
    title: 'DevOps',
    slug: 'devops',
    level: 'Practical foundation',
    mode: 'Workshop plus practice',
    duration: '6-10 weeks',
    status: 'Planning',
    audience: 'Developers moving into delivery roles',
    topics: ['Git', 'CI/CD', 'Docker', 'Cloud deploys', 'Monitoring']
  },
  {
    title: 'Interview Preparation',
    slug: 'interview-preparation',
    level: 'Role-specific',
    mode: 'Mock interviews',
    duration: '2-6 weeks',
    status: 'Available',
    audience: 'Job seekers and switchers',
    topics: ['Scenarios', 'Communication', 'Resume review', 'Technical rounds']
  }
];

type Service = readonly [title: string, copy: string, Icon: LucideIcon];
type QuickAction = readonly [label: string, href: string, Icon: LucideIcon];

export const services: readonly Service[] = [
  ['IT training', 'Practical classes for current technologies.', GraduationCap],
  ['Interview coaching', 'Scenario-based preparation with developer feedback.', MessageSquareText],
  ['Career mentoring', 'Honest roadmaps for roles, skills, and portfolio growth.', UsersRound],
  ['Certification guidance', 'Structured study plans without unrealistic promises.', ShieldCheck],
  ['Freelance development', 'Small and medium project delivery by working developers.', Code2],
  ['Technical consulting', 'CRM, integration, automation, and app architecture support.', BriefcaseBusiness],
  ['Corporate training', 'Team enablement for Salesforce, Java, DevOps, and CRM.', BookOpenCheck],
  ['Application support', 'Reliable maintenance, handover, and improvement cycles.', Handshake]
];

export const ecosystem = [
  'Salesforce',
  'Java',
  'DevOps',
  'CRM',
  'Cloud',
  'AI',
  'Data',
  'APIs',
  'Testing',
  'Frontend',
  'Backend',
  'Career',
  'Certification',
  'Projects',
  'Community',
  'Mentoring',
  'Automation',
  'Security',
  'UX',
  'Delivery',
  'Support',
  'Growth'
];

export const resources = [
  {
    title: 'Salesforce Developer Roadmap',
    slug: 'salesforce-developer-roadmap',
    type: 'Roadmap',
    summary: 'A practical path from platform basics to Apex, LWC, integration, and project delivery.'
  },
  {
    title: 'Java Interview Scenario Practice',
    slug: 'java-interview-scenario-practice',
    type: 'Interview questions',
    summary: 'Question patterns for OOP, collections, APIs, debugging, and backend fundamentals.'
  },
  {
    title: 'DevOps Starter Checklist',
    slug: 'devops-starter-checklist',
    type: 'Guide',
    summary: 'A compact checklist for Git, CI/CD, Docker, cloud deployments, and monitoring habits.'
  }
];

export const trustItems = [
  'Developer-led sessions',
  'Practical project exposure',
  'Interview-focused preparation',
  'Community mentoring',
  'Flexible learning paths'
];

export const pillars = [
  ['Learn from working developers', 'Sessions are shaped by people who build, debug, deploy, and support real systems.'],
  ['Practice real-world scenarios', 'Exercises are framed around delivery decisions, not just isolated syntax.'],
  ['Prepare for interviews and certifications', 'Guidance is honest, role-aware, and grounded in practical readiness.'],
  ['Grow through community and projects', 'Learning continues through discussions, mentoring, and project exposure.']
];

export const quickActions: readonly QuickAction[] = [
  ['Explore Learning Paths', '/learning-paths', Sparkles],
  ['Discuss Your Project', '/project-enquiry', Network],
  ['Join Developer Community', '/community', CircleDot]
];

// Placeholder-but-plausible catalogue content for the flagship pillar pages.
// Client names, testimonials, and transcripts below are illustrative, not real
// engagements — swap in real case studies/quotes as they become available.

export const caseStudies = [
  {
    slug: 'northwind-fleet-ops',
    title: 'Fleet Ops Dashboard',
    client: 'Northwind Logistics',
    summary: 'Real-time dispatch and route optimization console replacing a spreadsheet-driven workflow.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'WebSockets'],
    metric: '40% faster dispatch decisions'
  },
  {
    slug: 'harborline-pipeline',
    title: 'Sales Pipeline Rebuild',
    client: 'Harborline Retail Group',
    summary: 'Salesforce-integrated pipeline tooling with automated lead scoring for a multi-region sales team.',
    stack: ['Salesforce', 'Apex', 'LWC', 'REST APIs'],
    metric: '2.3x faster lead follow-up'
  },
  {
    slug: 'atlas-clinic-portal',
    title: 'Patient Intake Portal',
    client: 'Atlas Health Clinics',
    summary: 'Static-export intake and scheduling portal backed by a lightweight PHP/MySQL API for low-maintenance hosting.',
    stack: ['Next.js', 'PHP', 'MySQL', 'PDF generation'],
    metric: '65% fewer intake calls'
  },
  {
    slug: 'summit-support-copilot',
    title: 'Support Ticket Copilot',
    client: 'Summit Cloud Software',
    summary: 'AI-assisted ticket triage layered onto an existing helpdesk, suggesting responses from prior resolutions.',
    stack: ['React', 'Node.js', 'Vector search', 'LLM API'],
    metric: '31% faster first response'
  }
];

export const careerStages = [
  { label: 'Skill audit', duration: 'Week 1', description: 'An honest baseline of current skills and gaps, mapped against real job requirements for your target role.' },
  { label: 'Resume & profile', duration: 'Weeks 1-2', description: 'Resume, LinkedIn, and portfolio rebuilt around outcomes and project evidence, not keyword stuffing.' },
  { label: 'Mock interviews', duration: 'Weeks 2-5', description: 'Scenario-based mock interviews with direct developer feedback across technical and behavioral rounds.' },
  { label: 'Certification prep', duration: 'Weeks 3-6', description: 'A structured study plan for the certification that actually matches the target role.' },
  { label: 'Placement support', duration: 'Ongoing', description: 'Application strategy, referral support, and continued mentoring through offers and negotiation.' }
] as const;

export const testimonials = [
  { quote: 'The mock interviews were closer to the real thing than my actual interview.', name: 'Priya N.', role: 'Salesforce Developer, career switcher' },
  { quote: 'We shipped the fleet dashboard in eight weeks with a two-person team on our side.', name: 'Daniel R.', role: 'Ops Lead, Northwind Logistics' },
  { quote: 'The support agent handled most tier-1 tickets before we even finished tuning it.', name: 'Meera S.', role: 'Support Manager, Summit Cloud Software' }
] as const;

export type AgentTurn = { role: 'user' | 'agent'; text: string; delayMs: number };
export type AgentScenario = { id: string; label: string; description: string; transcript: AgentTurn[] };

export const agentScenarios: AgentScenario[] = [
  {
    id: 'support',
    label: 'Support agent',
    description: 'Resolves a tier-1 order status question without a human handoff.',
    transcript: [
      { role: 'user', text: 'Hi, where is my order #48213? It was supposed to arrive yesterday.', delayMs: 400 },
      { role: 'agent', text: 'Checking order #48213 now...', delayMs: 900 },
      { role: 'agent', text: 'It shipped on time but is delayed at the regional hub. New estimate: tomorrow by 6pm. I have added a $10 credit to your account for the delay.', delayMs: 1600 },
      { role: 'user', text: 'That works, thank you.', delayMs: 600 },
      { role: 'agent', text: 'Anytime — I will also text you the moment it leaves the hub.', delayMs: 800 }
    ]
  },
  {
    id: 'sales',
    label: 'Sales qualifier',
    description: 'Qualifies an inbound lead and books a call with the right specialist.',
    transcript: [
      { role: 'user', text: 'We need a CRM integration for about 40 sales reps, mid-size distributor.', delayMs: 400 },
      { role: 'agent', text: 'Got it — 40 seats, distribution. Are you on Salesforce today or evaluating?', delayMs: 900 },
      { role: 'user', text: 'On Salesforce, but our quoting process is still manual.', delayMs: 700 },
      { role: 'agent', text: 'That is a common Integrations-track project for us. Booking you with our Salesforce quoting lead — Thursday 2pm or Friday 10am?', delayMs: 1400 },
      { role: 'user', text: 'Friday 10am works.', delayMs: 500 },
      { role: 'agent', text: 'Booked — sending a calendar invite and a short intake form now.', delayMs: 800 }
    ]
  },
  {
    id: 'ops',
    label: 'Internal ops copilot',
    description: 'Answers an internal question by pulling from live project data.',
    transcript: [
      { role: 'user', text: 'Which active projects are over budget this month?', delayMs: 400 },
      { role: 'agent', text: 'Pulling the project ledger...', delayMs: 800 },
      { role: 'agent', text: 'Two: Atlas Clinic Portal (+12% hours) and Harborline Pipeline (+4%). Atlas is over due to a scope change on Aug 14 that was never re-quoted.', delayMs: 1600 },
      { role: 'user', text: 'Draft a note to the Atlas client about the scope change.', delayMs: 600 },
      { role: 'agent', text: 'Draft ready in the Atlas project channel for review before sending.', delayMs: 800 }
    ]
  }
];

export type IntegrationNode = { id: string; label: string; description: string; x: number; y: number };

export const integrationNodes: IntegrationNode[] = [
  { id: 'salesforce', label: 'Salesforce', description: 'Bi-directional sync for leads, cases, and custom objects via REST and platform events.', x: 18, y: 20 },
  { id: 'slack', label: 'Slack', description: 'Real-time alerts, approvals, and bot workflows without leaving the team channel.', x: 82, y: 18 },
  { id: 'stripe', label: 'Stripe', description: 'Billing, invoicing, and usage-based metering wired straight into your product and CRM.', x: 14, y: 78 },
  { id: 'warehouse', label: 'Data warehouse', description: 'Scheduled and event-driven pipelines into your warehouse for reporting and analytics.', x: 85, y: 80 },
  { id: 'custom-api', label: 'Custom APIs', description: 'Internal systems and legacy tools exposed through a clean, documented API layer.', x: 50, y: 92 }
];
