import { go } from '@/lib/respond';
import { sql, ensureSchema, audit } from '@/lib/db';
import { readSession, createSession, sameOrigin, totpValid, decrypt } from '@/lib/security';

export const runtime = 'nodejs';

export async function POST(req) {
  const s = await readSession();
  if (!(await sameOrigin()) || s?.stage !== 'enroll') return go(req, '/admin/login');
  await ensureSchema();
  const q = sql();
  const rows = await q`SELECT value FROM admin_settings WHERE key = 'totp_pending'`;
  const form = await req.formData();
  if (!rows.length || !totpValid(decrypt(rows[0].value), form.get('code'))) return go(req, '/admin/setup-2fa?e=1');
  await q`INSERT INTO admin_settings (key, value) VALUES ('totp', ${rows[0].value}) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`;
  await q`DELETE FROM admin_settings WHERE key = 'totp_pending'`;
  await audit('2fa_enabled');
  await createSession('full');
  return go(req, '/admin');
}
