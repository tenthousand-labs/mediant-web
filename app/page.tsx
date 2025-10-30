'use client';

export default function Page() {
  return (
    <main className="relative isolate p-4">
      <div className="mx-auto max-w-2xl py-48">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-balance">
            Summarize your codebase using AI.
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty sm:text-xl/8">
            Cadence Engineer helps you understand and document your codebase
            with ease.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-pink-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-pink-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
