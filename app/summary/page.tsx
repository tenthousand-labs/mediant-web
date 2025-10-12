import Link from "next/link";

const summaries = [
  {
    id: "week-27",
    title: "Week 27 recap",
    description: "Launch-readiness checkpoints and customer feedback loops",
  },
  {
    id: "week-26",
    title: "Week 26 recap",
    description: "Infrastructure reliability push and incident review",
  },
  {
    id: "retro-q2",
    title: "Q2 retro",
    description: "Highlights from the quarter and priorities for Q3",
  },
];

export const metadata = {
  title: "Summaries | Hospli",
};

export default function SummaryPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Summaries
          </p>
          <h1 className="text-4xl font-semibold text-white">All summaries</h1>
          <p className="max-w-3xl text-sm text-slate-300">
            Browse past summaries or open one to review the insights and next steps that came out of your team&apos;s daily updates.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {summaries.map((summary) => (
            <Link
              key={summary.id}
              className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-emerald-400"
              href={`/summary/${summary.id}`}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                View summary
              </span>
              <h2 className="text-xl font-semibold text-white group-hover:text-emerald-200">
                {summary.title}
              </h2>
              <p className="text-sm text-slate-300">{summary.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
