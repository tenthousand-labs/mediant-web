import CreateSummaryForm from '@components/forms/CreateSummaryForm';
import SummaryList from '@components/summaries/SummaryList';
import { getAuthenticatedUser } from '@lib/auth/getAuthenticatedUser';

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();

  return (
    <main className="relative isolate m-4">
      <div className="mx-auto my-48 max-w-2xl">
        <h1 className="max-w-xs text-3xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
          Welcome, {user.name}!
        </h1>
        <CreateSummaryForm className="mt-12" />
        <section aria-label="Summaries" className="mt-16">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Recent summaries
          </h2>
          <SummaryList className="mt-6" />
        </section>
      </div>
    </main>
  );
}
