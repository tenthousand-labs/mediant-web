'use client';

import { useActionState } from 'react';
import { submitPrompt, type PromptFormState } from '../lib/definitions/prompt';

const INITIAL_STATE: PromptFormState | null = null;
const FIELD_STYLES =
  'w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-pink-600 focus:ring-2 focus:ring-pink-600/30 dark:border-white/20 dark:bg-gray-900 dark:text-gray-100';
const BUTTON_STYLES =
  'inline-flex w-full items-center justify-center rounded-lg bg-pink-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-600 disabled:cursor-not-allowed disabled:bg-pink-700/60 dark:text-black';

type PromptRequestFormProps = {
  className?: string;
  title?: string;
};

export default function PromptRequestForm({
  className,
  title = 'Describe your request',
}: PromptRequestFormProps) {
  const [state, action, pending] = useActionState(submitPrompt, INITIAL_STATE);

  return (
    <form
      action={action}
      className={['space-y-6', className].filter(Boolean).join(' ')}
      noValidate
    >
      {title ? (
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      ) : null}

      {state?.api?.message ? (
        <p className="text-sm font-medium text-emerald-600">
          {state.api.message}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <fieldset className="space-y-2">
          <label htmlFor="since" className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Since
          </label>
          <input
            id="since"
            name="since"
            type="date"
            required
            className={FIELD_STYLES}
          />
          {state?.since?.errors?.length ? (
            <p className="text-xs font-medium text-red-500">
              {state.since.errors[0]}
            </p>
          ) : null}
        </fieldset>

        <fieldset className="space-y-2">
          <label htmlFor="until" className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Until
          </label>
          <input
            id="until"
            name="until"
            type="date"
            required
            className={FIELD_STYLES}
          />
          {state?.until?.errors?.length ? (
            <p className="text-xs font-medium text-red-500">
              {state.until.errors[0]}
            </p>
          ) : null}
        </fieldset>
      </div>

      <fieldset className="space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <label htmlFor="prompt" className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Prompt
          </label>
          <span className="text-xs text-gray-500 dark:text-gray-400">Maximum 100 words</span>
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

      <button type="submit" disabled={pending} className={BUTTON_STYLES}>
        {pending ? 'Submitting…' : 'Submit request'}
      </button>
    </form>
  );
}
