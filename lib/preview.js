import { isLive } from '@/lib/brands';
import { readSession } from '@/lib/security';

// Until SITE_LIVE=true, the public sees "Coming very soon".
// Tony sees the full site while signed in to Ninjas HQ (two-step login completed).
export async function canSeeFullSite() {
  if (isLive()) return true;
  const s = await readSession();
  return s?.stage === 'full';
}
