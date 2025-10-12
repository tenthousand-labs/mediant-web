export const metadata = {
  title: "Sign Up | Hospli",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-slate-100">
      <div className="w-full max-w-2xl space-y-10 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-white">Create your Hospli workspace</h1>
          <p className="text-sm text-slate-300">
            Share a few details and we&apos;ll guide you through onboarding and connecting your tools.
          </p>
        </div>
        <form className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2 text-left md:col-span-2">
            <label className="text-sm font-medium text-white" htmlFor="name">
              Full name
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Ada Lovelace"
              required
            />
          </div>
          <div className="space-y-2 text-left md:col-span-2">
            <label className="text-sm font-medium text-white" htmlFor="email">
              Work email
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          </div>
          <div className="space-y-2 text-left">
            <label className="text-sm font-medium text-white" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              required
            />
          </div>
          <div className="space-y-2 text-left">
            <label className="text-sm font-medium text-white" htmlFor="passwordConfirmation">
              Confirm password
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter password"
              required
            />
          </div>
          <button
            className="md:col-span-2 inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            type="submit"
          >
            Create account
          </button>
        </form>
        <p className="text-center text-xs text-slate-400">
          By signing up, you agree to Hospli&apos;s Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
