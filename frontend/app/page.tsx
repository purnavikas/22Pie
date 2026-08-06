import Link from 'next/link';
import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { learningPaths, pillars, quickActions, services, trustItems } from '@/data/site';

export default function HomePage() {
  return (
    <>
      <section className="hero-photo relative isolate min-h-[calc(100vh-73px)] overflow-hidden bg-paper text-graphite">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/0 to-white/30" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-paper via-paper/78 to-transparent" />
        <div aria-hidden="true" className="butterfly-flight">
          <span className="butterfly-wing left" />
          <span className="butterfly-wing right" />
          <span className="butterfly-body" />
          <span className="butterfly-spark" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center justify-end px-4 pb-24 pt-12 lg:px-6">
          <div className="max-w-xl rounded bg-white/72 p-5 shadow-soft backdrop-blur md:p-6">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-violet">AI guided learning</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-graphite md:text-5xl">Learn. Build. Grow Together.</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-ink/74">
              Practical IT training, career guidance, certification support, community mentoring, and project development for builders moving with AI.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {quickActions.map(([label, href, Icon]) => (
                <Link key={label} className="inline-flex items-center gap-2 rounded-full border border-graphite/10 bg-graphite px-5 py-3 text-sm font-bold text-paper shadow-sm transition hover:-translate-y-0.5 hover:bg-violet" href={href}>
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {trustItems.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm text-ink/70">
                  <CheckCircle2 className="text-violet" size={15} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <a className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-2 rounded-full bg-white/70 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-graphite shadow-sm backdrop-blur" href="#guided-story">
          Follow the butterfly
          <ArrowDown className="scroll-pulse" size={20} />
        </a>
      </section>

      <section id="guided-story" className="guided-scroll py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.72fr_1.28fr] lg:px-6">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-violet">Scroll guide</p>
            <h2 className="mt-3 text-3xl font-black text-graphite md:text-5xl">Each piece reveals the next decision.</h2>
            <p className="mt-5 text-ink/70">Move down the page like a guided path: choose what to learn, understand why it works, see how projects are handled, then take action.</p>
          </div>
          <div className="space-y-4">
            {[
              ['01', 'Pick a learning path', 'Salesforce, Java, DevOps, CRM, cloud, interview preparation, or certification support.'],
              ['02', 'Understand the method', 'Practical sessions, real scenarios, honest mentoring, and community follow-through.'],
              ['03', 'Explore project delivery', 'Websites, CRM implementation, automation, integrations, internal tools, and support.'],
              ['04', 'Start the conversation', 'Send a course enquiry, career request, community interest, or project brief.']
            ].map(([step, title, copy]) => (
              <article className="group grid gap-4 rounded border border-graphite/10 bg-white/92 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft md:grid-cols-[80px_1fr]" key={step}>
                <span className="grid size-16 place-items-center rounded-full bg-graphite font-mono text-sm font-black text-paper transition group-hover:bg-aqua group-hover:text-graphite">{step}</span>
                <div>
                  <h3 className="text-2xl font-black text-graphite">{title}</h3>
                  <p className="mt-2 leading-7 text-ink/70">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="max-w-3xl">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-violet">Learning paths</p>
            <h2 className="mt-3 text-3xl font-black text-graphite md:text-5xl">Choose a path that fits your next move.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {learningPaths.map((path) => (
              <article key={path.slug} className="rounded border border-graphite/10 bg-paper p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-black">{path.title}</h3>
                  <span className="rounded-full bg-aqua/12 px-2.5 py-1 text-xs font-bold text-aqua">{path.status}</span>
                </div>
                <dl className="mt-5 space-y-3 text-sm text-ink/72">
                  <div><dt className="font-bold text-graphite">Level</dt><dd>{path.level}</dd></div>
                  <div><dt className="font-bold text-graphite">Mode</dt><dd>{path.mode}</dd></div>
                  <div><dt className="font-bold text-graphite">Duration</dt><dd>{path.duration}</dd></div>
                </dl>
                <div className="mt-5 flex flex-wrap gap-2">
                  {path.topics.slice(0, 4).map((topic) => (
                    <span key={topic} className="rounded bg-white px-2 py-1 text-xs font-semibold text-ink/70">{topic}</span>
                  ))}
                </div>
                <Link className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet" href={`/learning-paths/${path.slug}`}>
                  Learn more <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-6">
          <div>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-coral">Why this model</p>
            <h2 className="mt-3 text-3xl font-black text-graphite md:text-5xl">A practical ecosystem, not just another course catalogue.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map(([title, copy], index) => (
              <article key={title} className="rounded border border-graphite/10 bg-white p-5">
                <span className="font-mono text-xs font-bold text-violet">0{index + 1}</span>
                <h3 className="mt-3 text-xl font-black text-graphite">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/70">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite py-16 text-paper">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-aqua">Services</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black md:text-5xl">From learning your next technology to delivering your next software project.</h2>
            </div>
            <Link className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-bold text-graphite" href="/services">
              View services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {services.map(([title, copy, Icon]) => (
              <article key={title} className="bg-graphite p-5">
                <Icon className="text-aqua" size={24} />
                <h3 className="mt-4 font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-paper/68">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 lg:px-6">
          {[
            ['I want to learn', ['Choose a learning path', 'Attend practical sessions', 'Complete exercises and projects', 'Receive interview and certification guidance', 'Continue through community mentoring']],
            ['I need a project team', ['Submit project requirements', 'Attend a discovery discussion', 'Receive scope and proposal', 'Track delivery milestones', 'Receive support and handover']]
          ].map(([title, steps]) => (
            <article key={title as string} className="rounded border border-graphite/10 bg-white p-6">
              <h2 className="text-2xl font-black text-graphite">{title as string}</h2>
              <ol className="mt-5 space-y-3">
                {(steps as string[]).map((step, index) => (
                  <li className="flex gap-3 text-sm text-ink/72" key={step}>
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-violet text-xs font-black text-white">{index + 1}</span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-7xl rounded bg-gradient-to-br from-graphite to-ink p-8 text-paper md:p-12">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-aqua">Start here</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black md:text-5xl">Your next skill, interview, certification, or project can start here.</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-full bg-aqua px-5 py-3 text-sm font-bold text-graphite" href="/course-enquiry">Start Learning</Link>
            <Link className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-paper" href="/contact">Talk to the Team</Link>
          </div>
        </div>
      </section>
    </>
  );
}
