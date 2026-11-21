import '@/styles/comingsoon.css';
import { headers } from 'next/headers';
import ComingSoon from '@/components/ComingSoon';

export const dynamic = 'force-dynamic';

async function brandFromHost() {
  const h = await headers();
  return (h.get('host') || '').toLowerCase().includes('homeliquidation') ? 'hl' : 'ninjas';
}

export async function generateMetadata() {
  return (await brandFromHost()) === 'hl'
    ? { title: 'HomeLiquidation.com | Coming Very Soon', description: 'HomeLiquidation.com is coming very soon.' }
    : { title: 'Real Estate Ninjas | Coming Very Soon', description: 'Real Estate Ninjas is coming very soon.', icons: { icon: '/favicon.png' } };
}

export default async function Page() {
  return <ComingSoon brand={await brandFromHost()} />;
}
