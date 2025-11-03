import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/dashboard', request.url));
}

export const config = {
  matcher: [
    { source: '/', has: [{ type: 'cookie', key: 'jwt' }], locale: false },
    {
      source: '/login',
      has: [{ type: 'cookie', key: 'jwt' }],
      locale: false,
    },
  ],
};
