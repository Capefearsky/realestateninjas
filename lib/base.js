import { headers } from 'next/headers';

// On homeliquidation.com the /hl prefix is hidden; on previews it is visible.
export async function hlBase() {
  const host = ((await headers()).get('host') || '').toLowerCase();
  return host.includes('homeliquidation') ? '' : '/hl';
}
