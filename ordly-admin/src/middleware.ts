import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = ['/auth', '/api/auth'];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (token) {
    if (isPublicPath) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (!isPublicPath) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/orders',
    '/coupons',
    '/menus',
    '/reservations',
    '/statistics',
    '/auth',
  ],
};
