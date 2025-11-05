import Link from 'next/link';
import { verifyJWT } from '../lib/dal';
import { redirect } from 'next/navigation';

interface Summary {
  id: string;
  text: string;
  since: string;
  until: string;
  createdAt: string;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

function getPreview(text: string, length = 160) {
  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length - 1)}…`;
}

export async function SummaryList() {
  const jwt = await verifyJWT();

  if (!jwt) redirect('/login');

  const res = await fetch(`${process.env.API_URL}/summaries`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="text-sm text-red-600 dark:text-red-400">
        We couldn&apos;t load your summaries. Please try again later.
      </div>
    );
  }

  const summaries: Summary[] = await res.json();

  if (!summaries.length) {
    return (
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        No summaries available yet.
      </div>
    );
  }

  return (
    <ul className="flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
      {summaries.map((summary) => (
        <SummaryListItem key={summary.id} summary={summary} />
      ))}
    </ul>
  );
}

interface SummaryListItemProps {
  summary: Summary;
}

export function SummaryListItem({ summary }: SummaryListItemProps) {
  return (
    <li>
      <Link
        href={`/summary/${summary.id}`}
        className="flex flex-col gap-1 rounded-lg px-4 py-4 transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:hover:bg-zinc-900"
      >
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {formatDate(summary.since)} – {formatDate(summary.until)}
        </p>
        <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
          {getPreview(summary.text)}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Created {formatDate(summary.createdAt)}
        </p>
      </Link>
    </li>
  );
}
