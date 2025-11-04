'use server';

import * as z from 'zod';

export type PromptFormState = {
  since?: { errors: string[] };
  until?: { errors: string[] };
  prompt?: { errors: string[] };
  api?: { message: string };
};

const promptFormSchema = z
  .object({
    since: z
      .string({ required_error: 'Select a start date.' })
      .refine((value) => value.trim().length > 0, {
        message: 'Select a start date.',
      })
      .refine((value) => !Number.isNaN(Date.parse(value)), {
        message: 'Enter a valid date.',
      }),
    until: z
      .string({ required_error: 'Select an end date.' })
      .refine((value) => value.trim().length > 0, {
        message: 'Select an end date.',
      })
      .refine((value) => !Number.isNaN(Date.parse(value)), {
        message: 'Enter a valid date.',
      }),
    prompt: z
      .string({ required_error: 'Describe your request.' })
      .trim()
      .min(1, { message: 'Describe your request.' })
      .refine((value) => value.split(/\s+/).filter(Boolean).length <= 100, {
        message: 'Use 100 words or fewer.',
      }),
  })
  .refine(
    ({ since, until }) => new Date(since).getTime() <= new Date(until).getTime(),
    {
      message: 'End date must be on or after the start date.',
      path: ['until'],
    }
  );

export async function submitPrompt(
  _state: PromptFormState | null,
  formData: FormData
): Promise<PromptFormState | null> {
  const validatedFields = promptFormSchema.safeParse({
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

  console.log('Prompt submitted', { since, until, prompt });

  return {
    api: {
      message: 'Your request was submitted successfully.',
    },
  };
}
