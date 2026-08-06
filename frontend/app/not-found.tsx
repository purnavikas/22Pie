import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-coral">404</p>
      <h1 className="mt-4 text-4xl font-black text-graphite">This piece is missing.</h1>
      <p className="mt-4 text-ink/70">The page you requested is not available in the current Pie learning system.</p>
      <Link className="mt-8 inline-flex rounded-full bg-graphite px-5 py-3 text-sm font-bold text-paper" href="/">
        Go home
      </Link>
    </section>
  );
}
