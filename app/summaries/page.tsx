'use client';

import CreateSummaryForm from '@components/forms/CreateSummaryForm';

export default function SummariesPage() {
  return (
    <main className="relative isolate m-4">
      <div className="mx-auto my-48 max-w-2xl">
        <CreateSummaryForm title="Create a new summary" />
      </div>
    </main>
  );
}
