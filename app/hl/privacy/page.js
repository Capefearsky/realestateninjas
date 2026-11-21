import Privacy from '@/components/Privacy';
import { hlBase } from '@/lib/base';
export const metadata = { title: 'Privacy Policy | Home Liquidation' };
export default async function Page() {
  const base = await hlBase();
  return <Privacy brand="hl" home={base || '/'} />;
}
