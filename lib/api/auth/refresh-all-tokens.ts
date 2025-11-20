import 'server-only';

import { cookies } from 'next/headers';
import { type TokenResponse } from '@lib/types';

const NINE_MINUTES_IN_MS = 9 * 60 * 1000;
const TWO_WEEKS_IN_MS = 14 * 24 * 60 * 60 * 1000;

export async function refreshAllTokens(): Promise<void> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  const res = await fetch(`${process.env.API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const tokens = (await res.json()) as TokenResponse;

  cookieStore.set({
    name: 'accessToken',
    value: tokens.accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(Date.now() + NINE_MINUTES_IN_MS),
    path: '/',
  });

  cookieStore.set({
    name: 'refreshToken',
    value: tokens.refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(Date.now() + TWO_WEEKS_IN_MS),
    path: '/',
  });
}
