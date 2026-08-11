import { BarChart3, FileText, GraduationCap, Inbox, LockKeyhole, Settings, UsersRound } from 'lucide-react';

const dashboard = [
  ['Total enquiries', '0', Inbox],
  ['Published courses', '0', GraduationCap],
  ['Draft resources', '0', FileText],
  ['Active admins', '1', UsersRound]
] as const;

export default function AdminPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-violet">Admin</p>
          <h1 className="mt-3 text-4xl font-black text-graphite md:text-6xl">Pie symbol control room</h1>
          <p className="mt-4 max-w-2xl text-ink">This static admin shell is ready to connect to the protected PHP APIs for content, enquiries, media, SEO, menus, and settings.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-graphite px-5 py-3 text-sm font-bold text-paper">
          <LockKeyhole size={18} /> Login required
        </button>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {dashboard.map(([label, value, Icon]) => (
          <article className="rounded border-2 border-graphite bg-white p-5" key={label as string}>
            <Icon className="text-aqua" />
            <strong className="mt-5 block text-4xl">{value as string}</strong>
            <span className="text-sm text-ink">{label as string}</span>
          </article>
        ))}
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded border-2 border-graphite bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-black"><BarChart3 size={20} /> Enquiry trends</h2>
          <div className="mt-6 grid h-56 place-items-center rounded bg-aqua text-sm font-semibold text-graphite">
            Meaningful analytics will appear after real enquiries are stored.
          </div>
        </section>
        <section className="rounded border-2 border-graphite bg-white p-5">
          <h2 className="flex items-center gap-2 text-xl font-black"><Settings size={20} /> Manage</h2>
          <div className="mt-5 grid gap-2 text-sm font-semibold">
            {['Courses', 'Learning paths', 'Services', 'Projects', 'Articles', 'Testimonials', 'FAQs', 'Media', 'Settings'].map((item) => (
              <button className="rounded border-2 border-graphite px-3 py-2 text-left hover:bg-paper" key={item}>{item}</button>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
