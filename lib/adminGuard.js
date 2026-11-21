import { redirect } from 'next/navigation';
import { readSession } from './security';

export async function requireStage(stage) {
  const s = await readSession();
  if (!s || s.stage !== stage) redirect('/admin/login');
  return s;
}
