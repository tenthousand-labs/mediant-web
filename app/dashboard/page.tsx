import CreateSummaryForm from '../components/CreateSummaryForm';
import { getAuthenticatedUser } from '../lib/dal';

export default async function Dashboard() {
  const user = await getAuthenticatedUser();

  return (
    <main className="relative isolate m-4">
      <div className="mx-auto max-w-2xl my-48">
        <h1 className="max-w-xs text-3xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
          Welcome, {user.name}!
        </h1>
        <CreateSummaryForm />
      </div>
    </main>
  );
}
