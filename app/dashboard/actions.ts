'use server';

import { getAuthenticatedUser } from '@api/user/get-authenticated-user';
import { User } from '@api/user/user';
import { redirect } from 'next/navigation';

export async function getAuthenticatedUserAction(): Promise<User> {
  try {
    const user = await getAuthenticatedUser();
    return user;
  } catch (error) {
    redirect('/login');
  }
}
