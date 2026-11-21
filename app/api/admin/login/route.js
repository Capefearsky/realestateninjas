import { go } from '@/lib/respond';
import { hasDb, sql, ensureSchema, overLimit, audit } from '@/lib/db';
import { passwordMatches, createSession, sameOrigin, clientIp, hashIp, hasSessionSecret } from '@/lib/security';

export const runtime = 'nodejs';

export async function POST(req) {
  if (!(await sameOrigin()) || !hasSessionSecret()) return go(req, '/admin/login?e=bad');
  const ip = hashIp(await clientIp());
  if (hasDb()) {
    await ensureSchema();
    if (await overLimit(`login:${ip}`, 5, 15)) return go(req, '/admin/login?e=limit');
  } else {
    await new Promise((r) => setTimeout(r, 800));
  }
  const form = await req.formData();
  if (!passwordMatches(form.get('password'))) {
    await audit('login_failed', null, ip);
    return go(req, '/admin/login?e=bad');
  }
  if (!hasDb()) {
    await createSession('full');
    return go(req, '/admin');
  }
  const rows = await sql()`SELECT 1 FROM admin_settings WHERE key = 'totp'`;
  if (rows.length) {
    await createSession('code');
    return go(req, '/admin/login?step=code');
  }
  await createSession('enroll');
  return go(req, '/admin/setup-2fa');
}
