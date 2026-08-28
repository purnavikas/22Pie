'use client';

import { useState, type CSSProperties } from 'react';
import { integrationNodes } from '@/data/site';
import { IntegrationNode } from './integration-node';

const CENTER = { x: 50, y: 50 };
const ACCENT = '#F27622';

export function NodeGraph() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = integrationNodes.find((node) => node.id === activeId) ?? null;

  return (
    <div className="glass-card relative p-4 md:p-8" style={{ '--pillar-accent': ACCENT } as CSSProperties}>
      <svg className="h-[380px] w-full md:h-[440px]" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
        {integrationNodes.map((node, index) => {
          const d = `M ${CENTER.x} ${CENTER.y} L ${node.x} ${node.y}`;
          return (
            <g key={node.id}>
              <path className="node-graph-line" d={d} data-active={node.id === activeId} />
              <circle className="node-graph-pulse" r={1.1}>
                <animateMotion begin={`${index * 0.5}s`} dur="3.2s" path={d} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        <circle cx={CENTER.x} cy={CENTER.y} fill="#0b0f14" r={5.5} stroke={ACCENT} strokeWidth={0.6} />
        <text fill="#fff" fontSize={3.2} fontWeight={700} textAnchor="middle" x={CENTER.x} y={CENTER.y + 1.1}>
          22&pi;
        </text>

        {integrationNodes.map((node) => (
          <IntegrationNode
            accent={ACCENT}
            active={node.id === activeId}
            key={node.id}
            node={node}
            onEnter={() => setActiveId(node.id)}
            onLeave={() => setActiveId((current) => (current === node.id ? null : current))}
          />
        ))}
      </svg>
      <div className="mt-4 min-h-[48px] text-sm text-white/70">
        {active ? (
          <p>
            <span className="font-semibold text-white">{active.label}: </span>
            {active.description}
          </p>
        ) : (
          <p className="text-white/40">Hover a node to see how it connects.</p>
        )}
      </div>
    </div>
  );
}
