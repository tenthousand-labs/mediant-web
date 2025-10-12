import Link from "next/link";

const features = [
  {
    title: "Daily Check-ins",
    description:
      "Capture the highlights and blockers for your day with focused prompts that keep your team aligned.",
  },
  {
    title: "GitHub Integration",
    description:
      "Connect your repositories to automatically surface pull requests, commits, and issues in your updates.",
  },
  {
    title: "Actionable Summaries",
    description:
      "Receive an end-of-day recap that surfaces priorities, follow-ups, and next steps for your squad.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-5xl px-6 pb-24 pt-20 sm:pt-28">
        <div className="flex flex-col gap-12 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">
              hospli.app
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Daily rituals and weekly insight for high-velocity product teams.
            </h1>
            <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
              Hospli keeps everyone in sync with structured daily updates, a guided
              onboarding flow, and summaries that surface what matters most.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-300"
              href="/sign-up"
            >
              Get started
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-300"
              href="/login"
            >
              Log in
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-24 px-6 pb-32">
        <section className="grid gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-xl font-semibold text-white">{feature.title}</h2>
              <p className="text-sm text-slate-300">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold text-white">How it works</h2>
            <ol className="mt-6 space-y-4 text-sm text-slate-300">
              <li>
                <span className="font-semibold text-white">1. Sign up</span> to create your workspace and invite collaborators.
              </li>
              <li>
                <span className="font-semibold text-white">2. Connect GitHub</span> to automatically pull in activity from across your projects.
              </li>
              <li>
                <span className="font-semibold text-white">3. Share daily updates</span> that turn into weekly summaries your team can actually use.
              </li>
            </ol>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-8">
            <div>
              <h2 className="text-2xl font-semibold text-white">Built for distributed teams</h2>
              <p className="mt-4 text-sm text-slate-300">
                Hospli ensures that every teammate stays in sync no matter their timezone. Structured prompts and reminders drive meaningful updates, while summaries surface the insights leaders need.
              </p>
            </div>
            <Link
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              href="/onboarding"
            >
              Explore onboarding
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
