interface DailyEntryPageProps {
  params: { date: string };
}

const notes = {
  shipped: ["Merged workspace analytics filters", "Rolled out mobile navigation redesign"],
  focus: ["Drafting success enablement brief", "Partnering with infra on staging refresh"],
  blockers: ["Need security review for OAuth scopes"],
};

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Selected daily";
  }

  return parsed.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function DailyEntryPage({ params }: DailyEntryPageProps) {
  const heading = formatDate(params.date);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Daily archive
          </p>
          <h1 className="text-4xl font-semibold text-white">{heading}</h1>
          <p className="text-sm text-slate-300">
            Reviewing the record keeps the team accountable and helps new teammates ramp quickly.
          </p>
        </header>

        <section className="space-y-6">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Shipped</h2>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-300">
              {notes.shipped.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Focus</h2>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-300">
              {notes.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">Blockers</h2>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-300">
              {notes.blockers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </div>
  );
}
