import { SummaryList } from "../components/summary-list";

export default async function Dashboard() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_MEDIANT_API_URL}/user`, {
    credentials: "include",
    // 👇 Important to forward the cookie when deployed on the same domain
    // Next.js automatically sends cookies in SSR requests
    cache: "no-store",
  });

  const user = await res.json();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-12 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">{user.name}</p>
        </div>
        <section className="flex w-full flex-col gap-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Recent summaries</h2>
          <SummaryList />
        </section>
      </main>
    </div>
  );
}
