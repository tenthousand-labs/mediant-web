import Link from 'next/link';

import { getSummaries } from '@lib/api/summaries';
import { verifySession } from '@lib/auth/verifySession';
import type { Summary } from '@lib/types/summary';

type SummaryListProps = {
  className?: string;
};

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

export default async function SummaryList({ className }: SummaryListProps) {
  const token = await verifySession({ redirectToLogin: true });

  if (!token) {
    return null;
  }

  let summaries: Summary[] = [];
  let error: string | null = null;

  try {
    summaries = await getSummaries(token);
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : 'We could not load your summaries. Please try again later.';
  }

  if (error) {
    return (
      <div className={className}>
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!summaries.length) {
    return (
      <div className={className}>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          No summaries available yet.
        </p>
      </div>
    );
  }

  return (
    <ul
      className={[
        'flex w-full flex-col divide-y divide-zinc-200 dark:divide-zinc-800',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {summaries.map((summary) => (
        <SummaryListItem key={summary.id} summary={summary} />
      ))}
    </ul>
  );
}

type SummaryListItemProps = {
  summary: Summary;
};

function SummaryListItem({ summary }: SummaryListItemProps) {
  return (
    <li>
      <Link
        href={`/summary/${summary.id}`}
        className="flex flex-col gap-1 rounded-lg my-4 px-4 py-4 transition hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:hover:bg-zinc-900"
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
