import { go } from '@/lib/respond';
import { sql, ensureSchema, overLimit, audit } from '@/lib/db';
import { readSession, createSession, sameOrigin, totpValid, decrypt, clientIp, hashIp } from '@/lib/security';

export const runtime = 'nodejs';

export async function POST(req) {
  const s = await readSession();
  if (!(await sameOrigin()) || s?.stage !== 'code') return go(req, '/admin/login');
  await ensureSchema();
  const ip = hashIp(await clientIp());
  if (await overLimit(`code:${ip}`, 6, 15)) return go(req, '/admin/login?step=code&e=limit');
  const form = await req.formData();
  const rows = await sql()`SELECT value FROM admin_settings WHERE key = 'totp'`;
  if (!rows.length || !totpValid(decrypt(rows[0].value), form.get('code'))) {
    await audit('code_failed', null, ip);
    return go(req, '/admin/login?step=code&e=code');
  }
  await createSession('full');
  await audit('login', null, ip);
  return go(req, '/admin');
}
