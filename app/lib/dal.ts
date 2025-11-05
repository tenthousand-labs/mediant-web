import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { User } from './definitions/user';

export const verifyJWT = cache(async (): Promise<string | null> => {
  const jwt = (await cookies()).get('jwt')?.value;

  if (!jwt) {
    return null;
  }

  return jwt;
});

export const getAuthenticatedUser = cache(async (): Promise<User> => {
  const jwt = await verifyJWT();

  if (!jwt) redirect('/login');

  const res = await fetch(`${process.env.API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    redirect('/login');
  }

  const user = (await res.json()) as User;

  return user;
});
