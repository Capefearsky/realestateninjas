import { go } from '@/lib/respond';
import { clearSession } from '@/lib/security';

export async function POST(req) {
  await clearSession();
  return go(req, '/admin/login');
}
