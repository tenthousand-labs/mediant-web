import Link from "next/link";

const sampleUpdates = [
  {
    id: "standup",
    label: "Shipped",
    items: [
      "Integrated billing webhook with retries",
      "Wrapped up onboarding checklist UX",
    ],
  },
  {
    id: "in-progress",
    label: "In progress",
    items: ["Drafting metrics dashboard for success team", "Validating new alert rules"],
  },
  {
    id: "blockers",
    label: "Blockers",
    items: ["Waiting on product review for the workspace roles epic"],
  },
];

function getRecentDates() {
  const dates: { label: string; href: string }[] = [];
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  for (let offset = 0; offset < 5; offset += 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    const iso = date.toISOString().split("T")[0];
    const label = offset === 0 ? "Today" : formatter.format(date);
    dates.push({ label, href: `/daily/${iso}` });
  }

  return dates;
}

export default function DailyPage() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const recentDates = getRecentDates();

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Daily update
          </p>
          <h1 className="text-4xl font-semibold text-white">{formattedDate}</h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Summarize progress, highlight wins, and capture blockers for today. Team members can jump back to any previous entry using the calendar view.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            {sampleUpdates.map((section) => (
              <article
                key={section.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h2 className="text-lg font-semibold text-white">{section.label}</h2>
                <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-300">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <aside className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Calendar view</h2>
              <p className="mt-2 text-xs text-slate-300">
                Jump to a previous daily to review context and decisions.
              </p>
            </div>
            <nav className="grid gap-2 text-sm">
              {recentDates.map((day) => (
                <Link
                  key={day.href}
                  className="rounded-full border border-white/10 px-4 py-2 text-center text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"
                  href={day.href}
                >
                  {day.label}
                </Link>
              ))}
            </nav>
          </aside>
        </section>
      </div>
    </div>
  );
}
