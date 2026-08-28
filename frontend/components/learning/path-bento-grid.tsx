import { BentoGrid, BentoTile } from '@/components/shared/bento-grid';
import { learningPaths, pillarAccents } from '@/data/site';

const ACCENT = pillarAccents.learning;

export function PathBentoGrid() {
  return (
    <BentoGrid>
      {learningPaths.map((path) => (
        <BentoTile accent={ACCENT} href={`/learning-paths/${path.slug}`} key={path.slug} span="md">
          <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/70">{path.status}</span>
          <div>
            <h3 className="text-2xl font-medium tracking-[-0.03em]">{path.title}</h3>
            <p className="mt-2 text-sm text-white/60">
              {path.level} &middot; {path.duration}
            </p>
            <ul className="mt-4 flex max-h-0 flex-wrap gap-1.5 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
              {path.topics.map((topic) => (
                <li className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/70" key={topic}>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </BentoTile>
      ))}
    </BentoGrid>
  );
}
