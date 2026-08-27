import {
  Bot,
  CloudCog,
  GraduationCap,
  LayoutPanelTop,
  PanelsTopLeft,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { RubiksCubeBackground } from '@/components/rubiks/rubiks-cube-background';

type Capability = {
  accent: string;
  description: string;
  Icon: LucideIcon;
  number: string;
  title: string;
};

const capabilities: Capability[] = [
  {
    accent: '#2261bc',
    description: 'High-performance websites and immersive digital experiences built with modern technologies.',
    Icon: LayoutPanelTop,
    number: '01',
    title: 'Digital Experience Engineering',
  },
  {
    accent: '#23864b',
    description: 'Secure, scalable and user-focused applications for web, mobile and enterprise environments.',
    Icon: PanelsTopLeft,
    number: '02',
    title: 'Application Engineering',
  },
  {
    accent: '#c82634',
    description: 'Purpose-built AI agents and intelligent systems that transform customer and business operations.',
    Icon: Bot,
    number: '03',
    title: 'AI & Agentic Solutions',
  },
  {
    accent: '#f27622',
    description: 'Connected CRM and cloud ecosystems designed to strengthen customer relationships and accelerate growth.',
    Icon: CloudCog,
    number: '04',
    title: 'CRM & Cloud Transformation',
  },
  {
    accent: '#ffd52c',
    description: 'Integrated workflows and automated processes that improve accuracy, productivity and operational efficiency.',
    Icon: Workflow,
    number: '05',
    title: 'Intelligent Automation',
  },
  {
    accent: '#f5f3e7',
    description: 'Professional education, certification advisory, career mentoring and employment assistance aligned with industry expectations.',
    Icon: GraduationCap,
    number: '06',
    title: 'Academy & Career Enablement',
  },
];

function CapabilityItem({ capability, side }: {
  capability: Capability;
  side: 'left' | 'right';
}) {
  const { accent, description, Icon, number, title } = capability;
  return (
    <article
      className="capability-item"
      data-side={side}
      style={{ '--capability-accent': accent } as CSSProperties}
      tabIndex={0}
    >
      <span aria-hidden="true" className="capability-connector"><i /></span>
      <div className="capability-meta">
        <span className="capability-number">{number}</span>
        <Icon aria-hidden="true" className="capability-icon" size={18} strokeWidth={1.65} />
      </div>
      <h3>{title}</h3>
      <p className="capability-detail">{description}</p>
    </article>
  );
}

export function RubiksCubeSection() {
  return (
    <section className="rubiks-section" aria-labelledby="rubiks-heading">
      <header className="capabilities-intro">
        <p className="rubiks-eyebrow">Our capabilities</p>
        <h2 id="rubiks-heading">Six capabilities.<br />One technology partner.</h2>
        <p className="rubiks-description">
          One connected ecosystem for digital platforms, intelligent systems and professional growth.
        </p>
      </header>

      <div className="capabilities-composition">
        <div className="capability-column capability-column-left">
          {capabilities.slice(0, 3).map((capability) => (
            <CapabilityItem capability={capability} key={capability.number} side="left" />
          ))}
        </div>

        <div className="capability-cube">
          <RubiksCubeBackground />
        </div>

        <div className="capability-column capability-column-right">
          {capabilities.slice(3).map((capability) => (
            <CapabilityItem capability={capability} key={capability.number} side="right" />
          ))}
        </div>
      </div>
    </section>
  );
}
