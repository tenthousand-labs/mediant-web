import 'server-only';

import { cookies } from 'next/headers';

export async function getAccessToken(): Promise<string> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  if (accessToken) {
    return accessToken;
  }

  throw new Error('No access token found');
}
