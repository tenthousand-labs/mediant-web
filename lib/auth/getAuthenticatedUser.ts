import 'server-only';

import { redirect } from 'next/navigation';
import { cache } from 'react';

import { getUser } from '@lib/api/users';
import type { User } from '@lib/types/user';

import { verifySession } from './verifySession';

export const getAuthenticatedUser = cache(async (): Promise<User> => {
  const token = await verifySession({ redirectToLogin: true });

  if (!token) {
    redirect('/login');
  }

  try {
    return await getUser(token);
  } catch {
    redirect('/login');
  }
});
