import 'server-only';

import type { User } from '@lib/types/user';
import type { LoginFormInput } from '@lib/validation/loginSchema';

type FetchErrorShape = { reason?: string; message?: string };

function extractApiError(message: FetchErrorShape | string): string {
  if (typeof message === 'string') {
    return message || 'Request failed';
  }

  return message.reason || message.message || 'Request failed';
}

export async function loginUser(
  credentials: LoginFormInput
): Promise<{ accessToken: string; refreshToken: string }> {
  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    cache: 'no-store',
  });

  if (!response.ok) {
    let errorMessage = 'Login failed';

    try {
      const data = (await response.json()) as FetchErrorShape;
      errorMessage = extractApiError(data);
    } catch {
      const text = await response.text();
      errorMessage = extractApiError(text);
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
}

export async function getUser(token: string): Promise<User> {
  const response = await fetch(`${process.env.API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json() as Promise<User>;
}
