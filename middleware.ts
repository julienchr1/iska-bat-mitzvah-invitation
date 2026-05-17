import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get('adminToken')?.value;

  if (!token || !verifyAuthToken(token)) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
