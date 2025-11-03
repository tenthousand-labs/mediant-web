import GitHubTokenForm from '../github/page';
import { getAuthenticatedUser } from '../lib/dal';

export default async function Dashboard() {
  const user = await getAuthenticatedUser();

  return (
    <main className="relative isolate m-4">
      <div className="mx-auto max-w-2xl my-48">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Welcome, {user.name}!
        </h1>
      </div>
      <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        <GitHubTokenForm />
      </div>
    </main>
  );
}
