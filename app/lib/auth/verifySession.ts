import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export type VerifySessionOptions = {
  redirectToLogin?: boolean;
};

export const verifySession = cache(
  async ({ redirectToLogin = false }: VerifySessionOptions = {}) => {
    const token = (await cookies()).get('accessToken')?.value ?? null;

    if (!token && redirectToLogin) {
      redirect('/login');
    }

    return token;
  }
);
