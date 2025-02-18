import { NextResponse } from 'next/server';

import { auth } from './auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const userRole = req.auth?.user?.role;

  // For admin routes, check authentication and role
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL('/api/auth/signin', req.url));
    }

    if (userRole !== 'admin') {
      return Response.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};
