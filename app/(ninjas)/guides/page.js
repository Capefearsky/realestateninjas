import { notFound } from 'next/navigation';
import { canSeeGuides } from '@/lib/drafts';
import { guidesFor } from '@/lib/guides';
import { isLive } from '@/lib/brands';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Guides | Real Estate Ninjas', description: 'Local guides to living, buying and selling in North and South Carolina.' };

export default async function Guides() {
  if (!(await canSeeGuides())) notFound();
  return (
    <main className="doc">
      {!isLive() && <p className="draftnote">DRAFT: only you can see the guides until the site launches.</p>}
      <h1>Local guides</h1>
      <p>Straight answers about living, buying and selling in the Carolinas, from people who live here.</p>
      <ul className="guidelist">
        {guidesFor('ninjas').map((g) => (
          <li key={g.slug}><a href={`/guides/${g.slug}`}>{g.title}<small>{g.description}</small></a></li>
        ))}
      </ul>
    </main>
  );
}
