import { ecosystem } from '@/data/site';

export function EcosystemVisual() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded border-2 border-graphite bg-graphite p-6 text-paper shadow-soft" aria-label="Technology ecosystem">
      <div className="absolute inset-8 rounded-full border-2 border-aqua" />
      <div className="absolute inset-20 rounded-full border-2 border-coral" />
      <div className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-aqua bg-paper text-center text-sm font-bold text-graphite">
        Pie
        <span className="block text-[10px] font-medium">ecosystem</span>
      </div>
      <div className="relative mx-auto aspect-square max-w-[420px]">
        {ecosystem.map((label, index) => {
          const angle = (index / ecosystem.length) * 360;
          const radius = index % 2 === 0 ? 42 : 34;
          const style = {
            left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
            top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`
          };

          return (
            <span
              className="ecosystem-node absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border-2 border-paper bg-violet px-3 py-1.5 text-[11px] font-semibold transition hover:border-aqua hover:bg-aqua hover:text-graphite"
              key={label}
              style={style}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
