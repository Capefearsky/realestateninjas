import { notFound } from 'next/navigation';
import Guide from '@/components/Guide';
import { canSeeGuides } from '@/lib/drafts';
import { getGuide } from '@/lib/guides';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const g = getGuide('ninjas', (await params).slug);
  return g ? { title: `${g.title} | Real Estate Ninjas`, description: g.description } : {};
}

export default async function Page({ params }) {
  const g = getGuide('ninjas', (await params).slug);
  if (!g || !(await canSeeGuides())) notFound();
  return <Guide g={g} base="" cta={{ h: 'Want an agent who knows this area and gets you?', p: 'Take the 2-minute quiz and we’ll match you with one licensed local agent who shares your interests.', btn: 'Take the quiz' }} />;
}
