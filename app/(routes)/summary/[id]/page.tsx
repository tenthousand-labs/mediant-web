import SummaryDetail from '@components/summaries/SummaryDetail';

type SummaryPageProps = {
  params: {
    id: string;
  };
};

export default function SummaryPage({ params }: SummaryPageProps) {
  return (
    <main className="relative isolate m-4">
      <div className="mx-auto my-24 max-w-2xl">
        <SummaryDetail summaryId={params.id} />
      </div>
    </main>
  );
}
