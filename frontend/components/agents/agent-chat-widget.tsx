'use client';

import { Bot, User } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { agentScenarios, type AgentScenario } from '@/data/site';
import { ScenarioTabs } from './scenario-tabs';

const ACCENT = '#C82634';

function Transcript({ scenario }: { scenario: AgentScenario }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scheduled: number[] = [];

    let elapsed = 0;
    scenario.transcript.forEach((turn, index) => {
      elapsed += reduced ? 0 : turn.delayMs;
      if (!reduced && turn.role === 'agent') {
        const typingStart = elapsed - Math.min(500, turn.delayMs * 0.6);
        scheduled.push(window.setTimeout(() => setTyping(true), typingStart));
      }
      scheduled.push(
        window.setTimeout(() => {
          setTyping(false);
          setVisibleCount(index + 1);
        }, elapsed)
      );
    });

    return () => scheduled.forEach((id) => window.clearTimeout(id));
  }, [scenario]);

  return (
    <div className="flex min-h-[300px] flex-col gap-3 px-5 pb-6 pt-2">
      {scenario.transcript.slice(0, visibleCount).map((turn, index) => (
        <div className={`flex items-start gap-2 ${turn.role === 'user' ? 'justify-end' : 'justify-start'}`} key={index}>
          {turn.role === 'agent' ? <Bot className="mt-1 shrink-0 text-[#C82634]" size={16} /> : null}
          <p
            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-6 ${
              turn.role === 'user' ? 'bg-white/10 text-white' : 'bg-[#C82634]/15 text-white'
            }`}
          >
            {turn.text}
          </p>
          {turn.role === 'user' ? <User className="mt-1 shrink-0 text-white/50" size={16} /> : null}
        </div>
      ))}
      {typing ? (
        <div className="flex items-center gap-2">
          <Bot className="text-[#C82634]" size={16} />
          <span className="flex gap-1">
            <span className="size-1.5 animate-pulse rounded-full bg-white/50" />
            <span className="size-1.5 animate-pulse rounded-full bg-white/50 [animation-delay:150ms]" />
            <span className="size-1.5 animate-pulse rounded-full bg-white/50 [animation-delay:300ms]" />
          </span>
        </div>
      ) : null}
    </div>
  );
}

export function AgentChatWidget() {
  const [activeId, setActiveId] = useState(agentScenarios[0].id);
  const scenario = agentScenarios.find((entry) => entry.id === activeId) ?? agentScenarios[0];

  return (
    <div className="glass-card mx-auto max-w-2xl overflow-hidden" style={{ '--pillar-accent': ACCENT } as CSSProperties}>
      <div className="terminal-chrome">
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="terminal-dot" />
        <span className="ml-2 font-mono text-xs text-white/50">{scenario.id}.chat</span>
      </div>
      <div className="flex flex-col gap-3 px-4 py-3">
        <ScenarioTabs activeId={activeId} onSelect={setActiveId} scenarios={agentScenarios} />
        <p className="text-xs text-white/50">{scenario.description}</p>
      </div>
      <Transcript key={scenario.id} scenario={scenario} />
    </div>
  );
}
