// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Safe normalization of env value
  const envVal = String(process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION || '').trim().toLowerCase();
  const underConstruction = ['true', '1', 'yes'].includes(envVal);

  // Routes/prefixes yang dikecualikan dari middleware
  const excludedPrefixes = [
    '/_next',        // internal next
    '/api',          // API routes
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/_next/static',
    '/_next/image',
    '/static',
    '/assets',
    '/under-construction' // jangan redirect halaman under-construction itu sendiri
  ];

  // Jika path cocok dengan salah satu prefix yang dikecualikan -> lanjutkan tanpa interrupt
  const isExcluded = excludedPrefixes.some(prefix =>
    pathname === prefix || pathname.startsWith(prefix + '/')
  );
  if (isExcluded) {
    return NextResponse.next();
  }

  if (underConstruction) {
    // Redirect relatif — build absolute URL dari request.url
    const destination = new URL('/under-construction', request.url);
    return NextResponse.redirect(destination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Jangan jalankan untuk internal _next, api, atau halaman under-construction itu sendiri
    // (menambahkan under-construction ke negative lookahead agar middleware tidak dipanggil untuk page itu)
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|static|assets|under-construction).*)'
  ]
};