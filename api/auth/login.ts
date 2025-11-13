'use server';

import { type TokenResponse } from '@/api/auth/token-response';
import { cookies } from 'next/headers';

const NINE_MINUTES_IN_MS = 9 * 60 * 1000;
const TWO_WEEKS_IN_MS = 14 * 24 * 60 * 60 * 1000;

export async function login(email: string, password: string) {
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const tokens = (await res.json()) as TokenResponse;

  const cookieStore = await cookies();

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
