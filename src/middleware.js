// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Jika environment variable ini set ke true, redirect semua traffic ke halaman under-construction root
  if (process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === 'true' && pathname !== '/under-construction') {
    return NextResponse.redirect(new URL('/under-construction', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude Next internals, API routes, favicon and public assets (so images/static are served)
    '/((?!_next|api|favicon.ico|assets).*)'
  ]
};