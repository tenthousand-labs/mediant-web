import 'server-only';

import { User } from './user';
import { getAccessToken } from '../auth/get-access-token';
import { cache } from 'react';

export const getAuthenticatedUser = cache(async function (): Promise<User> {
  const res = await fetch(`${process.env.API_URL}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
    cache: 'no-store',
  });

  if (res.ok) {
    return await res.json();
  }

  throw new Error('Failed to fetch authenticated user');
});
