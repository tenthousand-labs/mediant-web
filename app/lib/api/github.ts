import 'server-only';

import type { User } from '@lib/types/user';

type FetchErrorShape = { reason?: string; message?: string };

type GithubTokenResponse = {
  accessToken: string;
};

type GithubUserResponse = User;

function extractApiError(message: FetchErrorShape | string): string {
  if (typeof message === 'string') {
    return message || 'Request failed';
  }

  return message.reason || message.message || 'Request failed';
}

export async function exchangeGithubCodeForToken(
  code: string
): Promise<string> {
  const response = await fetch(`${process.env.API_URL}/auth/github/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
    cache: 'no-store',
  });

  if (!response.ok) {
    let errorMessage = 'Unable to authenticate with GitHub';

    try {
      const data = (await response.json()) as FetchErrorShape;
      errorMessage = extractApiError(data);
    } catch {
      const text = await response.text();
      errorMessage = extractApiError(text);
    }

    throw new Error(errorMessage);
  }

  const data = (await response.json()) as GithubTokenResponse;
  return data.accessToken;
}

export async function getGithubUser(token: string): Promise<GithubUserResponse> {
  const response = await fetch(`${process.env.API_URL}/auth/github/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to fetch GitHub user';

    try {
      const data = (await response.json()) as FetchErrorShape;
      errorMessage = extractApiError(data);
    } catch {
      const text = await response.text();
      errorMessage = extractApiError(text);
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<GithubUserResponse>;
}

export async function revokeGithubToken(token: string): Promise<void> {
  const response = await fetch(`${process.env.API_URL}/auth/github/token`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to revoke GitHub token';

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
