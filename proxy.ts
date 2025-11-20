import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthentication } from './lib/api/auth/verify-authentication';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const isAuthenticated = await verifyAuthentication();

  if (!isAuthenticated) {
    console.log('User is not authenticated');
  }

  // If expired, delete the accessToken cookie and redirect to /login
  if (!isAuthenticated && isProtectedRoute) {
    const response = NextResponse.redirect(new URL('/login', req.nextUrl));
    response.cookies.delete('accessToken');
    return response;
  }

  // 4. Redirect to /login if the user is not authenticated
  // if (isProtectedRoute && !session?.userId) {
  //   return NextResponse.redirect(new URL('/login', req.nextUrl));
  // }

  // 5. Redirect to /dashboard if the user is authenticated
  // if (
  //   isPublicRoute &&
  //   session?.userId &&
  //   !req.nextUrl.pathname.startsWith('/dashboard')
  // ) {
  //   return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  // }

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
