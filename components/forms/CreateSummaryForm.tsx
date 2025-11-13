'use client';

import { useActionState } from 'react';

import {
  createSummary,
  type SummaryActionState,
} from '@/app/summaries/actions';
import Button from '@components/ui/Button';
import FieldError from '@components/ui/FieldError';
import Input from '@components/ui/Input';

const INITIAL_STATE: SummaryActionState | null = null;

type CreateSummaryFormProps = {
  className?: string;
  title?: string;
};

const FIELD_STYLES =
  'mt-2 block w-full rounded-lg px-3 py-1.5 outline-2 outline-black/50 dark:outline-white/50 focus:not-data-focus:outline-black/50 dark:focus:not-data-focus:outline-white/50 data-focus:outline-black dark:data-focus:outline-white';

export default function CreateSummaryForm({
  className,
  title = 'Describe your request',
}: CreateSummaryFormProps) {
  const [state, formAction, pending] = useActionState(
    createSummary,
    INITIAL_STATE
  );

  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  return (
    <form
      action={formAction}
      className={['space-y-6', className].filter(Boolean).join(' ')}
      noValidate
    >
      {title ? <h2 className="text-lg tracking-tight">{title}</h2> : null}

      {state?.api?.error ? (
        <p className="text-sm font-medium text-red-500">{state.api.error}</p>
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
        <FieldError message={state?.prompt?.errors?.[0]} />
      </fieldset>

      <div className="flex flex-col gap-4 md:flex-row">
        <fieldset className="flex-1">
          <label
            htmlFor="since"
            className="text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Since
          </label>
          <Input
            id="since"
            name="since"
            type="date"
            required
            defaultValue={formatDate(lastMonth)}
          />
          <FieldError message={state?.since?.errors?.[0]} />
        </fieldset>

        <fieldset className="flex-1">
          <label
            htmlFor="until"
            className="text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            Until
          </label>
          <Input
            id="until"
            name="until"
            type="date"
            required
            defaultValue={formatDate(today)}
          />
          <FieldError message={state?.until?.errors?.[0]} />
        </fieldset>
      </div>

      <Button type="submit" disabled={pending} className="w-full md:w-auto">
        {pending ? 'Creating…' : 'Create Summary'}
      </Button>
    </form>
  );
}
