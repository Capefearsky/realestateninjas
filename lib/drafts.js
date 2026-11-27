import { isLive } from '@/lib/brands';
import { readSession } from '@/lib/security';

// Guides stay in draft (visible only to Tony signed in to Ninjas HQ) until SITE_LIVE=true.
export async function canSeeGuides() {
  if (isLive()) return true;
  const s = await readSession();
  return s?.stage === 'full';
}
