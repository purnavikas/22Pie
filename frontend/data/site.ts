import {
  BookOpenCheck,
  BriefcaseBusiness,
  CircleDot,
  Code2,
  GraduationCap,
  Handshake,
  MessageSquareText,
  Network,
  ShieldCheck,
  Sparkles,
  UsersRound
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const navItems = [
  ['Learn', '/learning-paths'],
  ['Career', '/career-guidance'],
  ['Services', '/services'],
  ['Community', '/community'],
  ['Projects', '/projects'],
  ['Resources', '/resources'],
  ['About', '/about'],
  ['Contact', '/contact']
] as const;

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
