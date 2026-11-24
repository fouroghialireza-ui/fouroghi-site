import { NextRequest, NextResponse } from 'next/server';
import { cookieName, verifySession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang') === 'en' ? 'en' : 'fa';
  const restricted = /^\/(admin|dashboard)(\/|$)/.test(request.nextUrl.pathname);
  if (restricted && !(await verifySession(request.cookies.get(cookieName)?.value))) {
    const login = request.nextUrl.clone();
    login.pathname = '/login';
    login.search = lang === 'en' ? '?lang=en' : '';
    login.hash = '';
    return NextResponse.redirect(login, { headers: { 'Cache-Control': 'private, no-store' } });
  }
  const headers = new Headers(request.headers);
  headers.set('x-plety-locale', lang);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/((?!api/|_next/|images/|fonts/|favicon.ico|robots.txt|sitemap.xml).*)']
};
