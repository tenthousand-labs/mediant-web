import SummaryDetail from '@components/summaries/SummaryDetail';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

type SummaryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SummaryPage({ params }: SummaryPageProps) {
  const { id } = await params;

  return (
    <main className="relative isolate m-4">
      <div className="mx-auto my-24 max-w-2xl">
        <SummaryDetail summaryId={id} />
        <Link
          href="/dashboard"
          className="cursor-pointer bg-transparent p-0 text-inherit hover:underline"
        >
          <ArrowLeftIcon className="mr-2 inline h-4 w-4" />
          Back
        </Link>
      </div>
    </main>
  );
}
