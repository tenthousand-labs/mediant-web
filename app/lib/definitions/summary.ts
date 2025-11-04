'use server';

import { redirect } from 'next/navigation';
import { verifyJWT } from '../dal';
import * as z from 'zod';

export type SummaryFormState = {
  since?: { errors: string[] };
  until?: { errors: string[] };
  prompt?: { errors: string[] };
  api?: { message: string };
};

const summaryFormSchema = z
  .object({
    since: z
      .string({ error: 'Select a start date.' })
      .refine((value) => value.trim().length > 0, {
        message: 'Select a start date.',
      })
      .refine((value) => !Number.isNaN(Date.parse(value)), {
        message: 'Enter a valid date.',
      }),
    until: z
      .string({ error: 'Select an end date.' })
      .refine((value) => value.trim().length > 0, {
        message: 'Select an end date.',
      })
      .refine((value) => !Number.isNaN(Date.parse(value)), {
        message: 'Enter a valid date.',
      }),
    prompt: z
      .string({ error: 'Describe your request.' })
      .trim()
      .refine((value) => value.split(/\s+/).filter(Boolean).length <= 100, {
        message: 'Use 100 words or fewer.',
      }),
  })
  .refine(
    ({ since, until }) =>
      new Date(since).getTime() <= new Date(until).getTime(),
    {
      message: 'End date must be on or after the start date.',
      path: ['until'],
    }
  );

export async function createSummary(
  _state: SummaryFormState | null,
  formData: FormData
): Promise<SummaryFormState | null> {
  const jwt = await verifyJWT();

  if (!jwt) redirect('/login');

  const validatedFields = summaryFormSchema.safeParse({
    since: formData.get('since'),
    until: formData.get('until'),
    prompt: formData.get('prompt'),
  });

  if (!validatedFields.success) {
    const { fieldErrors } = validatedFields.error.flatten();

    return {
      since: fieldErrors.since ? { errors: fieldErrors.since } : undefined,
      until: fieldErrors.until ? { errors: fieldErrors.until } : undefined,
      prompt: fieldErrors.prompt ? { errors: fieldErrors.prompt } : undefined,
    };
  }

  const { since, until, prompt } = validatedFields.data;

  // Convert since and until to ISO8601 format
  const sinceISO = new Date(since).toISOString().replace(/\.\d{3}Z$/, 'Z');
  const untilISO = new Date(until).toISOString().replace(/\.\d{3}Z$/, 'Z');

  console.log('Summary requested', {
    since: sinceISO,
    until: untilISO,
    prompt,
  });

  const res = await fetch(`${process.env.API_URL}/summaries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ since: sinceISO, until: untilISO, prompt }),
  });

  const text = await res.text();

  console.log('API response:', { status: res.status, body: text });

  return null;
}
