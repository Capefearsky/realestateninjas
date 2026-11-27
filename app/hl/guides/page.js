import { notFound } from 'next/navigation';
import { canSeeGuides } from '@/lib/drafts';
import { guidesFor } from '@/lib/guides';
import { isLive } from '@/lib/brands';
import { hlBase } from '@/lib/base';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Guides | Home Liquidation', description: 'Guides to estates, cleanouts, downsizing and selling a house in North and South Carolina.' };

export default async function Guides() {
  if (!(await canSeeGuides())) notFound();
  const base = await hlBase();
  return (
    <main className="doc">
      {!isLive() && <p className="draftnote">DRAFT: only you can see the guides until the site launches.</p>}
      <h1>Guides for hard moves</h1>
      <p>Plain-English help with estates, cleanouts, downsizing and selling a house in the Carolinas.</p>
      <ul className="guidelist">
        {guidesFor('hl').map((g) => (
          <li key={g.slug}><a href={`${base}/guides/${g.slug}`}>{g.title}<small>{g.description}</small></a></li>
        ))}
      </ul>
    </main>
  );
}
