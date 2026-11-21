import { go } from '@/lib/respond';
import { sql, ensureSchema, audit } from '@/lib/db';
import { readSession, sameOrigin } from '@/lib/security';

export const runtime = 'nodejs';

export async function POST(req) {
  const s = await readSession();
  if (!(await sameOrigin()) || s?.stage !== 'full') return go(req, '/admin/login');
  await ensureSchema();
  const f = await req.formData();
  const id = Number(f.get('id'));
  if (!Number.isInteger(id) || id < 1) return go(req, '/admin');
  const status = String(f.get('status') || 'New').slice(0, 60);
  const matched = String(f.get('matched_to') || '').slice(0, 200);
  const notes = String(f.get('notes') || '').slice(0, 4000);
  const q = sql();
  await q`UPDATE leads SET status = ${status}, matched_to = ${matched}, notes = ${notes}, updated_at = now() WHERE id = ${id}`;
  if (f.get('wwrea_reviewed') === '1') {
    await q`UPDATE leads SET wwrea_reviewed_at = now() WHERE id = ${id} AND wwrea_reviewed_at IS NULL`;
    await audit('wwrea_reviewed', id);
  }
  await audit('lead_updated', id, status);
  return go(req, '/admin?saved=1');
}
