'use server';

import { createSummary as createSummaryRequest } from '@lib/api/summaries';
import { verifySession } from '@lib/auth/verifySession';
import type { SummaryFormInput } from '@lib/validation/summarySchema';
import { summarySchema } from '@lib/validation/summarySchema';

export type SummaryActionState = {
  since?: { errors: string[] };
  until?: { errors: string[] };
  prompt?: { errors: string[] };
  api?: { error: string };
};

export async function createSummary(
  _state: SummaryActionState | null,
  formData: FormData
): Promise<SummaryActionState | null> {
  const validated = summarySchema.safeParse({
    since: formData.get('since'),
    until: formData.get('until'),
    prompt: formData.get('prompt'),
  });

  if (!validated.success) {
    const { fieldErrors } = validated.error.flatten();

    return {
      since: fieldErrors.since ? { errors: fieldErrors.since } : undefined,
      until: fieldErrors.until ? { errors: fieldErrors.until } : undefined,
      prompt: fieldErrors.prompt ? { errors: fieldErrors.prompt } : undefined,
    };
  }

  const token = await verifySession({ redirectToLogin: true });
  if (!token) {
    return { api: { error: 'Authentication required.' } };
  }

  try {
    const payload: SummaryFormInput = validated.data;
    await createSummaryRequest(token, payload);
  } catch (error) {
    return {
      api: {
        error:
          error instanceof Error
            ? error.message
            : 'Unable to create summary. Please try again.',
      },
    };
  }

  return null;
}
