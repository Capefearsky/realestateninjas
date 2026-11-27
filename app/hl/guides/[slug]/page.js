import { notFound } from 'next/navigation';
import Guide from '@/components/Guide';
import { canSeeGuides } from '@/lib/drafts';
import { getGuide } from '@/lib/guides';
import { hlBase } from '@/lib/base';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const g = getGuide('hl', (await params).slug);
  return g ? { title: `${g.title} | Home Liquidation`, description: g.description } : {};
}

export default async function Page({ params }) {
  const g = getGuide('hl', (await params).slug);
  if (!g || !(await canSeeGuides())) notFound();
  const base = await hlBase();
  return <Guide g={g} base={base} cta={{ h: 'Want one person to handle the contents and the sale?', p: 'Request a free, no-obligation call and we’ll put together a written plan for the house.', btn: 'Request a call' }} />;
}
