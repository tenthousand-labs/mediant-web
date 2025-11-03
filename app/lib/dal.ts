import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { User } from './definitions/user';

export const verifySession = cache(async () => {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  return { isAuth: true, token: token };
});

export const getAuthenticatedUser = cache(async (): Promise<User> => {
  const session = await verifySession();

  if (!session) redirect('/login');

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MEDIANT_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    const user = (await res.json()) as User;
    return user;
  } catch {
    redirect('/login');
  }
});
