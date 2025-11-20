import { jwtDecode } from 'jwt-decode';
import { AccessPayload } from './access-payload';
import { cookies } from 'next/headers';
import { refreshAllTokens } from './refresh-all-tokens';
import { cache } from 'react';

/**
 * Checks if a JWT access token is valid (not expired).
 * If invalid, tries to refresh using the refresh token and /auth/refresh.
 * Returns true if valid after refresh, false otherwise.
 */
export const verifyAuthentication = cache(async (): Promise<boolean> => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get('accessToken')?.value;

  if (isTokenValid(accessToken || '')) return true;

  await refreshAllTokens();

  accessToken = cookieStore.get('accessToken')?.value;

  return isTokenValid(accessToken || '');
});

function isTokenValid(token: string): boolean {
  try {
    const payload = jwtDecode<AccessPayload>(token);
    if (!payload?.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch {
    return false;
  }
}
