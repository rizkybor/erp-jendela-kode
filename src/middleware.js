// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Normalisasi value dari env (build-time). Bisa 'true', '1', 'yes' -> treat as true
  const envVal = process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION ?? '';
  const underConstruction = ['true', '1', 'yes'].includes(envVal.toLowerCase());

  // Jangan jalankan untuk route yang harus dikecualikan
  // (internal next files, API routes, static assets, next-data, images, favicon, robots, sw)
  const excludedPrefixes = [
    '/_next',        // internal next
    '/api',          // api routes
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/_next/static',
    '/_next/image',
    '/static',
    '/assets',       // jika Anda menggunakan /assets
    '/under-construction' // jangan redirect halaman under-construction itu sendiri
  ];

  for (const prefix of excludedPrefixes) {
    if (pathname === prefix || pathname.startsWith(prefix + '/') || pathname.startsWith(prefix)) {
      return NextResponse.next();
    }
  }

  if (underConstruction) {
    // redirect ke halaman under-construction (absolute URL built from request.url)
    const destination = new URL('/under-construction', request.url);
    return NextResponse.redirect(destination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match semua kecuali internals — sesuaikan jika Anda punya folder publik khusus
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|static|assets).*)'
  ]
};