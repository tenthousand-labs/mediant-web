export const metadata = {
  title: "Log In | Hospli",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-slate-100">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
          <p className="text-sm text-slate-300">
            Log in with your Hospli account to continue tracking your team&apos;s progress.
          </p>
        </div>
        <form className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-sm font-medium text-white" htmlFor="email">
              Email address
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
              autoComplete="current-password"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            className="w-full rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            type="submit"
          >
            Log in
          </button>
        </form>
        <p className="text-center text-xs text-slate-400">
          Forgot your password? Reach out to support@hospli.app.
        </p>
      </div>
    </div>
  );
}
