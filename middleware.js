import { NextResponse } from 'next/server';

// Checks the Ninjas HQ session cookie (same format as lib/security.js) with Web Crypto.
async function signedIn(req) {
  const secret = process.env.SESSION_SECRET || '';
  const raw = req.cookies.get('ninjas_admin')?.value || '';
  if (secret.length < 32 || !raw.includes('.')) return false;
  const [payload, sig] = raw.split('.');
  try {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload)));
    let bin = '';
    mac.forEach((c) => (bin += String.fromCharCode(c)));
    const expected = btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    if (expected.length !== sig.length) return false;
    let diff = 0;
    for (let i = 0; i < sig.length; i++) diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
    if (diff) return false;
    const data = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return data.stage === 'full' && data.exp > Date.now();
  } catch {
    return false;
  }
}

// One app, two domains. homeliquidation.com is served from the /hl pages.
// Until SITE_LIVE=true, the public only sees "Coming very soon"; Tony sees everything while signed in to Ninjas HQ.
export async function middleware(req) {
  const host = (req.headers.get('host') || '').toLowerCase();
  const { pathname } = req.nextUrl;
  const isHl = host.includes('homeliquidation');
  const assets = pathname.startsWith('/_next') || pathname.startsWith('/img') || pathname === '/favicon.png' || pathname === '/robots.txt';
  const adminArea = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  const shared = assets || adminArea || pathname.startsWith('/api');

  if (process.env.SITE_LIVE !== 'true' && !assets && !adminArea && pathname !== '/coming-soon' && !(await signedIn(req))) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ ok: false, error: 'We’re not taking requests yet. Please check back soon.' }, { status: 403 });
    }
    const url = req.nextUrl.clone();
    url.pathname = '/coming-soon';
    url.search = '';
    return NextResponse.rewrite(url);
  }

  if (isHl && !shared && !pathname.startsWith('/hl') && pathname !== '/coming-soon') {
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
