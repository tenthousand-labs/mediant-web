interface SummaryPageProps {
  params: { id: string };
}

const summaryContent = {
  highlights: [
    "Weekly deployment frequency increased to 3x per day thanks to the release train.",
    "Customer success closed the loop on five enterprise feedback items.",
  ],
  insights: [
    "Focus feature adoption accelerates when onboarding prompts include short demos.",
    "Mobile reliability remains the top risk; error budget burned at 60% of target.",
  ],
  nextSteps: [
    "Run opt-in beta for the workspace roles experience.",
    "Pair PM + Eng on scoping SLO alert follow-up tasks.",
  ],
};

function formatSummaryId(id: string) {
  return id
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export default function SummaryDetailsPage({ params }: SummaryPageProps) {
  const title = formatSummaryId(params.id);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-12">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Summary detail
          </p>
          <h1 className="text-4xl font-semibold text-white">{title}</h1>
          <p className="text-sm text-slate-300">
            A high-level recap that distills signal from the daily updates collected across your workspace.
          </p>
        </header>

        <section className="space-y-6">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Highlights</h2>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-300">
              {summaryContent.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Insights</h2>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-300">
              {summaryContent.insights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Next steps</h2>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-300">
              {summaryContent.nextSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </div>
  );
}
