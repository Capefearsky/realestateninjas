import { NextResponse } from 'next/server';

// One app, two domains. homeliquidation.com is served from the /hl pages.
export function middleware(req) {
  const host = (req.headers.get('host') || '').toLowerCase();
  const { pathname } = req.nextUrl;
  const isHl = host.includes('homeliquidation');
  const shared = pathname.startsWith('/api') || pathname.startsWith('/admin') || pathname.startsWith('/_next') || pathname.startsWith('/img') || pathname === '/favicon.png' || pathname === '/robots.txt';

  if (isHl && !shared && !pathname.startsWith('/hl')) {
    const url = req.nextUrl.clone();
    url.pathname = '/hl' + (pathname === '/' ? '' : pathname);
    return NextResponse.rewrite(url);
  }
  if (host.includes('realestateninjas') && pathname.startsWith('/hl')) {
    return NextResponse.redirect('https://homeliquidation.com' + (pathname.slice(3) || '/'), 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] };
