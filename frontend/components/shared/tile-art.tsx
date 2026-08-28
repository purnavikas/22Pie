export type TileArtVariant = 'pulse' | 'stack' | 'ascend' | 'path' | 'orbit';

export function TileArt({
  variant,
  accent,
  className = ''
}: {
  variant: TileArtVariant;
  accent: string;
  className?: string;
}) {
  return (
    <svg aria-hidden="true" className={`w-full ${className}`} fill="none" viewBox="0 0 120 80">
      {variant === 'pulse' ? (
        <g>
          <circle className="tile-art-pulse" cx={60} cy={40} r={26} stroke={accent} strokeOpacity={0.22} />
          <circle cx={60} cy={40} r={16} stroke={accent} strokeOpacity={0.45} />
          <circle cx={60} cy={40} r={6} fill={accent} />
          <circle className="tile-art-float" cx={90} cy={22} r={3} fill={accent} fillOpacity={0.7} />
          <circle className="tile-art-float" cx={32} cy={58} r={2.5} fill={accent} fillOpacity={0.5} style={{ animationDelay: '0.6s' }} />
        </g>
      ) : null}

      {variant === 'stack' ? (
        <g>
          <rect fill="rgba(255,255,255,0.03)" height={46} rx={6} stroke={accent} strokeOpacity={0.2} width={72} x={32} y={10} />
          <rect fill="rgba(255,255,255,0.04)" height={46} rx={6} stroke={accent} strokeOpacity={0.35} width={72} x={22} y={18} />
          <rect fill="rgba(255,255,255,0.06)" height={46} rx={6} stroke={accent} strokeOpacity={0.7} width={72} x={12} y={26} />
          <circle cx={20} cy={34} fill={accent} r={2} />
          <circle cx={27} cy={34} fill={accent} fillOpacity={0.6} r={2} />
          <circle cx={34} cy={34} fill={accent} fillOpacity={0.3} r={2} />
          <line stroke={accent} strokeOpacity={0.4} x1={17} x2={64} y1={46} y2={46} />
          <line stroke={accent} strokeOpacity={0.25} x1={17} x2={50} y1={54} y2={54} />
          <line stroke={accent} strokeOpacity={0.25} x1={17} x2={70} y1={62} y2={62} />
        </g>
      ) : null}

      {variant === 'ascend' ? (
        <g>
          <rect fill={accent} fillOpacity={0.22} height={18} rx={2} width={14} x={14} y={54} />
          <rect fill={accent} fillOpacity={0.4} height={30} rx={2} width={14} x={36} y={42} />
          <rect fill={accent} fillOpacity={0.58} height={42} rx={2} width={14} x={58} y={30} />
          <rect fill={accent} fillOpacity={0.78} height={56} rx={2} width={14} x={80} y={16} />
          <circle className="tile-art-float" cx={87} cy={9} fill={accent} r={4} />
        </g>
      ) : null}

      {variant === 'path' ? (
        <g>
          <path d="M12 66 C 34 66, 34 46, 56 46 S 78 26, 100 26" fill="none" stroke={accent} strokeDasharray="1 7" strokeLinecap="round" strokeOpacity={0.4} strokeWidth={2} />
          <circle cx={12} cy={66} fill={accent} fillOpacity={0.4} r={4} />
          <circle cx={56} cy={46} fill={accent} fillOpacity={0.7} r={4} />
          <circle className="tile-art-float" cx={100} cy={26} fill={accent} r={5} />
        </g>
      ) : null}

      {variant === 'orbit' ? (
        <g>
          <line stroke={accent} strokeOpacity={0.3} x1={60} x2={22} y1={40} y2={20} />
          <line stroke={accent} strokeOpacity={0.3} x1={60} x2={98} y1={40} y2={20} />
          <line stroke={accent} strokeOpacity={0.3} x1={60} x2={60} y1={40} y2={70} />
          <circle cx={22} cy={20} fill={accent} fillOpacity={0.6} r={4} />
          <circle cx={98} cy={20} fill={accent} fillOpacity={0.6} r={4} />
          <circle className="tile-art-float" cx={60} cy={70} fill={accent} fillOpacity={0.6} r={4} />
          <circle cx={60} cy={40} fill="#0b0f14" r={7} stroke={accent} strokeWidth={1.5} />
        </g>
      ) : null}
    </svg>
  );
}
