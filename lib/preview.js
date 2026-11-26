import { readSession } from '@/lib/security';

// The full site is public (with a Coming Soon banner until SITE_LIVE=true).
// SITE_HIDDEN=true is the kill switch: back to "Coming very soon" for everyone but Tony signed in to Ninjas HQ.
export async function canSeeFullSite() {
  if (process.env.SITE_HIDDEN !== 'true') return true;
  const s = await readSession();
  return s?.stage === 'full';
}
