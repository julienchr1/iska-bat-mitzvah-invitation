import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow /admin/login without authentication
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Protect /admin/dashboard and other admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      console.error('[Middleware] Token verification failed:', error);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
