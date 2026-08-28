import type { IntegrationNode as IntegrationNodeData } from '@/data/site';

export function IntegrationNode({
  node,
  active,
  accent,
  onEnter,
  onLeave
}: {
  node: IntegrationNodeData;
  active: boolean;
  accent: string;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const labelY = node.y > 55 ? node.y - 7 : node.y + 8;

  return (
    <g className="cursor-pointer" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <circle
        cx={node.x}
        cy={node.y}
        fill={active ? accent : '#151b23'}
        r={4}
        stroke="rgba(255,255,255,0.28)"
        strokeWidth={0.4}
      />
      <text className="pointer-events-none" fill="#fff" fontSize={2.6} textAnchor="middle" x={node.x} y={labelY}>
        {node.label}
      </text>
    </g>
  );
}
