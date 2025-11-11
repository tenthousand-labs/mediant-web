import 'server-only';

import type { Summary } from '@lib/types/summary';
import type { SummaryFormInput } from '@lib/validation/summarySchema';

type FetchErrorShape = { reason?: string; message?: string };

function formatDateToIso(date: string): string {
  return new Date(date).toISOString().split('.')[0] + 'Z';
}

function extractApiError(message: FetchErrorShape | string): string {
  if (typeof message === 'string') {
    return message || 'Request failed';
  }

  return message.reason || message.message || 'Request failed';
}

export async function createSummary(
  token: string,
  payload: SummaryFormInput
): Promise<void> {
  const { prompt, since, until } = payload;

  const response = await fetch(`${process.env.API_URL}/summaries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      prompt,
      since: formatDateToIso(since),
      until: formatDateToIso(until),
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to create summary';

    try {
      const data = (await response.json()) as FetchErrorShape;
      errorMessage = extractApiError(data);
    } catch {
      const text = await response.text();
      errorMessage = extractApiError(text);
    }

    throw new Error(errorMessage);
  }
}

export async function getSummaries(token: string): Promise<Summary[]> {
  const response = await fetch(`${process.env.API_URL}/summaries`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to load summaries';

    try {
      const data = (await response.json()) as FetchErrorShape;
      errorMessage = extractApiError(data);
    } catch {
      const text = await response.text();
      errorMessage = extractApiError(text);
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<Summary[]>;
}

export class SummaryNotFoundError extends Error {
  constructor() {
    super('Summary not found');
    this.name = 'SummaryNotFoundError';
  }
}

export async function getSummary(token: string, id: string): Promise<Summary> {
  const response = await fetch(`${process.env.API_URL}/summaries/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
    credentials: 'include',
  });

  if (response.status === 404) {
    throw new SummaryNotFoundError();
  }

  if (!response.ok) {
    let errorMessage = 'Failed to load summary';

    try {
      const data = (await response.json()) as FetchErrorShape;
      errorMessage = extractApiError(data);
    } catch {
      const text = await response.text();
      errorMessage = extractApiError(text);
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<Summary>;
}
