import crypto from 'node:crypto';
import { cookies, headers } from 'next/headers';

const secret = () => {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error('SESSION_SECRET must be set (32+ characters)');
  return s;
};

export const hasSessionSecret = () => Boolean(process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32);

export function hashIp(ip) {
  const key = process.env.SESSION_SECRET || 'ip-salt';
  return crypto.createHmac('sha256', key).update(String(ip || '')).digest('hex').slice(0, 32);
}

export async function clientIp() {
  const h = await headers();
  return (h.get('x-forwarded-for') || '').split(',')[0].trim() || h.get('x-real-ip') || '';
}

// Rejects form posts and admin actions that come from other websites.
export async function sameOrigin() {
  const h = await headers();
  const origin = h.get('origin');
  const host = h.get('x-forwarded-host') || h.get('host');
  if (!origin) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// ---- Cloudflare Turnstile (bot check). Skipped until the keys are set in Vercel. ----
export async function verifyTurnstile(token, ip) {
  const key = process.env.TURNSTILE_SECRET_KEY;
  if (!key) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret: key, response: token, remoteip: ip || '' });
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const d = await r.json().catch(() => ({}));
  if (d.success !== true) console.warn('turnstile failed', JSON.stringify({ codes: d['error-codes'], host: d.hostname, status: r.status }));
  return d.success === true;
}

// ---- Password check (ADMIN_PASSWORD is stored encrypted in Vercel) ----
export function passwordMatches(input) {
  const real = process.env.ADMIN_PASSWORD || '';
  if (real.length < 12) return false;
  const a = crypto.createHash('sha256').update(String(input || '')).digest();
  const b = crypto.createHash('sha256').update(real).digest();
  return crypto.timingSafeEqual(a, b);
}

// ---- Signed session cookie ----
const COOKIE = 'ninjas_admin';
const sign = (data) => crypto.createHmac('sha256', secret()).update(data).digest('base64url');

export async function createSession(stage) {
  const payload = Buffer.from(JSON.stringify({ stage, exp: Date.now() + 8 * 3600 * 1000 })).toString('base64url');
  const jar = await cookies();
  jar.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 8 * 3600,
  });
}

export async function readSession() {
  if (!hasSessionSecret()) return null;
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw || !raw.includes('.')) return null;
  const [payload, sig] = raw.split('.');
  const expected = sign(payload);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

// ---- Two-step login codes (works with Google Authenticator, Authy, 1Password) ----
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function newTotpSecret() {
  const bytes = crypto.randomBytes(20);
  let bits = '';
  for (const b of bytes) bits += b.toString(2).padStart(8, '0');
  let out = '';
  for (let i = 0; i + 5 <= bits.length; i += 5) out += B32[parseInt(bits.slice(i, i + 5), 2)];
  return out;
}

function b32decode(s) {
  let bits = '';
  for (const c of s.replace(/=+$/, '').toUpperCase()) {
    const v = B32.indexOf(c);
    if (v < 0) continue;
    bits += v.toString(2).padStart(5, '0');
  }
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(bytes);
}

function totpAt(secretB32, counter) {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(counter));
  const h = crypto.createHmac('sha1', b32decode(secretB32)).update(buf).digest();
  const o = h[h.length - 1] & 0xf;
  const code = ((h.readUInt32BE(o) & 0x7fffffff) % 1000000).toString().padStart(6, '0');
  return code;
}

export function totpValid(secretB32, code) {
  const c = String(code || '').replace(/\D/g, '');
  if (c.length !== 6) return false;
  const now = Math.floor(Date.now() / 30000);
  for (const d of [-1, 0, 1]) {
    const expected = totpAt(secretB32, now + d);
    if (crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(c))) return true;
  }
  return false;
}

// ---- Encrypt the two-step secret before it is stored in the database ----
const encKey = () => crypto.createHash('sha256').update('totp:' + secret()).digest();

export function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', encKey(), iv);
  const enc = Buffer.concat([c.update(text, 'utf8'), c.final()]);
  return [iv, c.getAuthTag(), enc].map((b) => b.toString('base64url')).join('.');
}

export function decrypt(blob) {
  const [iv, tag, enc] = blob.split('.').map((s) => Buffer.from(s, 'base64url'));
  const d = crypto.createDecipheriv('aes-256-gcm', encKey(), iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(enc), d.final()]).toString('utf8');
}
