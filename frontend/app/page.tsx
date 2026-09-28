import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Circle, Sparkles } from 'lucide-react';
import { learningPaths, services, trustItems } from '@/data/site';
import { RubiksCubeSection } from '@/components/sections/rubiks-cube-section';
import { ChameleonReactionSection } from '@/components/chameleon/chameleon-reaction-section';
import { IntroVideoOverlay } from '@/components/layout/intro-video-overlay';

function DevelopmentShowcase() {
  return (
    <section className="bg-graphite">
      <div className="tech-hero relative mx-auto min-h-[calc(100svh-72px)] max-w-[1800px] overflow-hidden text-white">
        <video aria-hidden="true" autoPlay className="hero-video absolute inset-0 size-full object-cover" loop muted playsInline>
          <source src="/videos/robot-interacting-with-butterfly.mp4" type="video/mp4" />
        </video>
        <div aria-hidden="true" className="hero-video-wash absolute inset-0 z-10" />
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 p-5 md:p-7">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
            <span className="size-2 rounded-full bg-violet" />
            Web &amp; app development
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="glass-pill px-4 py-2 text-xs font-semibold">Requirement-led</span>
            <span className="glass-pill px-4 py-2 text-xs font-semibold">Built with purpose</span>
          </div>
        </div>
        <div className="absolute bottom-14 left-6 right-6 z-20 max-w-3xl md:bottom-20 md:left-10 md:right-auto">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold">
            <Circle className="fill-violet text-violet" size={8} />
            From imagination to reality
          </p>
          <h2 className="text-[clamp(3rem,7vw,7.4rem)] font-medium leading-[0.86] tracking-[-0.065em]">
            Elevate your<br />imagination.
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
            We are passionate about web and app development. Based on your requirements, we select the right technology stack and build with care—turning your imagination into a real, working digital product.
          </p>
          <Link className="glass-button mt-7 inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-graphite transition" href="/project-enquiry">
            Discuss your project <ArrowRight size={17} />
          </Link>
        </div>
        <div aria-label="22Pie" className="hero-watermark absolute bottom-10 right-7 z-20 hidden text-right md:block">
          <div className="text-6xl font-semibold tracking-[-0.08em]">22π</div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.34em]">Learn · Build · Grow</div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <IntroVideoOverlay />
      <ChameleonReactionSection />

      <RubiksCubeSection />

      <DevelopmentShowcase />

      <section className="overflow-hidden border-y border-white bg-violet py-4 text-white">
        <div className="marquee-track flex min-w-max items-center gap-8 text-sm font-semibold uppercase tracking-[0.16em]">
          {[...trustItems, ...trustItems].map((item, index) => (
            <span className="flex items-center gap-8" key={`${item}-${index}`}>
              {item} <Sparkles size={15} />
            </span>
          ))}
        </div>
      </section>

      <section className="bg-graphite px-4 py-24 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:items-end">
            <p className="max-w-xs text-xs font-semibold uppercase tracking-[0.18em] text-white/60">01 — Choose your direction</p>
            <h2 className="max-w-4xl text-4xl font-medium leading-[0.98] tracking-[-0.045em] md:text-7xl">
              Technology becomes useful when you know what to build with it.
            </h2>
          </div>

          <div className="mt-16 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {learningPaths.map((path, index) => (
              <Link className="glass-surface glass-surface--dark learning-card group flex min-h-[360px] flex-col justify-between rounded-[24px] p-6 transition hover:-translate-y-1" href={`/learning-paths/${path.slug}`} key={path.slug}>
                <div className="flex items-start justify-between">
                  <span className="text-xs text-white/50">0{index + 1}</span>
                  <ArrowUpRight className="transition group-hover:rotate-45" size={20} />
                </div>
                <div>
                  <span className="mb-5 inline-flex rounded-full bg-violet px-3 py-1 text-[11px] font-semibold">{path.status}</span>
                  <h3 className="text-3xl font-medium tracking-[-0.035em]">{path.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{path.level} · {path.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 text-graphite md:px-8 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-8 border-b border-graphite pb-10 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet">02 — What we do</p>
              <h2 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] md:text-8xl">One ecosystem.<br />Many ways forward.</h2>
            </div>
            <Link className="glass-button glass-button--dark inline-flex w-fit items-center gap-2 px-5 py-3 text-sm font-semibold text-white" href="/services">
              All services <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {services.map(([title, copy, Icon], index) => (
              <article className="glass-surface glass-surface--light group min-h-[280px] p-6 transition lg:rounded-none" key={title}>
                <div className="flex items-center justify-between">
                  <Icon size={23} />
                  <span className="text-xs text-ink/50">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-24 text-2xl font-medium tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/65">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-aqua px-4 py-24 text-graphite md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">03 — Built differently</p>
            <h2 className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.055em] md:text-7xl">Real practice.<br />Clear guidance.<br />Shared growth.</h2>
          </div>
          <div className="md:pb-2">
            {['Working-developer mentors', 'Scenario-based sessions', 'Interview and certification support', 'Project exposure and community'].map((item) => (
              <div className="flex items-center justify-between border-t border-graphite py-5 text-base font-semibold" key={item}>
                {item} <Check size={20} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite px-4 py-24 text-white md:px-8 md:py-32">
        <div className="glass-surface glass-surface--violet mx-auto max-w-[1440px] rounded-[28px] p-7 md:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">Ready when you are</p>
          <div className="mt-20 flex flex-col justify-between gap-10 md:mt-32 md:flex-row md:items-end">
            <h2 className="max-w-5xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] md:text-8xl">Make your next move matter.</h2>
            <Link className="glass-button inline-flex size-28 shrink-0 items-center justify-center text-graphite transition hover:scale-105" href="/contact" aria-label="Start a conversation">
              <ArrowUpRight size={34} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
