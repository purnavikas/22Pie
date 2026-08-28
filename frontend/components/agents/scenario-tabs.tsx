'use client';

import type { AgentScenario } from '@/data/site';

export function ScenarioTabs({
  scenarios,
  activeId,
  onSelect
}: {
  scenarios: AgentScenario[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div aria-label="Agent scenarios" className="flex flex-wrap gap-2" role="tablist">
      {scenarios.map((scenario) => (
        <button
          aria-selected={scenario.id === activeId}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            scenario.id === activeId
              ? 'border-transparent bg-neon-red text-white'
              : 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10'
          }`}
          key={scenario.id}
          onClick={() => onSelect(scenario.id)}
          role="tab"
          type="button"
        >
          {scenario.label}
        </button>
      ))}
    </div>
  );
}
