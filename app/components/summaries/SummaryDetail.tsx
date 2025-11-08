import { notFound } from 'next/navigation';

import { getSummary, SummaryNotFoundError } from '@lib/api/summaries';
import { verifySession } from '@lib/auth/verifySession';
import type { Summary } from '@lib/types/summary';

type SummaryDetailProps = {
  summaryId: string;
  className?: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export default async function SummaryDetail({
  summaryId,
  className,
}: SummaryDetailProps) {
  const token = await verifySession({ redirectToLogin: true });

  if (!token) {
    return null;
  }

  let summary: Summary | null = null;
  let error: string | null = null;

  try {
    summary = await getSummary(token, summaryId);
  } catch (err) {
    if (err instanceof SummaryNotFoundError) {
      notFound();
    }

    error =
      err instanceof Error
        ? err.message
        : 'We could not load this summary. Please try again later.';
  }

  if (error) {
    return (
      <div className={className}>
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <article
      className={[
        'rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <header className="mb-6 flex flex-col gap-2">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {formatDate(summary.since)} – {formatDate(summary.until)}
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          Created {formatDate(summary.createdAt)}
        </p>
      </header>
      <p className="whitespace-pre-line text-base leading-relaxed text-zinc-900 dark:text-zinc-100">
        {summary.text}
      </p>
    </article>
  );
}
