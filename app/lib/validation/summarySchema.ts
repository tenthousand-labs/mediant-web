import { z } from 'zod';

export const summarySchema = z
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

export type SummaryFormInput = z.infer<typeof summarySchema>;
