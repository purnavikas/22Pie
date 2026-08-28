import { GlassCard } from '@/components/shared/glass-card';
import type { testimonials } from '@/data/site';

type Testimonial = (typeof testimonials)[number];

export function TestimonialCard({ testimonial, accent }: { testimonial: Testimonial; accent: string }) {
  return (
    <GlassCard accent={accent} className="flex h-full flex-col justify-between p-6">
      <p className="text-base leading-7 text-white/80">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-6">
        <p className="text-sm font-semibold text-white">{testimonial.name}</p>
        <p className="text-xs text-white/50">{testimonial.role}</p>
      </div>
    </GlassCard>
  );
}
