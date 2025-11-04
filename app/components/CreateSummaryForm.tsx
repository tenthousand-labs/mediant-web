'use client';

import { useActionState } from 'react';
import {
  createSummary,
  type SummaryFormState,
} from '../lib/definitions/summary';

const INITIAL_STATE: SummaryFormState | null = null;
const FIELD_STYLES =
  'mt-2 block w-full rounded-lg px-3 py-1.5 outline-2 outline-black/50 dark:outline-white/50 focus:not-data-focus:outline-black/50 dark:focus:not-data-focus:outline-white/50 data-focus:outline-black dark:data-focus:outline-white';

type PromptRequestFormProps = {
  className?: string;
  title?: string;
};

export default function CreateSummaryForm({
  className,
  title = 'Describe your request',
}: PromptRequestFormProps) {
  const [state, action, pending] = useActionState(createSummary, INITIAL_STATE);

  // Get today's and last month's date in yyyy-mm-dd format
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);
  const formatDate = (date: Date) => date.toISOString().slice(0, 10);
  const todayStr = formatDate(today);
  const lastMonthStr = formatDate(lastMonth);

  return (
    <form
      action={action}
      className={['space-y-6', className].filter(Boolean).join(' ')}
      noValidate
    >
      {title ? <h2 className="text-lg tracking-tight">{title}</h2> : null}

      {state?.api?.message ? (
        <p className="text-sm font-medium text-emerald-600">
          {state.api.message}
        </p>
      ) : null}

      <fieldset className="space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <label
            htmlFor="prompt"
            className="text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Prompt
          </label>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Maximum 100 words
          </span>
        </div>
        <textarea
          id="prompt"
          name="prompt"
          rows={5}
          required
          className={FIELD_STYLES}
        />
        {state?.prompt?.errors?.length ? (
          <p className="text-xs font-medium text-red-500">
            {state.prompt.errors[0]}
          </p>
        ) : null}
      </fieldset>

      <div className="flex flex-row justify-between gap-4">
        <fieldset className="flex-1">
          <label
            htmlFor="since"
            className="text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Since
          </label>
          <input
            id="since"
            name="since"
            type="date"
            required
            className={FIELD_STYLES}
            defaultValue={lastMonthStr}
          />
          {state?.since?.errors?.length ? (
            <p className="text-xs font-medium text-red-500">
              {state.since.errors[0]}
            </p>
          ) : null}
        </fieldset>

        <fieldset className="flex-1">
          <label
            htmlFor="until"
            className="text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Until
          </label>
          <input
            id="until"
            name="until"
            type="date"
            required
            className={FIELD_STYLES}
            defaultValue={todayStr}
          />
          {state?.until?.errors?.length ? (
            <p className="text-xs font-medium text-red-500">
              {state.until.errors[0]}
            </p>
          ) : null}
        </fieldset>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex flex-1 w-full items-center justify-center rounded-lg bg-pink-700 mt-8 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 disabled:cursor-not-allowed disabled:bg-pink-700/60 dark:text-black"
        >
          {pending ? 'Creating…' : 'Create Summary'}
        </button>
      </div>
    </form>
  );
}
