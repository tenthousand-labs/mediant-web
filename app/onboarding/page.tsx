export const metadata = {
  title: "Onboarding | Hospli",
};

const steps = [
  {
    title: "Company basics",
    description:
      "Set your workspace name, time zone, and notification preferences so reminders land at the perfect moment.",
  },
  {
    title: "Invite your team",
    description:
      "Bring in product managers, engineers, and stakeholders. Assign roles so everyone knows what to share.",
  },
  {
    title: "Connect GitHub",
    description:
      "Authenticate with GitHub to sync pull requests, deployments, and issues directly into your daily updates.",
  },
  {
    title: "Personalize prompts",
    description:
      "Tune your daily questions with custom templates for focus areas like shipping, risk, or customer feedback.",
  },
];

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Onboarding
          </p>
          <h1 className="text-4xl font-semibold text-white">Getting started with Hospli</h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-300">
            Follow the guided steps below to connect your tools, bring in teammates, and start collecting actionable daily updates.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-base font-semibold text-slate-950">
                {index + 1}
              </span>
              <h2 className="text-xl font-semibold text-white">{step.title}</h2>
              <p className="text-sm text-slate-300">{step.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/20 via-emerald-400/10 to-transparent p-10 text-center">
          <h2 className="text-2xl font-semibold text-white">Connect to GitHub</h2>
          <p className="mt-4 text-sm text-slate-200">
            When you sign in with GitHub we&apos;ll map your repos, pull requests, and issues to the teammates who own them.
            You decide which activity becomes part of the daily record.
          </p>
          <button className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
            Log in with GitHub
          </button>
        </section>
      </div>
    </div>
  );
}
